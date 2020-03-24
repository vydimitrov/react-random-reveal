import { Config } from 'use-elapsed-time'

export type OnComplete = Config['onComplete']

export type Easing = 'easeInQuad' | 'easeOutQuad' | 'linear' | 'random'

export type Character = string | number
export type Characters = {
	0: Character
} & Array<Character>

export type RandomRevealProps = {
	isPlaying: boolean
	duration: number
	characters: Character
	speed?: number
	revealDuration?: number
	revealEasing?: Easing
	characterSet?: Characters
	ignoreCharacterSet?: Array<Character>
	onComplete?: OnComplete
}

export type CharacterData = {
	character: string
	isIgnored: boolean
	revealTime: number
}
export type CharactersData = Array<CharacterData>
