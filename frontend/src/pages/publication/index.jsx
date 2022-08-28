import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";
import PublicationIndex from "../../components/publication";


const DivAllPage = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 50px;
    width: 90%;
    min-height: 700px;
    height: auto;
    background-color: ${colors.secondary};
    `

const Publication = () => {
    return(
        
        <DivAllPage className="publication-page">                           
                <PublicationIndex />
        </DivAllPage>
    )
}

export default Publication;