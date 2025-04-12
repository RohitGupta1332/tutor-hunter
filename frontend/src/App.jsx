import './App.css'
import SignUp from './assets/pages/auth/SignUp'
import Login from './assets/pages/auth/Login'
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
