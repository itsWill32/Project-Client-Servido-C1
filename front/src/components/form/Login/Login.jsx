import './Login.css';
import Logo from '../../../../public/klipartz.com.png'


export default function Login() {
  return (
    <>
        <div className='container-login'>
            <h1 style={{position:'absolute',marginTop:'-10vh', marginBottom:'50vh', marginLeft:'5vh',color: '#303030',fontSize: '3rem',fontStyle: 'normal',fontWeight: '500',lineHeight:'normal'}}> Iniciar Sesion</h1>
            <form>
                <div className='container-email' >
                    <label  className='label-email'>Email address</label>
                    <input 
                    name='email' type="email" className='input-email' id="email" placeholder="email@example.com" />
                </div>
                <div className='container-password'>
                    <label className='label-password'>Password</label>
                    <input 
                    name='password' type="password" className='input-password' id="password"  placeholder="Password"  />
                </div>

                <button  className='button-IniciarSesion'  type="submit" >
                    <a href="/Home">
                        Iniciar sesion
                    </a>
                </button>
                
                <br/>
                <h8 className='button-registar'>No tienes cuenta?</h8>
                <a href='/Register' style={{textDecoration: 'none'}}>Registrarse</a>
            </form>
            <img src={Logo} width={600} height={600} style={{position:'absolute', marginTop:'-220%', marginLeft:'220%'}} />
        </div>
    </>
  )
}
