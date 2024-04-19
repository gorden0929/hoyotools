import { Game, InfoResponse } from './interface';
import { getHoyoToolParams, hasReachedCheckInTime, setHoyoToolParams } from './utils';
import { checkIn } from './value';

const main = async () => {
  console.log('run auto check in');
  const game = detectGame();
  if (!game) {
    console.log('game not supported');
    return;
  }
  const hoyoToolParams = await getHoyoToolParams();

  if (!hoyoToolParams[game].isActive) {
    console.log('auto check in not active');
    return;
  }

  if (!hasReachedCheckInTime(hoyoToolParams[game].lastCheckInDate, hoyoToolParams[game].checkInTime)) {
    console.log('auto check in not reached time');
    return;
  }

  const infoResponse = await call<InfoResponse>(`${checkIn[game].infoUrl}`);
  const infoData = infoResponse.data;
  // check if today is signed
  if (!infoData || infoData.is_sign) {
    console.log('already signed');
    // if last check in date is not today
    if (new Date(hoyoToolParams[game].lastCheckInDate ?? new Date('2000-01-01')).toDateString() !== new Date().toDateString()) {
      console.log('last check in date is not today');
      hoyoToolParams[game].lastCheckInDate = new Date().toISOString();
      await setHoyoToolParams(hoyoToolParams);
    }
    return;
  }
  console.log('check in');
  const result = await call(`${checkIn[game].signUrl}&lang=${getLanguage()}`, 'POST', {
    act_id: checkIn[game].actId,
    lang: getLanguage(),
  });
  if (result) {
    hoyoToolParams[game].lastCheckInDate = new Date().toISOString();
    await setHoyoToolParams(hoyoToolParams);
  }
};

/**
 * Detects the game based on the 'act_id' parameter in the URL.
 *
 * @return {Game | undefined} The detected game, or undefined if no game is found.
 */
const detectGame = () => {
  const url = new URL(window.location.toString());
  const params = new URLSearchParams(url.search);
  const actId = params.get('act_id')!;
  return Object.keys(checkIn).find(game => {
    if (actId === checkIn[game as keyof typeof checkIn].actId) {
      return game;
    }
  }) as Game | undefined;
};

/**
 * Sends an HTTP request to the specified URL using the specified method and body.
 *
 * @param {string | URL} url - The URL to send the request to.
 * @param {'POST' | 'GET'} [method='GET'] - The HTTP method to use for the request. Defaults to 'GET'.
 * @param {any} [body=undefined] - The request body to send with the request. Defaults to undefined.
 * @return {Promise<ReponseType>} - A promise that resolves to the response body parsed as JSON.
 */
const call = async <ReponseType = any>(url: string | URL, method: 'POST' | 'GET' = 'GET', body: any = undefined): Promise<ReponseType> => {
  const reqInit: RequestInit = {
    method,
    mode: 'cors',
    credentials: 'include',
    referrerPolicy: 'strict-origin-when-cross-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    reqInit.body = JSON.stringify(body);
  }
  const response = await fetch(url, reqInit);
  return response.json();
};

/**
 *
 * @returns Language code in format of "en-us"
 */
const getLanguage = () => {
  const url = window.location.toString();
  const urlObj = new URL(url);
  const langFromUrl = urlObj.searchParams.get('lang');
  if (langFromUrl) {
    return langFromUrl;
  }
  const lang = chrome.i18n.getUILanguage().replace('_', '-').toLowerCase();
  return lang;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
