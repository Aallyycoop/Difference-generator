import { readFileSync } from 'node:fs';
import path from 'path';
import parser from './parsers.js';
import genDiff from './genDiff.js';
import getFormatter from './formatters/index.js';

const getFormat = (filepath) => path.extname(filepath);
const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

export default (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = parser(readFile(filepath1), getFormat(filepath1));
  const object2 = parser(readFile(filepath2), getFormat(filepath2));
  const diffTree = genDiff(object1, object2);
  return getFormatter(diffTree, formatName);
};
