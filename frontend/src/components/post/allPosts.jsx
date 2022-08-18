import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import axios from "axios"; 
import Posts from "./posts";



const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: ${colors.secondary};
    `
const AllPostDisplay = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin-top: 50px;
    padding: 15px;
    height: auto;
`

const AllPosts = () => {
    
    //const [displayDiv, setDisplayDiv] = useState(false)
    const [data, setData] = useState([])
    //On créer la const qui récupère nos data et les nomme
        useEffect(() => {  
        axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/publication`
            })  
                .then((res) => setData(res.data));
                }, []);
                    /*for (let postInfo of data) {
                    for (let i = 0, l = data.length; i < l; i++) {
                        //Pour chaque Id valable on lui rend ses valeur de l'Array
                        if (postInfo._id === data[i]._id ) {
                            postInfo.userName = data[i].userName;
                            postInfo.description = data[i].description;
                            postInfo.date = data[i].date;
                            postInfo.imageUrl = data[i].imageUrl;
                                //On ajoute une consition pour savoir si une image est postée ou non
                                if (postInfo.imageUrl === "" || undefined) {
                                    displayImage(data);
                                } else {
                                    display(data);
                                }                      
                        } 
                        }
                    }
                })
                .catch((err) => {console.log(err)})
            }, []);
        
    //On créer notre article si une image (valable) est postée
    function displayImage(indexer) {
        let sectionPost = document.querySelector("#allPostDisplay");
        // On créer les affichage avec une map et introduction de dataset dans le code html
        sectionPost.innerHTML += indexer.map((postInfo) => 
            `<article class="divOnePost" data-id="${postInfo._id}" >
                <div class="postImage">
                    <img src="${postInfo.imageUrl}" alt="image correspondant à la publication">
                </div>
                <div>
                    <div class="divUserInfo">
                        <div class="divTitleDate">
                            <h2>${postInfo.userName}</h2>
                            <p>le ${postInfo.date} </p>
                        </div>
                        <div>
                            <button class="deleteComment">Supprimer</button>
                        <div>
                    </div>
                <div>
                    <p>${postInfo.description}</p>
                </div>
                <div class="likeUnlike">
                    <div class="likes">like</div>
                    <div class="likes">Unlike</div>
                </div>
                <div class="divComment">
                <textarea class="textComment" placeholder="Commentez ici..."></textarea>
                    <button class="addComment">Poster votre commentaire</button>
                </div>
                <div class="divShowComment">
                    <button class="showComment addComment">Voir tous les commentaires</button>
                    <div class="allCommentDisplay">Tous les commentaires </div>
                </div>
            </article>`) 
        //On remplace les virgules des tableaux par des espaces
        .join("");
    }

    //On créer notre fonction si aucune iimage n'est posté
    function display(indexer) {
        let sectionPost = document.querySelector("#allPostDisplay");
        // On créer les affichage avec une map et introduction de dataset dans le code html
        sectionPost.innerHTML += indexer.map((postInfo) => 
            `<article class="divOnePost" data-id="${postInfo._id}" >
                <div>
                    <div class="divUserInfo">
                        <div class="divTitleDate">
                            <h2>${postInfo.userName}</h2>
                            <p>le ${postInfo.date} </p>
                        </div>
                        <div>
                            <button class="deleteComment">Supprimer</button>
                        </div>
                    </div>
                </div>
                <div>
                    <p>${postInfo.description}</p>
                </div>
                <div class="likeUnlike">
                    <div class="likes">like</div>
                    <div class="likes">Unlike</div>
                </div>
                <div class="divComment">
                    <textarea class="textComment" placeholder="Commentez ici..."></textarea>
                    <button class="addComment"">Poster votre commentaire</button>
                </div>
                <div class="divShowComment">
                    <button class="showComment addComment">Voir tous les commentaires</button>
                    <div class="allCommentDisplay">Tous les commentaires </div>
                </div>
            </article>`) 
        //On remplace les virgules des tableaux par des espaces
        .join("");
    }}*/

    return(   
        <DivAllPage className="publication-page">   
                <AllPostDisplay id="allPostDisplay">        
                    <ul>
                        {data.map((postInfo, index) => (
                            <Posts key={index} postInfo={postInfo} />
                        ))}
                    </ul>
                </AllPostDisplay>    
        </DivAllPage>
    )
}

export default AllPosts;