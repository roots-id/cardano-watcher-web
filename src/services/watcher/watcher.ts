import { createClient } from "signify-polaris-web";

const signifyClient = createClient();
export interface IMetricDto {
  aids: number;
  cardanoAids: number;
  keyEventsMean: number;
  keyEventsTotal: number;
  witnesses: number;
  witnessesAvailability: number;
}

export interface IKELDto {
  prefix: string;
  sn: number;
  kel: string;
  timestamp: string;
}

export interface IIdentifierDto {
  prefix: string;
  alias: string;
  cardano: boolean;
  watched: boolean;
  oobi: string;
}

export interface IWitnessDto {
  prefix: string;
  alias: string;
  provider: string;
  referral: string;
  oobi: string;
}

const MAIN_URL = "https://cardano-watcher-api.rootsid.cloud";

export class WatcherService {
  async getStats(): Promise<IMetricDto> {
    const resp = await fetch(MAIN_URL + "/stats");
    const parsed = await resp.json();
    if (resp.ok !== true) {
      throw new Error(parsed.detail);
    }
    return parsed;
  }

  async getKEL(prefix: string): Promise<IKELDto[]> {
    const resp = await fetch(MAIN_URL + "/aids/" + prefix);
    const parsed = await resp.json();
    if (resp.ok !== true) {
      throw new Error(parsed.detail);
    }
    return parsed;
  }

  async listIdentifiers() {
    const resp = await fetch(MAIN_URL + "/aids");
    const parsed = await resp.json();
    if (resp.ok !== true) {
      throw new Error(parsed.detail);
    }
    return parsed;
  }

  async createIdentifier({ alias, watched, cardano, oobi }: IIdentifierDto) {
    const prefix = oobi.split("/")[4]; // anything/anything/"oobi"/<prefix>/anything
    const _identifier = {
      alias: alias,
      prefix: prefix,
      oobi: oobi,
      watched: watched,
      cardano: cardano,
    };

    const body = JSON.stringify(_identifier);
    const url = MAIN_URL + "/aids";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const signedReq = await signifyClient.signRequest({ url, method });
    const resp = await fetch(url, {
      method,
      headers: { ...headers, ...signedReq.headers },
      body,
    });
    console.log(resp.status);
    return _identifier;
  }

  async updateIdentifier(identifier: IIdentifierDto) {
    const body = JSON.stringify(identifier);
    const url = MAIN_URL + `/aids/${identifier.prefix}`;
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const signedReq = await signifyClient.signRequest({ url, method });
    const resp = await fetch(url, {
      method,
      headers: { ...headers, ...signedReq.headers },
      body,
    });
    console.log(resp.status);
    return identifier;
  }

  async deleteIdentifier(prefix: string) {
    const url = MAIN_URL + "/aids/" + prefix;
    const method = "DELETE";
    const signedReq = await signifyClient.signRequest({ url, method });
    const resp = await fetch(url, {
      method,
      headers: { ...signedReq.headers },
    });
    console.log(resp.status);
    return;
  }

  async listWitnesses() {
    const resp = await fetch(MAIN_URL + "/witnesses");
    const parsed = await resp.json();
    if (resp.ok !== true) {
      throw new Error(parsed.detail);
    }
    return parsed;
  }

  async createWitness({ alias, oobi, provider, referral }: IWitnessDto) {
    const prefix = oobi.split("/")[4];
    const _witness = {
      alias: alias,
      prefix: prefix,
      oobi: oobi,
      provider: provider,
      referral: referral,
    };

    const body = JSON.stringify(_witness);
    const url = MAIN_URL + "/witnesses";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const signedReq = await signifyClient.signRequest({ url, method });
    const resp = await fetch(url, {
      method,
      headers: { ...headers, ...signedReq.headers },
      body: body,
    });
    console.log(resp.status);
    return _witness;
  }

  async updateWitness(witness: IWitnessDto) {
    const body = JSON.stringify(witness);
    const url = MAIN_URL + "/witnesses";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };
    const signedReq = await signifyClient.signRequest({ url, method });
    const resp = await fetch(url, {
      method,
      headers: { ...headers, ...signedReq.headers },
      body: body,
    });
    console.log(resp.status);
    return witness;
  }

  async deleteWitness(prefix: string) {
    const url = MAIN_URL + "/witnesses/" + prefix;
    const method = "DELETE";
    const signedReq = await signifyClient.signRequest({ url, method });
    const resp = await fetch(url, {
      method,
      headers: { ...signedReq.headers },
    });
    console.log(resp.status);
    return;
  }
}

export const watcherService = new WatcherService();
