import { __logInfoData } from './__test__';
export const versSend: EPR = async (info, data, send) => {
  /**
   * kk9vers.send
   * самый первый вызов (инициализация?)
   * 
   * DATA:
   *  - boot: 1
   *  - cid: 0
   *  - gid: 0
   *  - loc_id: ea
   *  - method: send
   *  - on_period: 0
   *  - pcbtype: 0
   *  - play_period: 0
   *  - stamp: time (YYYY-MM-DD HH:mm:SS+0)
   *  - standalone: 1
   *  - v_major: 1
   *  - v_minor: 38
   *  - v_patch: 0
   * 
   */

  return __logInfoData(info, data, send);
};

