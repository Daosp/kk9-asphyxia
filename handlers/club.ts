import { __sendSuccessLOG } from './__test__';
import { shop } from "../model/bd_types_shop";

export const clubShopinfo: EPR = async (info, data, send) => {
  /**
   * kk9club.shopinfo
   * Request shop information (name, region and comments)
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="shopinfo"
   */
  //var response = K.ATTR({"area":"13","comment1":"","comment2":"","comment3":"","loc_id":"ea","method":"sendinfo","shop_name":"ＡＡ"})

  const settings = await DB.FindOne<shop>({ collection: "shop", loc_id: $(data).attr().loc_id });
  if(_.isNil(settings)){
    const r = {shop:K.ATTR({"area":"13"})};
    return send.object(r);
  }
  var response = {
    shop:K.ATTR({
      "exist":"1",
      "area":settings.area,
      "comment1":settings.comment1,
      "comment2":settings.comment2,
      "comment3":settings.comment3,
      "loc_id":$(data).attr().loc_id,
      "name":settings.name
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
  
  DB.Upsert<shop>({
    collection: "shop",
    loc_id: $(data).attr().loc_id
  }, {
    $set: {
      "exist":true,
      "area":$(data).attr().area,
      "comment1":$(data).attr().comment1,
      "comment2":$(data).attr().comment2,
      "comment3":$(data).attr().comment3,
      "name":$(data).attr().shop_name
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

