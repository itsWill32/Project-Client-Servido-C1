import React, { useState, useEffect } from 'react';
import './VersusCard.css';
import Card from '../card/Card';
import moment from 'moment';

function VersusCard({ optionOneId, optionTwoId, expiration, optionOneVotes, optionTwoVotes, handleVote, votationId }) {
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
        handleVote={handleVote}
        votationId={votationId}
        option={"optionOne"}
      />
      <Card
        optionId={optionTwoId}
        votesCant={optionTwoVotes}
        handleVote={handleVote}
        votationId={votationId}
        option={"optionTwo"}
      />

      <div className='versus-card-expiration'>
        <span>Expira en: {timeRemaining}</span>
      </div>
    </div>
  );
}

export default VersusCard;
