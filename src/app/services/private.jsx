const RouteBase = process.env.REACT_APP_API_URL
const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'


export async function GetRoute(url) {
 const response = await fetch(`${RouteBase}/${url}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE_KEY))._token}`,
    },
  })
    .then((data) => data.json())
    .catch(() => [])
  return await response
}

// **************************************************************************
// Función guardar registros json
// **************************************************************************
export async function PostRoute(url, form) {
  const data = JSON.stringify({
    usuario: JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)).id,
    ...form,
  })
  // enviamos el formulario con fetch por el método post
  const response = await fetch(`${RouteBase}/${url}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE_KEY))._token}`,
    },
    body: data,
  })
    .then((data) => data.json())
    .catch(() => [])

  return await response
}

export async function PutRoute(url, form) {
  const data = JSON.stringify({
    usuario: JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)).id,
    ...form,
  })

  const response = await fetch(`${RouteBase}/${url}`, {
    method: 'PUT', // Cambiamos el método a PUT
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE_KEY))._token}`,
    },
    body: data,
  })
    .then((data) => data.json())
    .catch(() => [])

  return await response
}

export async function DeleteRoute(url, id) {
  const response = await fetch(`${RouteBase}/${url}/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE_KEY))._token}`,
    },
  })
    .then((data) => data.json())
    .catch(() => [])

  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GetRoute,
  PostRoute,
  PutRoute,
}
