import { __sendSuccessLOG } from './__test__';
export const wdjOpen: EPR = async (info, data, send) => {
  /**
   * kk9wdj.open
   * 
   * DATA:
   * - data_id = "dummy"
   * - kind = "syouryu"
   * - loc_id = "ea"
   * - name = "dummy"
   * - ot = "0"
   * - ox = "-1"
   * - oy = "-1"
   * - wid = "0"
   * 
   */
  return __sendSuccessLOG(info, data, send);
};