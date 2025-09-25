import './App.css';
import { useEffect, useState } from "react";
import Card from "./Card.tsx";

const BASE = 'https://pokeapi.co/api/v2/';

type Pokemon = {
    name: string;
};

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function getAllPokemons() {
        setLoading(true);
        setError(null);

        fetch(`${BASE}pokemon`)
            .then(res => res.json())
            .then(pokemonList => {
                const pokemonNames = pokemonList.results.map((pokemon: { name: string }) => ({ name: pokemon.name }));
                setPokemons(pokemonNames);
                setLoading(false);
            })
            .catch(err => {
                setError("Coś poszło nie tak, spróbuj ponownie.");
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllPokemons();
    }, []);

    return (
        <>
            <h1>Pokemony</h1>

            {/* Warunkowe renderowanie */}
            {loading && <p>Ładowanie danych...</p>}
            {error && <p>{error}</p>}
            {pokemons.length === 0 && !loading && !error && <p>Brak wyników do wyświetlenia</p>}

            <div style={{ textAlign: "center" }}>
                {pokemons.map((pokemon) => (
                    <Card key={pokemon.name} name={pokemon.name} />
                ))}
            </div>
        </>
    );
}

export default App;
