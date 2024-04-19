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
  // Get the current date
  const now = new Date();

  // Get the current time in the format HH:mm
  const currentTime = now.getHours() + ':' + now.getMinutes();

  // Check if the current date is the same as the lastCheckinDateTime's date
  if (now.toDateString() === new Date(lastCheckInDate).toDateString()) {
    return false;
  } else {
    // Check if the current time has passed the CheckinDateTime
    return currentTime > checkInTime;
  }
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
