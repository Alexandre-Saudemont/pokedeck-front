import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {LoginRequest, DeckRequest, saveAuthorization} from '../../requests';

import './Connexion.css';
import {Input, InputLabel, Button} from '@mui/material';

import Swal from 'sweetalert2';

function Connexion({setIsLogged, setIsActive, setDeck}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	// const styleBox = {
	// 	bgcolor: 'lightgrey',
	// 	p: '2rem',
	// 	textAlign: 'center',
	// };
	const timeOutFunction = () => {
		navigate('/');
	};

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await LoginRequest(email, password);
			if (response.status === 200) {
				localStorage.setItem('id', response.data.id);
				setIsLogged(true);
				Swal.fire({
					icon: 'success',
					text: `Bienvenue ${response.data.username},  Redirection en cours ...`,
					timer: 2000,
					showConfirmButton: false,
					timerProgressBar: true,
				});
				setTimeout(timeOutFunction, 2000);
				sessionStorage.setItem('token', response.data.token);
			}
			saveAuthorization(response.data.token);
			const res = await DeckRequest(response.data.id);
			if (res.status === 200) {
				setDeck(res.data);
			}
		} catch (error) {
			console.error('erreur:', error);
			Swal.fire({
				icon: 'error',
				text: `${error.response.data.error}`,
			});
			setEmail('');
			setPassword('');
		}
	}
	useEffect(() => {
		setIsActive(false);
	}, []);

	return (
		<div className='connexion-container'>
			{/* <Box sx={styleBox}> */}
			<div className='connexion-subcontainer'>
				<h2 className='connexion-title'>Se connecter</h2>
				<form action='submit' onSubmit={handleSubmit}>
					<InputLabel htmlFor='email' className='connexion-input-label'>
						Adresse Email
					</InputLabel>
					<Input
						className='connexion-input'
						type='email'
						name='email'
						value={email}
						placeholder='Sacha@gmail.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<InputLabel htmlFor='password' className='connexion-input-label'>
						Mot de passe
					</InputLabel>
					<Input
						className='connexion-input'
						type='password'
						name='password'
						value={password}
						placeholder='********'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className='connexion-button-container'>
						<Button id='connexion-submit' type='submit'>
							Envoyer
						</Button>
						<Button href='/Inscription' id='connexion-submit'>
							S'inscrire
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Connexion;
