import { faker } from '@faker-js/faker'
import { bloodTypeWeighted, MBTI_TYPES, relationshipStatusWeighted, type User } from './types'
import { getNormalDistributionData, getZodiacSign } from './helpers'
import fs from 'fs'
import Papa from 'papaparse'

function createRandomUser(): User {
	const sex = faker.person.sexType()
	const username = faker.person.firstName(sex) // allow duplidates, can tell sex
	const email = faker.internet.email()
	const password = faker.internet.password()
	const dob = faker.date.birthdate({ mode: 'year', min: 1980, max: 2005 }).toISOString().split('T')[0] as string
	// faker.helpers.uniqueArray(faker.internet.email, 1000);
	// faker.helpers.arrayElement(['free', 'basic', 'business']),

	const currentLocation = faker.location.country()
	const fromLocation = faker.location.country()
	const jobTitle = faker.person.jobTitle()

	const bloodType = faker.helpers.weightedArrayElement(bloodTypeWeighted)
	const mbti = faker.helpers.arrayElement(MBTI_TYPES)
	const relationshipStatus = faker.helpers.weightedArrayElement(relationshipStatusWeighted)

	const { height, weight } = getNormalDistributionData(sex)
	const zodiacSign = getZodiacSign(dob)

	return {
		_id: faker.string.uuid(),
		email,
		password,

		username,
		sex,
		dob,

		height,
		weight,

		currentLocation,
		fromLocation,

		jobTitle,
		bloodType,
		mbti,
		relationshipStatus,
		zodiacSign,
	}
}

const fakePersonData = faker.helpers.multiple(createRandomUser, { count: 1000 })
const csv = Papa.unparse(fakePersonData)
fs.writeFileSync('1000-fake-person.csv', csv)
