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


    const [showDetailsForId, setShowDetailsForId] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState('');
    const [text, setText] = useState('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    function getUniqueTypes() {
        const allTypes = pokemons.flatMap(pokemon => pokemon.types);
        return [...new Set(allTypes)];
    }

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
            const response = await fetch(`${BASE}pokemon?limit=40`);
            const pokemonList = await response.json();


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

            <input

                className="search-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <select
                className="type-select"
                value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">Wszystkie typy</option>
                {getUniqueTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <div style={{ textAlign: "center" }}>
                {loading ? (
                    <p>Ładowanie...</p>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        {pokemons
                            .filter((pokemon) => {
                                const matchesName = pokemon.name.includes(text);
                                const matchesType = selectedType === '' || pokemon.types.includes(selectedType);
                                return matchesName && matchesType;
                            })
                            .map((pokemon) => (
                                <Card
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                    showDetails={showDetailsForId === pokemon.id}
                                    onToggleDetails={() => {
                                        if (showDetailsForId === pokemon.id) {
                                            setShowDetailsForId(null);
                                        } else {
                                            setShowDetailsForId(pokemon.id);
                                        }
                                    }}
                                />
                        ))}
                    </div>


                )}
            </div>
        </>
    );
}

export default App;