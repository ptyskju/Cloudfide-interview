import { Expose } from 'class-transformer';

export class AggregatedTradesRequestDto {
  public symbol: string;
  public startTime?: number;
  public endTime?: number;
  public limit?: number;
}

export class AggregatedTradeResponseDto {
  @Expose({ name: 'a' })
  public tradeId: number;

  @Expose({ name: 'p' })
  public price: string;

  @Expose({ name: 'q' })
  public quantity: string;

  @Expose({ name: 'f' })
  public firstTradeId: number;

  @Expose({ name: 'l' })
  public lastTradeId: number;

  @Expose({ name: 'T' })
  public timestamp: number;

  @Expose({ name: 'm' })
  public isBuyerMarket: boolean;

  @Expose({ name: 'M' })
  public isBestPriceMatch: boolean;
}
