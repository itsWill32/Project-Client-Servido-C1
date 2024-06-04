import './Register.css';
import axios from 'axios';
import { useState } from 'react';
import Logo from '../../../public/klipartz.com.png';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3004/auth/signup', {
        username: user.name,
        email: user.email,
        password: user.password
      
      });
      console.log(response.data);
      // Redirigir al usuario a la página de login
      window.location.href = '/Login';
    } catch (error) {
      console.error('Error registrando el usuario:', error);
    }
  };

  return (
    <div className='container-register'>
      <h1 style={{color: '#303030',fontSize: '3rem',fontStyle: 'normal',fontWeight: '500',lineHeight:'normal'}}> Crear cuenta</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label className='label-nombreR'>Nombre</label>
          <input
            className='input-nombreR'
            type="text"
            id="name"
            name='nombre'
            value={user.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className='label-emailR'>Correo electrónico</label>
          <input
            className='input-emailR'
            type="email"
            id="email"
            name='email'
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className='label-passwordR'>Contraseña</label>
          <input
            className='input-passwordR'
            type="password"
            id="password"
            name='password'
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        
        <button className='button-IniciarSesion' type="submit">
          Crear cuenta
        </button>
      </form>
      <img src={Logo} width={600} height={600} style={{position:'absolute', marginTop:'-220%', marginLeft:'220%'}} />
    </div>
  );
}
