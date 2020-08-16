const clock__container = document.querySelector(".clock"),
  clock__title = clock__container.querySelector(".clock__title");

function getTime() {
  const date = new Date();
  const years = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  clock__title.innerText = `${years}년 ${month}월 ${day}일 ${
    hour < 10 ? `0${hour}시` : `${hour}시`
  } ${minute < 10 ? `0${minute}분` : `${minute}분`} ${
    second < 10 ? `0${second}초` : `${second}초`
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
