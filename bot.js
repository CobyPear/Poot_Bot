//Twitter library and configuration file
const Twit=require('twit');

const T = new Twit(require('./config.js'));

//emoji library
const emojis = require ('emojis-list');

//gets a random emoji that 'hopefully' isn't a flag
function randomEmojis() {
    let arr = emojis.slice(316,3074);
    return arr[Math.floor(Math.random() * arr.length)]
};

//create our cat + poot + random emoji
function catPoot() {
    let cat = Math.random() >= .07 ? emojis[675] : Math.random() < .07 && Math.random() > .04  ? emojis [673] :  emojis[672];
    let poot = emojis[1467];
    return `${cat}${poot}${randomEmojis()}`
    };
console.log(catPoot())

// tweets the grid
function tweet() {
    T.post('statuses/update', { status: `${catPoot()}` }, function(err, data, response) {
      console.log(data)
  })
};
  
// Callback for when the tweet is sent
function tweeted(err, data, response) {
    if (err) {
        console.log(err);
    } else {
        console.log('Success: ' + data.text);
//console.log(response);
    }
};

//invokes function that tweets the grid and makes the bot wait 3 hours before tweeting again.
tweet();
setInterval(tweet, 3000 * 60 * 60);
