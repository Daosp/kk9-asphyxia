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

export interface lobby_search {
  collection: "lobby_search",
  qid:string,
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
}