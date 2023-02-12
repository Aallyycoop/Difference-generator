import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'path';
import parser from './parsers.js';

const getFormat = (filepath) => path.extname(filepath);

// const getFormat = path.extname('__fixtures__/file1.json');
// console.log(getFormat);

export default (filepath1, filepath2) => {
  const data1 = readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
  const data2 = readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
  // console.log(process.cwd());
  // console.log(path.resolve(process.cwd(), filepath1));
  // console.log(path.resolve(filepath2));
  // console.log(data1, data2);
  // const dataParse1 = JSON.parse(data1);
  // const dataParse2 = JSON.parse(data2);
  const dataParse1 = parser(data1, getFormat(filepath1));
  const dataParse2 = parser(data2, getFormat(filepath2));
  // console.log(dataParse1);
  // console.log(dataParse2);
  const keys = _.union(_.keys(dataParse1), _.keys(dataParse2));
  const sortedKeys = keys.sort();
  // console.log(sortedKeys);
  const result = sortedKeys.reduce((acc, key) => {
    if (_.has(dataParse1, key) && _.has(dataParse2, key)) {
      if (dataParse1[key] === dataParse2[key]) {
        return [...acc, `    ${key}: ${dataParse1[key]}`];
      }
      return [...acc, `  - ${key}: ${dataParse1[key]}`, `  + ${key}: ${dataParse2[key]}`];
    }
    if (_.has(dataParse1, key) && !_.has(dataParse2, key)) {
      return [...acc, `  - ${key}: ${dataParse1[key]}`];
    }
    return [...acc, `  + ${key}: ${dataParse2[key]}`];
  }, []);
  return ['{', ...result, '}'].join('\n');
};

// gendiff __fixtures__/file1.json __fixtures__/file2.json

// gendiff __fixtures__/file3.yaml __fixtures__/file4.yml

// gendiff file1.json file2.json

/* {
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
} */
