import { useEffect } from 'react';
import { PokemonRequest, DeckRequest, saveAuthorization } from '../../requests/index.js';
import Pokemon from './Pokemon/Pokemon.js';
import './Pokemons.css';


function Pokemons({ setPokedex, pokedex, isLogged, setIsActive, deck, setDeck }) {

    const UserId = localStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    async function requestForDeck() {
        try {
            saveAuthorization(token);
            const res = await DeckRequest(UserId);
            if (res.status === 200) {
                setDeck(res.data);
            }

        } catch (error) {
            console.error(error)
        }
    }
    async function requestForPokemon() {
        try {
            console.log("blabla")
            const response = await PokemonRequest();
            console.log("response", response)
            setPokedex(response.data);
            setIsActive(true)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (UserId) {
            requestForDeck();
        }
        requestForPokemon();

    }, 
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
        <>
            <div className="pokemons">
                {pokedex.length > 0 && pokedex.map((pokemon) => (
                    <Pokemon key={pokemon.id} {...pokemon} isLogged={isLogged} setDeck={setDeck} deck={deck} />
                ))
                }
            </div>
        </>
    )
}

export default Pokemons;