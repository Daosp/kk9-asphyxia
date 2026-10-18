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
  var population = {
    1  : 0, //With CPU
    2  : 0, //Local Play
    3  : 0, //Tonpu
    4  : 0, //Hanchan
    5  : 0,
    6  : 0,
    7  : 0,
    8  : 0,
    9  : 0,
    10 : 0,
    11 : 0, //Sanma
    12 : 0,
    13 : 0,
    14 : 0,
    15 : 0,
    16 : 0, //Planet mode
  }
  //const format: number = $(data).number("format"); //always 0
  const joinMode: number = $(data).number("join.mode");
  //const joinEvent_mode: number = $(data).number("join.event_mode");

  if(joinMode != 0) {
    population[joinMode]++
  }

  var gamemodes: Object[] = [];
  for(const i in population){
    gamemodes.push(K.ATTR({
        expire: "0"
      },{
        game_mode:K.ITEM("u16", parseInt(i)),
        num:K.ITEM("u16", population[i]),
      })
    )
  }
  return send.object({
    data:gamemodes
  });
};

