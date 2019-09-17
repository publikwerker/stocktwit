module.exports = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  PORT: process.env.PORT || 8000,
  BASE_URL_API:'http://localhost:8000',
  STOCKTWITS_API: process.env.STOCKTWITS_API || 'https://api.stocktwits.com/api/2/streams/symbol'
}