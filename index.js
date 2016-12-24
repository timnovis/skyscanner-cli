#! /usr/bin/env node

console.log('Search for flight prices from your terminal!');

require('dotenv').config();
var request = require('request');
var inquirer = require('inquirer');
var defaults = {
  country: "UK",
  currency: "GBP",
  locale: "en-GB"
};

inquirer.prompt(
  [
    {
      type: 'input',
      name: 'currency',
      message: 'Which currency should we use?',
      default: defaults.currency
    },
    {
      type: 'input',
      name: 'origin',
      message: 'Where are you flying from?',
      default: 'LGW'
    },
    {
      type: 'input',
      name: 'destination',
      message: 'Where are you flying to?',
      default: 'KTM'
    },
    {
      type: 'input',
      name: 'outbound',
      message: 'What date are you leaving? (YYYY-MM-DD)',
      default: 'anytime'
    },
    {
      type: 'input',
      name: 'inbound',
      message: 'What date are you returning? (YYYY-MM-DD)',
      default: 'anytime'
    }
  ]
).then((answers) => {
  // console.log(answers);
  request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    url : `http://api.skyscanner.net/apiservices/browsequotes/v1.0/${defaults.country}/${answers.currency}/${defaults.locale}/${answers.origin}/${answers.destination}/${answers.outbound}/${answers.inbound}`,
    qs: {
      apikey: process.env.SKYSCANNER
    }
  }, (err, response, body) => {
    var response = JSON.parse(body);
    var quoteCount = response.Quotes.length;
    var running = 0;
    for(var i = 0; i < quoteCount; i++) {
      running = running + response.Quotes[i].MinPrice;
    }
    var averageCost = Math.round(running / quoteCount);
    console.log(`Your flight from ${response.Places[1].Name} to ${response.Places[0].Name} will cost on average ${averageCost}${answers.currency}`);
  });
});
