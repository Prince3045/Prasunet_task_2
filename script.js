let timer; // To store the interval
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapResetButton = document.getElementById('lapReset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startStopButton.textContent = 'Start';
    } else {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        startStopButton.textContent = 'Stop';
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        let lapTime = formatTime(elapsedTime);
        laps.unshift(lapTime); // Add lap time to the beginning of laps array
        let li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.insertBefore(li, lapsList.firstChild);
    }
}

startStopButton.addEventListener('click', startStop);
lapResetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
