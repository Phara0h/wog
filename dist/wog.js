var Wog=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";const n=t(1),o={meme:.42,trace:10,debug:20,info:30,warn:40,error:50,fatal:60,wtf:70};class i{constructor(e){e||(e={}),e.logger=e.logger||console,e.level=e.level||"meme",e.colors=!(!1===e.colors),e.enable=!(!1===e.enable),this.logger=e.logger,this.level=o[e.level],this.config=e}wog(e,...r){this.log(e,...r)}setLevel(e){this.level=o[e]}setLogger(e){this.logger=e}log(e,...r){if(e>=this.level)if(this.config.enable&&this.config.colors){var t="magenta";switch(e){case o.info:t="white";break;case o.warn:t="yellow";break;case o.error:t="red";break;case o.debug:t="blue";break;case o.fatal:t="magenta";break;case o.trace:t="green";break;case o.wtf:return void this.logger.log("["+n("rainbow",this.getLevelString(e))+"]:",...r);case o.meme:return void this.logger.log("["+n("zalgo",this.getLevelString(e))+"]:",...r)}this.logger.log("["+n(t,this.getLevelString(e))+"]:",...r)}else this.config.enable&&this.logger.log("["+this.getLevelString(e)+"]:",...r)}info(...e){this.log(o.info,...e)}warn(...e){this.log(o.warn,...e)}error(...e){this.log(o.error,...e)}debug(...e){this.log(o.debug,...e)}fatal(...e){this.log(o.fatal,...e)}trace(...e){this.log(o.trace,...e)}wtf(...e){this.log(o.wtf,...e)}meme(...e){this.log(o.meme,...e)}getLevelString(e){switch(e){case o.info:return"INFO";case o.warn:return"WARN";case o.error:return"ERROR";case o.debug:return"DEBUG";case o.fatal:return"FATAL";case o.trace:return"TRACE";case o.wtf:return"DAFUC";case o.meme:return"MEME"}}}var a;e.exports=function(e){return a||(a=new i(e)),a}},function(e,r,t){var n=t(2),o={reset:"[39m[0m",black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m",brightBlack:"[90m",brightRed:"[91m",brightGreen:"[92m",brightYellow:"[93m",brightBlue:"[94m",brightMagenta:"[95m",brightCyan:"[96m",brightWhite:"[97m",blackBg:"[40m",redBg:"[41m",greenBg:"[42m",yellowBg:"[43m",blueBg:"[44m",magentaBg:"[45m",cyanBg:"[46m",whiteBg:"[47m"};e.exports=function(e,r){if("rainbow"==e){for(var t="",i=0;i<r.length;i++){t+=""+`[3${i%6+1}m`,t+=r.charAt(i),t+=o.reset}return t}return"zalgo"==e?n(r):o[e]+r+o.reset}},function(e,r){e.exports=function(e,r){e=e||"   he is here   ";var t={up:["̍","̎","̄","̅","̿","̑","̆","̐","͒","͗","͑","̇","̈","̊","͂","̓","̈","͊","͋","͌","̃","̂","̌","͐","̀","́","̋","̏","̒","̓","̔","̽","̉","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","̾","͛","͆","̚"],down:["̖","̗","̘","̙","̜","̝","̞","̟","̠","̤","̥","̦","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̹","̺","̻","̼","ͅ","͇","͈","͉","͍","͎","͓","͔","͕","͖","͙","͚","̣"],mid:["̕","̛","̀","́","͘","̡","̢","̧","̨","̴","̵","̶","͜","͝","͞","͟","͠","͢","̸","̷","͡"," ҉"]},n=[].concat(t.up,t.down,t.mid);function o(e){return Math.floor(Math.random()*e)}function i(e){var r=!1;return n.filter((function(t){r=t===e})),r}return function(e,r){var n,a,l="";for(a in(r=r||{}).up=void 0===r.up||r.up,r.mid=void 0===r.mid||r.mid,r.down=void 0===r.down||r.down,r.size=void 0!==r.size?r.size:"maxi",e=e.split(""))if(!i(a)){switch(l+=e[a],n={up:0,down:0,mid:0},r.size){case"mini":n.up=o(8),n.mid=o(2),n.down=o(8);break;case"maxi":n.up=o(16)+3,n.mid=o(4)+1,n.down=o(64)+3;break;default:n.up=o(8)+1,n.mid=o(6)/2,n.down=o(8)+1}var g=["up","mid","down"];for(var u in g)for(var s=g[u],c=0;c<=n[s];c++)r[s]&&(l+=t[s][o(t[s].length)])}return l}(e,r)}}]);
