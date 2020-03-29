import { Config } from 'use-elapsed-time'

let isPlaying = false
let elapsedTime = 0
let config: Config = {}

module.exports = {
	useElapsedTime(isPlayingBool: boolean, configObj: Config): number {
		config = configObj
		isPlaying = isPlayingBool

		return elapsedTime
	},

	__setElapsedTime(time: number): void {
		elapsedTime = time
	},

	__resetElapsedTime(): void {
		elapsedTime = 0
	},

	__fireOnComplete(): void {
        // the compiler does not like optional chaining here
		config.onComplete && config.onComplete()
	},

	__getConfig(): Config {
		return config
	},

	__resetConfig(): void {
		config = {}
	},

	__getIsPlaying(): boolean {
		return isPlaying
	},

	__resetIsPlaying(): void {
		isPlaying = false
	},
}
