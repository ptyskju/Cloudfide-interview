import { MarketDataAnalyzerService } from './market-data-analyzer.service';
import { MarketDataService } from './market-data.service';
import { Test } from '@nestjs/testing';
import { AggregatedTradeResponseDto } from '../binance/dto/aggregated-trades.dto';
import { SingleMarketDataAnalysis } from './dto/market-data-analyzer-response.dto';

jest.mock('./market-data.service');

describe(MarketDataAnalyzerService.name, () => {
  let marketDataService: jest.Mocked<MarketDataService>;
  let marketDataAnalyzerService: MarketDataAnalyzerService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MarketDataService, MarketDataAnalyzerService],
    }).compile();

    marketDataService = moduleRef.get(MarketDataService);
    marketDataAnalyzerService = moduleRef.get(MarketDataAnalyzerService);
  });

  const testCases: {
    testName: string;
    fetchedMarketData: Pick<
      AggregatedTradeResponseDto,
      'price' | 'timestamp'
    >[];
    result: {
      increases: SingleMarketDataAnalysis[];
      decreases: SingleMarketDataAnalysis[];
    };
  }[] = [
    {
      testName: 'return empty results when no market data was fetched',
      fetchedMarketData: [],
      result: {
        increases: [],
        decreases: [],
      },
    },
    {
      testName:
        'return empty results when there is only one marked data fetched',
      fetchedMarketData: [
        {
          timestamp: 1741695642,
          price: '120',
        },
      ],
      result: {
        increases: [],
        decreases: [],
      },
    },
    {
      testName:
        'return single increase result, when fetched data shows increase',
      fetchedMarketData: [
        {
          timestamp: 1741695642,
          price: '120',
        },
        {
          timestamp: 1741690850900,
          price: '130',
        },
      ],
      result: {
        increases: [
          {
            timestamp: 1741690850900,
            priceAtTheMoment: '130',
            priceChange: 10,
          },
        ],
        decreases: [],
      },
    },
    {
      testName:
        'return single increase result and single decrease result, when fetched data shows increase and decrease',
      fetchedMarketData: [
        {
          timestamp: 1741695642,
          price: '120',
        },
        {
          timestamp: 1741690850900,
          price: '130',
        },
        {
          timestamp: 1741690890500,
          price: '100',
        },
      ],
      result: {
        increases: [
          {
            timestamp: 1741690850900,
            priceAtTheMoment: '130',
            priceChange: 10,
          },
        ],
        decreases: [
          {
            timestamp: 1741690890500,
            priceAtTheMoment: '100',
            priceChange: -30,
          },
        ],
      },
    },
  ];

  testCases.forEach((singleTestCase) => {
    it(singleTestCase.testName, async () => {
      marketDataService.fetchHistoricalMarketData.mockResolvedValue(
        singleTestCase.fetchedMarketData as AggregatedTradeResponseDto[],
      );

      const result = await marketDataAnalyzerService.analyzeMarketData({
        symbol: 'bitcoin',
        timestampStart: 1741690843700,
        timestampEnd: 1741659311300,
      });

      expect(result).toEqual(singleTestCase.result);
    });
  });
});
