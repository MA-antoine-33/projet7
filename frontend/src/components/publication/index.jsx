import React from "react";
import styled from 'styled-components';
import DisplayProfil from "./nav";
import Post from "../post";


const DivAllPage = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: center;
    }
    `

const PublicationIndex = () => {
    return(
        
        <DivAllPage className="publication-page">                
                <DisplayProfil />
                <Post />
        </DivAllPage>
    )
}

export default PublicationIndex;