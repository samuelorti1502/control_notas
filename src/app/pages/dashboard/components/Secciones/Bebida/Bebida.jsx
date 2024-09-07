import React, { useState, useEffect } from 'react';
import './Bebida.css'
import Horchata from '../../../ImagenesMenu/Horchata.jpg'

export default function Bebida({enviarBebida}) {
    const [bebidas, setBebidas] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const BEBDIAS_URL = 'http://3.22.100.138:4000/api/Menu/nombre/Bebidas';
    
        fetch(BEBDIAS_URL)
          .then((response) => response.json())
          .then((data) => {
            if (isMounted) {
              const bebidasData = data.map((item) => ({
                nombre: item.nombre,
                precio: item.precio || 0,
              }));
    
              setBebidas(bebidasData);
            }
          })
          .catch((error) => {
            if (isMounted) {
              console.error('Error al cargar datos de bebidas:', error);
            }
          });
    
        return () => {
          isMounted = false;
        };
      }, []);
    
      const handleButtonClicked = (bebida) => {
        console.log('Bebida seleccionada:', bebida);
        enviarBebida(bebida);
      };
  return (
    <div className="card">
        <div id="bebidas" className='card-body'>
            <div className='div-titulo'>
                <h3>Bebidas</h3>
            </div>
            <div className="bebidas">
                {bebidas.map((bebida, index) => (
                <div key={index} className="bebida-item">
                    <img
                        src={Horchata}
                        alt={bebida.nombre}
                        style={{ width: '250px', height: '200px' }}
                        onError={() => {
                            console.error(`No se pudo cargar la imagen para ${bebida.nombre}`);
                        }}
                    />
                    <h4>{bebida.nombre}</h4>
                    <button
                    className="boton-bebida"
                    onClick={() => handleButtonClicked(bebida)}
                    >
                    {`AGREGAR POR Q${bebida.precio}`}
                    </button>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

//CREADO POR LAS AGUILAS 

