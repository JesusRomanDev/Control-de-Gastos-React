import React, { useEffect, useState } from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos}) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    //Registrando un nuevo State para la barra de Progreso
    const [procentaje, setPorcentaje] = useState(0);

    //Reaccionando cada vez que cambie gastos
    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto)=>{
            return gasto.cantidad + total
        }, 0)

        const totalDisponible = presupuesto - totalGastado;

        //Calcular el porcentaje Gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2); //tendra max 2 digitos decimales la operacion

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 2000);

        setDisponible(totalDisponible);
        setGastado(totalGastado);
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
            value={procentaje} 
            styles={buildStyles({ /* buildstyles es una funcion y dentro le pondremos un objeto con los estilos que querramos */
                pathColor:'#2B82F6',
                trailColor: '#F5F5F5'
            })}
            text={`${procentaje}% gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>

            <p>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto