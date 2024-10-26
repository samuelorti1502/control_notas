import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import clsx from 'clsx';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const API_URL = process.env.REACT_APP_SUPABASE_URL;
const API_Key = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(API_URL, API_Key);

// Definición de tipos para las props
interface FormEstuProps {
  mostrar: boolean;
  setMostrar: React.Dispatch<React.SetStateAction<boolean>>;
  tipo: number;
  datos?: {
    asignatura_id?: number,
    nombre?: string;
    descripcion?: string;

  }; // Haciendo datos opcional
  onStudentCreated?: () => void; // Función para refrescar la lista
}

const initialValues = {
  nombre: '',
  descripcion: '',
};

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  descripcion: Yup.string().required('Descripcion es requerido'),
});

const FormEstu: React.FC<FormEstuProps> = ({ mostrar, setMostrar, tipo, datos, onStudentCreated }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [statusOptions, setStatusOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>(''); // Para almacenar mensajes de error

  const handleImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imagen = URL.createObjectURL(file);
  
      // Aquí podrías manejar la subida de la imagen a Supabase Storage si es necesario
      // y luego establecer la URL en `imagen`
    }
  };

  const fetchEstatus = async () => {
    const { data, error } = await supabase.from('estatus').select();
    if (error) {
      console.error('Error al obtener estatus:', error);
      setErrorMessage('Error al cargar los estatus');
      return;
    }
    //console.log('Datos obtenidos de estatus:', data); // Mostrar datos en consola
    setStatusOptions(data);
  };

  useEffect(() => {
    fetchEstatus();
  }, []);

  const handleClose = () => {
    formik.resetForm();
    setHasErrors(undefined);
    setErrorMessage(''); // Limpiar el mensaje de error al cerrar
    setMostrar(false);
  };

  useEffect(() => {
    if (tipo === 1 && datos) {
      console.log('Datos props recibidos:', datos); // Agregar este log
     
    }
  }, [tipo, datos]);

  const formik = useFormik({
    initialValues:
      tipo === 1 && datos
        ? {
            nombre: datos.nombre || '',
            descripcion: datos.descripcion || '',
          }
        : initialValues,
    enableReinitialize: true, // Permite re-inicializar los valores cuando cambian las props
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      setLoading(true);
      setErrorMessage('');
      try {
        const { data, error } = tipo === 1
          ? await supabase
              .from('asignaturas')
              .update({
                nombre: values.nombre,
                descripcion: values.descripcion,
              })
              .eq('asignatura_id', datos?.asignatura_id) // Suponiendo que tienes un campo `estudiante_id` para identificar
          : await supabase
              .from('asignaturas')
              .insert([
                {
                  nombre: values.nombre,
                  descripcion: values.descripcion,

                },
              ]);

             

        if (error) {
          throw error; // Lanzar error si hay un problema
        }

        setLoading(false);
        setStatus(tipo === 0 ? 'Asignatura agregada exitosamente' : 'Asignatura actualizada exitosamente');
        setHasErrors(false);

      

        setTimeout(() => {
          resetForm();
          setMostrar(false);
        }, 2000);
      } catch (error: any) {
        setLoading(false);
        setErrorMessage(`Error: ${error.message}`);
        setHasErrors(true);
        console.error('Error:', error);
      }
    },
  });

  return (
    <Modal show={mostrar} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tipo === 0 ? 'Agregar Asignatura' : 'Editar Asignatura'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasErrors === true && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{errorMessage}</div> {/* Mostrar mensaje de error */}
          </div>
        )}

        {hasErrors === false && (
          <div className="mb-10 bg-light-info p-8 rounded">
            <div className="text-info text-center">{formik.status}</div>
          </div>
        )}

        {/* Campo de Nombre */}
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-dark fs-6">Nombre</label>
          <input
            placeholder="Nombre de la Asignatura"
            type="text"
            autoComplete="off"
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
          {formik.touched.nombre && formik.errors.nombre ? (
            <div className="invalid-feedback">{formik.errors.nombre}</div>
          ) : null}
        </div>

        {/* Campo de asignatura */}
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-dark fs-6">Descripción</label>
          <input
            placeholder="Descripción de la asignatura"
            type="text"
            autoComplete="off"
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
          {formik.touched.descripcion && formik.errors.descripcion ? (
            <div className="invalid-feedback">{formik.errors.descripcion}</div>
          ) : null}
        </div>

       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          variant="secondary"
          onClick={formik.submitForm}
          disabled={formik.isSubmitting || loading}
        >
          {!loading && <span className="indicator-label">{tipo === 0 ? 'Crear Asignatura' : 'Actualizar Asignatura'}</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: 'block' }}>
              Espere por favor...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { FormEstu };