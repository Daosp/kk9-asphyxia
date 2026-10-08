export interface vip {
  collection: "vip";
  enable:boolean;
  point:number;
  point_total:number;
  vip_rank:number;
}

export interface vip_menuItems {
  collection: "vip_menuItems";
  name:string;
  box:string;
  type:string;
  expire_stamp:string;
  point:number;
  need_rank:number;
}

export interface vip_menuGoods {
  collection: "vip_menuGoods";
  name:string;
  point:number;
  need_rank:number;
}


export interface vip_items {
  collection: "vip_items";
  data_id:string;
  name:string;
  box:string;
  type:string;
  param:string;
  expire_stamp:string;
  stamp:string;
  expire:string;
}

export interface vip_goods {
  collection: "vip_goods";
  name:string;
  nr:number;
  stamp:string;
}