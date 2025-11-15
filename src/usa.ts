import { fakerEN_US as faker } from '@faker-js/faker'
import { bloodTypeWeighted, MBTI_TYPES, relationshipStatusWeighted, type User } from './types'
import { addPrefixToDuplicateEmails, getNormalDistributionData, getZodiacSign } from './utils'
import fs from 'fs'
import Papa from 'papaparse'

function createRandomUser(): User {
	const sex = faker.person.sexType()
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
	const email = faker.internet.email({ firstName, lastName }) // low chance of duplicates, apply addPrefixToDuplicateEmails below
	// faker.helpers.uniqueArray(faker.internet.email, 1000);

	const currentLocation = Math.random() < 0.8 ? faker.location.state() : 'Abroad'
	const jobTitle = faker.person.jobTitle()

	const bloodType = faker.helpers.weightedArrayElement(bloodTypeWeighted)
	const mbti = faker.helpers.arrayElement(MBTI_TYPES)
	const relationshipStatus = faker.helpers.weightedArrayElement(relationshipStatusWeighted)

	const { height, weight } = getNormalDistributionData(sex, 'usa')
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

let fakeUserData = faker.helpers.multiple(createRandomUser, { count: 1000 })
fakeUserData = addPrefixToDuplicateEmails(fakeUserData)

const csv = Papa.unparse(fakeUserData)
fs.writeFileSync('1000-fake-users-usa.csv', csv)
