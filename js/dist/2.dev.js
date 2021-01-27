"use strict";

var fs = request('fs');

var readFile = function readFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

readFile('./data/a.txt').then(function (res) {
  console.log(res);
});