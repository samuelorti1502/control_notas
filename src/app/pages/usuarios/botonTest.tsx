import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';

type FormProps = {
  modalTitle: string; // Prop para el título del modal
 // Función para generar la factura
};

const initialValues = {
  customerName: '',
  customerAddress: '',
  date: '',
  invoiceNumber: '',
  description: '',
  invoiceAmount: 0,
};

const invoiceSchema = Yup.object().shape({
  customerName: Yup.string().required('Nombre del cliente es requerido'),
  customerAddress: Yup.string().required('Dirección del cliente es requerida'),
  date: Yup.string().required('Fecha es requerida'),
  invoiceNumber: Yup.string().required('Número de factura es requerido'),
  description: Yup.string().required('Descripción es requerida'),
  invoiceAmount: Yup.number()
    .typeError('Debe ser un número')
    .required('Monto de factura es requerido')
    .positive('Debe ser un número positivo'),
});

const InvoiceModal: React.FC<FormProps> = ({ modalTitle }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const formik = useFormik({
    initialValues,
    validationSchema: invoiceSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('customerName', values.customerName);
      formData.append('customerAddress', values.customerAddress);
      formData.append('date', values.date);
      formData.append('invoiceNumber', values.invoiceNumber);
      formData.append('description', values.description);
      formData.append('invoiceAmount', String(values.invoiceAmount));

    // Llamamos a la función para generar la factura con el objeto FormData
      handleClose(); // Cerramos el modal después de generar la factura
    },
  });

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ background: 'linear-gradient(to right, #F2AC29, #FF5733)', color: 'white' }}
      >
        Nueva Factura
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <div className="fv-row mb-8">
              <label className="form-label fw-bolder text-dark fs-6">Nombre del Cliente</label>
              <input
                type="text"
                autoComplete="off"
                {...formik.getFieldProps('customerName')}
                className={clsx('form-control bg-transparent', {
                  'is-invalid': formik.touched.customerName && formik.errors.customerName,
                })}
              />
              {formik.touched.customerName && formik.errors.customerName && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.customerName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Repite los campos anteriores para los demás campos del formulario */}
            
            <button type="submit" className="btn btn-primary">
              Generar Factura
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InvoiceModal;
