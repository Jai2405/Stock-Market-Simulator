import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainLayout from './Components/Layout/MainLayout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio'
import Stock from './pages/Stock';
import axios from 'axios';
import './App.css'


export default function App() {
  return (
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/stock/:symbol" element={<Stock />} />
          </Routes>
        </MainLayout>
      </Router>
  );
}