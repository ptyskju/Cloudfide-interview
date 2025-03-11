import { Controller, Get, Query } from '@nestjs/common';

@Controller('market-data')
export class MarketDataController {
  @Get('/historical-data')
  public getHistoricalMarketData(
    @Query('symbol') symbol: string,
    @Query('timestamp-start') timestampStart: number,
    @Query('timestamp-end') timestampEnd: number,
  ) {
    console.log(symbol, timestampStart, timestampEnd);
  }
}
