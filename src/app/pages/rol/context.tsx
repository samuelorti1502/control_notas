import { createContext, FC, ReactNode, useState, useEffect } from 'react';
import { GetRoute, PostRoute, DeleteRoute } from '../../services/private'; // Asegúrate de importar DeleteRoute
import { AxiosResponse } from 'axios'; // Asegúrate de importar AxiosResponse

type Props = {
  children?: ReactNode;
};

export const ContentContext = createContext<any | null>(null);

export const ContentProvider: FC<Props> = ({ children }) => {
  const texto: String = 'Bienvenido Context';
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState<any>([]);
  const [oneData, setOneData] = useState<any>([]);

  const all = async () => {
    const response = await GetRoute('rol/listar');
    setAllData(response.length > 0 ? response : []);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const creaetUpdate = async (data: any) => {
    const response = await PostRoute(`rol/${!data?.id ? 'store' : 'update'}`, data);
    all();
    handleClose();
    console.log(response.message);
  };

  const eliminar = async (usuario: any) => {
    const response: any = await DeleteRoute(`usuario/${usuario.id}`); // Reemplaza DeleteRoute con la función real para eliminar usuarios

    if (response.status === 200) {
      console.log(response.data.message);
      all(); // Vuelve a cargar los datos después de eliminar
    } else {
      console.error(response.data.error);
    }
  };

  const one = async (data: any) => {
    const response = await PostRoute(`rol/one`, data);
    setOneData(response.length > 0 ? response[0] : []);
    handleShow();
  };

  const state = async (data: any) => {
  /* const response = await PostRoute(`rol/${data?.estado === 1 ? 'destroy' : 'active'}`, data);
    console.log(response.message);*/
    all();
  };

  const value = {
    show,
    texto,
    allData,
    oneData,
    handleClose,
    creaetUpdate,
    handleShow,
    state,
    one,
    eliminar,
  };

  useEffect(() => {
    all();
  }, []);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
