import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import NavBar from './NavBar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/portfolio' element={<Portfolio />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App









// const [count, setCount] = useState(0);
// const [PL, setPL] = useState(0);


// const fetchAPI = async () => {
//   const response = await axios.get("http://localhost:3000/home");
//   setPL(response.data.profitLoss)
//   console.log(response.data.profitLoss);
// };

// useEffect(() => {
//   fetchAPI();
// }, []);