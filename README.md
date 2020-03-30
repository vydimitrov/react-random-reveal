# React Random Reveal

[![npm](https://img.shields.io/npm/v/react-random-reveal)](https://www.npmjs.com/package/react-random-reveal)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-random-reveal/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![Codecov](https://img.shields.io/codecov/c/gh/vydimitrov/react-random-reveal)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-random-reveal)](https://bundlephobia.com/result?p=react-random-reveal)

React component/hook to add a little thrill before revealing the truth. This effect is achieved via a character animation that shows random characters before revealing the text you want to emphasize. The library provides full control over the reveal run: its duration and easing can be freely adjusted.


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

#### Text demo
[![Edit ecstatic-swirles-cslqw](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ecstatic-swirles-cslqw?fontsize=14&hidenavigation=1&theme=dark)   

#### Emoji demo
[![Edit dry-pine-kp7ly](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dry-pine-kp7ly?fontsize=14&hidenavigation=1&theme=dark)

#### Words demo
[![Edit quirky-field-8rr2w](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/quirky-field-8rr2w?fontsize=14&hidenavigation=1&theme=dark)

  </div>
</div>


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

const AddSuspenseComponent = () => {
  const characters = useRandomReveal({
    isPlaying: true,
    duration: 4.6,
    revealDuration: 0.5,
    characters: 'hello world'
  })
  
  return characters
}
```

## Props
| Prop Name          | Type                                                            | Default                                    | Description                                                                                                                                                                                                                                                                     |
|--------------------|-----------------------------------------------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| isPlaying          | boolean                                                         | _required_                                 | Play and pause animation.                                                                                                                                                                                                                                                        |
| duration           | number                                                          | _required_                                 | Total duration in seconds. The duration includes the overall time random characters are shown plus the time for revealing the characters.                                                                                                                                                |
| characters         | string \| Array\<string>                                        | _required_                                 | Characters to reveal in the end of the duration. These could be letters, numbers, words or emojis.                                                                                                                                                                                  |
| speed              | number                                                          | 8                                          | Characters change speed from 0 to 10. At 10, new the characters will be shown on each frame, approximately every 16.6ms.                                                                                                                                                            |
| revealDuration     | number                                                          | 0.6                                        | The duration to reveal all characters is represented as a fraction of the total duration. This is a number between 0 and 1. When set to 0, all characters will be revealed in the end of the duration at once. When set to 1, characters will start revealing from the beginning of the duration.  |
| revealEasing       |  'linear'  \| 'easeInQuad'  \| 'easeOutQuad'  \| 'random'       | linear                                     | The easing function used to reveal characters during the reveal duration.                                                                                                                                                                                                       |
| characterSet       | Array\<string>                                                  | English alphabet: ['a', 'b', 'c', ... 'z'] | Characters that will be used during the random characters run.                                                                                                                                                                                                                   |
| ignoreCharacterSet | Array\<string>                                                  | -                                          | Characters that won't be animated and will always be revealed. Can be used to ignore animating _space_ or any special characters.                                                                                                                                               |
| onComplete         | function(): undefined \| [shouldRepeat: boolean, delay: number] | -                                          | On complete handler. It can be used to repeat the animation by returning an array where the first element  `shouldRepeat` indicates if the loop should start over and second element  `delay` specifies the delay before looping again in milliseconds.                         |
