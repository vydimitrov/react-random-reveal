import { Config } from 'use-elapsed-time'

export type OnComplete = Config['onComplete']

export type Easing = 'easeInQuad' | 'easeOutQuad' | 'linear' | 'random'

export type Character = string
export type Characters = Array<Character>
export type RevealCharacters = Character | Characters
export type CharactersRequired = {
	0: Character
} & Characters

export type RandomRevealProps = {
	isPlaying: boolean
	duration: number
	characters: RevealCharacters
	speed?: number
	revealDuration?: number
	revealEasing?: Easing
	characterSet?: CharactersRequired
	ignoreCharacterSet?: Characters
	onComplete?: OnComplete
}

export type CharacterData = {
	character: Character
	isIgnored: boolean
	revealTime: number
}
export type CharactersData = Array<CharacterData>
