import styled from 'styled-components';
import colors from '../../utils/styles/colors';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import GroupomaniaLogo from '../../assets/logo.png';


const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 150px;
  background: linear-gradient(135deg, ${colors.primaryBis} 20%, ${colors.secondary});
  border-top: 1px solid black;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    padding-top: 0px;
  }
`
const LogoutDiv = styled.h2`
  display: flex;
  align-items: center;
`
const ImageLogout = styled.img`
  width: 50px;
  margin-left: 25px;
  @media (max-width: 991px) {
    height: 35px;
    width: 35px;
    margin-left: 10px;
  }
  @media (max-width: 767px) {
    height: 30px;
    width: 30px;
    margin-left: 10px;
  }
`
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
  const TitleHomePage = styled.h1`
    margin-left: 5px;
    font-size: 1em;
  ` 

function Footer() {
  const logoutHandler = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`);
    window.location.href = "http://localhost:3000/";
    localStorage.clear();
  } 

  return (
    <FooterContainer>
      <NavLink to="/">
          <DivNavLink>
            <HomeLogo src={GroupomaniaLogo} />
            <TitleHomePage>Votre réseau social d'entreprise</TitleHomePage>
          </DivNavLink>
        </NavLink>
        <LogoutDiv onClick={logoutHandler}>
              <p>Se déconnecter</p>
              <ImageLogout src="./logout.png" alt="Par ici la sortie" />
        </LogoutDiv>
    </FooterContainer>
  )
}

export default Footer