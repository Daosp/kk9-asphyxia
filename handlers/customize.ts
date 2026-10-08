import { __sendSuccessLOG, __logingInfoData,formatCurrentDateTimeUTC } from './__test__';
export const customizeGet: EPR = async (info, data, send) => {
  /**
   * kk9customize.get
   * Подача информации о кастомизации?
   * 
   * receiver returns failure
   * 
   * DATA:
   *  - data_id="6AC255D500000000"
   *  - method="get"
   * <pro_id __type="s32">0</pro_id>
   */
  const UnixTime = Math.floor(new Date().getTime() / 1000);
  var response = {
    customize_id:K.ITEM("u32",1),
    /*panel:{
      base:K.ITEM("u32",1000006),//1000000
      corner:K.ITEM("u32",2000006),//2000000
      midle:K.ITEM("u32",3000006),//3000000
      medal_nr:K.ITEM("u32",0),
      medal:K.ARRAY("u32",[]), //4010016
      //enable_pro_marker:K.ITEM("u32",100),
      //pro_marker:K.ITEM("u32",100),
      date:K.ITEM("u32",UnixTime)
    },
    table:{
      hai:K.ITEM("u32",5000006),//5000000
      table:K.ITEM("u32",6000006),//6000000
      date:K.ITEM("u32",UnixTime)
    },
    irodori:{
      call:K.ITEM("u32",6), //7000000
      comment:K.ITEM("u32",6), //8000000
      date:K.ITEM("u32",UnixTime)
    },
    gouka:{
      movebg:K.ITEM("u32",6), //9000000
      date:K.ITEM("u32",UnixTime)
    }*/
  };
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
  +
<customize>
    <is_disp __type="u8">1</is_disp>
    <base_parts __type="u32">0</base_parts>
    <base_parts_grade __type="str"/>
    <corner_parts __type="u32">0</corner_parts>
    <corner_parts_grade __type="str"/>
    <midle_parts __type="u32">0</midle_parts>
    <midle_parts_grade __type="str"/>
    <medal_parts_0 __type="u32">9</medal_parts_0>
    <medal_parts_1 __type="u32">9</medal_parts_1>
    <medal_parts_2 __type="u32">9</medal_parts_2>
    <medal_parts_3 __type="u32">9</medal_parts_3>
    <medal_parts_4 __type="u32">9</medal_parts_4>
    <medal_parts_5 __type="u32">9</medal_parts_5>
    <medal_parts_6 __type="u32">9</medal_parts_6>
    <medal_parts_7 __type="u32">9</medal_parts_7>
    <medal_parts_8 __type="u32">9</medal_parts_8>
    <medal_parts_9 __type="u32">9</medal_parts_9>
    <medal_parts_10 __type="u32">9</medal_parts_10>
    <medal_parts_11 __type="u32">9</medal_parts_11>
    <medal_parts_12 __type="u32">9</medal_parts_12>
    <medal_parts_13 __type="u32">9</medal_parts_13>
    <medal_parts_14 __type="u32">9</medal_parts_14>
    <medal_parts_15 __type="u32">9</medal_parts_15>
</customize>
*/
  __logingInfoData(info, data);
  console.log('-=RESPONSE=-');
  console.log(JSON.stringify(response));
  
  return send.object(response);
};

export const customizeCheck: EPR = async (info, data, send) => {
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