import React from 'react';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {PokedexRequest, addPokemonToDeck, saveAuthorization, deletePokemon, DeckRequest} from '../../requests/index.js';
import './DetailsType.css';
import {Box, Button} from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from 'sweetalert2';
import pokemonTypeColors from '../../constants/PokemonTypeColors.js';

function DetailsType({isLogged, deck, setDeck}) {
	const {state} = useLocation();
	const UserId = localStorage.getItem('id');
	const token = sessionStorage.getItem('token');

	const [backgroundStyles, setBackgroundStyles] = useState({});

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

	async function handleAdd(e) {
		try {
			saveAuthorization(token);
			const response = await addPokemonToDeck(UserId, {pokemon_id: e.target.value});
			if (response.status === 200 && response.data.success) {
				const res = await DeckRequest(UserId);
				if (res.status === 200) {
					setDeck(res.data);
					return Swal.fire({
						icon: 'success',
						text: `${e.target.name} a été ajouté avec succès`,
					});
				}
			}
			Swal.fire({
				icon: 'error',
				text: response.data.error,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function handleDelete(e) {
		try {
			saveAuthorization(token);
			const response = await deletePokemon(UserId, {pokemon_id: e.target.value});
			if (response.status === 200) {
				const newDeckFiltered = deck.filter((pokemon) => pokemon.id !== e.target.value);
				setDeck(newDeckFiltered);
				return Swal.fire({
					icon: 'success',
					text: ` ${e.target.name} supprimé avec succès`,
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (UserId) {
			requestForDeck();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deck]);

	const getTypeBackgroundStyle = (types) => {
		const typesColors = types.map((type) => pokemonTypeColors[type]);
		const gradientColors = typesColors.length > 1 ? typesColors : [typesColors[0], `${typesColors[0]}88`];
		return `linear-gradient(to right, ${gradientColors.join(', ')})`;
	};

	useEffect(() => {
		async function fetchPokemonData() {
			try {
				const typesData = await PokedexRequest();
				const updatedBackgroundStyles = {};

				state.data.forEach((pokemon) => {
					const matchedPokemon = typesData.find((p) => p.id === pokemon.id);
					if (matchedPokemon) {
						const backgroundStyle = getTypeBackgroundStyle(matchedPokemon.types);
						updatedBackgroundStyles[pokemon.id] = {backgroundImage: backgroundStyle};
					}
				});
				setBackgroundStyles(updatedBackgroundStyles);
			} catch (error) {
				console.error('Failed to fetch pokemon types:', error);
			}
		}
		fetchPokemonData();
	}, [state.data]);

	return (
		<div className='detail-type'>
			{state.data.map((data) => (
				<div className='detail-type-container' key={data.id} style={backgroundStyles[data.id]}>
					<h2 className='detail-type-name'>{data.nom}</h2>
					<div className='detail-type-image-container'>
						<img src={data.url} className='detail-type-img' alt='pokemon' />
					</div>
					<Box>
						<h3 className='detail-type-comp'>Pv : {data.pv}</h3>
						<h3 className='detail-type-comp'>Attaque : {data.attaque}</h3>
						<h3 className='detail-type-comp'>Attaque spéciale : {data.attaque_spe}</h3>
						<h3 className='detail-type-comp'>Défense : {data.defense}</h3>
						<h3 className='detail-type-comp'>Défense spéciale : {data.defense_spe}</h3>
						<h3 className='detail-type-comp'>Vitesse : {data.vitesse}</h3>
					</Box>
					<Box sx={{pt: '.3em'}}>
						{isLogged &&
							(deck && deck.some((pokemon) => pokemon.id === data.id) ? (
								<Button
									className='pokemon-icon'
									onClick={(e) => {
										e.target.name = data.nom;
										e.target.value = data.id;
										handleDelete(e);
									}}>
									<RemoveCircleOutlineIcon />
								</Button>
							) : (
								<Button
									className='pokemon-icon'
									onClick={(e) => {
										e.target.name = data.nom;
										e.target.value = data.id;
										handleAdd(e);
									}}>
									<ControlPointRoundedIcon />
								</Button>
							))}
					</Box>
				</div>
			))}
		</div>
	);
}

export default DetailsType;
