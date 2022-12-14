import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import { Button } from "../../utils/styles/atoms";
import axios from "axios";
import { useState} from 'react';
import { useFetch } from "../../utils/hooks";


const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: ${colors.secondary};
    `
//Style pour la partie nouvele publication
const NewPostDiv = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    border-radius: 10px;
    height: 100%;
    background-color: ${colors.tertiaryBis};
`
    //style pour la partie contenue de la nouvelle publication
    const TextContentNewPost = styled.textarea`
        font-size: 1.1em;
        height: 98%;
        width: 60%;
        border-radius: 10px 0px 0px 10px;
        background-color: ${colors.tertiaryBis};
        padding: 0px;
        `
    //Style pour la partie publier et ajouter une image de la partie de la nouvelle publication
    const DivButtonNewPost = styled.div`
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `
    const InputForImageUrl = styled.input`
        width: 95%;
        border: none;
        border-radius: 10px;
        background-color: ${colors.secondary};
        border: 1px solid black;
        margin-top: 5px;
        &:hover {
            background-color: ${colors.colorHover};
        }
        &:focus {
            background-color: white;
        }        
    `
//style pour la div cpost créé
const DivPostCree = styled.div`
        text-align: center;
        color: green;
        margin-top: 10px;
`

const NewPost = () => {
    //récupérere les données utilisateurs dans le local storage
    const user = JSON.parse(localStorage.getItem("userInfo"))
    //On créer nos states
    const [validationPost, setValidationPost] = useState(false)
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
   
    
    //Initialisation de la date
    let dates = new Date();
    let dateDay = (dates.getDate() + "/" + (dates.getMonth() + 1) + "/"+ dates.getFullYear() + " à " + dates.getHours() + "h " + dates.getMinutes() + "min" )
    
    //récupérer les tokens pour l'authentification
    const token = user.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
       //Récupérer les données pour pouvoir les modifier
      const { data, error } = useFetch(
        `${process.env.REACT_APP_API_URL}api/auth/${user.userId}`
      )
      if (error) {
        return <span>Il y a un problème</span>
      };
      const userId = user.userId

    //On créer une fonction pour stocker les convertir les images en 64bytes et pouvoir les retraduire dans le back
      const test64 = (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("recentImage", reader.result);
        }, false)
        const fileImage = document.getElementById('ImageNewPost').files[0];
        reader.readAsDataURL(fileImage);
       };

  
    //On créer la fonction qui va appeler l'API pour créer une publication
    const publishNewPost = (e) => {
        e.preventDefault();
        const descriptionError = document.querySelector(".descriptionError");
        const imageUrlError = document.querySelector(".imageUrlError");
        const userName = data.userName;
        const recentImage = localStorage.getItem("recentImage")
        const fileImage = document.getElementById('ImageNewPost').files[0];
        let imageToAdd = "";
        let typeFileToAdd = "";
        if (fileImage === undefined || fileImage === null){
            imageToAdd = "";
            typeFileToAdd = "";
        } else {
            imageToAdd = fileImage.name
            typeFileToAdd = fileImage.type
        }

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/publication/create`,
            data: {
                userName,
                userId,
                description,
                imageUrl: imageToAdd,
                date: dateDay,
                file: recentImage,
                typeFile: typeFileToAdd,
            },
            headers: headers
        })  
            .then((res) => {
                if(res.data.errors) {
                    descriptionError.innerHTML = res.data.errors.description;
                    imageUrlError.innerHTML = res.data.errors.imageURL;
                } else {
                    setValidationPost(true)
                    localStorage.removeItem("recentImage")
                    window.location.reload()
                }
            })
            .catch((err) => {console.log(err)})}


    return(
        
        <DivAllPage className="publication-page">            
            <NewPostDiv>
                <TextContentNewPost id="textNewPost" placeholder=" Ici vous pouvez tout partager avec vos collègues" onChange={(e) => setDescription(e.target.value)} value={description}/>
                <div className="descriptionError"></div>
                <DivButtonNewPost>
                    <InputForImageUrl id="ImageNewPost" type='file' accept="image/*" onChange={(e) => {test64(); setImageUrl(e.target.value)}} value={imageUrl}/>
                    <div className="imageUrlError"></div>
                    <Button id='ButtonPublishNewPost' onClick={publishNewPost}>Publier</Button>
                </DivButtonNewPost>  
            </NewPostDiv>
            {validationPost ? (
                    <DivPostCree>post créé</DivPostCree>
                ) : (
                    <div></div>
                )}
        </DivAllPage>
    )
}

export default NewPost;