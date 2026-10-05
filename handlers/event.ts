import { __sendSuccessLOG } from './__test__';
export const eventSchedule: EPR = async (info, data, send) => {
  /**
   * kk9event.schedule
   * запрос таблицы событий?
   * 
   * DATA:
   *  - method="schedule"
   *  - nr=8
   */

  return __sendSuccessLOG(info, data, send);
};

