import { __logInfoData } from './__test__';
export const proenterRegist: EPR = async (info, data, send) => {
  /**
   * kk9proenter.regist
   * регистрация каба для онлайн-партий через Интернет?
   * 
   * DATA:
   *  - addr="ip:port"
   *  - method="regist"
   */

  return __logInfoData(info, data, send);
};

export const proenterEntry: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const proenterResult: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const proenterNow: EPR = async (info, data, send) => {
  /**
   * kk9proenter.now
   * Запрос состояния?..
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - method="now"
   */

  return __logInfoData(info, data, send);
};

export const proenterQuit: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const proenterWins: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

