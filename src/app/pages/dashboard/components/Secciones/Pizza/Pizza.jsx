import { useState } from 'react'
import './Pizza.css'
import { DrawerArmar } from './drawerArmar'
import P3 from '../../../ImagenesMenu/P3.jpg'
import Mitad from '../../../ImagenesMenu/Mitad.png'
import ArmarPizza from '../../../ImagenesMenu/ArmarPizza.png'
import CrearPizza from '../../CrearPizza/CrearPizza'
import { Sidebar } from '../../../../menu/restaurante/secciones/modal'

const pizzas = [
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 },
    { nombre: 'Queso', descripcion: 'Descripción', tamanio: 'MEDIANA Q79', img: P3 }
]



export default function Pizza(props) {

    const { pizzaPorMitades, setPizzaPorMitades, addPizzaPorMitades, pizzaArmar, setPizzaArmar, addPizzaArmar } = props

    const [stateModalPizzaMitades, setStateModalPizzaMitades] = useState(false)
    const [stateModalArmaPizza, setStateModalArmaPizza] = useState(false)
    const [tipo, setTipo]= useState(0)

    const hideScrollBodyArmaPizza = () => {
        console.log('Llamando hideScrollBody')
        if (!stateModalArmaPizza) {
            window.document.body.classList.add('hidde-scroll')
        } else {
            window.document.body.classList.remove('hidde-scroll')
        }
    }

    const hideScrollBodyPizzaMitades = () => {
        console.log('Llamando hideScrollBody')
        if (!stateModalPizzaMitades) {
            window.document.body.classList.add('hidde-scroll')
        } else {
            window.document.body.classList.remove('hidde-scroll')
        }
    }

    const changeStateModalPizzaMitades = () => {
        setStateModalPizzaMitades(!stateModalPizzaMitades)
        hideScrollBodyPizzaMitades()
    }

    const changeStateModalArmaPizza = () => {
        setStateModalArmaPizza(!stateModalArmaPizza)
        hideScrollBodyArmaPizza()
    }

    const getPizza = (pizza) => {
        console.log('Entro en el padre ', pizza)
        props.enviarPizzaSeccion(pizza)
    }

    const recibirOrden = (orden) => {
        console.log('Orden en secciones recibe de drawerArmar', orden)
        props.enviarOrden(orden)
    }

    return (
<div className="card">
    <div id="pizzas" className='card-body'>
            <div className='div-titulo'>
                <h3>Pizzas</h3>
            </div>
            <div className='opciones-pizza'>
                <div className='op-pizza-item bg-yellow-200'>
                    <a
                        id='kt_help_toggle'
                        data-bs-toggle='tooltip'
                        data-bs-placement='left'
                        data-bs-dismiss='click'
                        data-bs-trigger='hover'
                        className="bt-open-modal"
                        onClick={() => setTipo(0)}
                    //onClick={changeStateModalArmaPizza}
                    >
                        <img className='pizza-icon' src={ArmarPizza} alt="Arma tu pizza" />
                        <span className='bold-text'>ARMA TU PIZZA</span>
                    </a>
                </div>
                
            <div className='op-pizza-item bg-yellow-200'>
                    <a 
                        id='kt_help_toggle'
                        data-bs-toggle='tooltip'
                        data-bs-placement='left'
                        data-bs-dismiss='click'
                        data-bs-trigger='hover'
                        className="bt-open-modal" 
                        onClick={() => setTipo(1)}
                        // onClick={changeStateModalPizzaMitades}
                    >
                    <img className='pizza-icon' src={Mitad} alt="Pizza por mitades" />
                    <span className='bold-text'>PIZZA POR MITADES</span>
                </a>
            </div>
            </div>
            <DrawerArmar 
                    tipo={tipo} 
                    pizzaArmar={pizzaArmar}
                    setPizzaArmar={setPizzaArmar}
                    pizzaPorMitades={pizzaPorMitades} 
                    setPizzaPorMitades={setPizzaPorMitades}
                    addPizzaPorMitades={addPizzaPorMitades}
                    addPizzaArmar={addPizzaArmar}/>
            

            {
                stateModalArmaPizza && (
                    <Sidebar />
                )
            }

            <div className='pizzas'>
                {
                    pizzas.map((pizza, index) => (
                        <div key={index} className='pizza-item'>
                            <img src={pizza.img} />
                            <h4>{pizza.nombre}</h4>
                            <p>{pizza.descripcion}</p>
                            <button>{pizza.tamanio}</button>
                        </div>
                    ))
                }

            </div>
        </div>
</div>
    )
}
