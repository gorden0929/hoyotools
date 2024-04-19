export const games = ['genshin', 'hsr', 'honkai3', 'tot', 'zzz'] as const;

export const checkIn = {
  genshin: {
    actId: 'e202102251931481',
    pageUrl: 'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481',
    resignInfoUrl: 'https://sg-hk4e-api.hoyolab.com/event/sol/resign_info?act_id=e202102251931481', // GET QSP act_id, lang
    resignUrl: 'https://sg-hk4e-api.hoyolab.com/event/sol/resign', // POST QSP lang RP act_id, lang
    infoUrl: 'https://sg-hk4e-api.hoyolab.com/event/sol/info', // GET QSP lang, act_id
    signUrl: "https://sg-hk4e-api.hoyolab.com/event/sol/sign" // POST QSP lang RP act_id
  },
  hsr: {
    actId: 'e202303301540311',
    pageUrl: 'https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311',
    resignInfoUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/resign_info', // GET QSP act_id, lang
    resignUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/resign', // POST RP act_id, lang
    infoUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/info?act_id=e202303301540311', // GET QSP act_id
    signUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/sign', // POST RP act_id, lang
    taskListUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/task/list', // GET QSP act_id, lang
    taskAwardUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/task/award' // POST RP act_id, id, lang
  },
  honkai3: {
    actId: 'e202110291205111',
    pageUrl: 'https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=e202110291205111',
    infoUrl: 'https://sg-public-api.hoyolab.com/event/mani/info?act_id=e202110291205111',
    signUrl: 'https://sg-public-api.hoyolab.com/event/mani/sign'
  },
  tot: {
    actId: 'e202202281857121',
    pageUrl: 'https://act.hoyolab.com/bbs/event/signin/nxx/index.html?act_id=e202202281857121',
    infoUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/info?act_id=e202202281857121',
    signUrl: 'https://sg-public-api.hoyolab.com/event/luna/os/sign'
  },
  zzz: {
    actId: '',
    pageUrl: '',
    infoUrl: '',
    signUrl: ''
  },
};

const localeCodes = ['en-us', 'id-id', 'zh-cn', 'zh-tw', 'ja-jp', 'ko-kr', 'es-es'];
