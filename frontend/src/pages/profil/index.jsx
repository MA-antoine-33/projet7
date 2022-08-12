import React from "react";
import Login from "../../components/log";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import { UserIdContext } from "../../components/appContext";
import { useContext } from "react";

//import imageConnection from "../../assets/connection.jpg"


const Image = styled.div`
    height: auto;
    width: 350px;
    & img {
        height: 100%;
        width: 350px;
        border-radius: 0px 15px 15px 0px;        
    }
`

const DivAllPage = styled.div`
    display: flex;
    justify-content: center;
    margin: 108px;
`

const DivGeneral = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 15px;
    width: 750px;
    background-color: ${colors.secondary};
    `

const Profil = () => {
    const uId = useContext(UserIdContext);
    
    return (
        
        <DivAllPage className="profil-page">    
        {uId ? (
            <h1>Update Page</h1>
        ) : (      
            <DivGeneral className="log-container">                
                <Login signin={false} signup={true}/>
                <Image className="img-container">
                    <img src="./connection.jpg" alt="Une équipe soudé" />
                </Image>
            </DivGeneral>
            )}  
        </DivAllPage>
    );
};

export default Profil;