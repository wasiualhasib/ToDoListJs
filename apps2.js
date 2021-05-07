// 1. get value from form
// 2. add value to the listitem
// 3. remove data from listitem
// 4. clear all tasks
// 5. search item from listItem
// 6. remove single data from localStorage
// 7. clear all data from localStorage

//  THIS IS FOR LOG
function log(x) {
  return console.log(x);
}

// THIS IS FOR LOG DIR
function logd(x) {
  return console.dir(x);
}

const form = document.querySelector("form");
const taskList = document.querySelector("ul.collection");
const inputTask = document.querySelector("#task");
const clearTask = document.querySelector(".clear-tasks");
const filterTask = document.querySelector("#filter");
log(taskList);
// CALL  ALL LOAD EVENT
loadEventListener();
// LOAD EVENT FUNCTION STRUCTURE
function loadEventListener() {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeLi);
  clearTask.addEventListener("click", clearAllTask);
  filterTask.addEventListener("keyup", searchData);
}

function TaskStatus(e) {
  let thisItem = e.target.classList.contains("collection-item");
  let toggleItem = e.target.classList.contains("taskDone");
  if (thisItem) {
    e.target.classList.add("taskDone");
    e.target.style.backgroundColor = "#FFCCCB";
  }

  if (thisItem && toggleItem) {
    e.target.classList.remove("taskDone");
    e.target.style.backgroundColor = "";
  }
}

// RETURN li ELEMENT WITH STRUCTURE
const li = function (data = null, id = null) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.className = "collection-item";
  span.appendChild(document.createTextNode(`${data}`));
  li.appendChild(span);
  li.id = id;
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.href = "#";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  return li;
};

function month_name(dt) {
  mlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return mlist[dt];
}

// ADD TASK ELEMENT TO THE TASK LIST
function addTask(e) {
  e.preventDefault();
  let value = inputTask.value;
  let date =
    new Date().getDate() +
    "-" +
    month_name(new Date().getMonth()) +
    "-" +
    new Date().getFullYear();

  if (value == null || value == "") {
    return alert("No data found");
  }
  //   taskList.insertBefore(
  //     taskList.appendChild(li(value)),
  //     taskList.firstElementChild
  //   );

  // STORE IN LOCAL STORAGE
  let tasks = [];
  if (localStorage.getItem("tasks") == null) {
    log("Do nothing");
  } else {
    let getJsonData = JSON.parse(localStorage.getItem("tasks"));
    tasks = getJsonData;
  }
  tasks.push(`${value} (Created At: ${date})`);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getAllData();
  inputTask.value = "";
  log(taskList.firstElementChild);
}

function removeLi(e) {
  let getItem = e.target.parentNode.classList.contains("delete-item");
  let getLiItem = e.target.parentNode.classList.contains("collection");
  if (getLiItem) {
    TaskStatus(e);
  }
  if (getItem) {
    let x = confirm("Are you sure wana delete?");
    if (x) {
      e.target.parentNode.parentNode.remove();
      let getData = JSON.parse(localStorage.getItem("tasks"));
      let targetId = e.target.parentNode.parentNode.id;
      getData.splice(targetId, 1);
      let JsonData = JSON.stringify(getData);
      localStorage.setItem("tasks", JsonData);
    }
  }
}

function clearAllTask(e) {
  //   while (taskList.firstElementChild) {
  //     taskList.removeChild(taskList.firstChild);
  //   }
  let x = confirm("Are you sure to delete all content?");
  log(x);
  if (x) {
    localStorage.clear();
  } else {
    getAllData();
  }

  // OR YOU CAN USE taskList.innerHTML=''
  taskList.innerHTML = "";

  e.preventDefault();
}

function searchData(e) {
  let getVal;
  getVal = e.target.value.toLowerCase();
  let getItem = document.querySelectorAll("ul.collection>li");
  getItem.forEach(function (task) {
    let item = task.textContent.toLowerCase();
    if (item.indexOf(getVal) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function getAllData() {
  taskList.innerHTML = "";
  let getJsonData = JSON.parse(localStorage.getItem("tasks"));
  if (getJsonData == null) {
  } else {
    let reverseData = getJsonData.reverse();
    for (x in reverseData) {
      taskList.appendChild(li(reverseData[x], x));
    }
  }
}
getAllData();
