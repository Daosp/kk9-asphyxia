import { __sendSuccessLOG } from './handlers/__test__';
import { versSend } from './handlers/vers';
import { lobbyQuery, lobbyAccept, lobbyPoling } from './handlers/lobby';
import { pdataRead, pdataWrite, pdataConv, pdataCheck, pdataCheck_recovery, pdataCreate, pdataRanking, pdataMisc_info} from './handlers/pdata';

import { enqueteSee, enqueteNow, enqueteVote } from './handlers/enquete';
import { customizeGet, customizeCheck, customizeItem, customizePro_override, customizeShop_confirm, customizeShop_buy, customizeOshigacha_confirm, customizeOshigacha_draw } from './handlers/customize';
import { identifierInquire, identifierIssue, identifierCheck, identifierVerify } from './handlers/identifier';
import { sessionLogin, sessionLogout, sessionRefresh } from './handlers/session';
import { questionInfo, questionAnswer } from './handlers/question';
import { snsFellow_comment_send_pcb, snsFellow_comment_new, snsFellow_challenge, snsFellow_request, snsApplilink_stat, snsApplilink_use, snsSend_nanikiru } from './handlers/sns';
import { wdjOpen } from './handlers/wdj';
import { vipStart, vipStatus, vipAdd_point, vipConsume_pay, vipConsume_reserve, vipConsume_adjust, vipRight_reserve, vipRight_confirm, vipItem_get, vipGoods_get, vipGoods_use } from './handlers/vip';

import { msgPut, msgRec, msgRecbin, msgStat, msgTrade } from './handlers/msg';
import { clubShopinfo, clubSendinfo, clubRecvinfo, clubPresent_get, clubPresent_code, clubPresent_done } from './handlers/club';
import { proRanking } from './handlers/pro';
import { populationReport } from './handlers/population';
import { flagsGet } from './handlers/flags';
import { eventSchedule } from './handlers/event';
import { rankingTops, rankingIndex, rankingNeighbors, rankingPros, rankingList, rankingGet } from './handlers/ranking';
import { proenterRegist, proenterEntry, proenterResult, proenterNow, proenterQuit, proenterWins } from './handlers/proenter';
import { partyWhatsnow, partyInfo, partyPinfo, partyAdvantage } from './handlers/party';
import { djpAdd, djpStat, djpInquire, djpHistory } from './handlers/djp';
import { sdjpStat, sdjpInquire, sdjpHistory, sdjpSettings, sdjpGiven } from './handlers/sdjp';
import { paseliTreasure2_lobby, paseliTreasure2_quit, paseliTreasure2_status, paseliTreasure2_action, paseliDerby_lobby, paseliDerby_quit, paseliDerby_status, paseliDerby_action } from './handlers/paseli';
import { channelSchedule, channelStore_kf, channelLottery, channelVlink } from './handlers/channel';
import { haiRec, haiRec_movie, haiGet } from './handlers/hai';
import { twitterUser, twitterTweet } from './handlers/twitter';

import { cardmngGetdatalist, facilityGet } from './handlers/eamuse';

export function register() {
  /* Register game code */
  R.GameCode('KK9');

  /* A plugin can have multiple contributors. */
  R.Contributor('Daosp', 'https://github.com/Daosp');
  R.Contributor('Remaster', 'https://github.com/remaster1');
  R.Contributor('gluu', 'https://github.com/Gullmanx');

  /* Register plugin configuration */
  R.Config('event', {
    type: 'string',
    default: 'EVENT_1',
    options: ['EVENT_1', 'EVENT_2'],
  });

  /*
    Register user-provided datafile
    This will allow user to upload their own data to the root of your plugin
    This file, for example, will be uploaded to "plugins/example@identifier/uploaded/data.xml"
   */
  R.DataFile('uploaded/data.xml');

  /* Register your routes */
  R.Route('kk9vers.send', versSend);
  R.Route('lobby.query', lobbyQuery);
  R.Route('lobby.accept', lobbyAccept);
  R.Route('lobby.poling', lobbyPoling);
  R.Route('kk9pdata.read', pdataRead);
  R.Route('kk9pdata.write', pdataWrite);
  R.Route('kk9pdata.conv', pdataConv);
  R.Route('kk9pdata.check', pdataCheck);
  R.Route('kk9pdata.check_recovery', pdataCheck_recovery);
  R.Route('kk9pdata.create', pdataCreate);
  R.Route('kk9pdata.ranking', pdataRanking);
  R.Route('kk9pdata.misc_info', pdataMisc_info);

  R.Route('kk9enquete.see', enqueteSee);
  R.Route('kk9enquete.now', enqueteNow);
  R.Route('kk9enquete.vote', enqueteVote);
  R.Route('kk9customize.get', customizeGet);
  R.Route('kk9customize.check', customizeCheck);
  R.Route('kk9customize.item', customizeItem);
  R.Route('kk9customize.pro_override', customizePro_override);
  R.Route('kk9customize.shop_confirm', customizeShop_confirm);
  R.Route('kk9customize.shop_buy', customizeShop_buy);
  R.Route('kk9customize.oshigacha_confirm', customizeOshigacha_confirm);
  R.Route('kk9customize.oshigacha_draw', customizeOshigacha_draw);
  R.Route('kk9identifier.inquire', identifierInquire);
  R.Route('kk9identifier.issue', identifierIssue);
  R.Route('kk9identifier.check', identifierCheck);
  R.Route('kk9identifier.verify', identifierVerify);
  R.Route('kk9session.login', sessionLogin);
  R.Route('kk9session.logout', sessionLogout);
  R.Route('kk9session.refresh', sessionRefresh);
  R.Route('kk9question.info', questionInfo);
  R.Route('kk9question.answer', questionAnswer);
  R.Route('kk9sns.fellow_comment_send_pcb', snsFellow_comment_send_pcb);
  R.Route('kk9sns.fellow_comment_new', snsFellow_comment_new);
  R.Route('kk9sns.fellow_challenge', snsFellow_challenge);
  R.Route('kk9sns.fellow_request', snsFellow_request);
  R.Route('kk9sns.applilink_stat', snsApplilink_stat);
  R.Route('kk9sns.applilink_use', snsApplilink_use);
  R.Route('kk9sns.send_nanikiru', snsSend_nanikiru);
  R.Route('kk9wdj.open', wdjOpen);
  R.Route('kk9vip.start', vipStart);
  R.Route('kk9vip.status', vipStatus);
  R.Route('kk9vip.add_point', vipAdd_point);
  R.Route('kk9vip.consume_pay', vipConsume_pay);
  R.Route('kk9vip.consume_reserve', vipConsume_reserve);
  R.Route('kk9vip.consume_adjust', vipConsume_adjust);
  R.Route('kk9vip.right_reserve', vipRight_reserve);
  R.Route('kk9vip.right_confirm', vipRight_confirm);
  R.Route('kk9vip.item_get', vipItem_get);
  R.Route('kk9vip.goods_get', vipGoods_get);
  R.Route('kk9vip.goods_use', vipGoods_use);

  R.Route('kk9msg.put', msgPut);
  R.Route('kk9msg.rec', msgRec);
  R.Route('kk9msg.recbin', msgRecbin);
  R.Route('kk9msg.stat', msgStat);
  R.Route('kk9msg.trade', msgTrade);
  R.Route('kk9club.shopinfo', clubShopinfo);
  R.Route('kk9club.sendinfo', clubSendinfo);
  R.Route('kk9club.recvinfo', clubRecvinfo);
  R.Route('kk9club.present_get', clubPresent_get);
  R.Route('kk9club.present_code', clubPresent_code);
  R.Route('kk9club.present_done', clubPresent_done);
  R.Route('kk9pro.ranking', proRanking);
  R.Route('kk9population.report', populationReport);
  R.Route('kk9flags.get', flagsGet);
  R.Route('kk9event.schedule', eventSchedule);
  R.Route('kk9ranking.tops', rankingTops);
  R.Route('kk9ranking.index', rankingIndex);
  R.Route('kk9ranking.neighbors', rankingNeighbors);
  R.Route('kk9ranking.pros', rankingPros);
  R.Route('kk9ranking.list', rankingList);
  R.Route('kk9ranking.get', rankingGet);
  R.Route('kk9proenter.regist', proenterRegist);
  R.Route('kk9proenter.entry', proenterEntry);
  R.Route('kk9proenter.result', proenterResult);
  R.Route('kk9proenter.now', proenterNow);
  R.Route('kk9proenter.quit', proenterQuit);
  R.Route('kk9proenter.wins', proenterWins);
  R.Route('kk9party.whatsnow', partyWhatsnow);
  R.Route('kk9party.info', partyInfo);
  R.Route('kk9party.pinfo', partyPinfo);
  R.Route('kk9party.advantage', partyAdvantage);
  R.Route('kk9djp.add', djpAdd);
  R.Route('kk9djp.stat', djpStat);
  R.Route('kk9djp.inquire', djpInquire);
  R.Route('kk9djp.history', djpHistory);
  R.Route('kk9sdjp.stat', sdjpStat);
  R.Route('kk9sdjp.inquire', sdjpInquire);
  R.Route('kk9sdjp.history', sdjpHistory);
  R.Route('kk9sdjp.settings', sdjpSettings);
  R.Route('kk9sdjp.given', sdjpGiven);
  R.Route('kk9paseli.treasure2_lobby', paseliTreasure2_lobby);
  R.Route('kk9paseli.treasure2_quit', paseliTreasure2_quit);
  R.Route('kk9paseli.treasure2_status', paseliTreasure2_status);
  R.Route('kk9paseli.treasure2_action', paseliTreasure2_action);
  R.Route('kk9paseli.derby_lobby', paseliDerby_lobby);
  R.Route('kk9paseli.derby_quit', paseliDerby_quit);
  R.Route('kk9paseli.derby_status', paseliDerby_status);
  R.Route('kk9paseli.derby_action', paseliDerby_action);
  R.Route('kk9channel.schedule', channelSchedule);
  R.Route('kk9channel.store_kf', channelStore_kf);
  R.Route('kk9channel.lottery', channelLottery);
  R.Route('kk9channel.vlink', channelVlink);
  R.Route('kk9hai.rec', haiRec);
  R.Route('kk9hai.rec_movie', haiRec_movie);
  R.Route('kk9hai.get', haiGet);
  R.Route('kk9twitter.user', twitterUser);
  R.Route('kk9twitter.tweet', twitterTweet);

  R.Route('cardmng.getdatalist', cardmngGetdatalist);
  //R.Route('facility.get', cardmngGetdatalist);

  /*
    Register a unhandled handler that print all unhandled methods.
    You should remove it before you publish your plugin,
      unless you have specific reason not to.
   */
  R.Unhandled();

  /* Insert or clear a existing document in plugin space */
  DB.Upsert({ clicked: { $exists: true } }, { $set: { clicked: 0 } });

  /* Register a event and increment the click counter */
  R.WebUIEvent('click', async data => {
    console.log('WebUI Button Clicked');
    await DB.Update({ clicked: { $exists: true } }, { $inc: { clicked: 1 } });
  });

  R.WebUIEvent('shop-update', async data => {
    const shop = {
      area: typeof data.area === 'string' ? data.area.slice(0, 8) : '13',
      name: typeof data.name === 'string' ? data.name.slice(0, 64) : '',
      comment1: typeof data.comment1 === 'string' ? data.comment1.slice(0, 128) : '',
      comment2: typeof data.comment2 === 'string' ? data.comment2.slice(0, 128) : '',
      comment3: typeof data.comment3 === 'string' ? data.comment3.slice(0, 128) : ''
    };
    await DB.Upsert(
      { shop_settings: true },
      { $set: { shop_settings: true, shop } }
    );
  });

  /* Use --dev argument to enable console output. */
  console.log('Plugin Registered');

  /*
    You can check the version of CORE using CORE_VERSION_MAJOR and CORE_VERSION_MINOR
    Note: these value can be undefined, which means the CORE is version v1.18 and under
   */
  console.log(`Core Version: v${CORE_VERSION_MAJOR}.${CORE_VERSION_MINOR}`);
}
