module.exports = (knex, Student) => {
  return async (params) => {
    const result = [];
    if (!params) {
      const allStudents = await knex
        .select("id", "name", "grade")
        .from("students");

      allStudents.forEach((student) => {
        result.push(new Student(student));
      });
    }
    return result;
  };
};
