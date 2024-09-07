import React, { useState, useEffect } from 'react';
import Pizza from './Pizza/Pizza';
import './Secciones.css';
import Gaseosa from './Gaseosa/Gaseosa';
import Bebida from './Bebida/Bebida';

export default function Secciones() {
  const [pizza, setPizza] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  });

  useEffect(() => {
    calcularPrecio();
  }, [pizza]);

  const [precioTotal, setPrecioTotal] = useState(0);  

  const showPizza = (pizzaChild) => {
    setPizza(pizzaChild);
    setPrecioTotal(precioTotal + pizzaChild.precio);
  };


  return (
    <div className="main">
      <div className="container-center">
        <div className="secciones">
          <Pizza enviarPizzaSeccion={showPizza} />
  
        </div>
        <div className="tu-orden-container">
          <div className="boton-container">
            <button className="boton-continuar-pago">
              CONTINUAR AL PAGO
              <span className="precio-total">{precioTotal > 0 && `Q${precioTotal}`}</span>          
              </button>
          </div>
          <div className="titulo-orden">
            <h1 className="tu-orden">TU ORDEN</h1>
            <div className="linea-horizontal"></div>
          </div>
          <h2 className="arma-pizza">ARMA TU PIZZA</h2>
            <span className="pedido">{pizza.tamanio}{pizza.tamanio && ','}</span>
            <span className="pedido">{pizza.masa}{pizza.masa && ','}</span>
            <span className="pedido">{pizza.salsa}{pizza.salsa && ','}</span>
            <span className="pedido">{pizza.queso}{pizza.queso && ','}</span>
            <span className="pedido">{pizza.vegetales.join(', ')}</span>
            <span className="pedido">{pizza.carnes.join(', ')}</span>
            <br />
            <span className="precio">{pizza.precio > 0 && `Q${pizza.precio}`}</span>
            <br />
        </div>
      </div>
    </div>
  );
}
