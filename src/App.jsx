import { Routes, Route } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';


function App() {

  const API_URL = import.meta.env.VITE_API_URL;
  console.log(`🚀 Running in ${import.meta.env.MODE.toUpperCase()} mode. Fetching from: ${API_URL}`);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
