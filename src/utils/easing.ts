const easeOutQuad = (t: number, b: number, c: number, d: number): number => {
	t /= d
	return -c * t * (t - 2) + b
}

const easeInQuad = (t: number, b: number, c: number, d: number): number => {
	t /= d
	return c * t * t + b
}

const random = (_: number, b: number, c: number): number => {
	return Math.floor(Math.random() * (c - b + 1) + b)
}

const linear = (t: number, b: number, c: number, d: number): number => {
	return (c * t) / d + b
}

const easings = {
	easeInQuad,
	easeOutQuad,
	linear,
	random,
}

export { easings }
