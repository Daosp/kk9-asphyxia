import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
export const populationReport: EPR = async (info, data, send) => {
  /**
   * kk9population.report
   * Onformation about gamemodes
   * 
   * DATA: (xml-like javascript object)
   *  - method="report"
   *  <format __type="u8">0</format>
   *  <join>
   *   <mode __type="u16">0</mode>
   *   <event_mode __type="u16">0</event_mode>
   *  </join>
   */
  var tonpuP = 0;
  var hanchanP = 0;
  var sanmaP = 0;
  //const format: number = $(data).number("format"); //always 0
  const joinMode: number = $(data).number("join.mode");
  //const joinEvent_mode: number = $(data).number("join.event_mode");

  switch(joinMode) {
    case 3  : tonpuP++;   break
    case 4  : hanchanP++; break
    case 11 : sanmaP++;   break
  }
  const response = {
    data:[
      K.ATTR({
        expire: "0"
      },{
        game_mode:K.ITEM("u16", 3),
        num:K.ITEM("u16", tonpuP),
      }),
      K.ATTR({
        expire: "0"
      },{
        game_mode:K.ITEM("u16", 4),
        num:K.ITEM("u16", hanchanP),
      }),
      K.ATTR({
        expire: "0"
      },{
        game_mode:K.ITEM("u16", 11),
        num:K.ITEM("u16", sanmaP),
      }),
    ]
  }
  return send.object(response);
};

