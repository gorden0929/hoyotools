export const actId = 'e202303301540311';
export const pageUrl = `https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=${actId}`
export const apiBaseUrl = new URL('https://sg-public-api.hoyolab.com/event/luna/os/');
export const signPath = new URL('sign', apiBaseUrl);
export const resignInfoPath = new URL(`resign_info?act_id=${actId}`, apiBaseUrl);
export const chromeStorageKey = 'hsrLastCheckIn';
export const chromeStorageKeyOnOff = 'hsrCheckInOnOff';