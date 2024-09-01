'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const equipos = [
  "FC Barcelona", "Real Madrid", "Atlético de Madrid", "Sevilla FC", "Valencia CF",
  "Villarreal CF", "Real Betis", "Real Sociedad", "Athletic Club", "Rayo Vallecano",
  "CA Osasuna", "RC Celta de Vigo", "RCD Espanyol", "RCD Mallorca", "Getafe CF",
  "Cádiz CF", "Deportivo Alavés", "Granada CF", "UD Las Palmas", "Girona FC",
  "Real Zaragoza", "Levante UD", "Real Sporting de Gijón", "Real Valladolid",
  "SD Eibar", "SD Huesca", "Elche CF", "CD Tenerife", "Real Oviedo", "Albacete Balompié"
];

export default function SearchNav() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (text) {
      const filteredSuggestions = equipos.filter(equipo =>
        equipo.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      router.push('/noticias');  // Volver a noticias generales cuando se borra el texto
    }
  }, [text, router]);

  const handleSuggestionClick = (suggestion) => {
    setText(suggestion);
    router.push('/noticias?equipo=' + suggestion);
    setSuggestions([]);
  };

  return (
    <div className="nav justify-content-end pt-1 pb-1 pe-2 bg-main">
      <div className="nav-item position-relative">
        <div className="row bg-main">
          <div className="col-12">
            <input
              value={text}
              className="form-control"
              placeholder='¿Sobre qué equipo?'
              onChange={e => setText(e.target.value)}
              id="inputEquipo"
            />
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{
            zIndex: 1000,  // Asegura que las sugerencias aparezcan por encima de otros elementos
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}