import { games } from './value';

export type InfoResponse = GenshinInfoResponse | HSRInfoResponse | Honkai3InfoResponse | ToTInfoResponse;
export type SignResponse = GenshinSignResponse | HSRSignResponse;
export interface GenshinResignInfoResponse {
  retcode: number;
  message: string;
  data: {
    resign_cnt_daily: number;
    resign_cnt_monthly: number;
    resign_limit_daily: number;
    resign_limit_monthly: number;
    sign_cnt_missed: number;
    quality_cnt: number;
    signed: boolean;
    sign_cnt: number;
    cost: number;
    month_quality_cnt: number;
  };
}

export interface GenshinInfoResponse {
  retcode: number;
  message: string;
  data: {
    total_sign_day: number;
    today: string; // 2024-04-19
    is_sign: boolean;
    first_bind: boolean;
    is_sub: boolean;
    region: 'os_asia';
    month_last_day: boolean;
  };
}

export interface GenshinSignResponse {
  retcode: number;
  message: string;
  data: {
    code: string;
    first_bind: boolean;
    gt_result: {
      risk_code: number;
      gt: string;
      challenge: string;
      success: number;
      is_risk: boolean;
    };
  };
}

export interface HSRInfoResponse {
  retcode: number;
  message: string;
  data: {
    total_sign_day: number;
    today: string;
    is_sign: boolean;
    is_sub: boolean;
    region: string;
    sign_cnt_missed: number;
    short_sign_day: number;
  };
}

export interface HSRResignInfoResponse {
  retcode: number;
  message: string;
  data: {
    resign_cnt_daily: number;
    resign_cnt_monthly: number;
    resign_limit_daily: number;
    resign_limit_monthly: number;
    sign_cnt_missed: number;
    coin_cnt: number;
    coin_cost: number;
    rule: string;
    signed: boolean;
    sign_days: number;
    cost: number;
    month_quality_cnt: number;
    quality_cnt: number;
  };
}

export interface HSRResignResponse {
  retcode: number;
  message: string;
  data: { message: string };
}

export interface HSRSignResponse {
  retcode: number;
  message: string;
  data: {
    code: string;
    risk_code: number;
    gt: string;
    challenge: string;
    success: 0;
    is_risk: boolean;
  };
}

/**
 * HSR Make up for check-in
 */
export interface HSRAwardReponse {
  retcode: number;
  message: string;
  data: { message: string };
}

export interface Honkai3InfoResponse {
  retcode: number;
  message: string;
  data: {
    total_sign_day: number;
    today: number;
    is_sign: boolean;
    first_bind: boolean;
    is_sub: boolean;
    region: string;
  };
}

export interface ToTInfoResponse {
  retcode: number;
  message: string;
  data: {
    total_sign_day: number;
    today: string;
    is_sign: boolean;
    is_sub: boolean;
    region: string;
    sign_cnt_missed: number;
    short_sign_day: number;
  };
}

export type HoyoToolParams = Record<Game, HoyoToolInfo>;

export interface HoyoToolInfo {
  isActive: boolean;
  checkInTime: string;
  lastCheckInDate: Date | string | null;
}

export type Game = (typeof games)[number];
