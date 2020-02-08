
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');

let timeInSecs = 0;

const zeroPad = (num, places) => String(num).padStart(places, '0');

function handleTimerClick() {
	stopTimer();
	timeInSecs = parseInt(this.dataset.time);
	updateTimerDisplay(timeInSecs);
	updateBeBackTimeDisplay(timeInSecs);
	setInterval(countdown, 1000);
}

function countdown() {
	if (timeInSecs == 0) {
		clearInterval();
		return;
	}

	--timeInSecs;
	updateTimerDisplay(timeInSecs);
}

function stopTimer() {
	timeInSecs = 0;
}

function updateTimerDisplay(time) {
	const {minutes, seconds} = formatTime(time);
	timerDisplay.innerHTML = `${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
}

function updateBeBackTimeDisplay(time) {
	const {minutes, seconds} = formatTime(time);
	endTimeDisplay.innerHTML = "Be back later at " + formatTimeFromNow(minutes, seconds);
}

function formatTime(timeInSecs) {

//hour = 60 minutes, minute = 60 seconds	
//case 1: 3600 seconds is 60:00
//case 2: 20 seconds is 00:20
//case 3: 900 seconds is 15:00

	let seconds, minutes;

	if (timeInSecs >= 60) { 
		seconds = Math.floor(timeInSecs % 60);
  		minutes = Math.floor(timeInSecs / 60);		
	} else {
		seconds = timeInSecs;
		minutes = 0;
	}

	return { minutes: minutes, seconds: seconds}

}

function formatTimeFromNow(minutesFromNow, secondsFromNow) {
	const now = new Date();
	const seconds = now.getSeconds() + secondsFromNow;
	
	let minutes = now.getMinutes() + minutesFromNow;
	let hour = now.getHours();

	if (minutes >= 60) {
		hour = hour + Math.floor(minutes / 60);
		minutes = Math.floor(minutes % 60);
	}

	if (seconds >= 60) {
		minutes = minutes + Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
	}

	return `${hour}:${minutes}`;
}

timerButtons.forEach(timer => timer.addEventListener('click', handleTimerClick));