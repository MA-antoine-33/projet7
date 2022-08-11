import styled from 'styled-components'
import colors from '../../utils/styles/colors'


const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  background: linear-gradient(135deg, ${colors.primaryBis} 20%, ${colors.secondary});
  border-top: 1px solid black;
`

function Footer() {
  

  return (
    <FooterContainer>
      
        Ceci est mon footer
     
    </FooterContainer>
  )
}

export default Footer