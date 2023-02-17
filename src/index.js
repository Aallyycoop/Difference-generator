import { readFileSync } from 'node:fs';
// import _ from 'lodash';
import path from 'path';
import parser from './parsers.js';
import genDiff from './genDiff.js';
import stylish from './stylish.js';

const getFormat = (filepath) => path.extname(filepath);
const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

// const getFormat = path.extname('__fixtures__/file1.json');
// console.log(getFormat);

export default (filepath1, filepath2) => {
  const object1 = parser(readFile(filepath1), getFormat(filepath1));
  const object2 = parser(readFile(filepath2), getFormat(filepath2));
  const diffTree = genDiff(object1, object2);
  // console.log(diffTree);
  // return diffTree;
  return stylish(diffTree);
};

// export default getDiff;

// const path1 = '../__fixtures__/file1.json';
// const path2 = '../__fixtures__/file2.json';

// console.log(parser(readFile(path1), getFormat(path1)));

// getDiff(path1, path2);

// gendiff __fixtures__/file1.json __fixtures__/file2.json

// gendiff __fixtures__/file3.yaml __fixtures__/file4.yml

// gendiff file1.json file2.json
