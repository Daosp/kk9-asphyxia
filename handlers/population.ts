import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
import { population as pop } from "../index";

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

  //const format: number = $(data).number("format"); //always 0
  const joinMode: number = $(data).number("join.mode");
  //const joinEvent_mode: number = $(data).number("join.event_mode");

  if(joinMode != 0) {
    pop[joinMode]++
  }

  var gamemodes: Object[] = [];
  for(const i in pop){
    gamemodes.push(K.ATTR({
        expire: "0"
      },{
        game_mode:K.ITEM("u16", parseInt(i)),
        num:K.ITEM("u16", pop[i]),
      })
    )
  }
  return send.object({
    data:gamemodes
  });
};

