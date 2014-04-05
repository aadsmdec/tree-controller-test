"use strict";function MapChanges(){throw Error("Can't construct. MapChanges is a mixin.")}var WeakMap=require("weak-map"),List=require("../list");module.exports=MapChanges;var object_owns=Object.prototype.hasOwnProperty,mapChangeDescriptors=new WeakMap;MapChanges.prototype.getAllMapChangeDescriptors=function(){var e=require("../dict");return mapChangeDescriptors.has(this)||mapChangeDescriptors.set(this,e()),mapChangeDescriptors.get(this)},MapChanges.prototype.getMapChangeDescriptor=function(e){var t=this.getAllMapChangeDescriptors();return e=e||"",t.has(e)||t.set(e,{willChangeListeners:new List,changeListeners:new List}),t.get(e)},MapChanges.prototype.addMapChangeListener=function(e,t,n){!this.isObservable&&this.makeObservable&&this.makeObservable();var r,i=this.getMapChangeDescriptor(t);r=n?i.willChangeListeners:i.changeListeners,r.push(e),Object.defineProperty(this,"dispatchesMapChanges",{value:!0,writable:!0,configurable:!0,enumerable:!1});var a=this;return function(){a&&(a.removeMapChangeListener(e,t,n),a=null)}},MapChanges.prototype.removeMapChangeListener=function(e,t,n){var r,i=this.getMapChangeDescriptor(t);r=n?i.willChangeListeners:i.changeListeners;var a=r.findLast(e);if(!a)throw Error("Can't remove map change listener: does not exist: token "+JSON.stringify(t));a["delete"]()},MapChanges.prototype.dispatchMapChange=function(e,t,n){var r=this.getAllMapChangeDescriptors(),i="Map"+(n?"WillChange":"Change");r.forEach(function(r,a){if(!r.isActive){r.isActive=!0;var o;o=n?r.willChangeListeners:r.changeListeners;var s="handle"+(a.slice(0,1).toUpperCase()+a.slice(1))+i;try{o.forEach(function(n){if(n[s])n[s](t,e,this);else{if(!n.call)throw Error("Handler "+n+" has no method "+s+" and is not callable");n.call(n,t,e,this)}},this)}finally{r.isActive=!1}}},this)},MapChanges.prototype.addBeforeMapChangeListener=function(e,t){return this.addMapChangeListener(e,t,!0)},MapChanges.prototype.removeBeforeMapChangeListener=function(e,t){return this.removeMapChangeListener(e,t,!0)},MapChanges.prototype.dispatchBeforeMapChange=function(e,t){return this.dispatchMapChange(e,t,!0)};