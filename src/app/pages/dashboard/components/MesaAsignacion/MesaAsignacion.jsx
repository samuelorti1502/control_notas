import React, { useState, useEffect } from 'react';
import Mesa from '../../ImagenesMenu/Mesa.png';
import { Link } from 'react-router-dom';

const MesasAsignacion = () => {
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    const MESAS_URL = 'http://3.22.100.138:4000/api/mesas/listar';

    fetch(MESAS_URL)
      .then((response) => response.json())
      .then((data) => {
        const mesasData = data.map((item) => ({
          id_mesa: item.id_mesa,
          id_estatus: item.id_estatus,
        }));
        setMesas(mesasData);
      })
      .catch((error) => {
        console.error('Error al cargar datos de mesas:', error);
      });
  }, []);

  const toggleMesa = (index) => {
    const updatedMesasTemp = [...mesas];
    updatedMesasTemp[index].id_estatus = !updatedMesasTemp[index].id_estatus;
    setMesas(updatedMesasTemp);
    setBotonHabilitado(updatedMesasTemp.some((mesa) => mesa.id_estatus));
  };

  const asignarMesas = () => {
    const mesasAAsignar = mesas
      .filter((mesa) => mesa.id_estatus)
      .map((mesa) => mesa.id_mesa);

    // Verificar si hay mesas seleccionadas para asignar
    if (mesasAAsignar.length === 0) {
      alert('Por favor, seleccione al menos una mesa para asignar.');
      return;
    }

    // Realizar una solicitud POST para asignar mesas
    const ASIGNAR_MESAS_URL = 'http://3.22.100.138:4000/api/mesas';

    fetch(ASIGNAR_MESAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mesas: mesasAAsignar }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta de la asignación, si es necesario
        alert('Mesas asignadas con éxito.');
        setBotonHabilitado(false);
      })
      .catch((error) => {
        console.error('Error al asignar mesas:', error);
        alert('Error al asignar mesas. Por favor, inténtelo de nuevo.');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Asignación de Mesas</h1>
      <div className="row justify-content-center pt-4">
        {mesas.map((mesa, index) => (
          <div
            key={index}
            className={`col-6 col-md-3 p-4 text-center ${
              mesa.id_estatus ? 'bg-secondary text-white' : 'bg-light'
            } cursor-pointer`}
            onClick={() => toggleMesa(index)}
          >
            <img src={Mesa} alt={`Mesa ${index + 1}`} className="w-100" />
            <p className="mt-2 font-weight-bold">Mesa {index + 1}</p>
            {mesa.id_estatus ? 'Mesa Ocupada' : 'Mesa Desocupada'}
          </div>
        ))}
      </div>
      <div className="text-center pt-4">
        <Link to="/comer-restaurante">
          <button
            className="btn btn-primary"
            onClick={asignarMesas}
            disabled={!botonHabilitado}
          >
            Asignar Mesa
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MesasAsignacion;
