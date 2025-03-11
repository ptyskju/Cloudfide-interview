import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  AggregatedTradeResponseDto,
  AggregatedTradesRequestDto,
} from './dto/aggregated-trades.dto';

@Injectable()
export class BinanceApiService {
  private readonly binanceURL = 'https://api.binance.com';
  private readonly defaultLimit: number = 25;
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = axios;
    this.axios.defaults.baseURL = this.binanceURL;
  }

  public async getAggregatedTrades(
    requestDto: AggregatedTradesRequestDto,
  ): Promise<AggregatedTradeResponseDto[]> {
    if (!requestDto.limit) {
      requestDto.limit = this.defaultLimit;
    }

    const response = await this.axios.get('/api/v3/aggTrades', {
      params: requestDto,
    });

    if (!Array.isArray(response.data)) {
      throw new InternalServerErrorException('Error getting aggregated trades');
    }

    return response.data.map((singleData): AggregatedTradeResponseDto => {
      return {
        tradeId: singleData.a,
        price: singleData.p,
        quantity: singleData.q,
        firstTradeId: singleData.f,
        lastTradeId: singleData.l,
        timestamp: singleData.T,
        isBuyerMarket: singleData.m,
        isBestPriceMatch: singleData.M,
      };
    });
  }
}
