'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const API_KEY = 'b209c4766d2600d02a18454bb08f4514';
const BASE_URL = 'https://v3.football.api-sports.io/';
const SEASON = '2024';

const TeamDetails = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const params = useParams();
  const teamId = params.teamId;

  useEffect(() => {
    if (teamId) {
      searchTeam(teamId);
      checkIfFavorite(teamId);
    }
  }, [teamId]);

  const searchTeam = async (teamId) => {
    setLoading(true);
    try {
      const [standings, nextFixture] = await Promise.all([
        getTeamStanding(teamId),
        getNextFixture(teamId)
      ]);

      setResult({ standings, nextFixture });
    } catch (error) {
      console.error('Error al buscar la información del equipo:', error);
    }
    setLoading(false);
  };

  const getTeamStanding = async (teamId) => {
    const response = await axios.get(`${BASE_URL}/standings`, {
      params: { league: '140', season: SEASON, team: teamId },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY
      }
    });
    return response.data.response[0].league.standings[0][0];
  };

  const getNextFixture = async (teamId) => {
    const response = await axios.get(`${BASE_URL}/fixtures`, {
      params: { team: teamId, next: 1 },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY
      }
    });
    return response.data.response[0];
  };

  const checkIfFavorite = (teamId) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTeams')) || [];
    setIsFavorite(favorites.includes(teamId));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTeams')) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== teamId);
      localStorage.setItem('favoriteTeams', JSON.stringify(newFavorites));
    } else {
      favorites.push(teamId);
      localStorage.setItem('favoriteTeams', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };


  if (loading) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Cargando...</div>;
  }

  if (!result) {
    return <div className="d-flex justify-content-center align-items-center vh-100">No se encontró información del equipo.</div>;
  }

  return (
    <div className="py-5 vh-100 px-5 bg-main">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="d-flex align-items-center">
          <img src={result.standings.team.logo} alt={result.standings.team.name} className="me-3" style={{width: '90px', height: '90px'}} />
          {result.standings.team.name}
        </h1>
        <div>
          <button 
            onClick={toggleFavorite}
            className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} me-2`}
          >
            {isFavorite ? '★ Favorito' : '☆ Añadir a favoritos'}
          </button>
          <button 
            onClick={() => router.push('/')}
            className="btn btn-primary"
          >
            Volver a la búsqueda
          </button>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-8 mb-4 mb-md-0">
          <h2 className="mb-4">Estadísticas de La Liga (Temporada {SEASON}-{parseInt(SEASON) + 1})</h2>
          <div className="row g-3">
            <StatBox title="Posición" value={result.standings.rank} />
            <StatBox title="Puntos" value={result.standings.points} />
            <StatBox title="Partidos jugados" value={result.standings.all.played} />
            <StatBox title="Victorias" value={result.standings.all.win} />
            <StatBox title="Empates" value={result.standings.all.draw} />
            <StatBox title="Derrotas" value={result.standings.all.lose} />
            <StatBox title="Goles a favor" value={result.standings.all.goals.for} />
            <StatBox title="Goles en contra" value={result.standings.all.goals.against} />
            <StatBox title="Diferencia de goles" value={result.standings.goalsDiff} />
          </div>
        </div>
        
        <div className="col-md-4">
          <h2 className="mb-4">Próximo Partido</h2>
          <div className="card bg-blanco">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <TeamLogo team={result.nextFixture.teams.home} />
                <span className="h4 mb-0">VS</span>
                <TeamLogo team={result.nextFixture.teams.away} />
              </div>
              <div className="text-center">
                <p className="fw-bold mb-1">{new Date(result.nextFixture.fixture.date).toLocaleDateString('es-ES', { 
                  year: 'numeric', month: 'long', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit' 
                })}</p>
                <p className="text-muted">{result.nextFixture.fixture.venue.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ title, value }) => (
  <div className="col-sm-6 col-md-4">
    <div className="card h-100">
      <div className="card-body text-center bg-blanco">
        <h3 className="card-title h5 fw-bold">{title}</h3>
        <p className="card-text display-6">{value}</p>
      </div>
    </div>
  </div>
);

const TeamLogo = ({ team }) => (
  <div className="text-center">
    <img src={team.logo} alt={team.name} className="mb-2" style={{width: '90px', height: '90px'}} />
    <p className="small fw-bold">{team.name}</p>
  </div>
);

export default TeamDetails;