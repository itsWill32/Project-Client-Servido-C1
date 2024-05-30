import './Comments.css'

function Comentarios({NombreUsuario, Opinion}) {
  return (
    <>
    <div className="opinion">
         <label className="opinion-label">{NombreUsuario}Nombre de usuario</label>
         <p id="opinion" className="opinion-input" rows="4" >{Opinion}ESTA PAGINA ES UNA PUTA MIERDA</p>
    </div> 
    </>
  )
}

export default Comentarios;