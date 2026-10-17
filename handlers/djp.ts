import { __sendSuccessLOG } from './__test__';

// DJP - Dragon Jackpot Points

export const djpAdd: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const djpStat: EPR = async (info, data, send) => {
  /**
   * kk9djp.stat
   * Statistic of Dragon JackPot
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="stat"
   */

  return __sendSuccessLOG(info, data, send);
};

export const djpInquire: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const djpHistory: EPR = async (info, data, send) => {
  /**
   * kk9djp.history
   * History of points accrual (Dragon JackPot)
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="history"
   *  - nr=10
   */

  return __sendSuccessLOG(info, data, send);
};

