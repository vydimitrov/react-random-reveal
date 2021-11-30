import type { Props } from 'use-elapsed-time'

let elapsedTime = 0
let config: Props = { isPlaying: false }

module.exports = {
	useElapsedTime(configObj: Props) {
		config = configObj

		return { elapsedTime }
	},

	__setElapsedTime(time: number): void {
		elapsedTime = time
	},

	__resetElapsedTime(): void {
		elapsedTime = 0
	},

	__fireOnComplete(): void {
        // the compiler does not like optional chaining here
		config.onComplete && config.onComplete(100)
	},

	__getConfig(): Props {
		return config
	},

	__resetConfig(): void {
		config = { isPlaying: false }
	},

	__getIsPlaying(): boolean {
		return config.isPlaying
	},

	__resetIsPlaying(): void {
		config.isPlaying = false
	},
}
