import { __sendSuccessLOG } from './__test__';
// Они даже не призываются...
export const snsFellow_comment_send_pcb: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const snsFellow_comment_new: EPR = async (info, data, send) => {
  /**
   * kk9sns.fellow_comment_new
   * 
   * DATA:
   * - data_id = "_______"
   * - ref_id = "_______"
   * - source = "pcb" 
   * - update = "0"
   * - with_fellow_data = "1"
   * - with_kokuryu_data = "1"
   * - with_konami_id = "1"
   * - with_news_data = "1"
   * - with_wish_data = "1"
   */
  return __sendSuccessLOG(info, data, send);
};

export const snsFellow_challenge: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const snsFellow_request: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const snsApplilink_stat: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const snsApplilink_use: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const snsSend_nanikiru: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};