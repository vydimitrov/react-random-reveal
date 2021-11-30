import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { RandomReveal } from '.'

const useElapsedTime = require('use-elapsed-time')

const duration = 10
const fixture = {
  isPlaying: false,
  duration,
  characters: 'hello world',
}

describe('RandomReveal', () => {
  let mockedMathRandom: jest.SpyInstance

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

  beforeEach(() => {
    mockedMathRandom = jest.spyOn(Math, 'random')
  })

  afterEach(() => {
    useElapsedTime.__resetElapsedTime()
    mockedMathRandom.mockRestore()
  })

  describe('functional tests', () => {
    it.each`
      input                                                                | expectedResult     | charactersType
      ${'random reveal'}                                                   | ${'random reveal'} | ${'string'}
      ${['r', 'a', 'n', 'd', 'o', 'm', ' ', 'r', 'e', 'v', 'e', 'a', 'l']} | ${'random reveal'} | ${'array'}
    `(
      'reveals all characters at the end of the duration when characters type is $charactersType',
      ({ input, expectedResult }) => {
        useElapsedTime.__setElapsedTime(duration)

        render(<RandomReveal {...fixture} characters={input} />)
        expect(screen.getByText(expectedResult)).toBeVisible()
      }
    )

    it('reveals the first character at the beginning of the reveal duration', () => {
      useElapsedTime.__setElapsedTime(4)
      const characters = 'be cool'

      mockedMathRandom.mockReturnValue(0.5)

      render(
        <RandomReveal
          {...fixture}
          characters={characters}
          duration={8}
          revealDuration={0.5}
        />
      )

      expect(screen.getByText('bnnnnnn')).toBeInTheDocument()
    })

    it('reveals all characters at the end of the duration if the reveal duration is 0', () => {
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

      const { rerender } = render(getComponent())

      expect(screen.getByText('dlg')).toBeVisible()

      useElapsedTime.__setElapsedTime(7.8)
      rerender(getComponent())
      expect(screen.getByText('dlg')).toBeVisible()

      useElapsedTime.__setElapsedTime(8)
      rerender(getComponent())
      expect(screen.getByText('yes')).toBeVisible()
    })

    it('uses characters from the characterSet provided', () => {
      useElapsedTime.__setElapsedTime(1)
      const characters = 'благодаря'

      mockedMathRandom
        .mockReturnValueOnce(0.004)
        .mockReturnValueOnce(0.6234)
        .mockReturnValueOnce(0.3745)
        .mockReturnValueOnce(0.9999)
        .mockReturnValueOnce(0.2449)
        .mockReturnValue(0.5)

      render(
        <RandomReveal
          {...fixture}
          characters={characters}
          characterSet={['ю', 'й', 'ъ', 'ч', 'з', 'ж']}
        />
      )

      expect(screen.getByText('ючъжйчччч')).toBeVisible()
    })

    it('does not randomize characters that are included in the ignoreCharacterSet', () => {
      useElapsedTime.__setElapsedTime(1)
      const characters = 'be cool!'
      const ignoreCharacterSet = [' ', '!']

      mockedMathRandom.mockReturnValue(0.5)

      render(
        <RandomReveal
          {...fixture}
          characters={characters}
          ignoreCharacterSet={ignoreCharacterSet}
        />
      )

      expect(screen.getByText('nn nnnn!')).toBeVisible()
    })

    it('passes the config options to useElapsedTime', () => {
      const isPlaying = true
      const onComplete = jest.fn()

      render(
        <RandomReveal
          {...fixture}
          isPlaying={isPlaying}
          onComplete={onComplete}
        />
      )

      expect(useElapsedTime.__getConfig()).toEqual({
        isPlaying,
        duration,
        onComplete,
      })

      useElapsedTime.__resetIsPlaying()
      useElapsedTime.__resetConfig()
    })

    it('starts revealing characters from the beginning if the revealDuration is more than 1, i.e. revealDuration will be set to 1', () => {
      useElapsedTime.__setElapsedTime(0)
      const characters = 'be cool'

      mockedMathRandom.mockReturnValue(0.5)

      render(
        <RandomReveal {...fixture} characters={characters} revealDuration={7} />
      )

      expect(screen.getByText('bnnnnnn')).toBeInTheDocument()
    })

    it('reveals all characters in the end of the duration if the revealDuration is less than 0, i.e. revealDuration will be set to 0', () => {
      useElapsedTime.__setElapsedTime(9.9)
      const characters = 'be cool'

      mockedMathRandom.mockReturnValue(0.5)

      const getComponent = () => (
        <RandomReveal
          {...fixture}
          characters={characters}
          revealDuration={-2}
        />
      )

      const { rerender } = render(getComponent())

      expect(screen.getByText('nnnnnnn')).toBeInTheDocument()

      useElapsedTime.__setElapsedTime(duration)
      rerender(getComponent())
      expect(screen.getByText('be cool')).toBeInTheDocument()
    })

    it('does not change the random characters if the component just rerenders, i.e. component rerenders based on external reason not useElpasedTime', () => {
      useElapsedTime.__setElapsedTime(1)
      const characters = 'yes'

      setMockMathRandom()

      const getComponent = () => (
        <RandomReveal {...fixture} characters={characters} />
      )

      const { rerender } = render(getComponent())

      expect(screen.getByText('dlg')).toBeInTheDocument()

      useElapsedTime.__setElapsedTime(1)
      rerender(getComponent())
      expect(screen.getByText('dlg')).toBeInTheDocument()
    })
  })

  describe('speed testing', () => {
    const renderComponentForFrame = (speed: number) => {
      useElapsedTime.__setElapsedTime(0.016)
      const characters = 'yes'

      setMockMathRandom()

      const getComponent = () => (
        <RandomReveal {...fixture} characters={characters} speed={speed} />
      )

      const { rerender } = render(getComponent())
      expect(screen.getByText('dlg')).toBeInTheDocument()

      return (time: number, expectedCharacters: string): void => {
        useElapsedTime.__setElapsedTime(time)
        rerender(getComponent())

        expect(screen.getByText(expectedCharacters)).toBeInTheDocument()
      }
    }

    it('should get new random characters on every frame when the speed is 10', () => {
      const renderNewFrame = renderComponentForFrame(10)
      renderNewFrame(0.032, 'tzs')
    })

    it('should get new random characters on every third frame when the speed is 8', () => {
      const renderNewFrame = renderComponentForFrame(8)

      renderNewFrame(0.032, 'dlg')
      renderNewFrame(0.048, 'dlg')
      renderNewFrame(0.064, 'tzs')
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
        useElapsedTime.__setElapsedTime(duration)

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
})
