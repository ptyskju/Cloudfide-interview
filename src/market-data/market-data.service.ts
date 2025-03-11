import { Injectable } from '@nestjs/common';
import { BinanceApiService } from '../binance/binance-api.service';

@Injectable()
export class MarketDataService {
  constructor(private readonly binanceApiService: BinanceApiService) {}

  public async fetchHistoricalMarketData(input: {
    symbol: string;
    timestampStart: number;
    timestampEnd: number;
  }) {
    return await this.binanceApiService.getAggregatedTrades({
      symbol: input.symbol,
      startTime: input.timestampStart,
      endTime: input.timestampEnd,
    });
  }
}
