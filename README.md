# React Random Reveal

[![npm](https://img.shields.io/npm/v/react-random-reveal)](https://www.npmjs.com/package/react-random-reveal)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/vydimitrov/react-random-reveal/Codecov%20Coverage)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![Codecov](https://img.shields.io/codecov/c/gh/vydimitrov/react-random-reveal)](https://codecov.io/gh/vydimitrov/react-random-reveal)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-random-reveal)](https://bundlephobia.com/result?p=react-random-reveal)

React component/hook to add a little thrill before revealing the truth. This effect is achieved via a character animation that shows random characters before revealing the text you want to emphasize. The library provides full control over the reveal run: its duration and easing can be freely adjusted.

<img src="https://user-images.githubusercontent.com/10707142/77891767-c3332000-7271-11ea-9ba8-b2de048cad32.gif">

- Animate random letters, numbers, emojis, words or components
- Performance optimized with single `requestAnimationFrame` loop to animate the random characters (no `setInterval` used)
- Built with TypeScript

## Installation

```
yarn add react-random-reveal
```

## Demos

<table>
  <thead>
    <tr>
      <th>Text Demo</th>
      <th>Emoji Demo</th>
      <th>Words Demo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
       <a href="https://codesandbox.io/s/ecstatic-swirles-cslqw?fontsize=14&hidenavigation=1&theme=dark">
        <img alt="Edit cslqw" src="https://codesandbox.io/static/img/play-codesandbox.svg">
      </a>
      </td>
      <td>
       <a href="https://codesandbox.io/s/dry-pine-kp7ly?fontsize=14&hidenavigation=1&theme=dark">
        <img alt="Edit kp7ly" src="https://codesandbox.io/static/img/play-codesandbox.svg">
      </a>
      </td>
      <td>
        <a href="https://codesandbox.io/s/quirky-field-8rr2w?fontsize=14&hidenavigation=1&theme=dark">
          <img alt="Edit 8rr2w" src="https://codesandbox.io/static/img/play-codesandbox.svg">
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Basic usage

As a component:

```jsx
import { RandomReveal } from 'react-random-reveal'

const AddSuspenseComponent = () => (
  <RandomReveal isPlaying duration={2} characters="hello world" />
)
```

As a hook:

```jsx
import { useRandomReveal } from 'react-random-reveal'

const AddSuspenseComponent = () => {
  const characters = useRandomReveal({
    isPlaying: true,
    duration: 2,
    characters: 'hello world',
  })

  return characters
}
```

## Props

| Prop Name          | Type                                                   | Default                                    | Description                                                                                                                                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isPlaying          | boolean                                                | _required_                                 | Play and pause animation.                                                                                                                                                                                                                                                                        |
| characters         | string \| ReactNode[]                                  | _required_                                 | Characters to reveal in the end of the duration. These could be letters, numbers, emojis, words or components                                                                                                                                                                                    |
| duration           | number                                                 | _required_                                 | Total animation duration in seconds. The duration includes the overall time random characters are shown plus the time for revealing the characters                                                                                                                                               |
| updateInterval     | number                                                 | 0.065                                      | Update interval in seconds. Determines how often the characters will change. When set to 0 the value will update on each key frame                                                                                                                                                               |
| revealDuration     | number                                                 | 0.6                                        | The duration to reveal all characters is represented as a fraction of the total duration. This is a number between 0 and 1. When set to 0, all characters will be revealed in the end of the duration at once. When set to 1, characters will start revealing from the beginning of the duration |
| revealEasing       | 'linear' \| 'easeInQuad' \| 'easeOutQuad' \| 'random'  | linear                                     | The easing function used to reveal characters during the reveal duration                                                                                                                                                                                                                         |
| characterSet       | ReactNode[]                                            | English alphabet: ['a', 'b', 'c', ... 'z'] | Characters that will be used during the random characters run                                                                                                                                                                                                                                    |
| ignoreCharacterSet | string[]                                               | -                                          | Characters that won't be animated and will always be revealed. Can be used to ignore animating _space_ or any special characters.                                                                                                                                                                |
| onComplete         | () => void \| { shouldRepeat: boolean, delay: number } | -                                          | The callback is fired when the duration is reached. It can be used to restart the animation by returning an object with the following params: `shouldRepeat` - indicates if the loop should start over; `delay` - delay before looping again in seconds                                          |

## Browser support

We support [all modern browsers](https://caniuse.com/?search=es6) targeting `es6`. Internet Explorer (IE) is not longer supported.
