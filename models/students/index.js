const Student = function (dbStudent) {
  this.id = dbStudent.id;
  this.name = dbStudent.name;
  this.grade = dbStudent.grade;
};

module.exports = (knex) => {
  return {
    create: require("./create")(knex, Student),
    //delete: require("./delete")(knex, Student),
    //modify: require("./modify")(knex, Student),
    //list: require("./list")(knex, Student),
  };
};
