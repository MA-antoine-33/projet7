import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";


const CardFormAllDivButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CardFormTitle = styled.h1`
    text-align: center;
`

const CardFormAllInputDiv = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top:20px;
    margin-bottom: 20px;
    margin-right: 30px;
`

const CardFormOneDiv = styled.div`
    margin-bottom: 20px
`

const CardFormLabel = styled.label`
    margin-right: 10px;
`

const CardFormInput = styled.input`
    background-color: ${colors.secondary};
    height: 25px;
    border-radius: 15px;
    &:hover {
        background-color: white;
    }
    &:active {
        background-color: white;
    }
`

const CardFormButton = styled.button`
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
        <CardFormAllDivButton>
            <CardFormTitle>Rejoignez la grande communauté de Groupomania</CardFormTitle>
            <CardFormAllInputDiv action="POST">
                <CardFormOneDiv>
                    <CardFormLabel htmlFor="usernameForm">Pseudo</CardFormLabel>
                    <CardFormInput type="text" id="usernameForm" name="usernameForm" className="formSignUp" placeholder="monPseudo"/>
                </CardFormOneDiv>
                <CardFormOneDiv>
                    <CardFormLabel htmlFor="emailForm">Email</CardFormLabel>
                    <CardFormInput type="email" id="emailForm" name="emailForm" className="formSignUp" placeholder="email@gmail.com"/>
                </CardFormOneDiv>
                <CardFormOneDiv>
                    <CardFormLabel htmlFor="passwordForm">Mot de passe</CardFormLabel>
                    <CardFormInput type="password" id="passwordForm" name="passwordForm" className="formSignUp" placeholder="MonMdP25"/>
                </CardFormOneDiv>
            </CardFormAllInputDiv>
            <CardFormButton>S'inscrire</CardFormButton>
        </CardFormAllDivButton>
       </div>
    )
}

export default SignUp;