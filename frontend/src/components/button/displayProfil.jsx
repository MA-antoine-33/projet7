import { useState} from 'react';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';

const CardDivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25px;
    width: 20%;
    background-color: ${colors.secondary};
    border: 2px solid red;
    border-radius: 15px;
    `

    const CardResearch = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
    padding:15px;
    `
    const CardProfilNav = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin: 10px;
    margin-top: 50px;
    padding:15px;
    `



function DisplayProfil() {
    const [isOpen, setIsOpen] = useState(true)

    return isOpen ? (<div>
            <CardDivAllPage className="publication-page">
                <CardResearch>Barre de recherche </CardResearch>                           
                <CardProfilNav>photo de profil<br/>Pseudo<br/>modifier son profil<br/>Se déconnecter</CardProfilNav>
            </CardDivAllPage>
            
        <button onClick={() => setIsOpen(false)}>
            Fermer le profil
        </button>
        </div>
    ) : (
        <button onClick={() => setIsOpen(false)}>
            Ouvrir le profil
        </button>
    )  
}

export default DisplayProfil