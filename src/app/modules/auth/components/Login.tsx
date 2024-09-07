/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {login} from '../core/_requests'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Mínimo 3 símbolos')
    .max(50, 'Mínimo 50 símbolos')
    .required('El nombre  de usuario es requerido'),
  password: Yup.string()
    .min(3, 'Mínimo 3 símbolos')
    .max(50, 'Mínimo 50 símbolos')
    .required('La contraseña es requerida'),
})

const initialValues = {
  id: 1,
  username: '',
  password: '',
  rol: ''
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth}: any = await login(values.username, values.password)
        if(true) {
          console.log('1')
          saveAuth(auth)
          setCurrentUser(auth)
        } else {
          saveAuth(undefined)
          setStatus(auth.mensaje)
          setSubmitting(false)
          setLoading(false)
            console.log('2')
        }
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        console.log("error Login:"+error)
        setStatus(error+"")
        setSubmitting(false)
        setLoading(false)
        
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Inicio de Sesión</h1>
      </div>

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : null}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Usuario</label>
        <input
          placeholder='Usuario'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          type='email'
          name='username'
          autoComplete='off'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.username}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Contraseña</label>
        <input
          type='password'
          placeholder='password'
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
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password'
        style={{color: '#0F4156'}}
      
        >
        ¿Olvidaste tu contraseña?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn'
          style={{background: 'linear-gradient(to right, #334350 , #415565)', color: 'white'}}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Iniciar Sesión</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
             Espere por favor...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
