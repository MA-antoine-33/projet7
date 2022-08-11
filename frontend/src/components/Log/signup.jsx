import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";


const FormAllDivButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FormTitle = styled.h1`
    text-align: center;
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
    margin-bottom: 20px
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

const FormButton = styled.button`
    font-size: 1.2em;
    background-color: ${colors.tertiary};
    color: white;
    width: 50%;
    padding: 15px;
    border-radius: 25px;
    &:hover {
        background-color: white;
        color: black;
    }
`

const SignUp = () => {
    return(
       <div className="connection-form">
        <FormAllDivButton>
            <FormTitle>Rejoignez la grande communauté de Groupomania</FormTitle>
            <FormAllInputDiv action="POST">
                <FormOneDiv>
                    <FormLabel htmlFor="usernameForm">Pseudo</FormLabel>
                    <FormInput type="text" id="usernameFormSignUp" name="usernameForm" className="formSignUp" placeholder=" monPseudo"/>
                </FormOneDiv>
                <FormOneDiv>
                    <FormLabel htmlFor="emailForm">Email</FormLabel>
                    <FormInput type="email" id="emailFormSignUp" name="emailForm" className="formSignUp" placeholder=" email@gmail.com"/>
                </FormOneDiv>
                <FormOneDiv>
                    <FormLabel htmlFor="passwordForm">Mot de passe</FormLabel>
                    <FormInput type="password" id="passwordFormSignUp" name="passwordForm" className="formSignUp" placeholder=" MonMdP25"/>
                </FormOneDiv>
            </FormAllInputDiv>
            <FormButton>S'inscrire</FormButton>
        </FormAllDivButton>
       </div>
    )
}

export default SignUp;