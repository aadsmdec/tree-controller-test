"use strict";function MultiMap(e,t,n,r){return this instanceof MultiMap?(this.bucket=t||this.bucket,Map.call(this,e,n,r,function(e){var t=this.bucket();return Map.prototype.set.call(this,e,t),t}),void 0):new MultiMap(e,t,n,r)}var Map=require("./map");module.exports=MultiMap,MultiMap.MultiMap=MultiMap,MultiMap.prototype=Object.create(Map.prototype),MultiMap.prototype.constructor=MultiMap,MultiMap.prototype.constructClone=function(e){return new this.constructor(e,this.bucket,this.contentEquals,this.contentHash)},MultiMap.prototype.set=function(e,t){var n=this.get(e);n.swap(0,n.length,t)},MultiMap.prototype.bucket=function(){return[]};