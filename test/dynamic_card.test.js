const assert = require('assert');
const bili_client = require("../lib/net/bili");
const searcher = require("../lib/core/searcher");
const util = require('./util');

(async () => {
    assert(await bili_client.getMyinfo());

    await util.par_run([0, 1, 2, 3], [
        // 0
        async () => {
            let info = await bili_client.getOneDynamicByDyid("728424890210713624");
            assert(searcher.parseDynamicCard(info).is_charge_lottery);
        },
        // 1
        async () => {
            let info = await bili_client.getOneDynamicByDyid("728455586333589522");
            assert(searcher.parseDynamicCard(info).origin_is_charge_lottery);
        },
        // 2
        async () => {
            let card = searcher.parseDynamicCard(await bili_client.getOneDynamicByDyid("746824225190314008"));
            let chats = await bili_client.getChat(card.rid_str, card.chat_type)
            assert(chats.length > 0 && typeof chats[0] == "string")
        },
        // 3
        async () => {
            let card = searcher.parseDynamicCard(await bili_client.getOneDynamicByDyid("747169355882561625"));
            assert(card.chat_type == 11)
            card = searcher.parseDynamicCard(await bili_client.getOneDynamicByDyid("747441158580338693"));
            assert(card.chat_type == 17)
            assert(card.origin_chat_type == 11)
        },
    ])




    console.log("dynamic_card.test ... ok!");
})()