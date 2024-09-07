import {useContext} from 'react'
import {Button,Modal, Row, Col} from 'react-bootstrap'
import {ContentContext} from './context'
import DataTable from 'react-data-table-component'
import { useAuth } from '../../modules/auth'
import EditarUsuario from './EditarUsuario'
import EliminarUsuario from './EliminarUsuario'
import React, { useState } from 'react';


const Lista = () => {
  const {allData, eliminar} = useContext(ContentContext)


 // const {currentUser} = useAuth()

 const handleDelete = (usuario: any) => {
    eliminar(usuario)
    allData()
    
  }
  


  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);


  const handleShow = (row) => {
    setSelectedUser(row);
    setShow(true);
    
  }
  
  
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShow(false);
  }
  

  const handleShowEliminar = (row) => {
    setSelectedUser(row);
    setShowDelete(true);
    
  }
  
  
  const handleCloseModalEliminar = () => {
    setSelectedUser(null);
    setShowDelete(false);
  }



  const columns = [
    {
      name: '#',
      selector: (row: any) => row.id,
    },
    {
      name: 'Nombres',
      selector: (row: any) => row.nombres,
      //selector: (row: { nombres: any; }) => row.nombres,
    },
    {
      name: 'Apellidos',
      selector: (row: any) => row.apellidos,
    },
    {
      name: 'Usuario',
      selector: (row: any) => row.usuario,
    },
    /*{
      name: 'Email',
      selector: (row: any) => row.email,
    },*/
    {
      name: 'Rol',
      selector: (row: any) => row.rol,
    },
    {
      name: 'Estatus',
      selector: (row: any) => row.estatus,
    },
    {
      name: 'Confirmado',
      selector: (row: any) => row.confirmado,
    },
    {
      name: 'Acciones',
      cell: (row: any) => (
        <div>
          <Button
            variant={'danger'}
            className='btn-sm btn-icon'
          //  onClick={() => handleDelete(row.usuario)}
          onClick={() => handleShowEliminar(row)}
          >
            <i className='bi bi-trash' />
          </Button>
          <Button variant='warning' className='ms-3 btn-sm btn-icon' onClick={() => handleShow(row)}>
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
    },
  }
  
  //console.log( currentUser)



  return (

    <div>
 <DataTable
        title="Usuarios"
        columns={columns}
        data={allData} // Usa el estado para los datos
        pagination
        customStyles={tableCustomStyles}
/>
{show && (
    <EditarUsuario
      modalTitle={'Editar Usuario'}
      show={show}
      handleClose={handleCloseModal}
      selectedUser={selectedUser}
    />
  )} :

{showDelete && (
    <EliminarUsuario
      modalTitle={'Eliminar Usuario'}
      show={showDelete}
      handleClose={handleCloseModalEliminar}
      selectedUser={selectedUser}

    />
  )}
       
    </div>
  )
}

export default Lista