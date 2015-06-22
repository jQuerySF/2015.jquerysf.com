var _ = require('lodash');

var speakers = require('../app/data/speakers').speakers;

function logSlide(speaker) {
  console.log(`${speaker.title}, ${speaker.name}, @${speaker.twitter}`);
}

console.log()
_.each(speakers, logSlide);