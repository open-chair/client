const axios = require('axios');
const nutriParser = require('nutriParser.js');

const restaurantId = 22151
const payload = `{ restaurant(restaurantId: ${restaurantId}){ name menus{ title sections { items { description } } } } }`;

// stubs:
const restaurantIds = [20200, 4, 2215, 30393, 2385, 1200]; 
const nutriParser = (type, ingredients) => {
  const ingredient = ingredients.split(','); 
  //etc.
  return true;
}

const diet = 'paleo';

restaurantIds.filter(restaurantId => {
  let payload = `{ restaurant(restaurantId: ${restaurantId}){ name menus{ title sections { items { description } } } } }`;
  axios({
    method:'post',
    baseURL: 'https://www.opentable.com',
    url: '/graphql',
    data: {
      query: payload   
    }
  })
  .then(response => {
    response.data.data.restaurant.menus[0].sections.forEach(section => {
      return section.items.all(item => {
        return nutriParser(diet, item.description);
      })
    })
  })
  .catch(err => console.log(err));
})
