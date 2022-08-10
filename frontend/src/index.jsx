import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Profil from './pages/profil';

import GlobalStyle from './utils/styles/globalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <GlobalStyle />
        <Header />
        <Routes>
        <Route path="/" element={<Profil />}></Route>
        </Routes>
        <Footer />
   
  </Router>
  </React.StrictMode>,
)
/*<Router>Route exact path="/" element={<Home />}></Route>
          <Route path="/survey/:questionNumber" element={<Survey />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/freelances" element={<Freelances />}></Route>
          <Route element={<Error />}> </Route>*/
