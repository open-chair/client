'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const axios = require('axios');
const API = require('./env/index.js');
const Promise = require('bluebird')

const app = express();
const PORT = 8080;

const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('../webpack.config.js');
const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//   hot: true,
//   filename: 'bundle.js',
//   stats: {
//     chunks:false,
//     colors: true,
//   },
//   historyApiFallback: true
// }));

// app.use(webpackHotMiddleware(compiler, {
//   log: console.log,
//   path: '/__webpack_hmr',
//   heartbeat: 10 * 1000,
// }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('client'));

// app.get('/bundle.js', function(req, res) {
//   res.sendFile(path.resolve(__dirname, '../client/bundle.js'));
// });

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
// TODO: replace keto function with the diet
function nutritionix(diet, query, cb) {
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
        if (diet(foodies["nf_total_carbohydrate"], foodies["nf_dietary_fiber"], foodies["nf_total_fat"])) {
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

function keto(carbs, fiber, totalCal) {
  // console.log('keto', (carbs - fiber) / totalCal);
  return ((carbs - fiber) / totalCal) < 0.1;
}

// Macro parser
app.post('/nutri', (req, res) => {
  // start stub: //
  let result = {
    "restaurants": []
  };
  let diet = keto;

  const restaurants = [{
    id: 334879,
    name: 's'
  },
  {
    id: 334882,
    name: 's'
  },
  {
    id: 334885,
    name: 's'
  },
  {
    id: 334888,
    name: 's'
  },
  {
    id: 334891,
    name: 's'
  },
  {
    id: 334894,
    name: 's'
  },
  {
    id: 334897,
    name: 's'
  },
  {
    id: 334900,
    name: 's'
  },
  {
    id: 334900,
    name: 's'
  }];

  const checkStubRestaurants = (restaurants) => {
    const rand = [];
    for(let i = 0; i < restaurants.length; i++) {
      const randomId = Math.floor(Math.random()*restaurants.length);
      rand.push(randomId);
    }
    return restaurants.filter((restaurant, index) => {
      return rand.includes(index);
    });
  };

  res.send(checkStubRestaurants(restaurants));

  // end stub //

//   const checkRestaurant = (restaurant) => {
//     return new Promise((resolve, reject) => {
//       let restaurantId = restaurant.id;
//       let payload = `{ restaurant(restaurantId: ${restaurantId}){ name menus{ title sections { items { description } } } } }`;
//       axios({
//         method:'post',
//         baseURL: 'https://www.opentable.com',
//         url: '/graphql',
//         data: {
//           query: payload   
//         }
//       }).then(response => {
//         return response.data.data.restaurant.menus[1].sections.some(section => {
//           return section.items.some(item => {
//             if (item) {
//               nutritionix(diet, item.description, (arr) => {
//                 if (arr.includes(true)) {
//                   resolve(restaurant);
//                 } else {
//                   resolve(false);
//                 }
//               });
//             }
//           });
//         })
//       }).catch(reject);
//     });
//   }

//   Promise.all(restaurants.map(restaurant => checkRestaurant(restaurant)))
//     .then(results => {
//       res.send(results.filter(r => r !== false));
//     });
// });
});

app.listen(PORT, () => {
  console.log(chalk.red(`Client on ${PORT}!`));
});
