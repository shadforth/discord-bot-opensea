import fetch from "node-fetch";

interface OpenSeaResponse {
  asset_events?: any;
}

export default class OpenSeaClient {
  private readonly collectionSlug: string;
  private readonly assetContractAddress: string;

  constructor(collectionSlug: string, assetContractAddress: string) {
    this.collectionSlug = collectionSlug;
    this.assetContractAddress = assetContractAddress;
  }

  public async fetchSales() {
    const openSeaApiBaseUrl: string = "https://api.opensea.io/api/v1";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        //"X-API-KEY": process.env.OPENSEA_API_KEY,
      },
    };
    const lastHour: number = Math.round(new Date().getTime() / 1000) - 3_600;
    const urlSearchParams = new URLSearchParams({
      offset: "0",
      event_type: "successful",
      only_opensea: "true",
      occurred_after: lastHour.toString(),
      collection_slug: this.collectionSlug,
      asset_contract_address: this.assetContractAddress,
    });
    const url: string = `${openSeaApiBaseUrl}/events?${urlSearchParams}`;
    const response = await fetch(url, options);
    const json: OpenSeaResponse = await response.json();
    return json?.asset_events?.reverse() ?? [];
  }
}
