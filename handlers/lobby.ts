import { __sendSuccessLOG } from './__test__';
export const lobbyQuery: EPR = async (info, data, send) => {
  /**
   * lobby.query
   * Запрос на лобби
   * 
   * DATA:
   *  - a1 = "127.0.0.1:5700",
   *  - a2 = "127.0.0.1:5700",
   *  - a3 = "127.0.0.1:5700",
   *  - belong_shop_rating = "0",
   *  - cab_client_id = "0",
   *  - cab_group_id = "0",
   *  - cheat_ctr = "0",
   *  - cheat_pts = "0",
   *  - entry_area = "13",
   *  - eventmode = "0",
   *  - from_area = "13",
   *  - full_wait = "0",
   *  - game_id = "A5B23874A5E46E9A",
   *  - game_id_type = "1",
   *  - gamemode = "3",
   *  - gameparam = "0",
   *  - gpcbid = "00010203040506070809",
   *  - grand_champion = "0",
   *  - group = "0",
   *  - guest = "0",
   *  - join_shop_rating = "0",
   *  - jong_index = "0",
   *  - koryu_class = "0",
   *  - koryu_lv = "0",
   *  - koryu_type = "0",
   *  - league_han = "X",
   *  - league_san = "X",
   *  - league_ton = "X",
   *  - level = "5",
   *  - life = "0",
   *  - loc_id = "ea",
   *  - magic = "KK9",
   *  - match_shop_id0 = "",
   *  - match_shop_id1 = "",
   *  - match_shop_id2 = "",
   *  - method = "query",
   *  - net_version = "29",
   *  - pa1 = "26.114.124.205:5700",
   *  - pa2 = "26.114.124.205:5700",
   *  - pa3 = "26.114.124.205:5700",
   *  - party_id = "0",
   *  - play_shop_id = "ea",
   *  - pre_score = "-145",
   *  - priority = "0",
   *  - pro_id = "0",
   *  - probit0 = "0",
   *  - probit1 = "0",
   *  - probit2 = "0",
   *  - probit3 = "0",
   *  - probit4 = "0",
   *  - probit_level = "0",
   *  - s_probit0 = "0",
   *  - s_probit1 = "0",
   *  - s_probit2 = "0",
   *  - s_probit3 = "0",
   *  - s_probit4 = "0",
   *  - shop_number = "0",
   *  - special_table = "0",
   *  - super_league_class_han = "0",
   *  - super_league_class_san = "0",
   *  - super_league_class_ton = "0",
   *  - taikyoku_cnt = "0",
   *  - tatsujin_type = "0",
   *  - tour_step = "0",
   *  - ttype = "1",
   *  - use_priority = "0"
   * <prematch>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   * </prematch>
   * <inhibit>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   * </inhibit>
   * <lobby_key __type="str"></lobby_key>
   * <lobby_param __type="s32">0</lobby_key>
   * <avoid_match __type="u8">0</lobby_key>
   * <ease_match __type="u8">1</lobby_key>
   * <avoid_master __type="u8">0</lobby_key>
   * <match_sec __type="s32">0</lobby_key>
   * <need_cpu __type="u8">0</lobby_key>
   * <kohaku_team __type="u8">0</lobby_key>
   * <kohaku_win_pro __type="u8">0</lobby_key>
   * <special_player __type="u8">0</lobby_key>
   */

  return __sendSuccessLOG(info, data, send);
};

export const lobbyAccept: EPR = async (info, data, send) => {
  /**
   * lobby.accept
   * Принятие в лобби
   * 
   * DATA:
   *  - a1 = "127.0.0.1:5700",
   *  - a2 = "127.0.0.1:5700",
   *  - a3 = "127.0.0.1:5700",
   *  - belong_shop_rating = "0",
   *  - cab_client_id = "0",
   *  - cab_group_id = "0",
   *  - cheat_ctr = "0",
   *  - cheat_pts = "0",
   *  - entry_area = "13",
   *  - eventmode = "0",
   *  - from_area = "13",
   *  - full_wait = "0",
   *  - game_id = "A5B23874A5E46E9A",
   *  - game_id_type = "1",
   *  - gamemode = "3",
   *  - gameparam = "0",
   *  - gpcbid = "00010203040506070809",
   *  - grand_champion = "0",
   *  - group = "0",
   *  - guest = "0",
   *  - join_shop_rating = "0",
   *  - jong_index = "0",
   *  - koryu_class = "0",
   *  - koryu_lv = "0",
   *  - koryu_type = "0",
   *  - league_han = "X",
   *  - league_san = "X",
   *  - league_ton = "X",
   *  - level = "5",
   *  - life = "0",
   *  - loc_id = "ea",
   *  - magic = "KK9",
   *  - match_shop_id0 = "",
   *  - match_shop_id1 = "",
   *  - match_shop_id2 = "",
   *  - method = "accept",
   *  - net_version = "29",
   *  - pa1 = "26.114.124.205:5700",
   *  - pa2 = "26.114.124.205:5700",
   *  - pa3 = "26.114.124.205:5700",
   *  - party_id = "0",
   *  - play_shop_id = "ea",
   *  - pre_score = "-145",
   *  - priority = "0",
   *  - pro_id = "0",
   *  - probit0 = "0",
   *  - probit1 = "0",
   *  - probit2 = "0",
   *  - probit3 = "0",
   *  - probit4 = "0",
   *  - probit_level = "0",
   *  - s_probit0 = "0",
   *  - s_probit1 = "0",
   *  - s_probit2 = "0",
   *  - s_probit3 = "0",
   *  - s_probit4 = "0",
   *  - shop_number = "0",
   *  - special_table = "0",
   *  - super_league_class_han = "0",
   *  - super_league_class_san = "0",
   *  - super_league_class_ton = "0",
   *  - taikyoku_cnt = "0",
   *  - tatsujin_type = "0",
   *  - tour_step = "0",
   *  - ttype = "1",
   *  - use_priority = "0"
   * <prematch>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   * </prematch>
   * <inhibit>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   *   <data_id __type="str"></data_id>
   * </inhibit>
   * <lobby_key __type="str"></lobby_key>
   * <lobby_param __type="s32">0</lobby_key>
   * <avoid_match __type="u8">0</lobby_key>
   * <ease_match __type="u8">1</lobby_key>
   * <avoid_master __type="u8">0</lobby_key>
   * <match_sec __type="s32">0</lobby_key>
   * <need_cpu __type="u8">0</lobby_key>
   * <kohaku_team __type="u8">0</lobby_key>
   * <kohaku_win_pro __type="u8">0</lobby_key>
   * <special_player __type="u8">0</lobby_key>
   */

  return __sendSuccessLOG(info, data, send);
};

export const lobbyPoling: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

