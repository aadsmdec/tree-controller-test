montageDefine("abac2a8","sorted-map",{dependencies:["./shim","./sorted-set","./generic-collection","./generic-map","./listen/property-changes","sorted-map"],factory:function(e,t,n){"use strict";function r(e,t,n,a){return this instanceof r?(t=t||Object.equals,n=n||Object.compare,a=a||Function.noop,this.contentEquals=t,this.contentCompare=n,this.getDefault=a,this.store=new i(null,function(e,n){return t(e.key,n.key)},function(e,t){return n(e.key,t.key)}),this.length=0,this.addEach(e),void 0):new r(e,t,n,a)}e("./shim");var i=e("./sorted-set"),a=e("./generic-collection"),o=e("./generic-map"),s=e("./listen/property-changes");n.exports=r,r.SortedMap=r,Object.addEach(r.prototype,a.prototype),Object.addEach(r.prototype,o.prototype),Object.addEach(r.prototype,s.prototype),r.prototype.constructClone=function(e){return new this.constructor(e,this.contentEquals,this.contentCompare,this.getDefault)},r.prototype.log=function(e,t,n,r){t=t||this.logNode,this.store.log(e,function(e,n,r){t(e.value,n,r)},n,r)},r.prototype.logNode=function(e,t){t(" key: "+e.key),t(" value: "+e.value)}}});