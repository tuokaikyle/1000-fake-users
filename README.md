# 1000-fake-person

Need to create testing users for your project?  
Put these 1000 or even more fake users into it!   
You can easily add or modify the attributes.  
Faker.js under the hood.   
Use customized weights and normal distribution algorithm to generate realistic data!  

## How to run

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts // to produce 1000-fake-person.csv
bun run src/usa.ts // to produce 1000-fake-person-usa.csv
bun run src/china.ts // to produce 1000-fake-person-china.csv
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


## 1000-fake-person

| Attributes      | Description |
| ----------- | ----------- |
| _id | uuid|
| email | random (consider to do it seperately to remove duplicates)|
| password | not encrypted|
| username | fn only, can tell sex, allow duplidates|
| sex | two values, male and female|
| dob | yyyy-mm-dd, has range, but no normalization|
| height | cm, with normal distribution, related to sex|
| weight | kg, with normal distribution, related to sex|
| currentLocation | countries|
| fromLocation | countries|
| jobTitle | random|
| bloodType | with weights|
| mbti | random|
| relationshipStatus | with weights, Single (80%), Divorced(15%), Widowed(5%)|
| zodiacSign | computed from dob|


## 1000-fake-person-US

Different from *1000-fake-person* in the following:  
  
firstname - has firstname  
lastname - has lastname  
email - contains first name and last name (can have duplicates)  
gender - male, female, other  
dob - US styled, has range, but no normalization  
currentLocation - US state names  
height - foot  
weight - pound  


## 1000-fake-person-China
can tell sex
const username = faker.person.firstName(sex); // allow duplidates, can tell sex
const location = fakerZH_CN.location.state()
const fromLocation = fakerZH_CN.location.state()

中国地理选择器
世界国家地区选择器 - 找最流行的就行，避免争端  
澳洲华人
美国华人
世界华人
国内相互

## Considerations

Ways of creating weighted data: 
1. Plan
```
const currentLocation = Math.random() > 0.2 ? faker.location.state() : 'Abroad'
```

2. Create const and type together
```
export const relationshipStatusWeighted = [
	{ value: 'Single', weight: 80 },
	{ value: 'Divorced', weight: 15 },
	{ value: 'Widowed', weight: 5 },
] as const
export type RelationshipStatus = (typeof relationshipStatusWeighted)[number]['value']
const relationshipStatus = faker.helpers.weightedArrayElement(relationshipStatusWeighted)
```

3. faker inside faker
```
const gender = faker.helpers.weightedArrayElement([
  { weight: 90, value: sex },
  { weight: 10, value: 'other' },
])
```

## Issues:
emails can have duplicates  
add empty values
