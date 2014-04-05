(function(e){if("function"==typeof bootstrap)bootstrap("promise",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=e}else Q=e()})(function(){"use strict";function e(e){return function(){return G.apply(e,arguments)}}function t(e){return e===Object(e)}function n(e){return"[object StopIteration]"===it(e)||e instanceof V}function i(e,t){if(W&&t.stack&&"object"==typeof e&&null!==e&&e.stack&&-1===e.stack.indexOf(at)){for(var n=[],i=t;i;i=i.source)i.stack&&n.unshift(i.stack);n.unshift(e.stack);var a=n.join("\n"+at+"\n");e.stack=r(a)}}function r(e){for(var t=e.split("\n"),n=[],i=0;t.length>i;++i){var r=t[i];o(r)||a(r)||!r||n.push(r)}return n.join("\n")}function a(e){return-1!==e.indexOf("(module.js:")||-1!==e.indexOf("(node.js:")}function s(e){var t=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(e);if(t)return[t[1],Number(t[2])];var n=/at ([^ ]+):(\d+):(?:\d+)$/.exec(e);if(n)return[n[1],Number(n[2])];var i=/.*@(.+):(\d+)$/.exec(e);return i?[i[1],Number(i[2])]:void 0}function o(e){var t=s(e);if(!t)return!1;var n=t[0],i=t[1];return n===Y&&i>=H&&ut>=i}function l(){if(W)try{throw Error()}catch(e){var t=e.stack.split("\n"),n=t[0].indexOf("@")>0?t[1]:t[2],i=s(n);if(!i)return;return Y=i[0],i[1]}}function c(e,t,n){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(t+" is deprecated, use "+n+" instead.",Error("").stack),e.apply(e,arguments)}}function u(e){return f(e)?e:_(e)?P(e):E(e)}function h(){function e(e){t=e,a.source=e,$(n,function(t,n){X(function(){e.promiseDispatch.apply(e,n)})},void 0),n=void 0,i=void 0}var t,n=[],i=[],r=et(h.prototype),a=et(m.prototype);if(a.promiseDispatch=function(e,r,a){var s=Z(arguments);n?(n.push(s),"when"===r&&a[1]&&i.push(a[1])):X(function(){t.promiseDispatch.apply(t,s)})},a.valueOf=c(function(){if(n)return a;var e=v(t);return f(e)&&(t=e),e},"valueOf","inspect"),a.inspect=function(){return t?t.inspect():{state:"pending"}},u.longStackSupport&&W)try{throw Error()}catch(s){a.stack=s.stack.substring(s.stack.indexOf("\n")+1)}return r.promise=a,r.resolve=function(n){t||e(u(n))},r.fulfill=function(n){t||e(E(n))},r.reject=function(n){t||e(S(n))},r.notify=function(e){t||$(i,function(t,n){X(function(){n(e)})},void 0)},r}function d(e){if("function"!=typeof e)throw new TypeError("resolver must be a function.");var t=h();try{e(t.resolve,t.reject,t.notify)}catch(n){t.reject(n)}return t.promise}function p(e){return d(function(t,n){for(var i=0,r=e.length;r>i;i++)u(e[i]).then(t,n)})}function m(e,t,n){void 0===t&&(t=function(e){return S(Error("Promise does not support operation: "+e))}),void 0===n&&(n=function(){return{state:"unknown"}});var i=et(m.prototype);if(i.promiseDispatch=function(n,r,a){var s;try{s=e[r]?e[r].apply(i,a):t.call(i,r,a)}catch(o){s=S(o)}n&&n(s)},i.inspect=n,n){var r=n();"rejected"===r.state&&(i.exception=r.reason),i.valueOf=c(function(){var e=n();return"pending"===e.state||"rejected"===e.state?i:e.value})}return i}function g(e,t,n,i){return u(e).then(t,n,i)}function v(e){if(f(e)){var t=e.inspect();if("fulfilled"===t.state)return t.value}return e}function f(e){return t(e)&&"function"==typeof e.promiseDispatch&&"function"==typeof e.inspect}function _(e){return t(e)&&"function"==typeof e.then}function b(e){return f(e)&&"pending"===e.inspect().state}function L(e){return!f(e)||"fulfilled"===e.inspect().state}function y(e){return f(e)&&"rejected"===e.inspect().state}function C(){lt||"undefined"==typeof window||window.Touch||!window.console||console.warn("[Q] Unhandled rejection reasons (should be empty):",st),lt=!0}function w(){for(var e=0;st.length>e;e++){var t=st[e];console.warn("Unhandled rejection reason:",t)}}function M(){st.length=0,ot.length=0,lt=!1,ct||(ct=!0,"undefined"!=typeof process&&process.on&&process.on("exit",w))}function x(e,t){ct&&(ot.push(e),t&&t.stack!==void 0?st.push(t.stack):st.push("(no stack) "+t),C())}function z(e){if(ct){var t=J(ot,e);-1!==t&&(ot.splice(t,1),st.splice(t,1))}}function S(e){var t=m({when:function(t){return t&&z(this),t?t(e):this}},function(){return this},function(){return{state:"rejected",reason:e}});return x(t,e),t}function E(e){return m({when:function(){return e},get:function(t){return e[t]},set:function(t,n){e[t]=n},"delete":function(t){delete e[t]},post:function(t,n){return null===t||void 0===t?e.apply(void 0,n):e[t].apply(e,n)},apply:function(t,n){return e.apply(t,n)},keys:function(){return nt(e)}},void 0,function(){return{state:"fulfilled",value:e}})}function P(e){var t=h();return X(function(){try{e.then(t.resolve,t.reject,t.notify)}catch(n){t.reject(n)}}),t.promise}function T(e){return m({isDef:function(){}},function(t,n){return I(e,t,n)},function(){return u(e).inspect()})}function D(e,t,n){return u(e).spread(t,n)}function O(e){return function(){function t(e,t){var s;if(rt){try{s=i[e](t)}catch(o){return S(o)}return s.done?s.value:g(s.value,r,a)}try{s=i[e](t)}catch(o){return n(o)?o.value:S(o)}return g(s,r,a)}var i=e.apply(this,arguments),r=t.bind(t,"next"),a=t.bind(t,"throw");return r()}}function A(e){u.done(u.async(e)())}function B(e){throw new V(e)}function k(e){return function(){return D([this,j(arguments)],function(t,n){return e.apply(t,n)})}}function I(e,t,n){return u(e).dispatch(t,n)}function j(e){return g(e,function(e){var t=0,n=h();return $(e,function(i,r,a){var s;f(r)&&"fulfilled"===(s=r.inspect()).state?e[a]=s.value:(++t,g(r,function(i){e[a]=i,0===--t&&n.resolve(e)},n.reject,function(e){n.notify({index:a,value:e})}))},void 0),0===t&&n.resolve(e),n.promise})}function R(e){return g(e,function(e){return e=Q(e,u),g(j(Q(e,function(e){return g(e,K,K)})),function(){return e})})}function N(e){return u(e).allSettled()}function F(e,t){return u(e).then(void 0,void 0,t)}function q(e,t){return u(e).nodeify(t)}var W=!1;try{throw Error()}catch(U){W=!!U.stack}var Y,V,H=l(),K=function(){},X=function(){function e(){for(;t.next;){t=t.next;var n=t.task;t.task=void 0;var r=t.domain;r&&(t.domain=void 0,r.enter());try{n()}catch(s){if(a)throw r&&r.exit(),setTimeout(e,0),r&&r.enter(),s;setTimeout(function(){throw s},0)}r&&r.exit()}i=!1}var t={task:void 0,next:null},n=t,i=!1,r=void 0,a=!1;if(X=function(e){n=n.next={task:e,domain:a&&process.domain,next:null},i||(i=!0,r())},"undefined"!=typeof process&&process.nextTick)a=!0,r=function(){process.nextTick(e)};else if("function"==typeof setImmediate)r="undefined"!=typeof window?setImmediate.bind(window,e):function(){setImmediate(e)};else if("undefined"!=typeof MessageChannel){var s=new MessageChannel;s.port1.onmessage=function(){r=o,s.port1.onmessage=e,e()};var o=function(){s.port2.postMessage(0)};r=function(){setTimeout(e,0),o()}}else r=function(){setTimeout(e,0)};return X}(),G=Function.call,Z=e(Array.prototype.slice),$=e(Array.prototype.reduce||function(e,t){var n=0,i=this.length;if(1===arguments.length)for(;;){if(n in this){t=this[n++];break}if(++n>=i)throw new TypeError}for(;i>n;n++)n in this&&(t=e(t,this[n],n));return t}),J=e(Array.prototype.indexOf||function(e){for(var t=0;this.length>t;t++)if(this[t]===e)return t;return-1}),Q=e(Array.prototype.map||function(e,t){var n=this,i=[];return $(n,function(r,a,s){i.push(e.call(t,a,s,n))},void 0),i}),et=Object.create||function(e){function t(){}return t.prototype=e,new t},tt=e(Object.prototype.hasOwnProperty),nt=Object.keys||function(e){var t=[];for(var n in e)tt(e,n)&&t.push(n);return t},it=e(Object.prototype.toString);V="undefined"!=typeof ReturnValue?ReturnValue:function(e){this.value=e};var rt;try{Function("(function* (){ yield 1; })"),rt=!0}catch(U){rt=!1}var at="From previous event:";u.resolve=u,u.nextTick=X,u.longStackSupport=!1,u.defer=h,h.prototype.makeNodeResolver=function(){var e=this;return function(t,n){t?e.reject(t):arguments.length>2?e.resolve(Z(arguments,1)):e.resolve(n)}},u.promise=d,u.passByCopy=function(e){return e},m.prototype.passByCopy=function(){return this},u.join=function(e,t){return u(e).join(t)},m.prototype.join=function(e){return u([this,e]).spread(function(e,t){if(e===t)return e;throw Error("Can't join: not the same: "+e+" "+t)})},u.race=p,m.prototype.race=function(){return this.then(u.race)},u.makePromise=m,m.prototype.toString=function(){return"[object Promise]"},m.prototype.then=function(e,t,n){function r(t){try{return"function"==typeof e?e(t):t}catch(n){return S(n)}}function a(e){if("function"==typeof t){i(e,o);try{return t(e)}catch(n){return S(n)}}return S(e)}function s(e){return"function"==typeof n?n(e):e}var o=this,l=h(),c=!1;return X(function(){o.promiseDispatch(function(e){c||(c=!0,l.resolve(r(e)))},"when",[function(e){c||(c=!0,l.resolve(a(e)))}])}),o.promiseDispatch(void 0,"when",[void 0,function(e){var t,n=!1;try{t=s(e)}catch(i){if(n=!0,!u.onerror)throw i;u.onerror(i)}n||l.notify(t)}]),l.promise},u.when=g,m.prototype.thenResolve=function(e){return this.then(function(){return e})},u.thenResolve=function(e,t){return u(e).thenResolve(t)},m.prototype.thenReject=function(e){return this.then(function(){throw e})},u.thenReject=function(e,t){return u(e).thenReject(t)},u.nearer=v,u.isPromise=f,u.isPromiseAlike=_,u.isPending=b,m.prototype.isPending=function(){return"pending"===this.inspect().state},u.isFulfilled=L,m.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},u.isRejected=y,m.prototype.isRejected=function(){return"rejected"===this.inspect().state};var st=[],ot=[],lt=!1,ct=!0;u.resetUnhandledRejections=M,u.getUnhandledReasons=function(){return st.slice()},u.stopUnhandledRejectionTracking=function(){M(),"undefined"!=typeof process&&process.on&&process.removeListener("exit",w),ct=!1},M(),u.reject=S,u.fulfill=E,u.master=T,u.spread=D,m.prototype.spread=function(e,t){return this.all().then(function(t){return e.apply(void 0,t)},t)},u.async=O,u.spawn=A,u["return"]=B,u.promised=k,u.dispatch=I,m.prototype.dispatch=function(e,t){var n=this,i=h();return X(function(){n.promiseDispatch(i.resolve,e,t)}),i.promise},u.get=function(e,t){return u(e).dispatch("get",[t])},m.prototype.get=function(e){return this.dispatch("get",[e])},u.set=function(e,t,n){return u(e).dispatch("set",[t,n])},m.prototype.set=function(e,t){return this.dispatch("set",[e,t])},u.del=u["delete"]=function(e,t){return u(e).dispatch("delete",[t])},m.prototype.del=m.prototype["delete"]=function(e){return this.dispatch("delete",[e])},u.mapply=u.post=function(e,t,n){return u(e).dispatch("post",[t,n])},m.prototype.mapply=m.prototype.post=function(e,t){return this.dispatch("post",[e,t])},u.send=u.mcall=u.invoke=function(e,t){return u(e).dispatch("post",[t,Z(arguments,2)])},m.prototype.send=m.prototype.mcall=m.prototype.invoke=function(e){return this.dispatch("post",[e,Z(arguments,1)])},u.fapply=function(e,t){return u(e).dispatch("apply",[void 0,t])},m.prototype.fapply=function(e){return this.dispatch("apply",[void 0,e])},u["try"]=u.fcall=function(e){return u(e).dispatch("apply",[void 0,Z(arguments,1)])},m.prototype.fcall=function(){return this.dispatch("apply",[void 0,Z(arguments)])},u.fbind=function(e){var t=u(e),n=Z(arguments,1);return function(){return t.dispatch("apply",[this,n.concat(Z(arguments))])}},m.prototype.fbind=function(){var e=this,t=Z(arguments);return function(){return e.dispatch("apply",[this,t.concat(Z(arguments))])}},u.keys=function(e){return u(e).dispatch("keys",[])},m.prototype.keys=function(){return this.dispatch("keys",[])},u.all=j,m.prototype.all=function(){return j(this)},u.allResolved=c(R,"allResolved","allSettled"),m.prototype.allResolved=function(){return R(this)},u.allSettled=N,m.prototype.allSettled=function(){return this.then(function(e){return j(Q(e,function(e){function t(){return e.inspect()}return e=u(e),e.then(t,t)}))})},u.fail=u["catch"]=function(e,t){return u(e).then(void 0,t)},m.prototype.fail=m.prototype["catch"]=function(e){return this.then(void 0,e)},u.progress=F,m.prototype.progress=function(e){return this.then(void 0,void 0,e)},u.fin=u["finally"]=function(e,t){return u(e)["finally"](t)},m.prototype.fin=m.prototype["finally"]=function(e){return e=u(e),this.then(function(t){return e.fcall().then(function(){return t})},function(t){return e.fcall().then(function(){throw t})})},u.done=function(e,t,n,i){return u(e).done(t,n,i)},m.prototype.done=function(e,t,n){var r=function(e){X(function(){if(i(e,a),!u.onerror)throw e;u.onerror(e)})},a=e||t||n?this.then(e,t,n):this;"object"==typeof process&&process&&process.domain&&(r=process.domain.bind(r)),a.then(void 0,r)},u.timeout=function(e,t,n){return u(e).timeout(t,n)},m.prototype.timeout=function(e,t){var n=h(),i=setTimeout(function(){n.reject(Error(t||"Timed out after "+e+" ms"))},e);return this.then(function(e){clearTimeout(i),n.resolve(e)},function(e){clearTimeout(i),n.reject(e)},n.notify),n.promise},u.delay=function(e,t){return void 0===t&&(t=e,e=void 0),u(e).delay(t)},m.prototype.delay=function(e){return this.then(function(t){var n=h();return setTimeout(function(){n.resolve(t)},e),n.promise})},u.nfapply=function(e,t){return u(e).nfapply(t)},m.prototype.nfapply=function(e){var t=h(),n=Z(e);return n.push(t.makeNodeResolver()),this.fapply(n).fail(t.reject),t.promise},u.nfcall=function(e){var t=Z(arguments,1);return u(e).nfapply(t)},m.prototype.nfcall=function(){var e=Z(arguments),t=h();return e.push(t.makeNodeResolver()),this.fapply(e).fail(t.reject),t.promise},u.nfbind=u.denodeify=function(e){var t=Z(arguments,1);return function(){var n=t.concat(Z(arguments)),i=h();return n.push(i.makeNodeResolver()),u(e).fapply(n).fail(i.reject),i.promise}},m.prototype.nfbind=m.prototype.denodeify=function(){var e=Z(arguments);return e.unshift(this),u.denodeify.apply(void 0,e)},u.nbind=function(e,t){var n=Z(arguments,2);return function(){function i(){return e.apply(t,arguments)}var r=n.concat(Z(arguments)),a=h();return r.push(a.makeNodeResolver()),u(i).fapply(r).fail(a.reject),a.promise}},m.prototype.nbind=function(){var e=Z(arguments,0);return e.unshift(this),u.nbind.apply(void 0,e)},u.nmapply=u.npost=function(e,t,n){return u(e).npost(t,n)},m.prototype.nmapply=m.prototype.npost=function(e,t){var n=Z(t||[]),i=h();return n.push(i.makeNodeResolver()),this.dispatch("post",[e,n]).fail(i.reject),i.promise},u.nsend=u.nmcall=u.ninvoke=function(e,t){var n=Z(arguments,2),i=h();return n.push(i.makeNodeResolver()),u(e).dispatch("post",[t,n]).fail(i.reject),i.promise},m.prototype.nsend=m.prototype.nmcall=m.prototype.ninvoke=function(e){var t=Z(arguments,1),n=h();return t.push(n.makeNodeResolver()),this.dispatch("post",[e,t]).fail(n.reject),n.promise},u.nodeify=q,m.prototype.nodeify=function(e){return e?(this.then(function(t){X(function(){e(null,t)})},function(t){X(function(){e(t)})}),void 0):this};var ut=l();return u});