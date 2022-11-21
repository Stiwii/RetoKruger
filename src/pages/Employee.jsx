import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FormUser from '../components/Employee/FormUser'
import { setComprobador } from '../store/slices/comprobador.slice'
import { setRolesGlobal } from '../store/slices/roles.slice'
import './styles/admin.css'
import './styles/employee.css'

const Employee = () => {
  const [activateForm, setActivateForm] = useState(true)
  const [userById, setUserById] = useState()
  const dispatch=useDispatch()
  const {id} = useParams()

  
  const URL = `http://localhost:3000/empleado/${id}`
  useEffect(() => {
    getUser()
  }, [])
  const getUser = ()=>{
    
    axios.get(URL)
      .then(res => setUserById(res.data))
      .catch(err => console.log(err))
  }
  
  const updateUser= (data) => {
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getUser()
      })
      .catch(err => console.log(err))
   }
  const handleLogOut = () => {
    dispatch(setRolesGlobal(''))
    dispatch(setComprobador(false))
  }
  const handleInformacion = () => {
    setActivateForm(false)
  }
  console.log(activateForm)
  if(userById){
  return (
    <div className='admin_container'>
      <div className='admin_header'>
        <h1 className='admin.title'>{`${userById.nombres} ${userById.apellidos}`} </h1>
        <button className='btn_create' onClick={handleInformacion}>Actualizar Información</button>
        <button className='btn_log-out' onClick={handleLogOut}>Cerrar Sesión</button>
      </div>
      <article className='e_article'>
        <ul className='e_list'>
          <li className='e_item'><span className='e_span'>Nombres: </span>{`${userById.nombres}`}</li>
          <li className='e_item'><span className='e_span'>Apellidos: </span>{userById.apellidos}</li>
          <li className='e_item'><span className='e_span'>Cédula: </span>{userById.cedula}</li>
          <li className='e_item'><span className='e_span'>Email: </span>{userById.email}</li>
          <li className='e_item'><span className='e_span'>Usuario: </span>{userById.user}</li>
          <li className='e_item'><span className='e_span'>Fecha de nacimiento: </span>{userById.fecha_nacimiento}</li>
          <li className='e_item'><span className='e_span'>Direccion: </span>{userById.direccion}</li>
          <li className='e_item'><span className='e_span'>Celular: </span>{userById.celular}</li>
          <li className='e_item'><span className='e_span'>Vacunado: </span>{`${userById.vacunado ? 'vacunado' : 'no vacunado'}`}</li>
          {console.log(userById.vacunado)}
          {
            
          userById.vacunado ? 
            <ul className='e_list-vacuna'>
              <li  className='e_item'><span className='e_span'>Fecha vacunación: </span>{userById.fecha_vacuna}</li>
              <li className='e_item'><span className='e_span'>Número de dosis: </span>{userById.numero_dosis}</li>
              <li className='e_item'><span className='e_span'>Fecha vacunación: </span>{userById.vacuna}</li>
            </ul>
            : ''
        }
        </ul>
        <div className='inyeccion'> 
        </div>
        <div className={`form_employee ${activateForm && 'active_form'}`}>
          <FormUser user={userById} 
          setActivateForm={setActivateForm}
          updateUser = {updateUser}
          activateForm = {activateForm}
          getUser = {getUser}
          />
        </div>
      </article>
    </div>
  )}
}

export default Employee