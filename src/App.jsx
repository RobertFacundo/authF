import { Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import { createGlobalStyle } from 'styled-components';
import VerifyEmail from './views/VerifyEmail';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';

// import GitHubVerification from './views/GitHubVerification';

const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;  
  }

  html, body{
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
        <Route path='/verify-email/:verificationToken' element={<VerifyEmail />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
