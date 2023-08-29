import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div> /* en el classname en vez de "" usamos {} para asi poder usar el prop de tipo */
  )
}

export default Mensaje