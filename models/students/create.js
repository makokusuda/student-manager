const validateStudentName = (sName) => {
  return typeof sName === "string" && sName.replace(" ", "");
};

module.exports = (knex, Student) => {
  return (params) => {
    const studentName = params.name;
    const studentGrade = params.grade;

    if (!validateStudentName(studentName)) {
      return Promise.reject(
        new Error("Student name must be provided, and be strings")
      );
    }

    return knex("students")
      .insert({ name: studentName, grade: studentGrade })
      .then(() => {
        return knex("students").where({ name: studentName }).select();
      })
      .then((students) => {
        return new Student(students.pop());
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
