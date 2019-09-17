require('dotenv').config();
const path =require('path');
const express = require('express');
const request = require('request');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { PORT, STOCKTWITS_API, CLIENT_ORIGIN} = require('./config');

app.use(morgan('common'));
app.use(cors({origin:CLIENT_ORIGIN}));
app.use(express.static(path.join(__dirname, 'public')));
app.options('/:symbol', cors());

app.get('/:symbol', cors(), async (req, res) => {
  let {symbol} = req.params;
  let data ={};
  console.log(symbol);
  let url = `${STOCKTWITS_API}/${symbol}.json`;
    console.log(url);
    try {
      data = await
      fetch({url, json:true}, cors(), (err, response, body) => {
        if (err){
          console.log(err);
          return(`Unable to access network connection`);
        } else if (response.body.errors) {
          console.log(response.body.errors);
          return(response.body.errors[0].message);
        } else {
          data = ({error: undefined, symMess: body.messages})
        }
      })
    } catch (err) {
      return res.status(404).json(err);  
    }
    return res.json(data);
});

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

app.listen(PORT);