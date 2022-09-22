
[install]
####npm init -y (create package.json)
npx tsc --init (create tsconfig.json)
npm i typescript --save-dev (install typescript)
npm i ts-node-dev --save-dev (install ts-node-dev for development)
npm i @types/node --save-dev (install node type-definitions)
npm i @types/express --save-dev (install express type-definitions)
npm i @types/mongoose --save-dev
npm i @typegoose/typegoose -D
npm i mongoose@5.10.18 -D (this version required for typegoose)
npm i body-parser --D

[package.json]
target = ESNEXT
outDir = ./build

[npm]
npm run start
npm run build

[@types]
1) if 3rd-party package doesn't have a .d.ts file: add src/@types/modulename.d.ts
2) add to src/@types/modulename.d.ts: declare module "modulename"

[restart]
in some cases ts-server should be restarted in VSCode: Ctrl + Shift + P => TypeScript: Restart TS server
