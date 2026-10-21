import { __sendSuccessLOG } from './__test__';
export const channelSchedule: EPR = async (info, data, send) => {
  /**
   * kk9channel.schedule
   * Request schedule of channel?
   * 
   * DATA:
   *  - method="schedule"
   *  - nr=10
   */
  const resp = {
    data:[
      K.ATTR({
        expire:"0",
        type:"",
        gen:"",
        start:"",
        finish:"",
        start_d:"",
        finish_d:"",
      })
    ]
  }

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

