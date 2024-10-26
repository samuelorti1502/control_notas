import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FormEstu } from './form';
import EliminarNota from './EliminarProducto';
import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.REACT_APP_SUPABASE_URL;
const API_Key = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(API_URL, API_Key);

const Index = () => {
  // Estado para la tabla
  const [allData, setAllData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [tipo, setTipo] = useState(0);
  const [datosFila, setDatosFila] = useState();

  // Llamamos a la función para obtener datos de Supabase cuando el componente se monta
  useEffect(() => {
    getNotas();
  }, []);


  async function getNotas() {
    const { data, error } = await supabase
    
    .from('calificaciones')
    .select('calificacion_id,calificacion,estudiantes (nombre),asignaturas (nombre), usuarios (nombre),tipoNota (tipo)')
   // .eq('calificaciones.estudiante_id', 'estudiantes.estudiante_id');


    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setAllData(data);
    }
  }

  // Función que se llama después de crear o actualizar una asignatura
  const handleStudentCreated = () => {
    getNotas(); // Actualiza la lista de asignaturas
  };

  const handleShowEliminar = (row) => {
    setSelectedRecord(row);
    setShowDelete(true);
  };

  const handleCloseModalEliminar = () => {
    setSelectedRecord(null);
    setShowDelete(false);
  };

  const handleShowM = () => {
    setMostrar(true);
  };

  const columns = [
    {
      name: 'ID Calificacion',
      selector: (row) => row.calificacion_id,
    },
    {
      name: 'Estudiante',
      selector: (row) => row.estudiantes.nombre, 
    },
    {
      name: 'Asignatura',
      selector: (row) => row.asignaturas.nombre,
    },
    {
      name: 'Usuario / Maestro',
      selector: (row) => row.usuarios.nombre,
    },
    {
      name: 'Tipo de calificación',
      selector: (row) => row.tipoNota.tipo,
    },
    {
      name: 'Calificacion',
      selector: (row) => row.calificacion,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div>
          <Button
            variant='danger'
            className='btn-sm btn-icon'
            onClick={() => handleShowEliminar(row)}
          >
            <i className='bi bi-trash' />
          </Button>
          <Button
            variant='warning'
            className='ms-3 btn-sm btn-icon'
            onClick={() => {
              handleShowM();
              setTipo(1);
              setDatosFila(row);
            }}
          >
            <i className='bi bi-pencil' />
          </Button>
        </div>
      ),
    },
  ];

  const tableCustomStyles = {
    table: {
      style: {
        justifyContent: 'center',
        backgroundColor: '#FFA500',
        margin: 'auto',
      },
    },
    tableWrapper: {
      style: {
        display: 'table',
      },
    },
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        justifyContent: 'center',
        backgroundColor: '#FFA500',
      },
    },
    cells: {
      style: {
        fontSize: '12px',
        justifyContent: 'center',
      },
    },
  };

  return (
    <div>
      <DataTable
        className='form w-100'
        title='Calificaciones'
        columns={columns}
        data={allData}
        pagination
        customStyles={tableCustomStyles}
      />
      <FormEstu
        mostrar={mostrar}
        setMostrar={setMostrar}
        tipo={tipo}
        datos={datosFila}
        onStudentCreated={handleStudentCreated} // Pasar la función al componente hijo
      />
      {showDelete && (
        <EliminarNota
          modalTitle='Eliminar Asignatura'
          show={showDelete}
          handleClose={handleCloseModalEliminar}
          selectedUser={selectedRecord}
        />
      )}
    </div>
  );
};

export default Index;
