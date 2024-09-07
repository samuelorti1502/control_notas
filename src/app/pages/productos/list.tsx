import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ContentContext } from './context'
import DataTable from 'react-data-table-component'
import { FormProd } from './form'
import EliminarUsuario from './EliminarProducto'
import EliminarProducto from './EliminarProducto'

const Index = () => {
  const { allData, eliminar } = useContext(ContentContext)

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

  const handleDelete = (usuario: any) => {
    eliminar(usuario)
    //allData()
  }

  const [mostrar, setMostrar] = useState(false)
  const [tipo, setTipo] = useState(0)
  const [datosFila, setDatosFila] = useState()

  const handleShowM = () => {
    setMostrar(true)
  }

  const formatter = new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
  })

  const columns = [
    {
      name: '#',
      selector: (row: any) => row.id_prod_menu,
    },
    {
      name: 'Categoria',
      selector: (row: any) => row.categoria,
      //selector: (row: { nombres: any; }) => row.nombres,
    },
    {
      name: 'Producto',
      selector: (row: any) => row.nombre,
    },
    {
      name: 'Descripcion',
      selector: (row: any) => row.descripcion,
    },
    {
      name: 'Precio',
      cell: (row: any) => formatter.format(row.precio),
    },
    {
      name: 'Estatus',
      cell: (row: any) => (
        <div
          style={{
            backgroundColor: row.estatus === 'Activo' ? '#d6f0e0' : row.estatus === 'Inactivo' ? '#e66975' : row.estatus === 'Pendiente' ? '#f0e0d6' : '',
            color: row.estatus === 'Activo' ? '#0d6832' : row.estatus === 'Inactivo' ? '#f80a22' : row.estatus === 'Pendiente' ? '#e0c440' : '',
            borderRadius: '5px',
            padding: '5px 10px',
          }}
        >
          {/* {row.id_status === 1 ? 'Activo' : row.id_status === 4 ? 'Inactivo' : 'Otro'} */}
          {row.estatus}
        </div>
      ),
    },
    {
      name: 'Imagen',
      cell: (row: any) => (
        // row.imagen,
        <img
          src={`http://3.22.100.138/images/${row.imagen}`}
          alt='Imagen'
          style={{ width: '50px', height: '50px' }}
        />
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
          //  onClick={() => handleDelete(row.usuario)}
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
        //maxWidth: '90%',
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
        justifyTitle: 'center',
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
        title='Productos'
        columns={columns}
        data={allData}
        pagination
        customStyles={tableCustomStyles}
      />
      <FormProd mostrar={mostrar} setMostrar={setMostrar} tipo={tipo} datos={datosFila} />
      {showDelete && (
        <EliminarProducto
          modalTitle={'Eliminar Producto'}
          show={showDelete}
          handleClose={handleCloseModalEliminar}
          selectedUser={selectedUser}

        />
      )}
    </div>
  )
}

export default Index
