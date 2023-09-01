import React, { useEffect, useState } from 'react'
import CerrarBtn from "../src/img/cerrar.svg"
import Mensaje from './Mensaje';
const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    //Para el error
    const [mensaje, setMensaje] = useState('');

    //Para los Inputs
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');

    //Estos nos serviran para usarlos en la funcion guardarGasto, iran como vacios si es NUEVO, o CON INFORMACION SI YA EXISTEN
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    //Este useEffect nos servira para que cuando cargue el componente de Modal, SI ES QUE gastoEditar tiene algo, entonces es que estamos editando y queremos que llene los campos del formulario, si no, pues no hagas nada, todo normal, se llenaran los campos a manopla
    useEffect(()=>{
        if(Object.keys(gastoEditar.length > 0)){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, [])
    
    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({}); //REINICIANDO EL STATE, ya que si le damos swipe a editar y lo cerramos luego luego (no editamos nada), ahi se queda el state con el objeto

        setTimeout(() => {
            setModal(false);
        }, 1000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validando
        //Nota, el if tambien podria ser if(nombre === '' || cantidad === '' || categoria === '')
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son Obligatorios')
            setTimeout(() => {
                setMensaje('');
            }, 1000);
            return;
        }

        //Una vez pasada la validacion usaremos la funcion guardarGasto para crear el objeto
        guardarGasto({nombre, cantidad, categoria, id, fecha});
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarBtn} 
            alt="cerrar-modal" 
            onClick={ocultarModal}
            />
        </div>

        <form 
            className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.nombre ? 'Editar' : 'Nuevo Gasto'}</legend>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input type="text" 
                id='nombre'
                placeholder='Añade el nombre del Gasto'
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input type="number" 
                id='cantidad'
                placeholder='Añade la cantidad del Gasto e.j. 300'
                value={cantidad}
                onChange={(e)=> setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select  id="categoria" value={categoria} onChange={(e)=> setCategoria(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input type="submit" value={gastoEditar.nombre ? 'Editar' : 'Añadir Gasto'} />
        </form>
    </div>
  )
}

export default Modal