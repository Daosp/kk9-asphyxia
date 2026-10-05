import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
export const pdataRead: EPR = async (info, data, send) => {

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
  var data_id = $(data).attr().data_id;
  var diff_time = $(data).attr().diff_time;
  var last = $(data).attr().last;
  var priority = $(data).attr().priority;
  var update = $(data).attr().update;
  var dataCall = [];
  var numDatas = $(data).content("data");


  //await DB.Upsert<PData>(data_id, { collection: 'PData'}, profile)
  return __sendSuccessLOG(info, data, send);
};

export const pdataConv: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCheck: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCheck_recovery: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCreate: EPR = async (info, data, send) => {
  var response = K.ATTR({
    data_id : $(data).attr().data_id,
    ref_id : $(data).attr().ref_id,
  })
  return send.object(response);
  //return __logInfoData(info, data, send);
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
  //return __logInfoData(info, data, send);
};

export const pdataMisc_info: EPR = async (info, data, send) => {
  var response = {
    "lobby":K.ITEM("bool",0),
    "bemani":K.ITEM("bool",0),
    "kac7th":K.ITEM("bool",0),
    "vote2017eapp":K.ITEM("bool",0),
    "kirinprotest":K.ITEM("bool",0),
    "mleague_pro":K.ITEM("bool",0),
    "hgslot":K.ITEM("bool",0),
    "pros":K.ITEM("bool",0),
    "valid_item":K.ITEM("bool",0),
  };

  return send.object(response);
  //return __logInfoData(info, data, send);
};
