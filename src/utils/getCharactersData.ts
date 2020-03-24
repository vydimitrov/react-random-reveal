import { Easing, Character, CharactersData } from '../types'
import { easings } from '.'

type Data = {
	characters: Character
	duration: number
	revealDuration: number
	revealEasing: Easing
	ignoreCharacterSet: Array<Character>
}

/**
 * returns an array of 2 numbers where the first one is
 * the duration of the flipping characters and the second one is the
 * the revealing duration
 */

const getPartsTime = (
	duration: number,
	revealDuration: number
): Array<number> => {
	if (revealDuration === 0) {
		return [duration, 0]
	}

	let revealFraction = revealDuration > 1 ? 1 : revealDuration
	revealFraction = revealFraction < 0 ? 0 : revealFraction
	const revealDurationSec = duration * revealDuration
	return [duration - revealDurationSec, revealDurationSec]
}

const getEasingInterval = (
	charactersArray: Array<string>,
	ignoreCharacterSet: Array<Character>
): number => {
	const charactersToAnimate = charactersArray.filter(
		(character) => !ignoreCharacterSet.includes(character)
	).length
	return 1 / (charactersToAnimate - 1)
}

/**
 * returns an array of objects where each object contains data for each character
 */

export const getCharactersData = ({
	characters,
	duration,
	revealDuration,
	revealEasing,
	ignoreCharacterSet,
}: Data): CharactersData => {
	const charactersArray = characters.toString().split('')
	const [flippingSec, revealingSec] = getPartsTime(duration, revealDuration)
	const easingFunc = easings[revealEasing]
	const interval = getEasingInterval(charactersArray, ignoreCharacterSet)
	let step = 0

	const getRevealTime = (isIgnored: boolean): number => {
		if (isIgnored || revealDuration === 0) {
			return duration
		}

		const revealTime = easingFunc(step * interval, 0, revealingSec, 1)
		step += 1

		return flippingSec + revealTime
	}

	return charactersArray.map((character) => {
		const isIgnored = ignoreCharacterSet.includes(character)

		return {
			character,
			isIgnored,
			revealTime: getRevealTime(isIgnored),
		}
	})
}
