import './Comments.css'

function Comentarios({NombreUsuario, Opinion}) {
  return (
    <div className="opinion">
         <label className="opinion-label">{NombreUsuario}</label>
         <p id="opinion" className="opinion-input" rows="4" >{Opinion}</p>
    </div>
  )
}

export default Comentarios;