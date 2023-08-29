import { useState } from 'react'
import Header from '../components/Header'

function App() {
  const [presupuesto, setPresupuesto] = useState(0); //estos van para el formulario, pasando primero por el Header luego a Nuevo Presupuesto que es donde esta el formulario

  return (
    <>
      <Header 
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      />
    </>
  )
}

export default App
