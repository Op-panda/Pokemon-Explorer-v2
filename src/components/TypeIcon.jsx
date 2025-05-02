import React from 'react';

const TypeIcon = ({ type }) => {
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'normal':
        return '⚪';
      case 'fire':
        return '🔥';
      case 'water':
        return '💧';
      case 'electric':
        return '⚡';
      case 'grass':
        return '🌿';
      case 'ice':
        return '❄️';
      case 'fighting':
        return '👊';
      case 'poison':
        return '☠️';
      case 'ground':
        return '🏔️';
      case 'flying':
        return '🦅';
      case 'psychic':
        return '🧠';
      case 'bug':
        return '🐛';
      case 'rock':
        return '🪨';
      case 'ghost':
        return '👻';
      case 'dragon':
        return '🐉';
      case 'dark':
        return '🌑';
      case 'steel':
        return '⚙️';
      case 'fairy':
        return '✨';
      default:
        return '❓';
    }
  };

  return (
    <span className="type-icon" title={type}>
      {getTypeIcon(type)}
    </span>
  );
};

export default TypeIcon;
