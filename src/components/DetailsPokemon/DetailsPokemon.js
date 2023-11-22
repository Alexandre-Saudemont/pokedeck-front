import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import './DetailsPokemon.css';
import Typography from '@mui/material/Typography';


function DetailsPokemon({setIsActive}) {

    const { state } = useLocation();
    
    useEffect(() => {
        setIsActive(false);
        }, 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return (
        <>
            <div id="detail">
                <div className="detail-container">  
                     <Typography variant="h3" className="detail-name"> {state.nom}</Typography>
                    <div id="detail-pokemon-comp"> 
                        <img src={state.url} alt="pokemon" className="detail-pokemon-img"/>
                        <div id="detail-pokemon-list-stats">
                            <p className='detail-pokemon-stats'>Pv : {state.pv}</p>
                            <p className='detail-pokemon-stats'>Attaque : {state.attaque}</p>
                            <p className='detail-pokemon-stats'>Attaque spé : {state.attaque_spe}</p>
                            <p className='detail-pokemon-stats'>Defense : {state.defense}</p>
                            <p className='detail-pokemon-stats'>Defense spé : {state.defense_spe}</p>
                            <p className='detail-pokemon-stats'>Vitesse : {state.vitesse}</p>
                        </div>                      
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsPokemon;