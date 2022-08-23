import React from "react";
import styled from 'styled-components';
import colors from "../../utils/styles/colors";

import NewPost from "./newPost";
import AllPosts from "./allPosts";


const DivAllPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 79%;
    border-radius: 15px;
    background-color: ${colors.secondary};
    @media (max-width: 767px) {
        width: 95%;
    }
    `

const Post = () => {
    return(
        
        <DivAllPage className="publication-page">            
            <NewPost/>
            <AllPosts/>
        </DivAllPage>
    )
}

export default Post;