import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs';
import './styles/cardUser.css'

const CardUser = ({user,setUpdateInfo,setActivateForm,deleteUserById}) => {
  
  const getInfoUpdate = () => {
    setUpdateInfo(user)
    setActivateForm(false)
  }
  const handleDelete = () => {
    if(window.confirm(`Estas seguro de eliminar este usuario 
    ${user.nombres} ${user.apellidos}`)){deleteUserById(user.id)}
  }
  return (
    <article className='userCard'>
      <h2 className='user_name'>{`${user.nombres} ${user.apellidos}`}</h2>
      <ul className='user_list'>
        <li className='user_item'><span className='user_span'>Usuario: </span>{user.user}</li>
        <li className='user_item'><span className='user_span'>Contraseña: </span>{user.password}</li>
        <li className='user_item'><span className='user_span'>Cedula: </span>{user.cedula}</li>
        <li className='user_item'><span className='user_span'>Correo electrónico: </span>{user.email}</li>
        <li className='user_item'><span className='user_span'>Fecha de nacimiento: </span>{user.fecha_nacimiento}</li>
        <li className='user_item'><span className='user_span'>Teléfono movil: </span>{user.celular}</li>
        <li className='user_item'><span className='user_span'>Estado de vacunación: </span>{`${user.vacunado=="true" ? 'vacunado' : 'no vacunado'}`}</li>
        {
          user.vacunado=="true" ?
            <ul className='user_list-vacuna'>
              <li className='user_item'><span className='user_span'>Fecha vacunación: </span>{user.fecha_vacuna}</li>
              <li className='user_item'><span className='user_span'>Número de dosis: </span>{user.numero_dosis}</li>
              <li className='user_item'><span className='user_span'>Fecha vacunación: </span>{user.vacuna}</li>
            </ul>
            : ''
        }

      </ul>
      <footer className='user__footer'>
        <button className={`user__btn delete__btn ${ 'disable__delete'}`}  onClick={handleDelete} >
          <AiFillDelete
            className='user_delete'
             />
        </button>
        <button className='user__btn update__btn' onClick={getInfoUpdate}>
          <BsPencilSquare
            className='user_update'
             />
        </button>
        </footer>
    </article>
  )
}

export default CardUser