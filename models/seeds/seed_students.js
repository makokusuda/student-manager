exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Hinata", grade: "3" },
        { name: "Sora", grade: "3" },
        { name: "Hana", grade: "3" },
        { name: "Akari", grade: "2" },
        { name: "Yui", grade: "2" },
        { name: "Aoi", grade: "1" },
        { name: "Kaito", grade: "1" },
      ]);
    });
};
