const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.setAttribute('disabled', '');

let timerId = null;

startBtn.addEventListener('click', onStartGenerate);

stopBtn.addEventListener('click', onStopGenerate);

const bodyColor = document.body.style;

function onStartGenerate() {
  bodyColor.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    bodyColor.backgroundColor = getRandomHexColor();
  }, 1000);

  if (stopBtn.attributes.disabled) {
    startBtn.setAttribute('disabled', '');
    stopBtn.removeAttribute('disabled', '');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopGenerate() {
  clearInterval(timerId);

  if (startBtn.attributes.disabled) {
    startBtn.removeAttribute('disabled', '');
    stopBtn.setAttribute('disabled', '');
  }
}
