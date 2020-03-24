import React, { useMemo } from 'react'
import { RandomRevealProps, CharactersData } from './types'
import { useRandomCharacters } from './hooks'
import { defaultCharacterSet, getCharactersData } from './utils'

const useRandomReveal = (props: RandomRevealProps): string => {
	const {
		isPlaying,
		duration,
		characters,
		onComplete,
		speed = 8,
		revealDuration = 0.6,
		revealEasing = 'linear',
		characterSet = defaultCharacterSet,
		ignoreCharacterSet = [],
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

const RandomReveal = (props: RandomRevealProps) => {
	const nextCharacters = useRandomReveal(props)

	return <>{nextCharacters}</>
}

export { RandomReveal, useRandomReveal }
