window.livedesk.loadGizmo=function(l){var u=this;(function(d){function w(a,e){var c=(a&65535)+(e&65535);return(a>>16)+(e>>16)+(c>>16)<<16|c&65535}function n(a,e,c,b,d,m){a=w(w(e,a),w(b,m));return w(a<<d|a>>>32-d,c)}function t(a,e,c,b,d,m,k){return n(e&c|~e&b,a,e,d,m,k)}function p(a,e,c,b,d,m,k){return n(e&b|c&~b,a,e,d,m,k)}function b(a,e,c,b,d,m,k){return n(c^(e|~b),a,e,d,m,k)}function m(a,e){a[e>>5]|=128<<e%32;a[(e+64>>>9<<4)+14]=e;var c,d,m,k,l,g=1732584193,f=-271733879,h=-1732584194,j=271733878;
for(c=0;c<a.length;c+=16)d=g,m=f,k=h,l=j,g=t(g,f,h,j,a[c],7,-680876936),j=t(j,g,f,h,a[c+1],12,-389564586),h=t(h,j,g,f,a[c+2],17,606105819),f=t(f,h,j,g,a[c+3],22,-1044525330),g=t(g,f,h,j,a[c+4],7,-176418897),j=t(j,g,f,h,a[c+5],12,1200080426),h=t(h,j,g,f,a[c+6],17,-1473231341),f=t(f,h,j,g,a[c+7],22,-45705983),g=t(g,f,h,j,a[c+8],7,1770035416),j=t(j,g,f,h,a[c+9],12,-1958414417),h=t(h,j,g,f,a[c+10],17,-42063),f=t(f,h,j,g,a[c+11],22,-1990404162),g=t(g,f,h,j,a[c+12],7,1804603682),j=t(j,g,f,h,a[c+13],12,
-40341101),h=t(h,j,g,f,a[c+14],17,-1502002290),f=t(f,h,j,g,a[c+15],22,1236535329),g=p(g,f,h,j,a[c+1],5,-165796510),j=p(j,g,f,h,a[c+6],9,-1069501632),h=p(h,j,g,f,a[c+11],14,643717713),f=p(f,h,j,g,a[c],20,-373897302),g=p(g,f,h,j,a[c+5],5,-701558691),j=p(j,g,f,h,a[c+10],9,38016083),h=p(h,j,g,f,a[c+15],14,-660478335),f=p(f,h,j,g,a[c+4],20,-405537848),g=p(g,f,h,j,a[c+9],5,568446438),j=p(j,g,f,h,a[c+14],9,-1019803690),h=p(h,j,g,f,a[c+3],14,-187363961),f=p(f,h,j,g,a[c+8],20,1163531501),g=p(g,f,h,j,a[c+13],
5,-1444681467),j=p(j,g,f,h,a[c+2],9,-51403784),h=p(h,j,g,f,a[c+7],14,1735328473),f=p(f,h,j,g,a[c+12],20,-1926607734),g=n(f^h^j,g,f,a[c+5],4,-378558),j=n(g^f^h,j,g,a[c+8],11,-2022574463),h=n(j^g^f,h,j,a[c+11],16,1839030562),f=n(h^j^g,f,h,a[c+14],23,-35309556),g=n(f^h^j,g,f,a[c+1],4,-1530992060),j=n(g^f^h,j,g,a[c+4],11,1272893353),h=n(j^g^f,h,j,a[c+7],16,-155497632),f=n(h^j^g,f,h,a[c+10],23,-1094730640),g=n(f^h^j,g,f,a[c+13],4,681279174),j=n(g^f^h,j,g,a[c],11,-358537222),h=n(j^g^f,h,j,a[c+3],16,-722521979),
f=n(h^j^g,f,h,a[c+6],23,76029189),g=n(f^h^j,g,f,a[c+9],4,-640364487),j=n(g^f^h,j,g,a[c+12],11,-421815835),h=n(j^g^f,h,j,a[c+15],16,530742520),f=n(h^j^g,f,h,a[c+2],23,-995338651),g=b(g,f,h,j,a[c],6,-198630844),j=b(j,g,f,h,a[c+7],10,1126891415),h=b(h,j,g,f,a[c+14],15,-1416354905),f=b(f,h,j,g,a[c+5],21,-57434055),g=b(g,f,h,j,a[c+12],6,1700485571),j=b(j,g,f,h,a[c+3],10,-1894986606),h=b(h,j,g,f,a[c+10],15,-1051523),f=b(f,h,j,g,a[c+1],21,-2054922799),g=b(g,f,h,j,a[c+8],6,1873313359),j=b(j,g,f,h,a[c+15],
10,-30611744),h=b(h,j,g,f,a[c+6],15,-1560198380),f=b(f,h,j,g,a[c+13],21,1309151649),g=b(g,f,h,j,a[c+4],6,-145523070),j=b(j,g,f,h,a[c+11],10,-1120210379),h=b(h,j,g,f,a[c+2],15,718787259),f=b(f,h,j,g,a[c+9],21,-343485551),g=w(g,d),f=w(f,m),h=w(h,k),j=w(j,l);return[g,f,h,j]}function r(a){var e,c="";for(e=0;e<32*a.length;e+=8)c+=String.fromCharCode(a[e>>5]>>>e%32&255);return c}function E(a){var e,c=[];c[(a.length>>2)-1]=void 0;for(e=0;e<c.length;e+=1)c[e]=0;for(e=0;e<8*a.length;e+=8)c[e>>5]|=(a.charCodeAt(e/
8)&255)<<e%32;return c}function k(a,e){var c,b=E(a),d=[],k=[];d[15]=k[15]=void 0;16<b.length&&(b=m(b,8*a.length));for(c=0;16>c;c+=1)d[c]=b[c]^909522486,k[c]=b[c]^1549556828;c=m(d.concat(E(e)),512+8*e.length);return r(m(k.concat(c),640))}function q(a){var e="",c,b;for(b=0;b<a.length;b+=1)c=a.charCodeAt(b),e+="0123456789abcdef".charAt(c>>>4&15)+"0123456789abcdef".charAt(c&15);return e}function s(a){a=unescape(encodeURIComponent(a));return r(m(E(a),8*a.length))}function J(a,e){var c;if("undefined"==
typeof a||"undefined"==typeof e)return!0;for(c in e)if("undefined"==typeof a[c])return!0;for(c in a)if("undefined"==typeof e[c])return!0;for(c in e)if(e[c])switch(typeof e[c]){case "object":if(J(e[c],a[c]))return!0;break;case "function":if("undefined"==typeof a[c]||e[c].toString()!=a[c].toString())return!0;break;default:if(e[c]!=a[c])return!0}else if(a[c])return!0;return!1}str=function(a){this.init(a)};str.format=function(a){var e=arguments,c=1;2==e.length&&"object"==typeof e[1]&&(e=e[1]);return a.replace(/%?%(?:\(([^\)]+)\))?([disr])/g,
function(a,b,d){if(a[0]==a[1])return a.substring(1);b=e[b||c++];return"undefined"===typeof b?a:"i"==d||"d"==d?+b:b})};str.prototype={init:function(a){this.str=a},format:function(){return str.format(this.str)},toString:function(){return this.str}};d.md5=function(a,e,c){return!e?c?s(a):q(s(a)):c?k(unescape(encodeURIComponent(e)),unescape(encodeURIComponent(a))):q(k(unescape(encodeURIComponent(e)),unescape(encodeURIComponent(a))))};var F={url:"//gravatar.com/avatar/%(md5)s?r=%(rate)s&s=%(size)s&d=%(default)s&%(forcedefault)s",
defaults:{rate:"pg",size:48,"default":encodeURIComponent("images/avatar_default_collaborator.png"),forcedefault:"",key:"Avatar",needle:"Person.EMail"},parse:function(a,e){if(a){e||(e=this.defaults.needle);var c=this,b=e.split("."),m=b[0],k=b[1];d.each(a,function(a,b){a===m&&(void 0!==k&&d.isDefined(b[k]))&&(this[c.defaults.key]=c.get(b[k]));(d.isObject(b)||d.isArray(b))&&c.parse(b,e)});return a}},get:function(a){return"string"!==d.type(a)?a:str.format(this.url,d.extend({},this.defaults,{md5:d.md5(d.trim(a.toLowerCase()))}))}};
d.avatar=F;var x,Q=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,R=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,S=/[^-+\dA-Z]/g,z=function(a,e){a=String(a);for(e=e||2;a.length<e;)a="0"+a;return a};x=function(a,e,c){1==arguments.length&&("[object String]"==Object.prototype.toString.call(a)&&!/\d/.test(a))&&(e=a,a=void 0);a=a?new Date(a):new Date;if(isNaN(a))throw SyntaxError("invalid date");
e=String(x.masks[e]||e||x.masks["default"]);"UTC:"==e.slice(0,4)&&(e=e.slice(4),c=!0);var b=c?"getUTC":"get",d=a[b+"Date"](),m=a[b+"Day"](),k=a[b+"Month"](),g=a[b+"FullYear"](),f=a[b+"Hours"](),h=a[b+"Minutes"](),j=a[b+"Seconds"](),b=a[b+"Milliseconds"](),l=c?0:a.getTimezoneOffset(),r={d:d,dd:z(d),ddd:x.i18n.dayNames[m],dddd:x.i18n.dayNames[m+7],m:k+1,mm:z(k+1),mmm:x.i18n.monthNames[k],mmmm:x.i18n.monthNames[k+12],yy:String(g).slice(2),yyyy:g,h:f%12||12,hh:z(f%12||12),H:f,HH:z(f),M:h,MM:z(h),s:j,
ss:z(j),l:z(b,3),L:z(99<b?Math.round(b/10):b),t:12>f?"a":"p",tt:12>f?"am":"pm",T:12>f?"A":"P",TT:12>f?"AM":"PM",Z:c?"UTC":(String(a).match(R)||[""]).pop().replace(S,""),o:(0<l?"-":"+")+z(100*Math.floor(Math.abs(l)/60)+Math.abs(l)%60,4),S:["th","st","nd","rd"][3<d%10?0:(10!=d%100-d%10)*d%10]};return e.replace(Q,function(a){return a in r?r[a]:a.slice(1,a.length-1)})};x.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",
shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};x.i18n={dayNames:"Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),monthNames:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")};Date.prototype.format=function(a,e){return x(this,
a,e)};Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),c=this,b=function(){},d=function(){return c.apply(this instanceof b?this:a,e.concat(Array.prototype.slice.call(arguments)))};b.prototype=this.prototype;d.prototype=
new b;return d});String.prototype.trim||(String.prototype.trim=function(){for(var a=this.replace(/^\s\s*/,""),e=/\s/,c=a.length;e.test(a.charAt(--c)););return a.slice(0,c+1)});var G=!1;this.Class=function(){};Class.extend=function(a,e){function c(){if(!G&&(this._constructor||this._construct))try{return(this._construct||this._constructor).apply(this,arguments)}catch(a){}}G=!0;var b=new this;G=!1;for(var d in a)b[d]=a[d];c.prototype=b;c.prototype.constructor=c;c.extend=arguments.callee;return c};var K=
function(){},v=function(){},L=function(){this.items={}},y=function(){},M=Class.extend({_construct:function(a){this.data=!this.data?{root:""}:this.data;switch(d.type(a)){case "string":this.data.url=a;break;case "array":this.data.url=a[0];void 0!==a[1]&&(this.data.xfilter=url[0]);break;case "object":this.data.url=a.url,void 0!==a.xfilter&&(this.data.xfilter=a.xfilter)}return this},xfilter:function(){this.data.xfilter=1<arguments.length?d.makeArray(arguments).join(","):d.isArray(arguments[0])?arguments[0].join(","):
arguments[0];return this},root:function(a){this.data.root=a;return this},get:function(){return this.data.root+this.data.url},order:function(a,e){this.data.order=e+"="+a;return this},filter:function(a,e){this.data.filter=a+"="+e;return this},decorate:function(a){this.data.url=a.replace(/(%s)/g,this.data.url)},options:function(){var a={};this.data.xfilter&&(a.headers={"X-Filter":this.data.xfilter});return a}}),A={request:function(a){var e=this,c=function(c,b,m){d.support.cors=!0;a instanceof M?(b=d.extend(!0,
{},b,e.options,m,{data:c},a.options()),c=d.ajax(e.href(a.get()),b)):(b=d.extend(!0,{},b,e.options,m,{data:c}),c=d.ajax(e.href(a),b));e.reset();b.fail&&c.fail(b.fail);b.done&&c.done(b.done);b.always&&c.always(b.always);return c};return{read:function(a){return c({},e.readOptions,a)},update:function(a,b){return c(a,e.updateOptions,b)},insert:function(a,b){return c(a,e.insertOptions,b)},remove:function(a){return c({},e.removeOptions,a)}}},href:function(a){return a},reset:d.noop,options:{},readOptions:{dataType:"json",
type:"get",headers:{Accept:"text/json"}},updateOptions:{type:"post",headers:{"X-HTTP-Method-Override":"PUT"}},insertOptions:{dataType:"json",type:"post"},removeOptions:{type:"get",headers:{"X-HTTP-Method-Override":"DELETE"}}},T=0;v.prototype={_changed:!1,_new:!1,defaults:{},data:{},_construct:function(a,e){this._clientId=T++;this.data={};this.parseHash(a);this._new=!0;var c=this.pushUnique?this.pushUnique():this;c._forDelete=!1;c.clearChangeset();c._clientHash=null;e&&"object"==typeof e&&d.extend(c,
e);"object"==typeof a&&(c.parse(a),c._setExpiration());d.isEmptyObject(c.changeset)||c.triggerHandler("update",c.changeset).clearChangeset();return c},syncAdapter:A,feed:function(a,e,c){var a={},c=c?c:this.data,b;for(b in c)a[b]=c[b]instanceof v?e?c[b].feed(e):c[b].relationHash()||c[b].hash():c[b];return a},sync:function(a,e){var c=this,b=d.Deferred(),m=function(){return c.syncAdapter.request.apply(c.syncAdapter,arguments)};this.hash();c.triggerHandler("sync");if(this._forDelete)return m(a||this.href).remove().done(function(){c._remove()});
if(this._clientHash)return m(a||this.href).insert(this.feed()).done(function(a){c._changed=!1;c.parse(a);c._uniq&&c._uniq.replace(c._clientHash,c.hash(),c);c._clientHash=null;c.triggerHandler("insert").Class.triggerHandler("insert",c)});this._changed?d.isEmptyObject(this.changeset)||(b=this.href&&m(this.href).update(e?this.feed():this.feed("json",!1,this.changeset)).done(function(){c.triggerHandler("update",c.changeset).clearChangeset()})):(!a||!a.force)&&this.exTime&&this.exTime>new Date?c.isDeleted()||
c.triggerHandler("update"):b=this.href&&m(this.href).read(a).done(function(a){c.parse(a);c.isDeleted()?c._remove():d.isEmptyObject(c.changeset)?c.clearChangeset().triggerHandler("read"):c.triggerHandler("update",c.changeset).clearChangeset()});this._setExpiration();return b},_setExpiration:function(){this.exTime=new Date;this.exTime.setSeconds(this.exTime.getSeconds()+5)},_remove:function(){this.triggerHandler("delete");this._uniq&&this._uniq.remove(this.hash())},remove:function(){this._forDelete=
!0;return this},isDeleted:function(){return this._forDelete},modelDataBuild:function(a){return a},parse:function(a){a instanceof v&&(a=a.data);if(!a._parsed){for(var e in a){if(this.defaults[e])switch(!0){case "function"===typeof this.defaults[e]&&void 0===this.data[e]:var c=this.modelDataBuild(new this.defaults[e](a[e]));!this._new&&(c!=this.data[e]&&!(c instanceof y))&&(this.changeset[e]=c);this.data[e]=c;!a[e].href&&this.data[e].relationHash&&this.data[e].relationHash(a[e]);continue;case d.isArray(this.defaults[e]):this.data[e]=
this.modelDataBuild(new y(this.defaults[e][0],a[e].href));delete this.data[e];continue;case this.defaults[e]instanceof y:case this.defaults[e]instanceof v:this.data[e]=this.defaults[e];continue}else this._new||("object"===d.type(a[e])?J(this.data[e],a[e])&&(this.changeset[e]=a[e]):this.data[e]!=a[e]&&(this.changeset[e]=a[e]));"object"===d.type(a[e])&&"object"===d.type(this.data[e])?d.extend(!0,this.data[e],a[e]):this.data[e]=a[e]}this._new=!1;a._parsed=!0}},parseHash:function(a){"string"==typeof a?
this.href=a:a&&void 0!==a.href?(this.href=a.href,delete a.href):a&&(void 0!==a.id&&void 0!==this.url)&&(this.href=this.url+a.id);return this},clearChangeset:function(){this._changed=!1;this.changeset={};return this},get:function(a){return this.data[a]},set:function(a,e,c){var b={};"string"===d.type(a)?b[a]=e:(b=a,c=e);c=d.extend({},{silent:!1},c);this.clearChangeset().parse(b);this._changed=!0;d.isEmptyObject(this.changeset)||c.silent||this.triggerHandler("set",this.changeset);return this},_getClientHash:function(){this._clientHash||
(this._clientHash="mcid-"+String(this._clientId));return this._clientHash},hash:function(){!this.href&&this.data.href&&(this.href=this.data.href);return this.data.href||this.href||this._getClientHash()},relationHash:function(a){a&&(this.data.Id=a);return this.data.Id},off:function(a,b){d(this).off(a,b);return this},on:function(a,b,c){if(void 0===c)d(this).on(a,b);else d(this).on(a,function(){b.apply(c,arguments)});return this},trigger:function(a,b){d(this).trigger(a,b);return this},triggerHandler:function(a,
b){d(this).triggerHandler(a,b);return this}};L.prototype={items:{},garbageTime:1500,refresh:function(a){a._exTime||(a._exTime=new Date);a._exTime.setTime(a._exTime.getTime()+this.garbageTime)},set:function(a,b){var c=this;d(b).on("sync get get-prop set-prop",function(){c.refresh(this)});c.refresh(b);this.items[a]||(this.items[a]=b);return this.items[a]},replace:function(a,b,c){delete this.items[a];return this.set(b,c)},garbage:function(){for(var a in this.items)this.items[a]._exTime&&this.items[a]._exTime<
new Date&&(d(this.items[a]).triggerHandler("garbage"),delete this.items[a])},remove:function(a){delete this.items[a]}};var B=v.options={},N,O;v.extend=N=function(a,b){var c;c=Class.extend.call(this,a);c.extend=N;c.prototype.Class=c;c.on=function(a,b,e){d(c).on(a,function(){b.apply(e,arguments)});return c};c.off=function(a,b){d(c).off(a,b);return c};c.triggerHandler=function(a,b){d(c).triggerHandler(a,b)};b&&b.register&&(K[b.register]=c,delete b.register);c.prototype.options=d.extend({},b);return c};
y.prototype={_list:[],getList:function(){return this._list},count:function(){return this._list.length},_construct:function(){this.model||(this.model=v);this._list=[];this.desynced=!0;var a=buildOptions=function(){void 0},b;for(b in arguments)switch(d.type(arguments[b])){case "function":this.model=arguments[b];break;case "string":this.href=arguments[b];break;case "array":a=function(a){return function(){this._list=this.parse(a)}}(arguments[b]);break;case "object":buildOptions=function(a){return function(){this.options=
a;a.href&&(this.href=a.href)}}(arguments[b])}buildOptions.call(this);a.call(this);B=d.extend({},{init:!0},this.options);B.init&&this.init.apply(this,arguments)},init:function(){},get:function(a){var b=d.Deferred(),c=this;searchKey=function(){for(var d=0;d<c._list.length;d++)if(a==c._list[d].hash()||a==c._list[d].relationHash())return b.resolve(c._list[d]);b.reject()};this.desynced&&this.sync().done(function(){b.resolve(searchKey())})?b:searchKey();return b},remove:function(a){for(var b in this._list)if(a==
this._list[b].hash()||a==this._list[b].relationHash()){Array.prototype.splice.call(this._list,b,1);break}return this},syncAdapter:A,setHref:function(a){this.href=a;return this},each:function(a){d.each(this._list,a)},forwardEach:function(a,b){this._list.forEach(a,b)},reverseEach:function(a,b){for(var c=this._list.length;0<c;++c)a.call(b||this,this[c],c,this)},feed:function(a,b){var c=[],d;for(d in this._list)c[d]=this._list[d].feed(a,b);return c},sync:function(a){var b=this;return this.href&&this.syncAdapter.request.call(this.syncAdapter,
this.href).read(a).done(function(a){for(var a=b.parse(a),m=[],k=b._list.length,l=0;l<a.list.length;l++){for(var r=!1,g=0;g<k;g++)if(a.list[l].hash()==b._list[g].hash()){r=a.list[l];break}if(r)if(r.isDeleted())r._remove();else r.on("delete",function(){b.remove(this.hash())}).on("garbage",function(){this.desynced=!0});else b._list.push(a.list[l]),m.push(a.list[l])}b.desynced=!1;0===k?b.triggerHandler("read"):d(b).triggerHandler("update",[m])})},modelDataBuild:function(a){return a},parse:function(a){if(a.parsed)return a.parsed;
var b;b=a;if(!Array.isArray(a))for(c in a)if(d.isArray(a[c])){b=a[c];break}list=[];for(var c in b)list.push(this.modelDataBuild(new this.model(b[c])));a.parsed={list:list,total:a.total};return a.parsed},insert:function(a){this.desynced=!1;a instanceof v||(a=new this.model(a));this._list.push(a);a.hash();return a.sync(this.href)},off:function(a,b){d(this).off(a,b);return this},on:function(a,b,c){if(void 0===c)d(this).on(a,b);else d(this).on(a,function(){b.apply(c,arguments)});return this},trigger:function(a,
b){d(this).trigger(a,b);return this},triggerHandler:function(a,b){d(this).triggerHandler(a,b);return this}};y.extend=O=function(a){a=Class.extend.call(this,a);a.extend=O;B&&B.register&&(y[B.register]=a);return a};var F=Class.extend({getProperty:function(a){return!this[a]?null:"function"===typeof this[a]?this[a]():this[a]}}).extend({tagName:"div",attributes:{className:"",id:""},namespace:"view",_constructor:function(a,b){d.extend(this,a);b=d.extend({},{init:!0,events:!0,ensure:!0},b);b.ensure&&this._ensureElement();
b.init&&this.init.apply(this,arguments);b.events&&this.delegateEvents()},_ensureElement:function(){var a=this.attributes.className,b=this.attributes.id,c="";d(this.el).length?this.el=d(this.el):("string"===d.type(this.el)&&("."==this.el[0]&&(a+=this.el.substr(0,1)),"#"==this.el[0]&&(b=this.el.substr(0,1))),c="<"+this.tagName,""!==a&&(c=c+' class="'+a+'"'),""!==b&&(c=c+' id="'+b+'"'),c=c+"></"+this.tagName+">",this.el=d(c))},init:function(){return this},resetEvents:function(){this.undelegateEvents();
this.delegateEvents()},delegateEvents:function(a){if(a||(a=this.getProperty("events")))for(var b in a){var c=a[b],m;for(m in c){var k=c[m];if("string"===typeof k&&d.isFunction(this[k]))d(this.el).on(this.getEvent(m),b,this[k].bind(this))}}},getEvent:function(a){return a+this.getNamespace()},getNamespace:function(){return"."+this.getProperty("namespace")},undelegateEvents:function(){d(this.el).off(this.getProperty("namespace"))},render:function(){this.delegateEvents();return this},remove:function(){d(this.el).remove();
this.destroy();return this},destroy:function(){this.model&&this.model.trigger("destroy");this.collection&&this.collection.trigger("destroy");return this},checkElement:function(){return void 0===this.el?!1:void 0!==this.el.selector&&""!=this.el.selector?1===d(this.el.selector).length:1===d(this.el).length},setElement:function(a){this.undelegateEvents();var a=d(a),b=this.el.data();this.el.replaceWith(a);this.el=a;this.el.data(b);this.delegateEvents();return this},resetElement:function(a){this.el=d(a);
this._ensureElement();this.delegateEvents()}}),P=v,H=y,A=d.extend({},A,{reset:function(){try{this.options.headers&&this.options.headers["X-Filter"]&&delete this.options.headers["X-Filter"],this.options&&(this.options.data&&this.options.data["startEx.CId"])&&delete this.options.data["startEx.CId"]}catch(a){}}}),I=d.extend({},A,{options:{headers:{Authorization:localStorage.getItem("superdesk.login.session")}},href:function(a){return-1===a.indexOf("my/")?a.replace("resources/","resources/my/"):a}}),
C=function(){this.syncAdapter.options.headers||(this.syncAdapter.options.headers={});this.syncAdapter.options.headers["X-Filter"]=1<arguments.length?d.makeArray(arguments).join(","):d.isArray(arguments[0])?arguments[0].join(","):arguments[0];return this},D=function(a){d.extend(this.options,{data:{"startEx.CId":a}})},v=P.extend({isDeleted:function(){return this._forDelete||this.data.DeletedOn},syncAdapter:A,xfilter:C,since:D}),U=v.extend({syncAdapter:I,xfilter:C,since:D}),y=H.extend({xfilter:C,since:D,
syncAdapter:A}),H=y.extend({xfilter:C,since:D,syncAdapter:I});v.extend=function(){var a=P.extend.apply(this,arguments),b=new L;d.extend(a.prototype,{_uniq:b,pushUnique:function(){return b.set(this.hash(),this)}},arguments[0]);return a};d.gizmo={Model:v,AuthModel:U,Collection:y,AuthCollection:H,Sync:A,AuthSync:I,View:F,Url:M,Register:K};u.preLoad(l)})(jQuery)};function isOnly(l,u){var d=0;for(i in l)if(d++,1<d)return!1;return void 0!==l&&void 0!==l[u]&&1==d}
window.livedesk.init=function(){window.livedesk.location=window.location.href.split("#")[0];var l=this,u=!1,d=!1;contentPath=void 0===l.contentPath?"":l.contentPath;"undefined"==typeof jQuery?u=!0:1.7>parseFloat($().jquery)&&(d=u=!0);u?l.loadScript("//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",function(){"undefined"==typeof $.gizmo?l.loadGizmo(d):l.preLoad(d)}):"undefined"==typeof $.gizmo?l.loadGizmo(d):l.preLoad(d)};
window.livedesk.loadScript=function(l,u){var d=document.createElement("script");d.type="text/javascript";d.readyState?d.onreadystatechange=function(){if("loaded"==d.readyState||"complete"==d.readyState)d.onreadystatechange=null,u()}:d.onload=function(){u()};d.src=l;document.getElementsByTagName("head")[0].appendChild(d)};window.livedesk.preLoad=function(l){l?(l=$.noConflict(!0),this.startLoading(l)):this.startLoading(jQuery)};
window.livedesk.startLoading=function(l){var u=l.gizmo.Model.extend({}),u=l.gizmo.Model.extend({defaults:{Creator:u},services:{flickr:!0,google:!0,twitter:!0,facebook:!0,youtube:!0},getClass:function(){switch(this.get("Type").Key){case "wrapup":return"wrapup";case "quote":return"quotation";case "advertisement":return"advertisement";default:return this.isService()?"service":"tw"}},isService:function(){return this.get("AuthorName")in this.services},isQuote:function(){return"quotation"==this.getClass()},
twitter:{link:{anchor:function(b){return b.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g,function(b){b=b.link(b);return b=b.replace('href="','target="_blank" href="')})},user:function(b){return b.replace(/[@]+[A-Za-z0-9-_]+/g,function(b){var d=b.replace("@",""),b=b.link("http://twitter.com/"+d);return b=b.replace('href="','target="_blank" onclick="loadProfile(\''+d+'\');return(false);"  href="')})},tag:function(b){return b.replace(/[#]+[A-Za-z0-9-_]+/g,function(b){var d=b.replace(" #",
" %23"),b=b.link("http://summize.com/search?q="+d);return b=b.replace('href="','target="_blank" href="')})},all:function(b){b=this.anchor(b);b=this.user(b);return b=this.tag(b)}}}});Posts=l.gizmo.Collection.extend({timeInterval:1E4,idInterval:0,_latestCId:0,setIdInterval:function(b){this.idInterval=setInterval(b,this.timeInterval);return this},getMaximumCid:function(b){d=0;for(count=b.list.length;d<count;d++){var m=parseInt(b.list[d].get("CId"));!isNaN(m)&&this._latestCId<m&&(this._latestCId=m)}},
xfilter:function(b){this.xfilter=b;return this},auto:function(){var b=this,d={data:{"cId.since":this._latestCId},headers:{"X-Filter":b.xfilter}};0===this._latestCId&&delete d.data;this.triggerHandler("beforeUpdate");l.gizmo.Collection.prototype.sync.call(this,d).done(function(d){b.getMaximumCid(b.parse(d))});return this},pause:function(){clearInterval(this.idInterval);return this},sync:function(){var b=this;this.auto().pause().setIdInterval(function(){b.auto()})}}).extend({model:u});Blog=l.gizmo.Model.extend({defaults:{PostPublished:Posts}});
var d=0,w=l.gizmo.View.extend({init:function(){var b=this;b.xfilter="DeletedOn, Order, Id, CId, Content, CreatedOn, Type, AuthorName, Author.Source.Name, Author.Source.Id, IsModified, AuthorPerson.EMail, AuthorPerson.FirstName, AuthorPerson.LastName, AuthorPerson.Id";b.model.on("read update",function(d,l){isOnly(this.data,"CId")||isOnly(l,"CId")?b.model.xfilter(b.xfilter).sync({force:!0}):b.render(d,l)}).on("delete",b.remove,b).xfilter(b.xfilter).sync()},remove:function(){this.tightkNots();this.el.remove();
return this},tightkNots:function(){void 0!==this.next&&(this.next.prev=this.prev);void 0!==this.prev&&(this.prev.next=this.next)},itemTemplate:function(b,d,l,n){var k="",q=b.getClass();b.get("AuthorName");var s="",t="";if(b.data.hasOwnProperty("Meta")){var p=b.data.Meta;"string"==typeof p&&(p=JSON.parse(p));p.hasOwnProperty("annotation")&&("string"===typeof p.annotation?t='<div class="editable annotation">'+p.annotation+"</div>":(s='<div class="editable annotation">'+p.annotation[0]+"</div>",t='<div class="editable annotation">'+
p.annotation[1]+"</div>"))}avatarString="";0<n.length&&(avatarString='<figure><img src="'+n+'" ></figure>');switch(q){case "tw":case "service":k=k+s+avatarString;k+='<div class="result-content">';k+='<div class="result-text">'+d+"</div>";k+='<p class="attributes"><i class="source-icon"></i> by '+b.get("AuthorName");k+="<time>"+l+"</time>";k+="</p>";k+="</div>";k+=t;break;case "quotation":k+=avatarString;k+='<div class="result-content">';k+='<div class="result-text">'+d+"</div>";k+='<p class="attributes">by '+
b.get("AuthorName");k+="<time>"+l+"</time>";k+="</p>";k+="</div>";break;case "wrapup":k+='<span class="big-toggle"></span>';k+="<h3>"+d+"</h3>";break;case "advertisement":k+=d}return k},toggleWrap:function(b,d){"boolean"!=typeof d&&(d=!1);this._toggleWrap(l(b).closest("li").first(),d)},_toggleWrap:function(b,d){"boolean"!=typeof d&&(d=!1);if(b.hasClass("open")){var r=!0,p=window.location.hash;0<p.length&&!1==d&&b.nextUntil(".wrapup").each(function(){"#"+l(this).find("a").attr("name")==p&&(r=!1)});
r&&(b.removeClass("open").addClass("closed"),b.nextUntil(".wrapup").hide())}else b.removeClass("closed").addClass("open"),b.nextUntil(".wrapup").show()},togglePermalink:function(b){this._togglePermalink(l(b).next('input[data-type="permalink"]'))},_togglePermalink:function(b){"visible"==b.css("visibility")?b.css("visibility","hidden"):b.css("visibility","visible")},render:function(){p++;var b=this,d=parseFloat(b.model.get("Order")),r="";this.model.get("AuthorPerson")&&this.model.get("AuthorPerson").EMail&&
(r=l.avatar.get(b.model.get("AuthorPerson").EMail));if(!isNaN(b.order)&&d!=b.order){for(var n={prev:1,next:-1},k={prev:"next",next:"prev"},q=0<b.order-d?"next":"prev",s=b[q];void 0!==s[q]&&s[q].order*n[q]<d*n[q];s=s[q]);n=s[q];void 0!==n&&(n[k[q]]=b);s[q]=b;b.tightkNots();b[q]=n;b[k[q]]=s;b.el[{prev:"insertBefore",next:"insertAfter"}[q]](s.el)}b.order=d;k=b.model.get("Content");d="";"wrapup"==b.model.getClass()&&(d+="open ");b.model.isService()&&(d+=b.model.get("AuthorName"),q=JSON.parse(b.model.get("Meta")),
s=b.model.get("PublishedOn"),s=new Date(s),s=s.format("ddd mmm dd yyyy HH:MM:ss TT"),"flickr"==b.model.get("AuthorName")?(k=l("<span>"+k+"</span>"),k.find("img").attr("src",k.find("a").attr("href")),k=k.html()):"twitter"==b.model.get("AuthorName")?(r=q.profile_image_url,k=b.model.twitter.link.all(k)):"google"==b.model.get("AuthorName")&&q.tbUrl&&(k+='<p><a href="'+q.url+'"><img src="'+q.tbUrl+'" height="'+q.tbHeight+'" width="'+q.tbWidth+'"></a></p>'));s=b.model.get("PublishedOn");s=new Date(s);s=
s.format("ddd mmm dd yyyy HH:MM:ss TT");b.model.get("AuthorName");k=b.itemTemplate(b.model,k,s,r);q=b.model.get("Id");r=b._parent.model.get("Title");r=r.replace(/ /g,"-");r=q+"-"+encodeURI(r);r=q;q=b.model.getClass();s=window.livedesk.location+"#"+r;n="";"advertisement"!==q&&"wrapup"!==q&&(n='<a rel="bookmark" href="#'+r+'">#</a><input type="text" value="'+s+'" style="visibility:hidden" data-type="permalink" />');b.setElement('<li class="'+d+q+'"><a name="'+r+'"></a>'+k+"&nbsp;"+n+"</li>");b.model.triggerHandler("rendered");
l(b.el).off("click.view",".big-toggle").on("click.view",".big-toggle",function(){b.toggleWrap(this,!0)});l(b.el).off("click",'a[rel="bookmark"]').on("click",'a[rel="bookmark"]',function(){b.togglePermalink(this)});l(b.el).off("click",'input[data-type="permalink"]').on("focus",'input[data-type="permalink"]',function(){this.select()})}}),n=0,t=0,p=0,u=l.gizmo.View.extend({el:"#livedesk-root",timeInterval:1E4,idInterval:0,_latestCId:0,setIdInterval:function(b){this.idInterval=setInterval(b,this.timeInterval);
return this},pause:function(){clearInterval(this.idInterval);return this},sync:function(){var b=this;this.auto().pause().setIdInterval(function(){b.auto()})},auto:function(){this.model.xfilter().sync({force:!0});return this},ensureStatus:function(){if(this.model.get("ClosedOn")){var b=new Date(this.model.get("ClosedOn"));this.pause();this.model.get("PostPublished").pause();this.el.find("#liveblog-status").html("The liveblog coverage was stopped "+b.format("mm/dd/yyyy HH:MM:ss"))}},gotoHash:function(){if(0<
location.hash.length){var b=location.hash;location.hash="";location.hash=b}},init:function(){var b=this;b.rendered=!1;"string"===l.type(b.url)&&(b.model=new Blog(b.url.replace("my/","")));b.model.on("read",function(){b.rendered||b.model.get("PostPublished").on("read",b.render,b).on("update",b.addAll,b).on("beforeUpdate",b.updateingStatus,b).xfilter("PublishedOn, DeletedOn, Order, Id, CId, Content, CreatedOn, Type, AuthorName, Author.Source.Name, Author.Source.Id, IsModified, AuthorPerson.EMail, AuthorPerson.FirstName, AuthorPerson.LastName, AuthorPerson.Id").sync();
b.rendered=!0}).on("update",function(){b.ensureStatus();b.renderBlog()});b.sync()},addOne:function(b){current=new w({model:b,_parent:this});this.el.find("#liveblog-post-list").prepend(current.el);current.next=this._latest;void 0!==this._latest&&(this._latest.prev=current);return this._latest=current},addAll:function(b,d){for(var l=d.length;l--;)this.addOne(d[l]);this.updateStatus()},updateingStatus:function(){this.el.find("#liveblog-status").html("updating...")},updateStatus:function(){var b=new Date;
this.el.find("#liveblog-status").fadeOut(function(){l(this).text("updated on "+b.format("HH:MM:ss")).fadeIn()})},renderBlog:function(){l(this.el).find("article").find("p").text(this.model.get("Description"))},loadTrace:function(){p>=n&&(this.gotoHash(),clearInterval(t))},render:function(){this.el.html('<article><h2></h2><p></p></article><div class="live-blog"><p class="update-time" id="liveblog-status"></p><div id="liveblog-posts"><ol id="liveblog-post-list" class="liveblog-post-list"></ol></div><div>');
this.renderBlog();this.ensureStatus();data=this.model.get("PostPublished")._list;var b=data.length;n=data.length;var d=this,l;t=setInterval(function(){d.loadTrace()},900);this.views=[];for(this.renderedTotal=b;b--;)data[b].on("rendered",this.renderedOn,this),l=this.addOne(data[b]),this.views.push(l)},renderedOn:function(){this.renderedTotal--;this.renderedTotal||this.closeAllButFirstWrapup()},closeAllButFirstWrapup:function(b){b=this.views;b.reverse();for(var d=0;d<b.length;d++)l(b[d].el).hasClass("wrapup")&&
b[d]._toggleWrap(l(b[d].el))}});window.livedesk.TimelineView=u;window.livedesk.callback()};window.livedesk.init();
