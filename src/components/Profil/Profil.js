import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {userInfosRequest, saveAuthorization, UpdateUserRequest, UserDeleteRequest} from '../../requests';
import './Profil.css';
import {CardHeader, Card, Box, CardContent, Typography, Modal, Button, Input, InputLabel} from '@mui/material';
import Swal from 'sweetalert2';

function Profil({setIsLogged, setIsActive}) {
	const token = sessionStorage.getItem('token');
	const id = localStorage.getItem('id');
	const [infosUser, setInfosUser] = useState('');
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');
	const {register, handleSubmit} = useForm();
	const navigate = useNavigate();

	const handleOpen = () => {
		setOpen(true);
		setError('');
		setSuccess('');
	};

	const handleClose = () => {
		setOpen(false);
	};

	const timeOutFunction = () => {
		navigate('/');
	};

	const succesModification = () => {
		Swal.fire({
			icon: 'success',
			text: 'Modification effectuée avec succès',
			timerProgressBar: true,
			showConfirmButton: false,
			timer: 2000,
		});
	};

	async function requestInfoUser() {
		try {
			saveAuthorization(token);
			const response = await userInfosRequest(id);
			setInfosUser(response.data);
			setEmail(response.data.email);
			setUsername(response.data.username);
			setFirstname(response.data.firstname);
			setLastname(response.data.lastname);
		} catch (error) {
			console.error(error);
		}
	}

	async function onSubmit(data) {
		try {
			saveAuthorization(token);
			const response = await UpdateUserRequest(id, data);
			if (response.status === 200 && response.data.success) {
				setInfosUser((prevState) => ({
					...prevState,
					email: data.email,
					username: data.username,
					firstname: data.firstname,
					lastname: data.lastname,
				}));
				setSuccess(response.data.success);
				setError('');
				handleClose();
			} else {
				setSuccess('');
				setError(response.data.error);
			}
		} catch (error) {
			console.error(error);
			setSuccess('');
			setError(error.response.data.error);
		}
	}

	async function handleDelete() {
		Swal.fire({
			icon: 'question',
			title: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'Oui, je suis sur',
			cancelButtonText: 'Non, annuler',
		})
			.then(async (result) => {
				if (result.isConfirmed) {
					saveAuthorization(token);
					const response = await UserDeleteRequest(id);
					if (response.status === 201) {
						localStorage.removeItem('id');
						sessionStorage.removeItem('token');
						setIsLogged(false);
						setTimeout(timeOutFunction, 2000);
						Swal.fire({
							icon: 'success',
							text: 'Compte supprimé avec succès',
							timer: 2000,
							timerProgressBar: true,
							showConfirmButton: false,
						});
					}
				}
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					text: `${error.response.data.error}`,
				});
			});
	}

	useEffect(() => {
		requestInfoUser();
		setIsActive(false);
	}, []);

	useEffect(() => {
		if (success && !error) {
			succesModification();
		}
	}, [success, error]);

	return (
		<div id='profil'>
			{infosUser && (
				<>
					<Box>
						<Card className='profil-card'>
							<CardHeader
								sx={{
									fontWeight: '700',
								}}
								title='Page de profil'
							/>
							<CardContent>
								<Typography className='profil-infos'>Pseudo : {infosUser.username}</Typography>
								<Typography className='profil-infos'>Prénom : {infosUser.firstname}</Typography>
								<Typography className='profil-infos'>Nom : {infosUser.lastname}</Typography>
								<Typography className='profil-infos'>Email : {infosUser.email}</Typography>
							</CardContent>
							<Button className='profil-submit' onClick={handleOpen}>
								Modifier vos informations
							</Button>
							<Button className='profil-submit' onClick={handleDelete}>
								Supprimer votre compte
							</Button>
						</Card>
					</Box>

					<Modal keepMounted={true} open={open} onClose={handleClose} className='profil-modal'>
						<form className='profil-form' onSubmit={handleSubmit(onSubmit)}>
							<InputLabel className='profil-form-edit'> Pseudo</InputLabel>
							<Input {...register('username')} onChange={(e) => setUsername(e.target.value)} required />
							<InputLabel className='profil-form-edit'> Prénom</InputLabel>
							<Input {...register('firstname')} onChange={(e) => setFirstname(e.target.value)} required />
							<InputLabel className='profil-form-edit'> Nom</InputLabel>
							<Input {...register('lastname')} onChange={(e) => setLastname(e.target.value)} required />
							<InputLabel className='profil-form-edit'> Email</InputLabel>
							<Input {...register('email')} onChange={(e) => setEmail(e.target.value)} required />
							<Button className='profil-form-edit-submit' type='submit'>
								Valider
							</Button>
							{error && <p>{error}</p>}
						</form>
					</Modal>
				</>
			)}
		</div>
	);
}

export default Profil;
