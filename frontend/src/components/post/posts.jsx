import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";

//style pour l'ensmeble des posts
const DivOnePost = styled.article`
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 15px;
`
    //Style pour l'image
    const DivPostImage = styled.div`
        border: 1px solid black;
    `
    //Style pour les infos sur l'utilisateur
    const DivUserInfo = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `
    const DivTitleDate = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
    `
    const TitleHDeux = styled.h2`
        margin-right: 15px;
    `
    //Style pour le button supprimer un post
    const ButtonDeleteComment = styled.button`
        background-color: rgba(197, 47, 47, 0.664);
        color: white;
        border-radius: 5px;
        border: none;
        padding: 5px 10px 5px 10px;
        &:hover {
            background-color: rgba(255, 0, 0, 0.829);
        }
    `
    //Style pour le boutton modifier un post 
    const ButtonModifyComment = styled.button`
        margin-right: 25px;
        background-color: rgba(69, 128, 59, 0.664);
        color: white;
        border-radius: 5px;
        border: none;
        padding: 5px 10px 5px 10px;
        &:hover {
            background-color: rgba(66, 169, 40, 0.829);
        }
    `
    //Style pour le texte du post
    const DivTextPost = styled.div`
        border: 1px solid black;
        padding-left: 10px;
        width: 98%;
        border-radius: 10px;
    `
    //Style pour les likes unlikes
    const DivLikeUnlike = styled.div`
    display: flex;
    margin-top: 10px;
    `
        const DivLikes = styled.div`
            margin-right: 15px;
        `

    //Style pour les commentaires
    const DivComment = styled.div`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
    `
        const TextComment = styled.textarea`
            color: black;
            background-color: #ffb4b4;
            width: 80%;
            border: 1px solid rgba(249, 255, 225, 0.548);
            border-radius: 10px;
        `
        const ButtonAddComment = styled.button`
            border-radius: 10px;
            background: linear-gradient(0deg, #FFD7D7 30%, #ff8f77);
            height: 25px;
            width: 20%;
            margin-top: 10px;
            margin-bottom: 10px;
            border: none;
            &:hover {
                background: #ff8f77;
            }
        `
        const DivShowComment = styled.div`
            margin-top: 10px;
        `

const Posts = ({postInfo}) => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const token = user.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    const [data, setData] = useState([])
    useEffect(() => {  
        axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/publication`
            })  
                .then((res) => setData(res.data));
                }, []);
                console.log(data)
    const deletePost = async () => {
        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/publication/${data[postInfo].data_Id}`,
            headers: headers
        }) 
      }

    return (
    <DivOnePost>
                <DivPostImage>
                    <img src={postInfo.imageUrl} alt="imge correspondant à la publication" />
                </DivPostImage>
                <div>
                    <DivUserInfo>
                        <DivTitleDate>
                            <TitleHDeux>{postInfo.userName}</TitleHDeux>
                            <p>le {postInfo.date} </p>
                        </DivTitleDate>
                        <div>
                            <ButtonModifyComment>Modifier</ButtonModifyComment>
                            <ButtonDeleteComment onClick={deletePost}>Supprimer</ButtonDeleteComment>
                        </div>
                    </DivUserInfo>
                </div>
                <DivTextPost>
                    <p>{postInfo.description}</p>
                </DivTextPost>
                <DivLikeUnlike>
                    <DivLikes>like</DivLikes>
                    <DivLikes>Unlike</DivLikes>
                </DivLikeUnlike>
                <DivComment>
                    <TextComment placeholder="Commentez ici..."></TextComment>
                    <ButtonAddComment>Poster votre commentaire</ButtonAddComment>
                </DivComment>
                <DivShowComment>
                    <ButtonAddComment>Voir tous les commentaires</ButtonAddComment>
                    <div className="allCommentDisplay">Tous les commentaires </div>
                </DivShowComment>
            </DivOnePost>
    );
};

export default Posts;