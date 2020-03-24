import React, { useMemo } from 'react'
import { FlipFlopProps, CharactersData } from './types'
import { useFlipCharacters } from './hooks'
import { defaultCharacterSet, getCharactersData } from './utils'

const useFlipFlop = (props: FlipFlopProps): string => {
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

	return useFlipCharacters({
		isPlaying,
		speed,
		characterSet,
		onComplete,
		charactersData,
		durationMilliseconds,
	})
}

const FlipFlop = (props: FlipFlopProps) => {
	const nextCharacters = useFlipFlop(props)

	return <>{nextCharacters}</>
}

export { FlipFlop, useFlipFlop }
