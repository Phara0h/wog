const _loadNs = process.hrtime.bigint();
const _loadMs = BigInt(new Date().getTime()) * 1000n * 1000n;

const colors = require('./src/colors.js');
const levels = {
  meme: 0.42,
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
    if (!config) {
      config = {};
    }
    this.config = {};
    this.config.level = config.level || 'meme';
    this.config.colors = this.isSetDefault(this.stringToBool(config.colors), true);
    this.config.enable = this.isSetDefault(this.stringToBool(config.enable), true);
    this.config.jsonoutput =  this.isSetDefault(this.stringToBool(config.jsonoutput), false);
    this.config.addTimestamp = this.isSetDefault(this.stringToBool(config.addTimestamp), true);
    this._appendFields = '';
    if(config.appendFields) {
      if(this.config.jsonoutput ) {
        try {
          this._appendFields = JSON.stringify(config.appendFields)
          this._appendFields = this._appendFields.substring(1, this._appendFields.length-1);
          //this._appendFields += ','
        } catch (error) {
          this._appendFields = ''
        }
      } else {
       this._appendFields = '[ '
        var keys = Object.keys(config.appendFields);
        for (let i = 0; i < keys.length; i++) {
          const field = keys[i];
          this._appendFields += `${config.appendFields[field]}` + ((i+1) < keys.length ? ' | ' :'' )
        }
        this._appendFields += ' ]'
      }
    }

    this._logger = config.logger || console ;
    this.level = levels[ this.config.level];
    this.serializers = config.serializers || {};
    this.serializersKeys = Object.keys(this.serializers);
    
  }

  // hack for fastify support
  child() {
    return this;
  }

  wog(level, ...msg) {
    this.log(level, ...msg);
  }

  setLevel(level) {
    this.level = levels[level];
  }

  setLogger(logger) {
    this._logger = logger;
  }
  
  _serialize(m) {
  
    if (m.stack && m.message) {
     // return `"message": "${m.message}","stack": ${JSON.stringify(m.stack)}`
      return JSON.stringify({wog_type:m.name,message:m.message,stack:m.stack,traceId:m.traceId}).slice(1,-1)
    }

    if(typeof m == 'string') {
      return `"wog_type":"string_message","message":"${m}"`;
    }

    if(this.serializersKeys.length) {
      var t = {};
      for (let i = 0; i < this.serializersKeys.length; i++) {
        if (m[this.serializersKeys[i]]) {
          // if(this.config.jsonFlaten) {
            
          // }
          t = Object.assign(t, this.serializers[this.serializersKeys[i]](m[this.serializersKeys[i]]));
        }
      }
      return (JSON.stringify(t)).slice(1,-1);
  
    }

    return JSON.stringify(m);
  }
  _getTS(){
    if(!this.config.addTimestamp) {
      return '';
    }
    if(!this.config.jsonoutput) {
      return `[${(_loadMs + (process.hrtime.bigint() - _loadNs)).toString()}]`
    }
    return `"tsNs":"${(_loadMs + (process.hrtime.bigint() - _loadNs)).toString()}",`;
  }

  log(level, ...msg) {
    //console.log(msg);
    if (level >= this.level) {
      if (this.config.jsonoutput && msg[0]) {
        msg = this._serialize(...msg);
      }
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
            this._logger.log(this._getTS()+'[' + colors('rainbow', this.getLevelString(level)) + ']:',this._appendFields, ...msg);
            return;
            break;
          case levels.meme:
            this._logger.log(this._getTS()+'[' + colors('zalgo', this.getLevelString(level)) + ']:',this._appendFields, ...msg);
            return;
            break;
          default:
            break;
        }
        this._logger.log(this._getTS()+'[' + colors(color, this.getLevelString(level)) + ']:',this._appendFields, ...msg);
      } else if (this.config.enable) {
          if (this.config.jsonoutput) {
            this._logger.log(`{${this._getTS()}"level": "${this.getLevelString(level)}",${this._appendFields}, ${msg}}`);
          } else {
            this._logger.log(this._getTS()+'[' + this.getLevelString(level) + ']:',this._appendFields, ...msg);
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

var __wog;

module.exports = function (config) {
  if (!__wog) {
    __wog = new Wog(config);
  }

  return __wog;
};
