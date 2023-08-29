import React, { useState } from 'react'
import Header from './Header'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto}) => {

    const [mensaje, setMensaje] = useState(''); //este componente solo lo usaremos en este componente

    const handlePresupuesto = (e) =>{
        e.preventDefault();
        if(!Number(presupuesto) || Number(presupuesto) < 0){
            setMensaje('No es un presupuesto valido')
        }else{
            setMensaje('Presupuesto valido')
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} action="" className='formulario'>
                <div className='campo'>
                    <label>Definir Presupuesto</label>

                    <input 
                        type="text" 
                        className='nuevo-presupuesto'
                        placeholder='Añade tu Presupuesto'
                        value={presupuesto}
                        onChange={(e)=>setPresupuesto(e.target.value)} //la funcion modificadora
                    />

                    <input type="submit" value="Añadir"/>

                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>} {/* mensaje ahora tiene etiqueta de apertura y cierre, eso es porque en el componente de Mensaje asi delcaramos sus props, entonces lo que esta dentro de mensaje es el children, el otro prop es para la clase que viene siendo el tipo error */}
                </div>
            </form>
        </div>
    )
}

export default NuevoPresupuesto