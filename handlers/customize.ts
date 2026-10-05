import { __sendSuccessLOG, __logingInfoData } from './__test__';
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
    "customize_id":K.ITEM("s8",0),
    "panel":{
      "base":K.ITEM("s8",0),
      "corner":K.ITEM("s8",0),
      "midle":K.ITEM("s8",0),
      "medal_nr":K.ITEM("s8",0),
      "medal":K.ARRAY("s8",[0]),
      "enable_pro_marker":K.ITEM("s8",0),
      "pro_marker":K.ITEM("s8",0),
      "date":K.ITEM("s8",0)
    },
    "table":{
      "table":K.ITEM("s8",0),
      "hai":K.ITEM("s8",0),
      "date":K.ITEM("s8",0)
    },
    "irodori":{
      "comment":K.ITEM("s8",0),
      "call":K.ITEM("s8",0),
      "date":K.ITEM("s8",0)
    },
    "gouka":{
      "movebg":K.ITEM("s8",0),
      "date":K.ITEM("s8",0)
    }
  };
  __logingInfoData(info, data);
  console.log('-=RESPONSE=-');
  console.log(JSON.stringify(response));
  console.log(U.toXML(response));
  
  return send.object(response);
  //return __logInfoData(info, data, send);
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
  return __sendSuccessLOG(info, data, send);
};

export const customizeOshigacha_draw: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};