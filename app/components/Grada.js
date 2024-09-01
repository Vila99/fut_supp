'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'b209c4766d2600d02a18454bb08f4514';
const BASE_URL = 'https://v3.football.api-sports.io';

const Grada = () => {
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [nextFixtures, setNextFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteTeams = async () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteTeams')) || [];
      setFavoriteTeams(favorites);

      const fixtures = await Promise.all(
        favorites.map(teamId => getNextFixture(teamId))
      );

      setNextFixtures(fixtures);
      setLoading(false);
    };

    loadFavoriteTeams();
  }, []);

  const getNextFixture = async (teamId) => {
    try {
      const response = await axios.get(`${BASE_URL}/fixtures`, {
        params: { team: teamId, next: 1 },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': API_KEY
        }
      });
      return response.data.response[0];
    } catch (error) {
      console.error('Error al obtener el próximo partido:', error);
      return null;
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Cargando...</div>;
  }

  return (
    <div className="py-5 vh-100 text-center bg-main">
      <h1 className="mb-4">LA GRADA</h1>
      {nextFixtures.length === 0 ? (
        <p>No tienes equipos favoritos. Añade algunos para ver sus próximos partidos aquí.</p>
      ) : (
        <div className="row justify-content-center mx-4">
          {nextFixtures.map((fixture, index) => (
            fixture && (
              <div key={index} className="col-md-6 mb-4">
                <div className="card bg-blanco">
                  <div className="card-body">
                    <h5 className="card-title">Próximo partido</h5>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <TeamLogo team={fixture.teams.home} />
                      <span className="h4 mb-0">VS</span>
                      <TeamLogo team={fixture.teams.away} />
                    </div>
                    <p className="text-center fw-bold mb-1">
                      {new Date(fixture.fixture.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', month: 'long', day: 'numeric', 
                        hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                    <p className="text-center text-muted">{fixture.fixture.venue.name}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

const TeamLogo = ({ team }) => (
  <div className="text-center">
    <img src={team.logo} alt={team.name} className="mb-2 mx-5" style={{width: '90px', height: '90px'}} />
    <p className="small fw-bold">{team.name}</p>
  </div>
);

export default Grada;