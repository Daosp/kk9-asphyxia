import { __logInfoData } from './__test__';
export const msgPut: EPR = async (info, data, send) => {
  /**
   * kk9msg.put
   * Отправка сообщения? Куда и зачем?
   * 
   * label возможно означает, куда это сообщение (или его тип)
   * 
   * DATA:
   * 1
   *  - label="user"
   *  - method="put"
   *  - msg="VERS_RETRY:ea,0,0,0,0,1,38,0\n"
   * 2
   *  - label="disk_stat"
   *  - method="put"
   *  - msg="DISK_STAT2,ea,AXCPY,1791067410,1791067412,119028051968,11807387648,512108785664,226559385600,1000200990720,426903388160,1000203087872,774302515200,KK9***** ****-**-** *,KK9---YYYYMMDD00,ver_upd.exe is not found"
   * 3
   *  - label="user"
   *  - method="put"
   *  - msg="VERS_RETRY:ea,0,0,31,0,1,38,0\n"
   * 4
   *  - label="user"
   *  - method="put"
   *  - msg="HOTSNAP_UPLOADER_RESUME_IS_FAIL"
   * 5
   *  - label="user"
   *  - method="put"
   *  - msg="DJP_ERR_LOG,line:326 reqid:2 ret:-1"
   */

  return __logInfoData(info, data, send);
};

export const msgRec: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const msgRecbin: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const msgStat: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

export const msgTrade: EPR = async (info, data, send) => {

  return __logInfoData(info, data, send);
};

