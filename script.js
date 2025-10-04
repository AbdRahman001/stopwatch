const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");
const themeToggleButton = document.getElementById("theme-toggle");

let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;
let lapCount = 0;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds.toString().padStart(3, "0");
  display.innerText = `${h}:${m}:${s}.${ms}`;
}

function stopwatch() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

// Starts the stopwatch
startButton.addEventListener("click", () => {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 10);
});

// Stops the stopwatch
stopButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

// Reset button
resetButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  startStopButton.innerText = "START";
  startStopButton.classList.remove("start-active", "stop-active");
  lapsList.innerHTML = "";
  lapCount = 0;
});


// LAP button
lapButton.addEventListener("click", () => {
  if (timer === null) return; // Prevent lap recording if stopwatch is not running
  lapCount++;
  let lapDisplayTime = display.innerText;
  let lapItem = document.createElement("li");
  lapItem.innerText = `Lap ${lapCount}: ${lapDisplayTime}`;
  lapsList.appendChild(lapItem);
});

// Theme toggle
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeToggleButton.innerText = "🌞"; // switch to light theme
  } else {
    themeToggleButton.innerText = "🌙"; // switch to dark theme 
  }
});

// initialize display
updateDisplay();
