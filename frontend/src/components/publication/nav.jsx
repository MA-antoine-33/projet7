import { useState} from 'react';
import styled from 'styled-components';
import colors from '../../utils/styles/colors';
import { Button } from '../../utils/styles/atoms';
import { useFetch } from "../../utils/hooks";
import axios from "axios";


//Style pour l'ensemble de la page publication
const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    max-height: 500px;
    border: 1px solid black;
    background: linear-gradient(220deg, ${colors.secondary} 40%, ${colors.primaryBis});
    border-radius: 15px;
    @media (max-width: 767px) {
        width: 80%;
        margin-bottom: 25px;
        
      }
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
        @media (max-width: 767px) {
            flex-direction: row;
          }
    `
    const DivButtonUserName = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `
    const DivImageUserName = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px
    `
    const ImageProfilOpen = styled.img`
        Width: 60%;
        border-radius: 10px;
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
    const [isOpen, setIsOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const { data, error } = useFetch(
        `${process.env.REACT_APP_API_URL}api/auth/${user.userId}`
      )
      if (error) {
        return <span>Il y a un problème</span>
      }
      if (data.admin) {localStorage.setItem("userAdmin", JSON.stringify(data.admin))}
      
    //Modifier son profil 
    const updateOneUser =  () => {
        localStorage.setItem("profilImageUrl", JSON.stringify(data.imageUrl))
        window.location.href = "http://localhost:3000/modifyProfil";
    }
     
    //Se déconnecter
      const logoutHandler = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`);
        window.location.href = "http://localhost:3000/";
        localStorage.clear();
      }

    return isOpen ? (
            <DivAllPage className="publication-page">                          
                <ProfilNav>
                    <DivImageUserName>
                        <p>{data.userName}</p>
                        <ImageProfilOpen src={data.imageUrl} alt={data.description}/>
                    </DivImageUserName>
                    <DivButtonUserName>
                        <Button id='ButtonModify' onClick={updateOneUser}>Modifier votre profil</Button>
                        <Button id='ButtonSignOut' onClick={logoutHandler}>Se déconnecter</Button>
                        <Button id='ButtonCloseProfil' onClick={() => setIsOpen(false)}>Fermer le profil</Button>
                    </DivButtonUserName>
                </ProfilNav>
            </DivAllPage>
    ) : (
            <OpenProfil>
                <ButtonOpenProfil onClick={() => setIsOpen(true)}>
                <ImageProfil src={data.imageUrl} alt={data.description} />
                <p>{data.userName}</p>
                Ouvrir le profil
                </ButtonOpenProfil>
            </OpenProfil>
    )  
}

export default DisplayProfil