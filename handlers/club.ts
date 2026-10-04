import { __logInfoData } from './__test__';
export const clubShopinfo: EPR = async (info, data, send) => {
  /**
   * kk9club.shopinfo
   * запрос информации по магазину?
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="shopinfo"
   */

  return __logInfoData(info, data, send);
};

export const clubSendinfo: EPR = async (info, data, send) => {
  /**
   * kk9club.shopinfo
   * запрос информации по магазину?
   * 
   * DATA:
   *  - area=13
   *  - comment1="ＤＡＯＳＰ"
   *  - comment2=
   *  - comment3=
   *  - loc_id="ea"
   *  - method="shopinfo"
   *  - shop_name="ＡＡＡ"
   */

  return __logInfoData(info, data, send);
};

export const clubRecvinfo: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const clubPresent_get: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const clubPresent_code: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const clubPresent_done: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

