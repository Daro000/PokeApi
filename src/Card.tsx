interface PokemonProps {
    pokemon: {
        name: string;
        id: number;
        height: number;
        weight: number;
        abilities: string[];
        types: string[];
        sprite: string;
    }
}

const Card = ({ pokemon }: PokemonProps) => {
    const { name, id, height, weight, abilities, types, sprite } = pokemon;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '300px',
            margin: '0 auto'
        }}>
            <h3 style={{
                textTransform: 'capitalize',
                margin: '0 0 10px 0',
                color: '#333'
            }}>
                #{id} {name}
            </h3>

            {sprite && (
                <img
                    src={sprite}
                    alt={name}
                    style={{
                        width: '96px',
                        height: '96px',
                        marginBottom: '10px'
                    }}
                />
            )}

            <div style={{ marginBottom: '10px' }}>
                <strong>Typy:</strong>
                <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                    {types.map(type => (
                        <span
                            key={type}
                            style={{
                                backgroundColor: getTypeColor(type),
                                color: 'white',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                textTransform: 'capitalize'
                            }}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '10px', textAlign: 'left', width: '100%' }}>
                <strong>Umiejętności:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    {abilities.map(ability => (
                        <li key={ability} style={{ textTransform: 'capitalize' }}>
                            {ability.replace('-', ' ')}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ fontSize: '14px', color: '#666' }}>
                <div><strong>Wzrost:</strong> {height / 10} m</div>
                <div><strong>Waga:</strong> {weight / 10} kg</div>
            </div>
        </div>
    );
};


function getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    };

    return colors[type] || '#68A090';
}

export default Card;