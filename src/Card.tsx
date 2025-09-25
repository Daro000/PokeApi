
interface PokemonProps{
    name: string
}



const Card = ({name}:PokemonProps) =>{


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>Pokemon: {name}</h3>
        </div>
    )
}
export default Card;
