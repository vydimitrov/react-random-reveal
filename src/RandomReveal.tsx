import React from 'react'
import { Props } from './types'
import { useRandomReveal } from '.'

export const RandomReveal = (props: Props) => {
  const nextCharacters = useRandomReveal(props)

  return <>{nextCharacters}</>
}
