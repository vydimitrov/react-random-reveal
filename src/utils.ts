import { Props, Characters } from './types'
import { easing, getEasingInterval } from './easing'

export const DEFAULT_DURATION = 2
const DEFAULT_CHARACTER_SET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

export const getRandomCharacter = (set: Characters = DEFAULT_CHARACTER_SET) =>
  set[Math.floor(Math.random() * set.length)]

/**
 * returns an array of 2 numbers where the first one is
 * the duration of the random characters and the second one is the
 * the revealing duration
 */

const getPartsTime = (duration: number, revealDuration: number) => {
  if (revealDuration === 0) {
    return [duration, 0]
  }

  let revealFraction = revealDuration > 1 ? 1 : revealDuration
  revealFraction = revealFraction < 0 ? 0 : revealFraction

  const revealDurationSec = duration * revealFraction
  return [duration - revealDurationSec, revealDurationSec]
}

/**
 * returns an array of objects where each object contains data for each character
 */

export const getCharactersData = ({
  characters,
  duration = DEFAULT_DURATION,
  revealDuration = 0.6,
  revealEasing = 'linear',
  ignoreCharacterSet,
}: Props) => {
  const charactersArray = Array.isArray(characters)
    ? characters
    : characters.split('')
  const [randomSec, revealingSec] = getPartsTime(duration, revealDuration)
  const easingFunc = easing[revealEasing]
  const interval = getEasingInterval(charactersArray, ignoreCharacterSet)
  let step = 0

  const getRevealTime = (isIgnored: boolean): number => {
    if (isIgnored || revealDuration === 0) {
      return duration
    }

    const revealTime = easingFunc(step * interval, 0, revealingSec, 1)
    step += 1

    return randomSec + revealTime
  }

  return charactersArray.map((character) => {
    const isIgnored =
      !!ignoreCharacterSet?.find(
        (ignoreCharacter) => ignoreCharacter === character
      ) ?? false

    return {
      character,
      isIgnored,
      revealTime: getRevealTime(isIgnored),
    }
  })
}
