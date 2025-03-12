import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

export async function PokedexRequest() {
	const response = await axiosInstance.get('/Pokedex');

	return response.data.map((pokemon) => ({
		id: pokemon.id,
		nom: pokemon.nom,
		types: pokemon.types,
	}));
}
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token'); // Récupération du token

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

export function PokemonRequest() {
	const response = axiosInstance.get('/Pokemon');
	console.log('pokemons reponse', response);
	return response;
}

export function PokemonRequestByID(id) {
	const response = axiosInstance.get(`/Pokemon/${id}`);
	return response;
}

export function TypesRequest() {
	const response = axiosInstance.get('/Types');
	return response;
}

export function PokemonByTypesRequest(id) {
	const response = axiosInstance.get(`/Types/${id}`);
	return response;
}

export function RegisterRequest({username, firstname, password, email, lastname}) {
	return axiosInstance.post('/Inscription', {
		lastname,
		firstname,
		username,
		email,
		password,
	});
}
export function LoginRequest(email, password) {
	const response = axiosInstance.post('/Connexion', {
		email: email,
		password: password,
	});
	return response;
}

export function userInfosRequest(id) {
	const response = axiosInstance.get(`/User/${id}`);
	return response;
}

export function UpdateUserRequest(id, data) {
	const response = axiosInstance.put(`/User/${id}`, {
		username: data.username,
		lastname: data.lastname,
		firstname: data.firstname,
		email: data.email,
	});
	return response;
}

export function DeckRequest(id) {
	const token = localStorage.getItem('token');
	if (!token) {
		return Promise.resolve({error: 'Token manquant'});
	}
	return axiosInstance.get(`/Deck/${id}`);
}

export function saveAuthorization(token) {
	axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function UserDeleteRequest(id) {
	const response = axiosInstance.delete(`/User/${id}`);
	return response;
}

export function addPokemonToDeck(id, pokemon_id) {
	const response = axiosInstance.post(`/Deck/${id}`, pokemon_id);
	return response;
}

export function deletePokemon(id, pokemon_id) {
	const response = axiosInstance.delete(`/Deck/Pokemon/${id}`, {data: pokemon_id});
	return response;
}

export function deleteAllPokemons(id) {
	const response = axiosInstance.delete(`/Deck/AllPokemons/${id}`);
	return response;
}
