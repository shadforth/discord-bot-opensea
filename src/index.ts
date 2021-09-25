import Bot from "./Bot.js";

const config = {
  openSeaContractAddress: process.env.OPENSEA_ASSET_CONTRACT_ADDRESS,
  openSeaCollectionSlug: process.env.OPENSEA_COLLECTION_SLUG,
  discordToken: process.env.DISCORD_BOT_TOKEN,
  discordChannelId: process.env.DISCORD_CHANNEL_ID,
};

const bot = new Bot(config);

await bot.run();

process.exit(0);
