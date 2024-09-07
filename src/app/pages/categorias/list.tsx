import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ContentContext } from './context'
import DataTable from 'react-data-table-component'
import { FormProd } from './form'
import EliminarCategoria from './EliminarCategoria'

const Index = () => {
  const { allData } = useContext(ContentContext)

  const [mostrar, setMostrar] = useState(false)
  const [tipo, setTipo] = useState(0)
  const [id_cat, setID] = useState()
  const [nombre, setNombre] = useState()
  const [estatusCat, setEstatusCat] = useState()

  //d
  const [showDelete, setShowDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);


  const handleShowEliminar = (row) => {
    setSelectedUser(row);
    setShowDelete(true);

  }

  const handleCloseModalEliminar = () => {
    setSelectedUser(null);
    setShowDelete(false);
  }
  //d

  const handleShowM = () => {
    setMostrar(true)
  }

  const handleCat = (category: any) => {
    setID(category)
    //console.log(category)
  }

  const columns = [
    {
      name: '#',
      selector: (row: any) => row.id_categoria,
    },
    {
      name: 'Categoria',
      selector: (row: any) => row.nombre,
      //selector: (row: { nombres: any; }) => row.nombres,
    },
    {
      name: 'Imagen',
      cell: (row: any) => (
        // row.imagen,
        <img src={row.imagen} alt='Imagen' style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      // name: 'Estatus',
      // selector: (row: any) => row.id_status,
      name: 'Estatus',
      cell: (row: any) => (
        <div
          style={{
            backgroundColor: row.id_status === 1 ? '#d6f0e0' : row.id_status === 4 ? '#e66975' : '',
            color: row.id_status === 1 ? '#0d6832' : row.id_status === 4 ? '#f80a22' : '',
            borderRadius: '5px',
            padding: '5px 10px',
            // color: 'white',
          }}
        >
          {row.id_status === 1 ? 'Activo' : row.id_status === 4 ? 'Inactivo' : 'Otro'}
        </div>
      ),
    },
    {
      name: 'Acciones',
      cell: (row: any) => (
        <div>
          <Button
            variant={'danger'}
            className='btn-sm btn-icon'
            onClick={() => handleShowEliminar(row)}
          // onClick={() => handleDelete(row.usuario)}
          >
            <i className='bi bi-trash' />
          </Button>
          <Button
            variant='warning'
            className='ms-3 btn-sm btn-icon'
            onClick={() => {
              handleShowM()
              setTipo(1)
              setID(row.id_categoria)
              setNombre(row.nombre)
              setEstatusCat(row.id_status)
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
        //color: theme.text.primary,
        //justifyContent: 'center',
        backgroundColor: '#FFA500',
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
        //justifyContent: 'center',
        justifyTitle: 'center',
        backgroundColor: '#FFA500',
      },
      title: {
        style: {
          textAlign: 'center',
        },
      },
    },
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Categorias</h1>
      </div>
      <DataTable
        className='form w-100'
        columns={columns}
        data={allData}
        pagination
        customStyles={tableCustomStyles}
      />
      <FormProd
        mostrar={mostrar}
        setMostrar={setMostrar}
        tipo={tipo}
        id_cat={id_cat}
        nombre={nombre}
        estatusCat={estatusCat}
      />

      {showDelete && (
        <EliminarCategoria
          modalTitle={'Eliminar Categoria'}
          show={showDelete}
          handleClose={handleCloseModalEliminar}
          selectedUser={selectedUser}

        />
      )}


    </div>
  )
}

export default Index
