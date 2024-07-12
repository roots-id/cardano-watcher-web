import statsMock from "@services/mocks/stats.json";
import kelMock from "@services/mocks/kel.json";
import identifiersMock from "@services/mocks/aids.json";
import witnessesMock from "@services/mocks/witnesses.json";

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

const TIMEOUT = 1000;
const witnessesData = [...witnessesMock];
const identifierData = [...identifiersMock];

export class WatcherService {
  async getStats(): Promise<IMetricDto> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(statsMock);
      }, TIMEOUT);
    });
  }

  async getKEL(prefix: string): Promise<IKELDto[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(kelMock);
      }, TIMEOUT);
    });
  }

  async listIdentifiers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(identifierData);
      }, TIMEOUT);
    });
  }

  async createIdentifier({ alias, watched, cardano, oobi }: IIdentifierDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const _identifier = {
          alias,
          oobi,
          watched,
          cardano,
          prefix: window.crypto.randomUUID(),
        };
        identifierData.push(_identifier);
        return resolve(_identifier);
      }, TIMEOUT);
    });
  }

  async updateIdentifier(identifier: IIdentifierDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const _index = identifierData.findIndex(
          (id) => id.prefix === identifier.prefix
        );
        if (_index > -1) {
          identifierData[_index] = {
            ...identifierData[_index],
            ...identifier,
            prefix: identifierData[_index].prefix,
          };
        }
        return resolve(identifierData);
      }, TIMEOUT);
    });
  }

  async listWitnesses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(witnessesData);
      }, TIMEOUT);
    });
  }

  async createWitness({ alias, oobi, provider, referral }: IWitnessDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const _witness = {
          alias,
          oobi,
          provider,
          referral,
          prefix: window.crypto.randomUUID(),
        };
        witnessesData.push(_witness);
        return resolve(_witness);
      }, TIMEOUT);
    });
  }

  async updateWitness(witness: IWitnessDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const _index = witnessesData.findIndex(
          (wit) => wit.prefix === witness.prefix
        );
        if (_index > -1) {
          witnessesData[_index] = {
            ...witnessesData[_index],
            ...witness,
            prefix: witnessesData[_index].prefix,
          };
        }
        return resolve(identifierData);
      }, TIMEOUT);
    });
  }
}

export const watcherService = new WatcherService();
