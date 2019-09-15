const request = require('request');
const {STOCKTWITS_API} = require('../config');

export default function StoTwi(symbol, callback){
  console.log(symbol);
  let url = `${STOCKTWITS_API}/${symbol}.json`;
  console.log(url);
  let messages;
  request({url, json:true}, (err, response, body) => {
    if (err){
      callback(`Unable to access network connection`);
    } else {
      console.log(response);
      console.log(body);
      callback(undefined, body.messages)};
  });
}