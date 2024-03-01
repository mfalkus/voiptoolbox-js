import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import About from './Pages/About.jsx';
import Reference from './Pages/Reference/Reference.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SipDiagramPage from './Pages/Reference/SipDiagram.jsx';
import DnsLookup from './Pages/DNSLookup.jsx';
import './vt-cover.scss'

function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Header />
        <div className="container">
            <Routes>
              <Route path="/utils" element={<h1>Test Utils</h1>} />
              <Route path="/utils/reference" element={<Reference />} />
              <Route path="/utils/reference/diagram" element={<SipDiagramPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/:domain" element={<DnsLookup />} />
              <Route path="/" element={<DnsLookup />} />
            </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
