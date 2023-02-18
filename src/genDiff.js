import _ from 'lodash';

const genDiff = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(keys);
  const differenceTree = sortedKeys.map((key) => {
    if (!_.has(object1, key)) {
      return { key, type: 'added', value: object2[key] };
    }
    if (!_.has(object2, key)) {
      return { key, type: 'deleted', value: object1[key] };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { key, type: 'nested', children: genDiff(object1[key], object2[key]) };
    }
    if (object1[key] !== object2[key]) {
      return {
        key, type: 'changed', value1: object1[key], value2: object2[key],
      };
    }
    return { key, type: 'unchanged', value: object1[key] };
  });
  return differenceTree;
};

export default genDiff;
