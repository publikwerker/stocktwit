const request = require('request');
const cors = require('cors');
const {STOCKTWITS_API} = require('../config');

export default function StoTwi(symbol, callback){
  let url = `${STOCKTWITS_API}/${symbol}.json`;
  request({url, json:true}, (err, response, body) => {
    if (err){
      console.log(err);
      callback(`Unable to access network connection`);
    } else if (response.body.errors) {
      callback(response.body.errors[0].message);
    } else {
      callback(undefined, body.messages)};
  });
}