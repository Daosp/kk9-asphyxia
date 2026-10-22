export interface shop {
  collection: "shop";
  exist: boolean;
  area: string;
  loc_id: string;
  comment1: string;
  comment2: string;
  comment3: string;
  name: string
}

export interface djp {
  collection: "djp";
  loc_id: string;
  uid: number;
  total: number;
  djchance: number;
  type: string;
  name: string
}

export interface djp_uid {
  collection: "djp_uid";
  last_uid: number
}

export interface djp_hist {
  collection: "djp_hist";
  uid: number;
  djp:number;
  timestamp:number;
  dataid:string;
}