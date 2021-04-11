# diablo3profiles

Console application letting you parse Max Roll Guides and get easy lookup of items you need for individual specs.
This project was created because I was unsure of which items I could toss or not with the builds I was going for, and it was too time consuming looking up every guide for answers.

# Building

- Install [Node.js](https://nodejs.org/en/)
- Install [yarn package manager](https://yarnpkg.com/getting-started/install)

Go to root directory of the project

    > yarn
    > yarn build

# Running

## Running from source

    > yarn ts-node src\index.ts

## Running from build

    > node dist\main.js

# Usage
The program expects a `guides.json` file to be located in the same directory as `index.ts` or `main.js`

Example of `guides.json`

    [
        {
            "url": "https://maxroll.gg/guides/firebird-mirror-image-wizard-guide",
            "name": "Firebird Mirror Image"
        },
        {
            "url": "https://maxroll.gg/guides/lod-twister-wizard-guide",
            "name": "LOD Twister"
        },
    ]

After running, the program will parse builds from maxroll and present the user with a search prompt.

![usage](https://user-images.githubusercontent.com/1131968/114310677-d8c95f80-9aeb-11eb-991a-4a40a3385a15.png)
