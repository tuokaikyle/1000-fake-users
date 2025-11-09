import { fakerEN_US as faker } from '@faker-js/faker'
import { bloodTypeWeighted, MBTI_TYPES, relationshipStatusWeighted, type User } from './types'
import { getNormalDistributionData, getZodiacSign } from './utils'
import fs from 'fs'
import Papa from 'papaparse'

function createRandomUser(): User {
	const sex = faker.person.sexType() // in order to get the param for firstName
	const gender = faker.helpers.weightedArrayElement([
		{ weight: 90, value: sex },
		{ weight: 10, value: 'other' },
	])
	const firstName = faker.person.firstName(sex)
	const lastName = faker.person.lastName()
	const password = faker.internet.password()
	const dob = faker.date.birthdate({ mode: 'year', min: 1980, max: 2005 }).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const email = faker.internet.email({ firstName, lastName }) // can have duplicates
	// faker.helpers.uniqueArray(faker.internet.email, 1000);

	const currentLocation = Math.random() > 0.2 ? faker.location.state() : 'Abroad'
	const jobTitle = faker.person.jobTitle()

	const bloodType = faker.helpers.weightedArrayElement(bloodTypeWeighted)
	const mbti = faker.helpers.arrayElement(MBTI_TYPES)
	const relationshipStatus = faker.helpers.weightedArrayElement(relationshipStatusWeighted)

	const { height, weight } = getNormalDistributionData(sex, true)
	const zodiacSign = getZodiacSign(dob)

	return {
		_id: faker.string.uuid(),
		email,
		password,

		firstName,
		lastName,
		gender,
		dob,

		height,
		weight,

		currentLocation,

		jobTitle,
		bloodType,
		mbti,
		relationshipStatus,
		zodiacSign,
	}
}

const fakeUserData = faker.helpers.multiple(createRandomUser, { count: 1000 })
const csv = Papa.unparse(fakeUserData)
fs.writeFileSync('1000-fake-users-usa.csv', csv)
