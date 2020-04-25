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
      before(() => {
        params = { name: " " };
      });

      it("politely refuses", () =>
        models.students
          .create(params)
          .then(forcePromiseReject)
          .catch((err) => {
            "Student's name must be provided";
          }));
    });

    context("when good params are given", () => {
      before(() => {
        params.name = "Shino";
      });

      after(() => knex("students").del());

      it("creates a student", () => {
        models.students.create(params).then((student) => {
          expect(student).to.include({ name: params.name });
          expect(student.id).to.be.a("number");
        });
      });
    });
  });
  //add student
  //delete student
  //modify student
  //get students list(all students)
  //search student by id or name
  //search stdent by grade
});
