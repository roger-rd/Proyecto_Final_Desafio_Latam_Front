import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistroForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});

  const handleSetUsuario = ({ target: { value, name } }) => {
    const field = {};
    field[name] = value;
    setUsuario({ ...usuario, ...field });
  };

const validarCamposLlenos = ()=>{
  const camposRequeridos = [
    "nombre",
      "apellido",
      "rut",
      "telefono",
      "direccion",
      "numero_de_direccion",
      "correo",
      "password",
      "rol",
  ];
  return camposRequeridos.every((campo)=> usuario[campo]?.trim() !== ""); 
};




  const registrarUsuario = async () => {

    if (!(validarCamposLlenos)) {
      toast.error("Todos los campos son obligatorios", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      return;
    }


      try {
        // const urlServer = "https://proyect-backend.onrender.com/api/v1/user";
        // const endpoint = "/register"

        const urlServer = "http://localhost:3001/api/v1/user";
        const endpoint = "/register"

        await axios.post(urlServer + endpoint, usuario)
        toast.success("Usuario registrado con éxito 😀", { autoClose: 2000 });
       

      navigate("/login");
    } catch (error) {
        if(usuario.correo == usuario.correo){

        toast.error("Algo salió mal...", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        console.log(error);
    }
      }
    };

  return (
    <div className="col-10 col-sm-6 col-md-3 m-auto mt-5">
      <form>
      <h1>Registrar nuevo usuario</h1>
      <hr />
      <div className="form-group mt-1 ">
        <label>Nombres</label>
        <input
          value={usuario.nombre}
          onChange={handleSetUsuario}
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Nombre"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Apellido</label>
        <input
          value={usuario.apellido}
          onChange={handleSetUsuario}
          type="text"
          name="apellido"
          className="form-control"
          placeholder="Apellido"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Rut</label>
        <input
          value={usuario.rut}
          onChange={handleSetUsuario}
          type="text"
          name="rut"
          className="form-control"
          placeholder="Rut"
          minLength="3"
          maxLength="10"
        />
        <h5 className="fs-6 fw-lighter" >(ingrese rut sin puntos y con guión)</h5>
      </div>
      <div className="form-group mt-1 ">
        <label>Telefono</label>
        <input
          value={usuario.telefono}
          onChange={handleSetUsuario}
          type="tel"
          name="telefono"
          className="form-control"
          placeholder="Numero de Telefono"
          minLength="3"
          maxLength="9"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Dirección</label>
        <input
          value={usuario.direccion}
          onChange={handleSetUsuario}
          type="text"
          name="direccion"
          className="form-control"
          placeholder="Dirección"
          minLength="3"
          maxLength="100"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Numero de dirección</label>
        <input
          value={usuario.numeroDedireccion}
          onChange={handleSetUsuario}
          type="number"
          name="numero_de_direccion"
          className="form-control"
          placeholder="Numero de dirección"
          min="1"
          max="9999"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Correo electrónico </label>
        <input
          value={usuario.correo}
          onChange={handleSetUsuario}
          type="email"
          name="correo"
          className="form-control"
          placeholder="Ingrese Correo"
          minLength="3"
          maxLength="50"
        />
      </div>
      <div className="form-group mt-1 ">
        <label>Password</label>
        <input
          value={usuario.password}
          onChange={handleSetUsuario}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          minLength="3"
          maxLength="100"
        />
        <h5 className="fs-6 fw-lighter">(Deben se más de 6 digitos)</h5>
      </div>
      <div className="form-group mt-1 ">
        <label>Rol</label>
        <select
          value={usuario.rol}
          onChange={handleSetUsuario}
          name="rol"
          className="form-select"
        >
          <option disabled selected>
            Seleccione un rol
          </option>
          <option value="cliente">Cliente</option>
          <option value="administrativo">Administrativo</option>

        </select>
        </div>
        </form>

      <button onClick={registrarUsuario} className="btn btn-light mt-3">
        Registrarme
      </button>
    </div>
  );
}
