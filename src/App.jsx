// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import { createGlobalStyle } from 'styled-components';
import VerifyEmail from './views/VerifyEmail';
// import GitHubVerification from './views/GitHubVerification';

const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;  
  }

  body{
    font-family: Arial, sans-serif;
    background: url('/binding_dark.webp') repeat;
  }
`;

function App() {

  const API_URL = import.meta.env.VITE_API_URL;
  console.log(`🚀 Running in ${import.meta.env.MODE.toUpperCase()} mode. Fetching from: ${API_URL}`);

  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Routes>
        {/* <Route path='/auth/github/callback' element={<GitHubVerification />} /> */}
        <Route path='/verify-email/:verificationToken' element={<VerifyEmail />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
