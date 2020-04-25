exports.up = function (knex) {
  return knex.schema.createTable("students", (t) => {
    t.increments() //id column
      .index();

    t.string("name", 255).notNullable().index();

    t.integer("grade", 3).notNullable().index();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
