
import './App.css'
import {useEffect, useState} from "react";
import Card from "./Card.tsx";

const BASE = 'https://pokeapi.co/api/v2/'

type Pokemon = {
    name: string
}

function App() {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    function getAllPokemons() {
        fetch(`${BASE}pokemon`)
            .then(res => res.json())
            .then(pokemonList => console.log(pokemonList))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAllPokemons();
    },[])

  return (
    <>
        <h1>Pokemony</h1>

        <div style={{textAlign: "center"}}>
            {
                pokemons.map((pokemon) => (
                    <Card name={pokemon.name}/>
                ))
            }
        </div>

    </>
  )
}

export default App
