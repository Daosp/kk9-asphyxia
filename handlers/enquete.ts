import { __sendSuccessLOG } from './__test__';
export const enqueteSee: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const enqueteNow: EPR = async (info, data, send) => {
  /**
   * kk9enquete.now
   * Запрос информации по анкетам?
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="now"
   */
  return __sendSuccessLOG(info, data, send);
};

export const enqueteVote: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};