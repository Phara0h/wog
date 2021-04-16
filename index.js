'use strict';

const colors = require('./src/colors.js');
const levels = {
  meme: 0.420,
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
  wtf: 70
};

class Wog {
  constructor(config) {
    if(!config) {
      config = {};
    }

    config.logger = config.logger || console;
    config.level = config.level || 'meme';
    config.colors = this.isSetDefault(this.stringToBool(config.colors),true);
    config.enable = this.isSetDefault(this.stringToBool(config.enable), true);
    config.jsonoutput = this.isSetDefault(this.stringToBool(config.jsonoutput), false);

    this.logger = config.logger;
    this.level = levels[config.level];
    this.config = config;
  }

  wog(level, ...msg) {
    this.log(level, ...msg);
  }

  setLevel(level) {
    this.level = levels[level];
  }

  setLogger(logger) {
    this.logger = logger;
  }

  log(level, ...msg) {
    if (level >= this.level) {
      if (this.config.enable && this.config.colors && !this.config.jsonoutput) {
        var color = 'magenta';

        switch (level) {
          case levels.info:
            color = 'white';
            break;
          case levels.warn:
            color = 'yellow';
            break;
          case levels.error:
            color = 'red';
            break;
          case levels.debug:
            color = 'blue';
            break;
          case levels.fatal:
            color = 'magenta';
            break;
          case levels.trace:
            color = 'green';
            break;
          case levels.wtf:
            this.logger.log(
              '[' + colors('rainbow', this.getLevelString(level)) + ']:',
              ...msg
            );
            return;
            break;
          case levels.meme:
            this.logger.log(
              '[' + colors('zalgo', this.getLevelString(level)) + ']:',
              ...msg
            );
            return;
            break;
          default:
            break;
        }
        this.logger.log(
          '[' + colors(color,this.getLevelString(level)) + ']:',
          ...msg
        );
      } else if (this.config.enable) {
        if(this.config.jsonoutput) {
          this.logger.log(`{"level": "${this.getLevelString(level)}","msg": ${JSON.stringify(msg)}}`);
        } 
        else {
          this.logger.log('[' + this.getLevelString(level) + ']:', ...msg);
        }
      }
    }
  }

  info(...msg) {
    this.log(levels.info, ...msg);
  }
  warn(...msg) {
    this.log(levels.warn, ...msg);
  }
  error(...msg) {
    this.log(levels.error, ...msg);
  }
  debug(...msg) {
    this.log(levels.debug, ...msg);
  }
  fatal(...msg) {
    this.log(levels.fatal, ...msg);
  }
  trace(...msg) {
    this.log(levels.trace, ...msg);
  }
  wtf(...msg) {
    this.log(levels.wtf, ...msg);
  }
  meme(...msg) {
    this.log(levels.meme, ...msg);
  }

  getLevelString(level) {
    switch (level) {
      case levels.info:
        return 'INFO';
      case levels.warn:
        return 'WARN';
      case levels.error:
        return 'ERROR';
      case levels.debug:
        return 'DEBUG';
      case levels.fatal:
        return 'FATAL';
      case levels.trace:
        return 'TRACE';
      case levels.wtf:
        return 'DAFUC';
      case levels.meme:
        return 'MEME';
      default:
        break;
    }
  }
  stringToBool(bool) {
    if (typeof bool == 'boolean') {
      return bool;
    }
    if (bool == 'true') {
      return true;
    }
    if (bool == 'false') {
      return false;
    }
    return null;
  }
  isSetDefault(v, d) {
    if (typeof v == 'number') {
      return !isNaN(v) ? v : d;
    }
    return v !== null && v !== undefined ? v : d;
  }
}

var wog;

module.exports = function(config) {
  if (!wog) {
    wog = new Wog(config);
  }

  return wog;
};
