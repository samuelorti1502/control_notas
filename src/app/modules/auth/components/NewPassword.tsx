/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register,New_Password} from '../core/_requests'
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

const NewPasswordSchema = Yup.object().shape({
  
  password: Yup.string()
    .min(3, 'Minimo 3 simbolos')
    .max(50, 'Maximo 50 simbolos')
    .required('Se requiere contraseña'),
  changepassword: Yup.string()
    .required('Confirmar Contraseña es requerido')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas no coinciden"),
    }),
  acceptTerms: Yup.bool().required('Debe aceptar los Términos y Condiciones'),
})


export function NewPassword() { 
   
    const { token } = useParams();

  // Verifica si `_token` tiene un valor válido


  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: NewPasswordSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
        setLoading(true)
        try {

            if (token) {
                console.log('Token recibido:', token);
          const {data: auth}: any = await New_Password(token,values.password)
          console.log('mensaje: ' +auth)
          if(auth === 'Contraseña actualizada con éxito!!') {
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
        <h1 className='text-dark fw-bolder '>Configurar nueva contraseña</h1>
        {/* end::Title */}
      </div>

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
          Lo sentimos, parece que se han detectado algunos errores. Inténtalo de nuevo.
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info text-center'>
          Contraseña actualizada con éxito!! </div>
        </div>
      )}








      <div className='text-center  fv-row mb-10      mt-4'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <span>
          ¿Ya has restablecido la contraseña?{' '}
            <a
              href='/auth/login'
              target='_blank'
              className='ms-1 link-primary'
            >
              Iniciar sesión
            </a>
            .
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

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Contraseña</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='contraseña'
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
        <div className='text-muted'>
          Utilice 8 o más caracteres con una combinación de letras, números y símbolos.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirmar contraseña</label>
        <input
          type='password'
          placeholder='confirmación de contraseña'
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
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>

      {/* end::Form group */}
    
        
      {/* begin::Form group */}
      <div className='fv-row mb-8 mt-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
          Acepto los{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
             términos
            </a>
            .
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
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
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
