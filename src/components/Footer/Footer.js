import './Footer.css';

import {BottomNavigationAction, Typography} from '@mui/material';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import github from '../../asset/github.svg';
import linkedin from '../../asset/linkedin.svg';

function Footer() {
	return (
		<div id='footer'>
			<div className='footer-title'>
				<Typography>Développé avec React - NodeJs - Material UI par</Typography>
			</div>
			<div className='footer-container'>
				<Typography>
					Adam Gaoua
					<div className='footer-icon--container'>
						<a href='https://www.linkedin.com/in/adam-gaoua-05092b238/' target='_blank' rel='noreferrer'>
							<span>
								<img src={linkedin} alt='linkedin icon' className='footer-linkedin' />
							</span>
						</a>
						<a href='https://github.com/AdamGaoua' target='_blank' rel='noreferrer'>
							<span>
								<img src={github} alt='linkedin icon' className='footer-github' />
							</span>
						</a>
					</div>
				</Typography>
				<Typography>
					Alexandre Saudemont
					<div className='footer-icon--container'>
						<a href='https://www.linkedin.com/in/alexandre-saudemont-535481239/' target='_blank' rel='noreferrer'>
							<span>
								<img src={linkedin} alt='linkedin icon' className='footer-linkedin' />
							</span>
						</a>
						<a href='https://github.com/Alexandre-Saudemont' target='_blank' rel='noreferrer'>
							<span>
								<img src={github} alt='linkedin icon' className='footer-github' />
							</span>
						</a>
					</div>
				</Typography>
			</div>
			<Typography sx={{bgcolor: '#385B5F', fontSize: '.8rem', pb: '10px'}}>Les pokémons et leurs noms sont déposés par Nintendo</Typography>
		</div>
	);
}

export default Footer;
