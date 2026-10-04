export function __logInfoData(info: EamuseInfo, data: any, send: EamuseSend) {
  console.log('-=-==-=-');
  console.log(info.module.concat('.',info.method,' from ',info.model));
  console.log('-=DATA=-');
  console.log(JSON.stringify(data));
  var enc:KEncoding = "shift_jis";
  var opt:EamuseSendOption = {
    compress:false,
    encoding:enc,
    encrypt:false,
    kencode:false,
    rootName:"DAOSP",
    status:1
  };
  return send.success(opt);
}