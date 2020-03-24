import { Characters, Character } from '../types'

export const getRandomCharacter = (set: Characters): Character => {
	return set[Math.floor(Math.random() * set.length)]
}
