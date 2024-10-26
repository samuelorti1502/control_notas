import React, { useState, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { FormNotas} from './form'
import EliminarNota from './EliminarProducto'



const Index = () => {


 // Estado para la tabla
 const [allData, setAllData] = useState([]);
 const [showDelete, setShowDelete] = useState(false);
 const [selectedRecord, setSelectedRecord] = useState(null);


 // Simulamos una función que devuelve algunos registros desde una "API"
 const fetchSimulatedData = () => {
  const data = [
    {
      id_estudiante: 1,
      nombre_estudiante: 'Juan Pérez',
      asignatura: 'Matemáticas',
      examen1: 80,
      examen2: 85,
      zona: 90,
      examenFinal: 88,
      total: 86,
    },
    {
      id_estudiante: 2,
      nombre_estudiante: 'María López',
      asignatura: 'Ciencias',
      examen1: 75,
      examen2: 80,
      zona: 85,
      examenFinal: 90,
      total: 83,
    },
    {
      id_estudiante: 3,
      nombre_estudiante: 'Carlos García',
      asignatura: 'Historia',
      examen1: 70,
      examen2: 75,
      zona: 80,
      examenFinal: 85,
      total: 78,
    },
    {
      id_estudiante: 4,
      nombre_estudiante: 'Ana Hernández',
      asignatura: 'Inglés',
      examen1: 85,
      examen2: 90,
      zona: 95,
      examenFinal: 92,
      total: 90,
    },
  ];
  setAllData(data);
};

// Llamamos a la función simulada cuando el componente se monta
useEffect(() => {
  fetchSimulatedData();
}, []);

const handleShowEliminar = (row) => {
  setSelectedRecord(row);
  setShowDelete(true);
}

const handleCloseModalEliminar = () => {
  setSelectedRecord(null);
  setShowDelete(false);
}


const [mostrar, setMostrar] = useState(false)
const [tipo, setTipo] = useState(0)
const [datosFila, setDatosFila] = useState()

const handleShowM = () => {
  setMostrar(true)
}

const columns = [
  {
    name: 'ID Estudiante',
    selector: (row) => row.id_estudiante,
  },
  {
    name: 'Nombre',
    selector: (row) => row.nombre_estudiante,
  },
  {
    name: 'Asignatura',
    selector: (row) => row.asignatura,
  },
  {
    name: 'Examen 1',
    selector: (row) => row.examen1,
  },
  {
    name: 'Examen 2',
    selector: (row) => row.examen2,
  },
  {
    name: 'Zona',
    selector: (row) => row.zona,
  },
  {
    name: 'Examen Final',
    selector: (row) => row.examenFinal,
  },
  {
    name: 'Total',
    selector: (row) => row.total,
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
              handleShowM()
              setTipo(1)
              setDatosFila(row)
            }}
          >
            <i className='bi bi-pencil' />
          </Button>
        </div>
      ),
    },
  ]

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
      }
    },
    cells: {
      style: {
        fontSize: '12px',
        justifyContent: 'center',
      }
    }
  }

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
      <FormNotas mostrar={mostrar} setMostrar={setMostrar} tipo={tipo} datos={datosFila} />
      {showDelete && (
        <EliminarNota
          modalTitle='Eliminar Nota'
          show={showDelete}
          handleClose={handleCloseModalEliminar}
          selectedUser={selectedRecord}
        />
      )}
    </div>
  )
}

export default Index
