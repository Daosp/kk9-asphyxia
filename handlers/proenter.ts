import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
export const proenterRegist: EPR = async (info, data, send) => {
  /**
   * kk9proenter.regist
   * регистрация каба для онлайн-партий через Интернет?
   * 
   * DATA:
   *  - addr="ip:port"
   *  - method="regist"
   */

  return __sendSuccessLOG(info, data, send);
};

export const proenterEntry: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const proenterResult: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const proenterNow: EPR = async (info, data, send) => {
  /**
   * kk9proenter.now
   * Запрос состояния?..
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - method="now"
   */
  const time = formatCurrentDateTimeUTC();
  const expireTime = formatCurrentDateTimeUTC(60*60);
  const response = K.ATTR({
    now_time:time,
    expire:expireTime,
  },{
    data: K.ATTR({
      pro_id:"123123",
      game_mode:"1",
      league:"0",
      entry_time:"2026-08-20 12:00:00+0",
      party:"0",
    }),
    top: K.ATTR({
      pro_id:"123123",
      game_mode:"1",
      stamp:"2026-08-20 12:00:00+0"
    }),
  });
  return send.object(response);
  return __sendSuccessLOG(info, data, send);
};

export const proenterQuit: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const proenterWins: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

