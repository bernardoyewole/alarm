'use strict';

import { onEvent, select, selectAll } from "./utils.js";

const alarmSound = new Audio('./assets/audio/alarm-sound.mp3');
alarmSound.type = 'audio/mp3';

const timeNow = select('.time-now');
const alarmTime = select('.alarm-time');
const hour = select('.hour');
const minute = select('.minute');
const setAlarm = select('.set-alarm');
const SECOND_IN_MILLISECONDS = 1000;

onEvent('load', window, () => {
    hour.value = '';
    minute.value = '';
});

function setTime() {
    let today = new Date();
    let hr = today.getHours().toString().padStart(2, '0');
    let min = today.getMinutes().toString().padStart(2, '0');
    timeNow.innerText = `${hr}:${min}`;
}

setInterval(setTime, SECOND_IN_MILLISECONDS);

function isValidHr(hr) {
    if (hr !== '' && /^(0?[0-9]|1[0-9]|2[0-3])$/.test(hr)) {
        return true;
    }

    hour.value = "";
    hour.focus();
    return false;

}

function isValidMin(min) {
    if (min !== '' && /^([0-5][0-9])$/.test(min)) {
        return true;
    }

    minute.value = "";
    minute.focus();
    return false;

}

function bothInvalid() {
    if (!isValidHr(hour.value) && !isValidMin(minute.value)) {
        hour.focus();
    }
}

function setAlarmTime(hr, min) {
    alarmTime.innerText = `${hr.padStart(2, '0')}:${min}`;
    hour.value = "";
    minute.value = "";
}

function validateInput() {
    let hr = hour.value;
    let min = minute.value;

    if (isValidHr(hr) && isValidMin(min)) {
        setAlarmTime(hr, min);
    } else {
        isValidHr(hr);
        isValidMin(min);
    }
}

onEvent('click', setAlarm, () => {
    validateInput();
    bothInvalid();

    if (intervalId) {
        clearInterval(intervalId);
    }
    // Set up the interval again
    intervalId = setInterval(playSound, SECOND_IN_MILLISECONDS);
});

function compare() {
    let alarm = alarmTime.innerText;
    return alarm === timeNow.innerText;
}

let isSoundPlaying = false;

function playSound() {
    if (compare() && !isSoundPlaying) {
        alarmSound.play();
        isSoundPlaying = true;

        setTimeout(function () {
            alarmSound.pause();
            isSoundPlaying = false;
            // Clearing the interval
            clearInterval(intervalId);
        }, 20 * SECOND_IN_MILLISECONDS);
    }
}

let intervalId = setInterval(playSound, SECOND_IN_MILLISECONDS);