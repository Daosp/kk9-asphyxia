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
  //return __sendSuccessLOG(info, data, send);
  const time = formatCurrentDateTimeUTC();
  const expireTime = formatCurrentDateTimeUTC(60*60);
  const UnixTime: number = Math.floor(new Date().getTime() / 1000);
  const response = K.ATTR({
    now_time:UnixTime.toString(),
    expire:"0",
  },{
    data: K.ATTR({
      pro_id:"45",
      game_mode:"11",
      league:"0",
      entry_time:UnixTime.toString(),
      party:"0",
    }),
    top: K.ATTR({
      pro_id:"45",
      game_mode:"11",
      stamp:UnixTime.toString()
    }),
  });
  return send.object(response);
};

export const proenterQuit: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const proenterWins: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

