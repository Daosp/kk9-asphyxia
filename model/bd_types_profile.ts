export interface pdata_data {
  collection: "pdata_data";
  content: string;
  _id: string;
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
  regtime:string;
  lasttime:string;
  exptime:string;
  expflag:boolean;
}

export interface msgs {
  collection: "msgs";
  stamp:string;
  label:string;
  msg:string;
}