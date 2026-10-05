import { __sendSuccessLOG } from './__test__';
export const channelSchedule: EPR = async (info, data, send) => {
  /**
   * kk9channel.schedule
   * Запрос таблицы "канала"?
   * 
   * DATA:
   *  - method="schedule"
   *  - nr=10
   */

  return __sendSuccessLOG(info, data, send);
};

export const channelStore_kf: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const channelLottery: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const channelVlink: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

