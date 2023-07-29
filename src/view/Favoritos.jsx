// import React, { useEffect, useContext } from "react";
// import { UserContext } from "../context/UserContext";

// export default function Favoritos() {
//   const { setUsuario } = useContext(UserContext);

//   useEffect(() => {
//     const usuarioLocalStorage = localStorage.getItem("usuario");
//     if (usuarioLocalStorage) {
//       // Si hay un usuario registrado en el localStorage, actualiza el contexto
//       setUsuario(JSON.parse(usuarioLocalStorage));
//     }
//   }, []);

//   return (
//     <div>
//       hola es la pagina del favoritos
//     </div>
//   );
// }
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/css/galeria.css";
import { UserContext } from "../context/UserContext";
import Heart from "../components/Heart";
import ButtonAdd from "../components/ButtonAdd"; 

export default function Galeria() {
  const { photos, setPhotos } = useContext(UserContext);

  function handleClick(id) {
    const index = photos.findIndex((ele) => ele.id === id);
    photos[index].favorito = !photos[index].favorito;
    setPhotos([...photos]);
  }

  // Filtrar las imágenes con favorito=true antes del mapeo
  const favoritePhotos = photos.filter((item) => item.favorito);

  return (
    <div className="galeria">
      <h3> Agrega tus fotos favoritas aquí 🤩🤩🤩🤩</h3>
      {favoritePhotos.map((item) => (
        <div className="row-cols-1 row-cols-md-1" key={item.id}>
          <div className="col">
            <div className="card h-100">
              <img src={item.img} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <ul className="card-text">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="card-footer">
                <h5 className="text-muted">$ {item.price}</h5>
                <h5 className="text-muted">👨🏼‍💼 {item.cantidad}</h5>
                <div className="buttonHome">
                  <Link
                    className="btn btn-warning"
                    to={`/DetalleMenu/${item.id}`}
                  >
                    Ver más 👀
                  </Link>
                  <ButtonAdd idPlato={item.id} />
                  <button
                    className="btn btn-success"
                    onClick={() => handleClick(item.id)}
                  >
                    {item.favorito ? "Quitar de favoritos ❤️" : "Agregar a favoritos 🤍"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

