import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {RegisterRequest} from '../../requests';
import {InputLabel, Input, Box, Button} from '@mui/material';
import Swal from 'sweetalert2';
import './Inscription.css';

function Inscription({setIsActive}) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const navigate = useNavigate();

	const styleBox = {
		p: '2rem',
		textAlign: 'center',
	};

	const timeOutFunction = () => {
		navigate('/Connexion');
	};

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const response = await RegisterRequest({email, password, username, lastname, firstname});

			if (response.status === 200) {
				Swal.fire({
					icon: 'error',
					text: `${response.data.error}`,
				});
			}

			if (response.status === 201) {
				setTimeout(timeOutFunction, 3000);
				Swal.fire({
					text: `Bravo ${username} a bien été créé avec succès`,
					icon: 'success',
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					customClass: {
						timerProgressBar: '.inscription-swal-timer',
					},
				});
			}
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				text: `${error.response.data.error}`,
			});
		}
	}
	useEffect(() => {
		setIsActive(false);
	}, []);
	useEffect(() => {
		setIsActive(false);
	}, [setIsActive]);

	return (
		<div className='inscription-container'>
			<Box sx={styleBox} className='inscription-box'>
				<form action='submit' onSubmit={handleSubmit}>
					<h2 className='inscription-title'>Formulaire d'inscription</h2>
					<InputLabel htmlFor='lastname' className='inscription-input-label'>
						Nom
					</InputLabel>
					<Input
						className='inscription-input'
						id='lastname'
						type='text'
						name='lastname'
						value={lastname}
						placeholder='Dubois'
						onChange={(e) => setLastname(e.target.value)}
					/>
					<InputLabel htmlFor='firstname' className='inscription-input-label'>
						Prénom
					</InputLabel>
					<Input
						className='inscription-input'
						id='firstname'
						type='text'
						name='firstname'
						value={firstname}
						placeholder='Jean-Eude'
						onChange={(e) => setFirstname(e.target.value)}
					/>
					<InputLabel htmlFor='username' className='inscription-input-label'>
						Pseudo
					</InputLabel>
					<Input
						className='inscription-input'
						id='username'
						type='text'
						name='username'
						value={username}
						placeholder='SachaLeDresseur'
						onChange={(e) => setUsername(e.target.value)}
					/>
					<InputLabel htmlFor='email' className='inscription-input-label'>
						Adresse Email
					</InputLabel>
					<Input
						className='inscription-input'
						id='email'
						type='email'
						name='email'
						value={email}
						placeholder='Pikachu@gmail.com'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<InputLabel htmlFor='password' className='inscription-input-label'>
						Mot de passe
					</InputLabel>
					<Input
						className='inscription-input'
						id='password'
						type='password'
						name='password'
						value={password}
						aria-describedby='password-text'
						placeholder='*********'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button id='inscription-submit' type='submit'>
						Envoyer
					</Button>
				</form>
			</Box>
		</div>
	);
}

export default Inscription;
