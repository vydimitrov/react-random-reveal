import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { RandomReveal } from '../src/index'
import { icons } from './assets/Icons'

const getImage = (src: string, index: number | string = src) => (
  <img key={index} src={src} width="100" />
)

const RevealCharacters = () => {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div>
      <h1>
        <RandomReveal
          duration={2}
          isPlaying={isPlaying}
          ignoreCharacterSet={[' ']}
          characters="Hello World"
        />
      </h1>
      <br />
      <RandomReveal
        duration={3}
        isPlaying={isPlaying}
        characters={[icons[0], icons[1], icons[2]]}
        characterSet={icons}
      />
    </div>
  )
}

ReactDOM.render(<RevealCharacters />, document.querySelector('#root'))
