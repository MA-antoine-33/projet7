import React /*, { useEffect, useState }*/ from "react";
import { Route, Routes } from 'react-router-dom';

import Header from "./components/header";
import Footer from "./components/footer";
import Profil from "./pages/profil"
import Publication from "./pages/publication";


import { useFetch } from "./utils/hooks";
import { UserIdContext } from "./components/appContext";
//import axios from "axios";



//const uId = JSON.parse(localStorage.getItem("user")

const App = () => {
    /*fetch (`${process.env.REACT_APP_API_URL}api/auth/:id`)
    .then(response => response.json())
    .then(userId => console.log(userId));*/
    let userId = ""
  
  const user = JSON.parse(localStorage.getItem("userInfo"))
  if (user) {
    userId = user.userId
  }
  console.log(user)
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}api/auth/${userId}`
  )
    
      // eslint-disable-next-line no-unused-vars
      const userList = data?.userList
    
      if (error) {
        return <span>Il y a un problème</span>
      }
    
 /*   const [uId, setUId]  = useState(null);

    useEffect(() => {
        const fetchToken = async() => {
        await axios ({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/auth/62fa0d4862cae91b27a126b0`,
        
        })
        
        .then((res) => {setUId(res.data);})
        .catch((err) => console.log("No Token"));
        }
        fetchToken();
    }, [uId]);*/

    return (
        
        <UserIdContext.Provider value={data._id}>
       <div>
            <Header />
            <Routes>
                <Route path="/" element={<Profil />}></Route>
                <Route path="/publication" element={<Publication />}></Route>
            </Routes>
            <Footer />
            </div>
        </UserIdContext.Provider>
        
    )
}

export default App;