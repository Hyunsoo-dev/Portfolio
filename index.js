const user__container = document.querySelector(".user"),
  user__name = user__container.querySelector(".user__name");

const NAME = "name";
const NONE_SHOWING = "none_showing";
function loadName() {
  const name = user__name.value;
  localStorage.setItem(NAME, name);

  user__name.value = "";
}

function getName() {
  const name = localStorage.getItem(NAME);
  console.log(name);
  if (name === null) {
    user__container.addEventListener("submit", loadName);
  } else {
    user__name.classList.add(NONE_SHOWING);
    const div = document.createElement("div");
    div.classList.add("userName");
    div.innerHTML = `${name}님 환영합니다.`;
    user__container.append(div);
  }
}

function init() {
  getName();
  user__container.addEventListener("submit", loadName);
}
init();
