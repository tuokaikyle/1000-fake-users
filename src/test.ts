import { addPrefixToDuplicateEmails, findDuplicateEmails } from './utils'

let fakeUserData = [
	{
		_id: '995a767d-0cb0-4d30-8b47-1a5b2eeefa54',
		email: 'Scott.Hudson79@gmail.com',
		password: 'YqYmfO1siCNA99r',
		username: 'Jaime',
		sex: 'female',
		dob: '1984-01-18',
		height: 162,
		weight: 53,
		currentLocation: 'Tokelau',
		fromLocation: 'Togo',
		jobTitle: 'Senior Marketing Director',
		bloodType: 'O+',
		mbti: 'INTP',
		relationshipStatus: 'Single',
		zodiacSign: 'Capricorn',
	},
	{
		_id: 'b817c628-d852-4680-8a09-be72148bd02d',
		email: 'Melissa33@gmail.com',
		password: '1w7gA2znwEGUlfc',
		username: 'Melissa',
		sex: 'female',
		dob: '1992-05-11',
		height: 169,
		weight: 63,
		currentLocation: 'Ecuador',
		fromLocation: 'Bermuda',
		jobTitle: 'Central Paradigm Technician',
		bloodType: 'A-',
		mbti: 'INFP',
		relationshipStatus: 'Single',
		zodiacSign: 'Taurus',
	},
	{
		_id: 'fbca10cc-eed6-415b-b1ad-8b66a9086327',
		email: 'Scott.Hudson79@gmail.com',
		password: 'b3gmghYPUX66maP',
		username: 'Scott',
		sex: 'male',
		dob: '1986-12-09',
		height: 186,
		weight: 77,
		currentLocation: 'San Marino',
		fromLocation: 'Cook Islands',
		jobTitle: 'Principal Optimization Planner',
		bloodType: 'AB+',
		mbti: 'ENTJ',
		relationshipStatus: 'Single',
		zodiacSign: 'Sagittarius',
	},
]

let duplicates = findDuplicateEmails(fakeUserData)
if (duplicates.length > 0) {
	console.log('Duplicate emails - before:', duplicates)
}

fakeUserData = addPrefixToDuplicateEmails(fakeUserData)
duplicates = findDuplicateEmails(fakeUserData)
if (duplicates.length > 0) {
	console.log('Duplicate emails - after:', duplicates)
}
