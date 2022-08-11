import colors from './colors';
import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 10px;
    background: linear-gradient(0deg, ${colors.secondary} 30%, ${colors.primaryBis});
    height: 25px;
    width: 60%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    &:hover {
        background: ${colors.primaryBis};
    } 
`