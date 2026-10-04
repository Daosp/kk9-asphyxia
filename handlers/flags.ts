import { __logInfoData } from './__test__';
export const flagsGet: EPR = async (info, data, send) => {
  /**
   * kk9flags.get
   * запрос "флагов"?
   * 
   * DATA:
   *  - loc_id="ea"
   *  - method="get"
   */
  console.log('-=-==-=-');
  var xmlString: String = U.toXML(data);
  console.log(xmlString);
  console.log('-=-==-=-');

  IO.WriteFile("D:/KK9/contents/data.xml",xmlString);

  return __logInfoData(info, data, send);
};

