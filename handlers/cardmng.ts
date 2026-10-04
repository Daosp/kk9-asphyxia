import { __logInfoData } from './__test__';
export const cardmngGetdatalist: EPR = async (info, data, send) => {
  var item ={
    "mcode":K.ITEM("str","user"),
    "dataid":K.ITEM("str",$(data).attr().refid),
    "regtime":K.ITEM("str","2026-10-04 12:12:12+0"),
    "lasttime":K.ITEM("str","2026-10-04 12:12:12+0"),
    "exptime":K.ITEM("str","2026-10-05 12:12:12+0"),
    "expflag":K.ITEM("u8",0),
  };
  var response = {
    "item":item
  };
  return send.object(response);
  //return __logInfoData(info, data, send);
};