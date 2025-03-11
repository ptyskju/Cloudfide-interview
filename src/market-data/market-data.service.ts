import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketDataService {
  public async fetchHistoricalMarketData(input: {
    symbol: string;
    timestampStart: number;
    timestampEnd: number;
  }) {
    console.log(input);
  }
}
