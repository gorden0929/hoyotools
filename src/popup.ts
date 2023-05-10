import { getMessages } from './utils';
import { chromeStorageKey, chromeStorageKeyOnOff } from './value';

const isCheckIn = async () => {
  const switchEl = document.getElementById('switchCheck') as HTMLInputElement;
  const result = await chrome.storage.sync.get(chromeStorageKeyOnOff);
  switchEl.checked = result[chromeStorageKeyOnOff] === true ? true : false;

  const el = document.getElementById('isCheckInText') as HTMLDivElement;
  const storageValue = await chrome.storage.sync.get(chromeStorageKey);
  const hsrLastCheckInStr: string = storageValue.hsrLastCheckIn;

  if (!hsrLastCheckInStr) {
    el.innerHTML = getMessages('notCheckIn');
    return;
  }
  const now = new Date();
  const hsrLastCheckInDate = new Date(hsrLastCheckInStr);

  if (
    hsrLastCheckInDate.getFullYear() === now.getFullYear() &&
    hsrLastCheckInDate.getMonth() === now.getMonth() &&
    hsrLastCheckInDate.getDate() === now.getDate()
  ) {
    el.innerHTML = getMessages('checkedIn');
    return;
  } else {
    el.innerHTML = getMessages('notCheckIn');
  }
}

const visitPageLinkEl = document.getElementById('visitPageLink') as HTMLAnchorElement;
visitPageLinkEl.innerHTML = getMessages('visitPage');

const switchTextEl = document.getElementById('switchCheckLabel') as HTMLDivElement;
switchTextEl.innerHTML = getMessages('turnOnOff');

const switchEl = document.getElementById('switchCheck') as HTMLInputElement;
switchEl.addEventListener('change', async (e) => {
  const checked = (<HTMLInputElement>e.target).checked;
  await chrome.storage.sync.set({ [chromeStorageKeyOnOff]: checked });
});


isCheckIn();