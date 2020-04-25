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

    input StudentInput {
        name: String
        grade: Int
    }

    type Query {
        Students: [Student]
        Student(nameOrId: String): Student
        Grade(grade: Int): [Student]
    }

    type Mutation {
        DeleteStudent(nameOrId: String): [Student]
        AddStudent(input: StudentInput): [Student]
        ModifyStudent(id: String, input: StudentInput): [Student]
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

  DeleteStudent: (request) => {
    students.forEach((student, index) => {
      if (
        student.id === request.nameOrId ||
        student.name === request.nameOrId
      ) {
        students.splice(index, 1);
        return;
      }
    });
    return students;
  },

  AddStudent: (input) => {
    let newStudent = {
      id: String(students.length + 1),
      name: input.input.name,
      grade: input.input.grade,
    };
    students.push(newStudent);
    return students;
  },

  ModifyStudent: (request) => {
    students.forEach((student) => {
      if (student.id === request.id) {
        if (request.input.name) {
          student.name = request.input.name;
        }
        if (request.input.grade) {
          student.grade = request.input.grade;
        }
      }
    });
    console.log(students);
    return students;
  },
};

const app = express();

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
