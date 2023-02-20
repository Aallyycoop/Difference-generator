import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (tree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(tree);
  }
  if (formatName === 'plain') {
    return plain(tree);
  }
  if (formatName === 'json') {
    return JSON.stringify(tree);
  }
  return `Unexpected format ${formatName}`;
};

export default getFormatter;
