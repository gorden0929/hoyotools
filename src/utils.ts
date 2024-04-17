import { Game, HoyoToolParams } from './interface';
import { games } from './value';

export const getMessages = (messageName: string, substitutions?: string | string[] | undefined) => {
  return chrome.i18n.getMessage(messageName, substitutions);
};

export const getHoyoToolParams = async () => {
  const data = await chrome.storage.sync.get('hoyoToolParams');
  console.log(data);

  const hoyoToolParams = data.hoyoToolParams;

  if (!hoyoToolParams || hoyoToolParams === undefined || hoyoToolParams === null || Object.keys(hoyoToolParams).length === 0) {
    console.log('hoyoToolParams is empty');
    const defaultHoyoToolParams = getDefaultHoyoToolParams();
    await setHoyoToolParams(defaultHoyoToolParams);
    return defaultHoyoToolParams;
  } else {
    return hoyoToolParams;
  }
};

export const setHoyoToolParams = async (hoyoToolParams: HoyoToolParams) => {
  return chrome.storage.sync.set({ hoyoToolParams });
};

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
    // Check if the current time has passed the CheckinDateTime
    return currentTime > checkInTime;
  } else {
    return false; // Not the same day
  }
};

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
