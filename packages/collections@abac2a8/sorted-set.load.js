montageDefine("abac2a8","sorted-set",{dependencies:["./shim","./generic-collection","./generic-set","./listen/property-changes","./listen/range-changes","./tree-log","sorted-set"],factory:function(e,t,n){"use strict";function r(e,t,n,i){return this instanceof r?(this.contentEquals=t||Object.equals,this.contentCompare=n||Object.compare,this.getDefault=i||Function.noop,this.root=null,this.length=0,this.addEach(e),void 0):new r(e,t,n,i)}function i(e){this.value=e,this.left=null,this.right=null,this.length=1}function a(e,t,n){if(this.set=e,this.prev=null,this.end=n,t){var r=this.set.findLeastGreaterThanOrEqual(t);r&&(this.set.splay(r.value),this.prev=r.getPrevious())}}n.exports=r,e("./shim");var o=e("./generic-collection"),s=e("./generic-set"),l=e("./listen/property-changes"),c=e("./listen/range-changes"),u=e("./tree-log");r.SortedSet=r,Object.addEach(r.prototype,o.prototype),Object.addEach(r.prototype,s.prototype),Object.addEach(r.prototype,l.prototype),Object.addEach(r.prototype,c.prototype),r.prototype.isSorted=!0,r.prototype.constructClone=function(e){return new this.constructor(e,this.contentEquals,this.contentCompare,this.getDefault)},r.prototype.has=function(e,t){if(t)throw Error("SortedSet#has does not support second argument: equals");return this.root?(this.splay(e),this.contentEquals(e,this.root.value)):!1},r.prototype.get=function(e,t){if(t)throw Error("SortedSet#get does not support second argument: equals");return this.root&&(this.splay(e),this.contentEquals(e,this.root.value))?this.root.value:this.getDefault(e)},r.prototype.add=function(e){var t=new this.Node(e);if(!this.root)return this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([e],[],0),this.root=t,this.length++,this.dispatchesRangeChanges&&this.dispatchRangeChange([e],[],0),!0;if(this.splay(e),!this.contentEquals(e,this.root.value)){var n=this.contentCompare(e,this.root.value);if(0===n)throw Error("SortedSet cannot contain incomparable but inequal values: "+e+" and "+this.root.value);return this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([e],[],this.root.index),0>n?(t.right=this.root,t.left=this.root.left,this.root.left=null,this.root.touch()):(t.left=this.root,t.right=this.root.right,this.root.right=null,this.root.touch()),t.touch(),this.root=t,this.length++,this.dispatchesRangeChanges&&this.dispatchRangeChange([e],[],this.root.index),!0}return!1},r.prototype["delete"]=function(e,t){if(t)throw Error("SortedSet#delete does not support second argument: equals");if(this.root&&(this.splay(e),this.contentEquals(e,this.root.value))){var n=this.root.index;if(this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([],[e],n),this.root.left){var r=this.root.right;this.root=this.root.left,this.splay(e),this.root.right=r}else this.root=this.root.right;return this.length--,this.root&&this.root.touch(),this.dispatchesRangeChanges&&this.dispatchRangeChange([],[e],n),!0}return!1},r.prototype.indexOf=function(e,t){if(t)throw Error("SortedSet#indexOf does not support second argument: startIndex");return this.root&&(this.splay(e),this.contentEquals(e,this.root.value))?this.root.index:-1},r.prototype.find=function(e,t,n){if(t)throw Error("SortedSet#find does not support second argument: equals");if(n)throw Error("SortedSet#find does not support third argument: index");return this.root&&(this.splay(e),this.contentEquals(e,this.root.value))?this.root:void 0},r.prototype.findGreatest=function(e){if(this.root){for(e=e||this.root;e.right;)e=e.right;return e}},r.prototype.findLeast=function(e){if(this.root){for(e=e||this.root;e.left;)e=e.left;return e}},r.prototype.findGreatestLessThanOrEqual=function(e){return this.root?(this.splay(e),this.root):void 0},r.prototype.findGreatestLessThan=function(e){return this.root?(this.splay(e),this.root.getPrevious()):void 0},r.prototype.findLeastGreaterThanOrEqual=function(e){if(this.root){this.splay(e);var t=this.contentCompare(e,this.root.value);return 0===t?this.root:this.root.getNext()}},r.prototype.findLeastGreaterThan=function(e){return this.root?(this.splay(e),this.contentCompare(e,this.root.value),this.root.getNext()):void 0},r.prototype.pop=function(){if(this.root){var e=this.findGreatest();return this["delete"](e.value),e.value}},r.prototype.shift=function(){if(this.root){var e=this.findLeast();return this["delete"](e.value),e.value}},r.prototype.push=function(){this.addEach(arguments)},r.prototype.unshift=function(){this.addEach(arguments)},r.prototype.slice=function(e,t){e=e||0,t=t||this.length,0>e&&(e+=this.length),0>t&&(t+=this.length);var n=[];if(this.root)for(this.splayIndex(e);t>this.root.index&&(n.push(this.root.value),this.root.right);)this.splay(this.root.getNext().value);return n},r.prototype.splice=function(e,t){return this.swap(e,t,Array.prototype.slice.call(arguments,2))},r.prototype.swap=function(e,t,n){if(void 0===e&&void 0===t)return[];e=e||0,0>e&&(e+=this.length),void 0===t&&(t=1/0);var r=[];if(this.root){this.splayIndex(e);for(var i=0;t>i;i++){r.push(this.root.value);var a=this.root.getNext();if(this["delete"](this.root.value),!a)break;this.splay(a.value)}}return this.addEach(n),r},r.prototype.splay=function(e){var t,n,r,a,o,s;if(this.root){for(t=n=r=new this.Node,s=new this.Node,o=this.root;;){var l=this.contentCompare(e,o.value);if(0>l){if(!o.left)break;if(0>this.contentCompare(e,o.left.value)&&(a=o.left,o.left=a.right,o.touch(),a.right=o,a.touch(),o=a,!o.left))break;a=new i,a.right=o,a.left=s.left,s.left=a,r.left=o,r.touch(),r=o,o=o.left}else{if(!(l>0))break;if(!o.right)break;if(this.contentCompare(e,o.right.value)>0&&(a=o.right,o.right=a.left,o.touch(),a.left=o,a.touch(),o=a,!o.right))break;a=new i,a.left=o,a.right=s.right,s.right=a,n.right=o,n.touch(),n=o,o=o.right}}for(n.right=o.left,n.touch(),r.left=o.right,r.touch(),o.left=t.right,o.right=t.left;s.left;)s.left.right.touch(),s.left=s.left.left;for(;s.right;)s.right.left.touch(),s.right=s.right.right;o.touch(),this.root=o}},r.prototype.splayIndex=function(e){if(this.root){for(var t=this.root,n=this.root.index;n!==e;)if(n>e&&t.left)t=t.left,n-=1+(t.right?t.right.length:0);else{if(!(e>n&&t.right))break;t=t.right,n+=1+(t.left?t.left.length:0)}return this.splay(t.value),this.root.index===e}return!1},r.prototype.reduce=function(e,t,n){return this.root&&(t=this.root.reduce(e,t,0,n,this)),t},r.prototype.reduceRight=function(e,t,n){return this.root&&(t=this.root.reduceRight(e,t,this.length-1,n,this)),t},r.prototype.min=function(e){var t=this.findLeast(e);return t?t.value:void 0},r.prototype.max=function(e){var t=this.findGreatest(e);return t?t.value:void 0},r.prototype.one=function(){return this.min()},r.prototype.clear=function(){var e;this.dispatchesRangeChanges&&(e=this.toArray(),this.dispatchBeforeRangeChange([],e,0)),this.root=null,this.length=0,this.dispatchesRangeChanges&&this.dispatchRangeChange([],e,0)},r.prototype.iterate=function(e,t){return new this.Iterator(this,e,t)},r.prototype.Iterator=a,r.prototype.summary=function(){return this.root?this.root.summary():"()"},r.prototype.log=function(e,t,n,r){e=e||u.unicodeRound,t=t||this.logNode,n||(n=console.log,r=console),n=n.bind(r),this.root&&this.root.log(e,t,n,n)},r.prototype.logNode=function(e,t){t(" "+e.value)},r.logCharsets=u,r.prototype.Node=i,i.prototype.reduce=function(e,t,n,r,i,a){if(a=a||0,this.left){var o=this.left.length;t=this.left.reduce(e,t,n,r,i,a+1),n+=o}return t=e.call(r,t,this.value,n,i,this,a),n+=1,this.right&&(t=this.right.reduce(e,t,n,r,i,a+1)),t},i.prototype.reduceRight=function(e,t,n,r,i,a){return a=a||0,this.right&&(t=this.right.reduce(e,t,n,r,i,a+1),n-=this.right.length),t=e.call(r,t,this.value,this.value,i,this,a),n-=1,this.left&&(t=this.left.reduce(e,t,n,r,i,a+1)),t},i.prototype.touch=function(){this.length=1+(this.left?this.left.length:0)+(this.right?this.right.length:0),this.index=this.left?this.left.length:0},i.prototype.checkIntegrity=function(){var e=1;if(e+=this.left?this.left.checkIntegrity():0,e+=this.right?this.right.checkIntegrity():0,this.length!==e)throw Error("Integrity check failed: "+this.summary());return e},i.prototype.getNext=function(){var e=this;if(e.right){for(e=e.right;e.left;)e=e.left;return e}},i.prototype.getPrevious=function(){var e=this;if(e.left){for(e=e.left;e.right;)e=e.right;return e}},i.prototype.summary=function(){var e=this.value||"-";return e+=" <"+this.length,this.left||this.right?"("+e+" "+(this.left?this.left.summary():"()")+", "+(this.right?this.right.summary():"()")+")":"("+e+")"},i.prototype.log=function(e,t,n,r){var i,a=this;i=this.left&&this.right?e.intersection:this.left?e.branchUp:this.right?e.branchDown:e.through;var o;this.left&&this.left.log(e,t,function(t){o?r(e.strafe+" "+t):(o=!0,r(e.fromBelow+e.through+t))},function(e){r("  "+e)});var s;t(this,function(t){s?n((a.right?e.strafe:" ")+t):(s=!0,n(i+t))},function(t){r((a.left?e.strafe:" ")+t)});var l;this.right&&this.right.log(e,t,function(t){l?n("  "+t):(l=!0,n(e.fromAbove+e.through+t))},function(t){n(e.strafe+" "+t)})},a.prototype.next=function(){var e;if(e=this.prev?this.set.findLeastGreaterThan(this.prev.value):this.set.findLeast(),!e)throw StopIteration;if(void 0!==this.end&&this.set.contentCompare(e.value,this.end)>=0)throw StopIteration;return this.prev=e,e.value}}});