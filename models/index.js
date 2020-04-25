module.exports = function (knex) {
  return {
    students: require("./students")(knex),
  };
};
