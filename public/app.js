const listButton = document.getElementById("list-button");
const listDisplayArea = document.getElementById("list-area");
const filterButton = document.getElementById("filter-button");
const filterId = document.getElementById("filter-id");
const filterName = document.getElementById("filter-name");
const filterGrade1 = document.getElementById("filter-grade1");
const filterGrade2 = document.getElementById("filter-grade2");
const filterGrade3 = document.getElementById("filter-grade3");

const addButton = document.getElementById("add-button");
const addName = document.getElementById("add-name");
const addGrade = document.getElementById("add-grade");
const updateDisplayArea = document.getElementById("updated-display-area");

const displayToPage = (value) => {
  const studentInfo = document.createElement("p");
  studentInfo.innerHTML = "Name : " + value.name + ", Grade : " + value.grade;
  listDisplayArea.appendChild(studentInfo);
};

//search and display all students
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

//search and display filtered students
filterButton.addEventListener("click", () => {
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "query { Students { id name grade } }",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      let result = res.data.Students;
      if (!!filterId.value) {
        result = result.filter((student) => student.id === filterId.value);
      }
      if (!!filterName.value) {
        result = result.filter((student) => student.name === filterName.value);
      }
      if (
        !(
          !filterGrade1.checked &&
          !filterGrade2.checked &&
          !filterGrade3.checked
        )
      ) {
        const arr = [];
        if (filterGrade1.checked) {
          arr.push(1);
        }
        if (filterGrade2.checked) {
          arr.push(2);
        }
        if (filterGrade3.checked) {
          arr.push(3);
        }
        result = result.filter((student) => arr.includes(student.grade));
      }
      return result;
    })
    .then((res) => {
      listDisplayArea.innerHTML = "";
      res.forEach((student) => {
        displayToPage(student);
      });
    });
});

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
