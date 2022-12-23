import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputLib = document.getElementById('datetime-picker');
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};

const SELECTED_DATE = 'selectedDates';
let timerId = null;

refs.startBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', onStartCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      //   alert('Please choose a date in the future');
      Report.warning('Please choose a date in the future', '');
    }
    if (selectedDates[0] > options.defaultDate) {
      refs.startBtn.removeAttribute('disabled', '');
    }

    localStorage.setItem(SELECTED_DATE, Date.parse(selectedDates[0]));
  },
};

flatpickr(inputLib, options);

function onStartCounter() {
  const currentDate = Date.parse(options.defaultDate);

  const futureDate = localStorage.getItem(SELECTED_DATE);

  let finalDateValue = futureDate - currentDate;

  timerId = setInterval(() => {
    finalDateValue -= 1000;

    const dateTimer = convertMs(finalDateValue);
    onUpdateClockFace(dateTimer);

    if (
      Number(dateTimer.seconds) === 0 &&
      Number(dateTimer.days) === 0 &&
      Number(dateTimer.hours) === 0 &&
      Number(dateTimer.minutes) === 0
    ) {
      clearInterval(timerId);
    }
  }, 1000);

  if (!refs.startBtn.disabled) {
    refs.startBtn.setAttribute('disabled', '');
  }
}

function onUpdateClockFace({ days, hours, minutes, seconds }) {
  refs.dataSeconds.textContent = `${seconds}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataDays.textContent = `${days}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
