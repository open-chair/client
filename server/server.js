'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const axios = require('axios');
const API = require('./env/index.js');

const app = express();
const PORT = 8080;

const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  stats: {
    chunks:false,
    colors: true,
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/bundle.js', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/bundle.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// dummy data
app.post('/restaurants', (req, res) => {
  const response = {
    "restaurants": [
               {
                 "title": "Emerald Curry"
               },
               {
                 "title": "Panang King"
               },
               {
                 "title": "Chicken Master"
               },
               {
                 "title": "Silver Meal"
               },
               {
                 "title": "Hooters"
               },
               {
                 "title": "Portos"
               }
    ]
  }
  res.status(200).send(response);
});



// Nutritionix API Call
function nutritionix(query, cb) {
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': API.app_id,
      'x-app-key': API.api_key
    }
  };
  axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients", {
    "query": query,
    "timezone": "US/Eastern"
  }, config)
  .then(function (response) {
    // console.log("response", response.data);
    let boolArr = [];
      for (let i = 0; i < response.data.foods.length; i++) {
        let foodies = response.data.foods[i];
        console.log(foodies["nf_total_carbohydrate"], foodies["nf_dietary_fiber"], foodies["nf_total_fat"]);
        if (kito(foodies["nf_total_carbohydrate"], foodies["nf_dietary_fiber"], foodies["nf_total_fat"])) {
          // console.log(true);
          boolArr.push(true);
        } else {
          // console.log(false);
          boolArr.push(false);
        }
      }
      cb(boolArr);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function kito(carbs, fiber, totalCal) {
  // console.log('kito', (carbs - fiber) / totalCal);
  return ((carbs - fiber) / totalCal) < 0.1;
}

function openTableIteration(arr, cb) {

  // Need to parse through foods from restaurants

  for (let j = 0; j < arr.length; j++) {
    cb(arr[j]);
  }
}

// Mock restaurant data
let mock = [
  {
    "restaurant":{
      "name": "rest1",
      "menu":[
        "salad, burrito"
      ]
    }
  },
  {
    "restaurant":{
      "name": "rest2",
      "menu":[
        "eggs, cheese, ham"
      ]
    }
  }
];



// Macro parser
app.post('/nutri', (req, res) => {
    let response = {
      "restaurants": []
    };
    // openTableIteration(mock, (first) => {
      nutritionix(first["restaurant"]["menu"][0], (arr) => {
        // res.send(data);
        // console.log(data);
        if (arr.indexOf(true) > -1) {
          response["restaurants"].push(first);

        }
      });
    // });
});

app.listen(PORT, () => {
  console.log(chalk.red(`Client on ${PORT}!`));
});
