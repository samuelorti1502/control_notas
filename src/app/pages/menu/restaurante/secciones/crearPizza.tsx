import axios from 'axios'
import {useEffect, useState} from 'react'
import SeccionesMenu from '../secciones/SeccionesMenu'
import PizzaBlack from '../../paginas/PizzaBlack.png';
import PizzaColor from '../../paginas/PizzaColor.png';

const CATTAMANIOSCATALOGO = 'tamaniosCatalogo'
const CATTIPOMASACATALOGO = 'masasCatalogo'
const CATTIPOQUESOCATALOGO = 'quesosCatalogo'
const CATTIPOVEGETALESCATALOGO = 'vegetalesCatalogo'
const CATTIPOCARNECATALOGO = 'carnesCatalogo'
const CATTIPOSSALSACATALOGO = 'salsasCatalogo'

const CATALOGO_URL = 'http://3.22.100.138:4000/api/Menu/nombre/';

const CrearPizza = ()=> {
  const [tamaniosCatalogo, setTamaniosCatalogo] = useState([]);
  const [masasCatalogo, setMasasCatalogo] = useState([]);
  const [quesosCatalogo, setQuesosCatalogo] = useState([]);
  const [vegetalesCatalogo, setVegetalesCatalogo] = useState([]);
  const [carnesCatalogo, setCarnesCatalogo] = useState([]);
  const [salsasCatalogo, setSalsasCatalogo] = useState([]);
  const [stepPhase, setStepPhase] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [pizza, setPizza] = useState({
    tamanio: '',
    masa: '',
    salsa: '',
    queso: '',
    vegetales: [],
    carnes: [],
    precio: 0
  });


  const CATALOGO_URL = 'http://3.22.100.138:4000/api/Menu/nombre/'

  useEffect(() => {
    consumirCatalogos('Tamanios', setTamaniosCatalogo)
    consumirCatalogos('Masas', setMasasCatalogo)
    consumirCatalogos('Salsas', setSalsasCatalogo)
    consumirCatalogos('Quesos', setQuesosCatalogo)
    consumirCatalogos('Vegetales', setVegetalesCatalogo)
    consumirCatalogos('Carnes', setCarnesCatalogo)
  }, [])
  
  const consumirCatalogos = (nombreCatalogo: string, funcionSet: any) => {
    axios
      .get(CATALOGO_URL + nombreCatalogo)
      .then((response) => {
        funcionSet(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error)
      })
  }

const changeUpStepPhase = () => {
    if (stepPhase === 2) {
      // Realiza validaciones o acciones adicionales si es necesario antes de cambiar de fase
    }
    setStepPhase(stepPhase + 1);
  };

  const changeDownStepPhase = () => {
    if (stepPhase === 1) {
      // Realiza validaciones o acciones adicionales si es necesario antes de cambiar de fase
    }
    setStepPhase(stepPhase - 1);
  };

 
  const handlePrecio = (precio: number) => {
    setPrecioTotal(precioTotal + precio);
  };


  // Otras funciones de manejo de ingredientes, como queso, salsa, vegetales, carnes, aquí

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setPizza({ ...pizza, precio: precioTotal });
    console.log('Pizza:', pizza);
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;

    setPizza((prevPizza) => ({
        ...prevPizza,
        [name]: value,
    }));
};



  return (
    <div className="modal-armar-pizza">
        <div className="bg-modal-armar-pizza"></div>
            <div className="sidebar-modal-pizza">
                <div className="description-armar">
                <p className="style_title">PIZZA POR MITADES</p>
                <div>
                    <button onClick={changeDownStepPhase}>X</button>
                </div>
                <p>
                    Debes elegir entre 1 y N ingredientes. Las opciones con * se consideran un ingrediente más.
                </p>
                </div>
                <div className="steps-pizza">
                <div className="steps-pizza-item">
                    <img src={PizzaColor} alt="Disminuir cantidad" />
                    <p className="styles_step-label__tlwah styles_step-label-active__scVs9">Tamaño y masa</p>
                </div>

                <div className="steps-pizza-item">
                    <img src={PizzaBlack} alt="Disminuir cantidad" />
                    <p className="styles_step-label__tlwah">Mitad 1</p>
                </div>

                <div className="steps-pizza-item">
                    <img src={PizzaBlack} alt="Disminuir cantidad" />
                    <p className="styles_step-label__tlwah">Mitad 2</p>
                </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Fase 1 */}
                        {/*Tamaño*/}
                        <SeccionesMenu setCatalogo={tamaniosCatalogo} handlePrecio={handlePrecio} setTitulo="Tamaño" />
                        {/*Masas*/}
                        <SeccionesMenu setCatalogo={masasCatalogo} handlePrecio={handlePrecio} setTitulo="Tipo de Masa" />
                    <div className="container-next">
                        {stepPhase === 1 || stepPhase === 2? (
                        <button type="button" onClick={changeUpStepPhase} className="button-next">
                            <span>SIGUIENTE PASO</span>
                            <span className='min-price'>Q{0 + precioTotal}</span>
                        </button>
                        ) : (
                        <button type="submit" className="button-next">
                            <span>SUBMIT</span>
                            <span className='min-price'>Q{0 + precioTotal}</span>
                        </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
  );
}






