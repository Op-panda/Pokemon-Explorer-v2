import { useState, useEffect } from 'react';

const usePokemon = (limit = 150) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to extract Pokemon data from a chain
    const extractPokemonFromChain = async (chainData) => {
        try {
            const pokemonId = chainData.species.url.split('/').slice(-2, -1)[0];
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if (!pokemonResponse.ok) throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
            const pokemonData = await pokemonResponse.json();

            return {
                id: pokemonId,
                name: chainData.species.name,
                image: pokemonData.sprites.front_default
            };
        } catch (error) {
            console.error(`Error fetching Pokemon data for ${chainData.species.name}:`, error);
            return null;
        }
    };

    // Helper function to process entire evolution chain recursively
    const processEvolutionChain = async (chain) => {
        try {
            const result = [];

            // Process the current Pokemon in the chain
            const currentPokemon = await extractPokemonFromChain(chain);
            if (currentPokemon) {
                result.push(currentPokemon);
            }

            // Process evolutions if they exist
            if (chain.evolves_to && chain.evolves_to.length > 0) {
                // For simplicity, we take the first evolution path if there are multiple
                const evolutionData = await extractPokemonFromChain(chain.evolves_to[0]);
                if (evolutionData) {
                    result.push(evolutionData);
                }

                // Check for further evolutions
                if (chain.evolves_to[0].evolves_to && chain.evolves_to[0].evolves_to.length > 0) {
                    const finalEvolutionData = await extractPokemonFromChain(chain.evolves_to[0].evolves_to[0]);
                    if (finalEvolutionData) {
                        result.push(finalEvolutionData);
                    }
                }
            }

            return result;
        } catch (error) {
            console.error('Error processing evolution chain:', error);
            return [];
        }
    };

    const fetchEvolutionChain = async (speciesUrl) => {
        try {
            const response = await fetch(speciesUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const speciesData = await response.json();

            // If the Pokemon has no evolution chain, return early
            if (!speciesData.evolution_chain || !speciesData.evolution_chain.url) {
                console.log("No evolution chain found for this Pokemon");
                return [];
            }

            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            if (!evolutionResponse.ok) throw new Error(`HTTP error! status: ${evolutionResponse.status}`);
            const evolutionData = await evolutionResponse.json();

            // Process the evolution chain recursively
            const chain = await processEvolutionChain(evolutionData.chain);
            console.log("Evolution chain processed:", chain);
            return chain;

        } catch (error) {
            console.error('Error fetching evolution chain:', error);
            return [];
        }
    };

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    try {
                        const res = await fetch(pokemon.url);
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        const details = await res.json();

                        // Fetch species data
                        const speciesResponse = await fetch(details.species.url);
                        if (!speciesResponse.ok) {
                            throw new Error(`HTTP error! status: ${speciesResponse.status}`);
                        }
                        const speciesData = await speciesResponse.json();

                        // Fetch evolution chain with proper error handling
                        let evolutionChain = [];
                        try {
                            // Pass the species URL directly
                            evolutionChain = await fetchEvolutionChain(details.species.url);
                        } catch (chainError) {
                            console.error(`Evolution chain error for ${details.name}:`, chainError);
                        }

                        return {
                            id: details.id,
                            name: details.name,
                            image: details.sprites.front_default,
                            types: details.types.map((t) => t.type.name),
                            stats: {
                                hp: details.stats[0].base_stat,
                                attack: details.stats[1].base_stat,
                                defense: details.stats[2].base_stat,
                                specialAttack: details.stats[3].base_stat,
                                specialDefense: details.stats[4].base_stat,
                                speed: details.stats[5].base_stat
                            },
                            abilities: details.abilities.map(a => a.ability.name),
                            moves: details.moves.map(m => m.move.name),
                            evolutionChain
                        };
                    } catch (error) {
                        console.error(`Error fetching details for ${pokemon.name}:`, error);
                        return null;
                    }
                }).filter(pokemon => pokemon !== null)
            );

            setPokemons(pokemonDetails);
        } catch (error) {
            setError(error.message || 'Failed to fetch Pokémon. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, [limit]);

    return { pokemons, loading, error, refetch: fetchPokemons };
};

export default usePokemon; 