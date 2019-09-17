require('dotenv').config();
const express = require('express');
const request = require('request');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { PORT, STOCKTWITS_API, CLIENT_ORIGIN} = require('./config');

app.use(morgan('common'));
app.use(cors({origin:CLIENT_ORIGIN}));
app.use('/', express.static('public'));
app.options('/:symbol', cors());
app.get('/:symbol', cors(), (req, res) => {
  let {symbol} = req.params;
  console.log(symbol);
  let url = `${STOCKTWITS_API}/${symbol}.json`;
    console.log(url);
    let response;
    request({url, json:true}, (err, response, body) => {
      if (err){
        console.log(err);
        return(`Unable to access network connection`);
      } else if (response.body.errors) {
        console.log(response.body.errors);
        return(response.body.errors[0].message);
      } else {
        console.log(body.messages)
        return response = ({error: undefined, symMess: body.messages})};
    });
    console.log(response);
    return res.send(response);
});

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

app.listen(PORT);