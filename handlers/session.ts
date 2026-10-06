import { __sendSuccessLOG } from './__test__';
export const sessionLogin: EPR = async (info, data, send) => {
  var response = K.ATTR({
    login_ok:"1",
    expire_sec:"86400",
    terminate_sec:"604800"
  });
  return send.object(response);
  //return __sendSuccessLOG(info, data, send);
};

export const sessionLogout: EPR = async (info, data, send) => {
  var response = K.ATTR({
    login_ok:"1",
    expire_sec:"86400"
  });
  return send.object(response);
  //return __sendSuccessLOG(info, data, send);
};

export const sessionRefresh: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};