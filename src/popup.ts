import { Game } from './interface';
import { getHoyoToolParams, getMessages, setHoyoToolParams } from './utils';

/**
 * Sets the check-in time for a game.
 *
 * @param {Game} game - The game for which to set the check-in time.
 * @return {Promise<void>} - A promise that resolves when the check-in time is set.
 */
async function setCheckInTime(game: Game) {
  const checkInTimeInput = document.getElementById(`${game}CheckInTimeInput`) as HTMLInputElement;
  const checkInTimeInputValue = checkInTimeInput.value;
  if (checkInTimeInputValue.length !== 5) {
    checkInTimeInput.value = '00:05';
    return;
  }
  const [hour, minute] = checkInTimeInputValue.split(':').map(v => parseInt(v));
  if (hour === 0 && minute < 5) {
    checkInTimeInput.value = '00:05';
    return;
  }
  if (hour === 23 && minute > 55) {
    checkInTimeInput.value = '23:55';
    return;
  }
  const hoyoToolParams = await getHoyoToolParams();
  hoyoToolParams[game].checkInTime = checkInTimeInputValue;
  await setHoyoToolParams(hoyoToolParams);
  const checkInTimeElement = document.getElementById(`${game}CheckInTime`) as HTMLSpanElement;
  checkInTimeElement.innerHTML = checkInTimeInputValue;
}

/**
 * Toggles the isActive property of a game based on the element checked status.
 *
 * @param {HTMLInputElement} element - The HTML input element triggering the toggle.
 * @return {Promise<void>} - A promise that resolves after toggling the isActive property.
 */
async function toggle(element: HTMLInputElement) {
  const game = element.value as Game;
  const hoyoToolParams = await getHoyoToolParams();
  hoyoToolParams[game].isActive = element.checked;
  await setHoyoToolParams(hoyoToolParams);
}

const DOMContentLoaded = async () => {
  const hoyoToolParams = await getHoyoToolParams();
  Object.keys(hoyoToolParams).forEach(async key => {
    const game = key as Game;
    const params = hoyoToolParams[game];
    // set checkbox
    const checkboxElement = document.getElementById(`${game}Checkbox`) as HTMLInputElement;
    checkboxElement.checked = params.isActive;
    // set time input
    const checkInTimeInputElement = document.getElementById(`${game}CheckInTimeInput`) as HTMLInputElement;
    checkInTimeInputElement.value = params.checkInTime;
    // set time
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
    checkboxElement.addEventListener('change', async event => {
      await toggle(event.target as HTMLInputElement);
    });
  });
  // set translation
  const turnOnElements = document.querySelectorAll('[data-ht-checkbox]');
  turnOnElements.forEach(element => {
    element.innerHTML = getMessages('turnOn');
  });
  const setElements = document.querySelectorAll('[data-ht-set]');
  setElements.forEach(element => {
    element.innerHTML = getMessages('set');
  });
  const timeSetElements = document.querySelectorAll('[data-ht-timeset]');
  timeSetElements.forEach(element => {
    element.innerHTML = getMessages('timeSet');
  });
};
document.addEventListener('DOMContentLoaded', DOMContentLoaded);
