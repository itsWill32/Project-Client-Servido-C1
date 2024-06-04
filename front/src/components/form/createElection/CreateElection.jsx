import './CreateElection.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function CreateElection() {
    const token = String(localStorage.getItem('token'));

    const [election, setElection] = useState({
        optionOneId: '',
        optionTwoId: '',
        expirationMinutes: '1',
    });

    const handleGetTenis = async () => {
        try {
            const response = await axios.get('http://localhost:3004/tenis');
            console.log("tenis",response.data);
            return response.data.tenis;
        } catch (error) {
            console.error("Error fetching tennis data: ", error);
            return [];
        }
    };

    const [tenis, setTenis] = useState([ ]);

    useEffect(() => {
        async function fetchData() {
            const tenisData = await handleGetTenis();
            setTenis(tenisData);
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setElection((prevElection) => ({
            ...prevElection,
            [id]: value
        }));
    };

    const handleAddElection = async (event) => {
        event.preventDefault();
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + parseInt(election.expirationMinutes));
        
        console.log(election);
        const response = await axios.post('http://localhost:3004/elections', {
            optionOneId: election.optionOneId,
            optionTwoId: election.optionTwoId,
            expiration: expiration,
            optionOneVotes: 0,
            optionTwoVotes: 0
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        console.log(response.data);

        if(response.data.success) {
            alert('Elección agregada correctamente');
        }
    };

    return (
        <form className="election-form" onSubmit={handleAddElection}>
            <div className="form-group">
                <label htmlFor="optionOneId">Opción Uno:</label>
                <select id="optionOneId" value={election.optionOneId} onChange={handleInputChange}>
                    <option value="">Seleccione un tenis</option>
                    {tenis.map((tenisItem) => (
                        <option key={tenisItem._id} value={tenisItem._id}>
                            {tenisItem.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="optionTwoId">Opción Dos:</label>
                <select id="optionTwoId" value={election.optionTwoId} onChange={handleInputChange}>
                    <option value="">Seleccione un tenis</option>
                    {tenis.map((tenisItem) => (
                        <option key={tenisItem._id} value={tenisItem._id}>
                            {tenisItem.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="expirationMinutes">Tiempo de Expiración (minutos restantes):</label>
                <input
                    type="number"
                    id="expirationMinutes"
                    value={election.expirationMinutes}
                    onChange={handleInputChange}
                    min="1"
                    max="60"
                />
            </div>
            <button type="submit">Agregar Elección</button>
        </form>
    );
}
