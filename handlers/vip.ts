import { __logInfoData } from './__test__';
export const vipStart: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipStatus: EPR = async (info, data, send) => {
  var response = {
    "enable":K.ITEM("s8",-1)
  }
  return send.object(response)
  return __logInfoData(info, data, send);
};

export const vipAdd_point: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipConsume_pay: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipConsume_reserve: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipConsume_adjust: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipRight_reserve: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipRight_confirm: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipItem_get: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipGoods_get: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};

export const vipGoods_use: EPR = async (info, data, send) => {
  return __logInfoData(info, data, send);
};