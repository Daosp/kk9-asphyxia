import { __sendSuccessLOG, formatCurrentDateTimeUTC, __logingInfoData } from './__test__';
import { pdata_data, pdata_profile } from "../model/bd_types";
export const pdataRead: EPR = async (info, data, send) => {
    // Извлекаем refid (data_id). Игра обычно присылает тот же data_id,
    // который использовался при записи.
    const dataId = $(data).attr().data_id;
    if (!dataId) {return send.deny();}

    const records = await DB.Find<pdata_data>(dataId,{collection: "pdata_data"});
    if (_.isNil(records)) {
      console.warn('pdataRead: DONT HAVE RECORD');
      return send.deny();
    };

    // Записи в БД сортируем по node_id как число,
    // чтобы порядок соответствовал исходному файлу (0,1,2,...15)
    records.sort(
      (
        a: ProfileDoc<pdata_data>,
        b: ProfileDoc<pdata_data>
      ) => Number(a.node_id) - Number(b.node_id)
    );

    const timeStr = formatCurrentDateTimeUTC();

    var inner: KITEM<'bin'>[] = [];

    for (const rec of records) {
        var buf: Buffer = Buffer.from(rec.content,"binary");
        var nodeId: string = rec.node_id.toString();
        var nodeIdId: string = "node_id";
        var attrMap: KAttrMap = {[nodeIdId]:nodeId};
        var addData: KITEM<'bin'> = K.ITEM('bin',buf,attrMap);
        inner.push(addData);
        console.log('pdataRead: Node ID'.concat(nodeId).concat(" added"));
    };

    var response = K.ATTR({time:timeStr},{
      data:inner,
    });

    return send.object(response);
    return __sendSuccessLOG(info, data, send);
};

export const pdataWrite: EPR = async (info, data, send) => {
  /**
   * kk9pdata.write
   * 
   * DATA:
   *  - data_id="AD8972E47E435A6B"
   *  - method="ranking"
   * <data __type="bin" node_id=0>
   *  <data>K.ARRAY</data>
   * </data>
   */
    const dataId : string = $(data).attr().data_id;
    if (!dataId) {
        return send.deny();
    }

    // Находим все дочерние теги <data>
    const dataNodes = $(data).elements('data');
    var lengthDataNodes = dataNodes.length;
    console.log("pdataWrite: Num of records: ".concat(lengthDataNodes.toString()));
    if (lengthDataNodes === 0) {
        return send.success();
    }

    var id = 0;
    for(const node of dataNodes){
      const dataAddr = parseInt(node.attr().node_id);
      console.log("Node ID: ".concat(dataAddr.toString()));

      const dataBuffer = $(data).buffer("data.".concat(id.toString())).toString("binary");
      const record = await DB.FindOne<pdata_data>(dataId,{collection: 'pdata_data', node_id:dataAddr});
      if (_.isNil(record)) {
        console.log('pdataWrite: new record');
        await DB.Upsert<pdata_data>(
            dataId, // refid
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
        continue;
      };
      const content = record.content;
      const node_id = record.node_id;
      if (dataBuffer == content) continue;

      console.log('pdataWrite: update record');
      await DB.Update<pdata_data>(
          dataId, // refid
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

      id++;
    }

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
