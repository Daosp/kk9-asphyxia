export const sdjpStat: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const sdjpInquire: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const sdjpHistory: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const sdjpSettings: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const sdjpGiven: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

