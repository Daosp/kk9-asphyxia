import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
export const partyWhatsnow: EPR = async (info, data, send) => {
  /**
   * kk9party.whatsnow
   * "What's now?" - Что сейчас есть?
   * 
   * DATA:
   *  - max=8
   *  - method="whatsnow"
   */
  return __sendSuccessLOG(info, data, send);
  var response = K.ATTR({
    parties:"",
    expire:formatCurrentDateTimeUTC(60*60)
  })
  return send.object(response);
};

export const partyInfo: EPR = async (info, data, send) => {
  /**
   * kk9party.info
   * "What's now?" - Что сейчас есть?
   * 
   * DATA:
   *  - party_id="001"
   *  - loc_id="ea"
   */
  return __sendSuccessLOG(info, data, send);
  var response = K.ATTR({
    expire:formatCurrentDateTimeUTC(60*60)
  },{
    party:K.ATTR({
      party_id:"1001",
      idx:"1001"
    },{
      data:K.ATTR({
        title_id:"KK9",
        grade:"0",
        nth:"0",
        pre_form:"0",
        main_form:"0",
        pro_enter:"0",
        pre_avail_modes:"0",
        main_avail_modes:"0",
        party_table_types:"0",
        pre_nscores:"0",
        main_nscores:"0",
        pre_nwinners:"0",
        main_nwinners:"0",
        pre_per_entry:"0",
        main_per_entry:"0",
        pre_winners_rate:"0",
        main_winners_rate:"0",
        winners_mapping_type:"0",
        winners_mapping:"0,0,0,0,0,0,0,0",
        winners_mapping_rate:"0,0,0,0,0,0,0,0",
        bonus_korb:"0,0,0,0,0,0,0,0",
        bonus_orb:"0,0,0,0,0,0,0,0",
        bonus_level:"0,0,0,0,0,0,0,0",
        bonus_point:"0,0,0,0,0,0,0,0",
        bonus_club:"0,0,0,0,0,0,0,0",
        times:"0,0,0,0,0,0,0,0,0,0,0,0,0",
        times_d:"0,0,0,0,0,0,0,0,0,0,0,0,0",
        req_party_id:"0,0,0",
        req_todohuken:"0",
        req_league_ton:"0",
        req_league_han:"0",
        req_league_tur:"0",
        req_league_better:"0",
        req_group:"0",
        req_level:"0",
        req_prolev:"0",
        req_right:"0",
        req_marea_lo:"0",
        req_marea_hi:"0",
        pre_sum_form:"0",
        main_sum_form:"0",
        pre_point_type:"0",
        main_point_type:"0",
        pre_timeband:"0,0",
        main_timeband:"0,0",
        on_cmtr:"0",
        on_www:"0",
        etc_name:"0",
        etc_trophy_id:"0",
        kinen_use:"0",
        kinen_name:"0",
        kinen_orb_id:"0",
        kinen_pic_id:"0",
        kinen_stamp:"0",
        kinen_type:"0",
        kinen_num:"0",
        pre_timeband_d:"0,0",
        main_timeband_d:"0,0",
        rookie_month_begin:"0",
        rookie_month_end:"0",
        bonus_provote:"0,0,0,0,0,0,0,0"
      }),
      g1:K.ATTR({
        rating:"0",
        winners_mapping:"0,0,0,0,0,0,0,0",
        winners_mapping_rate:"0,0,0,0,0,0,0,0",
        bonus_korb:"0,0,0,0,0,0,0,0",
        bonus_orb:"0,0,0,0,0,0,0,0",
        bonus_level:"0,0,0,0,0,0,0,0",
        bonus_point:"0,0,0,0,0,0,0,0",
        bonus_club:"0,0,0,0,0,0,0,0",
        bonus_provote:"0,0,0,0,0,0,0,0",
        pre_nwinners:"0",
        main_nwinners:"0"
      }),
      segment_winners:{
          data:K.ATTR({
          segment:"0",
          num:"0",
          winners_mapping:"0,0,0,0,0,0,0,0",
          winners_mapping_rate:"0,0,0,0,0,0,0,0",
          bonus_korb:"0,0,0,0,0,0,0,0",
          bonus_orb:"0,0,0,0,0,0,0,0",
          bonus_level:"0,0,0,0,0,0,0,0",
          bonus_point:"0,0,0,0,0,0,0,0",
          bonus_club:"0,0,0,0,0,0,0,0",
          pre_nwinners:"0",
          main_nwinners:"0"
        })
      }
    })
  })

  return send.object(response);
};

export const partyPinfo: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const partyAdvantage: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

