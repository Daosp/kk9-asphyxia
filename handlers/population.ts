import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
export const populationReport: EPR = async (info, data, send) => {
  /**
   * kk9population.report
   * статистика заходов?
   * 
   * DATA: (xml-like javascript object)
   *  - method="report"
   *  <format __type="u8">0</format>
   *  <join>
   *   <mode __type="u16">0</mode>
   *   <event_mode __type="u16">0</event_mode>
   *  </join>
   */
  const format: number = $(data).number("format");
  const joinMode: number = $(data).number("join.mode");
  const joinEvent_mode: number = $(data).number("join.event_mode");
  const expireTime = formatCurrentDateTimeUTC(60*60);
  const response =K.ATTR({
    expire: expireTime
  },{
    data:K.ATTR({
      expire: expireTime
    },{
      game_mode:K.ITEM("u16", joinMode),
      event_mode:K.ITEM("u16", joinEvent_mode),
      num:K.ITEM("u16", joinMode + joinEvent_mode),
    })
  });
  return send.object(response);
  return __sendSuccessLOG(info, data, send);
};

