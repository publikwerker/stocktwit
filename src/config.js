module.exports = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT || 8000,
  STOCKTWITS_API: process.env.STOCKTWITS_API || 'https://api.stocktwits.com/api/2/streams/symbol'
}