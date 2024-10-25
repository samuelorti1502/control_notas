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
    estudiante_id?: number,
    nombre?: string;
    apellido?: string;
    correo_electronico?: string;
    id_estatus?: number;
    imagen?: string;
  }; // Haciendo datos opcional
  onStudentCreated?: () => void; // Función para refrescar la lista
}

const initialValues = {
  nombre: '',
  apellido: '',
  correo: '',
  id_estatus: '', // Iniciar como vacío para obligar a seleccionar
  imagen: '',
};

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  apellido: Yup.string().required('Apellido es requerido'),
  correo: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  id_estatus: Yup.number().required('Estatus es requerido'),
});

const FormEstu: React.FC<FormEstuProps> = ({ mostrar, setMostrar, tipo, datos, onStudentCreated }) => {
  const [image, setImage] = useState<string>(datos?.imagen || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const [statusOptions, setStatusOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>(''); // Para almacenar mensajes de error

  const handleImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imagen = URL.createObjectURL(file);
      setImage(imagen);
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
      setImage(datos.imagen || '');
    }
  }, [tipo, datos]);

  const formik = useFormik({
    initialValues:
      tipo === 1 && datos
        ? {
            nombre: datos.nombre || '',
            apellido: datos.apellido || '',
            correo: datos.correo_electronico || '',
            id_estatus: datos.id_estatus || '',
            imagen: datos.imagen || '',
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
              .from('estudiantes')
              .update({
                nombre: values.nombre,
                apellido: values.apellido,
                correo: values.correo,
                id_estatus: values.id_estatus,
                imagen: values.imagen,
              })
              .eq('estudiante_id', datos?.estudiante_id) // Suponiendo que tienes un campo `estudiante_id` para identificar
          : await supabase
              .from('estudiantes')
              .insert([
                {
                  nombre: values.nombre,
                  apellido: values.apellido,
                  correo: values.correo,
                  id_estatus: values.id_estatus,
                  imagen: values.imagen,
                },
              ]);

        if (error) {
          throw error; // Lanzar error si hay un problema
        }

        setLoading(false);
        setStatus(tipo === 0 ? 'Estudiante creado exitosamente' : 'Estudiante actualizado exitosamente');
        setHasErrors(false);

        if (onStudentCreated) {
          onStudentCreated(); // Refrescar la lista de estudiantes
        }

        setTimeout(() => {
          resetForm();
          setMostrar(false);
          setImage(''); // Limpiar la imagen
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
        <Modal.Title>{tipo === 0 ? 'Agregar Estudiante' : 'Editar Estudiante'}</Modal.Title>
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
          <label className="form-label fw-bolder text-dark fs-6">Nombres</label>
          <input
            placeholder="Nombres del Estudiante"
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

        {/* Campo de Apellido */}
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-dark fs-6">Apellido</label>
          <input
            placeholder="Apellido del Estudiante"
            type="text"
            autoComplete="off"
            {...formik.getFieldProps('apellido')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.apellido && formik.errors.apellido,
              },
              {
                'is-valid': formik.touched.apellido && !formik.errors.apellido,
              }
            )}
          />
          {formik.touched.apellido && formik.errors.apellido ? (
            <div className="invalid-feedback">{formik.errors.apellido}</div>
          ) : null}
        </div>

        {/* Campo de Correo Electrónico */}
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-dark fs-6">Correo Electrónico</label>
          <input
            placeholder="Correo Electrónico del Estudiante"
            type="email"
            autoComplete="off"
            {...formik.getFieldProps('correo')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.correo && formik.errors.correo,
              },
              {
                'is-valid': formik.touched.correo && !formik.errors.correo,
              }
            )}
          />
          {formik.touched.correo && formik.errors.correo ? (
            <div className="invalid-feedback">{formik.errors.correo}</div>
          ) : null}
        </div>

        {/* Campo de Imagen */}
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-dark fs-6">Imagen</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            ref={inputRef}
            onChange={handleImage}
            className="form-control bg-transparent"
          />
          {image && <img src={image} alt="Preview" className="mt-2" style={{ width: '150px', height: '150px' }} />}
        </div>

        {/* Campo de Estatus */}
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-dark fs-6">Estatus</label>
          <Form.Select
            value={formik.values.id_estatus}
            onChange={(e) => formik.setFieldValue('id_estatus', Number(e.target.value))}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.id_estatus && formik.errors.id_estatus,
              },
              {
                'is-valid': formik.touched.id_estatus && !formik.errors.id_estatus,
              }
            )}
          >
            <option value="">Seleccionar estatus</option>
            {statusOptions.map((est) => (
              <option key={est.id_estatus} value={est.id_estatus}>
                {est.estatus}
              </option>
            ))}
          </Form.Select>
          {formik.touched.id_estatus && formik.errors.id_estatus ? (
            <div className="invalid-feedback">{formik.errors.id_estatus}</div>
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
          {!loading && <span className="indicator-label">{tipo === 0 ? 'Crear Estudiante' : 'Actualizar Estudiante'}</span>}
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