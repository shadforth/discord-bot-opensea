# discord-bot-opensea

A Discord bot that retrieves the latest sales for an NFT collection on OpenSea.io.

## Getting started

```bash
git clone git@github.com:shadforth/discord-bot-opensea.git
cd discord-bot-opensea
npm install
```

## Running the bot locally

Make a copy of `.env.example` and name it `.env`. Update the file with your variables, e.g.

```bash
DISCORD_BOT_TOKEN=your.token.here
DISCORD_CHANNEL_ID=1234567890
OPENSEA_ASSET_CONTRACT_ADDRESS=0xabcdefg12345678
OPENSEA_COLLECTION_SLUG=cryptopunks
```

Start the bot locally.

```bash
./scripts/run
```

## Usage

The bot is set up to send messages to Discord on an hourly schedule with GitHub Actions.
