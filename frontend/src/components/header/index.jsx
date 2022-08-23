import styled from 'styled-components'
import GroupomaniaLogo from '../../assets/logo.png'
import colors from '../../utils/styles/colors'
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { UserIdContext } from '../appContext'
import { useFetch } from '../../utils/hooks';
import axios from 'axios';


const NavContainer = styled.nav`
  padding: 0px 25px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, ${colors.secondary} 60%, ${colors.primaryBis});
  border-bottom: 1px solid black;
  @media (max-width: 991px) {
    height: 100px;
  }
  @media (max-width: 767px) {
   flex-direction: column;
   justify-content: space-around;
   height: 150px;
  }
 
`
//Style pour le lien de retour à la page d'accueil (logo + titre)
const DivNavLink = styled.div`
  display: flex;
  align-items: center;
  color: black;
    text-decoration: none;
`
  const HomeLogo = styled.img`
    height: 80px;
    border-radius: 15px;
  `
  const TitleHomePage = styled.h3`
    margin-left: 5px;
    font-size: 1em;
  ` 
  //Style pour le message de bienvenue
  const AllListWelcome = styled.ul`
    list-style-type: none;
    text-align: center;
    @media (max-width: 991px)  {
      display flex;
      align-items: center;
    }
    @media (max-width: 767px) {
      margin-top: 0px
    }
    
  `
  const ListWelcome = styled.li`
    text-decoration: none;
  `
  const TitleWelcome = styled.h4`
    margin-rigth: 5px;
    font-size: 1em;
    color: black;
  `
  //style pour le logout
  const ImageLogout = styled.img`
    width: 50px;
    @media (max-width: 991px) {
      width: 35px;
      margin-left: 40px;
    }
    @media (max-width: 767px) {
      width: 30px;
      margin-left: 50px;
    }
  `



function Header() {

  const uId = useContext(UserIdContext);
  let userId = ""
  
  const user = JSON.parse(localStorage.getItem("userInfo"))
  if (user) {
    userId = user.userId
  }
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}api/auth/${userId}`
  )
  const logoutHandler = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`);
        window.location.href = "http://localhost:3000/";
        localStorage.clear();
      } 
 
  if (error) {
    return <span>Il y a un problème</span>
  }

  return (
    <NavContainer>
        <NavLink to="/">
          <DivNavLink>
            <HomeLogo src={GroupomaniaLogo} />
            <TitleHomePage>Votre réseau social d'entreprise</TitleHomePage>
          </DivNavLink>
        </NavLink>
        {uId ? (
          <AllListWelcome>
            <ListWelcome>
              <NavLink to="/publication">
                <TitleWelcome>Bienvenue {data.userName}</TitleWelcome>
              </NavLink>
            </ListWelcome>
            <ListWelcome onClick={logoutHandler}>
              <ImageLogout src="./logout.png" alt="Par ici la sortie" />
            </ListWelcome>
          </AllListWelcome>
        ) : (
          <AllListWelcome>
            <ListWelcome>
              <NavLink to="/">
                <TitleWelcome>se connecter</TitleWelcome>
              </NavLink>
            </ListWelcome>
            
          </AllListWelcome>
        )}
    </NavContainer>
  )
}

export default Header