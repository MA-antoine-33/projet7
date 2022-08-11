import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import { Button } from '../../utils/styles/atoms';


const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 79%;
    border-radius: 15px;
    background-color: ${colors.secondary};
    `
//Style pour la partie nouvele publication
const NewPost = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    border-radius: 20px;
    height: 15%;
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

const AllPostDisplay = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin-top: 50px;
    padding:15px;
    height: auto;
`

const Post = () => {
    return(
        
        <DivAllPage className="publication-page">            
            <NewPost>
                <TextContentNewPost placeholder=" Ici vous pouvez tout partager avec vos collègues"/>
                <DivButtonNewPost>
                    <InputForImageUrl type='text' placeholder="Rentrer l'url de votre image" />
                    <Button id='ButtonPublishNewPost'>Publier</Button>
                </DivButtonNewPost>
            </NewPost>
            <AllPostDisplay>Posts triés par date et avec la possibilité de liker</AllPostDisplay>
        </DivAllPage>
    )
}

export default Post;