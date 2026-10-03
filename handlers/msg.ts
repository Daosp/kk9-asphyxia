export const msgPut: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const msgRec: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const msgRecbin: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const msgStat: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const msgTrade: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

