import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
import { cardmng } from "../model/bd_types";
export const cardmngGetdatalist: EPR = async (info, data, send) => {
  const dataId : string = $(data).attr().data_id;
  if (!dataId) {
      return send.deny();
  }
  var countData: Number = 0;
  DB.Count(dataId,{
      collection: 'cardmng',
  }).then(value => countData);
  var record: ProfileDoc<cardmng> = {_id:"",__refid:"",collection:"cardmng",mcode:"",regtime:"",lasttime:"",exptime:"",expflag:false};
  if(countData == 0){
      await DB.Upsert<cardmng>(
          dataId, // refid
          {
              collection: 'cardmng',
              mcode:"KK9",
          },
          {
            $set: {
              regtime:formatCurrentDateTimeUTC(),
              lasttime:formatCurrentDateTimeUTC(),
              exptime:formatCurrentDateTimeUTC(60*60*24*366*7),
              expflag:false
            }
          }
      );
      DB.FindOne<cardmng>(dataId,{collection: 'cardmng',}).then(value => record);
  } else {
      DB.FindOne<cardmng>(dataId,{collection: 'cardmng',}).then(value => record);
      record.lasttime = formatCurrentDateTimeUTC();
      record.exptime = formatCurrentDateTimeUTC(60*60*24*366*7);

      await DB.Update<cardmng>(
          dataId,
          {
              collection: 'cardmng',
              mcode: 'KK9',
          },
          {
            $set: {
              regtime: record.regtime,
              lasttime:record.lasttime,
              exptime:record.exptime,
              expflag:record.expflag
            }
          }
      );
  }
  var item ={
    "mcode":K.ITEM("str","KK9"),
    "dataid":dataId,
    "regtime":record.regtime,
    "lasttime":record.lasttime,
    "exptime":record.exptime,
    "expflag":record.expflag,
  };
  var response = {
    "item":item
  };
  return send.object(response);
  //return __logInfoData(info, data, send);
};


export const facilityGet: EPR = async (info, data, send) => {
  var ipPort = $(data).attr().privateip.split(":");
  var item ={
    "@attr":{
      expire:formatCurrentDateTimeUTC(60*60*24)
    },
    "location":{
      id:K.ITEM("str","123123"),
      country:K.ITEM("str","JP"),
      region:K.ITEM("str","JP-13"),
      name:K.ITEM("str","ＤＡＯＳＰ"),
      type:K.ITEM("u8",0),
      countryname:K.ITEM("str","Ｊａｐａｎ"),
      countryjname:K.ITEM("str","日本"),
      regionname:K.ITEM("str","Ｔｏｋｙｏ"),
      regionjname:K.ITEM("str","東京"),
      customercode:K.ITEM("str","123123"),
      companycode:K.ITEM("str","1231423"),
      latitude:K.ITEM("s32",0),
      longitude:K.ITEM("s32",0),
      accuracy:K.ITEM("u8",0),
    },
    "line":{
      id:K.ITEM("str","0"),
      class:K.ITEM("u8",0),
    },
    "portfw":{
      globalip:K.ITEM("ip4",ipPort[0]),
      globalport:K.ITEM("u16",parseInt(ipPort[1])),
      privateport:K.ITEM("u16",parseInt(ipPort[1])),
    },
    "public":{
      flag:K.ITEM("u8",1),
      name:K.ITEM("str","ＤＡＯＳＰ"),
      latitude:K.ITEM("str","0"),
      longitude:K.ITEM("str","0"),
    },
    "share":{
      "eacoin":{
        notchamount:K.ITEM("s32",0),
        notchcount:K.ITEM("s32",0),
        supplylimit:K.ITEM("s32",100000),
      },
      "url":{
        eapass:K.ITEM("str","www.ea-pass.konami.net"),
        arcadefan:K.ITEM("str","www.konami.jp/am"),
        konaminetdx:K.ITEM("str","http://am.573.jp"),
        konamiid:K.ITEM("str","http://id.konami.jp"),
        eagate:K.ITEM("str","http://eagate.573.jp"),
      }
    }
  };
  var response = {
    "item":item
  };
  return send.object(response);
  //return __logInfoData(info, data, send);
};