import React from "react";
import { useState } from 'react';
import SignUp from './signup';
import SignIn from './signin';
import styled from 'styled-components';

const CardListChoseAll = styled.ul`
    display: flex;
    justify-content: space-around;
`
const CardListChoseOne = styled.a`
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
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };
    return(
       <div className="connection-form">
        <div className="form-container">
            <CardListChoseAll>
                <CardListChoseOne onClick={handleModals} id="registrer" className={signUpModal ? "active-btn" : null}>S'inscrire</CardListChoseOne>
                <CardListChoseOne onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</CardListChoseOne>
            </CardListChoseAll>
            {signUpModal && <SignUp /> }
            {signInModal && <SignIn /> }
        </div>
       </div>
    )
}

export default Login;