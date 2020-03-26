import { CharactersRequired, Character } from '../types'

export const getRandomCharacter = (set: CharactersRequired): Character => {
	return set[Math.floor(Math.random() * set.length)]
}
