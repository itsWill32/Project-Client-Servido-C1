import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import VersusCard from "../../components/ui/versusCard/VersusCard";
import Comentarios from '../../components/ui/comments/Comments';

function Home() {
  const [elections, setElections] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [wsGlobal, setWsGlobal] = useState(null);

  const token = String(localStorage.getItem('token'));

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3004?token=${token}`);

    // Manejar la conexión abierta
    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };

    // Manejar mensajes recibidos
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Mensaje recibido del servidor:', message);
  
      if (message.type === 'election:vote_success') {
        // Actualizar las votaciones en el estado
        const updatedElection = message.election;
        setElections((prevElections) => 
          prevElections.map(election =>
            election._id === updatedElection._id ? updatedElection : election
          )
        );
      }
    };

    // Manejar la conexión cerrada
    ws.onclose = () => {
      console.log('Conexión cerrada');
    };

    // Manejar errores
    ws.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };

    // Guardar el WebSocket en el estado
    setWsGlobal(ws);

    return () => {
      // Cerrar la conexión cuando el componente se desmonte
      ws.close();
    };
  }, [token]);

  const handleVote = async (optionId, option) => {
    try {
      if (wsGlobal) {
        const voteMessage = {
          type: 'election:vote',
          payload: {
            electionId: optionId,
            option: option
          }
        };
        wsGlobal.send(JSON.stringify(voteMessage));
      } else {
        console.error("WebSocket no está conectado");
      }
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };

  const handleGetVersus = async () => {
    try {
      const response = await axios.get("http://localhost:3004/elections");
      setElections(response.data.elections);
      console.log(response.data.elections);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLongPolling = async () => {
    try {
      const token = String(localStorage.getItem('token'));
      const response = await axios.get("http://localhost:3004/elections/new/permissions/users", {
        headers: {
          Authorization: `${token}`
        }
      });

      const newElection = response.data.election;
      setElections((prevElections) => {
        if (!prevElections.find(election => election.id === newElection.id)) {
          return [...prevElections, newElection];
        } else {
          return prevElections;
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      handleLongPolling(); // Llama a la función de polling nuevamente para seguir esperando nuevas elecciones
    }
  };

  const getNotifications = async () => {
    try {
      const token = String(localStorage.getItem('token'));
      const response = await axios.get('http://localhost:3004/notifications/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        }
      });

      const data = response.data;
      console.log(data);
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error al obtener las notificaciones", error);
    }
  };

  const handleNotificationsShortPolling = async () => {
    try {
      const token = String(localStorage.getItem('token'));

      await axios.post('http://localhost:3004/elections/expired');

      const response = await axios.get('http://localhost:3004/notifications/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        }
      });

      const data = response.data;
      console.log(data);
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error al obtener las notificaciones", error);
    }
  };

  // Long polling
  useEffect(() => {
    handleGetVersus();
    handleLongPolling();
  }, []);

  // Short polling
  useEffect(() => {
    getNotifications();

    const intervalId = setInterval(() => {
      handleNotificationsShortPolling();
    }, 3000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="contenedor-principal">
      <section className="header">
        <p>SISTEMA DE VOTACION</p>
      </section>
      <section className="inicio-votacion">
        <div className="botones-inicio">
          <div className="notification">
            {notifications.map((notification, index) => (
              <p key={index}>{notification.message}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="votacion">
        <div className="contenedor-votacion">
          {elections.map(election => (
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
      <section className="comentarios">
        <div className="contenedor-comentarios">
          <div className="Agregar-comentario">
            <label className="comment-label">
              Agregar comentario
            </label>
            <textarea
              id="comment"
              className="comment-input"
              rows="4"
              placeholder="Escribe tu comentario aquí..."
            ></textarea>
            <button className="comment-button">Agregar comentario</button>
          </div>
          <Comentarios NombreUsuario={''} Opinion={''} />
          <Comentarios NombreUsuario={''} Opinion={''} />
          <Comentarios NombreUsuario={''} Opinion={''} />
        </div>
      </section>
    </div>
  );
}

export default Home;
