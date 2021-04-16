# wog
Just a wittle wogger with no dependencies

### Install

```bash
npm install wog --save
```

### Init

```js
//these are the default values 
const wog = require('wog')({ 
    enable: true, 
    colors: true, 
    level: 'meme',
    logger: console,
});

```

### Usage

```js
//these are the default values 
  wog.info('Its ight');
  wog.warn('Oh noes its a warnning!');
  wog.error('Yikes!');
  wog.fatal('f');
  wog.debug('Why?');
  wog.trace('there you are', {meme:'city'});
  wog.wtf('i give up');
  wog.meme('I summon thee');
```