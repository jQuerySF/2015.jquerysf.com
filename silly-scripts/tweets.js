// node module
var _ = require('lodash');

// mah modules
var speakers = require('../app/data/speakers').speakers;
var streamLink = 'https://www.youtube.com/watch?v=HWzEF1P-bvI';

function speakerTweet(topic) {
  console.log(`${speaker.name} ~ ${speaker.title} ~ live now ~ `);
}

function getNames(topic) {
  var names = [];
  _.each(topic, function (speaker) {
    names.push(speaker.name);
  });
  return names.join(', ');
}

function topicTweet(topic, key) {
  var names = getNames(topic);
  var tweet = `Join ${names} talk about ${key} live\n--> ${streamLink}`;
  console.log(tweet);
  // console.log(`Tweet:\n${tweet}\nlength:\n${tweet.length}\n\n`)
}

var topics = _.groupBy(speakers, 'topic');

_.each(topics, topicTweet);
