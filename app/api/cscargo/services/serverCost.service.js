const { cout, don } = require('../models/index.mapper');

async function serverCost() {
  const [CoutServeur] = await Promise.all([
    Promise.all([
      cout.sumCostBot(),
      don.sumPart(),
    ]),
  ]);
  const [sumCostBot, sumPart] = CoutServeur;
  const costPart = (sumCostBot / sumPart).toFixed(2);
  return costPart;
}

module.exports = {
  serverCost,
};
