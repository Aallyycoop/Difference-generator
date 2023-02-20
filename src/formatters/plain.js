import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : `${value}`;
};

const getPath = (node, path) => (node.type === 'nested' ? `${path}${node.key}.` : `${path}${node.key}`);

const plain = (differenceTree) => {
  const iter = (differenceNodes, path) => {
    const result = differenceNodes.map((node) => {
      const currentPath = getPath(node, path);
      switch (node.type) {
        case 'nested':
          return iter(node.children, currentPath);
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default: return '';
      }
    });
    return result.filter((line) => line !== '').join('\n');
  };
  return iter(differenceTree, '');
};

export default plain;
