import React, { useState, useEffect } from 'react';
import './VersusCard.css';
import Card from '../card/Card';
import moment from 'moment';

function VersusCard({ votationId, optionOneId, optionTwoId, expiration, optionOneVotes, optionTwoVotes, handleVote }) {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const exp = moment(expiration);
      const duration = moment.duration(exp.diff(now));
      const minutes = Math.floor(duration.asMinutes());
      const seconds = Math.floor(duration.asSeconds() % 60);
      setTimeRemaining(`${minutes} minutos ${seconds} segundos`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiration]);

  return (
    <div className='versus-card'>
      <Card
        optionId={optionOneId}
        votesCant={optionOneVotes}
        handleVote={() => handleVote(votationId, 'optionOne')} // Llama a handleVote con los argumentos correctos
      />
      <div className="versus">
        <p>Expira en: {timeRemaining}</p>
      </div>
      <Card
        optionId={optionTwoId}
        votesCant={optionTwoVotes}
        handleVote={() => handleVote(votationId, 'optionTwo')} // Llama a handleVote con los argumentos correctos
      />
    </div>
  );
}

export default VersusCard;
