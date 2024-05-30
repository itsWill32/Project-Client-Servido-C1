import "./Home.css";
import Card from '../../components/ui/card/Card';
import Comentarios from '../../components/ui/comments/Comments';

function Home() {
  return (
    <>
      <div className="contenedor-principal">
        <section className="header">
          <p>SISTEMA DE VOTACION</p>
        </section>
        <section className="inicio-votacion">
          <div className="botones-inicio">
            <button className="boton-inicioTiempo">Iniciar Votacion</button>
            <a href="">TIME: </a>
          </div>
        </section>
        <section className="votacion">
          <div className="contenedor-votacion">
            <div className="cards-arriba">
              <Card imagen={''} NombreTenis={''} />
              <Card imagen={''} NombreTenis={''}  />
              <Card imagen={''} NombreTenis={''} />
            </div>
            <div className="cards-abajo">
              <Card imagen={''} NombreTenis={''} />
              <Card imagen={''} NombreTenis={''} />
              <Card imagen={''} NombreTenis={''} />
            </div>
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
    </>
  );
}

export default Home;
