import { Game, GenshinResignInfoResponse, HSRInfoResponse, Honkai3InfoResponse } from './interface';
import { getHoyoToolParams, hasReachedCheckInTime, setHoyoToolParams } from './utils';
import { checkIn } from './value';

const main = async () => {
  const game = detectGame();
  if (!game) {
    return;
  }
  const hoyoToolParams = await getHoyoToolParams();

  if (!hoyoToolParams[game].isActive) {
    return;
  }

  if (!hasReachedCheckInTime(hoyoToolParams[game].lastCheckInDate, hoyoToolParams[game].checkInTime)) {
    return;
  }

  if (game === 'genshin') {
    const resignInfoResponse: GenshinResignInfoResponse = await call(`${checkIn.genshin.infoUrl}`);
    const resignInfoData = resignInfoResponse.data;
    if (!resignInfoData || resignInfoData.signed) {
      console.log('signed');
      return;
    }
    const result = await call(`${checkIn.genshin.signUrl}&lang=${getLanguage()}`, 'POST', {
      act_id: checkIn.genshin.actId,
      lang: getLanguage(),
    });
    if (result) {
      hoyoToolParams.genshin.lastCheckInDate = new Date().toISOString();
      await setHoyoToolParams(hoyoToolParams);
    }
  } else if (game === 'hsr') {
    const infoResponse: HSRInfoResponse = await call(checkIn.hsr.infoUrl);
    const infoData = infoResponse.data;
    if (!infoData || infoData.is_sign) {
      console.log('signed');
      return;
    }
    const result = await call(checkIn.hsr.signUrl, 'POST', {
      act_id: checkIn.hsr.actId,
      lang: getLanguage(),
    });
    if (result) {
      hoyoToolParams.hsr.lastCheckInDate = new Date().toISOString();
      await setHoyoToolParams(hoyoToolParams);
    }
  } else if (game === 'honkai3') {
    const infoResponse: Honkai3InfoResponse = await call(checkIn.honkai3.infoUrl);
    const infoData = infoResponse.data;
    if (!infoData || infoData.is_sign) {
      console.log('signed');
      return;
    }
    const result = await call(checkIn.honkai3.signUrl, 'POST', {
      act_id: checkIn.honkai3.actId,
      lang: getLanguage(),
    });
    if (result) {
      hoyoToolParams.honkai3.lastCheckInDate = new Date().toISOString();
      await setHoyoToolParams(hoyoToolParams);
    }
  } else if (game === 'tot') {
    const infoResponse = await call(checkIn.tot.infoUrl);
    const infoData = infoResponse.data;
    if (!infoData || infoData.is_sign) {
      console.log('signed');
      return;
    }
    const result = await call(checkIn.tot.signUrl, 'POST', {
      act_id: checkIn.tot.actId,
      lang: getLanguage(),
    });
    if (result) {
      hoyoToolParams.tot.lastCheckInDate = new Date().toISOString();
      await setHoyoToolParams(hoyoToolParams);
    }
  }
};

const detectGame = () => {
  const url = new URL(window.location.toString());
  const params = new URLSearchParams(url.search);
  const actId = params.get('act_id')!;
  return Object.keys(checkIn).find((game) => {
    if (actId === checkIn[game as keyof typeof checkIn].actId) {
      return game;
    }
  }) as Game | undefined;
};

const call = async (url: string | URL, method: 'POST' | 'GET' = 'GET', body: any = undefined) => {
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

main();
