import { Controller, Get, Query } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}
  @Get('/historical-data')
  public getHistoricalMarketData(
    @Query('symbol') symbol: string,
    @Query('timestamp-start') timestampStart: number,
    @Query('timestamp-end') timestampEnd: number,
  ) {
    return this.marketDataService.fetchHistoricalMarketData({
      symbol,
      timestampStart,
      timestampEnd,
    });
  }
}
