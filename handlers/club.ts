import { __sendSuccessLOG } from './__test__';
import { shop } from "../model/bd_types_shop";
const DEFAULT_SHOP = {
  area: '13',
  comment1: 'ＫＫ９ ＰＲＯＪＥＣＴ－ＫＫ９＠ＡＳＰＨＹＸＩＡ－ＬＥＴ＇Ｓ ＧＯ',
  comment2: 'ＤＡＯＳＰ－ＲＥＭＡＳＴＥＲ－ＧＵＬＬＭＡＮＸ',
  comment3: 'ＡＲＥ ＹＯＵ ＬＩＫＥ ＭＡＨＪＯＮＧ？',
  name: 'ＤＡＯＳＰ'
};

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

  const settings = await DB.FindOne<shop>({ collection: "shop", loc_id: $(data).attr().loc_id });
  const shopInfo = { ...DEFAULT_SHOP, ...(settings && settings ? settings : {}) };
  var response = {
    shop:K.ATTR({
      "exist":"1",
      "area":shopInfo.area,
      "comment1":shopInfo.comment1,
      "comment2":shopInfo.comment2,
      "comment3":shopInfo.comment3,
      "loc_id":$(data).attr().loc_id,
      "name":shopInfo.name
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
  
  const shopInfo = { ...DEFAULT_SHOP, ...($(data).attr() && $(data).attr() ? $(data).attr() : {}) };
  DB.Upsert<shop>({
    collection: "shop",
    loc_id: $(data).attr().loc_id
  }, {
    $set: {
      "exist":true,
      "area":shopInfo.area,
      "comment1":shopInfo.comment1,
      "comment2":shopInfo.comment2,
      "comment3":shopInfo.comment3,
      "name":shopInfo.name
    }
  })

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

