import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';
import { BinanceModule } from '../binance/binance.module';
import { MarketDataService } from './market-data.service';
import { MarketDataAnalyzerService } from './market-data-analyzer.service';

@Module({
  controllers: [MarketDataController],
  providers: [MarketDataService, MarketDataAnalyzerService],
  imports: [BinanceModule],
})
export class MarketDataModule {}
