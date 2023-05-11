import { chromeStorageKey, chromeStorageKeyOnOff, pageUrl } from './value';

const runCheck = async () => {
  const now = new Date();
  const storageValue = await chrome.storage.sync.get([chromeStorageKey, chromeStorageKeyOnOff]);
  const isOn = storageValue[chromeStorageKeyOnOff] === true ? true : false;
  if (typeof isOn === 'undefined') {
    await chrome.storage.sync.set({ [chromeStorageKeyOnOff]: isOn });
  } else if (isOn === false) {
    return;
  }
  // hsrLastCheckIn is a string
  const hsrLastCheckInStr: string = storageValue.hsrLastCheckIn;

  if (!hsrLastCheckInStr) {
    await openPage(now);
    return;
  }

  const hsrLastCheckInDate = new Date(hsrLastCheckInStr);

  // run this if it's a new day or it's the same day but after 12.05am
  if (
    // not same as today
    !(
      hsrLastCheckInDate.getFullYear() === now.getFullYear() &&
      hsrLastCheckInDate.getMonth() === now.getMonth() &&
      hsrLastCheckInDate.getDate() === now.getDate()
    ) &&
    // after 12.05am
    !(now.getHours() === 0 && now.getMinutes() < 5)
  ) {
    await openPage(now);
    return;
  }
}

const openPage = async (date: Date) => {
  await chrome.tabs.create({ url: pageUrl, active: false });
  await chrome.storage.sync.set({ [chromeStorageKey]: date.toISOString() });
}

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(runCheck);
