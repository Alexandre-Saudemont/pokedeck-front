import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userInfosRequest, 
        saveAuthorization, 
        UpdateUserRequest, 
        UserDeleteRequest
        } from '../../requests';

import './Profil.css';

import {CardHeader, 
        Card, 
        Box, 
        CardContent, 
        Typography, 
        Modal, 
        Button, 
        Input, 
        InputLabel} 
        from '@mui/material';

import Swal from 'sweetalert2';

function Profil({setIsLogged, setIsActive}) {

    const token = sessionStorage.getItem("token");
    const id = localStorage.getItem("id");
    const [infosUser, setInfosUser] = useState("");
    const [open, setOpen] = useState(false); 
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState('');
    const [success,setSuccess] = useState("");
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();   
    
    const handleOpen = () => {        
        setOpen(true);    
        setError(""); 
        setSuccess("")  
    }

    const handleClose = () => {
        setOpen(false);
    }

    const timeOutFunction = () =>{
        navigate("/")
    };

    async function requestInfoUser() {
        try {
            saveAuthorization(token);
            const response = await userInfosRequest(id)
            setInfosUser(response.data);
            setEmail(response.data.email);
            setUsername(response.data.username);
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            
        } catch (error) {
            console.error(error)            
        }
    }
    
    async function onSubmit(data) {        
        try {           
            saveAuthorization(token);
            const response = await UpdateUserRequest(id, data);
            if (response.status===200 && response.data.success) {
                setEmail(data.email);
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setUsername(data.username);             
                setSuccess(response.data.success);
                setInfosUser(prevState =>({...prevState,email, username, firstname, lastname}));   
                setError("");
                handleClose();  
                return null;                         
            }   
             
            setEmail(infosUser.email);
            setFirstname(infosUser.firstname);
            setLastname(infosUser.lastname);
            setUsername(infosUser.username);  
            setError(response.data.error);

        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
            setSuccess("");            
        }
    }

    async function handleDelete(){
        
        Swal.fire({
            icon:"question",
            title:"Êtes vous sur de vouloir supprimer votre compte ?",
            ShowCancelButton:true
        }).then(async (result)=>{
            if (result.isConfirmed) {
            // try {
                saveAuthorization(token);
                const response = await UserDeleteRequest(id);
                if (response.status===201){
                    localStorage.removeItem('id');
                    sessionStorage.removeItem('token');
                    setIsLogged(false);
                    setTimeout(timeOutFunction, 2000)
                    Swal.fire({
                        icon:"success",
                        text:"Compte supprimé avec succès",
                        timer:2000,
                        timerProgressBar:true,
                        showConfirmButton: false,
                    })
                }
            }
        })
        // } 
        .catch ((error) =>{
            console.error(error)
            Swal.fire({
                icon:"error",
                text:`${error.response.data.error}`
            })
        })
    }

    useEffect(() => {
        console.log("montage du composant")
        requestInfoUser();
        setIsActive(false);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    return (
        <div id="profil">
            {infosUser &&
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
                        <Card className="profil-card" >
                            <CardHeader title="Page de profil" />

                            <CardContent>
                                
                                <Typography >Pseudo : {infosUser.username}</Typography>
                                <Typography>Prénom : {infosUser.firstname}</Typography>
                                <Typography>Nom : {infosUser.lastname}</Typography>
                                <Typography>Email : {infosUser.email}</Typography>
                            </CardContent>
                            <Button onClick={handleOpen}>Modifier vos informations</Button>

                                {success && !error &&                                
                                <p> {success}</p>
                                }
                                
                            <Button onClick={handleDelete}> Supprimer votre compte </Button>
                        </Card>
                    </Box>

                    <Modal
                        keepMounted={true}
                        open={open}
                        onClose={handleClose}
                        className="profil-modal"
                    >

                        <form className="profil-form" onSubmit={handleSubmit(onSubmit)}>
                            <InputLabel> Pseudo</InputLabel>
                            <Input
                                // id='profil-form-input'
                                sx={{textalign:"center"}}
                                value={username}
                                {...register('username')}
                                onChange={(e) => setUsername(e.target.value) }
                                required
                            />
                            <InputLabel> Prénom</InputLabel>
                            <Input
                                value={firstname}
                                {...register('firstname')}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                            <InputLabel> Nom</InputLabel>
                            <Input
                                value={lastname}
                                {...register('lastname')}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                            <InputLabel> Email</InputLabel>
                            <Input
                                value={email}                                
                                {...register('email')}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit">Valider </Button>

                            {error && 
                            <p>{error}</p>
                            }

                        </form >

                    </Modal>
                </>
            }
        </div>
    )
}

export default Profil;