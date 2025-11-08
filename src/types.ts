import type { SexType } from '@faker-js/faker'

// biome-ignore format: keeping compact array format
export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
] as const;
export type MBTIType = (typeof MBTI_TYPES)[number]

export const relationshipStatusWeighted = [
	{ value: 'Single', weight: 80 },
	{ value: 'Divorced', weight: 15 },
	{ value: 'Widowed', weight: 5 },
] as const
export type RelationshipStatus = (typeof relationshipStatusWeighted)[number]['value']

export const bloodTypeWeighted = [
	{ value: 'O+', weight: 35 },
	{ value: 'O-', weight: 5 },
	{ value: 'A+', weight: 25 },
	{ value: 'A-', weight: 5 },
	{ value: 'B+', weight: 15 },
	{ value: 'B-', weight: 5 },
	{ value: 'AB+', weight: 10 },
	{ value: 'AB-', weight: 5 },
] as const
export type BloodType = (typeof bloodTypeWeighted)[number]['value']
// const bloodType = bloodTypeWeighted.map((b) => b.value);

export interface User {
	_id: string
	email: string
	password: string

	username?: string
	firstName?: string
	lastName?: string

	sex?: SexType
	gender?: string
	dob: string

	height?: number | string
	weight?: number | string

	currentLocation: string
	fromLocation?: string

	jobTitle?: string

	bloodType?: BloodType
	mbti?: MBTIType
	relationshipStatus?: RelationshipStatus
	zodiacSign?: ZodiacSign
}

export type ZodiacSign =
	| 'Aries'
	| 'Taurus'
	| 'Gemini'
	| 'Cancer'
	| 'Leo'
	| 'Virgo'
	| 'Libra'
	| 'Scorpio'
	| 'Sagittarius'
	| 'Capricorn'
	| 'Aquarius'
	| 'Pisces'
