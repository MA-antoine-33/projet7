import { createGlobalStyle } from 'styled-components'
import colors from './colors'


const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
        body {
            background-color: ${colors.secondary};
            margin: 0;
`

function GlobalStyle() {
 

  return <StyledGlobalStyle />
}

export default GlobalStyle