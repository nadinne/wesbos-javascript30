//get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

let isPlaying = false;

function togglePlay() {
	video[video.paused ? 'play':'pause']();
	isPlaying = !video.paused;
}

function updateToggleButton() {
	const icon = this.paused ? "►" : "❚ ❚";
	toggle.innerHTML = icon;
}

function playing() {
	window.setInterval(updateProgress, 1000);
}

function updateProgress() {
	const currentProgress = 100*(video.currentTime/video.duration);
	progressBar.style.width = `${currentProgress}%`;
}

function changeRange() {
	video[this.name] = this.value;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth);
	video.currentTime = scrubTime * video.duration;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);
video.addEventListener("playing", playing);
video.addEventListener("timeupdate", updateProgress);

toggle.addEventListener("click", togglePlay);

ranges.forEach(range => range.addEventListener("change", changeRange));

skipButtons.forEach(button => button.addEventListener("click", skip))

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e) );
progress.addEventListener("mousedown", () => mousedown = true );
progress.addEventListener("mouseup", () => mousedown = false );

