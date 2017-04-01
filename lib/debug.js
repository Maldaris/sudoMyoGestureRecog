const myo = require('myo');
const fs = require('fs');

let mInstance;
let file;
let connected = false;

const frameHandler = (data, ts) => {
  try {
    fs.appendFile(file,
        `{ "timestamp" : ${ts} , "data" : ${JSON.stringify(data)} }\n`,
        (err) => {
            if (err) throw err;
        });
  } catch(e){
    console.error('got bad frame: ' + data);
  }
};

const init = (target) => {
    if (target === undefined) {
        setTarget("./debug.json");
    } else {
        setTarget(target);
    }
    myo.connect('ink.squidkid.debugApp', require('ws'));
    myo.on('connected', (data, ts) => {
        connected = true;
        mInstance = this;
        console.log('connected OK!');
        // myo.myos[0].lock();
    });
    myo.on('disconnected', (dat, ts) => {
        connected = false;
        console.log('disconnected!');
    });
};
const start = () => {
    myo.on('imu', frameHandler);
    // myo.myos[0].unlock();
};
const stop = () => {
    // myo.myos[0].lock();
};
const setTarget = (target) => {
    file = target;
};
module.exports = {
    'init': init,
    'start': start,
    'stop': stop,
    'setTarget': setTarget
};
