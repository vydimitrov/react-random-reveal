import { easings } from '.'
import { Easing, Characters, RevealCharacters, CharactersData } from '../types'

type Data = {
	characters: RevealCharacters
	duration: number
	revealDuration: number
	revealEasing: Easing
	ignoreCharacterSet: Characters
}

/**
 * returns an array of 2 numbers where the first one is
 * the duration of the random characters and the second one is the
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

	const revealDurationSec = duration * revealFraction
	return [duration - revealDurationSec, revealDurationSec]
}

const getEasingInterval = (
	charactersArray: Characters,
	ignoreCharacterSet: Characters
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
	const charactersArray = Array.isArray(characters)
		? characters
		: characters.split('')
	const [randomSec, revealingSec] = getPartsTime(duration, revealDuration)
	const easingFunc = easings[revealEasing]
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
		const isIgnored = ignoreCharacterSet.includes(character)

		return {
			character,
			isIgnored,
			revealTime: getRevealTime(isIgnored),
		}
	})
}
