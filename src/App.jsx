import React from "react";
import { Routes, Route } from 'react-router-dom';
import Register from "./Pages/Register.jsx";
import Login from './Pages/Login.jsx';
import Home from "./Pages/Home.jsx";
import Need from "./Pages/Need.jsx";
import Start from "./Pages/Start.jsx";
import Match from "./Pages/Match.jsx";



const App = () => {
  return (
    <>
      <div>
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = '/login' element = { < Login />} />
            <Route path = '/register' element = { <Register /> } />
            <Route path = '/need' element = { <Need /> } />
            <Route path = '/start' element = { <Start />} />
            <Route path = '/test' element = { <Test /> } /> 
            <Route path = '/match' element = { <Match /> } />

          </Routes>
      </div>
     
    </>
  )
}

export default App;