const toDo = document.querySelector(".toDo");
const toDo__list = document.querySelector(".toDo__list");
const pending__list = document.querySelector(".pending__list");
const finished__list = document.querySelector(".finished__list");

const PENDING_LIST = "pending";
const FINISHED_LIST = "finished";
let pend = [];
let fini = [];
function removePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pending__list.removeChild(li);
  const cleanPending = pend.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  pend = cleanPending;
  setPending();
}

function removeFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finished__list.removeChild(li);
  const cleanFinished = fini.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  fini = cleanFinished;
  setFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDo__list.value;
  loadList(currentValue);
}
function loadList(value) {
  const li = document.createElement("li");
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  const newId = pend.length + 1;
  btn1.innerHTML = "🚫";
  btn2.innerHTML = "✔";
  li.id = newId;
  li.append(value, btn1, btn2);
  pending__list.append(li);
  const pendObj = {
    id: newId,
    value: value,
  };
  pend.push(pendObj);
  setPending();
  toDo__list.value = "";
  btn1.addEventListener("click", removePending);

  btn2.addEventListener("click", loadFinished);
  btn2.addEventListener("click", removePending);
}
function setPending() {
  localStorage.setItem(PENDING_LIST, JSON.stringify(pend));
}
function getPending() {
  const loadedValue = localStorage.getItem(PENDING_LIST);
  console.log(loadedValue);
  if (loadedValue !== null) {
    const parsedPending = JSON.parse(loadedValue);
    parsedPending.forEach(function (todo) {
      loadList(todo.value);
    });
  }
}
function loadPending(event) {
  event.preventDefault();
  const finishedBtn = event.target;
  const finishedLi = finishedBtn.parentNode;
  const finishedId = finishedLi.id;
  const loadedFinished = localStorage.getItem(FINISHED_LIST);
  const parsedFinished = JSON.parse(loadedFinished);
  const moveList = parsedFinished.filter(function (todo) {
    return parseInt(finishedId) === todo.id;
  });
  moveList.forEach(function (todo) {
    loadList(todo.value);
  });
  setPending();
}
function loadFinished(event) {
  const pendingBtn = event.target;
  const pendingLi = pendingBtn.parentNode;
  const loadedPending = localStorage.getItem(PENDING_LIST);
  const parsedPending = JSON.parse(loadedPending);
  const moveList = parsedPending.filter(function (todo) {
    return parseInt(pendingLi.id) === todo.id;
  });
  moveList.forEach(function (todo) {
    fini.push(todo);
    addFinishedList(todo);
  });

  console.log(fini);
  setFinished();
}
function addFinishedList(moveList) {
  let value = moveList.value;
  let newId = moveList.id;
  const li = document.createElement("li");
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  li.id = newId;
  btn1.innerHTML = "🚫";
  btn2.innerHTML = "✔";

  li.append(value, btn1, btn2);
  finished__list.append(li);
  btn1.addEventListener("click", loadPending);
  btn1.addEventListener("click", removeFinished);
  btn2.addEventListener("click", removeFinished);
}
function setFinished() {
  localStorage.setItem(FINISHED_LIST, JSON.stringify(fini));
}
function getFinishedList() {
  const loadedValue = localStorage.getItem(FINISHED_LIST);
  console.log(loadedValue);
  if (loadedValue !== null) {
    const parsedFinished = JSON.parse(loadedValue);
    parsedFinished.forEach(function (todo) {
      addFinishedList(todo);
    });
  }
}
function init() {
  getPending();
  getFinishedList();
  toDo.addEventListener("submit", handleSubmit);
}
init();
