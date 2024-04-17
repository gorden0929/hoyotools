import { games } from './value';

export interface GenshinResignInfoResponse {
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
