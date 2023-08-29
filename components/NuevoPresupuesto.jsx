import React, { useState } from 'react'
import Header from './Header'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState(''); //este componente solo lo usaremos en este componente

    const handlePresupuesto = (e) =>{
        e.preventDefault();
        if(!presupuesto || presupuesto < 0){ //si no hay presupuesto o el presupuesto es menor que 0
            setMensaje('No es un presupuesto valido');
            return
        }
        setMensaje('');
        setIsValidPresupuesto(true);

    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} action="" className='formulario'>
                <div className='campo'>
                    <label>Definir Presupuesto</label>

                    <input 
                        type="number" 
                        className='nuevo-presupuesto'
                        placeholder='Añade tu Presupuesto'
                        value={presupuesto}
                        onChange={(e)=>setPresupuesto(Number(e.target.value))} //la funcion modificadora
                    />

                    <input type="submit" value="Añadir"/>

                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>} {/* mensaje ahora tiene etiqueta de apertura y cierre, eso es porque en el componente de Mensaje asi delcaramos sus props, entonces lo que esta dentro de mensaje es el children, el otro prop es para la clase que viene siendo el tipo error */}
                </div>
            </form>
        </div>
    )
}

export default NuevoPresupuesto