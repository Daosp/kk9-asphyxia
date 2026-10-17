import { __sendSuccessLOG } from './__test__';

// SDJP - Super Dragon Jackpot Points

export const sdjpStat: EPR = async (info, data, send) => {
  /**
   * kk9sdjp.stat
   * Statistic of Super Dragon JackPot
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="stat"
   */
  return __sendSuccessLOG(info, data, send);
};

export const sdjpInquire: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const sdjpHistory: EPR = async (info, data, send) => {
  /**
   * kk9sdjp.history
   * History of points accrual (Super Dragon JackPot)
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="history"
   *  - nr=10
   */

  return __sendSuccessLOG(info, data, send);
};

export const sdjpSettings: EPR = async (info, data, send) => {
  /**
   * kk9sdjp.settings
   * Settings of Super Dragon JackPot?
   * 
   * DATA:
   *  - method="settings"
   */

  return __sendSuccessLOG(info, data, send);
};

export const sdjpGiven: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

