// initial display
display();

const empForm = document.querySelector("#emp-form");

empForm.addEventListener("submit", addEmployee);

function addEmployee(e) {
  e.preventDefault();

  //   get values
  const empid = document.querySelector("#emp-id").value;
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const joinDate = document.querySelector("#join-date").value;

  const employee = getEmployee();

  employee.push({
    id: empid,
    firstName: firstName,
    lastName: lastName,
    joinDate: joinDate,
  });

  saveEmployee(employee);

  display();
  clear();
}

// reset input fields
function clear() {
  document.querySelector("#emp-id").value = "";
  document.querySelector("#first-name").value = "";
  document.querySelector("#last-name").value = "";
  document.querySelector("#join-date").value = "";
}

// get data from local storage
function getEmployee() {
  let employee = localStorage.getItem("employees");

  if (employee === null) {
    employee = [];
  } else {
    employee = JSON.parse(employee);
  }

  return employee;
}

// save data to local storage
function saveEmployee(employee) {
  localStorage.setItem("employees", JSON.stringify(employee));
}

// display
function display() {
  let employee = getEmployee();

  let addRow = "";
  employee.forEach((emp, index) => {
    addRow += `
        <tr class="table-row">
            <td>${emp.id}</td>
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.joinDate}</td>
            <td><button id=${index} onclick="editEmployee(this.id)" class="btn btn-primary edit-btn">Edit</button></td>
            <td><button id=${index} onclick="deleteEmployee(this.id)" class="btn btn-danger delete-btn">delete</button></td>
        </tr>
    
    `;
  });

  const tablebody = document.querySelector(".table-body");

  if (employee.length !== 0) {
    tablebody.innerHTML = addRow;
  } else {
    tablebody.innerHTML = "No Record";
  }
}

// delete
function deleteEmployee(index) {
  const employee = getEmployee();

  employee.splice(index, 1);

  saveEmployee(employee);

  display();
}
console.dir(document.querySelector("#submit-btn"));

// edit
function editEmployee(index) {
  const employee = getEmployee();

  document.querySelector("#save-index").value = index;

  document.querySelector("#emp-id").value = employee[index].id;
  document.querySelector("#first-name").value = employee[index].firstName;
  document.querySelector("#last-name").value = employee[index].lastName;
  document.querySelector("#join-date").value = employee[index].joinDate;

  document.querySelector("#save-btn").style.display = "block";
  document.querySelector("#submit-btn").style.display = "none";
}

// save functionality
document.querySelector("#save-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const employee = getEmployee();

  const index = document.querySelector("#save-index").value;
  const empid = document.querySelector("#emp-id").value;
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const joinDate = document.querySelector("#join-date").value;

  employee[index].id = empid;
  employee[index].firstName = firstName;
  employee[index].lastName = lastName;
  employee[index].joinDate = joinDate;

  saveEmployee(employee);

  display();
  clear();

  document.querySelector("#save-btn").style.display = "none";
  document.querySelector("#submit-btn").style.display = "block";
});
