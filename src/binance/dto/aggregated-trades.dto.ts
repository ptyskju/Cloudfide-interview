export class AggregatedTradesRequestDto {
  public symbol: string;
  public startTime?: number;
  public endTime?: number;
  public limit?: number;
}

export class AggregatedTradeResponseDto {
  public tradeId: number;

  public price: string;

  public quantity: string;

  public firstTradeId: number;

  public lastTradeId: number;

  public timestamp: number;

  public isBuyerMarket: boolean;

  public isBestPriceMatch: boolean;
}
