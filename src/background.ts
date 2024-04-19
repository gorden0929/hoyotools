import { Game } from './interface';
import { getHoyoToolParams, hasReachedCheckInTime } from './utils';
import { checkIn } from './value';
/**
 * runs the check-in process for each game based on the provided parameters.
 */
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

/**
 * Opens a new tab with the specified game's page URL if it is not already open.
 *
 * @param {Game} game - The game whose page URL will be opened.
 * @return {Promise<void>} A promise that resolves when the tab is created or if it is already open.
 */
const openPage = async (game: Game) => {
  // check if the page is already open
  const tabs = await chrome.tabs.query({ url: `${checkIn[game].pageUrl}*` });  
  if (tabs.length > 0) {
    return;
  }
  await chrome.tabs.create({ url: checkIn[game].pageUrl, active: false });
};

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(run);
