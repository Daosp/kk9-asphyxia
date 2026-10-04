import { __logInfoData } from './__test__';
export const sdjpStat: EPR = async (info, data, send) => {
  /**
   * kk9sdjp.stat
   * Запрос статистики по SDJP? Что такое SDJP?
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="stat"
   */
  return __logInfoData(info, data, send);
};

export const sdjpInquire: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const sdjpHistory: EPR = async (info, data, send) => {
  /**
   * kk9sdjp.history
   * История по SDJP?
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="history"
   *  - nr=10
   */

  return __logInfoData(info, data, send);
};

export const sdjpSettings: EPR = async (info, data, send) => {
  /**
   * kk9sdjp.settings
   * Запрос настроек SDJP? Что такое SDJP?
   * 
   * DATA:
   *  - method="settings"
   */

  return __logInfoData(info, data, send);
};

export const sdjpGiven: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

