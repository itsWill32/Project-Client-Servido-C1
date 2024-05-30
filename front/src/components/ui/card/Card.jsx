import React, { useState } from 'react';
import './Card.css';

function Card({ imagen, NombreTenis }) {
  const [votes, setVotes] = useState(0);

  const handleVote = () => {
    setVotes(votes + 1);
  };

  return (
    <>
      <div className="card">
        <div className='card-img'>
          <img src={imagen} alt="Producto" />
        </div>
        <span className="card-price">
          <h1>{NombreTenis} Nombre del tenis</h1>
        </span>
        <div className='card-votes'>
          <span>Votos: {votes}</span>
        </div>
        <div className='boton-votar'>
          <button onClick={handleVote} className="card-button">VOTAR</button>
        </div>
      </div>
    </>
  );
}

export default Card;
