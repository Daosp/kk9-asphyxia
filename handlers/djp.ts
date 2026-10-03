export const djpAdd: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const djpStat: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const djpInquire: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const djpHistory: EPR = async (info, data, send) => {
  console.log('channelSchedule');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

