import _ from "lodash";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

let eklenecek = document.querySelector(".eklenecek");
let pnAdd = document.querySelector(".pnAdd");
let nameValue = document.querySelector("#projectName");
let addObjectButton = document.querySelector(".addObjectButton");
let form = document.querySelector(".d-none");
let changeForm = document.querySelector(".changeForm");
let submit = document.querySelector(".submit");
let topic = document.querySelector("#topic");
let desc = document.querySelector("#desc");
let booleanS = document.querySelector("#exampleCheckOne");
let topicOne = document.querySelector("#topicOne ");
let descOne = document.querySelector("#descOne ");
let booleanSOne = document.querySelector("#exampleCheckOneOne ");
let submit2 = document.querySelector(".submit2");
let renderObjects = document.querySelector(".renderObjects");
let givenId = 1;
let projectArr = [];
let toDoList = {};
let selectedProject;
let deleteItem;
let projectItem;
let addNewKeyToObject;
let previousProject;
let addNewKeyToObjectOne;
let selectedToDoIndex;

// Main arrayine index ekleme ve onu seçme
pnAdd.addEventListener("click", () => {
  if (projectArr.includes(nameValue.value)) {
    alert("You have the same project name. Please Add Different Project Name!");
  } else {
    projectArr.push(nameValue.value);

    renderProjects();
    toDoList[nameValue.value] = [];
  }
});

//Render Project Name
let renderProjects = () => {
  eklenecek.innerHTML = "";
  for (let i = 0; i < projectArr.length; i++) {
    let div = document.createElement("div");
    div.classList.add(
      "d-flex",
      "justify-content-between",
      "row",
      "my-2",
      "bg-primary",
      "elmtAll"
    );
    div.innerHTML = `
        <h4 id="project${i}" class="btn my-auto text-warning px-2 forSel">${projectArr[i]}</h4>
        <button id="button${i}" class="btn my-auto bg-light delete">Delete</button>  
     `;
    eklenecek.appendChild(div);
    deleteItem = document.querySelector(`#button${i}`);
    deleteItem.addEventListener("click", () => deleteArr(i));
    projectItem = document.querySelector(`#project${i}`);
    projectItem.addEventListener("click", selectArr);
  }
  if (!!previousProject) {
    const oldproject = document.getElementById(previousProject);

    oldproject.classList.add("border", "border-warning");
  }
};

// Array elementinden seçileni silme
let deleteArr = (i) => {
  let projectName = projectArr.find((_, index) => index === i);
  projectArr = projectArr.filter((_, index) => index !== i);
  delete toDoList[projectName];
  previousProject = null;
  renderProjects();
  renderProjectsLibrary();
};

// Array içindeki her bir indexi seçmek ve ne yapacağını söyleme;
function selectArr(e) {
  if (!!previousProject) {
    const oldproject = document.getElementById(previousProject);
    oldproject.classList.remove("border", "border-warning");
  }
  previousProject = this.id;

  selectedProject = e.target.innerHTML;
  this.classList.add("border", "border-warning");
  renderProjectsLibrary();
}

// iner object factory function
const addObjectKey = (givenId, topic, desc, booleanS) => {
  return { givenId, topic, desc, booleanS };
};

//Project Library open
addObjectButton.addEventListener("click", () => {
  form.classList.toggle("d-none");
  changeForm.classList.add("d-none");
});

// When Project librariy submited
submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (!selectedProject) {
    if (projectArr.length === 0) {
      alert("Add Project Name!");
    } else {
      alert("Please Choose Project!");
    }
    // return;
  } else if (topic.value === "" || desc.value === "") {
    alert("Please add some topic and description!");
  } else {
    addNewKeyToObject = addObjectKey(
      givenId,
      topic.value,
      desc.value,
      booleanS.checked
    );
    givenId++;

    toDoList[selectedProject].push(addNewKeyToObject);
    form.classList.add("d-none");
    console.log("aaaa");
    renderProjectsLibrary();
  }
});

// Render Project Library
let renderProjectsLibrary = () => {
  renderObjects.innerHTML = "";
  if (toDoList[selectedProject]) {
    for (let i = 0; i < toDoList[selectedProject].length; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.classList.add(
        "row",
        "border-bottom",
        "border-warning",
        "row",
        "mt-1",
        "mx-3"
      );
      mainDiv.innerHTML = `
      <div class="col-1 d-flex justify-content-center">
                            <input id="exampleCheck" type="checkbox" class="form-check-input mx-auto my-3 text-warning">
                        </div>
                        <div class="col-2 d-flex justify-content-center ">
                            <p id="topics" class="my-auto text-warning">${
                              toDoList[selectedProject][i].topic
                            }</p>
                        </div>
                        <div class="col-4 d-flex justify-content-center">
                            <p id="description" class="my-auto text-warning">${
                              toDoList[selectedProject][i].desc
                            }</p>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <p id="importance" class="my-auto text-warning">${
                              toDoList[selectedProject][i].booleanS
                                ? "Urgent"
                                : "Normal"
                            }</p>
                        </div>
                        <div class="col-3  d-flex justify-content-center">
                            <button id="change${i}" type="button" class="btn btn-primary my-auto text-warning" data-toggle="modal" data-target="#exampleModal">Change</button>
                        </div>
      `;
      renderObjects.appendChild(mainDiv);
      let changed = document.querySelector(`#change${i}`);
      changed.addEventListener("click", () => changeButton(i));
    }
  }
};

let changeButton = (i) => {
  form.classList.add("d-none");
  changeForm.classList.remove("d-none");
  selectedToDoIndex = i;
};
submit2.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(toDoList[selectedProject]);

  if (topicOne.value === "" || descOne.value === "") {
    alert("Please add some topic and description!");
  } else {
    addNewKeyToObject = addObjectKey(
      givenId,
      topicOne.value,
      descOne.value,
      booleanSOne.checked
    );
    // console.log(toDoList, i);
    toDoList[selectedProject][selectedToDoIndex] = addNewKeyToObject;
    // console.log(toDoList, i);
    renderProjectsLibrary();
  }

  changeForm.classList.add("d-none");
});
//projectArr = [{ okul: [{ topic: "", desk: "" }] }, { react: [] }, {}];
