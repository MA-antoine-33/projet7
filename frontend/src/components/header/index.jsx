import styled from 'styled-components'
import GroupomaniaLogo from '../../assets/logo.png'
import colors from '../../utils/styles/colors'
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { UserIdContext } from '../appContext'
import { useFetch } from '../../utils/hooks';



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
  let userId = ""
  
  const user = JSON.parse(localStorage.getItem("userInfo"))
  if (user) {
    userId = user.userId
  }
  console.log(user)
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}api/auth/${userId}`
  )
//62fa0d4862cae91b27a126b0
  // eslint-disable-next-line no-unused-vars
  const userList = data?.userList
 
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
          <ul>
            <li></li>
            <li className='welcome'>
              <NavLink to="/publication">
                <h4>Bienvenue {data.userName}</h4>
              </NavLink>
            </li>
            logo Logout
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/">
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