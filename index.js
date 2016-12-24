require('dotenv').config();
var request = require('request'),
config = {
  country: "UK",
  currency: "GBP",
  locale: "en-GB"
},
search = {
  origin: "LGW",
  destination: "KTM",
  outbound: "2017-01-03",
  inbound: "2017-01-28"
};

request({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  },
  url : `http://api.skyscanner.net/apiservices/browsequotes/v1.0/${config.country}/${config.currency}/${config.locale}/${search.origin}/${search.destination}/${search.outbound}`,
  qs: {
    apikey: process.env.SKYSCANNER
  }
}, function(err,httpResponse,body) {
  var response = JSON.parse(body);
  console.log(`This will cost you around £${response.Quotes[0].MinPrice}`);
});
