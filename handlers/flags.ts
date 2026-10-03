export const flagsGet: EPR = async (info, data, send) => {
  console.log('---');
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(data));
  return send.deny({ format: false, header: false });
};

