# 1000-fake-users

Put these 1000 or even more fake users into a db to test your starter project.   
You can easily add or modify the attributes.  
Uses Faker.js.  
Uses weighted values and normal distribution algorithm to generate realistic data.  

## How to run

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts // to produce 1000-fake-users.csv
bun run src/usa.ts // to produce 1000-fake-users-usa.csv
bun run src/china.ts // to produce 1000-fake-users-china.csv
```


## 1000-fake-users

The universal file without being localized.

| Attributes      | Description |
| ----------- | ----------- |
| _id | uuid|
| email | random (consider to do it seperately to remove duplicates)|
| password | not encrypted|
| username | first name only, can tell sex, allow duplidates|
| sex | two values, male and female|
| dob | yyyy-mm-dd, has range, but no normalization|
| height | cm, with normal distribution, related to sex|
| weight | kg, with normal distribution, related to sex|
| currentLocation | countries|
| fromLocation | countries|
| jobTitle | random|
| bloodType | weighted|
| mbti | random|
| relationshipStatus | weighted|
| zodiacSign | computed from dob|


## 1000-fake-users-usa

Localized, different from *1000-fake-users* in the following:  
  
firstname - has firstname  
lastname - has lastname  
email - contains first name and last name (can have duplicates)  
gender - male, female, other  
dob - US styled, has range, but no normalization  
currentLocation - US state names  
height - foot  
weight - pound  


## 1000-fake-users-china

Localized, different from *1000-fake-users* in the following:  

username - 汉字, can tell sex  
fromLocation - 包含港澳台地区，部分海外地区  
currentLocation - 包含港澳台地区，部分海外地区  

## Considerations

Ways of creating weighted data: 
1. Plain
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
const sex = faker.person.sexType()

const gender = faker.helpers.weightedArrayElement([
  { weight: 90, value: sex },
  { weight: 10, value: 'other' },
])
```

## Todos:
us, china emails can have duplicates  
add empty values
中文用户名方案 - 汉字英文混合？
海外地区方案 包含所有国家？
re arrange column order
add test


## Change logs
index - create emails seperately - no duplicates - does not match name
usa - fn+ln+random - low chance duplicates
china

email  
一定要唯一
名字一定能看出性别

email unique 问题：跟username不合拍
email unique + username 从email中来 问题：username跟性别不一致
email uuid 问题：不完全unique - 检查
