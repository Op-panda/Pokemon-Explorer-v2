import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import Loading from './components/Loading';
import Error from './components/Error';
import usePokemon from './hooks/usePokemon';
import './App.css';

const App = () => {
  const { pokemons, loading, error, refetch } = usePokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('id');

  const types = Array.from(new Set(pokemons.flatMap((p) => p.types)));

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTypes =
      selectedTypes.length === 0
        ? true
        : selectedTypes.every((type) => pokemon.types.includes(type));
    return matchesName && matchesTypes;
  });

  const handleTypeSelect = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (error) return <Error message={error} onRetry={refetch} />;

  return (
    <div className="app">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTypes={selectedTypes}
        onTypeSelect={handleTypeSelect}
        types={types}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <div className="pokemon-container">
        <PokemonList
          pokemons={filteredPokemons}
          loading={loading}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          sortBy={sortBy}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
