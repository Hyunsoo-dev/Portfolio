const body = document.querySelector("body");

function paintImage() {
  const image = new Image();
  image.src = `img/6.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  paintImage();
}

init();
