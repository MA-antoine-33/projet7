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
        @media (max-width: 767px) {
            flex-direction: column;
            margin-bottom: 10px;
            align-items: flex-start;
        }
    `
    const DivTitleDate = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
    `
    const TitleHDeux = styled.h2`
        margin-right: 15px;
        font-size:1em;
    `
    const PDate = styled.p`
    font-size:0.6em;
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
        background-color: rgba(140, 108, 10, 0.664);
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
        background-color: #FFEBD7;
    `
    const PublicationTextP = styled.p`
        height: 60px;
        overflow: auto;
        padding 5px;
    `
 /*   //Style pour les commentaires
    const DivComment = styled.div`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
    `
        const TextComment = styled.textarea`
            color: black;
            background-color: rgba(235, 215, 215, 0.60);
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
        `*/
//Style général pour les likes unlikes
const DivLikeUnlike = styled.div`
   display: flex;
   align-items: center;
   margin-top: 10px;
   `
    //Styles des bouttons
     const ButtonLikes = styled.button`
        margin-right: 5px;
        background-color: rgba(0, 150, 0, 1);
        border-radius: 5px;
        padding: 4px;
        border: none;
        color: white;
       `
    const ButtonUnlikes = styled.button`
        margin-right: 5px;
        background-color: rgba(180, 0, 0, 1);
        border-radius: 5px;
        padding: 4px;
        border: none;
        color: white;
       `    
    //Style pour le comptage de like/ unlike
    const CountNumberLike = styled.div`
        color: rgba(0, 150, 0, 1);
        margin-right: 15px;
        border: 1px solid rgba(0, 150, 0, 1);
        border-radius: 15px;
        padding: 0px 5px;
    `
    const CountNumberUnlike = styled.div`
        color: rgba(180, 0, 0, 1);
        margin-right: 15px;
        border: 1px solid rgba(180, 0, 0, 1);
        border-radius: 15px;
        padding: 0px 5px;
    `
const Posts = ({postInfo}) => {
    //récupérere les données utilisateurs dans le local storage
    const user = JSON.parse(localStorage.getItem("userInfo"));
    //récupérer les tokens pour l'authentification
    const token = user.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    //Récupérer les données pour pouvoir les modifier
    const [data, setData] = useState([]);
    const [changeButton, setChangeButton] = useState();
    const [imageLoad, setImageLoad] = useState();
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
   
      
    useEffect(() => {  
        axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/publication`
            })  
                .then((res) => setData(res.data))
                //Je créer les conditions pour afficher les boutons modifié si on est enregistré
                .then(() => {if (userAdmin === true) {
                    setChangeButton(false)
                } else {
                    if (postInfo.userId !== user.userId) {
                    setChangeButton(true);
                } else {
                    setChangeButton(false)}
                }})
                //Je créer les conditions pour afficher une image s'il y en a une
                .then(() => {if (postInfo.imageUrl === null || postInfo.imageUrl === undefined || postInfo.imageUrl === "") {
                    setImageLoad(true);
                } else {
                    setImageLoad(false)}
                })
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])
            //Je créer l'itérations pour pouvoir faire chaque post avec map dans le fichier allposts
            for (let i = 0, l = data.length; i < l; i++) {
                if (postInfo._id === data[i]._id){
                    postInfo.Objectid = data[i]._id;
                    postInfo.userId = data[i].userId;
                    postInfo.like = data[i].like;
                    postInfo.dislike = data[i].dislike;
                    postInfo.userName = data[i].userName;
                    postInfo.imageUrl = data[i].imageUrl;
                    postInfo.date = data[i].date;
                    postInfo.usersLiked = data[i].usersLiked;
                    postInfo.usersDisliked = data[i].usersDisliked;}
                }
             
               
    //Supprimer un post
    const deletePost = async (e) => {
        await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/publication/${postInfo.Objectid}`,
            data: {
                userId: postInfo.userId,
                userName: postInfo.userName,
                imageUrl: postInfo.imageUrl,
                admin: user.admin  
            },
            headers: headers
        }).then(window.location.reload())
      };
    //Modifier un post
    const updateOnePost =  () => {
        localStorage.setItem("postId", JSON.stringify(postInfo.Objectid))
        window.location.href = "http://localhost:3000/modifyPost";
    }
    //Ajouter un like
    const addLike = (e) => {
        e.preventDefault();
         axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/publication/${postInfo.Objectid}/likes/like`,
            data: {
                postId: postInfo.Objectid,
                userName: postInfo.userName,
                description: postInfo.description,
                userId: user.userId,
                usersLiked: postInfo.usersLiked,
                usersDisliked: postInfo.usersDisliked,
                like: postInfo.like,
                dislike: postInfo.dislike 
            },
            headers: headers
        })
        .then(window.location.reload())
        
            console.log(postInfo)
            console.log("ajouter")
            console.log("userliked : ", postInfo.usersLiked) 
            
    }
//Fonction pour gérer les je n'aime pas
  const addUnlike = (e) => {
       
        e.preventDefault();
        axios({
           method: "post",
           url: `${process.env.REACT_APP_API_URL}api/publication/${postInfo.Objectid}/likes/dislike`,
           data: {
                postId: postInfo.Objectid,
                userName: postInfo.userName,
                description: postInfo.description,
                userId: user.userId,
                usersLiked: postInfo.usersLiked,
                usersDisliked: postInfo.usersDisliked,
                like: postInfo.like,
                dislike: postInfo.dislike 
           },
           headers: headers
       })
       .then(window.location.reload())
        console.log("Je n'aime pas")
        console.log(postInfo.like)
    }

return (
    <DivOnePost>
        {imageLoad ? (
            <div></div>
        ) : (
            <DivPostImage>
                <img src={postInfo.imageUrl} alt="imge correspondant à la publication" />
            </DivPostImage>
        )} 
            <DivUserInfo>
                <DivTitleDate>
                    <TitleHDeux>{postInfo.userName}</TitleHDeux>
                    <PDate>le {postInfo.date} </PDate>
                </DivTitleDate>
                {changeButton ? (
                    <div></div>
                ) : (
                    <div>
                        <ButtonModifyComment onClick={updateOnePost}>Modifier</ButtonModifyComment>
                        <ButtonDeleteComment onClick={deletePost} >Supprimer</ButtonDeleteComment>
                    </div>
                )}
            </DivUserInfo>
        <DivTextPost>
            <PublicationTextP>{postInfo.description}</PublicationTextP>
        </DivTextPost>
        <DivLikeUnlike>
            <ButtonLikes onClick={addLike}>J'aime </ButtonLikes>
            
            <CountNumberLike>{postInfo.like}</CountNumberLike>
            <ButtonUnlikes onClick={addUnlike}>Je n'aime pas</ButtonUnlikes>
            <CountNumberUnlike>{postInfo.dislike}</CountNumberUnlike>
        </DivLikeUnlike>
         
    </DivOnePost>
    );
};
/* <DivComment>
            <TextComment placeholder="Commentez ici..."></TextComment>
            <ButtonAddComment>Poster votre commentaire</ButtonAddComment>
        </DivComment>
        <DivShowComment>
            <ButtonAddComment>Voir tous les commentaires</ButtonAddComment>
            <div className="allCommentDisplay">Tous les commentaires </div>
        </DivShowComment>  */
export default Posts;