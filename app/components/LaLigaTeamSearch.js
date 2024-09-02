'use client'

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_KEY = 'b209c4766d2600d02a18454bb08f4514';
const BASE_URL = 'https://v3.football.api-sports.io/';
const SEASON = '2024';

const LaLigaTeamSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [teamsCache, setTeamsCache] = useState([]);
  const autocompleteRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/teams`, {
          params: { league: '140', season: SEASON },
          headers: {
            'x-rapidapi-key': API_KEY
          }
        });
        setTeamsCache(response.data.response);
      } catch (error) {
        console.error('Error al cargar la lista de equipos:', error);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = teamsCache.filter(team =>
        team.team.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (team) => {
    setInputValue(team.team.name);
    setSuggestions([]);
    router.push(`/team/${team.team.id}`);
  };

  return (
    <div className="vh-100 d-flex flex-column align-items-center bg-multicolor p-4 main-style">
      <h1 className="mb-4 text-center main-title" style={{ paddingTop: '100px' }}>¿Qué equipo quieres ver?</h1>
      <div className="position-relative text-center" ref={autocompleteRef} style={{ width: '100%', maxWidth: '700px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingrese nombre del equipo"
          className="form-control"
          style={{ marginTop: '30px', width: '100%' }}
        />
        {suggestions.length > 0 && (
          <ul className="position-absolute w-100 bg-white border rounded mt-1 max-height-60 overflow-auto list-group">
            {suggestions.map((team) => (
              <li
                key={team.team.id}
                onClick={() => handleSuggestionClick(team)}
                className="list-group-item d-flex align-items-center cursor-pointer"
              >
                <img src={team.team.logo} alt={team.team.name} className="me-2" style={{ width: '24px', height: '24px' }} />
                {team.team.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LaLigaTeamSearch;