import { createGlobalStyle } from 'styled-components'
import colors from './colors'


const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', sans-serif;
    }
        body {
            background-color: ${colors.secondary};
            margin: 0;
`

function GlobalStyle() {
 

  return <StyledGlobalStyle />
}

export default GlobalStyle