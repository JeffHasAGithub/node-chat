const fs = require('fs');

const _JNameGen = function(names) {
  function generate() {
    let idx = getRandomNum(names.length)
    const fname = names[idx];

    idx = getRandomNum(names.length);
    const lname = names[idx];

    idx = getRandomNum(names.length);
    return `${fname}${lname}${idx}`;
  }

  return { generate };
};

const JNameGen = function(fpath) {
  const data = fs.readFileSync(fpath);
  const names = data.toString().trim().split('\n');

  return _JNameGen(names);
}

module.exports = JNameGen;

////////////////////////////////////////////////////

function getRandomNum(maxNum) {
  return Math.floor(Math.random() * maxNum); 
}
