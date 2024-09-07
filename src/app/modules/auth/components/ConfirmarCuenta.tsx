/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Confirmar_Cuenta} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import { useParams } from 'react-router-dom';


const initialValues = {
  password: '',
  changepassword: '',
  acceptTerms: false,
 token: 'useParams',  
}

console.log(initialValues.token)

export function ConfirmarCuenta() { 
    const { token } = useParams();
  // Verifica si `_token` tiene un valor válido
  let Mensaje = ''
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
        setLoading(true)
        try {

            if (token) {
                console.log('Token recibido:', token);
          const {data: auth}: any = await Confirmar_Cuenta(token)
          Mensaje = auth

          console.log('mensaje: ' +Mensaje)
          if(Mensaje === 'Cuenta confirmada con éxito!!') {
            setStatus(auth)
            setHasErrors(false)
            setLoading(false)
            
          } else {
            console.log(auth)
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('No se envió ')
            saveAuth(undefined)
          }

          // Resto de tu lógica
        } else {
          console.error('No se encontró un token en la URL.');
        }
         
        } catch (error: any) {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('No se envió ')
          saveAuth(undefined)
          setStatus(error.error)
          setSubmitting(false)
          setLoading(false)
        }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center  mt-9'>
        {/* begin::Title */} 
        <h1 className='text-dark fw-bolder '>Confirma tu cuenta</h1>
        {/* end::Title */}
      </div>

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
          Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info text-center'>
          Cuenta confirmada con éxito!!  </div>
        </div>
      )}


      <div className='text-center  fv-row mb-10      mt-4'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <span>
          ¿Ya has confirmado tu cuenta?{' '}
            <a
              href='/auth/login'
              target='_blank'
              className='ms-1 link-primary'
            >
              Iniciar sesión
            </a>
            
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>

   
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg  w-100 mb-5'
          style={{background: 'linear-gradient(to right, #334350 , #415565)',color: 'white'}}
        >
          {!loading && <span className='indicator-label'>Enviar</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Espere por favor...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        
      </div>
      {/* end::Form group */}
    </form>
  )
}
