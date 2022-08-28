import React  from "react";
import { Route, Routes } from 'react-router-dom';

import Header from "./components/header";
import Footer from "./components/footer";
import Profil from "./pages/profil"
import Publication from "./pages/publication";
import ModifyProfil from "./components/publication/modifyProfil";

import { useFetch } from "./utils/hooks";
import { UserIdContext } from "./components/appContext";
import ModifyPost from "./components/post/modifyPost";

//On créer nos routes pour nos différentes pages
const App = () => {
    let userId = ""
  
  const user = JSON.parse(localStorage.getItem("userInfo"))
  if (user) {
    userId = user.userId
  }
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}api/auth/${userId}`
  )  
      // eslint-disable-next-line no-unused-vars
      const userList = data?.userList
    
      if (error) {
        return <span>Il y a un problème</span>
      }

    return (
        
        <UserIdContext.Provider value={data._id}>
       <div>
            <Header />
            <Routes>
                <Route path="/" element={<Profil />}></Route>
                <Route path="/publication" element={<Publication />}></Route>
                <Route path="/modifyProfil" element={<ModifyProfil />}></Route>
                <Route path="/modifyPost" element={<ModifyPost />}></Route>
            </Routes>
            <Footer />
            </div>
        </UserIdContext.Provider>
        
    )
}

export default App;