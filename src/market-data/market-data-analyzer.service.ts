import { Injectable } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

type PriceChanging = {
  priceAtTheMoment: string;
  priceChange: number;
};

type PriceChangingMap = Map<number, PriceChanging>;

@Injectable()
export class MarketDataAnalyzerService {
  constructor(private readonly marketDataService: MarketDataService) {}

  public async analyzeMarketData(input: {
    symbol: string;
    timestampStart: number;
    timestampEnd: number;
  }): Promise<{
    increases: PriceChangingMap;
    decreases: PriceChangingMap;
  }> {
    const marketData =
      await this.marketDataService.fetchHistoricalMarketData(input);

    const increases = new Map<number, PriceChanging>();
    const decreases = new Map<number, PriceChanging>();
    marketData.forEach((singleMarketData, index) => {
      const previousMarketData = marketData[--index];
      if (!previousMarketData) {
        return;
      }

      const previousPrice = Number(previousMarketData.price);
      const currentPrice = Number(singleMarketData.price);

      if (previousPrice < currentPrice) {
        increases.set(singleMarketData.timestamp, {
          priceAtTheMoment: singleMarketData.price,
          priceChange: currentPrice - previousPrice,
        });
      } else if (previousPrice > currentPrice) {
        decreases.set(singleMarketData.timestamp, {
          priceAtTheMoment: singleMarketData.price,
          priceChange: currentPrice - previousPrice,
        });
      }
    });

    return {
      increases,
      decreases,
    };
  }
}
