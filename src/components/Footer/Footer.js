import './Footer.css';
import {Typography} from '@mui/material';
import github from '../../asset/github.svg';
import linkedin from '../../asset/linkedin.svg';

function Footer() {
	return (
		<div id='footer'>
			<div className='footer-container'>
				<Typography sx={{fontSize: '1rem'}}>Développé avec React - NodeJs - Material UI par : Alexandre Saudemont</Typography>
				<div className='footer-icon--container'>
					<a href='https://www.linkedin.com/in/alexandre-saudemont-535481239/' target='_blank' rel='noreferrer'>
						<img src={linkedin} alt='LinkedIn icon' className='footer-icon-linkedin' />
					</a>
					<a href='https://github.com/Alexandre-Saudemont' target='_blank' rel='noreferrer'>
						<img src={github} alt='GitHub icon' className='footer-icon-github' />
					</a>
				</div>
				<Typography sx={{fontSize: '1rem', paddingTop: '2px'}}>© 2025 Pokedeck. Tous droits réservés.</Typography>
				<Typography sx={{fontSize: '1rem', paddingTop: '2px'}}>Les pokémons et leurs noms sont déposés par Nintendo</Typography>
			</div>
		</div>
	);
}

export default Footer;
