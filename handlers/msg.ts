import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
import { msgs } from "../model/bd_types_profile";
export const msgPut: EPR = async (info, data, send) => {
  /**
   * kk9msg.put
   * Отправка сообщения? Куда и зачем?
   * 
   * label возможно означает, куда это сообщение (или его тип)
   * 
   * DATA:
   *  - label="user"
   *  - method="put"
   *  - msg="VERS_RETRY:ea,0,0,0,0,1,38,0\n"
   */
  const label = $(data).attr().label;
  const msg = $(data).attr().msg;
  await DB.Insert<msgs>(
      {
        collection: 'msgs',
        "stamp":formatCurrentDateTimeUTC(),
        "label":label,
        "msg":msg
      }
  );
  return __sendSuccessLOG(info, data, send);
};

export const msgRec: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const msgRecbin: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const msgStat: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const msgTrade: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

