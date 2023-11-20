'use strict';

import { onEvent, select, selectAll } from "./utils.js";

const timeNow = select('.time-now');
const alarmTime = select('.alarm-time');
const hour = select('.hour');
const minute = select('.minute');

setInterval(setTime, 1000);

function setTime() {
    let today = new Date();
    let hr = today.getHours();
    let min = today.getMinutes();

    timeNow.innerText = `${hr}:${min}`;
}
