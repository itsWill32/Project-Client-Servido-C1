import './Card.css'

function Card({imagen, NombreTenis}) {
  return (
    <>
        <div className="card">
            <div className='card-img'>
                <img src={imagen} alt="Producto"/>
            </div>
              <span className="card-price">
                <h1>{NombreTenis}Nombre del tenis </h1>
              </span>
              <div className='boton-votar'>
                 <a href="#" className="card-button">VOTAR</a>
              </div>
        </div>

    </>
  )
}

export default Card;