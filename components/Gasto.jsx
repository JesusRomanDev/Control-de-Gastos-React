import React from 'react'
import { formatearFecha } from '../src/helpers';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css"; 
import IconoAhorro from '../src/img/icono_ahorro.svg';
import IconoCasa from '../src/img/icono_casa.svg';
import IconoComida from '../src/img/icono_comida.svg';
import IconoGastos from '../src/img/icono_gastos.svg';
import IconoOcio from '../src/img/icono_ocio.svg';
import IconoSalud from '../src/img/icono_salud.svg';
import IconoSuscripciones from '../src/img/icono_suscripciones.svg';

//Aqui usaremos las propiedades computada de objetos, ya que categoria, su value tendra lo que va a ser de la propiedad del objeto creado aqui abajo
const diccionarioIconos = {
    ahorro : IconoAhorro,
    comida : IconoComida,
    casa : IconoCasa,
    gastos : IconoGastos,
    ocio : IconoOcio,
    salud : IconoSalud,
    suscripciones : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {categoria, nombre, cantidad, id, fecha} = gasto;
    
    const leadingActions = () =>{
      return  <LeadingActions>
                <SwipeAction onClick={()=>setGastoEditar(gasto)}> {/* gasto sera el OBJETO COMPLETO */}
                  Editar
                </SwipeAction>
              </LeadingActions>
    }

    const trailingActions = () =>{
      return  <TrailingActions>
                <SwipeAction 
                  onClick={()=>eliminarGasto(id)} 
                  destructive={true} /* prop que nos ayuda a que sea fluido cuando se elimina algun item */
                >
                  Eliminar
                </SwipeAction>
              </TrailingActions>
    }


  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
            <div className='contenido-gasto'>
              <img src={diccionarioIconos[categoria]} alt="icono-gasto" />
                <div className='descripcion-gasto'>
                    <p className='categoria'>{categoria}</p>

                    <p className='nombre-gasto'>{nombre}</p>

                    <p className='fecha-gasto'>Agregado el: {''} <span>{formatearFecha(fecha)}</span></p>
                </div>
            </div>
            <p className='cantidad-gasto'>${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto