import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";


const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 79%;
    border-radius: 15px;
    background-color: ${colors.secondary};
    `

const AllPostDisplay = styled.div`
    border: 2px solid black;
    border-radius: 20px;
    margin-top: 50px;
    padding:15px;
    height: auto;
`

const AllPosts = () => {

      /*  function display(indexer) {
    let sectionCart = document.querySelector("#cart__items");
    // On créer les affichage avec une map et introduction de dataset dans le code html
    sectionCart.innerHTML += indexer.map((kanapChose) => 
        `<article class="cart__item" data-id="${kanapChose._id}" data-color="${kanapChose.color}" data-quantity="${kanapChose.quantity}">
            <div class="cart__item__img">
                <img src="${kanapChose.image}" alt="${kanapChose.alt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${kanapChose.name}</h2>
                    <p>${kanapChose.color}</p>
                    <p data-price="${kanapChose.price}">${kanapChose.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" step="1" class="itemQuantity" min="1" max="100" value="${kanapChose.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-id="${kanapChose._id}" data-color="${kanapChose.color}">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`) }*/
    return(
        
        <DivAllPage className="publication-page">            
            <AllPostDisplay>top</AllPostDisplay>
        </DivAllPage>
    )
}

export default AllPosts;