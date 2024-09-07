import React, { useState, useEffect } from 'react';
import './Gaseosa.css'
import Coca from '../../../ImagenesMenu/Coca.jpg'

export default function Gaseosa({enviarGaseosa}) {
    const [gaseosas, setGaseosas] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const GASEOSAS_URL = 'http://3.22.100.138:4000/api/Menu/nombre/Gaseosas';
    
        fetch(GASEOSAS_URL)
          .then((response) => response.json())
          .then((data) => {
            if (isMounted) {
              const gaseosasData = data.map((item) => ({
                nombre: item.nombre,
                precio: item.precio || 0,
              }));
    
              setGaseosas(gaseosasData);
            }
          })
          .catch((error) => {
            if (isMounted) {
              console.error('Error al cargar datos de gaseosas:', error);
            }
          });
    
        return () => {
          isMounted = false;
        };
      }, []);
    
      const handleButtonClicked = (gaseosa) => {
        console.log('Gaseosa seleccionada:', gaseosa);
        enviarGaseosa(gaseosa);
      };
  return (
    <div className="card">
        <div id="gaseosas" className='card-body'>
            <div className='div-titulo'>
                <h3>Gaseosas</h3>
            </div>
            <div className="gaseosas">
                {gaseosas.map((gaseosa, index) => (
                <div key={index} className="gaseosa-item">
                    <img
                        src={Coca}
                        alt={gaseosa.nombre}
                        style={{ width: '250px', height: '200px' }}
                        onError={() => {
                            console.error(`No se pudo cargar la imagen para ${gaseosa.nombre}`);
                        }}
                    />
                    <h4>{gaseosa.nombre}</h4>
                    <button
                    className="boton-gaseosa"
                    onClick={() => handleButtonClicked(gaseosa)}
                    >
                    {`AGREGAR POR Q${gaseosa.precio}`}
                    </button>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}
