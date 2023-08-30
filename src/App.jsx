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

  const handleNuevoGasto = () => {
    setModal(true);
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

      {modal && <Modal setModal={setModal}/>}
    </>
  )
}

export default App
