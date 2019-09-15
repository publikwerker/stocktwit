const request = require('request');
const {STOCKTWITS_API} = require('../config');

export default function StoTwi(symbol){
  console.log(symbol);
  let url = `${STOCKTWITS_API}/${symbol}`;
  console.log(url);
  request({url, json:true}, (err, response, body) => {
    if (err){
      return (`Unable to access network connection`);
    } else return (undefined, response);
  })
}