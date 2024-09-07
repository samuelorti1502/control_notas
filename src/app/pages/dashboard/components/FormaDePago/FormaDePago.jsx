import React, { useState, useEffect } from 'react';
import tarjeta from '../../ImagenesMenu/tarjeta.png';
import efectivo from '../../ImagenesMenu/efectivo.png';
import './FormaDePago.css';

const FormaDePago = () => {
  const [nit, setNit] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (nit !== '') {
      // Realiza la solicitud a la API cuando se ingresa el NIT
      fetch(`http://3.22.100.138:4000/api/personas/nit/12345`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('No se pudo obtener el nombre del cliente');
          }
          return response.json();
        })
        .then((data) => {
          setNombreCliente(data.nombres); // Asigna el nombre obtenido desde la API
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setNombreCliente(''); // Borra el nombre si se borra el NIT
      setError(null); // Borra cualquier mensaje de error
    }
  }, [nit]);

  const [selectedOption, setSelectedOption] = useState('efectivo');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePagar = () => {
    // Aquí puedes agregar la lógica para procesar el pago
    // Dependiendo de la opción seleccionada y el código del cupón
    alert('¡Pago realizado con éxito!');
  };

  return (
    <div className="container">
      <div className='contenedor-datos'>
          <button type="submit" className='pagar' onClick={handlePagar}>
            <span>CONFIRMAR PEDIDO</span>
          </button>
      </div>
      <div className='contenedor-derecho'>
        <div className='contenedor-pago'>
        <h1 className='datos-cliente'>DATOS DEL CLIENTE</h1>
        <form action="formulario-cliente">
          <div className={`input-container ${isFocused ? 'focused' : ''}`}>
            <label className="custom-label" htmlFor="nit">NIT:</label>
            <input
              placeholder='NIT'
              type="text"
              id="nit"
              name="nit"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
            />
          </div>
          <div className={`input-container ${isFocused ? 'focused' : ''}`}>
            <input
              placeholder='CLIENTE'
              type="text"
              id="nombre"
              name="nombre"
              value={nombreCliente}
              disabled // Para evitar la edición manual
            />
          </div>
      </form>
      {error && <p>{error}</p>}
        </div>
        <div className='pago-resumen'>
        <h1 className='titulo'>MÉTODOS DE PAGO</h1>
          <div className='forma-pago'>
            <button className='pago-efectivo'>
              <div>
                <img className='img-efectivo' src={efectivo} alt="efectivo" />
                <br />
                <span className='Efectivo'>Efectivo</span>
              </div>
            </button>
            <button className='pago-tarjeta'>
              <div>
                <img className='img-tarjeta' src={tarjeta} alt="tarjeta" />
                <br />
                <span className='tarjeta'>Tarjeta</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormaDePago;
