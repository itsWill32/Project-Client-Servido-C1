import React from "react";
import VersusCard from "../versusCard/VersusCard";
import "./ElectionsContainer.css";

function ElectionsContainer({ elections, handleVote }) {
    return (
        <section className="votacion">
            <div className="contenedor-votacion">
                {elections.map((election) => (
                    <VersusCard
                        key={election._id}
                        votationId={election._id}
                        optionOneId={election.optionOneId}
                        optionTwoId={election.optionTwoId}
                        expiration={election.expiration}
                        optionOneVotes={election.optionOneVotes}
                        optionTwoVotes={election.optionTwoVotes}
                        handleVote={handleVote}
                    />
                ))}
            </div>
        </section>
    );
}

export default ElectionsContainer;
