import { Row, Col, Form } from 'react-bootstrap'
/*import Formulario from './form'
import Listado from './list'*/
import { ContentProvider } from './context'
import { useState } from 'react'

import Fondo1 from './Fondo1.png';
import '../dashboard/ComerOLlevar.css';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Index = () => {

  const [modalTitle] = useState('Título Predeterminado');

  return (
    <ContentProvider>
      <div className="banner-container">
      <div className="background-image">
        <img
          src={Fondo1}
          alt="Pizza"
          className="banner-image"
        />
      </div>
      <div className="content">
        <h1 className="banner-title">
          Control De <span>Notas</span>
        </h1>
        <div className="button-container">
        <Link to="/comer-restaurante">
          <button className="banner-button">
            Notas <FaArrowRight />
          </button>
          </Link>
        </div>
      </div>
    </div>
    </ContentProvider>
  )
}
export default Index
