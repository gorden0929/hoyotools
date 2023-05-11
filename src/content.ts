import { IResignInfo } from './interfaces/resignInfo.interface';
import { actId, resignInfoPath, signPath } from './value';

const main = async () => {
  const resignInfoResult: IResignInfo = (await resignInfo()).data;
  if (!resignInfoResult || resignInfoResult.signed) {
    return;
  }
  const result = await sign();
};

const resignInfo = async () => {
  return call(resignInfoPath);
}

const sign = async () => {
  return call(signPath, 'POST', { act_id: actId, lang: getLang() });
}

const call = async (url: string | URL, method: 'POST' | 'GET' = 'GET', body: any = undefined) => {
  const reqInit: RequestInit = {
    method,
    mode: "cors",
    credentials: "include",
    referrerPolicy: "strict-origin-when-cross-origin",
  };
  if (body) {
    reqInit.body = JSON.stringify(body);
  }
  const response = await fetch(url, reqInit);
  return response.json();
}

const getLang = () => {
  const url = window.location.toString();
  const urlObj = new URL(url);
  const langFromUrl = urlObj.searchParams.get('lang');
  if (langFromUrl) {
    return langFromUrl;
  }
  const lang = chrome.i18n.getUILanguage().replace("_", "-").toLowerCase();
  return lang;
}

main();
