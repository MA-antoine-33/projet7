import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';

import App from './App';

import GlobalStyle from './utils/styles/globalStyle';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
          <App />
    </Router>
  </React.StrictMode>,
)
/*<Router>Route exact path="/" element={<Home />}></Route>
          <Route path="/survey/:questionNumber" element={<Survey />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/freelances" element={<Freelances />}></Route>
          <Route element={<Error />}> </Route>*/
