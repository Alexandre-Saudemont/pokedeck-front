import {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {PokemonRequest} from '../../requests';
import {AppBar, Toolbar, Input, Button} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PokedexLogo from '../../asset/PokedeckLogo.png';
import './NavBar.css';

function Navbar({isLogged, setIsLogged, setSuccess, setPokedex, isActive}) {
	const navigate = useNavigate();
	const token = sessionStorage.getItem('token');
	const [value, setValue] = useState('');
	const [menuBurger, setMenuBurger] = useState(false);
	const [searchVisible, setSearchVisible] = useState(false);

	function handleBurger() {
		setMenuBurger(!menuBurger);
	}

	function handleClick() {
		sessionStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('deck');
		setIsLogged(false);
		setSuccess('');
		navigate('/');
	}

	function onClickLogin() {
		navigate('/Connexion');
	}

	function handleSearchClick() {
		console.log('click');
		setSearchVisible(!searchVisible);
	}

	useEffect(() => {
		if (token) {
			setIsLogged(true);
		}
	}, [isLogged]);

	function handleChange(event) {
		setValue(event.target.value);
		requestForFilteredPokemon(event.target.value);
	}

	async function requestForFilteredPokemon(pokemonSearched) {
		try {
			const response = await PokemonRequest();
			const searchPokemonFiltered = response.data.filter((pokemon) => {
				const pokemonToLowerCase = pokemon.nom.toLowerCase();
				return pokemonToLowerCase.includes(pokemonSearched.toLowerCase());
			});

			setPokedex(searchPokemonFiltered);
		} catch (error) {
			console.error(error);
		}
	}
	const theme = createTheme({
		typography: {
			fontFamily: `"Alumni Sans Collegiate One", sans-serif`,
			// "color": `"black"`,
			// "pl": "1rem",
		},
	});
	return (
		<nav id='navbar'>
			<AppBar sx={{bgcolor: 'lightcoral'}}>
				<Toolbar id='navbar-toolbar'>
					<div id='navbar-container-menu'>
						<button className='nav-buttonLogin' onClick={onClickLogin}>
							<img className='nav-loginIcon' src='/assets/login-icon.svg' alt='login-Icon' />
						</button>
						{/* <Button> */}
						<NavLink className='nav-menu' to='/types'>
							Types
						</NavLink>
						{/* </Button> */}
						{isLogged ? (
							<>
								{/* <Button> */}
								<NavLink className='nav-menu' to='/Deck'>
									{' '}
									Deck
								</NavLink>
								{/* </Button>
                                <Button> */}
								gg
								<NavLink className='nav-menu' to='/Profil'>
									{' '}
									Votre Profil
								</NavLink>
								{/* </Button> */}
								<Button
									className='nav-menu nav-menu-connexion'
									sx={{
										color: 'black',
										':hover': {bgcolor: 'lightblue'},
										fontWeight: 'bold',
										fontSize: '16px',
										lineHeight: '16px',
										textTransform: 'none',
									}}
									type='button'
									onClick={handleClick}>
									{' '}
									<p className='nav-menu-connexion'>Déconnexion</p>
								</Button>
							</>
						) : (
							<>
								{/* <Button sx={{ ":hover": { bgcolor: "lightblue" } }}> */}
								<NavLink className='nav-menu ' to='/Connexion'>
									Connexion
								</NavLink>
								{/* </Button> */}
							</>
						)}
					</div>
					<div className='nav-pokedex'>
						<Button onClick={handleBurger} id='nav-burger'>
							<MenuIcon className='nav-burger-icon' />
						</Button>

						<NavLink to='/'>
							<img src={PokedexLogo} alt='Pokedex Logo' className='nav-pokedeck-icon' />
						</NavLink>

						{isActive && (
							<Button id='nav-search-responsive'>
								<SearchIcon className='nav-burger-icon' sx={{width: '2rem'}} onClick={handleSearchClick} />
							</Button>
						)}
					</div>
					{menuBurger && (
						<div id='navbar-container-menu-burger'>
							<Button onClick={handleBurger}></Button>
							<Button onClick={handleBurger}>
								<NavLink className='nav-menu' to='/types'>
									Types{' '}
								</NavLink>
							</Button>
							{isLogged ? (
								<>
									<Button onClick={handleBurger}>
										<NavLink className='nav-menu' to='/Deck'>
											Deck
										</NavLink>
									</Button>
									<Button onClick={handleBurger}>
										<NavLink className='nav-menu' to='/Profil'>
											{' '}
											Profil
										</NavLink>
									</Button>
									<Button
										sx={{
											':hover': {bgcolor: 'lightblue', fontFamily: 'Segeo UI'},
										}}
										className='nav-menu-disconnect-button'
										type='button'
										onClick={handleClick}>
										Déconnexion
									</Button>
								</>
							) : (
								<>
									<Button onClick={handleBurger}>
										<NavLink className='nav-menu' to='/Inscription'>
											Inscription
										</NavLink>
									</Button>
									<Button sx={{':hover': {bgcolor: 'lightblue'}}} onClick={handleBurger}>
										<NavLink className='nav-menu ' to='/Connexion'>
											Connexion
										</NavLink>
									</Button>
								</>
							)}
						</div>
					)}
					{isActive ? (
						<div className={`nav-element-right ${searchVisible ? 'nav-search-visible' : ''}`}>
							<input
								className='nav-search'
								id='search'
								type='search'
								value={value}
								onChange={handleChange}
								placeholder='Rechercher...'
							/>
						</div>
					) : (
						<div className='nav-element-right-empty'></div>
					)}
				</Toolbar>
			</AppBar>
		</nav>
	);
}

export default Navbar;
