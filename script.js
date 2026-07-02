const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

// Format Time
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(2, "0")
    );
}

// Update Stopwatch
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start
startBtn.addEventListener("click", () => {

    if (isRunning) return;

    isRunning = true;

    startTime = Date.now() - elapsedTime;

    timer = setInterval(() => {

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    }, 10);

});

// Pause
pauseBtn.addEventListener("click", () => {

    clearInterval(timer);

    isRunning = false;

});

// Reset
resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    isRunning = false;

    elapsedTime = 0;

    lapCount = 0;

    lapList.innerHTML = "";

    updateDisplay();

});

// Lap
lapBtn.addEventListener("click", () => {

    if (!isRunning) return;

    lapCount++;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>🏁 Lap ${lapCount}</span>
        <strong>${formatTime(elapsedTime)}</strong>
    `;

    lapList.prepend(li);

});

// Initial Display
updateDisplay();

