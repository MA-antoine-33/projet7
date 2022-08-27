import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import axios from "axios";
import { useFetch } from "../../utils/hooks";
import { useState} from 'react';


const DivAllPage = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 50px;
    width: 90%;
    height: 700px;
    background-color: ${colors.secondary};
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


const ModifyProfil = () => {
    //On récupére nos données utilisateurs pour pouvoir le modifier
    const [userName, setUserName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    let userId = ""
    
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if (user) {
        userId = user.userId
      }
    const { data } = useFetch(
        `${process.env.REACT_APP_API_URL}api/auth/${userId}`
      )
      const token = user.token;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

    //On créer une fonction pour stocker les convertir les images en 64bytes et pouvoir les retraduire dans le back
    const test64 = (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("recentProfilImage", reader.result);
        }, false)
        const fileImage = document.getElementById('imageUrlModifyForm').files[0];
        reader.readAsDataURL(fileImage);
    };


    const updateOneUser = async (e) => {
        e.preventDefault();
             
        const userNameError = document.querySelector(".userNameError");
        const imageUrlError = document.querySelector(".imageUrlError");
        const recentImage = localStorage.getItem("recentProfilImage")
        const fileImage = document.getElementById('imageUrlModifyForm').files[0];
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId}`,
            data: {
                userName: userName,
                imageUrl: fileImage.name,
                email: data.email,
                file: recentImage,
                typeFile: fileImage.type,
            },
            headers: headers
        })
        .then((res) => {
            if (res.data.errors) {
                userNameError.innerHTML = res.data.errors.userName;
                imageUrlError.innerHTML = res.data.errors.imageUrl;
            } else {
                localStorage.removeItem("profilImageUrl")
                localStorage.removeItem("recentprofilImage")
                window.location.href = "http://localhost:3000/publication";
            }
        })
        .catch((err) => {console.log(err)});
    }

    return(
        <DivAllPage className="modify-page">
                <FormAllInputDiv action="" onSubmit={updateOneUser} id="modifyForm">
                    <p>Modifier votre profil {data.userName}</p>
                    <FormOneDiv>
                        <FormLabel htmlFor="userNameModifyForm">Votre nouveau pseudo</FormLabel>
                        <FormInput type="text" id="userNameModifyForm" name="userNameModifyForm" onChange={(e) => setUserName(e.target.value)} placeholder=" monPseudo" value={userName}/>
                        <div className="userNameError"></div>
                    </FormOneDiv>
                    <FormOneDiv>
                        <FormInput id="imageUrlModifyForm" type='file' accept="image/*" onChange={(e) => {test64(); setImageUrl(e.target.value)}}  value={imageUrl}/>
                        <div className="imageUrlError"></div>
                    </FormOneDiv>                  
                    <FormOneDiv>
                        <FormInputButton type="submit" id="submitmidifyForm" value="Modifier ses informations" />
                    </FormOneDiv>
                </FormAllInputDiv>
        </DivAllPage>
    )

}

export default ModifyProfil;