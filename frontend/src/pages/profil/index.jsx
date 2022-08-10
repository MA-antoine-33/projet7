import React from "react";
import Login from "../../components/Log";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";

//import imageConnection from "../../assets/connection.jpg"


const CardImage = styled.div`
    height: auto;
    width: 350px;
    & img {
        height: auto;
        width: 350px;
        border-radius: 0px 15px 15px 0px;        
    }
`

const CardDivAllPage = styled.div`
    display: flex;
    justify-content: center;
    `

const CardDivGeneral = styled.div`
    display: flex;
    flex-direction: row
    justify-content: space-between;
    border: 1px solid black;
    border-radius: 15px;
    width: 700px;
    background-color: ${colors.secondary};
    `

const Profil = () => {
    return(
        <CardDivAllPage className="profil-page">
            <CardDivGeneral className="log-container">
                <Login signin={false} signup={true}/>
                <CardImage className="img-container">
                    <img src="./connection.jpg" alt="Une équipe soudé" />
                </CardImage>
            </CardDivGeneral>
        </CardDivAllPage>
    )
}

export default Profil;