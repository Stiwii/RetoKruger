
import Login from '../components/home/Login'
import './styles/home.css'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRolesGlobal } from '../store/slices/roles.slice';

const Home = ({login}) => {
  
  const dispatch = useDispatch()
  const roles = useSelector(state => state.roles)

  const handleAdmin = () => {
    dispatch(setRolesGlobal("admin"))
  }

  const handleEmployee = () => {
    dispatch(setRolesGlobal("empleado"))
  }
 
  return (
    <div className='home_container'>
      <h1 className='home_h1'>Bienvenidos</h1>
      <h2 className='home_h2'>Inventario de vacunacion de empleados</h2>
      <div className='home_div'>
        <div className='home_img'>
          <img className='home_img-img' src="https://img.freepik.com/vector-premium/medico-vacuna-contra-coronavirus-ilustracion-arte-dibujos-animados-jeringa-inyeccion-coronavirus_56104-628.jpg?w=2000" />
          <p className='home_img-p'>Ingresa a nuestro portal y registra tu vacunación</p>

        </div>
        <div className='home_roles'>
          <div className='home_roles-btn'>
            <div className='home_rol'>
              <button className='home_rol-btn' onClick={handleAdmin}>Admin</button>
              <p className='home_rol-p'></p>
            </div>
            <div className='home_rol'>
              <button className='home_rol-btn' onClick={handleEmployee}>Empleado</button>
              <p className='home_rol-p'></p>
            </div>
          </div>
          <div className={` home_login ${roles && 'active_login'}`} >
          
            <Login login={login} />
          </div>

        </div>
        <p className='home_p'>Recuerda no te quedes sin vacunarte</p>
      </div>
    </div>
  ) 
}

export default Home