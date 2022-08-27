import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import { useState} from 'react';
import axios from "axios";


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
//On créer notre fonction pour se connecter
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   //On envoie les identifiants au back pour qu'il les vérifie et nous valide l'accés
    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".emailError");
        const passwordError = document.querySelector(".passwordError");
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            data: {
                email,
                password,
            }
        })
        .then((res) => {
            if(res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                localStorage.setItem("userInfo", JSON.stringify(res.data))
                console.log(res)
                window.location = '/publication'
            }
        })
        .catch((err) => {console.log(err)});
    };

    return(
       
        <FormAllDivButton>
            <FormTitle>Se connecter pour discuter avec ses collègues</FormTitle>
            <FormAllInputDiv action="" onSubmit={handleLogin} id="signInForm" >
                <FormOneDiv>
                    <FormLabel htmlFor="emailForm">Email</FormLabel>
                    <FormInput type="email" id="emailFormSignIn" name="emailForm" onChange={(e) => setEmail(e.target.value)} placeholder=" email@gmail.com" value={email} />
                    <div className="emailError"></div>
                </FormOneDiv>
                <FormOneDiv>
                    <FormLabel htmlFor="passwordForm">Mot de passe</FormLabel>
                    <FormInput type="password" id="passwordFormSignIn" name="passwordForm" onChange={(e) => setPassword(e.target.value)} placeholder=" MonMdP25" value={password} />
                    <div className="passwordError"></div>
                </FormOneDiv>
                <FormOneDiv>
                    <FormInputButton type="submit" id="submitFormSignIn" value="Se connecter" />
                </FormOneDiv>
            </FormAllInputDiv>
            
        </FormAllDivButton>
       
    )
}

export default SignIn;