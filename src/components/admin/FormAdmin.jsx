import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillCloseCircle } from 'react-icons/ai'
import './styles/formAdmin.css'

const caracteres = '0 1 2 3 4 5 6 7 8 9 ! @ # $ % & * _ - +  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z'
const letras = 'a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9'


const FormAdmin = ({ createNewUser, setActivateForm, updateInfo, updateUserById, setUpdateInfo }) => {
  const { handleSubmit, register, reset } = useForm()

  const passwordCharacters = caracteres.split(' ')
  const letterAvailables = letras.split(' ')
  const generatePassword = () => {
    let newPassword = ''
    for (let i = 0; i < 10; i++) {
      newPassword += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)]
    }
    return newPassword
  }
  const generateUser = data => {
    let newUser = data.nombres.trim().split(' ')[0].toLowerCase()
    for (let i = 0; i < 3; i++) {
      newUser += letterAvailables[Math.floor(Math.random() * letterAvailables.length)]
    }
    return newUser
  }

  const defaultValues = {
    cedula: '',
    nombres: '',
    apellidos: '',
    email: ''
  }

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
      console.log(updateInfo)
    }
  }, [updateInfo])

  const submit = data => {
    if (data.cedula.trim().length == 10) {
      if (updateInfo) {
        updateUserById(updateInfo.id, data)
        reset(defaultValues)
        setActivateForm(true)
      } else {
        const newData = {
          cedula: data.cedula,
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          user: generateUser(data),
          password: generatePassword(),
          fecha_nacimiento: "",
          direccion: "",
          celular: "",
          vacunado: null,
          vacuna: "",
          fecha_vacuna: "",
          numero_dosis: null
        }
        createNewUser(newData)
        window.confirm(`USUARIO Y CONTRASEÑA GENERADA
  usuario: ${newData.user}
  contraseña: ${newData.password} 

  **Aquí se puede implementar un envio directo del usuario y contraseña a los correos de los empleados**
      `)
        reset(defaultValues)
        setActivateForm(true)
        updateInfo()
      }
    } else {
      window.alert('Su cédula debe tener 10 digitos')
    }
  }



  const handleBtnExit = () => {
    setActivateForm(true)
    setUpdateInfo()
    reset(defaultValues)
  }

  return (
    <div>
      <AiFillCloseCircle className='admin_form-x' onClick={handleBtnExit} />
      <form className='form_create' onSubmit={handleSubmit(submit)}>
        <h2 className='form_create-title'>{updateInfo ? 'Editar Usuario' : 'Crear Usuario'}</h2>

        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="cedula">Cédula: </label>
          <input className='form_create-input' type="number" id='cedula' {...register('cedula')} />
        </div>
        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="nombres">Nombres: </label>
          <input className='form_create-input' type="text" pattern="[A-Za-z ]{1,20}" id='nombres' {...register('nombres')} />
        </div>
        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="apellidos">Apellidos: </label>
          <input className='form_create-input' type="text" pattern="[A-Za-z ]{1,20}" id='apellidos' {...register('apellidos')} />
        </div>
        <div className='form_create-item'>
          <label className='form_create-label' htmlFor="email">Email: </label>
          <input className='form_create-input' type="email" id='email' {...register('email')} />
        </div>
        {
          updateInfo &&
          <>
          <div className='form_create-item'>
            <label className='form_create-label' htmlFor="usuario">Usuario: </label>
            <input className='form_create-input' type="text" id='usuario' {...register('user')} />
          </div>
          <div className='form_create-item'>
            <label className='form_create-label' htmlFor="password">Password: </label>
            <input className='form_create-input' type="text" id='passsword' {...register('password')} />
          </div>
          </>
        }
        <button className='form-submit'>Submit</button>
      </form>

    </div>
  )
}

export default FormAdmin