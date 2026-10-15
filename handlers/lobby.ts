import { __sendSuccessLOG } from './__test__';
import { lobby_history, lobby_search } from "../model/bd_types_lobby";
import { matchesProperty } from 'lodash';
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
   *  - game_id = "A5B23874A5E46E9A", (is data_id)
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
   * 
   * RESPONSE:
   * - qid =
   * - master = 
   * - timelimit =
   * - seq =
   * - addr =
   * - time0 =
   * - time1 =
   * - time2 =
   * - time3 =
   * - time4 =
   * - time5 =
   * - time6 =
   * - time7 =
   */
  console.log("lobbyQuery: START");
  console.log(JSON.stringify($(data).obj));
  const UnixTime: number = Math.floor(new Date().getTime() / 1000);
  const timelimit: number = U.GetConfig("TimeLimitSearchLobby");
  const maxTime: number = UnixTime+timelimit;
  var rAttr: KAttrMap = {};
  const search = await DB.Find<lobby_search>({
    $and: [
      {
        collection:"lobby_search",
        gamemode:$(data).attr().gamemode,
        gameparam:$(data).attr().gameparam,
        party_id:$(data).attr().party_id,
        lobby_key : $(data).str("lobby_key"),
        lobby_param : $(data).number("lobby_param"),
        started: false
      },
      {
        $not: {
          $or: [
            {inhibit1: $(data).attr().game_id},
            {inhibit2: $(data).attr().game_id},
            {inhibit3: $(data).attr().game_id},
            {inhibit4: $(data).attr().game_id},
          ]
        }
      }
    ]
  });
  console.log(JSON.stringify(search[0]));
  if(search.length > 0){
    const tl: number = search[0].timelimit < UnixTime ? 0 : search[0].timelimit - UnixTime;
    rAttr = {
      qid: search[0].qid,
      master: search[0].pa1,
      timelimit: tl.toString(),
      seq: seqIs(search[0].timelimit).toString(),
      addr: search[0].pa1
    };
    console.log(JSON.stringify(rAttr));
    console.log("lobbyQuery: END");
    return send.object(K.ATTR(rAttr));
  }
  DB.Insert<lobby_search>({
    collection:"lobby_search",
    qid:$(data).attr().game_id.slice(0,5)+"_"+UnixTime.toString(),
    timelimit: maxTime,
    game_id:$(data).attr().game_id,
    dataid1:$(data).attr().game_id,
    dataid2:"",
    dataid3:"",
    dataid4:"",
    game_id_type : $(data).attr().game_id_type,
    gamemode : $(data).attr().gamemode,
    gameparam : $(data).attr().gameparam,
    pa1 : $(data).attr().pa1,
    pa2 : "",
    pa3 : "",
    pa4 : "",
    party_id : $(data).attr().party_id,
    lobby_key : $(data).str("lobby_key"),
    lobby_param : $(data).number("lobby_param"),
    inhibit1 : "",
    inhibit2 : "",
    inhibit3 : "",
    started: false,
    start_time:0,
    end_time:0,
  });
  rAttr = {
    qid: $(data).attr().game_id.slice(0,5)+"_"+UnixTime.toString(),
    master: $(data).attr().pa1,
    timelimit: timelimit.toString(),
    seq: seqIs(maxTime).toString(),
    addr: $(data).attr().pa1
  }
  console.log("lobbyQuery: END");
  return send.object(K.ATTR(rAttr));
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
   *  - game_id = "A5B23874A5E46E9A", (is data_id)
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
   * 
   * RESPONSE:
   * - stat =
   * - qid =
   * - wait =
   * - master = 
   * - timelimit =
   * - seq =
   * - addr =
   * - time0 =
   * - time1 =
   * - time2 =
   * - time3 =
   * - time4 =
   * - time5 =
   * - time6 =
   * - time7 =
   */
  console.log(JSON.stringify($(data).obj));
  const UnixTime: number = Math.floor(new Date().getTime() / 1000);
  const dataIDs = [
    $(data).str("prematch.data_id.0"),
    $(data).str("prematch.data_id.1"),
    $(data).str("prematch.data_id.2")
  ];
  
  var query: Query<lobby_search> = {
    collection:"lobby_search",
    game_id: $(data).attr().game_id,
    started: false,
  }
  const result = await DB.Upsert<lobby_search>(query,{
    $set:{
      dataid2 : dataIDs[0],
      dataid3 : dataIDs[1],
      dataid4 : dataIDs[2],
      pa2: $(data).attr().pa1,
      pa3: $(data).attr().pa2,
      pa4: $(data).attr().pa3,
      inhibit1 : $(data).str("inhibit.data_id.0"),
      inhibit2 : $(data).str("inhibit.data_id.1"),
      inhibit3 : $(data).str("inhibit.data_id.2"),
      lobby_key: $(data).str("lobby_key"),
      lobby_param: $(data).number("lobby_param"),
    }
  });
  if (result.upsert == true && result.updated > 0){
    var doc = result.docs[0]
  } else return send.deny();
  console.log(JSON.stringify(result));

  var wait = "1"
  var master = "1"
  if(
    $(data).attr().gamemode == "11" &&
    dataIDs[0] != "" &&
    dataIDs[1] != ""
  ) wait = "0"; else if(
    dataIDs[0] != "" &&
    dataIDs[1] != "" &&
    dataIDs[2] != ""
  ) wait = "0"; else if(
    doc.timelimit <= UnixTime
  ) wait = "0"; else if(
    dataIDs[0] == "" &&
    dataIDs[1] == "" &&
    dataIDs[2] == ""
  ) {
    wait = "0";
    master = "0"
  }
  if(wait == "0") DB.Upsert<lobby_search>(query,{$set: {started: true}});
  const tl: number = doc.timelimit < UnixTime ? 0 : doc.timelimit - UnixTime;

  return send.object(K.ATTR({
    stat:"0",
    qid: doc.qid,
    wait: wait,
    master: master,
    timelimit: tl.toString(),
    seq: seqIs(doc.timelimit).toString(),
    addr: doc.pa1
  }))
};

export const lobbyPoling: EPR = async (info, data, send) => {
  /**
   * lobby.poling
   * ???
   * 
   * DATA:
   *  - cancel = ?????,
   *  - game_id = "A5B23874A5E46E9A", (is data_id)
   *  - game_id_type = "1",
   *  - magic = "KK9",
   *  - qid = "0" - query id?
   * 
   * RESPONSE:
   * - stat =
   * - qid =
   * - wait =
   * - master = 
   * - timelimit =
   * - seq =
   * - addr =
   * - time0 =
   * - time1 =
   * - time2 =
   * - time3 =
   * - time4 =
   * - time5 =
   * - time6 =
   * - time7 =
   */
  DB.Update<lobby_search>({
    collection:"lobby_search",
    game_id: $(data).attr().game_id
  }, {
    $set: {
      started:true,
      start_time: Math.floor(new Date().getTime() / 1000)
    }
  })

  return __sendSuccessLOG(info, data, send);
};

function seqIs (timestamp: number): number {
  return (timestamp << 7) & 0xffffffff;
}