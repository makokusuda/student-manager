const listButton = document.getElementById("list-button");
const listDisplayArea = document.getElementById("list-area");

listButton.addEventListener("click", () => {
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "query { Students { id name grade } }",
    }),
  })
    .then((res) => res.json())
    .then(
      (
        res //console.table(res.data.Students
      ) => {
        listDisplayArea.innerHTML = "";
        res.data.Students.forEach((student) => {
          displayToPage(student);
        });
      }
    );
});

const displayToPage = (value) => {
  const studentInfo = document.createElement("p");
  studentInfo.innerHTML = "Name : " + value.name + ", Grade : " + value.grade;
  listDisplayArea.appendChild(studentInfo);
};
