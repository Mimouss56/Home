const OpenIA = require('openai');

const apiKey = process.env.OPENAI_API_KEY;

const openia = new OpenIA({
  apiKey,
  models: {
    gpt3: {
      id: 'gpt-3.5-turbo',
      version: '2022-01-01',
    },
  },
});

module.exports = openia;
