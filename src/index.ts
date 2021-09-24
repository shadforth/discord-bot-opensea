import Bot from "./Bot.js";

const config = {
  openSeaAddress: process.env.OPENSEA_COLLECTION_SLUG,
  openSeaCollection: process.env.OPENSEA_ASSET_CONTRACT_ADDRESS,
  discordToken: process.env.DISCORD_BOT_TOKEN,
  discordChannel: process.env.DISCORD_CHANNEL_ID,
};

const bot = new Bot(config);

await bot.run();

process.exit(0);
