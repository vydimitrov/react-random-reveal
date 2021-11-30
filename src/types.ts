import { Props as ElapsedTimeProps } from 'use-elapsed-time'

export type Easing = 'easeInQuad' | 'easeOutQuad' | 'linear' | 'random'
export type Character = string
export type Characters = Array<Character>
export type RevealCharacters = Character | Characters
export type CharactersRequired = {
  0: Character
} & Characters

export interface Props {
	/** Play and pause reveal animation */
  isPlaying: boolean
	/** Characters to reveal in the end of the duration. These could be letters, numbers, words, emojis or custom component */
  characters: RevealCharacters
	/** Animation duration in seconds. Default to 2 */
  duration?: number
	/** Characters change speed from 0 to 10. At 10, new the characters will be shown on each frame, approximately every 16.6ms. Default: 8 */
  speed?: number
	/** The duration to reveal all characters is represented as a fraction of the total duration. This is a number between 0 and 1. When set to 0, all characters will be revealed in the end of the duration at once. When set to 1, characters will start revealing from the beginning of the duration. Default: 0.6 */
  revealDuration?: number
  /** The easing function used to reveal characters during the reveal duration. Default: linear */
  revealEasing?: Easing
	/** Characters that will be used during the random characters run. Default: english alphabet */
  characterSet?: CharactersRequired
	/** Characters that won't be animated and will always be revealed. Can be used to ignore animating _space_ or any special characters */
  ignoreCharacterSet?: Characters
	/** On animation complete event handler */
  onComplete?: ElapsedTimeProps['onComplete']
}

export type CharacterData = {
  character: Character
  isIgnored: boolean
  revealTime: number
}

export type CharactersData = Array<CharacterData>
