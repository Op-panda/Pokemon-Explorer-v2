import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import TypeIcon from './TypeIcon';
import './PokemonDetailModal.css';

const PokemonDetailModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  // Debug evolution chain data
  useEffect(() => {
    console.log('Pokemon:', pokemon.name);
    console.log('Evolution chain data:', pokemon.evolutionChain);
  }, [pokemon]);

  const stats = [
    { name: 'HP', value: pokemon.stats.hp, color: '#FF5959' },
    { name: 'Attack', value: pokemon.stats.attack, color: '#F5AC78' },
    { name: 'Defense', value: pokemon.stats.defense, color: '#FAE078' },
    {
      name: 'Special Attack',
      value: pokemon.stats.specialAttack,
      color: '#9DB7F5',
    },
    {
      name: 'Special Defense',
      value: pokemon.stats.specialDefense,
      color: '#A7DB8D',
    },
    { name: 'Speed', value: pokemon.stats.speed, color: '#FA92B2' },
  ];

  const statItemStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    width: '100%',
  };

  const statNameStyle = {
    width: '120px',
    textAlign: 'left',
    fontWeight: '500',
    color: '#333',
  };

  const statBarContainerStyle = {
    flex: '1',
    height: '12px',
    backgroundColor: '#e0e0e0',
    borderRadius: '6px',
    margin: '0 10px',
    overflow: 'hidden',
    position: 'relative',
  };

  const statValueStyle = {
    width: '45px',
    textAlign: 'center',
    backgroundColor: '#FFC107',
    padding: '3px 6px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '13px',
    color: 'black',
  };

  // Get a gradient based on Pokemon's primary type
  const getTypeGradient = (types) => {
    const primaryType = types[0];
    switch (primaryType) {
      case 'normal':
        return 'linear-gradient(135deg, #A8A878 0%, #C6C6A7 100%)';
      case 'fire':
        return 'linear-gradient(135deg, #F08030 0%, #F5AC78 100%)';
      case 'water':
        return 'linear-gradient(135deg, #6890F0 0%, #9DB7F5 100%)';
      case 'electric':
        return 'linear-gradient(135deg, #F8D030 0%, #FAE078 100%)';
      case 'grass':
        return 'linear-gradient(135deg, #78C850 0%, #A7DB8D 100%)';
      case 'ice':
        return 'linear-gradient(135deg, #98D8D8 0%, #BCE6E6 100%)';
      case 'fighting':
        return 'linear-gradient(135deg, #C03028 0%, #D67873 100%)';
      case 'poison':
        return 'linear-gradient(135deg, #A040A0 0%, #C183C1 100%)';
      case 'ground':
        return 'linear-gradient(135deg, #E0C068 0%, #EBD69D 100%)';
      case 'flying':
        return 'linear-gradient(135deg, #A890F0 0%, #C6B7F5 100%)';
      case 'psychic':
        return 'linear-gradient(135deg, #F85888 0%, #FA92B2 100%)';
      case 'bug':
        return 'linear-gradient(135deg, #A8B820 0%, #C6D16E 100%)';
      case 'rock':
        return 'linear-gradient(135deg, #B8A038 0%, #D1C17D 100%)';
      case 'ghost':
        return 'linear-gradient(135deg, #705898 0%, #A292BC 100%)';
      case 'dragon':
        return 'linear-gradient(135deg, #7038F8 0%, #A27DFA 100%)';
      case 'dark':
        return 'linear-gradient(135deg, #705848 0%, #A29288 100%)';
      case 'steel':
        return 'linear-gradient(135deg, #B8B8D0 0%, #D1D1E0 100%)';
      case 'fairy':
        return 'linear-gradient(135deg, #EE99AC 0%, #F4BDC9 100%)';
      default:
        return 'linear-gradient(135deg, #FFCB05 0%, #FFD700 100%)'; // Default Pokemon-themed yellow
    }
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '180px',
    height: '180px',
    borderRadius: '12px',
    background: getTypeGradient(pokemon.types),
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    marginRight: '20px',
  };

  const typeContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  };

  const typeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const typeTextStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
    textTransform: 'capitalize',
  };

  const abilitiesListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  };

  const abilityItemStyle = {
    backgroundColor: '#f5f5f5',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '14px',
    color: '#333',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'capitalize',
    border: '1px solid #e0e0e0',
  };

  const abilityItemHoverStyle = {
    ...abilityItemStyle,
    background: 'linear-gradient(135deg, #FFCB05 0%, #FFD700 100%)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
    border: '1px solid #FFC107',
    color: '#222',
  };

  const movesListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  };

  const moveItemStyle = {
    backgroundColor: '#f5f5f5',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '14px',
    color: '#333',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'capitalize',
    border: '1px solid #e0e0e0',
  };

  const moveItemHoverStyle = {
    ...moveItemStyle,
    background: 'linear-gradient(135deg, #FFCB05 0%, #FFD700 100%)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
    border: '1px solid #FFC107',
    color: '#222',
  };

  const evolutionChainStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap',
  };

  const evolutionArrowStyle = {
    fontSize: '24px',
    color: '#666',
    margin: '0 10px',
  };

  const evolutionItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: '1px solid #e0e0e0',
    width: '120px',
  };

  const evolutionItemHoverStyle = {
    ...evolutionItemStyle,
    background: 'linear-gradient(135deg, #FFCB05 0%, #FFD700 100%)',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-3px)',
    border: '1px solid #FFC107',
  };

  const evolutionImageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    marginBottom: '8px',
  };

  const evolutionNameStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    textTransform: 'capitalize',
    textAlign: 'center',
  };

  const [hoveredAbility, setHoveredAbility] = React.useState(null);
  const [hoveredMove, setHoveredMove] = React.useState(null);
  const [hoveredEvolution, setHoveredEvolution] = React.useState(null);

  // Check if evolution chain data is valid
  const hasEvolutionChain =
    Array.isArray(pokemon.evolutionChain) && pokemon.evolutionChain.length > 0;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="pokemon-header">
          <div style={imageContainerStyle}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2))',
              }}
            />
          </div>
          <div className="pokemon-info">
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div style={typeContainerStyle}>
              {pokemon.types.map((type) => (
                <div key={type} style={typeStyle}>
                  <TypeIcon type={type} size={24} />
                  <span style={typeTextStyle}>{type}</span>
                </div>
              ))}
            </div>
            <div className="pokemon-id" style={{ color: 'black' }}>
              #{pokemon.id}
            </div>
          </div>
        </div>

        <div className="pokemon-details">
          <div className="stats-section">
            <h3>Stats</h3>
            <div style={{ marginTop: '15px' }}>
              {stats.map((stat) => (
                <div key={stat.name} style={statItemStyle}>
                  <div style={statNameStyle}>{stat.name}</div>
                  <div style={statBarContainerStyle}>
                    <div
                      style={{
                        width: `${(stat.value / 255) * 100}%`,
                        backgroundColor: stat.color,
                        height: '100%',
                        borderRadius: '6px',
                      }}
                    ></div>
                  </div>
                  <div style={statValueStyle}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="abilities-section">
            <h3>Abilities</h3>
            <div style={abilitiesListStyle}>
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability}
                  style={
                    hoveredAbility === ability
                      ? abilityItemHoverStyle
                      : abilityItemStyle
                  }
                  onMouseEnter={() => setHoveredAbility(ability)}
                  onMouseLeave={() => setHoveredAbility(null)}
                  title="Current ability"
                >
                  {ability.replace(/-/g, ' ')}
                </div>
              ))}
            </div>
          </div>

          <div className="moves-section">
            <h3>Moves</h3>
            <div style={movesListStyle}>
              {pokemon.moves.slice(0, 20).map((move) => (
                <div
                  key={move}
                  style={
                    hoveredMove === move ? moveItemHoverStyle : moveItemStyle
                  }
                  onMouseEnter={() => setHoveredMove(move)}
                  onMouseLeave={() => setHoveredMove(null)}
                  title="Current move"
                >
                  {move.replace(/-/g, ' ')}
                </div>
              ))}
              {pokemon.moves.length > 20 && (
                <div style={moveItemStyle}>
                  +{pokemon.moves.length - 20} more
                </div>
              )}
            </div>
          </div>

          <div className="evolution-section">
            <h3>Evolution Chain</h3>
            {hasEvolutionChain ? (
              <div style={evolutionChainStyle}>
                {pokemon.evolutionChain.map((evolution, index) => (
                  <React.Fragment key={evolution.id || index}>
                    <div
                      style={
                        hoveredEvolution === evolution.id
                          ? evolutionItemHoverStyle
                          : evolutionItemStyle
                      }
                      onMouseEnter={() => setHoveredEvolution(evolution.id)}
                      onMouseLeave={() => setHoveredEvolution(null)}
                    >
                      <img
                        src={evolution.image}
                        alt={evolution.name}
                        style={evolutionImageStyle}
                      />
                      <span style={evolutionNameStyle}>{evolution.name}</span>
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        #{evolution.id}
                      </span>
                    </div>
                    {index < pokemon.evolutionChain.length - 1 && (
                      <div style={evolutionArrowStyle}>→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div
                style={{ textAlign: 'center', margin: '15px 0', color: '#666' }}
              >
                This Pokémon does not evolve
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default PokemonDetailModal;
