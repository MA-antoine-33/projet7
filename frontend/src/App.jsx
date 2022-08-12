import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import Header from "./components/header";
import Footer from "./components/footer";
import Profil from "./pages/profil"
import Publication from "./pages/publication";



import { UserIdContext } from "./components/appContext";
import axios from "axios";



//const uId = JSON.parse(localStorage.getItem("user")

const App = () => {
    const [uId, setUId]  = useState(null);


    useEffect(() => {
        const fetchToken = async() => {
        await axios ({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/auth/`
        })
        .then((res) => setUId(res.data))
        .catch((err) => console.log("No Token"));
        }
        fetchToken();
    }, [uId]);

    return (
        
        <UserIdContext.Provider value={uId}>
            <Header />
            <Routes>
                <Route path="/" element={<Profil />}></Route>
                <Route path="/publication" element={<Publication />}></Route>
            </Routes>
            <Footer />
            
        </UserIdContext.Provider>
        
    )
}

export default App;