"use strict";function LruSet(e,t,n,r,i){return this instanceof LruSet?(t=t||1/0,n=n||Object.equals,r=r||Object.hash,i=i||Function.noop,this.store=new Set(void 0,n,r),this.contentEquals=n,this.contentHash=r,this.getDefault=i,this.capacity=t,this.length=0,this.addEach(e),void 0):new LruSet(e,t,n,r,i)}var Shim=require("./shim"),Set=require("./set"),GenericCollection=require("./generic-collection"),GenericSet=require("./generic-set"),PropertyChanges=require("./listen/property-changes"),RangeChanges=require("./listen/range-changes");module.exports=LruSet,LruSet.LruSet=LruSet,Object.addEach(LruSet.prototype,GenericCollection.prototype),Object.addEach(LruSet.prototype,GenericSet.prototype),Object.addEach(LruSet.prototype,PropertyChanges.prototype),Object.addEach(LruSet.prototype,RangeChanges.prototype),LruSet.prototype.constructClone=function(e){return new this.constructor(e,this.capacity,this.contentEquals,this.contentHash,this.getDefault)},LruSet.prototype.has=function(e){return this.store.has(e)},LruSet.prototype.get=function(e,t){if(t)throw Error("LruSet#get does not support second argument: equals");return e=this.store.get(e),void 0!==e?(this.store["delete"](e),this.store.add(e)):e=this.getDefault(e),e},LruSet.prototype.add=function(e){var t,n=this.store.has(e),r=[],i=[];return n?(this.store["delete"](e),this.store.add(e)):this.capacity>0&&(r.push(e),this.length>=this.capacity&&(t=this.store.order.head.next,i.push(t.value)),this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(r,i,0),this.store.add(e),i.length>0&&this.store["delete"](t.value),this.length=this.length+r.length-i.length,this.dispatchesRangeChanges&&this.dispatchRangeChange(r,i,0)),r.length!==i.length},LruSet.prototype["delete"]=function(e,t){if(t)throw Error("LruSet#delete does not support second argument: equals");var n=this.store.has(e);return n&&(this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([],[e],0),this.store["delete"](e),this.length--,this.dispatchesRangeChanges&&this.dispatchRangeChange([],[e],0)),n},LruSet.prototype.one=function(){return this.length>0?this.store.one():void 0},LruSet.prototype.clear=function(){this.store.clear(),this.length=0},LruSet.prototype.reduce=function(e,t){var n=arguments[2],r=this.store,i=0;return r.reduce(function(t,r){return e.call(n,t,r,i++,this)},t,this)},LruSet.prototype.reduceRight=function(e,t){var n=arguments[2],r=this.store,i=this.length-1;return r.reduceRight(function(t,r){return e.call(n,t,r,i--,this)},t,this)},LruSet.prototype.iterate=function(){return this.store.iterate()};