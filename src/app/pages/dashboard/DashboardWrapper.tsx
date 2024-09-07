/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import Fondo1 from './Fondo1.png'
import './ComerOLlevar.css'
import {FaArrowRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'

import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => (
  <div className='banner-container'>
    <div className='background-image'>
      <img src={Fondo1} alt='Pizza' className='banner-image' />
    </div>
    <div className='content'>
      <h1 className='banner-title'>
        Control De <span>Notas</span>
      </h1>
      <div className='button-container'>
        <Link to='/asignar-mesa'>
          <button className='banner-button'>
            Notas <FaArrowRight />
          </button>
        </Link>
       
      </div>
    </div>
  </div>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
