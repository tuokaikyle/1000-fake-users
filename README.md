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

## 1000-fake-users

```bash
bun run src/index.ts
```

Generic user data without being localized.

| Attributes         | Description                                     |
| ------------------ | ----------------------------------------------- |
| \_id               | uuid                                            |
| email              | no duplicates, contains first name              |
| password           | not encrypted                                   |
| username           | first name only, can tell sex, allow duplidates |
| sex                | two values, male and female                     |
| dob                | yyyy-mm-dd, has range, but no normalization     |
| height             | cm, with normal distribution, related to sex    |
| weight             | kg, with normal distribution, related to sex    |
| currentLocation    | countries                                       |
| fromLocation       | countries                                       |
| jobTitle           | random                                          |
| bloodType          | weighted                                        |
| mbti               | random                                          |
| relationshipStatus | weighted                                        |
| zodiacSign         | computed from dob                               |

## 1000-fake-users-usa

```bash
bun run src/usa.ts
```

Localized, different from _1000-fake-users_ in the following:

| Attributes      | Description                                      |
| --------------- | ------------------------------------------------ |
| email           | no duplicates, contains first name and last name |
| firstname       | has firstname, can tell sex                      |
| lastname        | has lastname                                     |
| gender          | male, female, other                              |
| dob             | US styled, has range, but no normalization       |
| height          | foot, with normal distribution, related to sex   |
| weight          | pound, with normal distribution, related to sex  |
| currentLocation | US state names or abroad                         |

## 1000-fake-users-china

```bash
bun run src/china.ts
```

经过本地化处理，与 _1000-fake-users_ 的不同处在于：

| Attributes      | Description                          |
| --------------- | ------------------------------------ |
| email           | 随机，不包含名字                     |
| username        | 中文姓和随机数字                     |
| currentLocation | 省市区，包含港澳台地区，部分海外地区 |
| fromLocation    | 省市区，包含港澳台地区，部分海外地区 |

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

[x]us, china emails can have duplicates  
[ ]add empty values  
[x]中文用户名方案 - 汉字数字混合？  
[ ]海外地区方案 包含所有国家？  
[ ]re arrange column order  
[ ]add test

## Change logs

index - create emails seperately - no duplicates - does not match name
usa - fn+ln+random - low chance duplicates
china

email  
一定要唯一
名字一定能看出性别

email unique 问题：跟 username 不合拍
email unique + username 从 email 中来 问题：username 跟性别不一致
email uuid 问题：不完全 unique - 检查
