montageDefine("abac2a8","shim-array",{dependencies:["./shim-function","./generic-collection","./generic-order","weak-map"],factory:function(e,t,n){"use strict";function r(e,t){Object.defineProperty(Array.prototype,e,{value:t,writable:!0,configurable:!0,enumerable:!1})}function i(e,t,n){this.array=e,this.start=null==t?0:t,this.end=n}e("./shim-function");var a=e("./generic-collection"),o=e("./generic-order"),s=e("weak-map");n.exports=Array;var l=Array.prototype.splice,c=Array.prototype.slice;Array.empty=[],Object.freeze&&Object.freeze(Array.empty),Array.from=function(e){var t=[];return t.addEach(e),t},Array.unzip=function(e){for(var t=[],n=1/0,r=0;e.length>r;r++){var i=e[r];e[r]=i.toArray(),n>i.length&&(n=i.length)}for(var r=0;e.length>r;r++)for(var i=e[r],a=0;i.length>a;a++)n>a&&a in i&&(t[a]=t[a]||[],t[a][r]=i[a]);return t},r("addEach",a.prototype.addEach),r("deleteEach",a.prototype.deleteEach),r("toArray",a.prototype.toArray),r("toObject",a.prototype.toObject),r("all",a.prototype.all),r("any",a.prototype.any),r("min",a.prototype.min),r("max",a.prototype.max),r("sum",a.prototype.sum),r("average",a.prototype.average),r("only",a.prototype.only),r("flatten",a.prototype.flatten),r("zip",a.prototype.zip),r("enumerate",a.prototype.enumerate),r("group",a.prototype.group),r("sorted",a.prototype.sorted),r("reversed",a.prototype.reversed),r("constructClone",function(e){var t=new this.constructor;return t.addEach(e),t}),r("has",function(e,t){return-1!==this.find(e,t)}),r("get",function(e,t){if(+e!==e)throw Error("Indicies must be numbers");return!e in this?t:this[e]}),r("set",function(e,t){return this.splice(e,1,t),!0}),r("add",function(e){return this.push(e),!0}),r("delete",function(e,t){var n=this.find(e,t);return-1!==n?(this.splice(n,1),!0):!1}),r("find",function(e,t){t=t||this.contentEquals||Object.equals;for(var n=0;this.length>n;n++)if(n in this&&t(this[n],e))return n;return-1}),r("findLast",function(e,t){t=t||this.contentEquals||Object.equals;var n=this.length;do if(n--,n in this&&t(this[n],e))return n;while(n>0);return-1}),r("swap",function(e,t,n){var r,i,a,o,s;if(n!==void 0){if(r=[e,t],Array.isArray(n)||(n=c.call(n)),a=0,i=n.length,1e3>i){for(a;i>a;a++)r[a+2]=n[a];return l.apply(this,r)}for(s=l.apply(this,r),a;i>a;){for(r=[e+a,0],o=2;1002>o&&i>a;o++,a++)r[o]=n[a];l.apply(this,r)}return s}return t!==void 0?l.call(this,e,t):e!==void 0?l.call(this,e):[]}),r("peek",function(){return this[0]}),r("poke",function(e){this.length>0&&(this[0]=e)}),r("peekBack",function(){return this.length>0?this[this.length-1]:void 0}),r("pokeBack",function(e){this.length>0&&(this[this.length-1]=e)}),r("one",function(){for(var e in this)if(Object.owns(this,e))return this[e]}),r("clear",function(){return this.length=0,this}),r("compare",function(e,t){t=t||Object.compare;var n,r,i,a,s;if(this===e)return 0;if(!e||!Array.isArray(e))return o.prototype.compare.call(this,e,t);for(r=Math.min(this.length,e.length),n=0;r>n;n++)if(n in this){if(!(n in e))return-1;if(i=this[n],a=e[n],s=t(i,a))return s}else if(n in e)return 1;return this.length-e.length}),r("equals",function(e,t){t=t||Object.equals;var n,r,i=0,a=this.length;if(this===e)return!0;if(!e||!Array.isArray(e))return o.prototype.equals.call(this,e);if(a!==e.length)return!1;for(;a>i;++i)if(i in this){if(!(i in e))return!1;if(n=this[i],r=e[i],!t(n,r))return!1}else if(i in e)return!1;return!0}),r("clone",function(e,t){if(null==e)e=1/0;else if(0===e)return this;if(t=t||new s,t.has(this))return t.get(this);var n=Array(this.length);t.set(this,n);for(var r in this)n[r]=Object.clone(this[r],e-1,t);return n}),r("iterate",function(e,t){return new i(this,e,t)}),r("Iterator",i),i.prototype.next=function(){if(this.start===(null==this.end?this.array.length:this.end))throw StopIteration;return this.array[this.start++]}}});