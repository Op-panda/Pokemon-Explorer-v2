import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import PokemonDetailModal from './PokemonDetailModal';

const PokemonList = ({
  pokemons,
  loading,
  currentPage,
  itemsPerPage,
  sortBy,
  onPageChange,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (loading) {
    return (
      <div className="pokemon-list">
        {[...Array(12)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!pokemons.length) {
    return (
      <div className="no-results">
        <p>No Pokémon found matching your search criteria.</p>
        <p className="no-results-subtitle">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  // Sort pokemons based on the selected sort option
  const sortedPokemons = [...pokemons].sort((a, b) => {
    switch (sortBy) {
      case 'id':
        return a.id - b.id;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemons = sortedPokemons.slice(startIndex, endIndex);

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list">
        {paginatedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={setSelectedPokemon}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default PokemonList;
