import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedTypes,
  onTypeSelect,
  types,
  sortBy,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value) => {
    onSearchChange(value);
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleTypeChange = (type) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypeSelect(newSelectedTypes);
  };

  const getTypeSymbol = (type) => {
    const typeSymbols = {
      normal: '⚪',
      fire: '🔥',
      water: '💧',
      electric: '⚡',
      grass: '🌿',
      ice: '❄️',
      fighting: '👊',
      poison: '☠️',
      ground: '⛰️',
      flying: '🦅',
      psychic: '🧠',
      bug: '🐛',
      rock: '🪨',
      ghost: '👻',
      dragon: '🐉',
      dark: '🌑',
      steel: '⚙️',
      fairy: '✨',
    };
    return typeSymbols[type] || '❓';
  };

  const getSortIcon = () => {
    switch (sortBy) {
      case 'id':
        return (
          <div className="sort-icon">
            <span className="sort-number">#</span>
          </div>
        );
      case 'name':
        return (
          <div className="sort-icon">
            <span className="sort-arrow">↑</span>
            <span className="sort-letter">A</span>
          </div>
        );
      case 'name-desc':
        return (
          <div className="sort-icon">
            <span className="sort-arrow">↓</span>
            <span className="sort-letter">A</span>
          </div>
        );
      default:
        return (
          <div className="sort-icon">
            <span className="sort-number">#</span>
          </div>
        );
    }
  };

  return (
    <div
      className="search-bar"
      style={{
        position: 'fixed',
        top: 110,
        left: 0,
        padding: '1rem',
        zIndex: 9998,
        width: '100%',
        background: 'white',
        boxSizing: 'border-box',
      }}
    >
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search Pokémon"
        />
        <div className="type-filter-container" ref={dropdownRef}>
          <button
            className="type-filter-button"
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            aria-label="Filter by type"
          >
            Filter by Type{' '}
            {selectedTypes.length > 0 && `(${selectedTypes.length})`}
          </button>
          {isTypeDropdownOpen && (
            <div className="type-dropdown">
              {types.map((type) => (
                <div
                  key={type}
                  className={`type-option ${
                    selectedTypes.includes(type) ? 'selected' : ''
                  }`}
                  onClick={() => handleTypeChange(type)}
                >
                  <span className="type-symbol">{getTypeSymbol(type)}</span>
                  <span className="type-name">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="control-buttons">
          <button
            className="control-button sort-button"
            onClick={() => {
              const nextSort = {
                id: 'name',
                name: 'name-desc',
                'name-desc': 'id',
              }[sortBy];
              onSortChange(nextSort);
            }}
            title={`Sort by ${
              sortBy === 'id'
                ? 'ID'
                : sortBy === 'name'
                ? 'Name (A-Z)'
                : 'Name (Z-A)'
            }`}
          >
            {getSortIcon()}
          </button>
          <button
            className="control-button items-per-page"
            onClick={() => {
              const nextItemsPerPage = {
                10: 20,
                20: 50,
                50: 10,
              }[itemsPerPage];
              onItemsPerPageChange(nextItemsPerPage);
            }}
            title={`${itemsPerPage} items per page`}
          >
            <span className="items-count">{itemsPerPage}</span>
            <span className="items-label">per page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
