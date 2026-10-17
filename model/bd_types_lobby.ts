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
) {
  const GM = lobby0.gamemode === gamemode;
  const GP = lobby0.gameparam === gameparam;
  const LK = lobby0.lobby_key === lobby_key;
  const LP = lobby0.lobby_param === lobby_param;
  const Inh1 = lobby0.inhibit1 !== dataid;
  const Inh2 = lobby0.inhibit2 !== dataid;
  const Inh3 = lobby0.inhibit3 !== dataid;
  const TT = lobby0.ttype !== ttype;
  return GM && GP && LK && LP && Inh1 && Inh2 && Inh3 && TT
}