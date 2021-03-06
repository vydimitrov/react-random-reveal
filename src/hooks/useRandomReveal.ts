import { useMemo } from 'react'
import { useRandomCharacters } from '.'
import { RandomRevealProps, CharactersData } from '../types'
import {
	defaultCharacterSet,
	defaultIgnoreCharacterSet,
	getCharactersData,
} from '../utils'

export const useRandomReveal = (props: RandomRevealProps): string => {
	const {
		isPlaying,
		duration,
		characters,
		onComplete,
		speed = 8,
		revealDuration = 0.6,
		revealEasing = 'linear',
		characterSet = defaultCharacterSet,
		ignoreCharacterSet = defaultIgnoreCharacterSet,
	} = props

	const durationMilliseconds = useMemo(() => duration * 1000, [duration])

	const charactersData = useMemo((): CharactersData => {
		return getCharactersData({
			characters,
			duration: durationMilliseconds,
			revealDuration,
			revealEasing,
			ignoreCharacterSet,
		})
	}, [duration, characters, revealDuration, revealEasing, ignoreCharacterSet])

	return useRandomCharacters({
		isPlaying,
		speed,
		characterSet,
		onComplete,
		charactersData,
		durationMilliseconds,
	})
}
