import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FormProd } from './form'
import { ContentProvider } from './context'
import Listado from './list'

const Index = () => {
    const [modalTitle, setModalTitle] = useState('Nuevo Producto');
    const [mostrar, setMostrar] = useState(false);
    const [tipo, setTipo] = useState(0)

    const handleShow = () => {
        setMostrar(true);
    }

    return (
        <ContentProvider>
            <Button
                variant='primary'
                style={{ background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white' }}
                onClick={() => {
                    handleShow();
                    setTipo(0);
                }}

            >
                Nuevo Producto
            </Button>

            <FormProd mostrar={mostrar} setMostrar={setMostrar} tipo={0} />

            <Listado />
        </ContentProvider>
    )
}
export default Index