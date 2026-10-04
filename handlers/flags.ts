import { __logInfoData } from './__test__';
export const flagsGet: EPR = async (info, data, send) => {
  /**
   * kk9flags.get
   * запрос "флагов"?
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="get"
   */
  return __logInfoData(info, data, send);
};

