const SeccionesMenu = ({setCatalogo, handlePrecio, setTitulo }: any) => {
  const handleOptionChange = (item: any) => {
    handlePrecio(item.precio)
  }

  return (
    <div className='section-pizza padding-side'>
      <div className='title-item'>
        <h4>{setTitulo}</h4>
        <span>Requerido</span>
      </div>
      {setCatalogo.map((item: {id: number; nombre: string; precio: any}) => (
        <div
          className='section-pizza-item'
          style={{display: 'flex', justifyContent: 'space-between', alignItems: 'left'}}
        >
          <div>
            <h5>{item.nombre}</h5>
          </div>
          <div className='div-radio'>
            <span>{item.precio != null ? `+Q${item.precio}` : ''}</span>
          </div>
          <input type='radio' name='tamanio' value={item.nombre} required={true} />
        </div>
      ))}
    </div>
  )
}

export default SeccionesMenu
