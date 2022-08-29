import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import axios from "axios";
import { useFetch } from "../../utils/hooks";
import { useState} from 'react';

//Style pour la page
const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: ${colors.secondary};
    `
const FormAllInputDiv = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:20px;
    margin-bottom: 20px;
    margin-right: 30px;
`
const FormPostDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    @media (max-width: 767px) {
        flex-direction: column;
    }
`
    //style pour la partie contenue de la nouvelle publication
    const TextContentNewPost = styled.textarea`
        font-size: 1em;
        border: 0.3em ridge ${colors.secondary};
        border-radius: 10px;
        background-color: ${colors.tertiaryBis};
        padding: 7px;
        margin-right: 10px;
        width: 45%;
        @media (max-width: 767px) {
            margin-bottom: 20px;
        }
        `
    const InputForImageUrl = styled.input`
        width: 30%;
        border-radius: 10px;
        background-color: ${colors.secondary};
        border: 1px solid black;
        &:hover {
            background-color: ${colors.colorHover};
        }
        &:focus {
            background-color: white;
        }        
    `
    const FormInputButton = styled.input`
    font-size: 1em;
    background-color: ${colors.tertiary};
    color: white;
    width: auto;
    margin-top: 20px;
    padding: 15px;
    border-radius: 25px;
    &:hover {
        background-color: green;
    } 
`
//On créer notre fonction pour modifier notre publication
const ModifyPost = () => {
    let [description, setDescription] = useState('');
    let [imageUrl, setImageUrl] = useState('');
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    let userId = ""
    //Initialisation de la date
    let dates = new Date();
    let dateDay = (dates.getDate() + "/" + (dates.getMonth() + 1) + "/"+ dates.getFullYear() + " à " + dates.getHours() + "h " + dates.getMinutes() + "min" )
   //On récupère les données de l'utilisateurs et les tokens
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
    //On récupère les données de l'utilisateur  
    const postIdStorage = JSON.parse(localStorage.getItem("postId"));
    const postDescriptionStorage = JSON.parse(localStorage.getItem("postDescription"));
 
    //On créer une fonction pour stocker les convertir les images en 64bytes et pouvoir les retraduire dans le back
    const test64 = (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("recentImage", reader.result);
        }, false)
        const fileImage = document.getElementById('ImageNewPost').files[0];
        reader.readAsDataURL(fileImage);
       };
    
    //On créer le lien avec le backend quand on clique sur le bouton modifier
    const updateOnePost = async (e) => {
        e.preventDefault();
             
        const descriptionError = document.querySelector(".descriptionError");
        const imageUrlError = document.querySelector(".imageUrlError");
        const recentImage = localStorage.getItem("recentImage")
        const fileImage = document.getElementById('ImageNewPost').files[0];

        //On créer des conditions pour garder nos précédentes valeurs si l'utilisateurs ne rentre pas de nouvelles données
        let descriptionToAdd = "";
        if (description === "") {
            descriptionToAdd = postDescriptionStorage;
        } else  {
            descriptionToAdd = description
        }
        let imageUrlToAdd = "";
        let typeFileToAdd = "";
        if (imageUrl === "" || imageUrl === null || imageUrl === undefined) {
            imageUrlToAdd = "";
            typeFileToAdd = "";
        } else {
            imageUrlToAdd = fileImage.name;
            typeFileToAdd = fileImage.type;
        }
        
        //On envoie les nouvelles données modifiéés
        await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/publication/${postIdStorage}`,
            data: {
                userId: data._id,
                description: descriptionToAdd ,
                email: data.email,
                imageUrl: imageUrlToAdd,
                date: dateDay,
                file: recentImage,
                typeFile: typeFileToAdd,
                admin: userAdmin
            },
            headers: headers
        })
        .then((res) => {
            if (res.data.errors) {
                descriptionError.innerHTML = res.data.errors.description;
                imageUrlError.innerHTML = res.data.errors.imageUrl; 
            } else {
                localStorage.removeItem("postId")
                localStorage.removeItem("postImageUrl")
                localStorage.removeItem("postDescription")
                localStorage.removeItem("recentImage")
                window.location.href = "http://localhost:3000/publication";
            }
        })
        .catch((err) => {console.log(err)});       
    }

    return(
        <DivAllPage className="publication-page">       
            <FormAllInputDiv action="" onSubmit={updateOnePost} id="modifyForm">
                <p>Modifier votre publication {data.userName}</p>
                <FormPostDiv>
                    <TextContentNewPost id="textNewPost" placeholder=" Ici vous pouvez tout partager avec vos collègues" onChange={(e) => setDescription(e.target.value)} value={description} />
                        <div className="descriptionError"></div>
                    <InputForImageUrl id="ImageNewPost" type='file' accept="image/*" onChange={(e) => {test64(); setImageUrl(e.target.value)}} value={imageUrl}/>
                        <div className="imageUrlError"></div>      
                </FormPostDiv>
                <FormInputButton type="submit" id='ButtonPublishNewPost' value="Mettre à jour" /> 
            </FormAllInputDiv>     
        </DivAllPage>
    )

}

export default ModifyPost;