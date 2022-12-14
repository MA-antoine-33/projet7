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
        text-align: center;
        max-height: 500px;
       
    `
    const ImagePost = styled.img`
        border-radius: 10px;
        height: 100%;
        object-fit: cover;     
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
//Style g??n??ral pour les likes unlikes
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
    //r??cup??rere les donn??es utilisateurs dans le local storage
    const user = JSON.parse(localStorage.getItem("userInfo"));
    //r??cup??rer les tokens pour l'authentification
    const token = user.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    //R??cup??rer les donn??es pour pouvoir les modifier
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
                //Je cr??er les conditions pour afficher les boutons modifi?? si on est enregistr??
                .then(() => {if (userAdmin === true) {
                    setChangeButton(false)
                } else {
                    if (postInfo.userId !== user.userId) {
                    setChangeButton(true);
                } else {
                    setChangeButton(false)}
                }})
                //Je cr??er les conditions pour afficher une image s'il y en a une
                .then(() => {if (postInfo.imageUrl === null || postInfo.imageUrl === undefined || postInfo.imageUrl === "") {
                    setImageLoad(true);
                } else {
                    setImageLoad(false)}
                })
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])
            //Je cr??er l'it??rations pour pouvoir faire chaque post avec map dans le fichier allposts
            for (let i = 0, l = data.length; i < l; i++) {
                if (postInfo._id === data[i]._id){
                    postInfo.Objectid = data[i]._id;
                    postInfo.userId = data[i].userId;
                    postInfo.description = data[i].description;
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
        localStorage.setItem("postImageUrl", JSON.stringify(postInfo.imageUrl))
        localStorage.setItem("postDescription", JSON.stringify(postInfo.description))
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
    }
    //Fonction pour g??rer les je n'aime pas
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
        }

return (
    <DivOnePost>
        {imageLoad ? (
            <div></div>
        ) : (
            <DivPostImage>
                <ImagePost src={postInfo.imageUrl} alt="imge correspondant ?? la publication" />
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
export default Posts;