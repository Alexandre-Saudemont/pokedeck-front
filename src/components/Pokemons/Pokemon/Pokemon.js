import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {PokemonRequestByID, 
    addPokemonToDeck, 
    saveAuthorization, 
    deletePokemon, 
    DeckRequest 
} from '../../../requests/index.js'

import './Pokemon.css';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import Swal from 'sweetalert2';

function Pokemon({ nom, url, id, isLogged, setDeck, deck }) {

    const navigate = useNavigate();
    const UserId = localStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    
    async function handleClick() {
        const response = await PokemonRequestByID(id);

        if (response.status === 200) {
            navigate('/detailsPokemon', {
                state:
                {
                    id: response.data.id,
                    nom: response.data.nom,
                    url: response.data.url,
                    pv: response.data.pv,
                    attaque: response.data.attaque,
                    attaque_spe: response.data.attaque_spe,
                    defense: response.data.defense,
                    defense_spe: response.data.defense_spe,
                    vitesse: response.data.vitesse
                }
            })
        }
    }

    async function handleAdd() {
          
        try {
            saveAuthorization(token);
            const response = await addPokemonToDeck(UserId, { pokemon_id: id });       
            if (response.status === 200 && response.data.success) {               
                const res = await DeckRequest(UserId);
                if (res.status === 200) {
                    setDeck(res.data);              
                    return Swal.fire({
                        icon:"success",
                        text: `${nom} a été ajouté avec succès`
                    })    
                }                                    
            }                          
            Swal.fire({
                icon:"error",
                text: response.data.error
            })                             

        } catch (error) {
            console.error(error)            
        }
    }

    async function handleDelete() {
        try {
            saveAuthorization(token);
            const response = await deletePokemon(UserId, { pokemon_id: id });
            if (response.status === 200) {               
                const newDeckFiltered = deck.filter((pokemon => pokemon.id !== id));              
                setDeck(newDeckFiltered);
                console.log(newDeckFiltered, deck)
                return Swal.fire({
                    icon:"success",
                    text:`${nom} supprimé avec succès`
                })                
            }            

        } catch (error) {
            console.error(error)            
        }
    }

    async function requestForDeck (){
        if (UserId){
            saveAuthorization(token)
            const res = await DeckRequest(UserId);
            if (res.status === 200) {
                setDeck(res.data);           
            }
        }
    }
    
    useEffect(() => {        
        requestForDeck();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deck.length])

    return (
        <div className="pokemon-container">            

            <button onClick={handleClick}>
                <img className="pokemon-img" src={url} alt="pokemon" />
            </button>
            <div className="pokemon-title">
                <h1 className="pokemon-nom">{nom}</h1>


                {/* Est que mon state isLogged est vide ou plein ? Si il est rempli, alors j'ai un utilisateur connecté et j'affiche le bouton  */}
                {isLogged &&
                    <div className="pokemon-button">

                        {deck && deck.some(pokemon => pokemon.id === id) ?
                            <button
                                className="pokemon-icon"                                
                                onClick={handleDelete}
                            >
                                <RemoveCircleOutlineIcon />
                            </button> :
                            <button
                                className="pokemon-icon"
                                onClick={handleAdd}>
                                <ControlPointRoundedIcon />
                            </button>
                        }

                    </div>
                }
            </div>           
        </div>
    )
}

export default Pokemon;