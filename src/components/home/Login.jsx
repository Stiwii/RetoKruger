import React, { useEffect, useState } from 'react'
import './styles/login.css'
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCloseCircle} from 'react-icons/ai';
import { setRolesGlobal } from '../../store/slices/roles.slice';
import { setComprobador } from '../../store/slices/comprobador.slice';
import Admin from '../../pages/Admin';

const Login = ({login}) => {
  //visualizar el password
  const [viewPassword, setViewPassword] = useState('password')
  const [check, setCheck] = useState(true)

  //controlar formulario de login
  const {handleSubmit, reset, register} = useForm()
  //variable global del rol
  const roles = useSelector(state => state.roles)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //guardar el index
  


  const submit = data =>{
    const findUser = login.find(user => user.user == data.text && user.password == data.password)

     if(findUser){
          dispatch(setComprobador(true))
          if(roles == 'admin'){
          navigate(`/${roles}`)}
          else{
            navigate(`/${roles}/${findUser.id}`)
          }  
     }else{
      window.alert("usuario o ontraseña invalidos")
     }
      
    
  }


const handlePassword = () =>{
  setCheck(!check)
  if(check == true){
    setViewPassword('text')
  }else{
    setViewPassword('password')
  }
}
const handleEmpty = () => {
  dispatch(setRolesGlobal(''))
}

  return (
    <div className="div_form">
      <AiFillCloseCircle  className='form_x' onClick={handleEmpty}/>
    <form className='login_form' onSubmit={handleSubmit(submit)}>
      <h1 className='login_form-h1' >{roles}</h1>
      
      <div className='login_form-div'>
        <label className='login_form-label'  htmlFor="text">Usuario</label>
        <input className='login_form-input' type="text" id='text' {...register('text')} placeholder={`usuario de prueba: ${roles=="admin" ? "admin": "abc"}`} />
      </div>
      <div className='login_form-div'>
        <div>
        <label className='login_form-label'  htmlFor="password">Contraseña  </label>
        <input type='checkbox' onChange={handlePassword} className='show_password' /> <label htmlFor="" className='p_password'>mostrar</label>
        
        </div>
        <input className='login_form-input' type={`${viewPassword}`} id='password' {...register('password')} placeholder={`contraseña de prueba: ${roles=="admin" ? "root": "abc"}`} />
       
      </div>
      <button  className='login_btn'>
        Ingresar
      </button>
    </form>

    </div>
  )
}

export default Login