import { __sendSuccessLOG } from './__test__';
// Он даже не призывается...
export const wdjOpen: EPR = async (info, data, send) => {
  return __sendSuccessLOG(info, data, send);
};