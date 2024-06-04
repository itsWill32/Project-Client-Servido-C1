import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";

function Card({ option, optionId, votesCant, handleVote, votationId }) {
    const [votes, setVotes] = useState(votesCant);
    const [tenis, setTenis] = useState({
        name: "Nombre Tenis",
        img: "https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/zoom/1023252-0100V1.jpg",
    });

    const handleVoteLocal = () => {
        try {
            handleVote(votationId, option);
        } catch (error) {
            console.error("Error al votar:", error);
        }
    };

    const handleGetTenis = async (optionId) => {
        try {
            const response = await axios.get(`http://localhost:3004/tenis/${optionId}`);
            setTenis(response.data.tenis);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetTenis(optionId);
    }, []);

    

    return (
        <div className="card">
            <div className="card-img">
                <img src={tenis.img} alt="Producto" />
            </div>
            <span className="card-price">
                <h3>{tenis.name}</h3>
            </span>
            <div className="card-votes">
                <span>Votos: {votesCant}</span>
            </div>
            <div className="boton-votar">
                <button onClick={handleVoteLocal} className="card-button">
                    VOTAR
                </button>
            </div>
        </div>
    );
}

export default Card;
