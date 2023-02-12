import yaml from 'js-yaml';

// Выбирается функция-парсер в зависимости от расширения файла
const parser = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  return `Unexpected format ${format}`;
};

export default parser;
