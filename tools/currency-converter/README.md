# Currency Converter Tool

Real-time currency exchange rate converter for USD, SGD (Singapore Dollar), and CNY (Chinese Yuan).

## Features

- **Real-time Rates** - Fetches current exchange rates from API
- **Multiple Currencies** - USD, SGD, CNY conversions
- **Instant Conversion** - Auto-calculates as you type
- **Rate Display** - Shows current exchange rates
- **Fallback Rates** - Uses cached rates if API fails

## Supported Currencies

- **USD** - US Dollar
- **SGD** - Singapore Dollar
- **CNY** - Chinese Yuan

## How to Use

1. **Select Base Currency** - Choose the currency you're converting from
2. **Enter Amount** - Type the amount to convert
3. **View Results** - All three currencies are calculated automatically
4. **Refresh Rates** - Click "Refresh Rates" to get latest data

## Data Source

Uses [ExchangeRate-API](https://exchangerate-api.com) for real-time rates (free tier).

## Features

- Auto-refresh on load
- Last update timestamp
- Error handling with fallback rates
- Properly formatted currency display
- Works offline with cached rates

## Tips

- Rates are updated when you click "Refresh Rates"
- The tool caches rates if the API is unavailable
- Enter decimal amounts for precise conversions
