const listButton = document.getElementById("list-button");
const listDisplayArea = document.getElementById("list-area");
const addButton = document.getElementById("add-button");
const addName = document.getElementById("add-name");
const addGrade = document.getElementById("add-grade");
const updateDisplayArea = document.getElementById("updated-display-area");

//display all students
listButton.addEventListener("click", () => {
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "query { Students { id name grade } }",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      listDisplayArea.innerHTML = "";
      res.data.Students.forEach((student) => {
        displayToPage(student);
      });
    });
});

const displayToPage = (value) => {
  const studentInfo = document.createElement("p");
  studentInfo.innerHTML = "Name : " + value.name + ", Grade : " + value.grade;
  listDisplayArea.appendChild(studentInfo);
};

//add student
addButton.addEventListener("click", () => {
  if (!addName.value || !addGrade.value) {
    console.log("cannot add!");
  } else {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{
        AddStudent(input: {name: "${addName.value}",
        grade: ${addGrade.value}})
        {
          id name grade
        }
      }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        updateDisplayArea.innerHTML = "";
      })
      .then(() => {
        addName.value = "";
        addGrade.value = "";
      });
  }
});
