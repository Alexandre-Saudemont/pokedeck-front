import React, {useState, useEffect} from 'react';
import {PokemonRequest, DeckRequest, saveAuthorization} from '../../requests/index.js';
import Pokemon from './Pokemon/Pokemon.js';
import './Pokemons.css';

function Pokemons({setPokedex, pokedex, isLogged, setIsActive, deck, setDeck}) {
	const UserId = localStorage.getItem('id');
	const token = sessionStorage.getItem('token');

	const [hasClicked, setHasClicked] = useState(false); // État pour vérifier si l'utilisateur a cliqué
	const [isAnimated, setIsAnimated] = useState(false); // Pour déclencher l'animation

	// Lorsque l'overlay est cliqué, on change l'état et on réapplique l'animation
	const handleOverlayClick = () => {
		setIsAnimated(true);

		// Utiliser setTimeout pour réappliquer la classe après un petit délai pour forcer le redémarrage de l'animation
		setTimeout(() => {
			setHasClicked(true);
		}, 2000); // Petit délai pour garantir le redémarrage de l'animation
	};

	// useEffect(() => {
	// 	if (hasClicked) {
	// 		console.log('Overlay cliqué', hasClicked);
	// 	}
	// }, [hasClicked]);

	useEffect(() => {
		if (UserId) {
			async function requestForDeck() {
				try {
					saveAuthorization(token);
					const res = await DeckRequest(UserId);
					if (res.status === 200) {
						setDeck(res.data);
					}
				} catch (error) {
					console.error(error);
				}
			}

			async function requestForPokemon() {
				try {
					const response = await PokemonRequest();
					setPokedex(response.data);
					setIsActive(true);
				} catch (error) {
					console.error(error);
				}
			}

			requestForDeck();
			requestForPokemon();
		}
	}, [UserId, token, setDeck, setPokedex, setIsActive]);

	return (
		<div>
			{/* Affiche l'overlay uniquement si l'utilisateur n'a pas encore cliqué */}
			{!hasClicked && (
				<div className={`home-overlay ${isAnimated ? 'animate' : ''}`} onClick={handleOverlayClick}>
					<h1 className='overlay-title'>Bienvenue sur le Pokedeck !</h1>
				</div>
			)}
			{/* Affiche les Pokémons seulement après le clic */}

			<div className='pokemons'>
				{pokedex.length > 0 &&
					pokedex?.map((pokemon) => <Pokemon key={pokemon.id} {...pokemon} isLogged={isLogged} setDeck={setDeck} deck={deck} />)}
			</div>
		</div>
	);
}

export default Pokemons;
