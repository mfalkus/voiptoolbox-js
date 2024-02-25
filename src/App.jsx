import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import About from './Pages/About.jsx';
import Reference from './Pages/Reference/Reference.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Header />
        <div className="container">
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/utils" element={<h1>Test Utils</h1>} />
              <Route path="/utils/reference" element={<Reference />} />
              <Route path="/about" element={<About />} />
            </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
