import { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import clsx from 'clsx'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ingresarCategoria } from '../../modules/auth/core/_requests'
import { useAuth } from '../../modules/auth/core/Auth'
import { ContentContext, modificarCategoria } from './context'

const RouteBase = process.env.REACT_APP_API_URL

const initialValues = {
  id_categoria: 1,
  nombre: '',
  imagen: '',
  usuario_creacion: '',
  estatus: 1,
}

const validationSchema = Yup.object().shape({
  //nombre: Yup.string().required('Categoria es requerido'),
})

const FormProd = ({ mostrar, setMostrar, tipo, id_cat, nombre, estatusCat }: any) => {

  initialValues.nombre = nombre;

  const [status, setStatus] = useState([])
  const [estatus, setEstatus] = useState('')
  const { catUpdate } = useContext(ContentContext)
  const [id_cate, setIdCate] = useState([])

  const consumirAPI = async (url: any) => {
    try {
      const response = await axios.get(`${RouteBase}/${url}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener datos de la API', error)
      return null
    }
  }

  const fetchRoles = async () => {
    const url = 'estatus/listar' // Reemplaza con la URL de tu API
    const data = await consumirAPI(url)
    if (data) {
      setStatus(data)
    }
  }

  const [nombreCat, setNombreCat] = useState('');

  const handleNombreChange = (event: any) => {
    if (event.target.value === nombre) {
      setNombreCat(nombre);
    } else {
      setNombreCat(event.target.value);
    }
  };

  const formikUpdate = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      const { data: mod } = await modificarCategoria(id_cat, nombreCat, 'imagen', 1, currentUser?.usuario);
      console.log(`Actualizando categoria ${id_cat}`);
      // console.log(`Actualizando categoria ${values.nombre}`);
      // console.log(`Actualizando categoria ${nombreCat}`);
      try {
        console.log(`Actualizando categoria try ${id_cat}`);
        if (mod.success) {
          console.log(`Actualizando categoria if ${id_cat}`);
          setLoading(false);
          setStatus(mod.mensaje);
          setHasErrors(false);
          setTimeout(() => {
            resetForm();
            setMostrar(false);
          }, 2000);
        }
        else {
          setStatus('Error al actualizar la categoria, por favor revise los datos')
          setHasErrors(true)
          setSubmitting(false)
          setLoading(false)
        }
      } catch (error: any) {
        setStatus(error.error.mensaje)
        setSubmitting(false)
        setLoading(false)
      }
    }
  })

  useEffect(() => {
    fetchRoles()
    setIdCate(id_cat)
  }, [])

  const handleClose = () => {
    // Restablecer el formulario
    formik.resetForm()
    setHasErrors(undefined)
    setMostrar(false)
  }

  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        if (tipo === 0) {
          const { data: prod } = await ingresarCategoria(values.nombre, 'imagen', currentUser?.usuario);
          if (prod.success) {
            setLoading(false);
            setStatus(prod.mensaje);
            setHasErrors(false);
            setTimeout(() => {
              resetForm();
              setMostrar(false);
            }, 2000);
          }
          else {
            setStatus('Error al ingresar el producto, por favor revise los datos')
            setHasErrors(true)
            setSubmitting(false)
            setLoading(false)
          }
        }
        else {
          console.log("Actualizando");
          setStatus("Actualizando");
        }
        //console.log(prod)
      } catch (error: any) {
        setStatus(error.error.mensaje)
        setSubmitting(false)
        setLoading(false)
      }
    },
  })


  return (
    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {tipo === 0 ? `Nueva Categoria` : `Editar Categoria`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info text-center'>{formik.status} </div>
          </div>
        )}
        <>
          {/* Categoria - Imagen */}
          <div className='fv-row mb-8'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label className='form-label fw-bolder text-dark fs-6'>Categoria</label>
                {tipo === 0 ? (
                  <input
                    // name='producto'
                    placeholder='Ingrese la categoria'
                    type='text'
                    autoComplete='off'
                    {...formik.getFieldProps('nombre')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.nombre && formik.errors.nombre,
                      },
                      {
                        'is-valid': formik.touched.nombre && !formik.errors.nombre,
                      }
                    )}
                  />
                ) : (
                  <input
                    placeholder='Ingrese la categoria'
                    type='text'
                    autoComplete='off'
                    defaultValue={nombre}
                    onChange={handleNombreChange}
                    className={clsx('form-control bg-transparent')}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Imagen - Estatus */}
          <div className='fv-row mb-8'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {tipo === 1 && (
                <div style={{ flex: 1 }}>
                  <label className='form-label fw-bolder text-dark fs-6'>Estatus</label>
                  <div className='fv-row mb-8'>
                    <Form.Group controlId='exampleForm.SelectCustom'>
                      <Form.Select
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        className={clsx(
                          'form-control bg-transparent',
                          {
                            'is-invalid': formik.touched.estatus && formik.errors.estatus,
                          },
                          {
                            'is-valid': formik.touched.estatus && !formik.errors.estatus,
                          }
                        )}
                      >
                        {tipo === 1 ? (
                          <>
                            <option value=''>
                              {estatusCat === 1 ? "Activo" : estatusCat === 4 ? "Inactivo" : estatusCat === 3 ? "Pendiente" : "Selecciona una categoria"}
                            </option>
                            {status.map((est: { id: number; nombre_estatus: string }) => (
                              <option
                                key={est.id}
                                value={est.id}
                              // {...formik.getFieldProps('estatus')}
                              >
                                {est.nombre_estatus}
                              </option>
                            ))}
                          </>
                        ) : (
                          <>
                            <option value=''>Seleccionar categoria</option>
                            {status.map((est: { id: number; nombre_estatus: string }) => (
                              <option
                                key={est.id}
                                value={est.id}
                              // {...formik.getFieldProps('estatus')}
                              >
                                {est.nombre_estatus}
                              </option>
                            ))}
                          </>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={handleClose}
          style={{ background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white' }}
        >
          Cerrar
        </Button>
        <Button
          variant='secondary'
          onClick={() => (tipo === 0 ? formik.submitForm() : formikUpdate.submitForm())}
          style={{ background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white' }}
          disabled={formik.isSubmitting}
        >

          {!loading && (
            <span className='indicator-label'>
              {tipo === 0 ? 'Crear Categoria' : 'Actualizar '}
            </span>
          )}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Espere por favor...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { FormProd }
