import _ from 'lodash';

const defaultIndent = 4;

const getIndent = (depth) => ' '.repeat(depth * defaultIndent - 2);
const getEndIndent = (depth) => ' '.repeat(depth * defaultIndent);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...result, `${getEndIndent(depth)}}`].join('\n');
};

const stylish = (differenceTree) => {
  const iter = (differenceNodes, depth) => {
    const result = differenceNodes.map((node) => {
      if (node.type === 'nested') {
        return `${getIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
      }
      if (node.type === 'added') {
        return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      }
      if (node.type === 'deleted') {
        return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      }
      if (node.type === 'changed') {
        const originalLine = `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
        const newLine = `${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
        return `${originalLine}\n${newLine}`;
      }
      return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    });
    return ['{', ...result, `${getEndIndent(depth - 1)}}`].join('\n');
  };
  return iter(differenceTree, 1);
};

export default stylish;
