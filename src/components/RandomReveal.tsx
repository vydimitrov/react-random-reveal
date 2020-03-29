import React from 'react'
import { RandomRevealProps } from '../types'
import { useRandomReveal } from '../hooks'

export const RandomReveal = (props: RandomRevealProps) => {
	const nextCharacters = useRandomReveal(props)

	return <>{nextCharacters}</>
}