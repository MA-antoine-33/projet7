import colors from './colors';
import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 10px;
    background: linear-gradient(0deg, ${colors.secondary} 30%, ${colors.primaryBis});
    height: 25px;
    width: 72%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    &:hover {
        background: ${colors.primaryBis};
    } 
    @media (max-width: 991px)  {
        height: 60px;
        margin-top: 20px;
        margin-bottom: 20px;
        border: 1px solid black;
      }
      @media (max-width: 767px) {
      
      }
`