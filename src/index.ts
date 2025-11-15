import { faker } from '@faker-js/faker'
import { bloodTypeWeighted, MBTI_TYPES, relationshipStatusWeighted, type User } from './types'
import { addPrefixToDuplicateEmails, getNormalDistributionData, getZodiacSign } from './utils'
import fs from 'fs'
import Papa from 'papaparse'

function createRandomUser(): User {
	const id = faker.string.uuid()
	const sex = faker.person.sexType()
	const username = faker.person.firstName(sex) // allow duplidates, can tell sex
	const password = faker.internet.password()
	const dob = faker.date.birthdate({ mode: 'year', min: 1980, max: 2005 }).toISOString().split('T')[0] as string
	const email = faker.internet.email({ firstName: username }) // low chance of duplicates, apply addPrefixToDuplicateEmails below
	// const email = faker.internet.email({ firstName: username, lastName: id.split('-')[0] }) // low chance of duplicates, then use addPrefixToDuplicateEmails
	// faker.helpers.uniqueArray(faker.internet.email, 1000); // no duplicates

	const currentLocation = faker.location.country()
	const fromLocation = faker.location.country()
	const jobTitle = faker.person.jobTitle()

	const bloodType = faker.helpers.weightedArrayElement(bloodTypeWeighted)
	const mbti = faker.helpers.arrayElement(MBTI_TYPES)
	const relationshipStatus = faker.helpers.weightedArrayElement(relationshipStatusWeighted)

	const { height, weight } = getNormalDistributionData(sex)
	const zodiacSign = getZodiacSign(dob)

	return {
		_id: id,
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

let fakeUserData = faker.helpers.multiple(createRandomUser, { count: 1000 })
fakeUserData = addPrefixToDuplicateEmails(fakeUserData)

const csv = Papa.unparse(fakeUserData)
fs.writeFileSync('1000-fake-users.csv', csv)
