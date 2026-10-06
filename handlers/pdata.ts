import { __sendSuccessLOG, formatCurrentDateTimeUTC, __logingInfoData } from './__test__';
import { pdata_data, pdata_profile } from "../model/bd_types";
export const pdataRead: EPR = async (info, data, send) => {
    // Извлекаем refid (data_id). Игра обычно присылает тот же data_id,
    // который использовался при записи.
    const dataId = $(data).attr().data_id;

    if (!dataId) {
        return send.deny();
    }

    // Забираем все сохранённые записи по refid
    const records = await DB.Find<pdata_data>(dataId, {
        collection: 'pdata_data',
    });

    // Записи в БД сортируем по node_id как число,
    // чтобы порядок соответствовал исходному файлу (0,1,2,...15)
    records.sort((a: any, b: any) => Number(a.node_id) - Number(b.node_id));

    const timeStr = formatCurrentDateTimeUTC();

    var inner: KITEM<'bin'>[] = [];

    for (const rec of records) {
        var buf: Buffer = U.EncodeString(rec.content, "utf8");
        var nodeId: string = rec.node_id.toString();
        var nodeIdId: string = "node_id";
        var attrMap: KAttrMap = {[nodeIdId]:nodeId};
        var addData: KITEM<'bin'> = K.ITEM('bin',buf,attrMap);
        inner.push(addData);
    };

    var xml = K.ATTR({time:timeStr},{
      data:inner,
    });

    // Отправляем готовый XML
    return send.xml(U.toXML(xml));
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
    // Извлекаем data_id из атрибутов корневого тега <kk9pdata>
    const dataId : string = $(data).attr().data_id;
    if (!dataId) {
        return send.deny();
    }

    // Находим все дочерние теги <data>
    const dataNodes = $(data).elements('data');
    var lengthDataNodes = dataNodes.length;
    var dataCounterArray = Array.from({length: lengthDataNodes}, (v, k) => k)
    if (dataNodes.length === 0) {
        return send.success();
    }
    var dataAddr = "";
    var countData: Number = 0;
    // Проходим по каждому тегу <data> и сохраняем его содержимое
    for (const counter of dataCounterArray) {
        dataAddr = "data.".concat(counter.toString());
        const nodeId = parseInt($(data).attr(dataAddr).node_id);
        const content = U.DecodeString($(data).buffer(dataAddr),"utf8"); // hex-строка с бинарными данными в виде строки
        DB.Count(dataId,{
            collection: 'pdata_data',
            node_id: nodeId,
        }).then(value => countData);
        if(countData == 0){
            await DB.Upsert<pdata_data>(
                dataId, // refid
                {
                    collection: 'pdata_data',
                    node_id: nodeId,
                },
                {
                  $set: {
                    node_id: nodeId,
                    content: content,
                  }
                }
            );
        } else {
            await DB.Update<pdata_data>(
                dataId, // refid
                {
                    collection: 'pdata_data',
                    node_id: nodeId,
                },
                {
                  $set: {
                    node_id: nodeId,
                    content: content,
                  }
                }
            );
        }
    }

    const records = await DB.Find(dataId, { collection: 'pdata_data' });
    console.log(records);

    // Отправляем успешный ответ игре
    send.success();
};

export const pdataConv: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCheck: EPR = async (info, data, send) => {
  var dataId: string = $(data).attr().data_id;
  var record: ProfileDoc<pdata_profile> = {_id:"",__refid:"",collection:"pdata_profile",disable:false,passwd:"",stat:"",conv:""};
  var count = 0;
  await DB.Count<pdata_profile>(dataId,{collection: "pdata_profile"}).then(value => count);
  if(count != 1){return send.deny()};
  await DB.FindOne<pdata_profile>(dataId,{collection: "pdata_profile"}).then(value => record);
  var response = K.ATTR({
    disable:Number(record.disable).toString(),
    passwd:record.passwd,
    stat:record.stat,
    conv:record.conv
  },{
    ctime:""
  });
  return send.object(response);
};

export const pdataCheck_recovery: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCreate: EPR = async (info, data, send) => {
  var dataId: string = $(data).attr().data_id;
  await DB.Upsert<pdata_profile>(dataId,{collection: "pdata_profile"},{
    disable:false,
    passwd:"",
    stat:"",
    conv:"",
  });

  return __sendSuccessLOG(info, data, send);
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
  var response = K.ATTR({"stat":"0"});
  return send.object(response);
  //return __sendSuccessLOG(info, data, send);
};

export const pdataMisc_info: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};
