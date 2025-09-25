import './App.css';
import { useEffect, useState } from "react";
import Card from "./Card.tsx";

const BASE = 'https://pokeapi.co/api/v2/';

type Pokemon = {
    name: string;
    id: number;
    height: number;
    weight: number;
    abilities: string[];
    types: string[];
    sprite: string;
};

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    async function getPokemonDetails(pokemonName: string): Promise<Pokemon> {
        const response = await fetch(`${BASE}pokemon/${pokemonName}`);
        const pokemonData = await response.json();

        return {
            name: pokemonData.name,
            id: pokemonData.id,
            height: pokemonData.height,
            weight: pokemonData.weight,
            abilities: pokemonData.abilities.map((ability: any) => ability.ability.name),
            types: pokemonData.types.map((type: any) => type.type.name),
            sprite: pokemonData.sprites.front_default
        };
    }

    async function getAllPokemons() {
        try {
            setLoading(true);
            const response = await fetch(`${BASE}pokemon?limit=20`); // Ograniczam do 20 dla szybszego ładowania
            const pokemonList = await response.json();

            // Pobieramy szczegółowe dane dla każdego Pokemona
            const detailedPokemons = await Promise.all(
                pokemonList.results.map((pokemon: { name: string }) =>
                    getPokemonDetails(pokemon.name)
                )
            );

            setPokemons(detailedPokemons);
        } catch (err) {
            console.log('Błąd podczas pobierania danych:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllPokemons();
    }, []);

    return (
        <>
            <h1>Pokemony</h1>
            <div style={{ textAlign: "center" }}>
                {loading ? (
                    <p>Ładowanie...</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px',
                        padding: '20px'
                    }}>
                        {pokemons.map((pokemon) => (
                            <Card
                                key={pokemon.id}
                                pokemon={pokemon}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default App;