import {useEffect, useRef, useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import clsx from 'clsx'
import CurrencyInput from 'react-currency-input-field'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import axios from 'axios'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {registrarProducto} from '../../modules/auth/core/_requests'
import {useAuth} from '../../modules/auth/core/Auth'
import {
  CurrencyInputProps,
  CurrencyInputOnChangeValues,
} from 'react-currency-input-field/src/components/CurrencyInputProps'

const RouteBase = process.env.REACT_APP_API_URL

const initialValues = {
  id: 1,
  producto: '',
  descripcion: '',
  categoria: '',
  precio: '',
  estatus: 1,
  usuario_creacion: '',
  imagen: '',
}

const validationSchema = Yup.object().shape({
  producto: Yup.string().required('Producto es requerido'),
  descripcion: Yup.string().required('Descripción es requerida'),
  //categoria: Yup.string().required('Categoría es requerida'),
  // precio: Yup.number()
  //   .typeError('Amount must be a number')
  //   .required("Please provide plan cost.")
  //   .min(0, "Too little")
  //   .max(5000, 'Very costly!')
  // estatus: Yup.string().required('Estatus es requerido'),
})

const FormNotas = ({mostrar, setMostrar, tipo, datos}: any) => {
  const [value, setValue] = useState('')

  const [archivo, setArchivo] = useState([])

  const [image, setImage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImage = (event: any) => {
    const file = event.target.files[0]
    const imagen = URL.createObjectURL(file);
    console.log(file)
    setImage(imagen)
    setArchivo(file)
    console.log(imagen)
  }


  const [status, setStatus] = useState([])
  const [categorias, setCategorias] = useState([])

  const [estatus, setEstatus] = useState('')

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

  const fetchCategories = async () => {
    const url = 'categorias/listar' // Reemplaza con la URL de tu API de categorías
    const data = await consumirAPI(url)
    if (data) {
      setCategorias(data)
    }
  }

  useEffect(() => {
    fetchRoles()
    fetchCategories()
  }, [])



 /* useEffect(() => {
    datos?.imagen &&
    setImage(`http://3.22.100.138/images/${datos?.imagen || ''}`)

  }, [mostrar])
*/

  const handleSaveChanges = (values: any) => {
    console.log('Form values:', values)
    // Aquí puedes manejar los valores del formulario y realizar cualquier llamada de API necesaria
  }

  const handleClose = () => {
    // Restablecer el formulario
    formik.resetForm()
    setHasErrors(undefined)
    setMostrar(false)
    Mensaje = '' // Cerrar la ventana modal
  }

  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  let Mensaje = ''

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {
      setLoading(true)
      //console.log("Crear producto")
      try {
        const {data: prod} = await registrarProducto(
          values.producto,
          values.descripcion,
          categoria,
          String(rawValue),
          estatus,
          'values.imagen',
          //archivo
        )
        if (prod.success) {
          setLoading(false)
          setStatus(prod.mensaje)
          setHasErrors(false)
          setTimeout(() => {
            resetForm()
            setMostrar(false)
          }, 2000)
        } else {
          setStatus('Error al ingresar el producto, por favor revise los datos')
          setHasErrors(true)
          setSubmitting(false)
          setLoading(false)
        }
        //console.log(prod)
      } catch (error: any) {
        setStatus(error.error.mensaje)
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [className, setClassName] = useState('')
  const [valor, setValor] = useState<string | number>(123.45)
  const [values, setValues] = useState<CurrencyInputOnChangeValues>()
  const [rawValue, setRawValue] = useState<string | undefined>(' ')
  const [categoria, setCategoria] = useState<string>(' ')

  const limit = 100000000
  const prefix = 'Q'

  /**
   * Handle validation
   */
  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (valor, _, values): void => {
    setValues(values)
    setRawValue(valor === undefined ? 'undefined' : valor || ' ')

    if (!valor) {
      setClassName('')
      setValue('')
      return
    }

    if (Number.isNaN(Number(valor))) {
      setErrorMessage('Please enter a valid number')
      setClassName('is-invalid')
      return
    }

    if (Number(valor) > limit) {
      setErrorMessage(`Max: ${prefix}${limit}`)
      setClassName('is-invalid')
      setValue(valor)
      return
    }

    setClassName('is-valid')
    setValue(valor)
  }

  const handleUpdate = (id: any) => {
    console.log(id)
  }





  return (

  
    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tipo === 0 ? 'Agregar Alumno' : `Editar Producto`}</Modal.Title>
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
          {/* Producto - Descripcion */}
          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Producto</label>
                {tipo === 0 ? (
                  <input
                    // name='producto'
                    placeholder='Producto'
                    type='text'
                    autoComplete='off'
                    {...formik.getFieldProps('producto')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.producto && formik.errors.producto,
                      },
                      {
                        'is-valid': formik.touched.producto && !formik.errors.producto,
                      }
                    )}
                  />
                ) : (
                  <input
                    // name='producto'
                    placeholder='Producto'
                    type='text'
                    autoComplete='off'
                    defaultValue={datos.nombre || ''}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.producto && formik.errors.producto,
                      },
                      {
                        'is-valid': formik.touched.producto && !formik.errors.producto,
                      }
                    )}
                  />
                )}
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Descripción</label>
                {tipo === 0 ? (
                  <textarea
                    placeholder='Descripción'
                    // component='textarea'
                    autoComplete='off'
                    rows={3}
                    {...formik.getFieldProps('descripcion')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.descripcion && formik.errors.descripcion,
                      },
                      {
                        'is-valid': formik.touched.descripcion && !formik.errors.descripcion,
                      }
                    )}
                  />
                ) : (
                  <textarea
                    placeholder='Descripción'
                    // component='textarea'
                    autoComplete='off'
                    rows={3}
                    defaultValue={datos.descripcion}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.descripcion && formik.errors.descripcion,
                      },
                      {
                        'is-valid': formik.touched.descripcion && !formik.errors.descripcion,
                      }
                    )}
                  />
                )}
                {/* <ErrorMessage name='descripcion' component='div' className='text-danger' /> */}
              </div>
            </div>
          </div>
          {/* Categoria - Precio */}
          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1, marginTop: '18px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Categoria</label>
                <div className='fv-row mb-8'>
                  <Form.Group controlId='exampleForm.SelectCustom'>
                    <Form.Select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      className={clsx(
                        'form-control bg-transparent',
                        {
                          'is-invalid': formik.touched.categoria && formik.errors.categoria,
                        },
                        {
                          'is-valid': formik.touched.categoria && !formik.errors.categoria,
                        }
                      )}
                    >
                      {tipo === 1 ? (
                        <>
                          <option value=''>{datos.categoria}</option>
                          {categorias.map((cat: {id_categoria: number; nombre: string}) => (
                            <option key={cat.id_categoria} value={cat.id_categoria}>
                              {cat.nombre}
                            </option>
                          ))}
                        </>
                      ) : (
                        <>
                          <option value=''>Seleccionar categoria</option>
                          {categorias.map((cat: {id_categoria: number; nombre: string}) => (
                            <option key={cat.id_categoria} value={cat.id_categoria}>
                              {cat.nombre}
                            </option>
                          ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Precio</label>
                {tipo === 0 ? (
                  <CurrencyInput
                    id='validationCustom01'
                    name='input-1'
                    //className={`form-control ${className}`}
                    value={value}
                    // {...formik.getFieldProps('precio')}
                    onValueChange={handleOnValueChange}
                    placeholder='Ingrese el precio'
                    prefix={prefix}
                    step={1}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.precio && formik.errors.precio,
                      },
                      {
                        'is-valid': formik.touched.precio && !formik.errors.precio,
                      }
                    )}
                  />
                ) : (
                  <CurrencyInput
                    id='validationCustom01'
                    name='input-1'
                    //className={`form-control ${className}`}
                    defaultValue={datos.precio}
                    // {...formik.getFieldProps('precio')}
                    onValueChange={handleOnValueChange}
                    placeholder='Ingrese el precio'
                    prefix={prefix}
                    step={1}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.precio && formik.errors.precio,
                      },
                      {
                        'is-valid': formik.touched.precio && !formik.errors.precio,
                      }
                    )}
                  />
                )}
                {/* <div className='invalid-feedback'>{errorMessage}</div> */}
              </div>
            </div>
          </div>
          {/* Imagen - Estatus */}
          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                {/* <label className='form-label fw-bolder text-dark fs-6'>Imagen</label> */}
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  {/* {image ? (
                    <img
                      alt='Logo'
                      src={toAbsoluteUrl(image)}
                      className='image-input-wrapper w-125px h-125px'
                      // onChange={handleImage}
                    />
                  ) : (
                    <img
                      alt='Logo'
                      src={toAbsoluteUrl('/media/logos/LogoPizza.png')}
                      className='image-input-wrapper w-125px h-125px'
                      // onChange={handleImage}
                    />
                  )} */}

                  {tipo === 0 ? (
                    <img
                      alt='Logo'
                      src={toAbsoluteUrl('/media/logos/LogoPizza.png')}
                      className='image-input-wrapper w-150px h-150px'
                      // onChange={handleImage}
                    />
                  ) : (
                    <img
                      alt='Logo'
                    // src={`http://3.22.100.138/images/${datos.imagen}`}

                        src = {image}
                      className='image-input-wrapper w-150px h-150px'
                      // onChange={handleImage}
                    />
                  )}

                  <label
                    className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    data-bs-dismiss='click'
                    title='Change avatar'
                  >
                    <i className='bi-duotone bi-pencil fs-6'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>

                    {/* begin::Inputs */}
                    <input
                      type='file'
                      name='avatar'
                      accept='.png, .jpg, .jpeg'
                      ref={inputRef}
                      onChange={handleImage}
                    />
                    <input type='hidden' name='avatar_remove' />
                    {/* end::Inputs */}
                  </label>
                  {/* end::Edit button */}

                  {/* begin::Remove button */}
                  <span
                    className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='remove'
                    data-bs-toggle='tooltip'
                    data-bs-dismiss='click'
                    title='Remove avatar'
                  >
                    <i className='bi-outline bi-trash fs-3'></i>
                  </span>
                  {/* end::Remove button */}
                </div>
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
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
                          <option value=''>{datos.estatus}</option>
                          {status.map((est: {id: number; nombre_estatus: string}) => (
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
                          <option value=''>Seleccionar estatus</option>
                          {status.map((est: {id: number; nombre_estatus: string}) => (
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
            </div>
          </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={handleClose}
          style={{background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white'}}
        >
          Cerrar
        </Button>
        <Button
          variant='secondary'
          onClick={tipo === 0 ? formik.submitForm : () => handleUpdate(datos.id_prod_menu)}
          style={{background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white'}}
          disabled={formik.isSubmitting}
        >
          {!loading && (
            <span className='indicator-label'>{tipo === 0 ? 'Crear Producto' : 'Actualizar '}</span>
          )}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Espere por favor...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export {FormNotas}
