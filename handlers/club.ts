import { __sendSuccessLOG } from './__test__';
export const clubShopinfo: EPR = async (info, data, send) => {
  /**
   * kk9club.shopinfo
   * запрос информации по магазину?
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="shopinfo"
   */
  //var response = K.ATTR({"area":"13","comment1":"","comment2":"","comment3":"","loc_id":"ea","method":"sendinfo","shop_name":"ＡＡ"})
  var response = {
    shop:K.ATTR({
      "exist":"1",
      "area":"13",
      "comment1":"ＤＡＯ",
      "comment2":"ＳＰ",
      "comment3":"ＤＡＯＳＰ",
      "loc_id":"ea",
      "method":"sendinfo",
      "name":"ＤＡＯＳＰ"
    }),

    shop_score:K.ATTR({rank_in_area:"1",rank_in_world:"1",score:"999999",border:"1",num:"1",})
  };
  return send.object(response);
};

export const clubSendinfo: EPR = async (info, data, send) => {
  /**
   * kk9club.Sendinfo
   * запрос информации по магазину?
   * 
   * DATA:
   *  - area=13
   *  - comment1="ＤＡＯＳＰ"
   *  - comment2=
   *  - comment3=
   *  - loc_id="ea"
   *  - method="sendinfo"
   *  - shop_name="ＡＡＡ"
   */

  return __sendSuccessLOG(info, data, send);
};

export const clubRecvinfo: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const clubPresent_get: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const clubPresent_code: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const clubPresent_done: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

