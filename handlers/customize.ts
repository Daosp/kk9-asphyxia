import { __sendSuccessLOG, __logingInfoData,formatCurrentDateTimeUTC } from './__test__';
import { custom, custom_Medal } from "../model/bd_types_custom";

export const customizeGet: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  const dataId = $(data).attr().data_id;
  if (!dataId) {return send.deny();}
  /**
   * kk9customize.get
   * Подача информации о кастомизации?
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="get"
   * <pro_id __type="s32">0</pro_id> от 1 до 154
   */
  var response: {
    [key: string]: any | Object; // любой строковый ключ с любым значением
  } = {}
  //BE68 - offset
  const rCust = await DB.FindOne<custom>(dataId,{collection: 'custom',});
  response = {
    customize_id:K.ITEM("u32",1),
    panel:{
      base:K.ITEM("u32",parseInt(rCust.base)),       //1000000-1000005 , 1010001-1010005
      corner:K.ITEM("u32",parseInt(rCust.corner)),   //2000000-2000005 , 2010001-2010005
      midle:K.ITEM("u32",parseInt(rCust.midle)),     //3000000-3000005 , 3010001-3010005
      //enable_pro_marker:K.ITEM("u32",100),
      //pro_marker:K.ITEM("u32",100),
      date:K.ITEM("u32",rCust.date_p)
    },
    table:{
      hai:K.ITEM("u32",parseInt(rCust.hai)),         //5000000-5000005 , 5010001-5010005
      table:K.ITEM("u32",parseInt(rCust.table)),     //6000000-6000224 , 6010001-6010224
      date:K.ITEM("u32",rCust.date_t)
    },
    irodori:{
      call:K.ITEM("u32",parseInt(rCust.call)),       //7000000-7000001 , 7010001-7010001
      comment:K.ITEM("u32",parseInt(rCust.comment)), //8000000-8000000 , 8010001-8010000
      date:K.ITEM("u32",rCust.date_i)
    },
    gouka:{
      movebg:K.ITEM("u32",parseInt(rCust.movebg)),   //9000000 , 9010001-9010003
      date:K.ITEM("u32",rCust.date_g)
    }
  }

  const rMed = await DB.FindOne<custom_Medal>(dataId,{collection: 'custom_Medal',});
  if (!_.isNil(rMed) && rMed.medalNR > 0) {          //4010001-4010016
    response.panel.medal_nr = K.ITEM("u32",rMed.medalNR);
    const medalArray: number[] = [rMed.medal0,rMed.medal1,rMed.medal2,rMed.medal3,rMed.medal4,rMed.medal5,rMed.medal6,rMed.medal7,rMed.medal8,rMed.medal9,rMed.medal10,rMed.medal11,rMed.medal12,rMed.medal13,rMed.medal14,rMed.medal15];
    response.panel.medal = K.ARRAY("u32",medalArray.slice(0, rMed.medalNR));
  }

/*
<customize_data>
    <panel_data>
        <base_parts __type="u32">1000005</base_parts>
        <corner_parts __type="u32">2000005</corner_parts>
        <midle_parts __type="u32">3000005</midle_parts>
        <medal_parts_0 __type="u32">0</medal_parts_0>
        <medal_parts_1 __type="u32">0</medal_parts_1>
        <medal_parts_2 __type="u32">0</medal_parts_2>
        <medal_parts_3 __type="u32">0</medal_parts_3>
        <medal_parts_4 __type="u32">0</medal_parts_4>
        <medal_parts_5 __type="u32">0</medal_parts_5>
        <medal_parts_6 __type="u32">0</medal_parts_6>
        <medal_parts_7 __type="u32">0</medal_parts_7>
        <medal_parts_8 __type="u32">0</medal_parts_8>
        <medal_parts_9 __type="u32">0</medal_parts_9>
        <medal_parts_10 __type="u32">0</medal_parts_10>
        <medal_parts_11 __type="u32">0</medal_parts_11>
        <medal_parts_12 __type="u32">0</medal_parts_12>
        <medal_parts_13 __type="u32">0</medal_parts_13>
        <medal_parts_14 __type="u32">0</medal_parts_14>
        <medal_parts_15 __type="u32">0</medal_parts_15>
        <date __type="u32">1791429604</date>
    </panel_data>
    <table_data>
        <hai_parts __type="u32">0</hai_parts>
        <table_parts __type="u32">0</table_parts>
        <date __type="u32">0</date>
    </table_data>
    <irodori_data>
        <call_parts __type="u32">0</call_parts>
        <comment_parts __type="u32">0</comment_parts>
        <date __type="u32">0</date>
    </irodori_data>
    <gouka_data>
        <movebg_parts __type="u32">0</movebg_parts>
        <date __type="u32">0</date>
    </gouka_data>
    <trial_w>
        <call_0 __type="u32">0</call_0>
        <movebg_0 __type="u32">0</movebg_0>
    </trial_w>
    <customize_id __type="u32">1</customize_id>
    <buy_right_0 __type="u32">0</buy_right_0>
    <buy_right_1 __type="u32">0</buy_right_1>
    <new_mark_gen __type="u32">0</new_mark_gen>
</customize_data>
*/
  __logingInfoData(info, data);
  console.log('-=RESPONSE=-');
  console.log(JSON.stringify(response));
  
  const res = K.ATTR({expire:formatCurrentDateTimeUTC(60*60)},response)
  return send.object(res);
};

export const customizeCheck: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  const dataId = $(data).attr().data_id;
  if (!dataId) {return send.deny();}
  /**
   * kk9customize.check
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="get"
   * <pro_id __type="s32">0</pro_id>
   */
  var response: {
    [key: string]: any | Object; // любой строковый ключ с любым значением
  } = {}
  //BE68 - offset
  var record = await DB.FindOne<custom>(dataId,{collection: 'custom',});

  response = {
    customize_id:K.ITEM("u32",1),
    panel:{
      base:K.ITEM("u32",parseInt(record.base),{avail:"1"}),//1000000-1000005
      corner:K.ITEM("u32",parseInt(record.corner),{avail:"1"}),//2000000-2000005
      midle:K.ITEM("u32",parseInt(record.midle),{avail:"1"}),//3000000-3000005
      date:K.ITEM("u32",record.date_p)
    },
    table:{
      hai:K.ITEM("u32",parseInt(record.hai),{avail:"1"}),//5000000-5000005
      table:K.ITEM("u32",parseInt(record.table),{avail:"1"}),//6000000-6000224
      date:K.ITEM("u32",record.date_t)
    },
    irodori:{
      call:K.ITEM("u32",parseInt(record.call),{avail:"1"}), //7000000-7000001 ???
      comment:K.ITEM("u32",parseInt(record.comment),{avail:"1"}), //8000000-8000000 ???
      date:K.ITEM("u32",record.date_i)
    },
    gouka:{
      movebg:K.ITEM("u32",parseInt(record.movebg),{avail:"1"}), //9000000-9000000 ???
      date:K.ITEM("u32",record.date_g)
    }
  }
  return __sendSuccessLOG(info, data, send);
};

export const customizeItem: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizePro_override: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeShop_confirm: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeShop_buy: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};

export const customizeOshigacha_confirm: EPR = async (info, data, send) => {
  /**
   * kk9customize.oshigacha_confirm
   * Подача информации о кастомизации?
   * 
   * receiver returns failure
   * 
   * DATA:
   * <data_id __type="str">___refid____</data_id>
   */
/*
<oshigacha>
    <sel_0 __type="u32">0</sel_0>
    <i_0>//до 199
        <kpt __type="s32">0</kpt>
        <bonus __type="u32">0</bonus>
        <date __type="u32">0</date>
    </i_0>
    <e_0>//до 4
        <ev __type="s32">0</ev>
        <val __type="s32">0</val>
        <date __type="u32">0</date>
    </e_0>
</oshigacha>
*/
  var response = K.ATTR({
    article:"0"
  },{
    master:K.ITEM("str","0"),
  });
  return __sendSuccessLOG(info, data, send);
};

export const customizeOshigacha_draw: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};