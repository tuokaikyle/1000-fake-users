# fakeperson1000

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.1. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


1000-fake-person

fn only, not fn and ls, allow duplidates
email random - need to do that seperately? to remove duplicates
password not encrypted, need to do that manually

dob range, no normalization
location, fromLocation: country

zodiac needs to be computed

no income, education
no empty value
no gender


1000-fake-person-China
 can tell sex
const username = faker.person.firstName(sex); // allow duplidates, can tell sex
const location = fakerZH_CN.location.state()
const fromLocation = fakerZH_CN.location.state()


1000-fake-person-US
 can tell sex
fn can tell sex, ln
3 sexes 
