import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PokemonRequest } from "../../requests";

import "./NavBar.css";

import {
    AppBar,
    Toolbar,
    Input,
    InputLabel,
    Button,
    Typography
    }
    from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ isLogged, setIsLogged, setSuccess, setPokedex, isActive }) {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [value, setValue] = useState("");
    const [menuBurger, setMenuBurger] = useState(false);

    function handleBurger() {
        setMenuBurger(!menuBurger);
    }

    function handleClick() {
        sessionStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("deck");
        setIsLogged(false);
        setSuccess("");
        navigate("/");
    };

    useEffect(() => {

        if (token) {
            setIsLogged(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged])

    function handleChange(event) {
        console.log(value)
        setValue(event.target.value);
        requestForFilteredPokemon(event.target.value);
    }

    async function requestForFilteredPokemon(pokemonSearched) {

        try {
            const response = await PokemonRequest();
            const searchPokemonFiltered = response.data.filter((pokemon) => {
                const pokemonToLowerCase = pokemon.nom.toLowerCase();
                return pokemonToLowerCase.includes(pokemonSearched);
            })
            console.log("filtré", searchPokemonFiltered);
            setPokedex(searchPokemonFiltered)

        } catch (error) {
            console.error(error)
        }
    }
    const theme = createTheme({
        typography: {
            "fontFamily": `"Alumni Sans Collegiate One", sans-serif`,
            // "color": `"black"`,
            // "pl": "1rem",
        }
    })
    return (
        <nav id="navbar">

            <AppBar  >

                <Toolbar id="navbar-toolbar">
                    <div id="navbar-container-menu">

                        {/* <Button> */}
                            <NavLink className="nav-menu" to="/">Accueil </NavLink>
                        {/* </Button> */}
                        {/* <Button> */}
                            <NavLink className="nav-menu" to="/types">Types de Pokemon</NavLink>
                        {/* </Button> */}
                        {isLogged ?
                            <>
                                {/* <Button> */}
                                    <NavLink className="nav-menu" to="/Deck"> Voir son Deck</NavLink>
                                {/* </Button>
                                <Button> */}
                                    <NavLink className="nav-menu" to="/Profil"> Votre Profil</NavLink>
                                {/* </Button> */}
                                <Button  className="nav-menu nav-menu-connexion" sx={{color:"black", ":hover": { bgcolor: "lightblue" }, fontWeight:"bold", fontSize:"16px",  lineHeight:"16px", textTransform:"none"}} type="button" onClick={handleClick}> <p className="nav-menu-connexion">Se Déconnecter</p></Button>
                            </> :
                            <>
                                {/* <Button > */}
                                    <NavLink className="nav-menu" to="/Inscription">Rejoindre Pokedeck </NavLink>
                                {/* </Button> */}
                                {/* <Button sx={{ ":hover": { bgcolor: "lightblue" } }}> */}
                                    <NavLink className="nav-menu nav-menu-connexion" to="/Connexion">Se Connecter</NavLink>
                                {/* </Button> */}
                            </>
                        }
                    </div>
                    <div className="nav-pokedex">
                        <Button onClick={handleBurger}
                            id="nav-burger"
                        >
                            <MenuIcon />
                        </Button>
                        <img className="nav-logo" src="/img/pokeball.png" alt="logo pokeball" />
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2" id="nav-pokedex-typo">
                                Pokedeck
                            </Typography>
                        </ThemeProvider>
                        <Button
                            id="nav-search-responsive"
                        >
                            <SearchIcon sx={{ width: "2rem" }} />
                        </Button>
                    </div>
                    {menuBurger &&
                        <div id="navbar-container-menu-burger">

                            <Button onClick={handleBurger}>
                                <NavLink className="nav-menu" to="/">Accueil </NavLink>
                            </Button>
                            <Button onClick={handleBurger}>
                                <NavLink className="nav-menu" to="/types">Types </NavLink>
                            </Button>
                            {isLogged ?
                                <>
                                    <Button onClick={handleBurger}>
                                        <NavLink className="nav-menu" to="/Deck">Deck</NavLink>
                                    </Button>
                                    <Button onClick={handleBurger}>
                                        <NavLink className="nav-menu" to="/Profil"> Profil</NavLink>
                                    </Button>
                                    <Button sx={{ ":hover": { bgcolor: "lightblue", fontFamily:"Segeo UI" } }} className="nav-menu" type="button" onClick={handleClick}>Déconnexion</Button>
                                </> :
                                <>
                                    <Button onClick={handleBurger}>
                                        <NavLink className="nav-menu" to="/Inscription">Inscription</NavLink>
                                    </Button>
                                    <Button sx={{ ":hover": { bgcolor: "lightblue" } }} onClick={handleBurger}>
                                        <NavLink className="nav-menu " to="/Connexion">Connexion</NavLink>
                                    </Button>
                                </>
                            }
                        </div>

                    }
                    {isActive ?

                        <div className="nav-element-right">
                            <InputLabel htmlFor="search" />

                            <Input sx={{ display: "inline-flex", paddingLeft: "2rem", width: "80%" }}
                                className="nav-search"
                                id="search"
                                type="search"
                                value={value}
                                onChange={handleChange}
                                placeholder="Rechercher..."
                            />
                        </div> :
                        <div className="nav-element-right-empty"></div>
                    }
                </Toolbar>
            </AppBar>

        </nav >
    )

}

export default Navbar;