# Change Log

## 2.0.0 ( December 8th, 2021)

**New features:**
We can now animate React components as well.
New `updateInterval` prop is added to control the speed of the animation

**Breaking Changes:**
IE is no longer supported.
`speed` prop is replaced by `updateInterval` prop.
To repeat the animation now we need to return an object with `shouldRepeat` prop from the `onComplete` handler.
