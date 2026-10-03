export function __logInfoData(info, data, send) {
  console.log('-=-==-=-');
  console.log(info.module.concat('.',info.method,' from ',info.model));
  console.log('-=DATA=-');
  console.log(JSON.stringify(data));
  return send.success(200);
}