<p align="center">
  <a href="" rel="noopener">
</p>

<h3 align="center">Contacts Manager - Backend</h3>

---


## 📝 Table of Contents


- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
  - [Installing](#installing)
- [🎈 Usage ](#-usage-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>

Contacts Manager is an application for managing contacts, it has a complete crud for the logged in user and for registered contacts. It has protected routes.

### Installing

1. Install dependencies:

```
npm install

```

2. Configure your database and .env file:
Create an .env file and fill following the .env.example
The .env file must have your Postgres credentials, and a new database, and your secret key


3. Run migrations:

```
npx prisma migrate dev
```


## 🎈 Usage <a name="usage"></a>

```
npm run start:dev
```

To view the documentation, please follow the previous steps to run the server.
- [doc](http://localhost:3000/doc)

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJs](https://nestjs.com/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

## ✍️ Authors <a name = "authors"></a>

- [@srod-douglas](https://github.com/srod-douglas) - Idea & Initial work

