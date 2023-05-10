export interface IResignInfo {
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
}