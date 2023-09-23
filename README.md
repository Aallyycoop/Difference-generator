### Hexlet tests and linter status:
[![Actions Status](https://github.com/Aallyycoop/Difference-generator/workflows/hexlet-check/badge.svg)](https://github.com/Aallyycoop/Difference-generator/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7fd85742f4f2616014bc/maintainability)](https://codeclimate.com/github/Aallyycoop/Difference-generator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7fd85742f4f2616014bc/test_coverage)](https://codeclimate.com/github/Aallyycoop/Difference-generator/test_coverage)
[![gendiff](https://github.com/Aallyycoop/Difference-generator/actions/workflows/gendiff.yml/badge.svg)](https://github.com/Aallyycoop/Difference-generator/actions/workflows/gendiff.yml)

---

# Gendiff

## Description
Difference generator is a cli-app which generates differences between two data structures. Utility can work with formats json and yaml(yml) and output result in different formats: stylish, plain or json.

By default output format of difference is `stylish`. For another output format, use the flag `-f` or `--format` with values `plain` or `json`.

***

## Installation

1. `git clone git@github.com:Aallyycoop/frontend-project-44.git`
2. `make install` to install all dependencies
3. `npm link`

***

## Usage
```
gendiff [-h] [-V] [-f] <filepath1> <filepath2>

  Options:
    -h, --help           display help for command
    -V, --version        output the version number
    -f, --format         choose output format
```
***

## Demonstrations of using Gendiff

#### Difference between two nested files .json - .json (or .yaml - .yml) in stylish format:

[![asciicast](https://asciinema.org/a/6q8o43DAqHFCEWQVqgrx20dYE.svg)](https://asciinema.org/a/6q8o43DAqHFCEWQVqgrx20dYE)

***

#### Difference between two nested files .json - .json (or .yaml - .yml) in plain format:

[![asciicast](https://asciinema.org/a/Q3Di2l3lrTO2H4Ed84SlTABq4.svg)](https://asciinema.org/a/Q3Di2l3lrTO2H4Ed84SlTABq4)

***

#### Difference between two nested files .json - .json (or .yaml - .yml) in json format:

[![asciicast](https://asciinema.org/a/j7aEjTSGjcYkzEt6PixcLgJ9J.svg)](https://asciinema.org/a/j7aEjTSGjcYkzEt6PixcLgJ9J)