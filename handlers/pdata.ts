import { __sendSuccessLOG, formatCurrentDateTimeUTC, __logingInfoData } from './__test__';
import { pdata_data, pdata_profile } from "../model/bd_types_profile";
import { customAll as customAllBuffer, custom, custom_Medal } from "../model/bd_types_custom";
import { lobby_history } from "../model/bd_types_lobby";



export const pdataRead: EPR = async (info, data, send) => {
    console.log('pdataRead: END');
    const dataId = $(data).attr().data_id;
    if (!dataId || U.Card2NFC(dataId) == null) {return send.deny();}

    const records = await DB.Find<pdata_data>(dataId,{collection: "pdata_data"});
    if (_.isNil(records)) {
      console.warn('pdataRead: DONT HAVE RECORD');
      return send.deny();
    };

    var lengthDataNodes = records.length;
    console.log("pdataRead: Num of nodes: ".concat(lengthDataNodes.toString()));
    if (lengthDataNodes === 0) {return send.deny();};

    const timeStr = formatCurrentDateTimeUTC();

    var innerData: KITEM<'bin'>[] = [];

    for (const rec of records) {
        const buf: Buffer = Buffer.from(rec.content,"hex");
        if(rec.node_id == "14"){
          const recCustom = await DB.FindOne<custom>(dataId,{collection: 'custom',});
          const recMedals = await DB.FindOne<custom_Medal>(dataId,{collection: 'custom_Medal',});
          buf.writeUInt32BE(parseInt(recCustom.base)      ,0xBDE0);
          buf.writeUInt32BE(parseInt(recCustom.corner)    ,0xBDE4);
          buf.writeUInt32BE(parseInt(recCustom.midle)     ,0xBDE8);
          buf.writeUInt32BE(         recMedals.medal0     ,0xBDEC);
          buf.writeUInt32BE(         recMedals.medal1     ,0xBDF0);
          buf.writeUInt32BE(         recMedals.medal2     ,0xBDF4);
          buf.writeUInt32BE(         recMedals.medal3     ,0xBDF8);
          buf.writeUInt32BE(         recMedals.medal4     ,0xBDFC);
          buf.writeUInt32BE(         recMedals.medal5     ,0xBE00);
          buf.writeUInt32BE(         recMedals.medal6     ,0xBE04);
          buf.writeUInt32BE(         recMedals.medal7     ,0xBE08);
          buf.writeUInt32BE(         recMedals.medal8     ,0xBE0C);
          buf.writeUInt32BE(         recMedals.medal9     ,0xBE10);
          buf.writeUInt32BE(         recMedals.medal10    ,0xBE14);
          buf.writeUInt32BE(         recMedals.medal11    ,0xBE18);
          buf.writeUInt32BE(         recMedals.medal12    ,0xBE1C);
          buf.writeUInt32BE(         recMedals.medal13    ,0xBE20);
          buf.writeUInt32BE(         recMedals.medal14    ,0xBE24);
          buf.writeUInt32BE(         recMedals.medal15    ,0xBE28);
          buf.writeUInt32BE(         recCustom.date_p     ,0xBE2C);
          buf.writeUInt32BE(parseInt(recCustom.hai)       ,0xBE30);
          buf.writeUInt32BE(parseInt(recCustom.table)     ,0xBE34);
          buf.writeUInt32BE(         recCustom.date_t     ,0xBE38);
          buf.writeUInt32BE(parseInt(recCustom.call)      ,0xBE3C);
          buf.writeUInt32BE(parseInt(recCustom.comment)   ,0xBE40);
          buf.writeUInt32BE(         recCustom.date_i     ,0xBE44);
          buf.writeUInt32BE(parseInt(recCustom.movebg)    ,0xBE48);
          buf.writeUInt32BE(         recCustom.date_g     ,0xBE4C);
          buf.writeUInt32BE(parseInt(recCustom.customId)  ,0xBE58);
          //buf.set(customAllBuffer, 0xBE68);
        }
        const attrMap: KAttrMap = {['node_id']:rec.node_id};
        const addData: KITEM<'bin'> = K.ITEM('bin',buf,attrMap);
        innerData.push(addData);
        console.log('pdataRead: Node ID'.concat(rec.node_id).concat(" added"));
    };

    var response = K.ATTR({time:timeStr},{
      data:innerData,
    });
    console.log('pdataRead: END');
    return send.object(response);
};

export const pdataWrite: EPR = async (info, data, send) => {
  /**
   * kk9pdata.write
   * 
   * DATA:
   *  - data_id="AD8972E47E435A6B"
   *  - method="ranking"
   * <data __type="bin" __sixe="123" node_id="0">buffer</data>
   * <data __type="bin" __sixe="123" node_id="2">buffer</data>
   * ...
   */
    console.log('pdataWrite: START');
    const dataId : string = $(data).attr().data_id;
    if (!dataId) {return send.deny();}

    // Находим все дочерние теги <data>
    var lengthDataNodes = $(data).elements('data').length;
    console.log("pdataWrite: Num of nodes: ".concat(lengthDataNodes.toString()));
    if (lengthDataNodes === 0) {return send.success();}

    for(var _i = 0; _i < lengthDataNodes; _i++){
      const dataAddr = $(data).attr("data.".concat(_i.toString())).node_id;
      const dataBuffer = $(data).buffer("data.".concat(_i.toString()));
      if(dataAddr == "14"){
        const base     = dataBuffer.readUInt32BE(0xBDE0);
        const corner   = dataBuffer.readUInt32BE(0xBDE4);
        const midle    = dataBuffer.readUInt32BE(0xBDE8);
        const medal0   = dataBuffer.readUInt32BE(0xBDEC);
        const medal1   = dataBuffer.readUInt32BE(0xBDF0);
        const medal2   = dataBuffer.readUInt32BE(0xBDF4);
        const medal3   = dataBuffer.readUInt32BE(0xBDF8);
        const medal4   = dataBuffer.readUInt32BE(0xBDFC);
        const medal5   = dataBuffer.readUInt32BE(0xBE00);
        const medal6   = dataBuffer.readUInt32BE(0xBE04);
        const medal7   = dataBuffer.readUInt32BE(0xBE08);
        const medal8   = dataBuffer.readUInt32BE(0xBE0C);
        const medal9   = dataBuffer.readUInt32BE(0xBE10);
        const medal10  = dataBuffer.readUInt32BE(0xBE14);
        const medal11  = dataBuffer.readUInt32BE(0xBE18);
        const medal12  = dataBuffer.readUInt32BE(0xBE1C);
        const medal13  = dataBuffer.readUInt32BE(0xBE20);
        const medal14  = dataBuffer.readUInt32BE(0xBE24);
        const medal15  = dataBuffer.readUInt32BE(0xBE28);
        const date_p   = dataBuffer.readUInt32BE(0xBE2C);
        const hai      = dataBuffer.readUInt32BE(0xBE30);
        const table    = dataBuffer.readUInt32BE(0xBE34);
        const date_t   = dataBuffer.readUInt32BE(0xBE38);
        const call     = dataBuffer.readUInt32BE(0xBE3C);
        const comment  = dataBuffer.readUInt32BE(0xBE40);
        const date_i   = dataBuffer.readUInt32BE(0xBE44);
        const movebg   = dataBuffer.readUInt32BE(0xBE48);
        const date_g   = dataBuffer.readUInt32BE(0xBE4C);
        const customId = dataBuffer.readUInt32BE(0xBE58);
        const rC: {$set:{[key: string]: any | Object;}} = {
          $set:{
            customId  : customId.toString(),
            date_p    : date_p,
            date_t    : date_t,
            date_i    : date_i,
            date_g    : date_g
          }
        }
        if(base != 0) rC.$set.base = base.toString();
        if(corner != 0) rC.$set.corner = corner.toString();
        if(midle != 0) rC.$set.midle = midle.toString();
        if(hai != 0)  rC.$set.hai = hai.toString();
        if(table != 0) rC.$set.table = table.toString();
        if(call != 0) rC.$set.call = call.toString();
        if(comment != 0) rC.$set.comment = comment.toString();
        if(movebg != 0) rC.$set.movebg = movebg.toString();

        DB.Upsert<custom>(dataId,{collection:"custom"},rC);
        const arM = [medal0,medal1,medal2,medal3,medal4,medal5,medal6,medal7,medal8,medal9,medal10,medal11,medal12,medal13,medal14,medal15];
        const medal_nr = arM.filter(num => num > 0).length;
        DB.Upsert<custom_Medal>(dataId,{collection:"custom_Medal"},{
          $set:{
            medalNR: medal_nr,
            medal0  : medal0,
            medal1  : medal1,
            medal2  : medal2,
            medal3  : medal3,
            medal4  : medal4,
            medal5  : medal5,
            medal6  : medal6,
            medal7  : medal7,
            medal8  : medal8,
            medal9  : medal9,
            medal10 : medal10,
            medal11 : medal11,
            medal12 : medal12,
            medal13 : medal13,
            medal14 : medal14,
            medal15 : medal15
          }
        });
      }
      const dataStr = dataBuffer.toString("hex");
      DB.Upsert<pdata_data>(
          dataId,
          {
              collection: 'pdata_data',
              node_id: dataAddr,
          },
          {
            $set: {
              content: dataStr,
            }
          }
      );
      console.log("pdataWrite: Node ID".concat(dataAddr).concat(" upserted"));
    };
    console.log('pdataWrite: END');

    send.success();
};

export const pdataConv: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCheck: EPR = async (info, data, send) => {
  var dataId: string = $(data).attr().data_id;
  if (!dataId) {
    console.warn('pdataCheck: dataId is NULL');
    return send.deny();
  }
  const record = await DB.FindOne<pdata_profile>(dataId,{collection: "pdata_profile"});
  if (_.isNil(record)) return send.deny();
  var response = K.ATTR({
    disable:Number(record.disable).toString(),
    passwd:record.passwd,
    stat:record.stat,
    conv:record.conv
  });
  return send.object(response);
};

export const pdataCheck_recovery: EPR = async (info, data, send) => {

  return __sendSuccessLOG(info, data, send);
};

export const pdataCreate: EPR = async (info, data, send) => {
  __logingInfoData(info, data);
  var dataId: string = $(data).attr().data_id;
  if (!dataId) {
    console.warn('pdataCreate: dataId is NULL');
    return send.deny();
  }
  DB.Upsert<pdata_profile>(dataId,{collection: "pdata_profile"},{
    $set:{
      disable:false,
      passwd:"",
      stat:"0",
      conv:"0",
    },
  });
  const UnixTime = Math.floor(new Date().getTime() / 1000);
  DB.Insert<custom>(
      dataId,
      {
          collection: 'custom',
          customId: "1",
          base: "1000000",
          corner: "2000000",
          midle: "3000000",
          date_p: UnixTime,
          hai: "5000000",
          table: "6000000",
          date_t: UnixTime,
          call: "7000000",
          comment: "8000000",
          date_i: UnixTime,
          movebg: "9000000",
          date_g: UnixTime
      }
  );
  DB.Insert<custom_Medal>(
      dataId,
      {
          collection: 'custom_Medal',
          medalNR: 0,
          medal0:0,
          medal1:0,
          medal2:0,
          medal3:0,
          medal4:0,
          medal5:0,
          medal6:0,
          medal7:0,
          medal8:0,
          medal9:0,
          medal10:0,
          medal11:0,
          medal12:0,
          medal13:0,
          medal14:0,
          medal15:0,
      }
  );
  return send.success();
};

export const pdataRanking: EPR = async (info, data, send) => {
  /**
   * kk9pdata.ranking
   * 
   * DATA:
   *  - data_id="AD8972E47E435A6B"
   *  - method="ranking"
   */
  __logingInfoData(info, data);
  const dataId: string = $(data).attr().data_id;
  if (!dataId) {
    console.warn('pdataRanking: dataId is NULL');
    return send.deny();
  }
  console.log("refid: ".concat(dataId));
  
  const record = await DB.FindOne<pdata_profile>(dataId,{collection: "pdata_profile"});
  if (_.isNil(record)) {
    console.warn('pdataRanking: DONT HAVE RECORD');
    return send.deny();
  };

  var response = K.ATTR({"stat":record.stat});
  return send.object(response);
};

export const pdataMisc_info: EPR = async (info, data, send) => {
  const dataId : string = $(data).attr().data_id;
  if (!dataId) {return send.deny();}
  /**
   * kk9pdata.misc_info
   * 
   * DATA:
   *  - data_id="AD8972E47E435A6B"
   * 
   * RESPONSE:
   * <lobby>
   *   <fixed> - no more than 10
   *     <name __type="str">______</name>
   *     <lobby_key __type="str">______</lobby_key>
   *     <lobby_param __type="s32">______</lobby_param>
   *     <start_time __type="???">______</start_time>
   *     <end_time __type="???">______</end_time>
   *   </fixed>
   *   <fixed>
   *   ...
   * </lobby>
   * <bemani>
   *   <summer_diary_2015 __type="???">______</summer_diary_2015>
   * </bemani>
   * <kac7th>
   *   <enjoy_entry __type="???">______</enjoy_entry>
   * </kac7th>
   * <vote2017eapp>
   *   <exist __type="???">______</exist>
   *   <last_seq __type="???">______</last_seq>
   *   <e seq="???"> - no more than 5
   *     <nr __type="???">______</nr>
   *     <explain __type="???">______</explain>
   *     <kind __type="???">______</kind>
   *   </e>
   *   <e seq="???">
   *     ....
   * </vote2017eapp>
   * <kirin_protest>
   *   <str1 __type="???">______</str1>
   *   <str2 __type="???">______</str2>
   * </kirin_protest>
   * ///mleague_pro - i cant understand
   * <hgslot>
   *   <enable __type="???">______</enable>
   *   <add_play_cnt __type="???">______</add_play_cnt>
   *   <rate_tenbou_4 __type="???">______</rate_tenbou_4>
   *   <rate_tenbou_3 __type="???">______</rate_tenbou_3>
   *   <rate_score_4 __type="???">______</rate_score_4>
   *   <rate_score_3 __type="???">______</rate_score_3>
   *   <yaku2 index="???"> - no more than 9
   *     <rate_n __type="???">______</rate_n>
   *     <rate_f __type="???">______</rate_f>
   *     <star __type="???">______</star>
   *   </yaku2>
   *   <yaku2 index="???">
   *     ...
   * </hgslot>
   * <pros>
   *   <entry>
   *     <p __type="???">______</p>
   *   </entry>
   *   <win>
   *     <p __type="???">______</p>
   *   </win>
   * </pros>
   * <valid_item>
   *   <i>
   *     <type __type="???">______</type>
   *     <id __type="???">______</id>
   *     <end_type __type="???">______</end_type>
   *     <end_time __type="???">______</end_time>
   *     <f __type="???">______</f> - no more than 8
   *     ...
   *   </i>
   * </valid_item>
   */
  var response: {
    [key: string]: any | Object;
  } = {}
  const rDB_LH = await DB.Find<lobby_history>({$or:[{collection:"lobby_history",dataid1:dataId},{collection:"lobby_history",dataid2:dataId},{collection:"lobby_history",dataid3:dataId},{collection:"lobby_history",dataid4:dataId}]});
  if(rDB_LH.length > 0){
    var arrayLobby: object[] = [];
    for (const i in rDB_LH) arrayLobby.push({
      name:        K.ITEM("str",rDB_LH[i].name),
      lobby_key:   K.ITEM("str",rDB_LH[i].lobby_key),
      lobby_param: K.ITEM("s32",rDB_LH[i].lobby_param),
      start_time:  K.ITEM("u32",rDB_LH[i].start_time),
      end_time:    K.ITEM("u32",rDB_LH[i].end_time),
    });
    response.lobby.fixed = arrayLobby;
  }
  
  return __sendSuccessLOG(info, data, send);
};
