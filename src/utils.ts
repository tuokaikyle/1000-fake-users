import type { SexType } from '@faker-js/faker'
import type { ZodiacSign } from './types'

export const generateNormal = (mean: number, stdDev: number): number => {
	const u1 = Math.random()
	const u2 = Math.random()
	const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
	return mean + z * stdDev
}

export const getNormalDistributionData = (
	sex: SexType,
	usa?: boolean,
): { height: number | string; weight: number | string } => {
	let height: number | string
	let weight: number | string

	if (sex === 'male') {
		// Male: mean height 175cm, std dev 7cm
		height = Math.round(generateNormal(175, 7))
		height = Math.max(150, Math.min(200, height)) // Clamp to reasonable range

		// Male: mean weight 77kg, std dev 12kg
		weight = Math.round(generateNormal(77, 12))
		weight = Math.max(50, Math.min(130, weight))
	} else {
		// Female: mean height 162cm, std dev 6cm
		height = Math.round(generateNormal(165, 6))
		height = Math.max(145, Math.min(185, height))

		// Female: mean weight 65kg, std dev 11kg
		weight = Math.round(generateNormal(65, 11))
		weight = Math.max(40, Math.min(110, weight))
	}

	if (usa) {
		height = cmToFeetString(height)
		weight = kgToPounds(weight)
	}

	return {
		height,
		weight,
	}
}

export const getZodiacSign = (dateStr: string): ZodiacSign => {
	const date = new Date(dateStr)

	// Check if date is valid
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date format')
	}

	const month = date.getMonth() + 1 // getMonth() is 0-indexed
	const day = date.getDate()

	if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
	if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
	if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
	if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
	if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
	if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
	if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
	if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
	if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
	if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
	if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
	return 'Pisces'
}

export function cmToFeetString(cm: number): string {
	const totalInches = cm / 2.54
	const feet = Math.floor(totalInches / 12)
	const inches = Math.round(totalInches % 12)

	return `${feet}'${inches}"`
}

export function kgToPounds(kg: number): number {
	return Math.round(kg * 2.20462)
}
