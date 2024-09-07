import { createContext, FC, ReactNode, useState, useEffect } from 'react'
import { GetRoute, PutRoute } from '../../services/private'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
export const CATEGORIA_URL = `${API_URL}/categorias`

type Props = {
  children?: ReactNode
}

export const ContentContext = createContext<any | null>(null)


export const ContentProvider: FC<Props> = ({ children }) => {
  const texto: String = 'Bienvenido Context'
  const [show, setShow] = useState(false)
  const [allData, setAllData] = useState<any>([])

  const all = async () => {
    const response = await GetRoute('categorias/listar')
    setAllData(response.length > 0 ? response : [])
    console.log(allData)
  }

  const catUpdate = async (data: any) => {
    const response = await PutRoute(`categorias/${!data?.id ? 'store' : 'update'}`, data)
    console.log(response)
  }

  const inactivar = async (data: any) => {
    console.log(`data ${data}`)
    const response = await PutRoute(`categorias/inactivar/${data}`)

    all()
    handleClose()

  }


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const value = {
    show,
    texto,
    allData,
    handleClose,
    handleShow,
    catUpdate,
    inactivar,
    modificarCategoria
  }

  useEffect(() => {
    all()
  }, [])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function modificarCategoria(id: any, nombre: any, imagen: any, estatus: any, usuario_creacion: any) {
  return axios.put(`${CATEGORIA_URL}/modificar/${id}`, {
    id_categoria: id,
    nombre: nombre,
    imagen: imagen,
    id_status: estatus,
    usuario_creacion: usuario_creacion,
  })
}