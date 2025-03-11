import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';
import { BinanceModule } from '../binance/binance.module';
import { MarketDataService } from './market-data.service';

@Module({
  controllers: [MarketDataController],
  providers: [MarketDataService],
  imports: [BinanceModule],
})
export class MarketDataModule {}
