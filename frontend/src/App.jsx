import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RefrshHandler from './utils/RefreshHandler'
import { useState } from 'react'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
     <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/chat' element={<PrivateRoute element={<Chat/>} />} />
    </Routes>
    </>
  )
}

export default App