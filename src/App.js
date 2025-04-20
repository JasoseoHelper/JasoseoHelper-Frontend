import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Login from "./pages/Login/Login";

const PageLayout = (children) => {
  return (
      <div>
        <Header/>
        {children}
        <Footer/>
      </div>
  )
}

function App() {
  return (
      <div>
        <Header/>
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </Router>
        <Footer/>
      </div>
  );
}

export default App;
