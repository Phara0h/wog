var zalgo = require('./zalgo.js');
var colors = {
    reset: '\033[39m\033[0m',

    //text color

    black: '\033[30m',
    red: '\033[31m',
    green: '\033[32m',
    yellow: '\033[33m',
    blue: '\033[34m',
    magenta: '\033[35m',
    cyan: '\033[36m',
    white: '\033[37m',
    brightBlack: '\033[90m',
    brightRed: '\033[91m',
    brightGreen: '\033[92m',
    brightYellow: '\033[93m',
    brightBlue: '\033[94m',
    brightMagenta: '\033[95m',
    brightCyan: '\033[96m',
    brightWhite: '\033[97m',

    //background color

    blackBg: '\033[40m',
    redBg: '\033[41m',
    greenBg: '\033[42m',
    yellowBg: '\033[43m',
    blueBg: '\033[44m',
    magentaBg: '\033[45m',
    cyanBg: '\033[46m',
    whiteBg: '\033[47m'
}


module.exports = function (c,t) {
    if(c == 'rainbow') {
      var nt = '';
      for (var i = 0; i < t.length; i++) {
        var color = '\033'+`[3${((i%6)+1)}m`
        nt += color;
        nt += t.charAt(i);
        nt += colors['reset'];
      }
      return nt;
    }
    if(c == 'zalgo') {
      return zalgo(t);
    }
    return colors[c]+t+colors['reset'];
  }
