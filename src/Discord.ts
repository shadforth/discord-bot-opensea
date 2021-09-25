import { Client, Intents, MessageEmbed, TextChannel } from "discord.js";

export default class DiscordClient {
  private readonly client: Client;
  private readonly channelId: string;
  private channel: TextChannel;

  constructor(channelId: string) {
    this.channelId = channelId;

    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
  }

  public async postMessage(messages: MessageEmbed[]) {
    if (messages.length > 0) {
      await this.channel.send({ embeds: [...messages] });
    }
  }

  public async login(token: string) {
    await this.client.login(token);
    this.channel = (await this.client.channels.fetch(this.channelId)) as TextChannel;
  }
}
