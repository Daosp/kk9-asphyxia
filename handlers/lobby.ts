import { __sendSuccessLOG } from './__test__';
import { lobby, lobby_history, isLobbySame } from "../model/bd_types_lobby";
import { lbSearch as lbS, lbMasterLastSeq as lbMLS } from "../index";

/*
Gamemodes:
   0 - No play    - ""
   1 - With CPU   - "CPU"
   2 - Local Play - "local"
   3 - Tonpu      - "onlinet"
   4 - Hanchan    - "onlineh"
   5 - _          - "tonpu"
   6 - _          - "hanchan"
   7 - _          - "tour_league"
   8 - _          - "party"
   9 - _          - "event"
  10 - _          - "BGN"
  11 - Sanma      - "sanma"
  12 - _          - "competition"
  13 - _          - "san_surv"
  14 - _          - "triathlon"
  15 - _          - "eight"
  16 - Planet     - "eight"

Data of lobby PSH packet:
  - KK9     (4B 4B 39)    - string
  - 4 bytes (00 00 00 00) - ???
  - 0A byte (0A)          - byte
  - 4 bytes (57 E6 5D E4) - ???    - if seq=1
            (CE EF 0C 5E) - ???    - if seq=2
            (B9 E8 3C C8) - ???    - if seq=3
            (27 8C A9 6B) - ???    - if seq=4
            (50 8B 99 FD) - ???    - if seq=5
  - 2 bytes (01 01)       - ???
  - 4 bytes (00 00 00 04) - ???    - lobby of sanma, is not gamemode. Maximum seq?
  - seq     (__ __ __ __) - uint32
*/

export const lobbyQuery: EPR = async (info, data, send) => {
  /**
   * lobby.query
   * Request to wait in the lobby
   * 
   * DATA:
   *  - a1 = "127.0.0.1:5700",
   *  - a2 = "127.0.0.1:5700",
   *  - a3 = "127.0.0.1:5700", (why is 3?)
   *  - belong_shop_rating = "0",
   *  - cab_client_id = "0",  //This is for old cabs with CU     //
   *  - cab_group_id = "0",   //CAB ID (0-22) and CAB GROUP (A-F)//
   *  - cheat_ctr = "0",
   *  - cheat_pts = "0",
   *  - entry_area = "13",
   *  - eventmode = "0",
   *  - from_area = "13",
   *  - full_wait = "0",
   *  - game_id = "________", (is data_id)
   *  - game_id_type = "1", (cardtype?)
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
   *  - life = "0", (for standart play?)
   *  - loc_id = "ea",
   *  - magic = "KK9",
   *  - match_shop_id0 = "",
   *  - match_shop_id1 = "",
   *  - match_shop_id2 = "",
   *  - method = "query",
   *  - net_version = "29",
   *  - pa1 = "__.__.__.__:5700",
   *  - pa2 = "__.__.__.__:5700",
   *  - pa3 = "__.__.__.__:5700",
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
   *  - ttype = "1", (hm, interesitng... this is room? after 1 dan i have ttype = "2")
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
   * - qid       = 4 bytes - 0x34 //ID query? only number
   * - master    = 4 bytes - 0x38 //Number, not IP:Port. Boolean?
   * - timelimit = 4 bytes - 0x3C //Number of seconds left
   * - seq       = 4 bytes - 0x40 //SEQuence number for players? Or requests?
   * - addr      = string  - 0x60 //IP:PORT of master
   * - time0     = 4 bytes - 0xC0 //Timestamp?
   * - time1     = 4 bytes - 0xC4...
   * - time2     =
   * - time3     =
   * - time4     =
   * - time5     =
   * - time6     =
   * - time7     =
   */
  const lbSearch: lobby[] = lbS;
  console.log("lobbyQuery: START");
  console.log(U.toXML($(data)).slice(0,64)+"...");
  //console.log(lbS);
  const UnixTime: number = Math.floor(new Date().getTime() / 1000);
  const timelimit: number = U.GetConfig("TimeLimitSearchLobby");
  const maxTime: number = UnixTime+timelimit;
  var rAttr: KAttrMap = {};
  let lbID = lbSearch.findIndex(
    (lb) => isLobbySame(
      lb,
      $(data).attr().gamemode,
      $(data).attr().gameparam,
      $(data).str("lobby_key"),
      $(data).number("lobby_param"),
      $(data).attr().game_id,
      parseInt($(data).attr().ttype),
    )
  );
  if(lbID == -1){
    console.log("lobbyQuery: New lobby");
    const lbSearch: lobby[] = lbS;
    const reqBool = typeof lbMLS[$(data).attr().game_id] === "undefined";
    const seq = reqBool?0:lbMLS[$(data).attr().game_id]+1;
    lbSearch.push({
      qid:UnixTime,
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
      ttype:parseInt($(data).attr().ttype),
      start_time:0,
      end_time:0,
      seq:UnixTime,
      time0 : UnixTime,
      time1 : 0,
      time2 : 0,
      time3 : 0,
      time4 : 0,
      time5 : 0,
      time6 : 0,
      time7 : 0,
    });
    rAttr = {
      qid: UnixTime.toString(),
      master: "1",
      timelimit: timelimit.toString(),
      seq: "0",
      addr: $(data).attr().pa1,
      time0: UnixTime.toString(),
    }
    lbMLS[$(data).attr().game_id]=seq;
    console.log("lobbyQuery: END");
    return send.object(K.ATTR(rAttr));
  }
  console.log("lobbyQuery: Find lobby");
  console.log(JSON.stringify(lbSearch[lbID]));
  const tl: number = lbSearch[lbID].timelimit < UnixTime ? 0 : lbSearch[lbID].timelimit - UnixTime;
  var arTime = [
    lbSearch[lbID].time0,lbSearch[lbID].time1,lbSearch[lbID].time2,lbSearch[lbID].time3,
    lbSearch[lbID].time4,lbSearch[lbID].time5,lbSearch[lbID].time6,lbSearch[lbID].time7,
  ];
  for(const i in arTime) if (arTime[i] == 0){
    arTime[i] = UnixTime;
    break
  }
  rAttr = {
    qid: lbSearch[lbID].qid.toString(),
    master: "0",
    timelimit: tl.toString(),
    seq: lbSearch[lbID].seq.toString(),
    addr: lbSearch[lbID].pa1
  };
  for(const i in arTime) if(arTime[i] !== 0){
    rAttr["time"+i] = arTime[i].toString();
  }
  lbSearch[lbID].time0 = arTime[0];
  lbSearch[lbID].time1 = arTime[1];
  lbSearch[lbID].time2 = arTime[2];
  lbSearch[lbID].time3 = arTime[3];
  lbSearch[lbID].time4 = arTime[4];
  lbSearch[lbID].time5 = arTime[5];
  lbSearch[lbID].time6 = arTime[6];
  lbSearch[lbID].time7 = arTime[7];

  console.log(JSON.stringify(rAttr));
  console.log("lobbyQuery: END");
  return send.object(K.ATTR(rAttr));
};

export const lobbyAccept: EPR = async (info, data, send) => {
  /**
   * lobby.accept
   * Принятие в лобби
   * 
   * DATA:
   * see lobby.query
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
  console.log("lobbyAccept: START");
  const lbSearch: lobby[] = lbS;
  const UnixTime : number = Math.floor(new Date().getTime() / 1000);
  const dataIDs = [
    $(data).str("prematch.data_id.0"),
    $(data).str("prematch.data_id.1"),
    $(data).str("prematch.data_id.2")
  ];
  
  let lbID: number = lbSearch.findIndex(
    (lb) => isLobbySame(
      lb,
      $(data).attr().gamemode,
      $(data).attr().gameparam,
      $(data).attr().lobby_key,
      parseInt($(data).attr().lobby_param),
      $(data).attr().dataid1,
      parseInt($(data).attr().ttype),
    )
  );
  if (lbID == -1) return send.deny();
  console.log(JSON.stringify(lbSearch[lbID]));

  var wait = "1"
  if((
    $(data).attr().gamemode == "11" &&
    dataIDs[0] != "" &&
    dataIDs[1] != ""
  ) || (
    dataIDs[0] != "" &&
    dataIDs[1] != "" &&
    dataIDs[2] != ""
  ) || (
    lbSearch[lbID].timelimit <= UnixTime
  ) || (
    dataIDs[0] == "" &&
    dataIDs[1] == "" &&
    dataIDs[2] == ""
  )) {
    wait = "0"
  }

  if(wait == "0"){
    lbSearch[lbID].started = true;
    lbSearch[lbID].start_time = UnixTime;
    lbSearch[lbID].dataid2     = dataIDs[0];
    lbSearch[lbID].dataid3     = dataIDs[1];
    lbSearch[lbID].dataid4     = dataIDs[2];
    lbSearch[lbID].pa2         = $(data).attr().pa1;
    lbSearch[lbID].pa3         = $(data).attr().pa2;
    lbSearch[lbID].pa4         = $(data).attr().pa3;
    lbSearch[lbID].inhibit1    = $(data).str("inhibit.data_id.0");
    lbSearch[lbID].inhibit2    = $(data).str("inhibit.data_id.1");
    lbSearch[lbID].inhibit3    = $(data).str("inhibit.data_id.2");
    lbSearch[lbID].lobby_key   = $(data).str("lobby_key");
    lbSearch[lbID].lobby_param = $(data).number("lobby_param");
  }

  var arTime = [
    lbSearch[lbID].time0,lbSearch[lbID].time1,lbSearch[lbID].time2,lbSearch[lbID].time3,
    lbSearch[lbID].time4,lbSearch[lbID].time5,lbSearch[lbID].time6,lbSearch[lbID].time7,
  ];
  for(const i in arTime) if (arTime[i] == 0){
    arTime[i] = UnixTime;
    break
  }

  lbSearch[lbID].time0   = arTime[0];
  lbSearch[lbID].time1   = arTime[1];
  lbSearch[lbID].time2   = arTime[2];
  lbSearch[lbID].time3   = arTime[3];
  lbSearch[lbID].time4   = arTime[4];
  lbSearch[lbID].time5   = arTime[5];
  lbSearch[lbID].time6   = arTime[6];
  lbSearch[lbID].time7   = arTime[7];

  const tl: number = lbSearch[lbID].timelimit < UnixTime ? 0 : lbSearch[lbID].timelimit - UnixTime;

  console.log("lobbyAccept: END");
  return send.object(K.ATTR({
    stat:"0",
    qid: lbSearch[lbID].qid.toString(),
    wait: wait,
    master: "1",
    timelimit: tl.toString(),
    seq: lbSearch[lbID].seq.toString(),
    addr: lbSearch[lbID].pa1,
    time0 : arTime[0].toString(),time1 : arTime[1].toString(),
    time2 : arTime[2].toString(),time3 : arTime[3].toString(),
    time4 : arTime[4].toString(),time5 : arTime[5].toString(),
    time6 : arTime[6].toString(),time7 : arTime[7].toString(),
  }))
};

export const lobbyPoling: EPR = async (info, data, send) => {
  /**
   * lobby.poling
   * ??? (is this after game?)
   * 
   * DATA:
   *  - cancel = ?????,
   *  - game_id = "_____", (is data_id)
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
  /*DB.Update<lobby_search>({
    collection:"lobby_search",
    game_id: $(data).attr().game_id
  }, {
    $set: {
      started:true,
      start_time: Math.floor(new Date().getTime() / 1000)
    }
  })*/

  return __sendSuccessLOG(info, data, send);
};