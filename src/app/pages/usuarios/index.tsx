import { Row, Col, Form } from 'react-bootstrap'
import Formulario from './form'
import EditarUsuario from './EditarUsuario'
import Lista from './list'
import { ContentProvider } from './context'
import { useState } from 'react'
const Index = () => {

  const [modalTitle] = useState('Registrar un nuevo usuario');

  return (
    <ContentProvider>
      <Formulario modalTitle={modalTitle} />  
      <Lista />   
   </ContentProvider>
  )
}
export default Index
