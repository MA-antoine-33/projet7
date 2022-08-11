//import { Link } from 'react-router-dom'
import styled from 'styled-components'
//import { StyledLink } from '../../utils/style/Atoms'
import GroupomaniaLogo from '../../assets/logo.png'
import colors from '../../utils/styles/colors'


//import { useTheme } from '../../utils/hooks'

const HomeLogo = styled.img`
  height: 80px;
  border-radius: 15px;
`

const NavContainer = styled.nav`
 font-size: 1.5em;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, ${colors.secondary} 60%, ${colors.primaryBis});
  border-bottom: 1px solid black;
`

function Header() {

  return (
    <NavContainer>
        <HomeLogo src={GroupomaniaLogo} />  
      <div>
        Votre réseau social d'entreprise
      </div>
    </NavContainer>
  )
}

export default Header