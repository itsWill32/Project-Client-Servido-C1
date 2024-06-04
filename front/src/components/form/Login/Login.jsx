import './Login.css';
import axios from 'axios';
import { useState } from 'react';
import Logo from '../../../../public/klipartz.com.png';

export default function Login() {
  const [user, setUser] = useState({
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3004/auth/login', {
        email: user.email,
        password: user.password
      });
      console.log(response.data);
      // Aquí puedes manejar la respuesta, por ejemplo, guardar el token y redirigir al usuario
      localStorage.setItem('token', response.data.token);
      window.location.href = '/Home';
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
  };

  return (
    <>
      <div className='container-login'>
        <h1 style={{ position: 'absolute', marginTop: '-10vh', marginBottom: '50vh', marginLeft: '5vh', color: '#303030', fontSize: '3rem', fontStyle: 'normal', fontWeight: '500', lineHeight: 'normal' }}> Iniciar Sesion</h1>
        <form onSubmit={handleLogin}>
          <div className='container-email'>
            <label className='label-email'>Email address</label>
            <input
              name='email'
              type="email"
              className='input-email'
              id="email"
              placeholder="email@example.com"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='container-password'>
            <label className='label-password'>Password</label>
            <input
              name='password'
              type="password"
              className='input-password'
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>

          <button className='button-IniciarSesion-login' type="submit">
            Iniciar sesión
          </button>

          <br />
          <h8 className='button-registar'>No tienes cuenta?</h8>
          <a href='/Register' style={{ textDecoration: 'none' }}>Registrarse</a>
        </form>
        <img src={Logo} width={600} height={600} style={{ position: 'absolute', marginTop: '-220%', marginLeft: '220%' }} />
      </div>
    </>
  )
}
