import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import { Button } from "../../utils/styles/atoms";
import axios from "axios";
import { useState} from 'react';


const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 79%;
    border-radius: 15px;
    background-color: ${colors.secondary};
    `
//Style pour la partie nouvele publication
const NewPostDiv = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    border-radius: 20px;
    height: 100%;
    background-color: ${colors.tertiaryBis};
`
    //style pour la partie contenue de la nouvelle publication
    const TextContentNewPost = styled.textarea`
        font-size: 1.1em;
        height: 80%;
        width: 60%;
        border: 0.3em ridge ${colors.secondary};
        border-radius: 10px;
        background-color: ${colors.tertiaryBis};
        padding: 7px;
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
        width: 60%;
        border: none;
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

const NewPost = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    //const userId = user.userId
    const token = user.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    
const publishNewPost = (e) => {
    e.preventDefault();
    //const description = 
    const descriptionError = document.querySelector(".descriptionError");
    const imageUrlError = document.querySelector(".imageUrlError");
    axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/publication/create`,
        data: {
            description,
            imageUrl, 
        },
        headers: headers
    })  
        .then((res) => {
            if(res.data.errors) {
                descriptionError.innerHTML = res.data.errors.description;
                imageUrlError.innerHTML = res.data.errors.imageURL;
            } else {
                localStorage.setItem("postInfo", JSON.stringify(res.data))
                console.log(res)
                
                
                //localStorage.setItem(userInfo, res).stringify
            }
        })
        .catch((err) => {console.log(err)})}


    return(
        
        <DivAllPage className="publication-page">            
            <NewPostDiv>
                <TextContentNewPost id="textNewPost" placeholder=" Ici vous pouvez tout partager avec vos collègues" onChange={(e) => setDescription(e.target.value)} value={description}/>
                <div className="descriptionError"></div>
                <DivButtonNewPost>
                    <InputForImageUrl id="ImageNewPost"type='text' placeholder="Rentrer l'url de votre image" onChange={(e) => setImageUrl(e.target.value)} value={imageUrl}/>
                    <div className="imageUrlError"></div>
                    <Button id='ButtonPublishNewPost' onClick={publishNewPost}>Publier</Button>
                </DivButtonNewPost>
            </NewPostDiv>
        </DivAllPage>
    )
}

export default NewPost;