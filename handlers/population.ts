import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
import { population as pop, popPCBID as pcbids } from "../index";

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
  console.log("populationReport: START")
  // @ts-ignore
  const pcbid: string = typeof info.pcbid === "undefined" || _.isNil(info.pcbid) ? "" : info.pcbid;
  if(pcbid === "") return send.deny();
  //const format: number = $(data).number("format"); //always 0
  const joinMode: number = $(data).number("join.mode");
  //const joinEvent_mode: number = $(data).number("join.event_mode");

  
  const reqBool: boolean = typeof pcbids[pcbid] === "undefined";
  const modeNow: number = reqBool?0:pcbids[pcbid];

  if(joinMode !== 0 && modeNow === 0) {
    pop[joinMode]++;
    pcbids[pcbid] = joinMode;
  } else if (joinMode === 0 && modeNow !== 0){
    pop[joinMode]--;
    pcbids[pcbid] = joinMode;
  }

  var gamemodes: Object[] = [];
  for(const i in pop){
    gamemodes.push(K.ATTR({
        expire: "0"
      },{
        game_mode:K.ITEM("u16", parseInt(i)),
        num:K.ITEM("u16", pop[i]),
      })
    );
    console.log("Gamemode "+i+" - "+pop[i].toString());
  }
  
  console.log("populationReport: START")
  return send.object({
    data:gamemodes
  });
};

