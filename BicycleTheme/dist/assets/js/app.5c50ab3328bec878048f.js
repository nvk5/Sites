/*! For license information please see app.5c50ab3328bec878048f.js.LICENSE.txt */
!function(e){function t(t){for(var n,o,i=t[0],u=t[1],c=t[2],f=0,l=[];f<i.length;f++)o=i[f],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(p&&p(t);l.length;)l.shift()();return a.push.apply(a,c||[]),s()}function s(){for(var e,t=0;t<a.length;t++){for(var s=a[t],n=!0,i=1;i<s.length;i++){var u=s[i];0!==r[u]&&(n=!1)}n&&(a.splice(t--,1),e=o(o.s=s[0]))}return e}var n={},r={0:0},a=[];function o(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=n,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(s,n,function(t){return e[t]}.bind(null,n));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var p=u;a.push([67,1]),s()}([,,,function(e,t){function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(t){var n="Modernizr"in t,r=t.Modernizr;!function(e,t,n,r){var a=[],o={_version:"3.11.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var s=this;setTimeout((function(){t(s[e])}),0)},addTest:function(e,t,s){a.push({name:e,fn:t,options:s})},addAsyncTest:function(e){a.push({name:null,fn:e})}},i=function(){};i.prototype=o,i=new i;var u=[];function c(e,t){return s(e)===t}var p,f,l=n.documentElement,d="svg"===l.nodeName.toLowerCase();function g(e){var t=l.className,s=i._config.classPrefix||"";if(d&&(t=t.baseVal),i._config.enableJSClass){var n=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");t=t.replace(n,"$1"+s+"js$2")}i._config.enableClasses&&(e.length>0&&(t+=" "+s+e.join(" "+s)),d?l.className.baseVal=t:l.className=t)}function A(e,t){if("object"===s(e))for(var n in e)p(e,n)&&A(n,e[n]);else{var r=(e=e.toLowerCase()).split("."),a=i[r[0]];if(2===r.length&&(a=a[r[1]]),void 0!==a)return i;t="function"==typeof t?t():t,1===r.length?i[r[0]]=t:(!i[r[0]]||i[r[0]]instanceof Boolean||(i[r[0]]=new Boolean(i[r[0]])),i[r[0]][r[1]]=t),g([(t&&!1!==t?"":"no-")+r.join("-")]),i._trigger(e,t)}return i}p=c(f={}.hasOwnProperty,"undefined")||c(f.call,"undefined")?function(e,t){return t in e&&c(e.constructor.prototype[t],"undefined")}:function(e,t){return f.call(e,t)},o._l={},o.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),i.hasOwnProperty(e)&&setTimeout((function(){i._trigger(e,i[e])}),0)},o._trigger=function(e,t){if(this._l[e]){var s=this._l[e];setTimeout((function(){var e;for(e=0;e<s.length;e++)(0,s[e])(t)}),0),delete this._l[e]}},i._q.push((function(){o.addTest=A})),i.addAsyncTest((function(){var e=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=e.shift();function s(e,t,s){var n=new Image;function r(t){var r=!(!t||"load"!==t.type)&&1===n.width;A(e,"webp"===e&&r?new Boolean(r):r),s&&s(t)}n.onerror=r,n.onload=r,n.src=t}s(t.name,t.uri,(function(t){if(t&&"load"===t.type)for(var n=0;n<e.length;n++)s(e[n].name,e[n].uri)}))})),function(){var e,t,s,n,r,o;for(var p in a)if(a.hasOwnProperty(p)){if(e=[],(t=a[p]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(s=0;s<t.options.aliases.length;s++)e.push(t.options.aliases[s].toLowerCase());for(n=c(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)1===(o=e[r].split(".")).length?i[o[0]]=n:(i[o[0]]&&(!i[o[0]]||i[o[0]]instanceof Boolean)||(i[o[0]]=new Boolean(i[o[0]])),i[o[0]][o[1]]=n),u.push((n?"":"no-")+o.join("-"))}}(),g(u),delete o.addTest,delete o.addAsyncTest;for(var y=0;y<i._q.length;y++)i._q[y]();e.Modernizr=i}(t,0,document),e.exports=t.Modernizr,n?t.Modernizr=r:delete t.Modernizr}(window)},,function(e,t,s){},function(e,t,s){var n={"./Icon-1.png":7,"./Icon-1.webp":8,"./Icon-2.png":9,"./Icon-2.webp":10,"./Icon-3.png":11,"./Icon-3.webp":12,"./Icon-4.png":13,"./Icon-4.webp":14,"./Layer10.png":15,"./Layer10.webp":16,"./Layer11.png":17,"./Layer11.webp":18,"./Layer12.png":19,"./Layer12.webp":20,"./Layer13.png":21,"./Layer13.webp":22,"./Layer14.png":23,"./Layer14.webp":24,"./Layer15.png":25,"./Layer15.webp":26,"./Layer16.png":27,"./Layer16.webp":28,"./Layer19.png":29,"./Layer19.webp":30,"./Layer20.png":31,"./Layer20.webp":32,"./Layer21.png":33,"./Layer21.webp":34,"./Layer22.png":35,"./Layer22.webp":36,"./Layer23.png":37,"./Layer23.webp":38,"./Layer24.png":39,"./Layer24.webp":40,"./Layer25.png":41,"./Layer25.webp":42,"./Layer26.png":43,"./Layer26.webp":44,"./Logo-1.png":45,"./Logo-1.webp":46,"./Logo-2.png":47,"./Logo-2.webp":48,"./Logo-3.png":49,"./Logo-3.webp":50,"./Logo-4.png":51,"./Logo-4.webp":52,"./Logo.png":53,"./Logo.webp":54,"./Shape13.png":55,"./Shape13.webp":56,"./YEBOLogo.png":57,"./YEBOLogo.webp":58,"./header.png":59,"./header.webp":60,"./svg/burger.svg":61,"./svg/close.svg":62,"./svg/facebook_rounded.svg":63,"./svg/pinterest_rounded.svg":64,"./svg/twitter.svg":65,"./svg/twitter_rounded.svg":66};function r(e){var t=a(e);return s(t)}function a(e){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=a,e.exports=r,r.id=6},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-1.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-1.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-2.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-2.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-3.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-3.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-4.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Icon-4.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer10.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer10.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer11.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer11.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer12.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer12.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer13.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer13.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer14.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer14.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer15.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer15.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer16.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer16.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer19.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer19.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer20.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer20.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer21.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer21.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer22.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer22.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer23.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer23.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer24.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer24.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer25.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer25.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer26.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Layer26.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-1.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-1.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-2.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-2.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-3.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-3.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-4.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo-4.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Logo.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Shape13.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/Shape13.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/YEBOLogo.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/YEBOLogo.webp"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/header.png"},function(e,t,s){"use strict";s.r(t),t.default=s.p+"assets/images/header.webp"},function(e,t,s){"use strict";s.r(t),t.default={id:"burger-usage",viewBox:"0 0 512.001 512.001",url:s.p+"./assets/images/sprite.svg#burger",toString:function(){return this.url}}},function(e,t,s){"use strict";s.r(t),t.default={id:"close-usage",viewBox:"0 0 329.26933 329",url:s.p+"./assets/images/sprite.svg#close",toString:function(){return this.url}}},function(e,t,s){"use strict";s.r(t),t.default={id:"facebook_rounded-usage",viewBox:"0 0 67 67",url:s.p+"./assets/images/sprite.svg#facebook_rounded",toString:function(){return this.url}}},function(e,t,s){"use strict";s.r(t),t.default={id:"pinterest_rounded-usage",viewBox:"0 0 100 100",url:s.p+"./assets/images/sprite.svg#pinterest_rounded",toString:function(){return this.url}}},function(e,t,s){"use strict";s.r(t),t.default={id:"twitter-usage",viewBox:"0 0 512 512",url:s.p+"./assets/images/sprite.svg#twitter",toString:function(){return this.url}}},function(e,t,s){"use strict";s.r(t),t.default={id:"twitter_rounded-usage",viewBox:"0 0 112.197 112.197",url:s.p+"./assets/images/sprite.svg#twitter_rounded",toString:function(){return this.url}}},function(e,t,s){"use strict";s.r(t);var n=s(0),r=s.n(n),a=s(1),o=s.n(a),i=s(2),u=s.n(i),c=s(3),p=s.n(c);var f=function(){var e=function(e){var t=this,s=new XMLHttpRequest;s.open("POST","mail.php"),s.setRequestHeader("Content-Type","application/json; charset=utf-8"),s.send(JSON.stringify(e));var n=document.querySelector(".contact__text");n.textContent="Loading...",s.addEventListener("load",(function(){200==s.status?alert("Сообщение отправлено. Скоро мы с вами свяжемся!"):alert("Ошибка ".concat(s.status,": ").concat(s.statusText))})),s.addEventListener("error",(function(){return alert("Ошибка соединения или неверный URL")})),s.addEventListener("loadend",(function(){n.textContent="Stay on the saddle!",t.reset()}))};document.querySelectorAll(".form").forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault();for(var s=new FormData(this),n={},r=0;r<s.length;r++)n[s[r][0]]=n[s[r][1]];e.call(this,n)}))}))},l=s(4),d=function(){new l.a(".glide",{type:"carousel"}).mount()},g=function(){var e=document.querySelectorAll(".nav__link"),t=document.querySelector(".nav"),s=document.querySelector(".close"),n=document.querySelector(".burger"),r=1;window.addEventListener("resize",(function(){window.matchMedia("(min-width: 768px)").matches&&1==r&&(document.body.style.overflowY="auto",s.style.display="none",t.style.display="block",r=2),window.matchMedia("(max-width: 767.98px)").matches&&2==r&&(t.style.display="none",r=1)}));var a=function(){document.body.style.overflowY="auto",t.classList.add("hide"),s.style.display="none",setTimeout((function(){t.style.display="none",t.classList.remove("hide")}),400)};n.addEventListener("click",(function(){document.body.style.overflowY="hidden",t.classList.add("show"),t.style.display="block",s.style.display="block",setTimeout((function(){t.classList.remove("show")}),400)})),s.addEventListener("click",a),e.forEach((function(e){return e.addEventListener("click",(function(t){t.preventDefault();var s=e.getAttribute("href"),n=document.querySelector(s);window.matchMedia("(max-width: 767.98px)").matches&&t.type&&a(),n.scrollIntoView({behavior:"smooth"})}))}))};window.addEventListener("DOMContentLoaded",(function(){!function(){window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),r.a.polyfill(),u()();var e=document.querySelectorAll('img:not([src$=".svg"])');e.forEach((function(e){return e.style.fontFamily="'object-fit: cover'"})),o()(e),p.a.on("webp",(function(e){var t=document.querySelector(".header");!e||(t.style.backgroundImage="url(assets/images/header.webp)")}))}(),d(),g(),f()}));s(5);[s(6)].forEach((function(e){e.keys().forEach((function(t){e(t)}))}))}]);