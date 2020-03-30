# React Random Reveal

[![npm](https://img.shields.io/npm/v/react-random-reveal)](https://www.npmjs.com/package/react-random-reveal)
[![npm](https://img.shields.io/npm/dw/react-random-reveal)](https://www.npmjs.com/package/react-random-reveal)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-random-reveal/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![Codecov](https://img.shields.io/codecov/c/gh/vydimitrov/react-random-reveal)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-random-reveal)](https://bundlephobia.com/result?p=react-random-reveal)

React countdown timer component in a circle shape with color and progress animation to urge with pleasure your users.

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

```jsx
import { RandomReveal } from 'react-random-reveal'

const AddSuspenseComponent = () => (
	<RandomReveal
		isPlaying
		duration={4.6}
		revealDuration={0.8}
		characters="hello world"
	/>
)
```

## Props
