import { Game } from './interface';
import { getHoyoToolParams, hasReachedCheckInTime } from './utils';
import { checkIn } from './value';

const run = async () => {
  const hoyoToolParams = await getHoyoToolParams();

  Object.keys(hoyoToolParams).forEach(async (key) => {
    const game = key as Game;
    const params = hoyoToolParams[game];
    if (!params.isActive) {
      return;
    }
    if (hasReachedCheckInTime(params.lastCheckInDate, params.checkInTime)) {
      await openPage(game);
    }
    return;
  });
};

const openPage = async (game: Game) => {
  await chrome.tabs.create({ url: checkIn[game].pageUrl, active: false });
  // await chrome.storage.sync.set({ [chromeStorageKey]: date.toISOString() });
};

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(run);
