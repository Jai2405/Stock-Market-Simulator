import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
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
      <Routes>
        {/* Direct access to "/" redirects to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/stock/:symbol" element={<Stock />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
