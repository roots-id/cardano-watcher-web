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
        return resolve(identifiersMock);
      }, 4000);
    });
  }

  async listWitnesses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(witnessesMock);
      }, 4000);
    });
  }
}

export const watcherService = new WatcherService();
