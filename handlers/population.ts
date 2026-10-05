import { __sendSuccessLOG } from './__test__';
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

  return __sendSuccessLOG(info, data, send);
};

