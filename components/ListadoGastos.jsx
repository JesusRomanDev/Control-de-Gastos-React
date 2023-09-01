import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>

        {filtro ? ( /* si hay un filtro, entonces filtrame los gastosFiltrados, si no, iterame y muestrame todos los gastos que hay */
                  <>
                    <h2>{gastosFiltrados.length ? 'Gastos:' : 'No hay Gastos en esta categoria'}</h2>
                    {gastosFiltrados.map(gasto => {
                      return <Gasto 
                      key={gasto.id}
                      gasto={gasto}
                      setGastoEditar={setGastoEditar}
                      eliminarGasto={eliminarGasto}
                      />
                    })} {/* aqui le pusimos los {} alrededor del gastosFiltrados.map ya que agregamos un fragment */}
                  </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos:' : 'No hay Gastos aun'}</h2>  
            {gastos.map(gasto => {
              return <Gasto 
              key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              />
            })}
          </>
        )}

    </div>
  )
}

export default ListadoGastos