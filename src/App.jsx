import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import About from './About.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

function App() {

  return (
    <>
      <Header />
        <div className="container">
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/utils" element={<h1>Test Utils</h1>} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </div>
      <Footer />
    </>
  )
}

export default App
