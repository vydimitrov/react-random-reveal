import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { RandomReveal } from '../src/index'

const RevealCharacters = () => {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div>
      <h1>
        <RandomReveal
          duration={2}
          isPlaying={isPlaying}
          characters="Hello World"
        />
      </h1>
      <br />
      <button onClick={() => setIsPlaying((prev) => !prev)}>
        Toggle Playing
      </button>
    </div>
  )
}

ReactDOM.render(<RevealCharacters />, document.querySelector('#root'))
