import { useState } from 'react'
import axios from 'axios'
import {BrowserRouter,Routes,Route, useNavigate, Navigate} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import {Toaster} from 'react-hot-toast'
import Createnotes from './pages/Createnotes'
import Profile from './pages/Profile'
import { useUser } from './context/UserContext'
import Navbar from './pages/Navbar'
import ForgetPassword from './pages/ForgetPassword'

function App() {

  const {user}=useUser()
  
  
  

  return (
    <>
     <BrowserRouter>
     { user && <Navbar/>}
     <Routes>
      <Route path='/' element={<Check/>}> </Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/createnotes' element={<Createnotes/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/forgetPassword' element={<ForgetPassword/>}/>
     </Routes>
     <Toaster/>
     </BrowserRouter>
    </>
  )
}
const Check=()=>{
    const isAuth=localStorage.getItem('token');
    if(! isAuth){
      return <Navigate to='/login'/>
    }
    else{
      return <Navigate to="/dashboard"/>
    }

}

export default App
