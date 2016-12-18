var isSimpleSelectorNode = require('../nodes').isSimpleSelectorNode;
var isIdentNode = require('../nodes').isIdentNode;
var astDataToContent = require('../common').astDataToContent;
var countProps = require('../common').countProps;
var concat = require('../common').concat;

// [astData]->{}
function nodesToMixinUsages (nodes) {
  return nodes
  .map(astDataToContent)
  .reduce(concat, [])
  .filter(isSimpleSelectorNode)
  .map(astDataToContent)
  .reduce(concat, [])
  .filter(isIdentNode) // this collects the mixin name nodes
  .map(astDataToContent)
  .reduce(countProps, {});
}

module.exports = {
  nodesToMixinUsages: nodesToMixinUsages
};