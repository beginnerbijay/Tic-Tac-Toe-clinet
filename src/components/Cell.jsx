import React from 'react'

function Cell({id,handleCellClick,text}) {
  return (
    <div id={id} className="cell" onClick={handleCellClick}>
      {text}
    </div>
  )
}

export default Cell