import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : `${value}`;
};

const plain = (differenceTree) => {
  const iter = (differenceNodes, path) => {
    const result = differenceNodes.map((node) => {
      const currentPath = `${path}${node.key}.`;
      switch (node.type) {
        case 'nested':
          return iter(node.children, currentPath);
        case 'added':
          return `Property '${currentPath.slice(0, -1)}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${currentPath.slice(0, -1)}' was removed`;
        case 'changed':
          return `Property '${currentPath.slice(0, -1)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default: return '';
      }
    });
    return result.filter((line) => line !== '').join('\n');
  };
  return iter(differenceTree, '');
};

export default plain;
