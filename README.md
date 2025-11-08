# How to run

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


## 1000-fake-person

no income, education
no empty value

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


## 1000-fake-person-US
can tell sex
fn can tell sex, ln
3 sexes 
us states
