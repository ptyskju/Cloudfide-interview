export class SingleMarketDataAnalysis {
  public timestamp: number;
  public priceAtTheMoment: string;
  public priceChange: number;
}

export class MarketDataAnalyzerResponseDto {
  public increases: SingleMarketDataAnalysis[];
  public decreases: SingleMarketDataAnalysis[];
}
