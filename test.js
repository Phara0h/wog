var wog = require('./index.js')({colors:false});

console.log('\ncolors off defaults:')
test();

console.log('\ncolors on:')
wog.config.colors = true;
test();

console.log('\ndisabled:')
wog.config.enable = false;
test();

console.log('\json:')
wog.config.enable = true;
wog.config.jsonoutput = true;

test();

console.log('\nlevel error:')
wog.config.enable = true;
wog.setLevel('error');
test();



function test() {
  wog.info('Its ight');
  wog.warn('Oh noes its a warnning!');
  wog.error('Yikes!');
  wog.fatal('f');
  wog.debug('Why?');
  wog.trace('there you are', {meme:'city'});
  wog.wtf('i give up');
  wog.meme('I summon thee');
}
