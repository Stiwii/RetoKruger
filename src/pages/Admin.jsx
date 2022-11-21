import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import CardUser from '../components/admin/CardUser'
import FormAdmin from '../components/admin/FormAdmin'
import { setComprobador } from '../store/slices/comprobador.slice'
import { setRolesGlobal } from '../store/slices/roles.slice'
import './styles/admin.css'

const baseURL = `http://localhost:3000/empleado`
const Admin = () => {
  const [users, setUsers] = useState('')
  const [activateForm, setActivateForm] = useState(true)
  const [updateInfo, setUpdateInfo] = useState()
  const [selectType, setSelectType] = useState('?vacunado=false')
  const dispatch = useDispatch()
  const roles=useSelector(state => state.roles)

  const getAllUsers = () => {
    if(selectType == 'todos'){
      axios.get(baseURL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
    } else {
      const URL = `${baseURL}${selectType}`
      axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
    }
  }
  const createNewUser =(data) => {
    axios.post(baseURL,data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id,data) => {
    const URL = `${baseURL}/${id}/`
  
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
   }

   const deleteUserById = id => {
    const URL = `${baseURL}/${id}/`
    axios.delete(URL)
      .then(res => {console.log(res.data)
      getAllUsers()
      })
      .catch(err => console.log(err))
   }
  useEffect(()=>{
    getAllUsers()
  },[selectType])
  // console.log(users)
  const handleLogOut = () => {
    dispatch(setRolesGlobal(''))
    dispatch(setComprobador(false))
  }

  const handleBtnCrear = () => {
    setActivateForm(false)
  }
  const handleChange = e => {
    setSelectType(e.target.value)
    getAllUsers()
  }
  return (
    <div className='admin_container'>
      <div className='admin_header'>
        <h1 className='admin.title'>{roles}</h1>
        <button className='btn_create' onClick={handleBtnCrear}>Crear Usuario</button>
        <button className='btn_log-out' onClick={handleLogOut}>Cerrar Sesión</button>
        <div className='filtrar_users'>
        <h4>Filtrar usuarios:</h4>
        <select name="" onChange={handleChange}>
          <option value="todos">Todos</option>
          <option value="?vacunado=true">Solo vacunados</option>
          <option value="?vacunado=false">No vacunados</option>
          <option value="?vacuna=Sputnik&vacunado=true">Vacuna: Sputnik</option>
          <option value="?vacuna=AstraZeneca&vacunado=true">Vacuna: AstraZeneca</option>
          <option value="?vacuna=Pfizer&vacunado=true">Vacuna: Pfizer</option>
          <option value="?vacuna=Jhonson&Jhonson&vacunado=true">Vacuna: Jhonson&Jhonson</option>
        </select>
        </div>
      </div>
      
      <div className='users-container'>
     {
       users ?  users.map(user => (
         <CardUser
         key={user.cedula}
         user={user}
         setUpdateInfo={setUpdateInfo}
         setActivateForm={setActivateForm}
         deleteUserById = {deleteUserById}
         />
         )) : []     
        }
      
        </div>
      <div className={`admin_form ${activateForm && 'disable_form'}`}>

          <FormAdmin 
          createNewUser={createNewUser}
          setActivateForm={setActivateForm}
          updateUserById ={updateUserById}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          />
      </div>
    </div>
  )
}

export default Admin