const random = {

  randomItem(collection) {
    const randomIndex = random.getRandomInt(0, collection.length);
    return collection[randomIndex];
  },

  getRandomInt(min, max) {
    const minRounded = Math.ceil(min);
    const maxRounded = Math.floor(max);
    return Math.floor(Math.random() * (maxRounded - minRounded) + minRounded);
  },
};

module.exports = random;
