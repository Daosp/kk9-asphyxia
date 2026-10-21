import { __sendSuccessLOG, formatCurrentDateTimeUTC } from './__test__';
export const flagsGet: EPR = async (info, data, send) => {
  /**
   * kk9flags.get
   * Flags of cabinet and location
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="get"
   */
  const response = K.ATTR({
    expire: "0"
  },{
    data:[
      //K.ATTR({flag:"hide_name"}),//no visible changes. value?
      //K.ATTR({flag:"examin"}),
      //K.ATTR({flag:"upcancel"}),
      //K.ATTR({flag:"writeall"}),
      //K.ATTR({flag:"taxphase"}),
      //K.ATTR({flag:"rectestmode"}),
      //K.ATTR({flag:"disconnect"}),
      //K.ATTR({flag:"msgdisconnect"}),
      //K.ATTR({flag:"entry_error"}),
      //K.ATTR({flag:"proxy_pdata"}),
      //K.ATTR({flag:"nvram_check"}),
      //K.ATTR({flag:"force_autoreboot"}),
      //K.ATTR({flag:"ic_card_rw_power_off"}),//no visible changes. value?
      //K.ATTR({flag:"haifu_collect"}),//kk9hai - Haifu
      //K.ATTR({flag:"kac_event"}),//no visible changes. value?
      //K.ATTR({flag:"special_event"}),
      //K.ATTR({flag:"fightclub_pack"}),
      //K.ATTR({flag:"premium_course"}),//what is it?
      //K.ATTR({flag:"skouryu_promatch"}),//Yellow Dragon Orbs matches?
      //K.ATTR({flag:"no_taikyokudemo"}),//demo battles?
      //K.ATTR({flag:"jonghou"}),//kk9sns
      //K.ATTR({flag:"exist_card_connect"}),
      //K.ATTR({flag:"exist_paseli_machine"}),
      //K.ATTR({flag:"enable_adventure"}),
      //K.ATTR({flag:"enable_twitter"}),  //kk9twitter
      K.ATTR({flag:"enable_game_log"}),
      K.ATTR({flag:"enable_syouryu2"}),//kk9wdj (Seungryong JackPot)
      //K.ATTR({flag:"enable_kakera_camp"}),  //Event
      //K.ATTR({flag:"enable_kakera_double"}),//Event
      //K.ATTR({flag:"enable_snapshot"}),
      K.ATTR({flag:"visual_arrange"}),  //NEEDED FOR CUSTOMIZATION!!! DO NOT TURN OFF!!!
      ////K.ATTR({flag:"gamestop"}),//!-!-! THIS STOPS THE GAME !-!-! DO NOT TURN ON !-!-! THIS STOPS THE GAME !-!-! DO NOT TURN ON !-!-!
    ],
    param:{
      flag:[
        //K.ATTR({name:"hide_name"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_adventure"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"examin"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"upcancel"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"writeall"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"taxphase"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"rectestmode"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"premium_course"},{value: K.ITEM("s8",1)}),
        //K.ATTR({name:"disconnect"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"msgdisconnect"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"proxy_pdata"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"exist_card_connect"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_twitter"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_kakera_camp"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"visual_arrange"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_game_log"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"skouryu_promatch"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"no_taikyokudemo"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_syouryu2"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"jonghou"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"nvram_check"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_kakera_double"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"exist_paseli_machine"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"enable_snapshot"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"force_autoreboot"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"ic_card_rw_power_off"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"haifu_collect"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"kac_event"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"entry_error"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"special_event"},{value: K.ITEM("s8",0)}),
        //K.ATTR({name:"fightclub_pack"},{value: K.ITEM("s8",0)})
      ]
    }
  });
  return send.object(response);
};
