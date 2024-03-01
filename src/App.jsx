import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import About from './Pages/About.jsx';
import ReferenceWrapper from './Pages/Reference/ReferenceWrapper.jsx';
import Reference from './Pages/Reference/Reference.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SipDiagramPage from './Pages/Reference/SipDiagram.jsx';
import DnsLookup from './Pages/SIPUtils/DNSLookup.jsx';
import './vt-cover.scss'
import SIPUtilsWrapper from './Pages/SIPUtils/SIPUtilsWrapper.jsx';
import PacketAnalysis from './Pages/SIPUtils/PacketAnalysis.jsx';

function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Header />
        <div className="container">
            <Routes>
              <Route path="/utils/reference" element={<ReferenceWrapper><Reference /></ReferenceWrapper>} />
              <Route path="/utils/reference/diagram" element={<ReferenceWrapper><SipDiagramPage /></ReferenceWrapper>} />
              <Route path="/about" element={<About />} />
              <Route path="/utils/packet" element={<SIPUtilsWrapper><PacketAnalysis/></SIPUtilsWrapper>} />
              <Route path="/utils/:domain" element={<SIPUtilsWrapper><DnsLookup /></SIPUtilsWrapper>} />
              <Route path="/:domain" element={<SIPUtilsWrapper><DnsLookup /></SIPUtilsWrapper>} />
              <Route path="/" element={<SIPUtilsWrapper><DnsLookup /></SIPUtilsWrapper>} />
            </Routes>
        </div>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
