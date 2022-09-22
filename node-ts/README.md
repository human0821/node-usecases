
## [NODE-TYPESCRIPT BOOTSTRAP]
`npm init -y (create package.json)` <br>
`npx tsc --init (create tsconfig.json)` <br>
`npm i typescript --save-dev (install typescript)` <br>
`npm i ts-node-dev --save-dev (install ts-node-dev for development)` <br>
`npm i @types/node --save-dev (install node type-definitions)` <br>
`npm i @types/express --save-dev (install express type-definitions)` <br> 
`npm i @types/mongoose --save-dev` <br>
`npm i @typegoose/typegoose -D` <br>
`npm i mongoose@5.10.18 -D (this version required for typegoose)` <br>
`npm i body-parser --D` <br>

## [package.json]
`target = ESNEXT` <br>
`outDir = ./build` <br>

## [npm]
`npm run start` <br>
`npm run build` <br>

## [@types]
`if 3rd-party package doesn't have a .d.ts file: add src/@types/modulename.d.ts + declare module "modulename" in it`

## [note]
in some cases ts-server should be restarted in VSCode: Ctrl + Shift + P => TypeScript: Restart TS server
