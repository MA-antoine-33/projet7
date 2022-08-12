import styled from 'styled-components'
import GroupomaniaLogo from '../../assets/logo.png'
import colors from '../../utils/styles/colors'
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { UserIdContext } from '../appContext'



const NavContainer = styled.nav`
  font-size: 1.5em;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, ${colors.secondary} 60%, ${colors.primaryBis});
  border-bottom: 1px solid black;
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
    font-size: 0.8em;
  ` 

function Header() {
  const uId = useContext(UserIdContext);

  return (
    <NavContainer>
        <NavLink exact to="/">
          <DivNavLink>
            <HomeLogo src={GroupomaniaLogo} />
            <TitleHomePage>Votre réseau social d'entreprise</TitleHomePage>
          </DivNavLink>
        </NavLink>
        {uId ? (
          <ul>
            <li></li>
            <li className='welcome'>
              <NavLink exact to="/">
                <h4>Bienvenue user</h4>
              </NavLink>
            </li>
            logo Logout
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/">
                <h4>se connecter</h4>
              </NavLink>
            </li>
            logo Logout
          </ul>
        )}
    </NavContainer>
  )
}

export default Header