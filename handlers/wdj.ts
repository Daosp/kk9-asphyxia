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
  const resp = {
    charge_info:{
      wdj_4_han_0:"",
      wdj_4_han_1:"",
      wdj_4_han_2:"",
      wdj_4_han_3:"",
      wdj_4_han_4:"",
      wdj_4_han_5:"",
      wdj_4_han_6:"",
      wdj_4_han_7:"",
      wdj_4_han_8:"",
      wdj_4_han_9:"",
      wdj_3_han_0:"",
      wdj_3_han_1:"",
      wdj_3_han_2:"",
      wdj_3_han_3:"",
      wdj_3_han_4:"",
      wdj_3_han_5:"",
      wdj_3_han_6:"",
      wdj_3_han_7:"",
      wdj_3_han_8:"",
      wdj_3_han_9:"",
      wdj_paseli:""
    },
    wdj_auto_limit:"",
    wdj_auto_cycle:"",
    board:K.ATTR({
      action:"",
      get_dp:"",
      bonus_dp:"",
      open_dp:"",
      open_value:"",
      open_kind:"",
      ox:"",
      oy:"",
      ot:"",
      get_dragon:"",
      close_board:""
    }),
    next_board:"",
    names:""
  }
  return __sendSuccessLOG(info, data, send);
};