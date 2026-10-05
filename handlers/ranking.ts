import { __sendSuccessLOG } from './__test__';
export const rankingTops: EPR = async (info, data, send) => {
  /**
   * kk9ranking.tops
   * Запрос топа игроков региона?
   * 
   * DATA:
   *  - area=13
   *  - loc_id="ea"
   *  - method="tops"
   *  - size=921600
   */

  return __sendSuccessLOG(info, data, send);
};

export const rankingIndex: EPR = async (info, data, send) => {
  /**
   * kk9ranking.index
   * Запрос чего? Индекса? Или интернет страницы?
   * 
   * DATA:
   *  - method="index"
   *  - size=200
   */

  return __sendSuccessLOG(info, data, send);
};

export const rankingNeighbors: EPR = async (info, data, send) => {
  /**
   * kk9ranking.neighbors
   * ...?
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="neighbors"
   */

  return __sendSuccessLOG(info, data, send);
};

export const rankingPros: EPR = async (info, data, send) => {
  /**
   * kk9ranking.pros
   * ...?
   * 
   * DATA:
   *  - method="pros"
   */

  return __sendSuccessLOG(info, data, send);
};

export const rankingList: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const rankingGet: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

