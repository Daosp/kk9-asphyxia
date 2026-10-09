import { __sendSuccessLOG, formatCurrentDateTimeUTC, __logingInfoData } from './__test__';
import { pdata_data, pdata_profile } from "../model/bd_types_profile";
export const pdataRead: EPR = async (info, data, send) => {
    console.log('pdataRead: END');
    const dataId = $(data).attr().data_id;
    if (!dataId || U.Card2NFC(dataId) == null) {return send.deny();}

    const records = await DB.Find<pdata_data>(dataId,{collection: "pdata_data"});
    if (_.isNil(records)) {
      console.warn('pdataRead: DONT HAVE RECORD');
      return send.deny();
    };

    var lengthDataNodes = records.length;
    console.log("pdataRead: Num of nodes: ".concat(lengthDataNodes.toString()));
    if (lengthDataNodes === 0) {return send.deny();};

    const timeStr = formatCurrentDateTimeUTC();

    var innerData: KITEM<'bin'>[] = [];

    for (const rec of records) {
        const buf: Buffer = Buffer.from(rec.content,"hex");
        const attrMap: KAttrMap = {['node_id']:rec.node_id};
        const addData: KITEM<'bin'> = K.ITEM('bin',buf,attrMap);
        innerData.push(addData);
        console.log('pdataRead: Node ID'.concat(rec.node_id).concat(" added"));
    };

    var response = K.ATTR({time:timeStr},{
      data:innerData,
    });
    console.log('pdataRead: END');
    return send.object(response);
};

export const pdataWrite: EPR = async (info, data, send) => {
  /**
   * kk9pdata.write
   * 
   * DATA:
   *  - data_id="AD8972E47E435A6B"
   *  - method="ranking"
   * <data __type="bin" __sixe="123" node_id="0">buffer</data>
   * <data __type="bin" __sixe="123" node_id="2">buffer</data>
   * ...
   */
    __logingInfoData(info, data);
    const dataId : string = $(data).attr().data_id;
    if (!dataId) {return send.deny();}

    // Находим все дочерние теги <data>
    var lengthDataNodes = $(data).elements('data').length;
    console.log("pdataWrite: Num of nodes: ".concat(lengthDataNodes.toString()));
    if (lengthDataNodes === 0) {return send.success();}

    for(var _i = 0; _i < lengthDataNodes; _i++){
      const dataAddr = $(data).attr("data.".concat(_i.toString())).node_id;
      const dataBuffer = $(data).buffer("data.".concat(_i.toString())).toString("hex");
      await DB.Upsert<pdata_data>(
          dataId,
          {
              collection: 'pdata_data',
              node_id: dataAddr,
          },
          {
            $set: {
              content: dataBuffer,
            }
          }
      );
      console.log("pdataWrite: Node ID".concat(dataAddr).concat(" upserted"));
    };
    console.log('pdataWrite: data writed');

    send.success();
};

export const pdataConv: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCheck: EPR = async (info, data, send) => {
  var dataId: string = $(data).attr().data_id;
  if (!dataId) {
    console.warn('pdataCheck: dataId is NULL');
    return send.deny();
  }
  const record = await DB.FindOne<pdata_profile>(dataId,{collection: "pdata_profile"});
  if (_.isNil(record)) return send.deny();
  var response = K.ATTR({
    disable:Number(record.disable).toString(),
    passwd:record.passwd,
    stat:record.stat,
    conv:record.conv
  });
  return send.object(response);
};

export const pdataCheck_recovery: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCreate: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  var dataId: string = $(data).attr().data_id;
  if (!dataId) {
    console.warn('pdataCreate: dataId is NULL');
    return send.deny();
  }
  await DB.Upsert<pdata_profile>(dataId,{collection: "pdata_profile"},{
    $set:{
      disable:false,
      passwd:"",
      stat:"0",
      conv:"0",
    },
  });
  return send.success();
};

export const pdataRanking: EPR = async (info, data, send) => {
  /**
   * kk9pdata.ranking
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - data_id="AD8972E47E435A6B"
   *  - method="ranking"
   */
  __logingInfoData(info, data);
  const dataId: string = $(data).attr().data_id;
  if (!dataId) {
    console.warn('pdataRanking: dataId is NULL');
    return send.deny();
  }
  console.log("refid: ".concat(dataId));
  
  const record = await DB.FindOne<pdata_profile>(dataId,{collection: "pdata_profile"});
  if (_.isNil(record)) {
    console.warn('pdataRanking: DONT HAVE RECORD');
    return send.deny();
  };

  var response = K.ATTR({"stat":record.stat});
  return send.object(response);
};

export const pdataMisc_info: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};
