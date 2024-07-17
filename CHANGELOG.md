# Change Log

## 2.0.1 ( July 17th, 2024)

**Bug:**
When character is set to a single character a random character will display after animation because revealTime divides by 0 and is NaN - thanks @zhaogeorge3

## 2.0.0 ( December 8th, 2021)

**New features:**
We can now animate React components as well.
New `updateInterval` prop is added to control the speed of the animation

**Breaking Changes:**
IE is no longer supported.
`speed` prop is replaced by `updateInterval` prop.
To repeat the animation now we need to return an object with `shouldRepeat` prop from the `onComplete` handler.
