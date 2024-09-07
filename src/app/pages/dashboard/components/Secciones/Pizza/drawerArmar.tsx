/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { KTSVG } from '../../../../../../_metronic/helpers'
import ArmaPizza from '../../ArmaPizza/ArmaPizza'
import CrearPizza from '../../CrearPizza/CrearPizza'

const DrawerArmar = (props: any) => {

    let { tipo, pizzaPorMitades, setPizzaPorMitades, addPizzaPorMitades, pizzaArmar, setPizzaArmar, addPizzaArmar } = props

    const recibirOrden = (orden: any) => {
        console.log('Orden recibida de ArmarPizza ', orden)
        props.enviarOrden(orden)
        tipo = 1
        console.log('Tipo ...', tipo)
    }
    
    return (
        <div
            id='kt_help'
            className='bg-body'
            data-kt-drawer='true'
            data-kt-drawer-name='help'
            data-kt-drawer-activate='true'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'350px', 'md': '525px'}"
            data-kt-drawer-direction='end'
            data-kt-drawer-toggle='#kt_help_toggle'
            data-kt-drawer-close='#kt_help_close'
        >
            {/* begin::Card */}
            <div className='card shadow-none rounded-0 w-100'>
                {/* begin::Header */}
                <div className='card-header' id='kt_help_header'>
                    <h5 className='card-title fw-bold text-gray-600'>{tipo === 0 ? 'Arma tu pizza' : 'Pizza por mitades'}</h5>

                    <div className='card-toolbar'>
                        <button
                            type='button'
                            className='btn btn-sm btn-icon explore-btn-dismiss me-n5'
                            id='kt_help_close'
                        >
                            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2' />
                        </button>
                    </div>
                </div>
                {/* end::Header */}

                {/* begin::Body */}
                <div className='card-body' id='kt_help_body'>
                    {/* begin::Content */}
                    <div
                        id='kt_help_scroll'
                        className='hover-scroll-overlay-y'
                        data-kt-scroll='true'
                        data-kt-scroll-height='auto'
                        data-kt-scroll-wrappers='#kt_help_body'
                        data-kt-scroll-dependencies='#kt_help_header'
                        data-kt-scroll-offset='5px'
                    >

                        {tipo === 0 ? <ArmaPizza pizzaArmar={pizzaArmar} setPizzaArmar={setPizzaArmar} addPizzaArmar={addPizzaArmar}/> : 
                        <CrearPizza 
                                pizzaPorMitades={pizzaPorMitades} 
                                setPizzaPorMitades={setPizzaPorMitades} 
                                addPizzaPorMitades={addPizzaPorMitades}/>}
                        </div>
                    {/* end::Content */}
                </div>
                {/* end::Body */}
            </div>
            {/* end::Card */}
        </div>
    )
}

export { DrawerArmar }
