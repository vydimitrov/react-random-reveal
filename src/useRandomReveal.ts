import { useMemo, useRef } from 'react'
import { useElapsedTime } from 'use-elapsed-time'
import { Props, CharactersData } from './types'
import {
  defaultCharacterSet,
  defaultIgnoreCharacterSet,
  getCharactersData,
  getRandomCharacter,
} from './utils'

export const useRandomReveal = ({
  isPlaying,
  characters,
  onComplete,
  duration = 2,
  speed = 8,
  revealDuration = 0.6,
  revealEasing = 'linear',
  characterSet = defaultCharacterSet,
  ignoreCharacterSet = defaultIgnoreCharacterSet,
}: Props): string => {
  const prevTime = useRef(-1) // set to different value than 0 for first  time
  const iterations = useRef(0)
  const nextCharacters = useRef('')
  const frames = useMemo(() => 11 - speed, [speed])
  const charactersData = useMemo(
    (): CharactersData =>
      getCharactersData({
        characters,
        duration,
        revealDuration,
        revealEasing,
        ignoreCharacterSet,
      }),
    [duration, characters, revealDuration, revealEasing, ignoreCharacterSet]
  )

  const { elapsedTime } = useElapsedTime({ isPlaying, duration, onComplete })

  if (prevTime.current === elapsedTime) {
    return nextCharacters.current
  }

  if (iterations.current % frames === 0 || elapsedTime === duration) {
    let result = ''
    const charactersDataLength = charactersData.length

    // the fastest way to iterate over an array
    for (let i = 0; i < charactersDataLength; i++) {
      const { character, isIgnored, revealTime } = charactersData[i]

      result +=
        isIgnored || elapsedTime >= revealTime
          ? character
          : getRandomCharacter(characterSet)
    }

    nextCharacters.current = result
  }

  iterations.current += 1
  prevTime.current = elapsedTime

  return nextCharacters.current
}
