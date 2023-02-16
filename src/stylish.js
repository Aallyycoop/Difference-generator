import _ from 'lodash';

const defaultIndent = 4;

const getIndent = (depth) => ' '.repeat(depth * defaultIndent - 2);

const stringify = (data, depth = 1) => {
  const iter = (innerData, iterDepth) => {
    if (!_.isObject(innerData)) {
      return `${innerData}`;
    }

    const entries = Object.entries(innerData);
    const result = entries.map(([key, value]) => `${getIndent(iterDepth)}  ${key}: ${iter(value, iterDepth + 1)}`);
    const endIndent = ' '.repeat((iterDepth - 1) * defaultIndent);
    return ['{', ...result, `${endIndent}}`].join('\n');
  };
  return iter(data, depth);
};

const stylish = (differenceTree) => {
  const iter = (differenceNodes, depth) => {
    const result = differenceNodes.map((node) => {
      if (node.type === 'nested') {
        return `${getIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
      }
      if (node.type === 'added') {
        return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      }
      if (node.type === 'deleted') {
        return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      }
      if (node.type === 'changed') {
        const originalLine = `${getIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
        const newLine = `${getIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
        return `${originalLine}\n${newLine}`;
      }
      return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
    });
    return ['{', ...result, `${getIndent(depth + 1)}}`].join('\n');
  };
  return iter(differenceTree, 1);
};

export default stylish;


// const obj1 = {
//   common: {
//     follow: false,
//     setting1: 'Value1',
//     setting2: 200,
//     setting3: true,
//     setting4: 'blah_blah',
//     setting5: {
//       key5: 'value5',
//     },
//     setting6: {
//       doge: {
//         wow: '',
//         wow2: 'so much',
//       },
//       key: 'value',
//       ops: 'vops',
//     },
//   },
// };

// console.log(stringify(obj1));

// // const stringify = (data, replacer = ' ', spacecount = 1) => {
// //   const iter = (innerData, depth) => {
// //     if (!_.isObject(innerData)) {
// //       return `${innerData}`;
// //     }

// //     const entries = Object.entries(innerData);
// //     const result = entries.map(([key, value]) => {
// //       const beginIndent = replacer.repeat(depth * spacecount);
// //       return `${beginIndent}${key}: ${iter(value, depth + 1)}`;
// //     });
// //     const endIndent = replacer.repeat((depth - 1) * spacecount);
// //     const out = ['{', ...result, `${endIndent}}`].join('\n');
// //     return out;
// //   };
// //   return iter(data, 1);
// // };


