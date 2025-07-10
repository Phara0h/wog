const _loadNs = process.hrtime.bigint();
const _loadMs = BigInt(new Date().getTime()) * 1000n * 1000n;

const colors = require("./src/colors.js");
const levels = {
  meme: 0.42,
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
  wtf: 70,
};

class Wog {
  constructor(config) {
    if (!config) {
      config = {};
    }
    this.config = {};
    this.config.level = config.level || "meme";
    this.config.colors = this.isSetDefault(
      this.stringToBool(config.colors),
      true
    );
    this.config.enable = this.isSetDefault(
      this.stringToBool(config.enable),
      true
    );
    this.config.jsonoutput = this.isSetDefault(
      this.stringToBool(config.jsonoutput),
      false
    );
    this.config.addTimestamp = this.isSetDefault(
      this.stringToBool(config.addTimestamp),
      true
    );
    this._appendFields = "";
    if (config.appendFields) {
      if (this.config.jsonoutput) {
        try {
          this._appendFields = JSON.stringify(config.appendFields);
          this._appendFields = this._appendFields.substring(
            1,
            this._appendFields.length - 1
          );
          //this._appendFields += ','
        } catch (error) {
          this._appendFields = "";
        }
      } else {
        this._appendFields = "[ ";
        var keys = Object.keys(config.appendFields);
        for (let i = 0; i < keys.length; i++) {
          const field = keys[i];
          this._appendFields +=
            `${config.appendFields[field]}` +
            (i + 1 < keys.length ? " | " : "");
        }
        this._appendFields += " ]";
      }
    }

    this._logger = config.logger || console;
    this.level = levels[this.config.level];
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

  _serialize(...msg) {
    for (let i = 0; i < msg.length; i++) {
      const m = msg[i];

      if (m.stack && m.message) {
        // return `"message": "${m.message}","stack": ${JSON.stringify(m.stack)}`
        if (!this.config.jsonoutput) {
          msg[i] = m;
          continue;
        }
        msg[i] = JSON.stringify({
          wog_type: m.name,
          message: m.message,
          stack: m.stack,
          traceId: m.traceId,
        }).slice(1, -1);
        continue;
      }

      if (typeof m == "string") {
        if (!this.config.jsonoutput) {
          msg[i] = m;
          continue;
        }
        if (i === 0 && msg.length === 1) {
          msg[i] = `"wog_type":"string_message","message":"${m}"`;
        } else {
          msg[i] = `"message${i === 0 ? "" : `_${i}`}":"${m}"`;
        }
        continue;
      }

      if (this.serializersKeys.length) {
        var t = {};
        var found = false;
        for (let j = 0; j < this.serializersKeys.length; j++) {
          if (m[this.serializersKeys[j]]) {
            t = Object.assign(
              t,
              this.serializers[this.serializersKeys[j]](
                m[this.serializersKeys[j]]
              )
            );
            found = true;
          }
        }

        if (found) {
          if (!Object.keys(t).length) {
            msg[i] = null;
            continue;
          }
          if (this.config.jsonoutput) {
            msg[i] = JSON.stringify(t).slice(1, -1);
            continue;
          }
          msg[i] = t;
          continue;
        }
      }
      if (!this.config.jsonoutput) {
        msg[i] = m;
        continue;
      }

      msg[i] = JSON.stringify(m).slice(1, -1);
    }
    return msg;
  }
  _getTS() {
    if (!this.config.addTimestamp) {
      return "";
    }
    if (!this.config.jsonoutput) {
      return `[${(_loadMs + (process.hrtime.bigint() - _loadNs)).toString()}]`;
    }
    return `"tsNs":"${(
      _loadMs +
      (process.hrtime.bigint() - _loadNs)
    ).toString()}",`;
  }

  log(level, ...msg) {
    if (level >= this.level) {
      if (msg[0]) {
        msg = this._serialize(...msg);

        if (msg === null) {
          return;
        }
      }
      if (this.config.enable && this.config.colors && !this.config.jsonoutput) {
        var color = "magenta";

        switch (level) {
          case levels.info:
            color = "white";
            break;
          case levels.warn:
            color = "yellow";
            break;
          case levels.error:
            color = "red";
            break;
          case levels.debug:
            color = "blue";
            break;
          case levels.fatal:
            color = "magenta";
            break;
          case levels.trace:
            color = "green";
            break;
          case levels.wtf:
            this._logger.log(
              this._getTS() +
                "[" +
                colors("rainbow", this.getLevelString(level)) +
                "]:",
              this._appendFields,
              ...msg
            );
            return;
            break;
          case levels.meme:
            this._logger.log(
              this._getTS() +
                "[" +
                colors("zalgo", this.getLevelString(level)) +
                "]:",
              this._appendFields,
              ...msg
            );
            return;
            break;
          default:
            break;
        }
        this._logger.log(
          this._getTS() +
            "[" +
            colors(color, this.getLevelString(level)) +
            "]:",
          this._appendFields,
          ...msg
        );
      } else if (this.config.enable) {
        if (this.config.jsonoutput) {
          this._logger.log(
            `{${this._getTS()}"level": "${this.getLevelString(level)}",${
              this._appendFields ? this._appendFields + "," : ""
            } ${msg}}`
          );
        } else {
          this._logger.log(
            this._getTS() + "[" + this.getLevelString(level) + "]:",
            this._appendFields,
            ...msg
          );
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
        return "INFO";
      case levels.warn:
        return "WARN";
      case levels.error:
        return "ERROR";
      case levels.debug:
        return "DEBUG";
      case levels.fatal:
        return "FATAL";
      case levels.trace:
        return "TRACE";
      case levels.wtf:
        return "DAFUC";
      case levels.meme:
        return "MEME";
      default:
        break;
    }
  }
  stringToBool(bool) {
    if (typeof bool == "boolean") {
      return bool;
    }
    if (bool == "true") {
      return true;
    }
    if (bool == "false") {
      return false;
    }
    return null;
  }
  isSetDefault(v, d) {
    if (typeof v == "number") {
      return !isNaN(v) ? v : d;
    }
    return v !== null && v !== undefined ? v : d;
  }
}

var __wog;

/**
 * @param {Object} config - Logger configuration
 * @param {string} [config.level='meme'] - Log level
 * @param {boolean|string} [config.colors=true] - Enable/disable colors
 * @param {boolean|string} [config.enable=true] - Enable/disable logging
 * @param {boolean|string} [config.jsonoutput=false] - Output in JSON format
 * @param {boolean|string} [config.addTimestamp=true] - Add timestamp to logs
 * @param {Object} [config.appendFields] - Fields to append to each log
 * @param {Object} [config.logger=console] - Logger to use
 * @param {Object} [config.serializers] - Custom serializers
 * @returns {Wog} - Singleton Wog instance
 */
function createWog(config) {
  if (!__wog) {
    __wog = new Wog(config);
  }

  return __wog;
}

// Export both the factory function and the Wog class
module.exports = createWog;
module.exports.Wog = Wog;
