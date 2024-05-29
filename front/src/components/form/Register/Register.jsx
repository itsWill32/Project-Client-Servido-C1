import './Register.css';

export default function Register() {
  return (
    <>
    <div className='container-register'>
                <h1 style={{color: '#303030',fontSize: '3rem',fontStyle: 'normal',fontWeight: '500',lineHeight:'normal'}}> Crear cuenta</h1>
                <form>
                    <div>
                        <label className='label-nombreR'>Nombre</label>
                        <input 

                        className='input-nombreR' type="text" id="name" name='nombre'/>
                    </div>

                    <div>
                        <label className='label-numeroR' >Numero telefonico</label>
                        <input
                       
                        className='input-numeroR' type="tel" id="phone" name='numero'/>
                    </div>

                    <div>
                        <label className='label-emailR' >Correo electronico</label>
                        <input 
                   
                        className='input-emailR' type="email" id="email" name='email'/>
                    </div>

                    <div>
                        <label className='label-passwordR' >Contraseña</label>
                        <input
                   
                        className='input-passwordR' type="password" id="password" name='password'/>
                    </div>
                    
                        <button  style={{marginTop:'150%'}} className='button-IniciarSesion' type="submit">Crear cuenta</button>
                </form>
                <img src='' width={600} height={600} style={{position:'absolute', marginTop:'-220%', marginLeft:'220%'}} />
            </div>
    </>
  )
}
