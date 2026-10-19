import { __sendSuccessLOG } from './__test__';
import { djp, djp_uid } from "../model/bd_types_shop";
import { update } from 'lodash';

// DJP - Dragon Jackpot Points

export const djpAdd: EPR = async (info, data, send) => {
  /**
   * kk9djp.add
   * Add Dragon JackPot points
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="add"
   *  - data_id
   *  - table_type
   *  - tenbou
   *  - name
   *  - type
   */
  const loc_id = $(data).attr().loc_id;
  const name = $(data).str("name");
  const type = $(data).attr("name").type;
  //const data_id = $(data).attr().data_id;
  //const table_type = $(data).attr().table_type;
  const tenbou = $(data).attr().tenbou;
  const record = await _djpData(loc_id);
  const total = record.total + parseInt(tenbou);
  const djchance = record.djchance + parseInt(tenbou);

  const q: Query<djp> = {
    collection:"djp",
    loc_id:loc_id
  }
  DB.Update<djp>(q,{
    $set:{
      name:name,
      type:type,
      total:total,
      djchance:djchance,
    }
  });

  return send.object(K.ATTR({
    total:total.toString(),
    uid:record.uid.toString(),
    djchance:djchance.toString()
  },{
    sponsor:{
      name:K.ITEM("str",name,{type:type})
    }
  }));
};

export const djpStat: EPR = async (info, data, send) => {
  /**
   * kk9djp.stat
   * Statistic of Dragon JackPot
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="stat"
   */
  return send.object(await djpDBOut($(data).attr().loc_id));
};

export const djpInquire: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const djpHistory: EPR = async (info, data, send) => {
  /**
   * kk9djp.history
   * History of points accrual (Dragon JackPot)
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="history"
   *  - nr=10
   */

  return __sendSuccessLOG(info, data, send);
};

async function djpDBOut(loc_id:string): Promise<KATTR<KAttrMap>&__djpData>{
  const record = await _djpData(loc_id);
  const uid = record.uid.toString();
  const total = record.total.toString();
  const djchance = record.djchance.toString();
  const attrs: KAttrMap = {
    total:total,
    uid:uid,
    djchance:djchance
  }
  if(record.name !== ""){
    const sponsor: __djpData = {
      sponsor:{
        name:K.ITEM("str",record.name,{type:record.type.toString()})
      }
    }
    return K.ATTR(attrs,sponsor);
  }
  return K.ATTR(attrs);
}

type __djpData = {
  sponsor:{
    name:KITEM<"str">
  }
}

async function _djpData(loc_id:string): Promise<Doc<djp>> {
  var record: Doc<djp> | null | undefined = undefined;
  record = await DB.FindOne<djp>({collection:"djp",loc_id:loc_id});
  if(_.isNil(record) || typeof record === "undefined"){
    var uidNew = 0;
    const rUID = await DB.FindOne<djp_uid>({collection:"djp_uid"});
    if(_.isNil(rUID)){
      uidNew = 0;
      DB.Insert<djp_uid>({collection:"djp_uid",last_uid:0})
    } else {
      uidNew = rUID.last_uid + 1;
      DB.Update<djp_uid>({collection:"djp_uid"},{$set:{last_uid:uidNew}})
    }
    const djp: Doc<djp> = {
      collection: "djp",
      loc_id: loc_id,
      uid:uidNew,
      total:0,
      djchance:0,
      name:"",
      type:""
    }
    DB.Insert<djp>(djp)
    return K.ATTR({total:"0",uid:uidNew.toString(),djchance:"0"});
  }
  return record
}