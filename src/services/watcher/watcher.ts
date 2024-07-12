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

const witnessesData = [...witnessesMock];
const identifierData = [...identifiersMock];

export class WatcherService {
  async getStats(): Promise<IMetricDto> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(statsMock);
      }, 4000);
    });
  }

  async getKEL(prefix: string): Promise<IKELDto[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(kelMock);
      }, 4000);
    });
  }

  async listIdentifiers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(identifierData);
      }, 4000);
    });
  }

  async createIdentifier() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(identifierData);
      }, 4000);
    });
  }

  async listWitnesses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(witnessesData);
      }, 4000);
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
      }, 4000);
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
      }, 4000);
    });
  }
}

export const watcherService = new WatcherService();
