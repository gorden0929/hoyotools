import { Game } from './interface';
import { getHoyoToolParams, getMessages, setHoyoToolParams } from './utils';

async function setCheckInTime(game: Game) {
  const checkInTimeInput = document.getElementById(`${game}CheckInTimeInput`) as HTMLInputElement;
  const checkInTimeInputValue = checkInTimeInput.value;
  if (checkInTimeInputValue.length !== 5) {
    checkInTimeInput.value = '00:05';
    return;
  }
  const [hour, minute] = checkInTimeInputValue.split(':').map((v) => parseInt(v));
  if (hour === 0 && minute < 5) {
    checkInTimeInput.value = '00:05';
    return;
  }
  if (hour === 23 && minute > 55) {
    checkInTimeInput.value = '23:55';
    return;
  }
  const hoyoToolParams = await getHoyoToolParams();
  console.log(hoyoToolParams);
  hoyoToolParams[game].checkInTime = checkInTimeInputValue;
  await setHoyoToolParams(hoyoToolParams);
}

async function toggle(element: HTMLInputElement) {
  const game = element.value as Game;
  const hoyoToolParams = await getHoyoToolParams();
  console.log(hoyoToolParams);
  
  hoyoToolParams[game].isActive = element.checked;
  console.log(hoyoToolParams);
  await setHoyoToolParams(hoyoToolParams);
}

const DOMContentLoaded = async () => {
  const hoyoToolParams = await getHoyoToolParams();
  Object.keys(hoyoToolParams).forEach(async (key) => {
    const game = key as Game;
    const params = hoyoToolParams[game];
    console.log(params);
    // set checkbox
    const checkboxElement = document.getElementById(`${game}Checkbox`) as HTMLInputElement;
    console.log(checkboxElement.checked);
    
    checkboxElement.checked = params.isActive;
    // set time input
    const checkInTimeInputElement = document.getElementById(`${game}CheckInTimeInput`) as HTMLInputElement;
    checkInTimeInputElement.value = params.checkInTime;
    const checkInTimeElement = document.getElementById(`${game}CheckInTime`) as HTMLSpanElement;
    checkInTimeElement.innerHTML = params.checkInTime;
    // set status
    const checkInStatusElement = document.getElementById(`${game}CheckInStatus`) as HTMLDivElement;
    if (!params.lastCheckInDate) {
      checkInStatusElement.innerHTML = getMessages('notCheckIn');
    } else {
      if (new Date(params.lastCheckInDate).toDateString() === new Date().toDateString()) {
        checkInStatusElement.innerHTML = getMessages('checkedIn');
      } else {
        checkInStatusElement.innerHTML = getMessages('notCheckedIn');
      }
    }
    // set event listener for button
    const setCheckInTimeBtn = document.getElementById(`${game}SetCheckInTimeBtn`) as HTMLButtonElement;
    setCheckInTimeBtn.addEventListener('click', async () => {
      await setCheckInTime(game);
    });

    //m set event listener for checkbox
    checkboxElement.addEventListener('change', async (event) => {
      console.log(event.target);
      
      await toggle(event.target as HTMLInputElement);
    });
  });
  // set translation
  const turnOnElements = document.querySelectorAll('[data-ht-checkbox]');
  turnOnElements.forEach((element) => {
    element.innerHTML = getMessages('turnOn');
  });
  const setElements = document.querySelectorAll('[data-ht-set]');
  setElements.forEach((element) => {
    element.innerHTML = getMessages('set');
  });
  const timeSetElements = document.querySelectorAll('[data-ht-timeset]');
  timeSetElements.forEach((element) => {
    element.innerHTML = getMessages('timeSet');
  });
};
document.addEventListener('DOMContentLoaded', DOMContentLoaded);
