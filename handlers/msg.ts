import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
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
  const stamp = formatCurrentDateTimeUTC();
  const str = stamp + " - " + label + " : " + msg + "\n";
  IO.WriteFile("./logMSG.txt",str,{flag:"a"});
  return __sendSuccessLOG(info, data, send);
};

export const msgRec: EPR = async (info, data, send) => {
  const label = $(data).attr().label;
  const shop_id = $(data).attr().loc_id;
  const rec = $(data).attr().rec;
  const stamp = formatCurrentDateTimeUTC();
  const str = stamp+" - "+label+"("+shop_id+") : " + rec + "\n";
  IO.WriteFile("./logMSG.txt",str,{flag:"a"});

  return __sendSuccessLOG(info, data, send);
};

export const msgRecbin: EPR = async (info, data, send) => {
  const loc_id = $(data).attr().loc_id;
  const dataM = $(data).buffer("data").toString("hex");
  const stamp = formatCurrentDateTimeUTC();
  const str = stamp+" - recbin("+loc_id+") : " + dataM + "\n";
  IO.WriteFile("./logMSG.txt",str,{flag:"a"});
  return __sendSuccessLOG(info, data, send);
};

export const msgStat: EPR = async (info, data, send) => {
  const data_id = $(data).attr().data_id;
  //const ref_id = $(data).attr().ref_id;
  const loc_id = $(data).attr().loc_id;
  const stamp = formatCurrentDateTimeUTC();
  const msgs = $(data).elements("msg");
  var strings = ""
  var msg: string = "";
  for(const i in msgs){
    const msgI = msgs[i].content;
    if(Buffer.isBuffer(msgI)){
      msg = msgI.toString("hex");
    }else if(Array.isArray(msgI)){
      switch (typeof msgI){
        case "string":
          msg = msgI;
          break;
        default:
          msg = msgI.toString();
      }
    }
    strings += stamp+" - "+msgs[i].attr().label+" ("+loc_id+", "+data_id+") : " + msg + "\n";
  }
  IO.WriteFile("./logMSG.txt",strings,{flag:"a"});

  return __sendSuccessLOG(info, data, send);
};

export const msgTrade: EPR = async (info, data, send) => {
  const data_id = $(data).attr().data_id;
  const label = $(data).attr().label;
  const stamp = formatCurrentDateTimeUTC();
  const ts = $(data).elements("t");
  var strings = ""
  for(const i in ts){
    strings += stamp+" - "+label+"("+data_id+" with "+ ts[i].attr().data_id +") : " + ts[i].content.toString() + "\n";
  }
  IO.WriteFile("./logMSG.txt",strings,{flag:"a"});

  return __sendSuccessLOG(info, data, send);
};

