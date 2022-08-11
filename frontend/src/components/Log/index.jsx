import React from "react";
import { useState } from 'react';
import SignUp from './signup';
import SignIn from './signin';
import styled from 'styled-components';
import colors from "../../utils/styles/colors";


const AllFormDiv = styled.div`
background: linear-gradient(${colors.secondary}, ${colors.primaryBis});
border-radius: 15px 0px 0px 15px;
`
const ListChoseAll = styled.ul`
    display: flex;
    justify-content: space-around;
`
const ListChoseOne = styled.a`
    text-decoration: none;
    padding: 15px;
    border: 1px solid black;
    border-radius: 25px;
    &:hover {
        background-color: white;
    }
`

const Login = ( props ) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);
    

    const handleModals = (e) => {
        if (e.target.id === "registrer") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        };
    };
    return(
       <AllFormDiv>
            <ListChoseAll>
                <ListChoseOne onClick={handleModals} id="registrer" className={signUpModal ? "active-btn" : null}>S'inscrire</ListChoseOne>
                <ListChoseOne onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</ListChoseOne>
            </ListChoseAll>
            {signUpModal && <SignUp /> }
            {signInModal && <SignIn /> }
       </AllFormDiv>
    )
};

export default Login;