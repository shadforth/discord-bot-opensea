import { MessageEmbed } from "discord.js";
import "dotenv/config";
import moment from "moment";
import DiscordClient from "./Discord.js";
import OpenSeaClient from "./OpenSea.js";

interface Config {
  openSeaContractAddress: string;
  openSeaCollectionSlug: string;
  discordToken: string;
  discordChannelId: string;
}

interface Sale {
  asset: any;
  permalink: string;
  payment_token: any;
  total_price: number;
  winner_account: any;
  seller: any;
  created_date: Date;
}

export default class Bot {
  private readonly discordClient: DiscordClient;
  private readonly openSeaClient: OpenSeaClient;
  private readonly discordToken: string;

  private readonly NUM_DECIMALS = 2;

  constructor(config: Config) {
    this.discordToken = config.discordToken;
    this.discordClient = new DiscordClient(config.discordChannelId);
    this.openSeaClient = new OpenSeaClient(config.openSeaContractAddress, config.openSeaCollectionSlug);
  }

  public async run() {
    await this.discordClient.login(this.discordToken);
    const sales: Sale[] = await this.openSeaClient.fetchSales();
    const messages = sales.map((sale) => this.buildMessage(sale));
    await this.discordClient.postMessage(messages);
  }

  private buildMessage(sale: Sale): MessageEmbed {
    const priceEth = sale.total_price / 1e18;
    const priceUsd = priceEth * sale.payment_token.usd_price;
    const priceEthFixed = priceEth.toFixed(this.NUM_DECIMALS);
    const priceUsdFixed = priceUsd.toFixed(this.NUM_DECIMALS);
    const timestampLocal = moment(moment.utc(sale.created_date)).local().toDate();
    const buyer = sale.winner_account.user?.username || this.getShortAddress(sale.winner_account.address);
    const seller = sale.seller.user?.username || this.getShortAddress(sale.seller.address);

    const messageEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${sale.asset.name} sold for ${priceEthFixed} ETH`)
      .setURL(sale.permalink)
      .setAuthor(
        "OpenSea Bot",
        "https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png",
        "https://opensea.io"
      )
      .setThumbnail(sale.asset.collection.image_url)
      .addFields(
        { name: "Buyer", value: buyer },
        { name: "Seller", value: seller },
        {
          name: "Amount",
          value: `${priceEthFixed} ETH ($${priceUsdFixed} USD)`,
          inline: true,
        }
      )
      .setImage(sale.asset.image_url)
      .setTimestamp(timestampLocal);

    return messageEmbed;
  }

  private getShortAddress(address: String): String {
    return address.substr(2, 6).toUpperCase();
  }
}
