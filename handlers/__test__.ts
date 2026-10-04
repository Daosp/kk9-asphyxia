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
    status:1
  };
  return send.success(opt);
}


export function formatCurrentDateTimeUTC(): string {
  const d = new Date();
  const YYYY = d.getUTCFullYear();
  const MM = String(d.getUTCMonth() + 1).padStart(2, '0');
  const DD = String(d.getUTCDate()).padStart(2, '0');
  const HH = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const SS = String(d.getUTCSeconds()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${SS}+0`;
}