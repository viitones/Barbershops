# First

- [x] Setup do banco
- [x] Seeding do banco
- [x] Tailwind e Shadcn
- [] Git Hooks

npm i -D prisma
npx prisma init --datasource-provider postgresql
npm i -D tsx
npx prisma migrate dev --name init-db
npx prisma db seed

npm install next-auth
npm install @prisma/client @auth/prisma-adapter

npx prisma migrate deploy
