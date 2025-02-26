import React, {useState, useEffect} from 'react';
import {PokemonRequest, DeckRequest, saveAuthorization} from '../../requests/index.js';
import Pokemon from './Pokemon/Pokemon.js';
import './Pokemons.css';

function Pokemons({setPokedex, pokedex, isLogged, setIsActive, deck, setDeck}) {
	const UserId = localStorage.getItem('id');
	const token = sessionStorage.getItem('token');

	const [hasClicked, setHasClicked] = useState(false);
	const [isAnimated, setIsAnimated] = useState(false);

	const handleOverlayClick = () => {
		setIsAnimated(true);
		setTimeout(() => {
			setHasClicked(true);
		}, 2000);
	};

	useEffect(() => {
		console.log('useEffect Pokemons');

		// Charger les Pokémon même si l'utilisateur n'est pas connecté
		async function requestForPokemon() {
			console.log('Request for Pokemon');
			try {
				const response = await PokemonRequest();
				console.log('Pokemon Response:', response);
				setPokedex(response.data);
				setIsActive(true);
			} catch (error) {
				console.error(error);
			}
		}

		// Charger le deck uniquement si l'utilisateur est connecté
		if (UserId) {
			async function requestForDeck() {
				console.log('Request for Deck');
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

			requestForDeck();
		}

		// Charger les Pokémon dans tous les cas
		requestForPokemon();
	}, [UserId, token, setDeck, setPokedex, setIsActive]);

	return (
		<div>
			{!hasClicked && (
				<div className={`home-overlay ${isAnimated ? 'animate' : ''}`} onClick={handleOverlayClick}>
					<h1 className='overlay-title'>Bienvenue sur le Pokedeck !</h1>
				</div>
			)}

			<div className='pokemons'>
				{pokedex.length > 0 ? (
					pokedex.map((pokemon) => <Pokemon key={pokemon.id} {...pokemon} isLogged={isLogged} setDeck={setDeck} deck={deck} />)
				) : (
					<p>Chargement des Pokémon...</p>
				)}
			</div>
		</div>
	);
}

export default Pokemons;
