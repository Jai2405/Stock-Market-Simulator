import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainLayout from './Components/Layout/MainLayout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio'
import Stock from './pages/Stock';
import axios from 'axios';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css'


export default function App() {
  return (
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/stock/:symbol" element={<Stock />} />
          </Routes>
        </MainLayout>
      </Router>
  );
}