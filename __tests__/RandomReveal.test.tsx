import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { RandomReveal } from '../src'

const useElapsedTime = require('use-elapsed-time')
const mockedMathRandom = jest.spyOn(global.Math, 'random')

const fixture = {
	isPlaying: false,
	duration: 10,
	characters: 'hello world',
}

const setMockMathRandom = () => {
	mockedMathRandom
		.mockReturnValueOnce(0.125)
		.mockReturnValueOnce(0.426)
		.mockReturnValueOnce(0.231)
		.mockReturnValueOnce(0.7564)
		.mockReturnValueOnce(0.983)
		.mockReturnValueOnce(0.712)
		.mockReturnValueOnce(0.9)
		.mockReturnValueOnce(0.001)
		.mockReturnValueOnce(0.514)
		.mockReturnValueOnce(0.851)
		.mockReturnValueOnce(0.734)
		.mockReturnValue(0.5)
}

afterEach(() => {
	useElapsedTime.__resetElapsedTime()
	mockedMathRandom.mockReset()
})

describe('functional tests', () => {
	it.each`
		input                                                                | expectedResult     | charactersType
		${'random reveal'}                                                   | ${'random reveal'} | ${'string'}
		${['r', 'a', 'n', 'd', 'o', 'm', ' ', 'r', 'e', 'v', 'e', 'a', 'l']} | ${'random reveal'} | ${'array'}
	`(
		'should reveal all characters at the end of the duration when characters type is $charactersType',
		({ input, expectedResult }) => {
			useElapsedTime.__setElapsedTime(10000)

			const { getByText } = render(
				<RandomReveal {...fixture} characters={input} />
			)
			expect(getByText(expectedResult)).toBeInTheDocument()
		}
	)

	it('should reveal the first character at the beginning of the reveal duration', () => {
		useElapsedTime.__setElapsedTime(4000)
		const characters = 'be cool'

		mockedMathRandom.mockReturnValue(0.5)

		const { getByText } = render(
			<RandomReveal
				{...fixture}
				characters={characters}
				duration={8}
				revealDuration={0.5}
			/>
		)

		expect(getByText('bnnnnnn')).toBeInTheDocument()
	})

	it('should reveal all characters at the end of the duration if the reveal duraiton is 0', () => {
		useElapsedTime.__setElapsedTime(0)
		const characters = 'yes'

		setMockMathRandom()

		const getComponent = () => (
			<RandomReveal
				{...fixture}
				characters={characters}
				duration={8}
				revealDuration={0}
			/>
		)

		const { getByText, rerender } = render(getComponent())

		expect(getByText('dlg')).toBeInTheDocument()

		useElapsedTime.__setElapsedTime(7800)
		rerender(getComponent())
		expect(getByText('dlg')).toBeInTheDocument()

		useElapsedTime.__setElapsedTime(8000)
		rerender(getComponent())
		expect(getByText('yes')).toBeInTheDocument()
	})

	it('should use characters from the characterSet provided', () => {
		useElapsedTime.__setElapsedTime(1000)
		const characters = 'благодаря'

		mockedMathRandom
			.mockReturnValueOnce(0.004)
			.mockReturnValueOnce(0.6234)
			.mockReturnValueOnce(0.3745)
			.mockReturnValueOnce(0.9999)
			.mockReturnValueOnce(0.2449)
			.mockReturnValue(0.5)

		const { getByText } = render(
			<RandomReveal
				{...fixture}
				characters={characters}
				characterSet={['ю', 'й', 'ъ', 'ч', 'з', 'ж']}
			/>
		)

		expect(getByText('ючъжйчччч')).toBeInTheDocument()
	})

	it('should not randomize characters that are included in the ignoreCharacterSet', () => {
		useElapsedTime.__setElapsedTime(1000)
		const characters = 'be cool!'
		const ignoreCharacterSet = [' ', '!']

		mockedMathRandom.mockReturnValue(0.5)

		const { getByText } = render(
			<RandomReveal
				{...fixture}
				characters={characters}
				ignoreCharacterSet={ignoreCharacterSet}
			/>
		)

		expect(getByText('nn nnnn!')).toBeInTheDocument()
	})

	it('should pass isPlaying and config options to useElapsedTime', () => {
		const isPlaying = true
		const onComplete = jest.fn()

		render(
			<RandomReveal
				{...fixture}
				isPlaying={isPlaying}
				onComplete={onComplete}
			/>
		)

		expect(useElapsedTime.__getIsPlaying()).toBe(isPlaying)
		expect(useElapsedTime.__getConfig()).toEqual({
			durationMilliseconds: 10000,
			onComplete,
		})

		useElapsedTime.__resetIsPlaying()
		useElapsedTime.__resetConfig()
	})

	it('should start revealing characters from the beginning if the revealDuration is more than 1, i.e. revealDuration will be set to 1', () => {
		useElapsedTime.__setElapsedTime(0)
		const characters = 'be cool'

		mockedMathRandom.mockReturnValue(0.5)

		const { getByText } = render(
			<RandomReveal {...fixture} characters={characters} revealDuration={7} />
		)

		expect(getByText('bnnnnnn')).toBeInTheDocument()
	})

	it('should reveal all characters in the end of the duration if the revealDuration is less than 0, i.e. revealDuration will be set to 0', () => {
		useElapsedTime.__setElapsedTime(9999)
		const characters = 'be cool'

		mockedMathRandom.mockReturnValue(0.5)

		const getComponent = () => (
			<RandomReveal {...fixture} characters={characters} revealDuration={-2} />
		)

		const { getByText, rerender } = render(getComponent())

		expect(getByText('nnnnnnn')).toBeInTheDocument()

		useElapsedTime.__setElapsedTime(10000)
		rerender(getComponent())
		expect(getByText('be cool')).toBeInTheDocument()
	})

	it('should not change the random characters if the component just rerenders, i.e. component rerenders based on external reason not useElpasedTime', () => {
		useElapsedTime.__setElapsedTime(1000)
		const characters = 'yes'

		setMockMathRandom()

		const getComponent = () => (
			<RandomReveal {...fixture} characters={characters} />
		)

		const { getByText, rerender } = render(getComponent())

		expect(getByText('dlg')).toBeInTheDocument()

		useElapsedTime.__setElapsedTime(1000)
		rerender(getComponent())
		expect(getByText('dlg')).toBeInTheDocument()
	})
})

describe('speed testing', () => {
	const renderComponentForFrame = (speed: number) => {
		useElapsedTime.__setElapsedTime(16)
		const characters = 'yes'

		setMockMathRandom()

		const getComponent = () => (
			<RandomReveal {...fixture} characters={characters} speed={speed} />
		)

		const { getByText, rerender } = render(getComponent())
		expect(getByText('dlg')).toBeInTheDocument()

		return (time: number, expecetedCharacters: string): void => {
			useElapsedTime.__setElapsedTime(time)
			rerender(getComponent())

			expect(getByText(expecetedCharacters)).toBeInTheDocument()
		}
	}

	it('should get new random characters on every frame when the speed is 10', () => {
		const renderNewFrame = renderComponentForFrame(10)
		renderNewFrame(32, 'tzs')
	})

	it('should get new random characters on every third frame when the speed is 8', () => {
		const renderNewFrame = renderComponentForFrame(8)

		renderNewFrame(32, 'dlg')
		renderNewFrame(48, 'dlg')
		renderNewFrame(64, 'tzs')
	})
})

describe('easing testing', () => {
	it.each`
		easing
		${'easeOutQuad'}
		${'easeInQuad'}
		${'random'}
	`(
		'should reveal all characters at the end of the duration when the easing is set to $easing',
		({ easing }) => {
			useElapsedTime.__setElapsedTime(10000)

			setMockMathRandom()

			const { getByText } = render(
				<RandomReveal {...fixture} revealEasing={easing} />
			)
			expect(getByText('hello world')).toBeInTheDocument()
		}
	)
})

describe('behavior tests', () => {
	it('should fire onComplete when useElapsedTime onComplete is called', () => {
		const isPlaying = true
		const onComplete = jest.fn()

		render(
			<RandomReveal
				{...fixture}
				isPlaying={isPlaying}
				onComplete={onComplete}
			/>
		)

		useElapsedTime.__fireOnComplete()
		expect(onComplete).toHaveBeenCalled()

		useElapsedTime.__resetConfig()
	})
})
