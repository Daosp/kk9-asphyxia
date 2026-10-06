export interface pdata_data {
  collection: "pdata_data";
  node_id: number;

  content: string;
}

export interface pdata_profile {
  collection: "pdata_profile";
  disable:boolean;
  passwd:string;
  stat:string;
  conv:string;
}

export interface cardmng {
  collection: "cardmng";
  "mcode":string;
  "regtime":string;
  "lasttime":string;
  "exptime":string;
  "expflag":boolean;
}

export interface msgs {
  collection: "msgs";
  "stamp":string;
  "label":string;
  "msg":string;
}