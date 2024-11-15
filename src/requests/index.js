import axios from 'axios';

<<<<<<< HEAD
=======
// Instance pour les requêtes publiques sans token
const axiosPublicInstance = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

// Instance pour les requêtes nécessitant un token
>>>>>>> 838a6dc (first commit V2)
const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

<<<<<<< HEAD
export async function PokedexRequest() {
	const response = await axiosInstance.get('/Pokedex');

=======
axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token'); // Récupération du token
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

// Intercepteur pour gérer les erreurs 401 et 403
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
			console.error('Accès refusé ou token invalide.');
		}
		return Promise.reject(error);
	},
);

// Requêtes publiques (pas besoin de token)
export async function PokedexRequest() {
	const response = await axiosPublicInstance.get('/Pokedex');
>>>>>>> 838a6dc (first commit V2)
	return response.data.map((pokemon) => ({
		id: pokemon.id,
		nom: pokemon.nom,
		types: pokemon.types,
	}));
}

export function PokemonRequest() {
<<<<<<< HEAD
	const response = axiosInstance.get('/Pokemon');
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

export function RegisterRequest(username, firstname, password, email, lastname) {
	const response = axiosInstance.post('/Inscription', username, firstname, password, email, lastname);
	return response;
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
=======
	return axiosPublicInstance.get('/Pokemon');
}

export function PokemonRequestByID(id) {
	return axiosPublicInstance.get(`/Pokemon/${id}`);
}

export function TypesRequest() {
	return axiosPublicInstance.get('/Types');
}

export function PokemonByTypesRequest(id) {
	return axiosPublicInstance.get(`/Types/${id}`);
}

// Requêtes nécessitant un token
export function DeckRequest(id) {
	const token = localStorage.getItem('token');
	if (!token) {
		// Sortie immédiate si le token est absent

		return Promise.resolve({error: 'Token manquant'});
	}
	return axiosInstance.get(`/Deck/${id}`);
}

export function userInfosRequest(id) {
	return axiosInstance.get(`/User/${id}`);
}

export function UpdateUserRequest(id, data) {
	return axiosInstance.put(`/User/${id}`, {
>>>>>>> 838a6dc (first commit V2)
		username: data.username,
		lastname: data.lastname,
		firstname: data.firstname,
		email: data.email,
	});
<<<<<<< HEAD
	return response;
}

export function DeckRequest(id) {
	const response = axiosInstance.get(`/Deck/${id}`);
	return response;
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
=======
}

export function UserDeleteRequest(id) {
	return axiosInstance.delete(`/User/${id}`);
}

export function addPokemonToDeck(id, pokemon_id) {
	return axiosInstance.post(`/Deck/${id}`, {pokemon_id});
}

export function deletePokemon(id, pokemon_id) {
	return axiosInstance.delete(`/Deck/Pokemon/${id}`, {data: {pokemon_id}});
}

export function deleteAllPokemons(id) {
	return axiosInstance.delete(`/Deck/AllPokemons/${id}`);
}

// Requêtes d'inscription et connexion (sans token)
export function RegisterRequest(username, firstname, password, email, lastname) {
	return axiosPublicInstance.post('/Inscription', {
		username,
		firstname,
		password,
		email,
		lastname,
	});
}

export function LoginRequest(email, password) {
	return axiosPublicInstance.post('/Connexion', {email, password});
}

// Sauvegarde du token d'autorisation
export function saveAuthorization(token) {
	if (token) {
		localStorage.setItem('token', token);
		axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
	}
>>>>>>> 838a6dc (first commit V2)
}
