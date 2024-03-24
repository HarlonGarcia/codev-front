const users = require('./data/users.json');
const categories = require('./data/categories.json');
const challenges = require('./data/challenges.json');
const technologies = require('./data/technologies.json');

// eslint-disable-next-line no-undef
module.exports = () => ({
  users,
  categories,
  challenges,
  technologies,
});

