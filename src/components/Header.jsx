import React from 'react';
import PokeBall from '../assets/Poke_Ball.webp';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={PokeBall} alt="Pokémon Logo" className="header-logo" />
        </div>
        <div className="title-container">
          <h1>Pokémon Explorer</h1>
          <p className="subtitle">Discover and explore the world of Pokémon</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-icon">🎮</span>
            <span className="stat-value">150</span>
            <span className="stat-label">Pokémon</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚔️</span>
            <span className="stat-value">18</span>
            <span className="stat-label">Types</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
