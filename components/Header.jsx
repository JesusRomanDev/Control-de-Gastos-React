import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos}) => {
    
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? ( /* si es true en isValidPresupuesto entonces imprimeme lo de abajo, de otra manera imprimime el componente de NuevoPresupuesto */
            <ControlPresupuesto 
            presupuesto={presupuesto}
            gastos={gastos}
            />
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