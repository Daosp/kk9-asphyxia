import { __sendSuccessLOG, __logingInfoData } from './__test__';
import { vip, vip_menuItems, vip_menuGoods, vip_items, vip_goods } from "../model/bd_types_vip";
export const vipStart: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  const dataId = $(data).str("data_id");
  if (!dataId) {return send.deny();}
  const responseDB = await DB.FindOne<vip>(dataId,{collection:"vip"});
  if (_.isNil(responseDB)) {
    DB.Upsert<vip>(dataId,{
      collection:"vip"
    },{
      $set:{
        point:0,
        point_total:0,
        vip_rank:0,
      }
    });
    return send.object({
      "success":K.ITEM("bool",true),
      "already":K.ITEM("bool",false),
    });
  }else{
    return send.object({
      "success":K.ITEM("bool",false),
      "already":K.ITEM("bool",true),
    });
  }
};

export const vipStatus: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  const dataId = $(data).str("data_id");
  if (!dataId) {return send.deny();}
  const rDB = await DB.FindOne<vip>(dataId,{collection:"vip"});
  if (_.isNil(rDB)) return send.object({enable:K.ITEM("bool",false)});
  const rDBmI = await DB.Find<vip_menuItems>(dataId,{collection:"vip_menuItems"});
  var menuItemIs: Object[] = [];
  if (!_.isNil(rDB)) for(const r of rDBmI)menuItemIs.push({
    name:K.ITEM("str",r.name),
    box:K.ITEM("str",r.box),
    type:K.ITEM("str",r.type),
    expire_stamp:K.ITEM("str",r.expire_stamp),
    point:K.ITEM("u8",r.point),
    need_rank:K.ITEM("u8",r.need_rank)
  });
  var mI = menuItemIs.length == 0 ? "" : {i:menuItemIs};

  const rDBmG = await DB.Find<vip_menuGoods>(dataId,{collection:"vip_menuGoods"});
  var menuGoodsIs: Object[] = [];
  if (!_.isNil(rDBmG)) for(const r of rDBmG){
    menuGoodsIs.push({
      name:K.ITEM("str",r.name),
      point:K.ITEM("u8",r.point),
      need_rank:K.ITEM("u8",r.need_rank)
    })
  }
  var mG = menuGoodsIs.length == 0 ? "" : {i:menuGoodsIs};

  const rDBI = await DB.Find<vip_items>(dataId,{collection:"vip_items"});
  var itemIs: Object[] = [];
  if (!_.isNil(rDB))for(const r of rDBI){
    itemIs.push({
      data_id:K.ITEM("str",r.data_id),
      name:K.ITEM("str",r.name),
      box:K.ITEM("str",r.box),
      type:K.ITEM("str",r.type),
      param:K.ITEM("str",r.param),
      expire_stamp:K.ITEM("str",r.expire_stamp),
      stamp:K.ITEM("str",r.stamp),
      expire:K.ITEM("str",r.expire)
    })
  }
  var i = itemIs.length == 0 ? "" : {i:itemIs};

  const rDBG = await DB.Find<vip_goods>(dataId,{collection:"vip_goods"});
  var goodsIs: Object[] = [];
  if (!_.isNil(rDBG)) for(const r of rDBG){
    goodsIs.push({
      name:K.ITEM("str",r.name),
      nr:K.ITEM("u8",r.nr),
      stamp:K.ITEM("str",r.stamp)
    })
  }
  var g = goodsIs.length == 0 ? "" : {i:goodsIs};

  return send.object(K.ATTR({
    point: rDB.point.toString(),
    total_point: rDB.point_total.toString(),
    vip_rank: rDB.vip_rank.toString()
  },{
    enable:K.ITEM("bool",rDB.enable),
    menu:{
      item: mI,
      goods: mG
    },
    item: i,
    goods: g
  }));
};

export const vipAdd_point: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  const dataId = $(data).str("data_id");
  if (!dataId) {return send.deny();}
  const responseDB = await DB.FindOne<vip>(dataId,{collection:"vip"});
  const Ts = $(data).elements("t");
  var innerR: KATTR<{tid: string}>[] = [];
  var addPointSUM = 0;
  for(const t of Ts){
    const r = K.ATTR({
      tid:t.attr().tid
    },{
      already:K.ITEM("bool",false)
    });
    addPointSUM += t.number("point");
    innerR.push(r);
    console.log("vipAdd_point: add ".concat(t.number("point").toString()).concat(" p by TID ").concat(r['@attr'].tid))
  }
  const point_Result = responseDB.point + addPointSUM;
  const Tpoint_Result = responseDB.point_total + addPointSUM;
  DB.Upsert<vip>(dataId,{
    collection:"vip"
  },{
    $set:{
      point:point_Result,
      point_total:Tpoint_Result
    }
  });
  return send.object(K.ATTR({
    result_point:point_Result.toString()
  },{r:innerR}))
};

export const vipConsume_pay: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  const dataId = $(data).str("data_id");
  const cid = U.Card2NFC(dataId);
  if (!dataId || _.isNil(cid)) {return send.deny();}
  const responseDB = await DB.FindOne<vip>(dataId,{collection:"vip"});
  const Cs = $(data).elements("c");
  var innerR: KATTR<{idx: string;cid: string}>[] = [];
  var minusPointSUM = 0;
  
  for(const c of Cs){
    const r = K.ATTR({
      idx:c.attr().idx,
      cid: (cid ?? c.attr().idx)
    },{
      failure:K.ITEM("bool",false),
      short:K.ITEM("bool",false)
    });

    innerR.push(r);

    minusPointSUM += c.number("point");
    console.log("vipConsume_pay: pay ".concat(c.number("point").toString()).concat(" p by CID ").concat(r['@attr'].idx))
  }

  const point_Result = responseDB.point - minusPointSUM;

  DB.Upsert<vip>(dataId,{collection:"vip"},{$set:{point:point_Result}});

  return send.object(K.ATTR({
    result_point:point_Result.toString()
  },{r:innerR}))
};

export const vipConsume_reserve: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const vipConsume_adjust: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const vipRight_reserve: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const vipRight_confirm: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const vipItem_get: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const vipGoods_get: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const vipGoods_use: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};