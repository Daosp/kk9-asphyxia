import { __logInfoData } from './__test__';
export const questionInfo: EPR = async (info, data, send) => {
  /**
   * kk9question.info
   * Запрос информации по вопросам?
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="info"
   */
  return __logInfoData(info, data, send);
};

export const questionAnswer: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};