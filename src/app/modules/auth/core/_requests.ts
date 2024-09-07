import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import {UserModel} from './_models'

const API_URL = process.env.REACT_APP_SUPABASE_URL
const API_Key = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(API_URL, API_Key);

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/usr/login`

//token?grant_type=password

export const REQUEST_PASSWORD_URL = `${API_URL}/correo`
export const CORREO_COMNFIRMAR_CUENTA = `${API_URL}/correo/confirmar`
export const REQUEST_NEW_PASSWORD = `${API_URL}/correo/confirmar-password`
export const REQUEST_CONFIRMAR_CUENTA = `${API_URL}/correo/confirmar-cuenta`
export const REGISTER_URL = `${API_URL}/usuario`
export const MODIFICAR_URL = `${API_URL}/Usuario/modificar`
export const PRODUCTO_URL = `${API_URL}/menu`
export const CATEGORIA_URL = `${API_URL}/categorias`

// Función de login usando el SDK de Supabase
export async function login(usuario: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: password,

    }
  )
  console.log("peticion")

    if (error) {
      throw new Error(error.message)

    console.log("error "+error.message)

    }

    return data
  } catch (error) {
    console.error('Error en el login:', error.message)
    throw error
  }
}


// Server should return AuthModel
//export function login(usuario: string, password: string) {
  //console.log(usuario)
  //return axios.post<any>(LOGIN_URL, {
    //usuario: usuario,
    //password,
    //id: 1,
    //rol: '',
  //})
//}


export function CorreoConfirmarCuenta(email: string) {
  axios.get<{result: boolean}>(CORREO_COMNFIRMAR_CUENTA+`/${email}`)
}

// Server should return AuthModel
export function register(
email: string,
firstname: string,
lastname:  String,
passwords: string,
  changepassword: string,
) {

  return axios.post(REGISTER_URL, {
    id: 1,
    nombres: firstname,
    apellidos : lastname,
    email : email,
    usuario: firstname,
    password: passwords,
    rol : firstname,
    estatus: 'Activo',
    token: 'nullXD',
    confirmado: 0,
    usuario_creacion: firstname,
  })
}

//Funcion para Editar el registro de un usuario:
export function Editar_Usuario(
  nombres: string,
  apellidos: string,
  email: string,
  usuario: string,
  password: string,
  rol: string,
  usuario_creacion: string,
  usuarioactual: string
) {
  return axios.put(MODIFICAR_URL + `/${usuarioactual}`, {
    id: 1,
    nombres: nombres,
    apellidos: apellidos,
    email: email,
    usuario: usuario,
    password: password,
    rol: rol,
    estatus: 'Activo',
    token: 'nullXD',
    confirmado: 0,
    usuario_creacion: usuario_creacion,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.get<{result: boolean}>(REQUEST_PASSWORD_URL+`/${email}`)
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}

export function New_Password(token: string, password:string) {
  return axios.post<any>(REQUEST_NEW_PASSWORD, {
    idUsuario:0,
    correoUsuario: 'null',
    token: token,
    contraseña :password,
    dato: 'null'
  })

}

export function Confirmar_Cuenta(token: string) {
  return axios.post<any>(REQUEST_CONFIRMAR_CUENTA, {
    idUsuario:0,
    correoUsuario: 'null',
    token: token,
    contraseña :'null',
    dato: 'null'
  })
}

export function registrarProducto(
  producto: string,
  descripcion: string,
  categoria: string,
  precio: string,
  estatus: string,
  // usuario_creacion: string,
  imagen: string
) {
  console.log('Hola')
  return axios.post(PRODUCTO_URL, {
    id_prod_menu: 1,
    nombre: producto,
    descripcion: descripcion,
    id_menu: parseInt(categoria),
    precio: parseFloat(precio),
    id_estatus: parseInt(estatus),
    usuario_creacion: 3,
    imagen: imagen,
  })
}

export function ingresarCategoria(nombre: string, imagen: string, usuario_creacion: string) {
  return axios.post(CATEGORIA_URL, {
    id_categoria: 1,
    nombre: nombre,
    imagen: 'N/A',
    id_status: 1,
    usuario_creacion: usuario_creacion,
  })
}