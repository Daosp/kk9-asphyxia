export interface lobby_history {
  collection: "lobby_history";
  dataid1:string;
  dataid2:string;
  dataid3:string;
  dataid4:string;
  name:string;
  lobby_key:string;
  lobby_param:number;
  start_time:number;
  end_time:number;
}

export type lobby = {
  qid:number,
  timelimit: number,
  dataid1:string,
  dataid2:string,
  dataid3:string,
  dataid4:string,
  game_id : string,
  game_id_type : string,
  gamemode : string,
  gameparam : string,
  pa1 : string,
  pa2 : string,
  pa3 : string,
  pa4 : string,
  party_id : string,
  lobby_key : string,
  lobby_param : number,
  inhibit1 : string,
  inhibit2 : string,
  inhibit3 : string,
  started : boolean,
  start_time:number,
  end_time:number,
  ttype : number,
  seq:number,
  time0 : number,
  time1 : number,
  time2 : number,
  time3 : number,
  time4 : number,
  time5 : number,
  time6 : number,
  time7 : number,
}

export function isLobbySame(
  lobby0: lobby,
  gamemode: string,
  gameparam: string,
  lobby_key: string,
  lobby_param: number,
  dataid: string,
  ttype: number,
): boolean {
  //console.log("isLobbySame: START");
  //console.log("lobby: "+JSON.stringify(lobby0));
  //console.log("gamemode: "+gamemode);
  //console.log("gameparam: "+gameparam);
  //console.log("lobby_key: "+lobby_key);
  //console.log("lobby_param: "+lobby_param);
  //console.log("dataid: "+dataid);
  //console.log("ttype: "+ttype);
  const GM = lobby0.gamemode === gamemode;
  const GP = lobby0.gameparam === gameparam;
  const LK = lobby0.lobby_key === lobby_key;
  const LP = lobby0.lobby_param === lobby_param;
  const Inh1 = lobby0.inhibit1 !== dataid;
  const Inh2 = lobby0.inhibit2 !== dataid;
  const Inh3 = lobby0.inhibit3 !== dataid;
  const TT = lobby0.ttype !== ttype;
  const ST = !lobby0.started;

  //console.log("GM: "+GM);
  //console.log("GP: "+GP);
  //console.log("LK: "+LK);
  //console.log("LP: "+LP);
  //console.log("Inh1: "+Inh1);
  //console.log("Inh2: "+Inh2);
  //console.log("Inh3: "+Inh3);
  //console.log("TT: "+TT);
  //console.log("ST: "+ST);

  const bool = GM && GP && LK && LP && Inh1 && Inh2 && Inh3 && ST;
  //console.log("bool: "+bool);
  //console.log("isLobbySame: END");
  return bool;
}