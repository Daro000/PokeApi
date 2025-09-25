
interface PokemonProps{
    name: string
}



const Card = ({name}:PokemonProps) =>{


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Pokemon:{name}</h1>
        </div>
    )
}
export default Card;
