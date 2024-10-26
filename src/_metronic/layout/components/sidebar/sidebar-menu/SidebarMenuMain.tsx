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
        icon='/media/icons/duotune/general/gen001.svg'
        title='Home'
        fontIcon='bi-layers'
      />

    <SidebarMenuItemWithSub
            to='/notas'
            title='Notas'
            icon='/media/icons/duotune/general/gen005.svg'
            fontIcon='bi-layers'
          >
         <SidebarMenuItem
              to='/notas/listado'
              title='Listado'
              fontIcon='bi-archive'
              icon='/media/icons/duotune/general/gen022.svg'
            />
          </SidebarMenuItemWithSub>



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
            title='Usuarios/Maestros'
            icon='/media/icons/duotune/communication/com006.svg'
            fontIcon='bi-person'
          >
            <SidebarMenuItem to='/administracion/usuarios/nuevo' title='Listado' hasBullet={true} />
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

      
          <SidebarMenuItemWithSub
            to='/administracion/Asignaturas'
            title='Asignaturas'
              icon='/media/icons/duotune/general/gen055.svg'
            fontIcon='bi-layers'
          >
         <SidebarMenuItem
              to='/administracion/Asignaturas/listado'
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
