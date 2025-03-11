import { Module } from '@nestjs/common';
import { MarketDataController } from './market-data.controller';
import { BinanceModule } from '../binance/binance.module';

@Module({
  controllers: [MarketDataController],
  imports: [BinanceModule],
})
export class MarketDataModule {}
