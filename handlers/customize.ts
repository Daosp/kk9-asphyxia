import { __sendSuccessLOG, __logingInfoData,formatCurrentDateTimeUTC } from './__test__';
export const customizeGet: EPR = async (info, data, send) => {
  /**
   * kk9customize.get
   * Подача информации о кастомизации?
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="get"
   * <pro_id __type="s32">0</pro_id>
   */

  var response = {
    customize_id:K.ITEM("u32",123),
    panel:{
      base:K.ITEM("u32",1),
      corner:K.ITEM("u32",2),
      midle:K.ITEM("u32",3),
      medal_nr:K.ITEM("u32",2),
      medal:K.ARRAY("u32",[1,2]),
      enable_pro_marker:K.ITEM("u32",1),
      pro_marker:K.ITEM("u32",2),
      date:K.ITEM("str","\0")
    },
    table:{
      table:K.ITEM("u32",1),
      hai:K.ITEM("u32",2),
      date:K.ITEM("str","\0")
    },
    irodori:{
      call:K.ITEM("u32",2),
      comment:K.ITEM("u32",2),
      date:K.ITEM("str","\0")
    },
    gouka:{
      movebg:K.ITEM("u32",2),
      date:K.ITEM("str","\0")
    }
  };
  __logingInfoData(info, data);
  console.log('-=RESPONSE=-');
  console.log(JSON.stringify(response));
  console.log(U.toXML(response));
  
  return send.object(response);
};

export const customizeCheck: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeItem: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizePro_override: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeShop_confirm: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeShop_buy: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeOshigacha_confirm: EPR = async (info, data, send) => {
  /**
   * kk9customize.oshigacha_confirm
   * Подача информации о кастомизации?
   * 
   * receiver returns failure
   * 
   * DATA:
   * <data_id __type="str">___refid____</data_id>
   */
  var response = K.ATTR({
    article:"0"
  },{
    master:K.ITEM("str","0"),
  });
  return __sendSuccessLOG(info, data, send);
};

export const customizeOshigacha_draw: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};