import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/home/Login'
import Employee from './pages/Employee'
import Admin from './pages/Admin'
import AdminProtected from './pages/AdminProtected'
import EmployeeProtected from './pages/EmployeeProtected'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function App() {

  const roles = useSelector(state => state.roles) 

  const [login, setLogin] = useState(false)


  const getRoles = () => {
    const URL = `http://localhost:3000/${roles}`
    axios.get(URL)
    .then(res => setLogin(res.data))
    .catch(err => console.log(err))
  }

  useEffect(()=>{
      getRoles()
  },[roles])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home login={login} />} />
        <Route path='/login' element={<Login />} />
        <Route element={<AdminProtected />}>
          <Route path='/admin' element={<Admin/>} />
        </Route>
        <Route element={<EmployeeProtected  />}>
          <Route path='/empleado/:id' element={<Employee />} />
    </Route>    
      </Routes>
    </div>
  )
}

export default App
