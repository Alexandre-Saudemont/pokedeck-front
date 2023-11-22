import { DeckRequest, saveAuthorization, deleteAllPokemons, deletePokemon } from '../../requests';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Deck.css';
import Button from '@mui/material/Button';
import { Box} from '@mui/material';
import Swal from 'sweetalert2'

function Deck({ setIsActive, setDeck, deck }) {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("id");
    
    const styledelete = {    
          
        "&:hover": {
            backgroundColor: "lightgrey",
            color: "green"
          }, 
    }

    async function RequestForDeck() {

        try {
            saveAuthorization(token);
            const response = await DeckRequest(userId);
            if (response.status === 200) {
                setDeck(response.data);                         
            }
        } catch (error) {
            console.error(error);           
        }
    }
    async function handleDeleteDeck() {
       
            Swal.fire({                
                icon:"question",
                title:"Êtes vous sur de vouloir réinitialiser votre deck ?",
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText:"Oui, je suis sur",
                cancelButtonText:"Non, annuler"
            })
            .then(async(result)=>{
                if (result.isConfirmed) {
                    const response = await deleteAllPokemons(userId);
                    if (response.status === 200) {
                        Swal.fire({title:'deck supprimé avec succès !', icon:'success'});         
                        setDeck([]);
                        localStorage.setItem("deck",)                
                    }                    
                }
        })
        .catch ((error) =>{
            console.error(error);          
        })
    }

    async function handleDeletePokemon(e) {
        Swal.fire({                
            icon:"question",
            title:`Êtes vous sur de vouloir supprimer ${e.target.name} de votre deck ?`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:"Oui, je suis sur",
            cancelButtonText:"Non, annuler"
        })
        .then(async(result)=>{
            if (result.isConfirmed) {
                saveAuthorization(token);
                const response = await deletePokemon(userId, { pokemon_id: e.target.value });
    
                if (response.status === 200) {
                    const newDeckFiltered = deck.filter((pokemon => pokemon.id !== Number(e.target.value)));
                    setDeck(newDeckFiltered);
                    localStorage.setItem("deck", JSON.stringify(newDeckFiltered));   
                    Swal.fire({ 
                        text: `${e.target.name} supprimé avec succès`,
                        icon:"success"
                    })                 
                } else {
                    Swal.fire({ 
                        text: `${e.target.name} n'a pas pu être supprimé`,
                        icon:"error"
                    })
                }
            }
        })    
       .catch ((error) =>{
            console.error(error)     
        })
    }

    useEffect(() => {
        RequestForDeck();
        setIsActive(false)
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deck.length])

    return (
        <div id="deck">
            <h1 className="deck-title">
                Votre deck de Pokemons
            </h1>
            {deck.length === 0 ?
            <p id="deck-nodeck-text">Vous n'avez pas encore de deck. Vous pouvez ajouter des Pokemons à votre deck sur la <Link to="/" id="deck-nodeck-link"> Page d'Accueil</Link></p> :
            <div className="deck-button">
                <Button
                    sx={styledelete}
                    justify="center"
                    onClick={handleDeleteDeck}
                >
                    Réinitaliser mon deck
                </Button>
            </div>
            }

            <div className="deck-container">
               
                {deck && deck.map((pokemon) => (
                 
                        <div key={pokemon.id} className="deck-pokemon">
                            <p className="deck-pokemon-nom">{pokemon.nom}</p>
                            <div className='deck-image'>
                                <img src={pokemon.url} alt={pokemon.nom}></img>
                                    <Box>
                                    <h3 className="deck-type-comp">Pv : {pokemon.pv}</h3>
                                    <h3 className="deck-type-comp">Attaque : {pokemon.attaque}</h3>
                                    <h3 className="deck-type-comp">Attaque spéciale : {pokemon.attaque_spe}</h3>
                                    <h3 className="deck-type-comp">Défense : {pokemon.defense}</h3>
                                    <h3 className="deck-type-comp">Défense spéciale : {pokemon.defense_spe}</h3>
                                    <h3 className="deck-type-comp">Vitesse : {pokemon.vitesse}</h3>
                                    </Box>
                            </div>
                            <Button
                                sx={styledelete}
                                className="deck-buttonDelete-pokemon"
                                onClick={(e)=>{
                                    e.target.name = pokemon.nom
                                handleDeletePokemon(e)}}
                                value={pokemon.id}
                            >
                                Supprimer {pokemon.nom} de votre Deck
                            </Button>
                        </div>
                    
                ))
                }

            </div>
        </div>
    );
}

export default Deck;