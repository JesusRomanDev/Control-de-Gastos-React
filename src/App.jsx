import { useState } from 'react'
import Header from '../components/Header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from '../components/Modal';

function App() {
  const [presupuesto, setPresupuesto] = useState(0); //estos van para el formulario, pasando primero por el Header luego a Nuevo Presupuesto que es donde esta el formulario

  //Este state nos servira para mostrar la imagen del + y agregar abrir el componente control presupuesto donde se muestra el disponible, gastado, presupuesto
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  //Este state nos servira para abrir el modal, este se ayuda junto con el state de arriba, ya que isValidPresupuesto abre la imagen del +, entonces si le das click (ejecuta la funcion handleNuevoGasto) ahi entra este state
  const [modal, setModal] = useState(false);

  //Creamos otro state que sera animarModal, este nos servira para poner en la funcion handleNuevoGasto un setTimeOut y pase de que la clase sea un opacity 0 a un opacity 1, setAnimarModal va hacia la funcion handleNuevoGasto y el componente Modal y animarModal va a el componente Modal, en si este Hook nos servira para mostrar el texto blanco del formulario y todo lo demas que no sea el fondo negro del modal
  const [animarModal, setAnimarModal] = useState(false);
  //Nota IMPORTANTE: al parecer cuando usamos un useState que su valor es un booleano (true/false), el true/false de la variable se usa para los ternarios (en el HTML/return), en cambio la funcion modificadora si la usamos directamente al poner setAnimarModal(false/true), solo para modificar

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 1000);
  }

  return (
    <>
      <Header 
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
            <div className='nuevo-gasto'>
              <img src={IconoNuevoGasto} 
              alt="iconoNuevoGasto" 
              onClick={handleNuevoGasto}
              />
              
            </div>
      )}

      {modal && <Modal 
      setModal={setModal}
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}
      />}
    </>
  )
}

export default App
