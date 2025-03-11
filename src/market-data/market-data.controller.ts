import { Controller, Get, Query } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { TimestampValidator } from './validator/timestamp.validator';
import { MarketDataAnalyzerService } from './market-data-analyzer.service';
import { MarketDataAnalyzerResponseDto } from './dto/market-data-analyzer-response.dto';

@Controller('market-data')
export class MarketDataController {
  constructor(
    private readonly marketDataService: MarketDataService,
    private readonly marketDataAnalyzer: MarketDataAnalyzerService,
  ) {}
  @Get('/historical-data')
  public getHistoricalMarketData(
    @Query('symbol') symbol: string,
    @Query('timestamp-start', TimestampValidator) timestampStart: number,
    @Query('timestamp-end', TimestampValidator) timestampEnd: number,
  ) {
    return this.marketDataService.fetchHistoricalMarketData({
      symbol,
      timestampStart,
      timestampEnd,
    });
  }
  @Get('/analyze-data')
  public async analyzeMarketData(
    @Query('symbol') symbol: string,
    @Query('timestamp-start', TimestampValidator) timestampStart: number,
    @Query('timestamp-end', TimestampValidator) timestampEnd: number,
  ): Promise<MarketDataAnalyzerResponseDto> {
    return this.marketDataAnalyzer.analyzeMarketData({
      symbol,
      timestampStart,
      timestampEnd,
    });
  }
}
