export const partyWhatsnow: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const partyInfo: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const partyPinfo: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

export const partyAdvantage: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));

  return send.deny({ format: false, header: false });
};

