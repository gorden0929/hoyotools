import { Game, HoyoToolParams } from './interface';
import { games } from './value';

/**
 * Retrieves the localized message for the given message name.
 *
 * @param {string} messageName - The name of the message to retrieve.
 * @param {string | string[] | undefined} substitutions - Optional substitutions for the message.
 * @return {string} The localized message.
 */
export const getMessages = (messageName: string, substitutions?: string | string[] | undefined) => {
  return chrome.i18n.getMessage(messageName, substitutions);
};

/**
 * Retrieves the HoyoToolParams from the chrome storage sync. If the HoyoToolParams is empty,
 * it sets the default HoyoToolParams and returns it. Otherwise, it returns the retrieved HoyoToolParams.
 *
 * @return {Promise<HoyoToolParams>} The HoyoToolParams from the chrome storage sync.
 */
export const getHoyoToolParams = async () => {
  const data = await chrome.storage.sync.get('hoyoToolParams');
  const hoyoToolParams = data.hoyoToolParams;

  if (!hoyoToolParams || hoyoToolParams === undefined || hoyoToolParams === null || Object.keys(hoyoToolParams).length === 0) {
    console.log('hoyoToolParams is empty');
    const defaultHoyoToolParams = getDefaultHoyoToolParams();
    await setHoyoToolParams(defaultHoyoToolParams);
    return defaultHoyoToolParams as HoyoToolParams;
  } else {
    return hoyoToolParams as HoyoToolParams;
  }
};

/**
 * Sets the HoyoToolParams in the chrome storage sync.
 *
 * @param {HoyoToolParams} hoyoToolParams - The HoyoToolParams to be set.
 * @return {Promise<void>} A promise that resolves when the HoyoToolParams are set.
 */
export const setHoyoToolParams = async (hoyoToolParams: HoyoToolParams) => {
  return chrome.storage.sync.set({ hoyoToolParams });
};

/**
 * Determines if the current time has passed the specified check-in time based on the last check-in date.
 *
 * @param {Date | string | null} lastCheckInDate - The last check-in date.
 * @param {string} checkInTime - The check-in time in HH:mm format.
 * @return {boolean} True if the current time has passed the check-in time, false otherwise.
 */
export const hasReachedCheckInTime = (lastCheckInDate: Date | string | null, checkInTime: string) => {
  if (!lastCheckInDate || lastCheckInDate === null) {
    return true;
  }
  const lastCheckInDateTime = new Date(lastCheckInDate);
  const now = new Date();

  if (now.toDateString() === lastCheckInDateTime.toDateString()) {
    return false;
  }
  const [hour, minute] = checkInTime.split(':');
  const checkInHour = parseInt(hour, 10);
  const checkInMinute = parseInt(minute, 10);
  return now.getHours() > checkInHour || (now.getHours() === checkInHour && now.getMinutes() >= checkInMinute);
};

/**
 * Returns an object containing default HoyoToolParams for each game.
 *
 * @return {Record<Game, HoyoToolParams[keyof HoyoToolParams]>} An object with default HoyoToolParams for each game.
 */
const getDefaultHoyoToolParams = () => {
  return games.reduce((prev, curr) => {
    prev[curr] = {
      isActive: false,
      checkInTime: '00:05',
      lastCheckInDate: null,
    };
    return prev;
  }, {} as Record<Game, HoyoToolParams[keyof HoyoToolParams]>);
};
