# student-management-system

This was created during my time as a student at Code Chrysalis

## Usages

1. Install the module with `yarn install`
2. Create a database for this project by running: `echo "CREATE DATABASE management_system;" | psql`
3. Run migrations and set up the database: `yarn migrate`
4. Start server `yarn dev`
5. Access to `http://localhost:3000/`

## Getting started

Install dependencies

```
yarn
```

Create local database

```
psql
CREATE DATABASE management_system;

```

Run migration and seed data

```
yarn migrate
yarn seed
```

Run server

```
yarn dev
```

Visit `http://localhost:3000/`
