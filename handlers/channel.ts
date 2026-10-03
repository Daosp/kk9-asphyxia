export const channelSchedule: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));
  return send.deny({ format: false, header: false });
};

export const channelStore_kf: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));
  return send.deny({ format: false, header: false });
};

export const channelLottery: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));
  return send.deny({ format: false, header: false });
};

export const channelVlink: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));
  return send.deny({ format: false, header: false });
};

