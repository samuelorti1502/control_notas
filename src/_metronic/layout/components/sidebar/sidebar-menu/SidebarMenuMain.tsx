/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from '../../../../../app/modules/auth'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const {currentUser} = useAuth()

  const isAdmin = currentUser && currentUser.rol === 'Administrador'
  const rol = currentUser.rol


  return (
    <>
      <SidebarMenuItem
        to='/menu'
        icon='/media/icons/duotune/general/gen024.svg'
        title='Menu'
        fontIcon='bi-layers'
      />
      { /*<SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      /> ¨*/}
      {/* <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/rol'
        icon='/media/icons/duotune/general/gen024.svg'
        title='Rol'
        fontIcon='bi-layers'
      /> */}
      {true && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>{`Administracion`}</span>
            </div>
          </div>
          <SidebarMenuItemWithSub
            to='/administracion/usuarios'
            title='Usuarios'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-person'
          >
            <SidebarMenuItem to='/administracion/usuarios/nuevo' title='Listado' hasBullet={true} />
          </SidebarMenuItemWithSub>

          
       <SidebarMenuItemWithSub
            to='/administracion/categorias'
            title='Pro'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-layers'
          >
            <SidebarMenuItem
              to='/administracion/categorias/listado'
              title='Listado'
              fontIcon='bi-archive'
              icon='/media/icons/duotune/general/gen022.svg'
            />
          </SidebarMenuItemWithSub>
          <SidebarMenuItemWithSub
            to='/administracion/notas'
            title='Notas'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-layers'
          >
         <SidebarMenuItem
              to='/administracion/notas/listado'
              title='Listado'
              fontIcon='bi-archive'
              icon='/media/icons/duotune/general/gen022.svg'
            />
          </SidebarMenuItemWithSub>
          <SidebarMenuItemWithSub
            to='/administracion/estudiantes'
            title='Estudiantes'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-layers'
          >
         <SidebarMenuItem
              to='/administracion/estudiantes/listado'
              title='Listado'
              fontIcon='bi-archive'
              icon='/media/icons/duotune/general/gen022.svg'
            />
          </SidebarMenuItemWithSub>
        </>
      )}
      {/* <SidebarMenuItem
        to='/proveedores'
        title='Proveedores'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      />
      <SidebarMenuItem
        to='/clientes'
        title='Clientes'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      />
      <SidebarMenuItem
        to='/productos'
        title='Productos'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      />
      <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} /> */}
    </>
  )
}

export {SidebarMenuMain}
