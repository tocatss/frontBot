// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        const helpMsg = `
intro: view our team introduction.\n
bot: See what's coming in ME and how to create ME.`;
        const botMsg = `
In the feature, I will record the links shared by each member and randomly select a teacher.\n
But I have no plans to be MORE smart recently...\n
You can view this site to know ME and contribute to ME.\n
https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0
https://github.com/tocatss/frontBot
`;
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            // Read UserState. If the 'DidBotWelcomedUser' does not exist (first time ever for a user)
            // set the default to false.
            const userName = context.activity.from.name;
            const text = context.activity.text.toLowerCase();
            switch (text) {
            case 'intro':
                await context.sendActivity(this.generateWelcomeMsg(userName));
                break;
            case 'help':
                await context.sendActivity(helpMsg);
                break;
            case 'bot':
                await context.sendActivity(botMsg);
                break;
            default:
                await context.sendActivity(`This is a simple Bot sample and have no plans to be more SMART recently...
                    Please input 'help' for details.`);
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(this.generateWelcomeMsg(context.activity.recipient.name));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.generateWelcomeMsg = function(name) {
            return `Hello ${ name } 😊
    
欢迎加入我们，在Frontend的世界里知识又多又细，流行的技术日新月异，
OurTeam就是把你知道的，ta知道的都变成我们知道的。

所以请您自觉坚持下面几个Rule：
1. 分享您在工作中新了解到的前端知识（只要您觉得有意义就可以分享），并添加#官方文档# 最好是英文。CSS需要截图。例如：
        
    关于JavaScript 中的相等性判断，原来 === 和 == 不一样啊～
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

2. 根据一定时间内大家分享的链接数（每月），随机找一位朋友与大家汇总分享～
3. 分享会的时间未定～

Hope you can contribute to our team and enjoy your time welcome you again ❤️`;
        };
    }
}

module.exports.EchoBot = EchoBot;
