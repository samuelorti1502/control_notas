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
    getEstudiantes();
  }, []);

  async function getEstudiantes() {
    const { data, error } = await supabase.from('estudiantes').select();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setAllData(data);
    }
  }

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
      name: 'ID Estudiante',
      selector: (row) => row.estudiante_id,
    },
    {
      name: 'Nombres',
      selector: (row) => row.nombre,
    },
    {
      name: 'Apellidos',
      selector: (row) => row.apellido,
    },
    {
      name: 'Correo',
      selector: (row) => row.correo_electronico,
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
        title='Control de Notas'
        columns={columns}
        data={allData}
        pagination
        customStyles={tableCustomStyles}
      />
      <FormEstu mostrar={mostrar} setMostrar={setMostrar} tipo={tipo} datos={datosFila} />
      {showDelete && (
        <EliminarNota
          modalTitle='Eliminar Nota'
          show={showDelete}
          handleClose={handleCloseModalEliminar}
          selectedUser={selectedRecord}
        />
      )}
    </div>
  );
};

export default Index;