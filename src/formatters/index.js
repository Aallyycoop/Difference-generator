import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

const getFormatter = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }
  if (formatName === 'plain') {
    return plain(tree);
  }
  if (formatName === 'json') {
    return jsonFormatter(tree);
  }
  return `Unexpected format ${formatName}`;
};

export default getFormatter;
