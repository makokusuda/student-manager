const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("students", () => {
  describe("setup", () => {
    it("able to connect to database", () => {
      knex
        .raw("select 1 + 1 as result")
        .catch(() => assert.fail("unable to connect to db"));
    });

    it("has run the initial migrations", () => {
      knex("students")
        .select()
        .catch(() => assert.fail("students table is not found."));
    });
  });

  describe("#create", () => {
    let params = { name: "" };

    context("when bad params are given", () => {
      it("politely refuses", () =>
        models.students
          .create(params)
          .then(forcePromiseReject)
          .catch((err) => {
            expect(err.message).to.equal(
              "Student name must be provided, and be strings"
            );
          }));
    });

    context("when good params are given", () => {
      const params = { name: "test3", grade: 3 };

      after(() => knex("students").where({ name: params.name }).del());

      it("creates a student", (done) => {
        // put done to make sure query is finished before running test
        models.students.create(params).then((student) => {
          done();
          expect(student.id).to.be.a("number");
          expect(student).to.include({ name: params.name });
          expect(student).to.include({ grade: params.grade });
          expect(student.grade).to.be.a("number");
        });
      });
    });
  });

  describe("#list", () => {
    const students = [
      { name: "test1", grade: 1 },
      { name: "test2", grade: 2 },
    ];

    const name = ["test1", "test2"];

    before(() => Promise.all(students.map(models.students.create)));
    after(() =>
      Promise.all(
        students.map((student) =>
          knex("students").where({ name: student.name }).del()
        )
      )
    );

    it("lists all students", (done) => {
      models.students.list().then((resp) => {
        done();
        expect(name).to.include(resp[0].name);
        expect(name).to.include(resp[1].name);
      });
    });
  });

  //delete student
  //modify student
  //search student by id or name
  //search stdent by grade
});
