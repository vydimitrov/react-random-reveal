# React Random Reveal

[![npm](https://img.shields.io/npm/v/react-random-reveal)](https://www.npmjs.com/package/react-random-reveal)
[![npm](https://img.shields.io/npm/dw/react-random-reveal)](https://www.npmjs.com/package/react-random-reveal)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-random-reveal/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![Codecov](https://img.shields.io/codecov/c/gh/vydimitrov/react-random-reveal)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-random-reveal)](https://bundlephobia.com/result?p=react-random-reveal)

-- description here --

<img src="https://user-images.githubusercontent.com/10707142/77891767-c3332000-7271-11ea-9ba8-b2de048cad32.gif">

- Animate random letters, numbers, words or even emojis
- Performance optimized with single `requestAnimationFrame` loop to animate the random characters (no `setInterval` used)
- Built with TypeScript

## Installation

```
yarn add react-random-reveal
```

or

```
npm install react-random-reveal
```

## Demo

## Basic usage

As a component:

```jsx
import { RandomReveal } from 'react-random-reveal'

const AddSuspenseComponent = () => (
	<RandomReveal
		isPlaying
		duration={4.6}
		revealDuration={0.5}
		characters="hello world"
	/>
)
```

As a hook:

```jsx
import { useRandomReveal } from 'react-random-reveal'

const AddSuspenseComponent = () => (
	const characters = useRandomReveal({
		isPlaying: true,
		duration: 4.6,
		revealDuration: 0.5,
		characters: 'hello world'
	})
)
```

## Props

|     Prop Name      |                              Type                               |                  Default                   |                                                                                                                                  Description                                                                                                                                   |
| :----------------: | :-------------------------------------------------------------: | :----------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     isPlaying      |                             boolean                             |                 _required_                 |                                                                                                                            Play and pause animation                                                                                                                            |
|      duration      |                             number                              |                 _required_                 |                                                                        Total duration in seconds. The duration includes the time random characters are shown plus the time for revealing the characters                                                                        |
|     characters     |                     string \| Array<string>                     |                 _required_                 |                                                                                         Characters to reveal in the end of the duration. It could be letters, numbers, words or emojis                                                                                         |
|       speed        |                             number                              |                     8                      |                                                                              Characters change speed from 0 to 10. At 10 new the characters will be shown on each frame, approximately every 16ms                                                                              |
|   revealDuration   |                             number                              |                    0.6                     | Duration to reveal all characters represented as a fraction of the total duration. Number between 0 and 1. When set to 0 all characters will be revealed in the end of the duration at once. When set to 1, characters will start revealing from the beginning of the duration |
|    revealEasing    |      'linear' \| 'easeInQuad' \| 'easeOutQuad' \| 'random'      |                   linear                   |                                                                                                   The easing function used to reveal characters during the reveal duration.                                                                                                    |
|    characterSet    |                          Array<string>                          | English alphabet: ['a', 'b', 'c', ... 'z'] |                                                                                                         Characters that will be used during the random characters run                                                                                                          |
| ignoreCharacterSet |                          Array<string>                          |                     -                      |                                                                       Characters that won't be animated and it will always revealed. Can be used to ignore animating _space_ or any special characters.                                                                        |
|     onComplete     | function(): undefined \| [shouldRepeat: boolean, delay: number] |                     -                      |             On complete handler. It can be used to repeat the animation by returning an array where the first element `shouldRepeat` indicates if the loop should start over and second element `delay` specifies the delay before looping again in milliseconds.              |
