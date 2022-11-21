import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsCheckSquare } from 'react-icons/bs'
import './styles/formUser.css'

const FormUser = ({ user, setActivateForm, updateUser, activateForm, getUser }) => {
  const { register, handleSubmit, reset } = useForm()
  const [check, setCheck] = useState()
  const [updateVacuna, setUpdateVacuna] = useState()
  console.log(check)
  const valuesUpdate = {
    email: user.email,
    fecha_nacimineto: user.fecha_nacimineto,
    direccion: user.direccion,
    celular: user.celular,
    vacunado: user.vacunado,
    vacuna: user.vacuna,
    numero_dosis: user.numero_dosis,
    fecha_vacuna: user.fecha_vacuna
  }

  useEffect(() => {
    if (activateForm == false) {
      reset(valuesUpdate)
    }
  }, [activateForm])
  const submit = data => {
    console.log(data)
    updateUser(data)
    getUser()
    setActivateForm(true)
  }

  return (
    <div >
      <AiFillCloseCircle className={`admin_form-x`} onClick={() => setActivateForm(true)} />
      <form className='form_create' onSubmit={handleSubmit(submit)}>
        <h2 className='form_create-title'>Editar Información</h2>

        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="email">Email: </label>
          <input className='form_create-input' type="email" id='email' {...register('email')} />
        </div>
        {/* desde aqui empieza */}
        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="date">Fecha de Nacimiento: </label>
          <input className='form_create-input' type="date" id='date' {...register('fecha_nacimiento')} />
        </div>
        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="direccion">Direccion: </label>
          <input className='form_create-input' type="text" id='direccion' {...register('direccion')} />
        </div>
        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="celular">Celular: </label>
          <input className='form_create-input' type="number" id='celular' {...register('celular')} />
        </div>
        <div className='form_create-item form_c-label'>
          <label className='form_create-label' htmlFor="vacunado">Vacunado  </label>
          <input className='form_check' type="checkbox" id='vacunado' value={check} onClick={() => setCheck(!check)} {...register('vacunado')} />

        </div>

        {

          check && <>
            <p className='form_create-label form_vacuna-label'>Tipo de vacuna:</p>
            <div className='form_create-item '>
              <ul className='form_ul'>
                <li>
                <input type="radio" id="vacuna" value="Sputnik"  {...register('vacuna')}/> 
              <label htmlFor='vacuna'>Sputnik</label> 
                </li>
                <li>
                <input type="radio" id="vacuna" value="AstraZeneca"  {...register('vacuna')}/> 
              <label htmlFor='vacuna'>AstraZeneca</label> 
                </li>
                <li>
                <input type="radio" id="vacuna" value="Pfizer"  {...register('vacuna')}/>
              <label htmlFor='vacuna'>Pfizer</label> 
                </li>
                <li>
                <input type="radio" id="vacuna" value="Jhonson&Jhonson"  {...register('vacuna')}/>
              <label htmlFor='vacuna'>Jhonson&Jhonson</label>

                </li>
              </ul>
             
              
              
             

            </div>
            <div className='form_create-item'>
              <label className='form_create-label' htmlFor="numero_dosis">Numero de dosis: </label>
              <input className='form_create-input inp' type="number" min="0" max="4" id='numero_dosis' {...register('numero_dosis')} />
            </div>
            <div className='form_create-item'>
              <label className='form_create-label' htmlFor="fecha_vacuna">Fecha de vacunación:  </label>
              <input className='form_create-input inp' type="date" id='fecha_vacuna' {...register('fecha_vacuna')} />
            </div>

          </>
        }


        <button className='form-submit' >Submit</button>
      </form>

    </div>
  )
}

export default FormUser