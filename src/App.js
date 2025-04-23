import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";
import List from "./pages/resume/List";

function App() {
  return (
      <div style={{height:"100%"}}>
          <Header/>
          <Router>
              <ScrollToTop/>
              <Routes>
                  <Route path='/login' element={<Login/>}></Route>
              </Routes>
              <Routes>
                  <Route path='/resume/list' element={<List/>}></Route>
              </Routes>
              <Routes>
                  <Route path='/profile' element={<Profile/>}></Route>
              </Routes>
              <Routes>
                  <Route path='/signup' element={<SignUp/>}></Route>
              </Routes>
          </Router>
          <Footer/>
      </div>
  );
}

export default App;
