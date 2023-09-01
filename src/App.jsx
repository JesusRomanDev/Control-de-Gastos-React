import { useEffect, useState } from 'react'
import Header from '../components/Header'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"
import Modal from '../components/Modal';
import { generarId } from './helpers';
import ListadoGastos from '../components/ListadoGastos';

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0); //estos van para el formulario, pasando primero por el Header luego a Nuevo Presupuesto que es donde esta el formulario NOTA: se edito para hacerlo compatible con LocalStorage antes su useState solo era 0

  //Este state nos servira para mostrar la imagen del + y agregar abrir el componente control presupuesto donde se muestra el disponible, gastado, presupuesto
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  //Este state nos servira para abrir el modal, este se ayuda junto con el state de arriba, ya que isValidPresupuesto abre la imagen del +, entonces si le das click (ejecuta la funcion handleNuevoGasto) ahi entra este state
  const [modal, setModal] = useState(false);

  //Creamos otro state que sera animarModal, este nos servira para poner en la funcion handleNuevoGasto un setTimeOut y pase de que la clase sea un opacity 0 a un opacity 1, setAnimarModal va hacia la funcion handleNuevoGasto y el componente Modal y animarModal va a el componente Modal, en si este Hook nos servira para mostrar el texto blanco del formulario y todo lo demas que no sea el fondo negro del modal
  const [animarModal, setAnimarModal] = useState(false);
  //Nota IMPORTANTE: al parecer cuando usamos un useState que su valor es un booleano (true/false), el true/false de la variable se usa para los ternarios (en el HTML/return), en cambio la funcion modificadora si la usamos directamente al poner setAnimarModal(false/true), solo para modificar

  //Para el arreglo de objetos, este lo usaremos en la funcion de guardarGasto y lo pasaremos a el componente ControlPresupuesto, pasando primero por Header, este se edito, antes su useState era [], pero para hacerlo funcional con LocalStorage, asi quedo
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
  
  //Definiendo un state mas para Gasto, pero primero pasando por ListadoGastos, este iniciara como objeto vacio para poder llenarse mas tarde, esta funcion modificadora ira a la funcion de LeadingAction cuando se de swipe a editar
  const [gastoEditar, setGastoEditar] = useState({});

  //Agregando un useEffect, para que cuando demos swipe se abra el modal y nos llene la informacion, este useeffect reaccionara cuando cambie gastoEditar
  useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
      //Lo que hace este if es lo mismo que llamar a handleNuevoGasto salvo que aqui nuestro Objeto no es uno nuevo
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 1000);
    }
  }, [gastoEditar])

  //useEffect para el LocalStorage para setearlo
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  //useEffecr para setear los gastos en Local Storage Nota: aqui si usamos JSON.stringify porque es un arreglo, el de arriba no
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  //useEffect para obtener el item y si es mayor a 0, entonces es un presupuesto valido
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({}); //Nosotros sabemos que sera un Objeto Nuevo, esto nos ayuda porque cuando usamos el swipe editar, se llena la info del formulario, pero una vez que hayamos terminado, si queremos agregar un nuevo gasto se quedara con la info anterior

    setTimeout(() => {
      setAnimarModal(true);
    }, 1000);
  }

  //Creando una funcion en vez de un Hook (simplemente para hacerlo de forma diferente) para pasarselo al componente Modal
  const guardarGasto = (gasto) => { //tomando como parametro un objeto de gasto
    console.log(gasto);
    if(gasto.id){ //si gasto tiene un ID es que ya se habia creado ese objeto, por lo tanto se debe actualizar, de otra manera es nuevo
      //Actualizar
      //Iremos iterando por todo el array de objetos de gastos, si en alguno de los objetos que estamos iterando es igual al nuevo gasto entonces ese gasto ya existe, por lo tanto regresame este nuevo gasto (actualizado), de otra manera si no hay id parecido retorname tal cual esta (no le modifiques nada)
      const gastosActualizados = gastos.map(gastoState =>{
        return gastoState.id === gasto.id ? gasto : gastoState
      })
      setGastos(gastosActualizados);
      setGastoEditar({}); //COMO CONSEJO SIEMPRE ES BUENO REINICIAR EL STATE
    }else{
      //Nuevo Gasto
      gasto.id = generarId(); //Nota importante: AQUI SE CREA EL ID, donde se llama la funcion de guardarGasto tenemos un parametro de id, pero va VACIO ya que le estamos pasando UN OBJETO COMO ARGUMENTO CUANDO LO LLAMAMOS, va asi id=''
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    //Para que se cierre cuando agregamos el gasto
    setAnimarModal(false);

    setTimeout(() => {
        setModal(false);
    }, 1000);
  }

  //Para eliminar el gasto usaremos una funcion, esta se pasara a Gasto, pero pasando antes por ListadoGastos
  const eliminarGasto = (id) =>{
    const gastosActualizadosEliminados = gastos.filter(gastoEliminado => gastoEliminado.id !== id);
    setGastos(gastosActualizadosEliminados);
  }

  return (
    <div className={modal ? 'fijar' : ''}> {/* fijar nos permitira tener todo el alto de la pantalla cuando tengamos ya gastos y asi ocupe toda la pantalla y no se quede a medias height: 100vh y overflow:hidden */}
      <Header 
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
            gastos={gastos} //pasandole el array de gastos para mostrarlo
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} 
            alt="iconoNuevoGasto" 
            onClick={handleNuevoGasto}
            />
            
          </div>
        </>
      )}

      {modal && <Modal 
      setModal={setModal}
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}
      guardarGasto={guardarGasto}
      gastoEditar={gastoEditar} //pasandole el gastoEditar para que llene los campos en Modal
      setGastoEditar={setGastoEditar} //es para resetear el state al finalizar un gasto editado
      />}
    </div>
  )
}

export default App
