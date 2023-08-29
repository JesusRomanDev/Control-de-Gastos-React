import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto}) => {
    
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? ( /* si es true en isValidPresupuesto entonces imprimeme lo de abajo, de otra manera imprimime el componente de NuevoPresupuesto */
            <p>Control Presupuesto</p>
        ) : (
            <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )}
    </header>
    
  )
}

export default Header