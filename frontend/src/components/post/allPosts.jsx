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
    border-radius: 20px;
    margin-top: 50px;
    height: auto;
    @media (max-width: 767px) {
        width: 100%;
    }
`
const ListUlAll = styled.ul`
    padding-inline-start: 0px;
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

    return(   
        <DivAllPage className="publication-page">   
                <AllPostDisplay id="allPostDisplay">        
                    <ListUlAll>
                        {data.slice(0).reverse().map((postInfo, index) => (
                            <Posts key={index} postInfo={postInfo} />
                        ))}
                    </ListUlAll>
                </AllPostDisplay>    
        </DivAllPage>
    )
}

export default AllPosts;