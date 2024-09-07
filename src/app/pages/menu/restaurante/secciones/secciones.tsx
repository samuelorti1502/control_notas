import React, {useState, useEffect} from 'react'
import Pizza from '../../../dashboard/components/Secciones/Pizza/Pizza'
import './Secciones.css'
import Gaseosa from '../../../dashboard/components/Secciones/Gaseosa/Gaseosa'
import Bebida from '../../../dashboard/components/Secciones/Bebida/Bebida'
import {Link} from 'react-router-dom'

export default function Secciones() {
  const [informacionSeleccionada, setInformacionSeleccionada] = useState(null);
  const [precioTotal, setPrecioTotal] = useState(0);
  //const [pizzaArmar, setPizzaArmar] = useState([])
  //const [pizzaPorMitades, setPizzaPorMitades] = useState([])
  const [gaseosasSeleccionadas, setGaseosasSeleccionadas] = useState([]);
  const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState([]);
  const [pizzaArmar, setPizzaArmar] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  })

  const [ pizzaPorMitades, setPizzaPorMitades ] = useState({
   tamanio: '',
   masa: '',
   mitad1: {
     salsa: '',
     queso: '',
     vegetales: [],
     carnes: []
    },
    mitad2: {
     salsa: '',
     queso: '',
     vegetales: [],
     carnes: []
    },
    precio: 0
  })


  const [ orden, setOrden ] = useState({
    listPizzaPorMitades: [],
    listArmaPizza: [],
    total: 0,
    mesa: 0
  })

  
  useEffect(() => {
    calcularPrecioTotal();
    console.log('Actualizando -----')
    console.log(orden)
  }, [pizzaArmar, gaseosasSeleccionadas, bebidasSeleccionadas, pizzaPorMitades]);
  
  const cancelarOrden = () => {
    setOrden({
      listPizzaPorMitades: [],
      listArmaPizza: [],
      total: 0,
      mesa: 0,
    });
    setPrecioTotal(0);
  
    // También debes reiniciar las listas de gaseosas y bebidas seleccionadas
    setGaseosasSeleccionadas([]);
    setBebidasSeleccionadas([]);
  };

  const calcularPrecioTotal = () => {
    console.log('Precio total')
    let total = 0;

    for (const pizza of orden.listPizzaPorMitades) {
      total += pizza.precio;
    }

    for (const pizzaArmar of orden.listArmaPizza) {
      total += pizzaArmar.precio;
    }
  
    // Sumar el precio de las gaseosas seleccionadas
    for (const gaseosa of gaseosasSeleccionadas) {
      total += gaseosa.precio;
    }
  
    // Sumar el precio de las bebidas seleccionadas
    for (const bebida of bebidasSeleccionadas) {
      total += bebida.precio;
    }
  
    setPrecioTotal(total); 
  };

  const handleAddPizzaArmar= () => {
  
    setOrden({...orden, listArmaPizza: [...orden.listArmaPizza, {...pizzaArmar}]})
    setPizzaArmar({...getEmptyValuesPizzaArmar()})
    console.log(orden)
  
  }

  const cancelarPedido = (tipo, index) => {
    const newOrden = { ...orden };
  
    if (tipo === 'arma') {
      const newArmaPizza = [...newOrden.listArmaPizza];
      newArmaPizza.splice(index, 1);
      newOrden.listArmaPizza = newArmaPizza;
    } else if (tipo === 'mitad') {
      const newPizzaPorMitades = [...newOrden.listPizzaPorMitades];
      newPizzaPorMitades.splice(index, 1);
      newOrden.listPizzaPorMitades = newPizzaPorMitades;
    }
  
    setOrden(newOrden);
  };

  const handleAddPizzaPorMitades= () => {
  
    setOrden({...orden, listPizzaPorMitades: [...orden.listPizzaPorMitades, {...pizzaPorMitades}]})
    setPizzaPorMitades({ ...getEmptyValuesPizzaPorMitades() })
    console.log('Orden ', orden)
  
  }

  const showGaseosa = (gaseosaChild) => {
    setGaseosasSeleccionadas([...gaseosasSeleccionadas, gaseosaChild]);
    setPrecioTotal((prevPrecioTotal) => prevPrecioTotal + gaseosaChild.precio);
  };
  
  const showBebida = (bebidaChild) => {
    setBebidasSeleccionadas([...bebidasSeleccionadas, bebidaChild]);
    setPrecioTotal((prevPrecioTotal) => prevPrecioTotal + bebidaChild.precio);
  };

  const cancelarGaseosa = (index) => {
    const newGaseosasSeleccionadas = [...gaseosasSeleccionadas];
    const gaseosaEliminada = newGaseosasSeleccionadas.splice(index, 1)[0]; // Extrae la gaseosa eliminada
    setGaseosasSeleccionadas(newGaseosasSeleccionadas);
    setPrecioTotal((prevPrecioTotal) => prevPrecioTotal - gaseosaEliminada.precio);
  };
  
  const cancelarBebida = (index) => {
    const newBebidasSeleccionadas = [...bebidasSeleccionadas];
    const bebidaEliminada = newBebidasSeleccionadas.splice(index, 1)[0]; // Extrae la bebida eliminada
    setBebidasSeleccionadas(newBebidasSeleccionadas);
    setPrecioTotal((prevPrecioTotal) => prevPrecioTotal - bebidaEliminada.precio);
  };
 
  return (
    <div className='main'>
      <div className='container-center'>
        <div className='secciones'>
          <Pizza 
                  pizzaArmar={pizzaArmar}
                  setPizzaArmar={setPizzaArmar}
                  pizzaPorMitades={pizzaPorMitades} 
                  setPizzaPorMitades={setPizzaPorMitades}
                  addPizzaPorMitades={handleAddPizzaPorMitades}
                  //addPizzaPorMitadesToOrden={handleAddPizzaPorMitadesToOrden}
                  addPizzaArmar={handleAddPizzaArmar}/>
                  
                  
          <br />
          <Gaseosa enviarGaseosa={showGaseosa}/>
          <br />
          <Bebida enviarBebida={showBebida}/>
          <br />
        </div>
        <div className="tu-orden-container">
          <div className="boton-container">
          <Link to="/forma-pago">
            <button type="submit" className="boton-continuar-pago" onClick={calcularPrecioTotal}>
              CONTINUAR AL PAGO
              <span className="precio-total">{precioTotal > 0 && `Q${precioTotal}`}</span>
            </button>
          </Link>
          </div>
          <div className="titulo-orden">
            <h1 className="tu-orden">TU ORDEN</h1>
          </div>
          <div className="cuerpo-orden">
            <br />
            <div>
              {orden.listArmaPizza.map((pizza, index) => (
                <div key={index}>
                <h3>ARMA PIZZA</h3>
                <button type="button" onClick={() => cancelarPedido('arma',index)}>
                    -
                </button>
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
              ))}
              
                
            </div>
            <div>
            <div className="linea-horizontal"></div>
            <br />
              {gaseosasSeleccionadas.map((gaseosa, index) => (
                  <h3 className="gaseosa">
                  <button type="button" onClick={() => cancelarGaseosa(index)}>
                    -
                  </button> 
                    {`${gaseosa.nombre} Q${gaseosa.precio}`}
                  </h3>
                  
              ))}
              
            </div>
            
            <div>
            <div className="linea-horizontal"></div>
            <br />
              {bebidasSeleccionadas.map((bebida, index) => (
                  <h3 className="bebida">
                  <button type="button" onClick={() => cancelarBebida(index)}>
                    -
                  </button> 
                    {`${bebida.nombre} Q${bebida.precio}`}
                  </h3>
              ))}
          </div>
          
            <div>
              {/* orden.listPizzaPorMitades.map((pizza, index) => (
                <div key={index}>
                  <h3>PIZZA POR MITADES</h3>
                <span className="pedido">{pizza.tamanio}{pizza.tamanio && ','}</span>
                <span className="pedido">{pizza.masa}</span>
                <div>
                  <h4>Mitad 1:</h4>
                  <span className="pedido">{pizza.mitad1.salsa}{pizza.mitad1.salsa && ','}</span>
                  <span className="pedido">{pizza.mitad1.queso}{pizza.mitad1.queso && ','}</span>
                  <span className="pedido">{pizza.mitad1.vegetales.join(', ')}</span>
                  <span className="pedido">{pizza.mitad1.carnes.join(', ')}</span>
                </div>
                <div>
                  <h4>Mitad 2:</h4>
                  <span className="pedido">{pizza.mitad2.salsa}{pizza.mitad2.salsa && ','}</span>
                  <span className="pedido">{pizza.mitad2.queso}{pizza.mitad2.queso && ','}</span>
                  <span className="pedido">{pizza.mitad2.vegetales.join(', ')}</span>
                  <span className="pedido">{pizza.mitad2.carnes.join(', ')}</span>
                </div>
                <br />
                <span className="precio">{pizza.precio > 0 && `Q${pizza.precio}`}</span>
                <br />
                </div>
              ))*/}
              
              <div className="linea-horizontal"></div>
              <br />
              {orden.listPizzaPorMitades.map((pizzaMitad, index) => (
                <div key={index}>
                  <h3>PIZZA POR MITADES</h3>
                  <button type="button" onClick={() => cancelarPedido('mitad',index)}>
                    -
                  </button>
                  <span>{pizzaMitad.tamanio}, {pizzaMitad.masa}</span>
                  <br />
                  <span><b>Mitad 1: </b>{pizzaMitad.mitad1.queso}, {pizzaMitad.mitad1.salsa}, {pizzaMitad.mitad1.carnes.join(', ')}, {pizzaMitad.mitad1.vegetales.join(', ')}</span>
                  <br />
                  <span><b>Mitad 2: </b>{pizzaMitad.mitad2.queso}, {pizzaMitad.mitad2.salsa}, {pizzaMitad.mitad2.carnes.join(', ')}, {pizzaMitad.mitad2.vegetales.join(', ')}</span>
                  {/* pizzaMitad.map((item, index) => ( <span key={index} className="pedido">{item.nombre}, </span> ) )  */}
                  <p className="precio mt-5">{`Q${pizzaMitad.precio}`}</p>
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="boton-cancelar-orden" onClick={cancelarOrden}>
              CANCELAR ORDEN
          </button>
        </div>
      </div>
    </div>
  )
}

function getEmptyValuesPizzaPorMitades() {
  return {
      tamanio: '',
      masa: '',
      mitad1: {
        salsa: '',
        queso: '',
        vegetales: [],
        carnes: []
      },
      mitad2: {
        salsa: '',
        queso: '',
        vegetales: [],
        carnes: []
      },
      precio: 0
    }
}

function getEmptyValuesPizzaArmar() {
  return {
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0,
  }
}