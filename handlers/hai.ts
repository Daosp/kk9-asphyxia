import { __sendSuccessLOG } from './__test__';
export const haiRec: EPR = async (info, data, send) => {
  /**
   * kk9hai.rec
   * 
   * DATA:
   * <profile>
   *     <data_id __type="str">________</data_id>
   *     <name __type="str">ＤＡＯＳＰ</name>
   *     <level __type="s32">10</level>
   *     <group __type="s32">3</group>
   *     <klevel __type="s32">0</klevel>
   *     <area __type="s32">13</area>
   *     <shop_name __type="str">ＤＳＰ－ＣＬＵＢ</shop_name>
   *     <pro_id __type="s32">0</pro_id>
   * </profile>
   * <ref_id __type="str">_______</ref_id>
   * <sns_id __type="s32">0</sns_id>
   * <haifu_type __type="u16">0</haifu_type>
   * <haifu_tag __type="u16">0</haifu_tag>
   * <haifu_priority __type="s32">0</haifu_priority>
   * <data __type="bin" __size="409600" date="1792316898">_________</data>
   * <is_master __type="u8">1</is_master>
   */
  console.log("kk9hai.rec");
  return send.success();
};

export const haiRec_movie: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const haiGet: EPR = async (info, data, send) => {
  /**
   * kk9hai.get
   * Recording of gameplay?
   * 
   * DATA:
   *  - for_hotlive=0
   *  - greedy=1
   *  - loc_id="ea"
   *  - method="get"
   */

  return __sendSuccessLOG(info, data, send);
};

