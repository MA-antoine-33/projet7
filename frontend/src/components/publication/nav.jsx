import { useState} from 'react';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';
import { FaSearch } from "react-icons/fa";
import { Button } from '../../utils/styles/atoms';

//Style pour l'ensemble de la page publication
const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    background: linear-gradient(220deg, ${colors.secondary} 40%, ${colors.primaryBis});
    border-radius: 15px;
`
//Style quand le profil est ouvert
    //style pour la barre de recherche
    const DivResearch = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
        margin: 10px;
        margin-top: 25px;
        padding:15px;
    `
    const DivInputButtonResearch = styled.div`
        width: 100%;
    `
    const InputResearch = styled.input`
        border-radius: 10px 0px 0px 10px;
        background-color: ${colors.secondary};
        height: 35px;
        width: 80%;
        margin-top: 25px;
        border: 1px solid black;
        &:hover {
            background-color: ${colors.colorHover};
        }
        &:focus {
            background-color: white;
        }        
    `
    const ButtonResearch = styled.button`
        border-radius: 0px 10px 10px 0px;
        background-color: ${colors.secondary};
        height: 35px;
        width: 20%;
        margin-top: 10px;
        border: 1px solid black;
    `
    //style pour le profil quand il est ouvert
    const ProfilNav = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin: 10px;
        margin-top: 25px;
        width: 100%;
        height: 80%;
    `
    const ImageProfilOpen = styled.img`
        Width: 60%;
        border-radius: 10px;
    `
    const ButtonDelete = styled.button`
    border-radius: 10px;
    background: linear-gradient(0deg, ${colors.secondary} 30%, ${colors.primary});
    height: 20px;
    width: 45%;
    margin-top: 50px;
    border: none;
    &:hover {
        background: ${colors.primary};
    } 
    `

//Style quand le profil est fermé
const OpenProfil = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    background-color: ${colors.secondary};
`
const ButtonOpenProfil = styled.button`
    background: linear-gradient(135deg, ${colors.secondary} 60%, ${colors.primaryBis});
    border: 1px solid ${colors.tertiary};
    border-radius: 25px;
    padding: 15px;
`
const ImageProfil = styled.img`
    border-radius: 80px;
    width: 100%;
    margin-bottom: 10px;
`

//fonction permettant d'afficher et de fermer le profil ainsi que de voir ses éléments
function DisplayProfil() {
    const [isOpen, setIsOpen] = useState(true)

    return isOpen ? (
            <DivAllPage className="publication-page">
                <DivResearch>
                    <label htmlFor="searchProfil">Trouver l'utilisateur de votre choix :</label>
                    <DivInputButtonResearch>
                        <InputResearch type="search" id="searchProfil" name="searchProfil" placeholder=" SonPseudoIci"/>
                        <ButtonResearch>
                            <FaSearch />
                        </ButtonResearch>
                    </DivInputButtonResearch>
                </DivResearch>                           
                <ProfilNav>
                    <ImageProfilOpen src="./profil_par_defaut.jpg" alt="Votre phot de profil" />
                    <p>Votre pseudo</p>
                        <Button id='ButtonModify'>Modifier votre profil</Button>
                        <Button id='ButtonSignOut'>Se déconnecter</Button>
                        <Button id='ButtonCloseProfil' onClick={() => setIsOpen(false)}>Fermer le profil</Button>
                        <ButtonDelete id='ButtonDelete'>Supprimer son compte</ButtonDelete>
                </ProfilNav>
            </DivAllPage>
    ) : (
            <OpenProfil>
                <ButtonOpenProfil onClick={() => setIsOpen(true)}>
                <ImageProfil src="./profil_par_defaut.jpg" alt="Votre phot de profil" />
                Ouvrir le profil
                </ButtonOpenProfil>
            </OpenProfil>
    )  
}

export default DisplayProfil