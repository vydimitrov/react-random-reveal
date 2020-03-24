import { useMemo, useRef } from 'react'
import { useElapsedTime } from 'use-elapsed-time'
import { Characters, OnComplete, CharactersData } from '../types'
import { getRandomCharacter } from '../utils'

type Data = {
	isPlaying: boolean
	speed: number
	durationMilliseconds: number
	characterSet: Characters
	onComplete: OnComplete
	charactersData: CharactersData
}

export const useRandomCharacters = ({
	isPlaying,
	speed,
	characterSet,
	onComplete,
	charactersData,
	durationMilliseconds,
}: Data): string => {
	const prevTime = useRef(-1) // set to different value than 0 for first  time
	const iterations = useRef(0)
	const nextCharacters = useRef('')
	const frames = useMemo(() => 11 - speed, [speed])

	const ellapsedTime = useElapsedTime(isPlaying, {
		durationMilliseconds,
		onComplete,
	})

	if (prevTime.current !== ellapsedTime) {
		if (
			iterations.current % frames === 0 ||
			ellapsedTime === durationMilliseconds
		) {
			let result = ''
			const charactersDataLength = charactersData.length

			// the fastest way to iterate over an array
			for (let i = 0; i < charactersDataLength; i++) {
				const { character, isIgnored, revealTime } = charactersData[i]

				result +=
					isIgnored || ellapsedTime >= revealTime
						? character
						: getRandomCharacter(characterSet)
			}

			nextCharacters.current = result
		}

		iterations.current += 1
		prevTime.current = ellapsedTime
	}

	return nextCharacters.current
}
