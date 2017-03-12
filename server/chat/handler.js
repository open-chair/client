

const axios = require('axios');



const pageAccessToken = require('../env/index.js').pageAccessToken;
const fbValidationToken = require('../env/index.js').fbValidationToken;


// if you need to add conversational elements:
// const { Wit, log } = require('node-wit');
// const WIT_TOKEN = ..
// const wit = new Wit({
//   accessToken: WIT_TOKEN,
//   actions,
//   logger: new log.Logger(log.INFO),
// });

module.exports.handler = (event, context, callback) => {
  if (event.method === 'GET') {
      if (event.query['hub.verify_token'] === fbValidationToken && event.query['hub.challenge']) {

        return callback(null, parseInt(event.query['hub.challenge']));
      } else {
        return callback('Invalid token');
      }
    }

    if (event.method === 'POST') {
      event.body.entry.map((entry) => {
      entry.messaging.map((messagingItem) => {
        if (messagingItem.message && messagingItem.message.text) {
          // a dummy message to greet:
          const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${pageAccessToken}`;
          const payload = {
            recipient: {
              id: messagingItem.sender.id
            },
            message: {
              text: 'Here are the paleo friendly meals nearby:'
            }
          };
          axios.post(url, payload).then((response) => callback(null, response));
        }
      });
    });
    }
}
