import {useState, useContext, useEffect} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useAuth} from '../../modules/auth/core/Auth'
import {getUserByToken, Editar_Usuario, CorreoConfirmarCuenta} from '../../modules/auth/core/_requests'
import {PasswordMeterComponent} from '../../../_metronic/assets/ts/components'
import {ContentContext} from './context'
import axios from 'axios'
//import Modal from 'react-bootstrap/Modal';

type FormProps = {
  modalTitle: string // Prop para el título del modal
  show : any
  handleClose: any
  selectedUser: any;
}

const initialValues = {
  id: 1,
  nombres: '',
  apellidos: '',
  email: '',
  usuario: '',
  password: '',
  rol: 'Administrador',
  estatus: '',
  token: '',
  confirmado: '',
  usuario_creacion: '',
  changepassword: '',
  Usuario_Angiguo: '',
}

const registrationSchema = Yup.object().shape({
  nombres: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Nombres son requeridos'),
  apellidos: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Apellidos son requeridos'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email es requerido'),
  usuario: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Usuario es requerido'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Contraseña es requerida'),
  changepassword: Yup.string()
    .required('Confirmación de contraseña es reaquerida')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    }),
})
let Mensaje = ''

const EditarUsuario: React.FC<FormProps> = ({ modalTitle, show, handleClose, selectedUser }) => {
  //const {show} = useContext(ContentContext)


  const {ActualizarTabla} = useContext(ContentContext);

  const handleActualizarTabla = async () => {
    // Eliminar el usuario aquí
    await ActualizarTabla();
    // Luego, carga los datos actualizados después de eliminar
   

  };

    initialValues.nombres = selectedUser.nombres
    initialValues.apellidos = selectedUser.apellidos
    initialValues.email = selectedUser.email
    initialValues.usuario = selectedUser.usuario
    initialValues.Usuario_Angiguo = selectedUser.usuario


    useEffect(() => {
        // Este efecto se ejecutará cada vez que 'selectedUser.rol' cambie
        setRol(selectedUser.rol); // Actualizamos el estado 'rol' con el valor de 'selectedUser.rol'
      }, [selectedUser.rol]);


  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
 
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const {allRoles} = useContext(ContentContext)
  const [rol, setRol] = useState('')

  const storedData = localStorage.getItem('kt-auth-react-v')

  if (storedData !== null) {
    const userData = JSON.parse(storedData)
    const username = userData.usuario
    initialValues.usuario_creacion = username
    console.log(username)
    // Ahora puedes usar "username" con seguridad
  } else {
    console.log('Valor usuario no se encontro en local storage')
    // El valor no se encontró en el Local Storage
    // Puedes manejar este caso como desees
  }
  useEffect(() => {
    initialValues.rol = rol
    console.log('Valor seleccionado en el ComboBox (rol):', initialValues.rol)
    console.log('Usuario Creación:', initialValues.usuario_creacion)
    console.log('Usuario antiguo:', initialValues.Usuario_Angiguo)

  }, [rol])

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {
      setLoading(true)
      try {
        console.log('Usuario Nuevo:',  values.usuario)
        const {data: auth} = await Editar_Usuario(
          values.nombres,
          values.apellidos,
          values.email,
          values.usuario,
          values.password,
          initialValues.rol,
          initialValues.usuario_creacion,
          initialValues.Usuario_Angiguo,
        )
        handleActualizarTabla();
        //const {data: user} = await getUserByToken(auth.api_token)
        console.log(auth.mensaje)

       
        if (
          auth.mensaje ===
          'El usuario ha sido creado con éxito, revisa tu correo para confirmar tu cuenta.'
        ) {
          Mensaje = auth.mensaje
          console.log(CorreoConfirmarCuenta(values.email))

          resetForm()
        } else {
          setHasErrors(true)
          Mensaje = auth.mensaje
        }
        setStatus(auth.mensaje)
      
        setHasErrors(false)
        setLoading(false)
        

        //setCurrentUser(user)

        setTimeout(() => {
        handleClose()},2000)
      } catch (error) {
        console.error(error)
        setHasErrors(true)
        Mensaje = 'Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.'
        setStatus('Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.')
        setSubmitting(false)
        setLoading(false)
        setHasErrors(true)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://3.22.100.138:4000/api/rol/listar') // Reemplaza 'API_URL_AQUI' con tu URL de la API
        setRoles(response.data) // Suponiendo que la respuesta de la API sea un array de roles
        //console.log(response.data)
      } catch (error) {
        console.error('Error al obtener roles de la API', error)
      }
    }
    fetchRoles()
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title> {/* Utiliza el título pasado como prop */}
        </Modal.Header>
        <Modal.Body>
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{Mensaje}</div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info text-center'>{Mensaje} </div>
            </div>
          )}

          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Nombre</label>
                <input
                  placeholder='Nombre'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('nombres')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.nombres && formik.errors.nombres,
                    },
                    {
                      'is-valid': formik.touched.nombres && !formik.errors.nombres,
                    }
                  )}
                />
                {formik.touched.nombres && formik.errors.nombres && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.nombres}</span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Apellidos</label>
                <input
                  placeholder='Apellidos'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('apellidos')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.apellidos && formik.errors.apellidos,
                    },
                    {
                      'is-valid': formik.touched.apellidos && !formik.errors.apellidos,
                    }
                  )}
                />
                {formik.touched.apellidos && formik.errors.apellidos && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.apellidos}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* begin::Form group Email */}
          <div className='fv-row mb-8'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Correo electrónico</label>
                <input
                  placeholder='Correo electrónico'
                  type='email'
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.email && formik.errors.email,
                    },
                    {
                      'is-valid': formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{flex: 1, marginLeft: '15px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Usuario</label>
                <input
                  placeholder='Usuario'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('usuario')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.usuario && formik.errors.usuario,
                    },
                    {
                      'is-valid': formik.touched.usuario && !formik.errors.usuario,
                    }
                  )}
                />
                {formik.touched.usuario && formik.errors.usuario && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.usuario}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* begin::Form group Password */}
          <div className='fv-row mb-8' data-kt-password-meter='true'>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <label className='form-label fw-bolder text-dark fs-6'>Contraseña</label>
                <div className='position-relative mb-3'>
                  <input
                    type='password'
                    placeholder='Contraseña'
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className={clsx(
                      'form-control bg-transparent',
                      {
                        'is-invalid': formik.touched.password && formik.errors.password,
                      },
                      {
                        'is-valid': formik.touched.password && !formik.errors.password,
                      }
                    )}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.password}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* begin::Meter */}
                <div
                  className='d-flex align-items-center mb-3'
                  data-kt-password-meter-control='highlight'
                >
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                  <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
                </div>
                {/* end::Meter */}
              </div>
              <div style={{flex: 1, marginLeft: '10px'}}>
                <label className='form-label fw-bolder text-dark fs-6'>Confirmar contraseña</label>
                <input
                  type='password'
                  placeholder='Confirmación de contraseña'
                  autoComplete='off'
                  {...formik.getFieldProps('changepassword')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
                    },
                    {
                      'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
                    }
                  )}
                />
                <div className='text-muted'>{'-----------------------------------'}</div>
                {formik.touched.changepassword && formik.errors.changepassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.changepassword}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* begin::Form group Rol */}
          <div className='fv-row mb-8'>
            <Form.Group controlId='exampleForm.SelectCustom'>
              <Form.Label>Rol</Form.Label>
              <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                {roles.map((role: {id: number; rol: string}) => (
                  <option key={role.id} value={role.rol}>
                    {role.rol}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button
            variant='primary'
            onClick={handleClose}
            style={{background: 'linear-gradient(to right, #260101, #FF5733)', color: 'white'}}
          >
            Cerrar
          </Button>
          <Button
            variant='secondary'
            onClick={formik.submitForm}
            style={{background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white'}}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Editar Usuario</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
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

export default EditarUsuario
