# Hello!

How to run that app:

1. install all dependencies  
   `npm ci`
2. run app  
   `npm run start:dev`

Example EPs to call:
* Fetch historical market data:
   ```
   http://localhost:3000/market-data/historical-data?symbol=BNBBTC&timestamp-start=1741659311300&timestamp-end=1741690843700
   ```
* Analyze data based on market data
    ```
    http://localhost:3000/market-data/analyze-data?symbol=BNBBTC&timestamp-start=1741659311300&timestamp-end=1741690843700
    ```
  
Run tests using
```shell
npm run test
```

## Possible updates

* add consts to envs, like binance api url
* handle api errors from binance
* validate data retrieved from binance