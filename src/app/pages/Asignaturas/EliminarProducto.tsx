import { useState, useContext, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useAuth } from '../../modules/auth/core/Auth'
import { PasswordMeterComponent } from '../../../_metronic/assets/ts/components'
import { ContentContext } from './context'
//import Modal from 'react-bootstrap/Modal';
type FormProps = {
  modalTitle: string // Prop para el título del modal
  show: any
  handleClose: any
  selectedUser: any;
}
const initialValues = {
  // id: 1,
  // nombres: '',
  // apellidos: '',
  // email: '',
  // usuario: '',
  // password: '',
  // rol: 'Administrador',
  // estatus: '',
  // token: '',
  // confirmado: '',
  // usuario_creacion: '',
  // changepassword: '',
}
let Mensaje = ''

const EliminarProducto: React.FC<FormProps> = ({ modalTitle, show, handleClose, selectedUser }) => {
  //const {show} = useContext(ContentContext)
  const { allData, inactivar } = useContext(ContentContext);

  // ... Resto del código

  const handleDelete = async (id_producto) => {
    inactivar(id_producto);
    allData();
  };

  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

  const [loading, setLoading] = useState(false)
  const { saveAuth } = useAuth()

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        console.log('Datos del producto seleccionado:', selectedUser.id_prod_menu);
        handleDelete(selectedUser.id_prod_menu)
        console.log('Datos del usuario seleccionado:', selectedUser);

        Mensaje = 'Usuario Eliminado Exitosamente'

        setStatus(Mensaje)
        setHasErrors(false)
        setLoading(false)
        //setCurrentUser(user)
      } catch (error) {
        console.error(error)
        setHasErrors(true)
        Mensaje = 'Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.'
        setStatus(Mensaje)
        setSubmitting(false)
        setLoading(false)
        setHasErrors(true)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title> {/* Utiliza el título pasado como prop */}
        </Modal.Header>
        <Modal.Body>

          <div className='text-center tmb-lg-15 alert alert-danger text-xl'>
            ¿Está seguro que desea eliminar el Producto  {selectedUser.nombre} ?
          </div>



          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='font-weight-bold'>{Mensaje}</div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info text-center'>{Mensaje} </div>
            </div>
          )}




        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            variant='primary'
            onClick={handleClose}
            style={{ background: 'linear-gradient(to right, #260101, #FF5733)', color: 'white' }}
          >
            Cerrar
          </Button>
          <Button
            variant='secondary'
            onClick={formik.submitForm}
            style={{ background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white' }}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Eliminar Usuario</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Espere por favor...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EliminarProducto
