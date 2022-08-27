import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import { useState} from 'react';
import axios from "axios";
import SignIn from "./signin";


const FormAllDivButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FormTitle = styled.h1`
    text-align: center;
    @media (max-width: 700px) {
        font-size: 1.5em;
    }
`
const FormAllInputDiv = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top:20px;
    margin-bottom: 20px;
    margin-right: 30px; 
`
const FormOneDiv = styled.div`
    margin-bottom: 20px;
    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
    }
`
const FormLabel = styled.label`
    margin-right: 10px;
`
const FormInput = styled.input`
    background-color: ${colors.secondary};
    height: 25px;
    border-radius: 15px;
    &:hover {
        background-color: ${colors.colorHover};
    }
    &:focus {
        background-color: white;
    }   
`
const FormInputButton = styled.input`
    font-size: 1.2em;
    background-color: ${colors.tertiary};
    color: white;
    width: auto;
    padding: 15px;
    border-radius: 25px;
    &:hover {
        background-color: white;
        color: black;
    } 
`
//style pour la phrase connection réussi
const ValidSignUp = styled.h3`
    text-align: center;
    color: green;
`
//On créer notre fonction pour s'inscrire
const SignUp = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const admin = ""

    //On envoir le formulaire au back pour qu'il enregistre ce nouvel utilisateur s'il correspond aux critères
    const handleRegistrer = async (e) => {
        e.preventDefault();
        const userNameError = document.querySelector(".userNameError");
        const emailError = document.querySelector(".emailError");
        const passwordError = document.querySelector(".passwordError");
        const passwordConfirmationError = document.querySelector(".passwordConfirmationError");

        passwordConfirmationError.innerHTML = "";
        if (password !== controlPassword) {
            passwordConfirmationError.innerHTML = "Les mots de passe ne corespondent pas";
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
                data: {
                    userName,
                    email,
                    password,
                    admin
                }
            })
            .then((res) => {
                if (res.data.errors) {
                    userNameError.innerHTML = res.data.errors.userName;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    setFormSubmit(true);
                }
            })
            .catch((err) => {console.log(err)});
        }
    }

    return(
       <div className="connection-form">
        {formSubmit ? (
            <>
            <SignIn/>
            <ValidSignUp className="success">enregistrement réussi, veuillez-vous connecter</ValidSignUp>
            </>
        ) : ( 
        <FormAllDivButton>
            <FormTitle>Rejoignez la grande communauté de Groupomania</FormTitle>
            <FormAllInputDiv action="" onSubmit={handleRegistrer} id="signUpForm">
                <FormOneDiv>
                    <FormLabel htmlFor="userNameForm">Pseudo</FormLabel>
                    <FormInput type="text" id="userNameFormSignUp" name="userNameForm" onChange={(e) => setUserName(e.target.value)} placeholder=" monPseudo" value={userName}/>
                    <div className="userNameError"></div>
                </FormOneDiv>
                <FormOneDiv>
                    <FormLabel htmlFor="emailForm">Email</FormLabel>
                    <FormInput type="email" id="emailFormSignUp" name="emailForm" onChange={(e) => setEmail(e.target.value)} placeholder=" email@gmail.com" value={email}/>
                    <div className="emailError"></div>
                </FormOneDiv>
                <FormOneDiv>
                    <FormLabel htmlFor="passwordForm">Mot de passe</FormLabel>
                    <FormInput type="password" id="passwordFormSignUp" name="passwordForm" onChange={(e) => setPassword(e.target.value)} placeholder=" MonMdP25" value={password}/>
                    <div className="passwordError"></div>
                </FormOneDiv>
                <FormOneDiv>
                    <FormLabel htmlFor="passwordConfirmationForm">Mot de passe</FormLabel>
                    <FormInput type="password" id="passwordConfirmationFormSignUp" name="passwordConfirmationForm" onChange={(e) => setControlPassword(e.target.value)} placeholder=" MonMdP25" value={controlPassword}/>
                    <div className="passwordConfirmationError"></div>
                </FormOneDiv>
                <FormOneDiv>
                    <FormInputButton type="submit" id="submitFormSignUp" value="S'inscrire" />
                </FormOneDiv>
            </FormAllInputDiv>
        </FormAllDivButton>
        )}
       </div>
    )
}

export default SignUp;