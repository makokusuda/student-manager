const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const { students } = require("./students.json");

const schema = buildSchema(`
    type Student {
        id: String
        name: String
        grade: Int
    }

    type Query {
        Students: [Student]
        Student(nameOrId: String): Student
        Grade(grade: Int): [Student]
    }
`);

const root = {
  Students: () => {
    return students;
  },

  Student: (request) => {
    return students.find((student) => {
      return (
        student.id === request.nameOrId || student.name === request.nameOrId
      );
    });
  },

  Grade: (request) => {
    return students.filter((student) => {
      return student.grade === String(request.grade);
    });
  },
};

const app = express();

// app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Running a GraphQl API server at localhost;${PORT}/graphql`);
// });

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
