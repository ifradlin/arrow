var xS=Object.defineProperty;var yS=(r,t,n)=>t in r?xS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var ce=(r,t,n)=>yS(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();var Dh={exports:{}},ll={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var K_;function SS(){if(K_)return ll;K_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,o,c){var h=null;if(c!==void 0&&(h=""+c),o.key!==void 0&&(h=""+o.key),"key"in o){c={};for(var f in o)f!=="key"&&(c[f]=o[f])}else c=o;return o=c.ref,{$$typeof:r,type:a,key:h,ref:o!==void 0?o:null,props:c}}return ll.Fragment=t,ll.jsx=n,ll.jsxs=n,ll}var Q_;function MS(){return Q_||(Q_=1,Dh.exports=SS()),Dh.exports}var v=MS(),Uh={exports:{}},ge={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $_;function bS(){if($_)return ge;$_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),g=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=g&&N[g]||N["@@iterator"],typeof N=="function"?N:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,T={};function S(N,it,Tt){this.props=N,this.context=it,this.refs=T,this.updater=Tt||M}S.prototype.isReactComponent={},S.prototype.setState=function(N,it){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,it,"setState")},S.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function y(){}y.prototype=S.prototype;function F(N,it,Tt){this.props=N,this.context=it,this.refs=T,this.updater=Tt||M}var O=F.prototype=new y;O.constructor=F,b(O,S.prototype),O.isPureReactComponent=!0;var U=Array.isArray,H={H:null,A:null,T:null,S:null},L=Object.prototype.hasOwnProperty;function z(N,it,Tt,Dt,J,mt){return Tt=mt.ref,{$$typeof:r,type:N,key:it,ref:Tt!==void 0?Tt:null,props:mt}}function P(N,it){return z(N.type,it,void 0,void 0,void 0,N.props)}function w(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function A(N){var it={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Tt){return it[Tt]})}var k=/\/+/g;function lt(N,it){return typeof N=="object"&&N!==null&&N.key!=null?A(""+N.key):it.toString(36)}function $(){}function ot(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then($,$):(N.status="pending",N.then(function(it){N.status==="pending"&&(N.status="fulfilled",N.value=it)},function(it){N.status==="pending"&&(N.status="rejected",N.reason=it)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function ft(N,it,Tt,Dt,J){var mt=typeof N;(mt==="undefined"||mt==="boolean")&&(N=null);var bt=!1;if(N===null)bt=!0;else switch(mt){case"bigint":case"string":case"number":bt=!0;break;case"object":switch(N.$$typeof){case r:case t:bt=!0;break;case _:return bt=N._init,ft(bt(N._payload),it,Tt,Dt,J)}}if(bt)return J=J(N),bt=Dt===""?"."+lt(N,0):Dt,U(J)?(Tt="",bt!=null&&(Tt=bt.replace(k,"$&/")+"/"),ft(J,it,Tt,"",function(jt){return jt})):J!=null&&(w(J)&&(J=P(J,Tt+(J.key==null||N&&N.key===J.key?"":(""+J.key).replace(k,"$&/")+"/")+bt)),it.push(J)),1;bt=0;var Rt=Dt===""?".":Dt+":";if(U(N))for(var Ut=0;Ut<N.length;Ut++)Dt=N[Ut],mt=Rt+lt(Dt,Ut),bt+=ft(Dt,it,Tt,mt,J);else if(Ut=x(N),typeof Ut=="function")for(N=Ut.call(N),Ut=0;!(Dt=N.next()).done;)Dt=Dt.value,mt=Rt+lt(Dt,Ut++),bt+=ft(Dt,it,Tt,mt,J);else if(mt==="object"){if(typeof N.then=="function")return ft(ot(N),it,Tt,Dt,J);throw it=String(N),Error("Objects are not valid as a React child (found: "+(it==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":it)+"). If you meant to render a collection of children, use an array instead.")}return bt}function G(N,it,Tt){if(N==null)return N;var Dt=[],J=0;return ft(N,Dt,"","",function(mt){return it.call(Tt,mt,J++)}),Dt}function nt(N){if(N._status===-1){var it=N._result;it=it(),it.then(function(Tt){(N._status===0||N._status===-1)&&(N._status=1,N._result=Tt)},function(Tt){(N._status===0||N._status===-1)&&(N._status=2,N._result=Tt)}),N._status===-1&&(N._status=0,N._result=it)}if(N._status===1)return N._result.default;throw N._result}var W=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var it=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(it))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)};function tt(){}return ge.Children={map:G,forEach:function(N,it,Tt){G(N,function(){it.apply(this,arguments)},Tt)},count:function(N){var it=0;return G(N,function(){it++}),it},toArray:function(N){return G(N,function(it){return it})||[]},only:function(N){if(!w(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},ge.Component=S,ge.Fragment=n,ge.Profiler=o,ge.PureComponent=F,ge.StrictMode=a,ge.Suspense=p,ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=H,ge.act=function(){throw Error("act(...) is not supported in production builds of React.")},ge.cache=function(N){return function(){return N.apply(null,arguments)}},ge.cloneElement=function(N,it,Tt){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var Dt=b({},N.props),J=N.key,mt=void 0;if(it!=null)for(bt in it.ref!==void 0&&(mt=void 0),it.key!==void 0&&(J=""+it.key),it)!L.call(it,bt)||bt==="key"||bt==="__self"||bt==="__source"||bt==="ref"&&it.ref===void 0||(Dt[bt]=it[bt]);var bt=arguments.length-2;if(bt===1)Dt.children=Tt;else if(1<bt){for(var Rt=Array(bt),Ut=0;Ut<bt;Ut++)Rt[Ut]=arguments[Ut+2];Dt.children=Rt}return z(N.type,J,void 0,void 0,mt,Dt)},ge.createContext=function(N){return N={$$typeof:h,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},ge.createElement=function(N,it,Tt){var Dt,J={},mt=null;if(it!=null)for(Dt in it.key!==void 0&&(mt=""+it.key),it)L.call(it,Dt)&&Dt!=="key"&&Dt!=="__self"&&Dt!=="__source"&&(J[Dt]=it[Dt]);var bt=arguments.length-2;if(bt===1)J.children=Tt;else if(1<bt){for(var Rt=Array(bt),Ut=0;Ut<bt;Ut++)Rt[Ut]=arguments[Ut+2];J.children=Rt}if(N&&N.defaultProps)for(Dt in bt=N.defaultProps,bt)J[Dt]===void 0&&(J[Dt]=bt[Dt]);return z(N,mt,void 0,void 0,null,J)},ge.createRef=function(){return{current:null}},ge.forwardRef=function(N){return{$$typeof:f,render:N}},ge.isValidElement=w,ge.lazy=function(N){return{$$typeof:_,_payload:{_status:-1,_result:N},_init:nt}},ge.memo=function(N,it){return{$$typeof:m,type:N,compare:it===void 0?null:it}},ge.startTransition=function(N){var it=H.T,Tt={};H.T=Tt;try{var Dt=N(),J=H.S;J!==null&&J(Tt,Dt),typeof Dt=="object"&&Dt!==null&&typeof Dt.then=="function"&&Dt.then(tt,W)}catch(mt){W(mt)}finally{H.T=it}},ge.unstable_useCacheRefresh=function(){return H.H.useCacheRefresh()},ge.use=function(N){return H.H.use(N)},ge.useActionState=function(N,it,Tt){return H.H.useActionState(N,it,Tt)},ge.useCallback=function(N,it){return H.H.useCallback(N,it)},ge.useContext=function(N){return H.H.useContext(N)},ge.useDebugValue=function(){},ge.useDeferredValue=function(N,it){return H.H.useDeferredValue(N,it)},ge.useEffect=function(N,it){return H.H.useEffect(N,it)},ge.useId=function(){return H.H.useId()},ge.useImperativeHandle=function(N,it,Tt){return H.H.useImperativeHandle(N,it,Tt)},ge.useInsertionEffect=function(N,it){return H.H.useInsertionEffect(N,it)},ge.useLayoutEffect=function(N,it){return H.H.useLayoutEffect(N,it)},ge.useMemo=function(N,it){return H.H.useMemo(N,it)},ge.useOptimistic=function(N,it){return H.H.useOptimistic(N,it)},ge.useReducer=function(N,it,Tt){return H.H.useReducer(N,it,Tt)},ge.useRef=function(N){return H.H.useRef(N)},ge.useState=function(N){return H.H.useState(N)},ge.useSyncExternalStore=function(N,it,Tt){return H.H.useSyncExternalStore(N,it,Tt)},ge.useTransition=function(){return H.H.useTransition()},ge.version="19.0.0",ge}var J_;function vp(){return J_||(J_=1,Uh.exports=bS()),Uh.exports}var At=vp(),Nh={exports:{}},cl={},Lh={exports:{}},Oh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tv;function ES(){return tv||(tv=1,(function(r){function t(G,nt){var W=G.length;G.push(nt);t:for(;0<W;){var tt=W-1>>>1,N=G[tt];if(0<o(N,nt))G[tt]=nt,G[W]=N,W=tt;else break t}}function n(G){return G.length===0?null:G[0]}function a(G){if(G.length===0)return null;var nt=G[0],W=G.pop();if(W!==nt){G[0]=W;t:for(var tt=0,N=G.length,it=N>>>1;tt<it;){var Tt=2*(tt+1)-1,Dt=G[Tt],J=Tt+1,mt=G[J];if(0>o(Dt,W))J<N&&0>o(mt,Dt)?(G[tt]=mt,G[J]=W,tt=J):(G[tt]=Dt,G[Tt]=W,tt=Tt);else if(J<N&&0>o(mt,W))G[tt]=mt,G[J]=W,tt=J;else break t}}return nt}function o(G,nt){var W=G.sortIndex-nt.sortIndex;return W!==0?W:G.id-nt.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var h=Date,f=h.now();r.unstable_now=function(){return h.now()-f}}var p=[],m=[],_=1,g=null,x=3,M=!1,b=!1,T=!1,S=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;function O(G){for(var nt=n(m);nt!==null;){if(nt.callback===null)a(m);else if(nt.startTime<=G)a(m),nt.sortIndex=nt.expirationTime,t(p,nt);else break;nt=n(m)}}function U(G){if(T=!1,O(G),!b)if(n(p)!==null)b=!0,ot();else{var nt=n(m);nt!==null&&ft(U,nt.startTime-G)}}var H=!1,L=-1,z=5,P=-1;function w(){return!(r.unstable_now()-P<z)}function A(){if(H){var G=r.unstable_now();P=G;var nt=!0;try{t:{b=!1,T&&(T=!1,y(L),L=-1),M=!0;var W=x;try{e:{for(O(G),g=n(p);g!==null&&!(g.expirationTime>G&&w());){var tt=g.callback;if(typeof tt=="function"){g.callback=null,x=g.priorityLevel;var N=tt(g.expirationTime<=G);if(G=r.unstable_now(),typeof N=="function"){g.callback=N,O(G),nt=!0;break e}g===n(p)&&a(p),O(G)}else a(p);g=n(p)}if(g!==null)nt=!0;else{var it=n(m);it!==null&&ft(U,it.startTime-G),nt=!1}}break t}finally{g=null,x=W,M=!1}nt=void 0}}finally{nt?k():H=!1}}}var k;if(typeof F=="function")k=function(){F(A)};else if(typeof MessageChannel<"u"){var lt=new MessageChannel,$=lt.port2;lt.port1.onmessage=A,k=function(){$.postMessage(null)}}else k=function(){S(A,0)};function ot(){H||(H=!0,k())}function ft(G,nt){L=S(function(){G(r.unstable_now())},nt)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(G){G.callback=null},r.unstable_continueExecution=function(){b||M||(b=!0,ot())},r.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<G?Math.floor(1e3/G):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_getFirstCallbackNode=function(){return n(p)},r.unstable_next=function(G){switch(x){case 1:case 2:case 3:var nt=3;break;default:nt=x}var W=x;x=nt;try{return G()}finally{x=W}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(G,nt){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var W=x;x=G;try{return nt()}finally{x=W}},r.unstable_scheduleCallback=function(G,nt,W){var tt=r.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?tt+W:tt):W=tt,G){case 1:var N=-1;break;case 2:N=250;break;case 5:N=1073741823;break;case 4:N=1e4;break;default:N=5e3}return N=W+N,G={id:_++,callback:nt,priorityLevel:G,startTime:W,expirationTime:N,sortIndex:-1},W>tt?(G.sortIndex=W,t(m,G),n(p)===null&&G===n(m)&&(T?(y(L),L=-1):T=!0,ft(U,W-tt))):(G.sortIndex=N,t(p,G),b||M||(b=!0,ot())),G},r.unstable_shouldYield=w,r.unstable_wrapCallback=function(G){var nt=x;return function(){var W=x;x=nt;try{return G.apply(this,arguments)}finally{x=W}}}})(Oh)),Oh}var ev;function TS(){return ev||(ev=1,Lh.exports=ES()),Lh.exports}var Ph={exports:{}},Xn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nv;function AS(){if(nv)return Xn;nv=1;var r=vp();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)m+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(p,m,_){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:g==null?null:""+g,children:p,containerInfo:m,implementation:_}}var h=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function f(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Xn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Xn.createPortal=function(p,m){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,_)},Xn.flushSync=function(p){var m=h.T,_=a.p;try{if(h.T=null,a.p=2,p)return p()}finally{h.T=m,a.p=_,a.d.f()}},Xn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,a.d.C(p,m))},Xn.prefetchDNS=function(p){typeof p=="string"&&a.d.D(p)},Xn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var _=m.as,g=f(_,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;_==="style"?a.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:M}):_==="script"&&a.d.X(p,{crossOrigin:g,integrity:x,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Xn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var _=f(m.as,m.crossOrigin);a.d.M(p,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&a.d.M(p)},Xn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var _=m.as,g=f(_,m.crossOrigin);a.d.L(p,_,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Xn.preloadModule=function(p,m){if(typeof p=="string")if(m){var _=f(m.as,m.crossOrigin);a.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else a.d.m(p)},Xn.requestFormReset=function(p){a.d.r(p)},Xn.unstable_batchedUpdates=function(p,m){return p(m)},Xn.useFormState=function(p,m,_){return h.H.useFormState(p,m,_)},Xn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Xn.version="19.0.0",Xn}var iv;function wS(){if(iv)return Ph.exports;iv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Ph.exports=AS(),Ph.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var av;function RS(){if(av)return cl;av=1;var r=TS(),t=vp(),n=wS();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}var c=Symbol.for("react.element"),h=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),m=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),x=Symbol.for("react.consumer"),M=Symbol.for("react.context"),b=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),y=Symbol.for("react.memo"),F=Symbol.for("react.lazy"),O=Symbol.for("react.offscreen"),U=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function L(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var z=Symbol.for("react.client.reference");function P(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===z?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case p:return"Fragment";case f:return"Portal";case _:return"Profiler";case m:return"StrictMode";case T:return"Suspense";case S:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case M:return(e.displayName||"Context")+".Provider";case x:return(e._context.displayName||"Context")+".Consumer";case b:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case y:return i=e.displayName||null,i!==null?i:P(e.type)||"Memo";case F:i=e._payload,e=e._init;try{return P(e(i))}catch{}}return null}var w=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A=Object.assign,k,lt;function $(e){if(k===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);k=i&&i[1]||"",lt=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+k+e+lt}var ot=!1;function ft(e,i){if(!e||ot)return"";ot=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var Mt=function(){throw Error()};if(Object.defineProperty(Mt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Mt,[])}catch(dt){var ut=dt}Reflect.construct(e,[],Mt)}else{try{Mt.call()}catch(dt){ut=dt}e.call(Mt.prototype)}}else{try{throw Error()}catch(dt){ut=dt}(Mt=e())&&typeof Mt.catch=="function"&&Mt.catch(function(){})}}catch(dt){if(dt&&ut&&typeof dt.stack=="string")return[dt.stack,ut.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=l.DetermineComponentFrameRoot(),E=d[0],D=d[1];if(E&&D){var I=E.split(`
`),Z=D.split(`
`);for(u=l=0;l<I.length&&!I[l].includes("DetermineComponentFrameRoot");)l++;for(;u<Z.length&&!Z[u].includes("DetermineComponentFrameRoot");)u++;if(l===I.length||u===Z.length)for(l=I.length-1,u=Z.length-1;1<=l&&0<=u&&I[l]!==Z[u];)u--;for(;1<=l&&0<=u;l--,u--)if(I[l]!==Z[u]){if(l!==1||u!==1)do if(l--,u--,0>u||I[l]!==Z[u]){var pt=`
`+I[l].replace(" at new "," at ");return e.displayName&&pt.includes("<anonymous>")&&(pt=pt.replace("<anonymous>",e.displayName)),pt}while(1<=l&&0<=u);break}}}finally{ot=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?$(s):""}function G(e){switch(e.tag){case 26:case 27:case 5:return $(e.type);case 16:return $("Lazy");case 13:return $("Suspense");case 19:return $("SuspenseList");case 0:case 15:return e=ft(e.type,!1),e;case 11:return e=ft(e.type.render,!1),e;case 1:return e=ft(e.type,!0),e;default:return""}}function nt(e){try{var i="";do i+=G(e),e=e.return;while(e);return i}catch(s){return`
Error generating stack: `+s.message+`
`+s.stack}}function W(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function tt(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function N(e){if(W(e)!==e)throw Error(a(188))}function it(e){var i=e.alternate;if(!i){if(i=W(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,l=i;;){var u=s.return;if(u===null)break;var d=u.alternate;if(d===null){if(l=u.return,l!==null){s=l;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===s)return N(u),e;if(d===l)return N(u),i;d=d.sibling}throw Error(a(188))}if(s.return!==l.return)s=u,l=d;else{for(var E=!1,D=u.child;D;){if(D===s){E=!0,s=u,l=d;break}if(D===l){E=!0,l=u,s=d;break}D=D.sibling}if(!E){for(D=d.child;D;){if(D===s){E=!0,s=d,l=u;break}if(D===l){E=!0,l=d,s=u;break}D=D.sibling}if(!E)throw Error(a(189))}}if(s.alternate!==l)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function Tt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=Tt(e),i!==null)return i;e=e.sibling}return null}var Dt=Array.isArray,J=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,mt={pending:!1,data:null,method:null,action:null},bt=[],Rt=-1;function Ut(e){return{current:e}}function jt(e){0>Rt||(e.current=bt[Rt],bt[Rt]=null,Rt--)}function Ht(e,i){Rt++,bt[Rt]=e.current,e.current=i}var ve=Ut(null),ne=Ut(null),Re=Ut(null),j=Ut(null);function dn(e,i){switch(Ht(Re,i),Ht(ne,e),Ht(ve,null),e=i.nodeType,e){case 9:case 11:i=(i=i.documentElement)&&(i=i.namespaceURI)?T_(i):0;break;default:if(e=e===8?i.parentNode:i,i=e.tagName,e=e.namespaceURI)e=T_(e),i=A_(e,i);else switch(i){case"svg":i=1;break;case"math":i=2;break;default:i=0}}jt(ve),Ht(ve,i)}function fe(){jt(ve),jt(ne),jt(Re)}function he(e){e.memoizedState!==null&&Ht(j,e);var i=ve.current,s=A_(i,e.type);i!==s&&(Ht(ne,e),Ht(ve,s))}function Yt(e){ne.current===e&&(jt(ve),jt(ne)),j.current===e&&(jt(j),il._currentValue=mt)}var Te=Object.prototype.hasOwnProperty,Wt=r.unstable_scheduleCallback,B=r.unstable_cancelCallback,R=r.unstable_shouldYield,at=r.unstable_requestPaint,gt=r.unstable_now,St=r.unstable_getCurrentPriorityLevel,vt=r.unstable_ImmediatePriority,Zt=r.unstable_UserBlockingPriority,Ct=r.unstable_NormalPriority,Gt=r.unstable_LowPriority,xe=r.unstable_IdlePriority,wt=r.log,kt=r.unstable_setDisableYieldValue,Jt=null,qt=null;function Ot(e){if(qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(Jt,e,void 0,(e.current.flags&128)===128)}catch{}}function se(e){if(typeof wt=="function"&&kt(e),qt&&typeof qt.setStrictMode=="function")try{qt.setStrictMode(Jt,e)}catch{}}var te=Math.clz32?Math.clz32:Bt,Ie=Math.log,K=Math.LN2;function Bt(e){return e>>>=0,e===0?32:31-(Ie(e)/K|0)|0}var ht=128,xt=4194304;function Nt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Pt(e,i){var s=e.pendingLanes;if(s===0)return 0;var l=0,u=e.suspendedLanes,d=e.pingedLanes,E=e.warmLanes;e=e.finishedLanes!==0;var D=s&134217727;return D!==0?(s=D&~u,s!==0?l=Nt(s):(d&=D,d!==0?l=Nt(d):e||(E=D&~E,E!==0&&(l=Nt(E))))):(D=s&~u,D!==0?l=Nt(D):d!==0?l=Nt(d):e||(E=s&~E,E!==0&&(l=Nt(E)))),l===0?0:i!==0&&i!==l&&(i&u)===0&&(u=l&-l,E=i&-i,u>=E||u===32&&(E&4194176)!==0)?i:l}function re(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function Ke(e,i){switch(e){case 1:case 2:case 4:case 8:return i+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ln(){var e=ht;return ht<<=1,(ht&4194176)===0&&(ht=128),e}function Ue(){var e=xt;return xt<<=1,(xt&62914560)===0&&(xt=4194304),e}function vn(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function an(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function xi(e,i,s,l,u,d){var E=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var D=e.entanglements,I=e.expirationTimes,Z=e.hiddenUpdates;for(s=E&~s;0<s;){var pt=31-te(s),Mt=1<<pt;D[pt]=0,I[pt]=-1;var ut=Z[pt];if(ut!==null)for(Z[pt]=null,pt=0;pt<ut.length;pt++){var dt=ut[pt];dt!==null&&(dt.lane&=-536870913)}s&=~Mt}l!==0&&Ki(e,l,0),d!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=d&~(E&~i))}function Ki(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var l=31-te(i);e.entangledLanes|=i,e.entanglements[l]=e.entanglements[l]|1073741824|s&4194218}function ci(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var l=31-te(s),u=1<<l;u&i|e[l]&i&&(e[l]|=i),s&=~u}}function Hn(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ua(){var e=J.p;return e!==0?e:(e=window.event,e===void 0?32:j_(e.type))}function Ts(e,i){var s=J.p;try{return J.p=e,i()}finally{J.p=s}}var kn=Math.random().toString(36).slice(2),pn="__reactFiber$"+kn,mn="__reactProps$"+kn,Pi="__reactContainer$"+kn,Fa="__reactEvents$"+kn,ui="__reactListeners$"+kn,Gn="__reactHandles$"+kn,Ia="__reactResources$"+kn,Yn="__reactMarker$"+kn;function zi(e){delete e[pn],delete e[mn],delete e[Fa],delete e[ui],delete e[Gn]}function C(e){var i=e[pn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[Pi]||s[pn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=C_(e);e!==null;){if(s=e[pn])return s;e=C_(e)}return i}e=s,s=e.parentNode}return null}function Y(e){if(e=e[pn]||e[Pi]){var i=e.tag;if(i===5||i===6||i===13||i===26||i===27||i===3)return e}return null}function ct(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function rt(e){var i=e[Ia];return i||(i=e[Ia]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function X(e){e[Yn]=!0}var Et=new Set,zt={};function Ft(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(zt[e]=i,e=0;e<i.length;e++)Et.add(i[e])}var Qt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),le=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ee={},Se={};function Ce(e){return Te.call(Se,e)?!0:Te.call(ee,e)?!1:le.test(e)?Se[e]=!0:(ee[e]=!0,!1)}function Ge(e,i,s){if(Ce(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function He(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function ue(e,i,s,l){if(l===null)e.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+l)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function sn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function V(e){var i=sn(e)?"checked":"value",s=Object.getOwnPropertyDescriptor(e.constructor.prototype,i),l=""+e[i];if(!e.hasOwnProperty(i)&&typeof s<"u"&&typeof s.get=="function"&&typeof s.set=="function"){var u=s.get,d=s.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(E){l=""+E,d.call(this,E)}}),Object.defineProperty(e,i,{enumerable:s.enumerable}),{getValue:function(){return l},setValue:function(E){l=""+E},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function _t(e){e._valueTracker||(e._valueTracker=V(e))}function Kt(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return e&&(l=sn(e)?e.checked?"true":"false":e.value),e=l,e!==s?(i.setValue(e),!0):!1}function me(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ae=/[\n"\\]/g;function ie(e){return e.replace(Ae,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Le(e,i,s,l,u,d,E,D){e.name="",E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.type=E:e.removeAttribute("type"),i!=null?E==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+Vt(i)):e.value!==""+Vt(i)&&(e.value=""+Vt(i)):E!=="submit"&&E!=="reset"||e.removeAttribute("value"),i!=null?Ve(e,E,Vt(i)):s!=null?Ve(e,E,Vt(s)):l!=null&&e.removeAttribute("value"),u==null&&d!=null&&(e.defaultChecked=!!d),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?e.name=""+Vt(D):e.removeAttribute("name")}function en(e,i,s,l,u,d,E,D){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),i!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||i!=null))return;s=s!=null?""+Vt(s):"",i=i!=null?""+Vt(i):s,D||i===e.value||(e.value=i),e.defaultValue=i}l=l??u,l=typeof l!="function"&&typeof l!="symbol"&&!!l,e.checked=D?e.checked:!!l,e.defaultChecked=!!l,E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"&&(e.name=E)}function Ve(e,i,s){i==="number"&&me(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function Fe(e,i,s,l){if(e=e.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=i.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&l&&(e[s].defaultSelected=!0)}else{for(s=""+Vt(s),i=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,l&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function Qi(e,i,s){if(i!=null&&(i=""+Vt(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+Vt(s):""}function Qe(e,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(a(92));if(Dt(l)){if(1<l.length)throw Error(a(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Vt(i),e.defaultValue=s,l=e.textContent,l===s&&l!==""&&l!==null&&(e.value=l)}function Vn(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var cr=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function nn(e,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":l?e.setProperty(i,s):typeof s!="number"||s===0||cr.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function Ha(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?e.setProperty(l,""):l==="float"?e.cssFloat="":e[l]="");for(var u in i)l=i[u],i.hasOwnProperty(u)&&s[u]!==l&&nn(e,u,l)}else for(var d in i)i.hasOwnProperty(d)&&nn(e,d,i[d])}function gn(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ka=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Rl=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function As(e){return Rl.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Bi=null;function $i(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ur=null,fr=null;function Pp(e){var i=Y(e);if(i&&(e=i.stateNode)){var s=e[mn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Le(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+ie(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==e&&l.form===e.form){var u=l[mn]||null;if(!u)throw Error(a(90));Le(l,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===e.form&&Kt(l)}break t;case"textarea":Qi(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&Fe(e,!!s.multiple,i,!1)}}}var Nu=!1;function zp(e,i,s){if(Nu)return e(i,s);Nu=!0;try{var l=e(i);return l}finally{if(Nu=!1,(ur!==null||fr!==null)&&(fc(),ur&&(i=ur,e=fr,fr=ur=null,Pp(i),e)))for(i=0;i<e.length;i++)Pp(e[i])}}function _o(e,i){var s=e.stateNode;if(s===null)return null;var l=s[mn]||null;if(l===null)return null;s=l[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(e=e.type,l=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!l;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var Lu=!1;if(Qt)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){Lu=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{Lu=!1}var Ga=null,Ou=null,Cl=null;function Bp(){if(Cl)return Cl;var e,i=Ou,s=i.length,l,u="value"in Ga?Ga.value:Ga.textContent,d=u.length;for(e=0;e<s&&i[e]===u[e];e++);var E=s-e;for(l=1;l<=E&&i[s-l]===u[d-l];l++);return Cl=u.slice(e,1<l?1-l:void 0)}function Dl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function Ul(){return!0}function Fp(){return!1}function ei(e){function i(s,l,u,d,E){this._reactName=s,this._targetInst=u,this.type=l,this.nativeEvent=d,this.target=E,this.currentTarget=null;for(var D in e)e.hasOwnProperty(D)&&(s=e[D],this[D]=s?s(d):d[D]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Ul:Fp,this.isPropagationStopped=Fp,this}return A(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Ul)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Ul)},persist:function(){},isPersistent:Ul}),i}var ws={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Nl=ei(ws),xo=A({},ws,{view:0,detail:0}),xx=ei(xo),Pu,zu,yo,Ll=A({},xo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==yo&&(yo&&e.type==="mousemove"?(Pu=e.screenX-yo.screenX,zu=e.screenY-yo.screenY):zu=Pu=0,yo=e),Pu)},movementY:function(e){return"movementY"in e?e.movementY:zu}}),Ip=ei(Ll),yx=A({},Ll,{dataTransfer:0}),Sx=ei(yx),Mx=A({},xo,{relatedTarget:0}),Bu=ei(Mx),bx=A({},ws,{animationName:0,elapsedTime:0,pseudoElement:0}),Ex=ei(bx),Tx=A({},ws,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ax=ei(Tx),wx=A({},ws,{data:0}),Hp=ei(wx),Rx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Cx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Dx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ux(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=Dx[e])?!!i[e]:!1}function Fu(){return Ux}var Nx=A({},xo,{key:function(e){if(e.key){var i=Rx[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=Dl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Cx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Fu,charCode:function(e){return e.type==="keypress"?Dl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Dl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Lx=ei(Nx),Ox=A({},Ll,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kp=ei(Ox),Px=A({},xo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Fu}),zx=ei(Px),Bx=A({},ws,{propertyName:0,elapsedTime:0,pseudoElement:0}),Fx=ei(Bx),Ix=A({},Ll,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hx=ei(Ix),kx=A({},ws,{newState:0,oldState:0}),Gx=ei(kx),Vx=[9,13,27,32],Iu=Qt&&"CompositionEvent"in window,So=null;Qt&&"documentMode"in document&&(So=document.documentMode);var jx=Qt&&"TextEvent"in window&&!So,Gp=Qt&&(!Iu||So&&8<So&&11>=So),Vp=" ",jp=!1;function Xp(e,i){switch(e){case"keyup":return Vx.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var hr=!1;function Xx(e,i){switch(e){case"compositionend":return Wp(i);case"keypress":return i.which!==32?null:(jp=!0,Vp);case"textInput":return e=i.data,e===Vp&&jp?null:e;default:return null}}function Wx(e,i){if(hr)return e==="compositionend"||!Iu&&Xp(e,i)?(e=Bp(),Cl=Ou=Ga=null,hr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Gp&&i.locale!=="ko"?null:i.data;default:return null}}var qx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!qx[e.type]:i==="textarea"}function Yp(e,i,s,l){ur?fr?fr.push(l):fr=[l]:ur=l,i=gc(i,"onChange"),0<i.length&&(s=new Nl("onChange","change",null,s,l),e.push({event:s,listeners:i}))}var Mo=null,bo=null;function Yx(e){y_(e,0)}function Ol(e){var i=ct(e);if(Kt(i))return e}function Zp(e,i){if(e==="change")return i}var Kp=!1;if(Qt){var Hu;if(Qt){var ku="oninput"in document;if(!ku){var Qp=document.createElement("div");Qp.setAttribute("oninput","return;"),ku=typeof Qp.oninput=="function"}Hu=ku}else Hu=!1;Kp=Hu&&(!document.documentMode||9<document.documentMode)}function $p(){Mo&&(Mo.detachEvent("onpropertychange",Jp),bo=Mo=null)}function Jp(e){if(e.propertyName==="value"&&Ol(bo)){var i=[];Yp(i,bo,e,$i(e)),zp(Yx,i)}}function Zx(e,i,s){e==="focusin"?($p(),Mo=i,bo=s,Mo.attachEvent("onpropertychange",Jp)):e==="focusout"&&$p()}function Kx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ol(bo)}function Qx(e,i){if(e==="click")return Ol(i)}function $x(e,i){if(e==="input"||e==="change")return Ol(i)}function Jx(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var fi=typeof Object.is=="function"?Object.is:Jx;function Eo(e,i){if(fi(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var u=s[l];if(!Te.call(i,u)||!fi(e[u],i[u]))return!1}return!0}function tm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function em(e,i){var s=tm(e);e=0;for(var l;s;){if(s.nodeType===3){if(l=e+s.textContent.length,e<=i&&l>=i)return{node:s,offset:i-e};e=l}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=tm(s)}}function nm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?nm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function im(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=me(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=me(e.document)}return i}function Gu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}function ty(e,i){var s=im(i);i=e.focusedElem;var l=e.selectionRange;if(s!==i&&i&&i.ownerDocument&&nm(i.ownerDocument.documentElement,i)){if(l!==null&&Gu(i)){if(e=l.start,s=l.end,s===void 0&&(s=e),"selectionStart"in i)i.selectionStart=e,i.selectionEnd=Math.min(s,i.value.length);else if(s=(e=i.ownerDocument||document)&&e.defaultView||window,s.getSelection){s=s.getSelection();var u=i.textContent.length,d=Math.min(l.start,u);l=l.end===void 0?d:Math.min(l.end,u),!s.extend&&d>l&&(u=l,l=d,d=u),u=em(i,d);var E=em(i,l);u&&E&&(s.rangeCount!==1||s.anchorNode!==u.node||s.anchorOffset!==u.offset||s.focusNode!==E.node||s.focusOffset!==E.offset)&&(e=e.createRange(),e.setStart(u.node,u.offset),s.removeAllRanges(),d>l?(s.addRange(e),s.extend(E.node,E.offset)):(e.setEnd(E.node,E.offset),s.addRange(e)))}}for(e=[],s=i;s=s.parentNode;)s.nodeType===1&&e.push({element:s,left:s.scrollLeft,top:s.scrollTop});for(typeof i.focus=="function"&&i.focus(),i=0;i<e.length;i++)s=e[i],s.element.scrollLeft=s.left,s.element.scrollTop=s.top}}var ey=Qt&&"documentMode"in document&&11>=document.documentMode,dr=null,Vu=null,To=null,ju=!1;function am(e,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;ju||dr==null||dr!==me(l)||(l=dr,"selectionStart"in l&&Gu(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),To&&Eo(To,l)||(To=l,l=gc(Vu,"onSelect"),0<l.length&&(i=new Nl("onSelect","select",null,i,s),e.push({event:i,listeners:l}),i.target=dr)))}function Rs(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var pr={animationend:Rs("Animation","AnimationEnd"),animationiteration:Rs("Animation","AnimationIteration"),animationstart:Rs("Animation","AnimationStart"),transitionrun:Rs("Transition","TransitionRun"),transitionstart:Rs("Transition","TransitionStart"),transitioncancel:Rs("Transition","TransitionCancel"),transitionend:Rs("Transition","TransitionEnd")},Xu={},sm={};Qt&&(sm=document.createElement("div").style,"AnimationEvent"in window||(delete pr.animationend.animation,delete pr.animationiteration.animation,delete pr.animationstart.animation),"TransitionEvent"in window||delete pr.transitionend.transition);function Cs(e){if(Xu[e])return Xu[e];if(!pr[e])return e;var i=pr[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in sm)return Xu[e]=i[s];return e}var rm=Cs("animationend"),om=Cs("animationiteration"),lm=Cs("animationstart"),ny=Cs("transitionrun"),iy=Cs("transitionstart"),ay=Cs("transitioncancel"),cm=Cs("transitionend"),um=new Map,fm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function Fi(e,i){um.set(e,i),Ft(i,[e])}var yi=[],mr=0,Wu=0;function Pl(){for(var e=mr,i=Wu=mr=0;i<e;){var s=yi[i];yi[i++]=null;var l=yi[i];yi[i++]=null;var u=yi[i];yi[i++]=null;var d=yi[i];if(yi[i++]=null,l!==null&&u!==null){var E=l.pending;E===null?u.next=u:(u.next=E.next,E.next=u),l.pending=u}d!==0&&hm(s,u,d)}}function zl(e,i,s,l){yi[mr++]=e,yi[mr++]=i,yi[mr++]=s,yi[mr++]=l,Wu|=l,e.lanes|=l,e=e.alternate,e!==null&&(e.lanes|=l)}function qu(e,i,s,l){return zl(e,i,s,l),Bl(e)}function Va(e,i){return zl(e,null,null,i),Bl(e)}function hm(e,i,s){e.lanes|=s;var l=e.alternate;l!==null&&(l.lanes|=s);for(var u=!1,d=e.return;d!==null;)d.childLanes|=s,l=d.alternate,l!==null&&(l.childLanes|=s),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(u=!0)),e=d,d=d.return;u&&i!==null&&e.tag===3&&(d=e.stateNode,u=31-te(s),d=d.hiddenUpdates,e=d[u],e===null?d[u]=[i]:e.push(i),i.lane=s|536870912)}function Bl(e){if(50<Ko)throw Ko=0,th=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var gr={},dm=new WeakMap;function Si(e,i){if(typeof e=="object"&&e!==null){var s=dm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:nt(i)},dm.set(e,i),i)}return{value:e,source:i,stack:nt(i)}}var _r=[],vr=0,Fl=null,Il=0,Mi=[],bi=0,Ds=null,fa=1,ha="";function Us(e,i){_r[vr++]=Il,_r[vr++]=Fl,Fl=e,Il=i}function pm(e,i,s){Mi[bi++]=fa,Mi[bi++]=ha,Mi[bi++]=Ds,Ds=e;var l=fa;e=ha;var u=32-te(l)-1;l&=~(1<<u),s+=1;var d=32-te(i)+u;if(30<d){var E=u-u%5;d=(l&(1<<E)-1).toString(32),l>>=E,u-=E,fa=1<<32-te(i)+u|s<<u|l,ha=d+e}else fa=1<<d|s<<u|l,ha=e}function Yu(e){e.return!==null&&(Us(e,1),pm(e,1,0))}function Zu(e){for(;e===Fl;)Fl=_r[--vr],_r[vr]=null,Il=_r[--vr],_r[vr]=null;for(;e===Ds;)Ds=Mi[--bi],Mi[bi]=null,ha=Mi[--bi],Mi[bi]=null,fa=Mi[--bi],Mi[bi]=null}var Zn=null,Nn=null,Oe=!1,Ii=null,Ji=!1,Ku=Error(a(519));function Ns(e){var i=Error(a(418,""));throw Ro(Si(i,e)),Ku}function mm(e){var i=e.stateNode,s=e.type,l=e.memoizedProps;switch(i[pn]=e,i[mn]=l,s){case"dialog":De("cancel",i),De("close",i);break;case"iframe":case"object":case"embed":De("load",i);break;case"video":case"audio":for(s=0;s<$o.length;s++)De($o[s],i);break;case"source":De("error",i);break;case"img":case"image":case"link":De("error",i),De("load",i);break;case"details":De("toggle",i);break;case"input":De("invalid",i),en(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),_t(i);break;case"select":De("invalid",i);break;case"textarea":De("invalid",i),Qe(i,l.value,l.defaultValue,l.children),_t(i)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||E_(i.textContent,s)?(l.popover!=null&&(De("beforetoggle",i),De("toggle",i)),l.onScroll!=null&&De("scroll",i),l.onScrollEnd!=null&&De("scrollend",i),l.onClick!=null&&(i.onclick=_c),i=!0):i=!1,i||Ns(e)}function gm(e){for(Zn=e.return;Zn;)switch(Zn.tag){case 3:case 27:Ji=!0;return;case 5:case 13:Ji=!1;return;default:Zn=Zn.return}}function Ao(e){if(e!==Zn)return!1;if(!Oe)return gm(e),Oe=!0,!1;var i=!1,s;if((s=e.tag!==3&&e.tag!==27)&&((s=e.tag===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||_h(e.type,e.memoizedProps)),s=!s),s&&(i=!0),i&&Nn&&Ns(e),gm(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));t:{for(e=e.nextSibling,i=0;e;){if(e.nodeType===8)if(s=e.data,s==="/$"){if(i===0){Nn=ki(e.nextSibling);break t}i--}else s!=="$"&&s!=="$!"&&s!=="$?"||i++;e=e.nextSibling}Nn=null}}else Nn=Zn?ki(e.stateNode.nextSibling):null;return!0}function wo(){Nn=Zn=null,Oe=!1}function Ro(e){Ii===null?Ii=[e]:Ii.push(e)}var Co=Error(a(460)),_m=Error(a(474)),Qu={then:function(){}};function vm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Hl(){}function xm(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(Hl,Hl),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,e===Co?Error(a(483)):e;default:if(typeof i.status=="string")i.then(Hl,Hl);else{if(e=$e,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(l){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=l}},function(l){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,e===Co?Error(a(483)):e}throw Do=i,Co}}var Do=null;function ym(){if(Do===null)throw Error(a(459));var e=Do;return Do=null,e}var xr=null,Uo=0;function kl(e){var i=Uo;return Uo+=1,xr===null&&(xr=[]),xm(xr,e,i)}function No(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Gl(e,i){throw i.$$typeof===c?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function Sm(e){var i=e._init;return i(e._payload)}function Mm(e){function i(et,q){if(e){var st=et.deletions;st===null?(et.deletions=[q],et.flags|=16):st.push(q)}}function s(et,q){if(!e)return null;for(;q!==null;)i(et,q),q=q.sibling;return null}function l(et){for(var q=new Map;et!==null;)et.key!==null?q.set(et.key,et):q.set(et.index,et),et=et.sibling;return q}function u(et,q){return et=es(et,q),et.index=0,et.sibling=null,et}function d(et,q,st){return et.index=st,e?(st=et.alternate,st!==null?(st=st.index,st<q?(et.flags|=33554434,q):st):(et.flags|=33554434,q)):(et.flags|=1048576,q)}function E(et){return e&&et.alternate===null&&(et.flags|=33554434),et}function D(et,q,st,yt){return q===null||q.tag!==6?(q=Wf(st,et.mode,yt),q.return=et,q):(q=u(q,st),q.return=et,q)}function I(et,q,st,yt){var Xt=st.type;return Xt===p?pt(et,q,st.props.children,yt,st.key):q!==null&&(q.elementType===Xt||typeof Xt=="object"&&Xt!==null&&Xt.$$typeof===F&&Sm(Xt)===q.type)?(q=u(q,st.props),No(q,st),q.return=et,q):(q=rc(st.type,st.key,st.props,null,et.mode,yt),No(q,st),q.return=et,q)}function Z(et,q,st,yt){return q===null||q.tag!==4||q.stateNode.containerInfo!==st.containerInfo||q.stateNode.implementation!==st.implementation?(q=qf(st,et.mode,yt),q.return=et,q):(q=u(q,st.children||[]),q.return=et,q)}function pt(et,q,st,yt,Xt){return q===null||q.tag!==7?(q=Gs(st,et.mode,yt,Xt),q.return=et,q):(q=u(q,st),q.return=et,q)}function Mt(et,q,st){if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return q=Wf(""+q,et.mode,st),q.return=et,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case h:return st=rc(q.type,q.key,q.props,null,et.mode,st),No(st,q),st.return=et,st;case f:return q=qf(q,et.mode,st),q.return=et,q;case F:var yt=q._init;return q=yt(q._payload),Mt(et,q,st)}if(Dt(q)||L(q))return q=Gs(q,et.mode,st,null),q.return=et,q;if(typeof q.then=="function")return Mt(et,kl(q),st);if(q.$$typeof===M)return Mt(et,ic(et,q),st);Gl(et,q)}return null}function ut(et,q,st,yt){var Xt=q!==null?q.key:null;if(typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint")return Xt!==null?null:D(et,q,""+st,yt);if(typeof st=="object"&&st!==null){switch(st.$$typeof){case h:return st.key===Xt?I(et,q,st,yt):null;case f:return st.key===Xt?Z(et,q,st,yt):null;case F:return Xt=st._init,st=Xt(st._payload),ut(et,q,st,yt)}if(Dt(st)||L(st))return Xt!==null?null:pt(et,q,st,yt,null);if(typeof st.then=="function")return ut(et,q,kl(st),yt);if(st.$$typeof===M)return ut(et,q,ic(et,st),yt);Gl(et,st)}return null}function dt(et,q,st,yt,Xt){if(typeof yt=="string"&&yt!==""||typeof yt=="number"||typeof yt=="bigint")return et=et.get(st)||null,D(q,et,""+yt,Xt);if(typeof yt=="object"&&yt!==null){switch(yt.$$typeof){case h:return et=et.get(yt.key===null?st:yt.key)||null,I(q,et,yt,Xt);case f:return et=et.get(yt.key===null?st:yt.key)||null,Z(q,et,yt,Xt);case F:var Ee=yt._init;return yt=Ee(yt._payload),dt(et,q,st,yt,Xt)}if(Dt(yt)||L(yt))return et=et.get(st)||null,pt(q,et,yt,Xt,null);if(typeof yt.then=="function")return dt(et,q,st,kl(yt),Xt);if(yt.$$typeof===M)return dt(et,q,st,ic(q,yt),Xt);Gl(q,yt)}return null}function $t(et,q,st,yt){for(var Xt=null,Ee=null,ae=q,oe=q=0,Dn=null;ae!==null&&oe<st.length;oe++){ae.index>oe?(Dn=ae,ae=null):Dn=ae.sibling;var Pe=ut(et,ae,st[oe],yt);if(Pe===null){ae===null&&(ae=Dn);break}e&&ae&&Pe.alternate===null&&i(et,ae),q=d(Pe,q,oe),Ee===null?Xt=Pe:Ee.sibling=Pe,Ee=Pe,ae=Dn}if(oe===st.length)return s(et,ae),Oe&&Us(et,oe),Xt;if(ae===null){for(;oe<st.length;oe++)ae=Mt(et,st[oe],yt),ae!==null&&(q=d(ae,q,oe),Ee===null?Xt=ae:Ee.sibling=ae,Ee=ae);return Oe&&Us(et,oe),Xt}for(ae=l(ae);oe<st.length;oe++)Dn=dt(ae,et,oe,st[oe],yt),Dn!==null&&(e&&Dn.alternate!==null&&ae.delete(Dn.key===null?oe:Dn.key),q=d(Dn,q,oe),Ee===null?Xt=Dn:Ee.sibling=Dn,Ee=Dn);return e&&ae.forEach(function(ls){return i(et,ls)}),Oe&&Us(et,oe),Xt}function de(et,q,st,yt){if(st==null)throw Error(a(151));for(var Xt=null,Ee=null,ae=q,oe=q=0,Dn=null,Pe=st.next();ae!==null&&!Pe.done;oe++,Pe=st.next()){ae.index>oe?(Dn=ae,ae=null):Dn=ae.sibling;var ls=ut(et,ae,Pe.value,yt);if(ls===null){ae===null&&(ae=Dn);break}e&&ae&&ls.alternate===null&&i(et,ae),q=d(ls,q,oe),Ee===null?Xt=ls:Ee.sibling=ls,Ee=ls,ae=Dn}if(Pe.done)return s(et,ae),Oe&&Us(et,oe),Xt;if(ae===null){for(;!Pe.done;oe++,Pe=st.next())Pe=Mt(et,Pe.value,yt),Pe!==null&&(q=d(Pe,q,oe),Ee===null?Xt=Pe:Ee.sibling=Pe,Ee=Pe);return Oe&&Us(et,oe),Xt}for(ae=l(ae);!Pe.done;oe++,Pe=st.next())Pe=dt(ae,et,oe,Pe.value,yt),Pe!==null&&(e&&Pe.alternate!==null&&ae.delete(Pe.key===null?oe:Pe.key),q=d(Pe,q,oe),Ee===null?Xt=Pe:Ee.sibling=Pe,Ee=Pe);return e&&ae.forEach(function(vS){return i(et,vS)}),Oe&&Us(et,oe),Xt}function fn(et,q,st,yt){if(typeof st=="object"&&st!==null&&st.type===p&&st.key===null&&(st=st.props.children),typeof st=="object"&&st!==null){switch(st.$$typeof){case h:t:{for(var Xt=st.key;q!==null;){if(q.key===Xt){if(Xt=st.type,Xt===p){if(q.tag===7){s(et,q.sibling),yt=u(q,st.props.children),yt.return=et,et=yt;break t}}else if(q.elementType===Xt||typeof Xt=="object"&&Xt!==null&&Xt.$$typeof===F&&Sm(Xt)===q.type){s(et,q.sibling),yt=u(q,st.props),No(yt,st),yt.return=et,et=yt;break t}s(et,q);break}else i(et,q);q=q.sibling}st.type===p?(yt=Gs(st.props.children,et.mode,yt,st.key),yt.return=et,et=yt):(yt=rc(st.type,st.key,st.props,null,et.mode,yt),No(yt,st),yt.return=et,et=yt)}return E(et);case f:t:{for(Xt=st.key;q!==null;){if(q.key===Xt)if(q.tag===4&&q.stateNode.containerInfo===st.containerInfo&&q.stateNode.implementation===st.implementation){s(et,q.sibling),yt=u(q,st.children||[]),yt.return=et,et=yt;break t}else{s(et,q);break}else i(et,q);q=q.sibling}yt=qf(st,et.mode,yt),yt.return=et,et=yt}return E(et);case F:return Xt=st._init,st=Xt(st._payload),fn(et,q,st,yt)}if(Dt(st))return $t(et,q,st,yt);if(L(st)){if(Xt=L(st),typeof Xt!="function")throw Error(a(150));return st=Xt.call(st),de(et,q,st,yt)}if(typeof st.then=="function")return fn(et,q,kl(st),yt);if(st.$$typeof===M)return fn(et,q,ic(et,st),yt);Gl(et,st)}return typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint"?(st=""+st,q!==null&&q.tag===6?(s(et,q.sibling),yt=u(q,st),yt.return=et,et=yt):(s(et,q),yt=Wf(st,et.mode,yt),yt.return=et,et=yt),E(et)):s(et,q)}return function(et,q,st,yt){try{Uo=0;var Xt=fn(et,q,st,yt);return xr=null,Xt}catch(ae){if(ae===Co)throw ae;var Ee=wi(29,ae,null,et.mode);return Ee.lanes=yt,Ee.return=et,Ee}finally{}}}var Ls=Mm(!0),bm=Mm(!1),yr=Ut(null),Vl=Ut(0);function Em(e,i){e=ba,Ht(Vl,e),Ht(yr,i),ba=e|i.baseLanes}function $u(){Ht(Vl,ba),Ht(yr,yr.current)}function Ju(){ba=Vl.current,jt(yr),jt(Vl)}var Ei=Ut(null),ta=null;function ja(e){var i=e.alternate;Ht(bn,bn.current&1),Ht(Ei,e),ta===null&&(i===null||yr.current!==null||i.memoizedState!==null)&&(ta=e)}function Tm(e){if(e.tag===22){if(Ht(bn,bn.current),Ht(Ei,e),ta===null){var i=e.alternate;i!==null&&i.memoizedState!==null&&(ta=e)}}else Xa()}function Xa(){Ht(bn,bn.current),Ht(Ei,Ei.current)}function da(e){jt(Ei),ta===e&&(ta=null),jt(bn)}var bn=Ut(0);function jl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||s.data==="$?"||s.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var sy=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,l){e.push(l)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},ry=r.unstable_scheduleCallback,oy=r.unstable_NormalPriority,En={$$typeof:M,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function tf(){return{controller:new sy,data:new Map,refCount:0}}function Lo(e){e.refCount--,e.refCount===0&&ry(oy,function(){e.controller.abort()})}var Oo=null,ef=0,Sr=0,Mr=null;function ly(e,i){if(Oo===null){var s=Oo=[];ef=0,Sr=lh(),Mr={status:"pending",value:void 0,then:function(l){s.push(l)}}}return ef++,i.then(Am,Am),i}function Am(){if(--ef===0&&Oo!==null){Mr!==null&&(Mr.status="fulfilled");var e=Oo;Oo=null,Sr=0,Mr=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function cy(e,i){var s=[],l={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){l.status="fulfilled",l.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(l.status="rejected",l.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),l}var wm=w.S;w.S=function(e,i){typeof i=="object"&&i!==null&&typeof i.then=="function"&&ly(e,i),wm!==null&&wm(e,i)};var Os=Ut(null);function nf(){var e=Os.current;return e!==null?e:$e.pooledCache}function Xl(e,i){i===null?Ht(Os,Os.current):Ht(Os,i.pool)}function Rm(){var e=nf();return e===null?null:{parent:En._currentValue,pool:e}}var Wa=0,Me=null,je=null,xn=null,Wl=!1,br=!1,Ps=!1,ql=0,Po=0,Er=null,uy=0;function _n(){throw Error(a(321))}function af(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!fi(e[s],i[s]))return!1;return!0}function sf(e,i,s,l,u,d){return Wa=d,Me=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,w.H=e===null||e.memoizedState===null?zs:qa,Ps=!1,d=s(l,u),Ps=!1,br&&(d=Dm(i,s,l,u)),Cm(e),d}function Cm(e){w.H=ea;var i=je!==null&&je.next!==null;if(Wa=0,xn=je=Me=null,Wl=!1,Po=0,Er=null,i)throw Error(a(300));e===null||Rn||(e=e.dependencies,e!==null&&nc(e)&&(Rn=!0))}function Dm(e,i,s,l){Me=e;var u=0;do{if(br&&(Er=null),Po=0,br=!1,25<=u)throw Error(a(301));if(u+=1,xn=je=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}w.H=Bs,d=i(s,l)}while(br);return d}function fy(){var e=w.H,i=e.useState()[0];return i=typeof i.then=="function"?zo(i):i,e=e.useState()[0],(je!==null?je.memoizedState:null)!==e&&(Me.flags|=1024),i}function rf(){var e=ql!==0;return ql=0,e}function of(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function lf(e){if(Wl){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Wl=!1}Wa=0,xn=je=Me=null,br=!1,Po=ql=0,Er=null}function ni(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xn===null?Me.memoizedState=xn=e:xn=xn.next=e,xn}function yn(){if(je===null){var e=Me.alternate;e=e!==null?e.memoizedState:null}else e=je.next;var i=xn===null?Me.memoizedState:xn.next;if(i!==null)xn=i,je=e;else{if(e===null)throw Me.alternate===null?Error(a(467)):Error(a(310));je=e,e={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},xn===null?Me.memoizedState=xn=e:xn=xn.next=e}return xn}var Yl;Yl=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function zo(e){var i=Po;return Po+=1,Er===null&&(Er=[]),e=xm(Er,e,i),i=Me,(xn===null?i.memoizedState:xn.next)===null&&(i=i.alternate,w.H=i===null||i.memoizedState===null?zs:qa),e}function Zl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return zo(e);if(e.$$typeof===M)return jn(e)}throw Error(a(438,String(e)))}function cf(e){var i=null,s=Me.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=Me.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Yl(),Me.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),l=0;l<e;l++)s[l]=U;return i.index++,s}function pa(e,i){return typeof i=="function"?i(e):i}function Kl(e){var i=yn();return uf(i,je,e)}function uf(e,i,s){var l=e.queue;if(l===null)throw Error(a(311));l.lastRenderedReducer=s;var u=e.baseQueue,d=l.pending;if(d!==null){if(u!==null){var E=u.next;u.next=d.next,d.next=E}i.baseQueue=u=d,l.pending=null}if(d=e.baseState,u===null)e.memoizedState=d;else{i=u.next;var D=E=null,I=null,Z=i,pt=!1;do{var Mt=Z.lane&-536870913;if(Mt!==Z.lane?(Ne&Mt)===Mt:(Wa&Mt)===Mt){var ut=Z.revertLane;if(ut===0)I!==null&&(I=I.next={lane:0,revertLane:0,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null}),Mt===Sr&&(pt=!0);else if((Wa&ut)===ut){Z=Z.next,ut===Sr&&(pt=!0);continue}else Mt={lane:0,revertLane:Z.revertLane,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null},I===null?(D=I=Mt,E=d):I=I.next=Mt,Me.lanes|=ut,ns|=ut;Mt=Z.action,Ps&&s(d,Mt),d=Z.hasEagerState?Z.eagerState:s(d,Mt)}else ut={lane:Mt,revertLane:Z.revertLane,action:Z.action,hasEagerState:Z.hasEagerState,eagerState:Z.eagerState,next:null},I===null?(D=I=ut,E=d):I=I.next=ut,Me.lanes|=Mt,ns|=Mt;Z=Z.next}while(Z!==null&&Z!==i);if(I===null?E=d:I.next=D,!fi(d,e.memoizedState)&&(Rn=!0,pt&&(s=Mr,s!==null)))throw s;e.memoizedState=d,e.baseState=E,e.baseQueue=I,l.lastRenderedState=d}return u===null&&(l.lanes=0),[e.memoizedState,l.dispatch]}function ff(e){var i=yn(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var l=s.dispatch,u=s.pending,d=i.memoizedState;if(u!==null){s.pending=null;var E=u=u.next;do d=e(d,E.action),E=E.next;while(E!==u);fi(d,i.memoizedState)||(Rn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),s.lastRenderedState=d}return[d,l]}function Um(e,i,s){var l=Me,u=yn(),d=Oe;if(d){if(s===void 0)throw Error(a(407));s=s()}else s=i();var E=!fi((je||u).memoizedState,s);if(E&&(u.memoizedState=s,Rn=!0),u=u.queue,pf(Om.bind(null,l,u,e),[e]),u.getSnapshot!==i||E||xn!==null&&xn.memoizedState.tag&1){if(l.flags|=2048,Tr(9,Lm.bind(null,l,u,s,i),{destroy:void 0},null),$e===null)throw Error(a(349));d||(Wa&60)!==0||Nm(l,i,s)}return s}function Nm(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=Me.updateQueue,i===null?(i=Yl(),Me.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Lm(e,i,s,l){i.value=s,i.getSnapshot=l,Pm(i)&&zm(e)}function Om(e,i,s){return s(function(){Pm(i)&&zm(e)})}function Pm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!fi(e,s)}catch{return!0}}function zm(e){var i=Va(e,2);i!==null&&Kn(i,e,2)}function hf(e){var i=ni();if(typeof e=="function"){var s=e;if(e=s(),Ps){se(!0);try{s()}finally{se(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:e},i}function Bm(e,i,s,l){return e.baseState=s,uf(e,je,typeof l=="function"?l:pa)}function hy(e,i,s,l,u){if(Jl(e))throw Error(a(485));if(e=i.action,e!==null){var d={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(E){d.listeners.push(E)}};w.T!==null?s(!0):d.isTransition=!1,l(d),s=i.pending,s===null?(d.next=i.pending=d,Fm(i,d)):(d.next=s.next,i.pending=s.next=d)}}function Fm(e,i){var s=i.action,l=i.payload,u=e.state;if(i.isTransition){var d=w.T,E={};w.T=E;try{var D=s(u,l),I=w.S;I!==null&&I(E,D),Im(e,i,D)}catch(Z){df(e,i,Z)}finally{w.T=d}}else try{d=s(u,l),Im(e,i,d)}catch(Z){df(e,i,Z)}}function Im(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){Hm(e,i,l)},function(l){return df(e,i,l)}):Hm(e,i,s)}function Hm(e,i,s){i.status="fulfilled",i.value=s,km(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Fm(e,s)))}function df(e,i,s){var l=e.pending;if(e.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,km(i),i=i.next;while(i!==l)}e.action=null}function km(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Gm(e,i){return i}function Vm(e,i){if(Oe){var s=$e.formState;if(s!==null){t:{var l=Me;if(Oe){if(Nn){e:{for(var u=Nn,d=Ji;u.nodeType!==8;){if(!d){u=null;break e}if(u=ki(u.nextSibling),u===null){u=null;break e}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){Nn=ki(u.nextSibling),l=u.data==="F!";break t}}Ns(l)}l=!1}l&&(i=s[0])}}return s=ni(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Gm,lastRenderedState:i},s.queue=l,s=og.bind(null,Me,l),l.dispatch=s,l=hf(!1),d=xf.bind(null,Me,!1,l.queue),l=ni(),u={state:i,dispatch:null,action:e,pending:null},l.queue=u,s=hy.bind(null,Me,u,d,s),u.dispatch=s,l.memoizedState=e,[i,s,!1]}function jm(e){var i=yn();return Xm(i,je,e)}function Xm(e,i,s){i=uf(e,i,Gm)[0],e=Kl(pa)[0],i=typeof i=="object"&&i!==null&&typeof i.then=="function"?zo(i):i;var l=yn(),u=l.queue,d=u.dispatch;return s!==l.memoizedState&&(Me.flags|=2048,Tr(9,dy.bind(null,u,s),{destroy:void 0},null)),[i,d,e]}function dy(e,i){e.action=i}function Wm(e){var i=yn(),s=je;if(s!==null)return Xm(i,s,e);yn(),i=i.memoizedState,s=yn();var l=s.queue.dispatch;return s.memoizedState=e,[i,l,!1]}function Tr(e,i,s,l){return e={tag:e,create:i,inst:s,deps:l,next:null},i=Me.updateQueue,i===null&&(i=Yl(),Me.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(l=s.next,s.next=e,e.next=l,i.lastEffect=e),e}function qm(){return yn().memoizedState}function Ql(e,i,s,l){var u=ni();Me.flags|=e,u.memoizedState=Tr(1|i,s,{destroy:void 0},l===void 0?null:l)}function $l(e,i,s,l){var u=yn();l=l===void 0?null:l;var d=u.memoizedState.inst;je!==null&&l!==null&&af(l,je.memoizedState.deps)?u.memoizedState=Tr(i,s,d,l):(Me.flags|=e,u.memoizedState=Tr(1|i,s,d,l))}function Ym(e,i){Ql(8390656,8,e,i)}function pf(e,i){$l(2048,8,e,i)}function Zm(e,i){return $l(4,2,e,i)}function Km(e,i){return $l(4,4,e,i)}function Qm(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function $m(e,i,s){s=s!=null?s.concat([e]):null,$l(4,4,Qm.bind(null,i,e),s)}function mf(){}function Jm(e,i){var s=yn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&af(i,l[1])?l[0]:(s.memoizedState=[e,i],e)}function tg(e,i){var s=yn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&af(i,l[1]))return l[0];if(l=e(),Ps){se(!0);try{e()}finally{se(!1)}}return s.memoizedState=[l,i],l}function gf(e,i,s){return s===void 0||(Wa&1073741824)!==0?e.memoizedState=i:(e.memoizedState=s,e=n_(),Me.lanes|=e,ns|=e,s)}function eg(e,i,s,l){return fi(s,i)?s:yr.current!==null?(e=gf(e,s,l),fi(e,i)||(Rn=!0),e):(Wa&42)===0?(Rn=!0,e.memoizedState=s):(e=n_(),Me.lanes|=e,ns|=e,i)}function ng(e,i,s,l,u){var d=J.p;J.p=d!==0&&8>d?d:8;var E=w.T,D={};w.T=D,xf(e,!1,i,s);try{var I=u(),Z=w.S;if(Z!==null&&Z(D,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var pt=cy(I,l);Bo(e,i,pt,mi(e))}else Bo(e,i,l,mi(e))}catch(Mt){Bo(e,i,{then:function(){},status:"rejected",reason:Mt},mi())}finally{J.p=d,w.T=E}}function py(){}function _f(e,i,s,l){if(e.tag!==5)throw Error(a(476));var u=ig(e).queue;ng(e,u,i,mt,s===null?py:function(){return ag(e),s(l)})}function ig(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:mt,baseState:mt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:mt},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function ag(e){var i=ig(e).next.queue;Bo(e,i,{},mi())}function vf(){return jn(il)}function sg(){return yn().memoizedState}function rg(){return yn().memoizedState}function my(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=mi();e=Ka(s);var l=Qa(i,e,s);l!==null&&(Kn(l,i,s),Ho(l,i,s)),i={cache:tf()},e.payload=i;return}i=i.return}}function gy(e,i,s){var l=mi();s={lane:l,revertLane:0,action:s,hasEagerState:!1,eagerState:null,next:null},Jl(e)?lg(i,s):(s=qu(e,i,s,l),s!==null&&(Kn(s,e,l),cg(s,i,l)))}function og(e,i,s){var l=mi();Bo(e,i,s,l)}function Bo(e,i,s,l){var u={lane:l,revertLane:0,action:s,hasEagerState:!1,eagerState:null,next:null};if(Jl(e))lg(i,u);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var E=i.lastRenderedState,D=d(E,s);if(u.hasEagerState=!0,u.eagerState=D,fi(D,E))return zl(e,i,u,0),$e===null&&Pl(),!1}catch{}finally{}if(s=qu(e,i,u,l),s!==null)return Kn(s,e,l),cg(s,i,l),!0}return!1}function xf(e,i,s,l){if(l={lane:2,revertLane:lh(),action:l,hasEagerState:!1,eagerState:null,next:null},Jl(e)){if(i)throw Error(a(479))}else i=qu(e,s,l,2),i!==null&&Kn(i,e,2)}function Jl(e){var i=e.alternate;return e===Me||i!==null&&i===Me}function lg(e,i){br=Wl=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function cg(e,i,s){if((s&4194176)!==0){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,ci(e,s)}}var ea={readContext:jn,use:Zl,useCallback:_n,useContext:_n,useEffect:_n,useImperativeHandle:_n,useLayoutEffect:_n,useInsertionEffect:_n,useMemo:_n,useReducer:_n,useRef:_n,useState:_n,useDebugValue:_n,useDeferredValue:_n,useTransition:_n,useSyncExternalStore:_n,useId:_n};ea.useCacheRefresh=_n,ea.useMemoCache=_n,ea.useHostTransitionStatus=_n,ea.useFormState=_n,ea.useActionState=_n,ea.useOptimistic=_n;var zs={readContext:jn,use:Zl,useCallback:function(e,i){return ni().memoizedState=[e,i===void 0?null:i],e},useContext:jn,useEffect:Ym,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,Ql(4194308,4,Qm.bind(null,i,e),s)},useLayoutEffect:function(e,i){return Ql(4194308,4,e,i)},useInsertionEffect:function(e,i){Ql(4,2,e,i)},useMemo:function(e,i){var s=ni();i=i===void 0?null:i;var l=e();if(Ps){se(!0);try{e()}finally{se(!1)}}return s.memoizedState=[l,i],l},useReducer:function(e,i,s){var l=ni();if(s!==void 0){var u=s(i);if(Ps){se(!0);try{s(i)}finally{se(!1)}}}else u=i;return l.memoizedState=l.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},l.queue=e,e=e.dispatch=gy.bind(null,Me,e),[l.memoizedState,e]},useRef:function(e){var i=ni();return e={current:e},i.memoizedState=e},useState:function(e){e=hf(e);var i=e.queue,s=og.bind(null,Me,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:mf,useDeferredValue:function(e,i){var s=ni();return gf(s,e,i)},useTransition:function(){var e=hf(!1);return e=ng.bind(null,Me,e.queue,!0,!1),ni().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var l=Me,u=ni();if(Oe){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),$e===null)throw Error(a(349));(Ne&60)!==0||Nm(l,i,s)}u.memoizedState=s;var d={value:s,getSnapshot:i};return u.queue=d,Ym(Om.bind(null,l,d,e),[e]),l.flags|=2048,Tr(9,Lm.bind(null,l,d,s,i),{destroy:void 0},null),s},useId:function(){var e=ni(),i=$e.identifierPrefix;if(Oe){var s=ha,l=fa;s=(l&~(1<<32-te(l)-1)).toString(32)+s,i=":"+i+"R"+s,s=ql++,0<s&&(i+="H"+s.toString(32)),i+=":"}else s=uy++,i=":"+i+"r"+s.toString(32)+":";return e.memoizedState=i},useCacheRefresh:function(){return ni().memoizedState=my.bind(null,Me)}};zs.useMemoCache=cf,zs.useHostTransitionStatus=vf,zs.useFormState=Vm,zs.useActionState=Vm,zs.useOptimistic=function(e){var i=ni();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=xf.bind(null,Me,!0,s),s.dispatch=i,[e,i]};var qa={readContext:jn,use:Zl,useCallback:Jm,useContext:jn,useEffect:pf,useImperativeHandle:$m,useInsertionEffect:Zm,useLayoutEffect:Km,useMemo:tg,useReducer:Kl,useRef:qm,useState:function(){return Kl(pa)},useDebugValue:mf,useDeferredValue:function(e,i){var s=yn();return eg(s,je.memoizedState,e,i)},useTransition:function(){var e=Kl(pa)[0],i=yn().memoizedState;return[typeof e=="boolean"?e:zo(e),i]},useSyncExternalStore:Um,useId:sg};qa.useCacheRefresh=rg,qa.useMemoCache=cf,qa.useHostTransitionStatus=vf,qa.useFormState=jm,qa.useActionState=jm,qa.useOptimistic=function(e,i){var s=yn();return Bm(s,je,e,i)};var Bs={readContext:jn,use:Zl,useCallback:Jm,useContext:jn,useEffect:pf,useImperativeHandle:$m,useInsertionEffect:Zm,useLayoutEffect:Km,useMemo:tg,useReducer:ff,useRef:qm,useState:function(){return ff(pa)},useDebugValue:mf,useDeferredValue:function(e,i){var s=yn();return je===null?gf(s,e,i):eg(s,je.memoizedState,e,i)},useTransition:function(){var e=ff(pa)[0],i=yn().memoizedState;return[typeof e=="boolean"?e:zo(e),i]},useSyncExternalStore:Um,useId:sg};Bs.useCacheRefresh=rg,Bs.useMemoCache=cf,Bs.useHostTransitionStatus=vf,Bs.useFormState=Wm,Bs.useActionState=Wm,Bs.useOptimistic=function(e,i){var s=yn();return je!==null?Bm(s,je,e,i):(s.baseState=e,[e,s.queue.dispatch])};function yf(e,i,s,l){i=e.memoizedState,s=s(l,i),s=s==null?i:A({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Sf={isMounted:function(e){return(e=e._reactInternals)?W(e)===e:!1},enqueueSetState:function(e,i,s){e=e._reactInternals;var l=mi(),u=Ka(l);u.payload=i,s!=null&&(u.callback=s),i=Qa(e,u,l),i!==null&&(Kn(i,e,l),Ho(i,e,l))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var l=mi(),u=Ka(l);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Qa(e,u,l),i!==null&&(Kn(i,e,l),Ho(i,e,l))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=mi(),l=Ka(s);l.tag=2,i!=null&&(l.callback=i),i=Qa(e,l,s),i!==null&&(Kn(i,e,s),Ho(i,e,s))}};function ug(e,i,s,l,u,d,E){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(l,d,E):i.prototype&&i.prototype.isPureReactComponent?!Eo(s,l)||!Eo(u,d):!0}function fg(e,i,s,l){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==e&&Sf.enqueueReplaceState(i,i.state,null)}function Fs(e,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(e=e.defaultProps){s===i&&(s=A({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}var tc=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function hg(e){tc(e)}function dg(e){console.error(e)}function pg(e){tc(e)}function ec(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function mg(e,i,s){try{var l=e.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Mf(e,i,s){return s=Ka(s),s.tag=3,s.payload={element:null},s.callback=function(){ec(e,i)},s}function gg(e){return e=Ka(e),e.tag=3,e}function _g(e,i,s,l){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var d=l.value;e.payload=function(){return u(d)},e.callback=function(){mg(i,s,l)}}var E=s.stateNode;E!==null&&typeof E.componentDidCatch=="function"&&(e.callback=function(){mg(i,s,l),typeof u!="function"&&(is===null?is=new Set([this]):is.add(this));var D=l.stack;this.componentDidCatch(l.value,{componentStack:D!==null?D:""})})}function _y(e,i,s,l,u){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&Io(i,s,u,!0),s=Ei.current,s!==null){switch(s.tag){case 13:return ta===null?ih():s.alternate===null&&un===0&&(un=3),s.flags&=-257,s.flags|=65536,s.lanes=u,l===Qu?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),sh(e,l,u)),!1;case 22:return s.flags|=65536,l===Qu?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),sh(e,l,u)),!1}throw Error(a(435,s.tag))}return sh(e,l,u),ih(),!1}if(Oe)return i=Ei.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,l!==Ku&&(e=Error(a(422),{cause:l}),Ro(Si(e,s)))):(l!==Ku&&(i=Error(a(423),{cause:l}),Ro(Si(i,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,l=Si(l,s),u=Mf(e.stateNode,l,u),Bf(e,u),un!==4&&(un=2)),!1;var d=Error(a(520),{cause:l});if(d=Si(d,s),Yo===null?Yo=[d]:Yo.push(d),un!==4&&(un=2),i===null)return!0;l=Si(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=Mf(s.stateNode,l,e),Bf(s,e),!1;case 1:if(i=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(is===null||!is.has(d))))return s.flags|=65536,u&=-u,s.lanes|=u,u=gg(u),_g(u,e,s,l),Bf(s,u),!1}s=s.return}while(s!==null);return!1}var vg=Error(a(461)),Rn=!1;function Ln(e,i,s,l){i.child=e===null?bm(i,null,s,l):Ls(i,e.child,s,l)}function xg(e,i,s,l,u){s=s.render;var d=i.ref;if("ref"in l){var E={};for(var D in l)D!=="ref"&&(E[D]=l[D])}else E=l;return Hs(i),l=sf(e,i,s,E,d,u),D=rf(),e!==null&&!Rn?(of(e,i,u),ma(e,i,u)):(Oe&&D&&Yu(i),i.flags|=1,Ln(e,i,l,u),i.child)}function yg(e,i,s,l,u){if(e===null){var d=s.type;return typeof d=="function"&&!Xf(d)&&d.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=d,Sg(e,i,d,l,u)):(e=rc(s.type,null,l,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(d=e.child,!Uf(e,u)){var E=d.memoizedProps;if(s=s.compare,s=s!==null?s:Eo,s(E,l)&&e.ref===i.ref)return ma(e,i,u)}return i.flags|=1,e=es(d,l),e.ref=i.ref,e.return=i,i.child=e}function Sg(e,i,s,l,u){if(e!==null){var d=e.memoizedProps;if(Eo(d,l)&&e.ref===i.ref)if(Rn=!1,i.pendingProps=l=d,Uf(e,u))(e.flags&131072)!==0&&(Rn=!0);else return i.lanes=e.lanes,ma(e,i,u)}return bf(e,i,s,l,u)}function Mg(e,i,s){var l=i.pendingProps,u=l.children,d=(i.stateNode._pendingVisibility&2)!==0,E=e!==null?e.memoizedState:null;if(Fo(e,i),l.mode==="hidden"||d){if((i.flags&128)!==0){if(l=E!==null?E.baseLanes|s:s,e!==null){for(u=i.child=e.child,d=0;u!==null;)d=d|u.lanes|u.childLanes,u=u.sibling;i.childLanes=d&~l}else i.childLanes=0,i.child=null;return bg(e,i,l,s)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Xl(i,E!==null?E.cachePool:null),E!==null?Em(i,E):$u(),Tm(i);else return i.lanes=i.childLanes=536870912,bg(e,i,E!==null?E.baseLanes|s:s,s)}else E!==null?(Xl(i,E.cachePool),Em(i,E),Xa(),i.memoizedState=null):(e!==null&&Xl(i,null),$u(),Xa());return Ln(e,i,u,s),i.child}function bg(e,i,s,l){var u=nf();return u=u===null?null:{parent:En._currentValue,pool:u},i.memoizedState={baseLanes:s,cachePool:u},e!==null&&Xl(i,null),$u(),Tm(i),e!==null&&Io(e,i,l,!0),null}function Fo(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=2097664);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=2097664)}}function bf(e,i,s,l,u){return Hs(i),s=sf(e,i,s,l,void 0,u),l=rf(),e!==null&&!Rn?(of(e,i,u),ma(e,i,u)):(Oe&&l&&Yu(i),i.flags|=1,Ln(e,i,s,u),i.child)}function Eg(e,i,s,l,u,d){return Hs(i),i.updateQueue=null,s=Dm(i,l,s,u),Cm(e),l=rf(),e!==null&&!Rn?(of(e,i,d),ma(e,i,d)):(Oe&&l&&Yu(i),i.flags|=1,Ln(e,i,s,d),i.child)}function Tg(e,i,s,l,u){if(Hs(i),i.stateNode===null){var d=gr,E=s.contextType;typeof E=="object"&&E!==null&&(d=jn(E)),d=new s(l,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Sf,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=l,d.state=i.memoizedState,d.refs={},Pf(i),E=s.contextType,d.context=typeof E=="object"&&E!==null?jn(E):gr,d.state=i.memoizedState,E=s.getDerivedStateFromProps,typeof E=="function"&&(yf(i,s,E,l),d.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(E=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),E!==d.state&&Sf.enqueueReplaceState(d,d.state,null),Go(i,l,d,u),ko(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(e===null){d=i.stateNode;var D=i.memoizedProps,I=Fs(s,D);d.props=I;var Z=d.context,pt=s.contextType;E=gr,typeof pt=="object"&&pt!==null&&(E=jn(pt));var Mt=s.getDerivedStateFromProps;pt=typeof Mt=="function"||typeof d.getSnapshotBeforeUpdate=="function",D=i.pendingProps!==D,pt||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(D||Z!==E)&&fg(i,d,l,E),Za=!1;var ut=i.memoizedState;d.state=ut,Go(i,l,d,u),ko(),Z=i.memoizedState,D||ut!==Z||Za?(typeof Mt=="function"&&(yf(i,s,Mt,l),Z=i.memoizedState),(I=Za||ug(i,s,I,l,ut,Z,E))?(pt||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=Z),d.props=l,d.state=Z,d.context=E,l=I):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{d=i.stateNode,zf(e,i),E=i.memoizedProps,pt=Fs(s,E),d.props=pt,Mt=i.pendingProps,ut=d.context,Z=s.contextType,I=gr,typeof Z=="object"&&Z!==null&&(I=jn(Z)),D=s.getDerivedStateFromProps,(Z=typeof D=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(E!==Mt||ut!==I)&&fg(i,d,l,I),Za=!1,ut=i.memoizedState,d.state=ut,Go(i,l,d,u),ko();var dt=i.memoizedState;E!==Mt||ut!==dt||Za||e!==null&&e.dependencies!==null&&nc(e.dependencies)?(typeof D=="function"&&(yf(i,s,D,l),dt=i.memoizedState),(pt=Za||ug(i,s,pt,l,ut,dt,I)||e!==null&&e.dependencies!==null&&nc(e.dependencies))?(Z||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(l,dt,I),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(l,dt,I)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||E===e.memoizedProps&&ut===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||E===e.memoizedProps&&ut===e.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=dt),d.props=l,d.state=dt,d.context=I,l=pt):(typeof d.componentDidUpdate!="function"||E===e.memoizedProps&&ut===e.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||E===e.memoizedProps&&ut===e.memoizedState||(i.flags|=1024),l=!1)}return d=l,Fo(e,i),l=(i.flags&128)!==0,d||l?(d=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,e!==null&&l?(i.child=Ls(i,e.child,null,u),i.child=Ls(i,null,s,u)):Ln(e,i,s,u),i.memoizedState=d.state,e=i.child):e=ma(e,i,u),e}function Ag(e,i,s,l){return wo(),i.flags|=256,Ln(e,i,s,l),i.child}var Ef={dehydrated:null,treeContext:null,retryLane:0};function Tf(e){return{baseLanes:e,cachePool:Rm()}}function Af(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=Ri),e}function wg(e,i,s){var l=i.pendingProps,u=!1,d=(i.flags&128)!==0,E;if((E=d)||(E=e!==null&&e.memoizedState===null?!1:(bn.current&2)!==0),E&&(u=!0,i.flags&=-129),E=(i.flags&32)!==0,i.flags&=-33,e===null){if(Oe){if(u?ja(i):Xa(),Oe){var D=Nn,I;if(I=D){t:{for(I=D,D=Ji;I.nodeType!==8;){if(!D){D=null;break t}if(I=ki(I.nextSibling),I===null){D=null;break t}}D=I}D!==null?(i.memoizedState={dehydrated:D,treeContext:Ds!==null?{id:fa,overflow:ha}:null,retryLane:536870912},I=wi(18,null,null,0),I.stateNode=D,I.return=i,i.child=I,Zn=i,Nn=null,I=!0):I=!1}I||Ns(i)}if(D=i.memoizedState,D!==null&&(D=D.dehydrated,D!==null))return D.data==="$!"?i.lanes=16:i.lanes=536870912,null;da(i)}return D=l.children,l=l.fallback,u?(Xa(),u=i.mode,D=Rf({mode:"hidden",children:D},u),l=Gs(l,u,s,null),D.return=i,l.return=i,D.sibling=l,i.child=D,u=i.child,u.memoizedState=Tf(s),u.childLanes=Af(e,E,s),i.memoizedState=Ef,l):(ja(i),wf(i,D))}if(I=e.memoizedState,I!==null&&(D=I.dehydrated,D!==null)){if(d)i.flags&256?(ja(i),i.flags&=-257,i=Cf(e,i,s)):i.memoizedState!==null?(Xa(),i.child=e.child,i.flags|=128,i=null):(Xa(),u=l.fallback,D=i.mode,l=Rf({mode:"visible",children:l.children},D),u=Gs(u,D,s,null),u.flags|=2,l.return=i,u.return=i,l.sibling=u,i.child=l,Ls(i,e.child,null,s),l=i.child,l.memoizedState=Tf(s),l.childLanes=Af(e,E,s),i.memoizedState=Ef,i=u);else if(ja(i),D.data==="$!"){if(E=D.nextSibling&&D.nextSibling.dataset,E)var Z=E.dgst;E=Z,l=Error(a(419)),l.stack="",l.digest=E,Ro({value:l,source:null,stack:null}),i=Cf(e,i,s)}else if(Rn||Io(e,i,s,!1),E=(s&e.childLanes)!==0,Rn||E){if(E=$e,E!==null){if(l=s&-s,(l&42)!==0)l=1;else switch(l){case 2:l=1;break;case 8:l=4;break;case 32:l=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:l=64;break;case 268435456:l=134217728;break;default:l=0}if(l=(l&(E.suspendedLanes|s))!==0?0:l,l!==0&&l!==I.retryLane)throw I.retryLane=l,Va(e,l),Kn(E,e,l),vg}D.data==="$?"||ih(),i=Cf(e,i,s)}else D.data==="$?"?(i.flags|=128,i.child=e.child,i=Ny.bind(null,e),D._reactRetry=i,i=null):(e=I.treeContext,Nn=ki(D.nextSibling),Zn=i,Oe=!0,Ii=null,Ji=!1,e!==null&&(Mi[bi++]=fa,Mi[bi++]=ha,Mi[bi++]=Ds,fa=e.id,ha=e.overflow,Ds=i),i=wf(i,l.children),i.flags|=4096);return i}return u?(Xa(),u=l.fallback,D=i.mode,I=e.child,Z=I.sibling,l=es(I,{mode:"hidden",children:l.children}),l.subtreeFlags=I.subtreeFlags&31457280,Z!==null?u=es(Z,u):(u=Gs(u,D,s,null),u.flags|=2),u.return=i,l.return=i,l.sibling=u,i.child=l,l=u,u=i.child,D=e.child.memoizedState,D===null?D=Tf(s):(I=D.cachePool,I!==null?(Z=En._currentValue,I=I.parent!==Z?{parent:Z,pool:Z}:I):I=Rm(),D={baseLanes:D.baseLanes|s,cachePool:I}),u.memoizedState=D,u.childLanes=Af(e,E,s),i.memoizedState=Ef,l):(ja(i),s=e.child,e=s.sibling,s=es(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,e!==null&&(E=i.deletions,E===null?(i.deletions=[e],i.flags|=16):E.push(e)),i.child=s,i.memoizedState=null,s)}function wf(e,i){return i=Rf({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function Rf(e,i){return Jg(e,i,0,null)}function Cf(e,i,s){return Ls(i,e.child,null,s),e=wf(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function Rg(e,i,s){e.lanes|=i;var l=e.alternate;l!==null&&(l.lanes|=i),Lf(e.return,i,s)}function Df(e,i,s,l,u){var d=e.memoizedState;d===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:u}:(d.isBackwards=i,d.rendering=null,d.renderingStartTime=0,d.last=l,d.tail=s,d.tailMode=u)}function Cg(e,i,s){var l=i.pendingProps,u=l.revealOrder,d=l.tail;if(Ln(e,i,l.children,s),l=bn.current,(l&2)!==0)l=l&1|2,i.flags|=128;else{if(e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Rg(e,s,i);else if(e.tag===19)Rg(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}l&=1}switch(Ht(bn,l),u){case"forwards":for(s=i.child,u=null;s!==null;)e=s.alternate,e!==null&&jl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),Df(i,!1,u,s,d);break;case"backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&jl(e)===null){i.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Df(i,!0,s,null,d);break;case"together":Df(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function ma(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),ns|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(Io(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=es(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=es(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Uf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&nc(e)))}function vy(e,i,s){switch(i.tag){case 3:dn(i,i.stateNode.containerInfo),Ya(i,En,e.memoizedState.cache),wo();break;case 27:case 5:he(i);break;case 4:dn(i,i.stateNode.containerInfo);break;case 10:Ya(i,i.type,i.memoizedProps.value);break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(ja(i),i.flags|=128,null):(s&i.child.childLanes)!==0?wg(e,i,s):(ja(i),e=ma(e,i,s),e!==null?e.sibling:null);ja(i);break;case 19:var u=(e.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(Io(e,i,s,!1),l=(s&i.childLanes)!==0),u){if(l)return Cg(e,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Ht(bn,bn.current),l)break;return null;case 22:case 23:return i.lanes=0,Mg(e,i,s);case 24:Ya(i,En,e.memoizedState.cache)}return ma(e,i,s)}function Dg(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)Rn=!0;else{if(!Uf(e,s)&&(i.flags&128)===0)return Rn=!1,vy(e,i,s);Rn=(e.flags&131072)!==0}else Rn=!1,Oe&&(i.flags&1048576)!==0&&pm(i,Il,i.index);switch(i.lanes=0,i.tag){case 16:t:{e=i.pendingProps;var l=i.elementType,u=l._init;if(l=u(l._payload),i.type=l,typeof l=="function")Xf(l)?(e=Fs(l,e),i.tag=1,i=Tg(null,i,l,e,s)):(i.tag=0,i=bf(null,i,l,e,s));else{if(l!=null){if(u=l.$$typeof,u===b){i.tag=11,i=xg(null,i,l,e,s);break t}else if(u===y){i.tag=14,i=yg(null,i,l,e,s);break t}}throw i=P(l)||l,Error(a(306,i,""))}}return i;case 0:return bf(e,i,i.type,i.pendingProps,s);case 1:return l=i.type,u=Fs(l,i.pendingProps),Tg(e,i,l,u,s);case 3:t:{if(dn(i,i.stateNode.containerInfo),e===null)throw Error(a(387));var d=i.pendingProps;u=i.memoizedState,l=u.element,zf(e,i),Go(i,d,null,s);var E=i.memoizedState;if(d=E.cache,Ya(i,En,d),d!==u.cache&&Of(i,[En],s,!0),ko(),d=E.element,u.isDehydrated)if(u={element:d,isDehydrated:!1,cache:E.cache},i.updateQueue.baseState=u,i.memoizedState=u,i.flags&256){i=Ag(e,i,d,s);break t}else if(d!==l){l=Si(Error(a(424)),i),Ro(l),i=Ag(e,i,d,s);break t}else for(Nn=ki(i.stateNode.containerInfo.firstChild),Zn=i,Oe=!0,Ii=null,Ji=!0,s=bm(i,null,d,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling;else{if(wo(),d===l){i=ma(e,i,s);break t}Ln(e,i,d,s)}i=i.child}return i;case 26:return Fo(e,i),e===null?(s=L_(i.type,null,i.pendingProps,null))?i.memoizedState=s:Oe||(s=i.type,e=i.pendingProps,l=vc(Re.current).createElement(s),l[pn]=i,l[mn]=e,On(l,s,e),X(l),i.stateNode=l):i.memoizedState=L_(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return he(i),e===null&&Oe&&(l=i.stateNode=D_(i.type,i.pendingProps,Re.current),Zn=i,Ji=!0,Nn=ki(l.firstChild)),l=i.pendingProps.children,e!==null||Oe?Ln(e,i,l,s):i.child=Ls(i,null,l,s),Fo(e,i),i.child;case 5:return e===null&&Oe&&((u=l=Nn)&&(l=Yy(l,i.type,i.pendingProps,Ji),l!==null?(i.stateNode=l,Zn=i,Nn=ki(l.firstChild),Ji=!1,u=!0):u=!1),u||Ns(i)),he(i),u=i.type,d=i.pendingProps,E=e!==null?e.memoizedProps:null,l=d.children,_h(u,d)?l=null:E!==null&&_h(u,E)&&(i.flags|=32),i.memoizedState!==null&&(u=sf(e,i,fy,null,null,s),il._currentValue=u),Fo(e,i),Ln(e,i,l,s),i.child;case 6:return e===null&&Oe&&((e=s=Nn)&&(s=Zy(s,i.pendingProps,Ji),s!==null?(i.stateNode=s,Zn=i,Nn=null,e=!0):e=!1),e||Ns(i)),null;case 13:return wg(e,i,s);case 4:return dn(i,i.stateNode.containerInfo),l=i.pendingProps,e===null?i.child=Ls(i,null,l,s):Ln(e,i,l,s),i.child;case 11:return xg(e,i,i.type,i.pendingProps,s);case 7:return Ln(e,i,i.pendingProps,s),i.child;case 8:return Ln(e,i,i.pendingProps.children,s),i.child;case 12:return Ln(e,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Ya(i,i.type,l.value),Ln(e,i,l.children,s),i.child;case 9:return u=i.type._context,l=i.pendingProps.children,Hs(i),u=jn(u),l=l(u),i.flags|=1,Ln(e,i,l,s),i.child;case 14:return yg(e,i,i.type,i.pendingProps,s);case 15:return Sg(e,i,i.type,i.pendingProps,s);case 19:return Cg(e,i,s);case 22:return Mg(e,i,s);case 24:return Hs(i),l=jn(En),e===null?(u=nf(),u===null&&(u=$e,d=tf(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=s),u=d),i.memoizedState={parent:l,cache:u},Pf(i),Ya(i,En,u)):((e.lanes&s)!==0&&(zf(e,i),Go(i,null,null,s),ko()),u=e.memoizedState,d=i.memoizedState,u.parent!==l?(u={parent:l,cache:l},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Ya(i,En,l)):(l=d.cache,Ya(i,En,l),l!==u.cache&&Of(i,[En],s,!0))),Ln(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}var Nf=Ut(null),Is=null,ga=null;function Ya(e,i,s){Ht(Nf,i._currentValue),i._currentValue=s}function _a(e){e._currentValue=Nf.current,jt(Nf)}function Lf(e,i,s){for(;e!==null;){var l=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),e===s)break;e=e.return}}function Of(e,i,s,l){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var d=u.dependencies;if(d!==null){var E=u.child;d=d.firstContext;t:for(;d!==null;){var D=d;d=u;for(var I=0;I<i.length;I++)if(D.context===i[I]){d.lanes|=s,D=d.alternate,D!==null&&(D.lanes|=s),Lf(d.return,s,e),l||(E=null);break t}d=D.next}}else if(u.tag===18){if(E=u.return,E===null)throw Error(a(341));E.lanes|=s,d=E.alternate,d!==null&&(d.lanes|=s),Lf(E,s,e),E=null}else E=u.child;if(E!==null)E.return=u;else for(E=u;E!==null;){if(E===e){E=null;break}if(u=E.sibling,u!==null){u.return=E.return,E=u;break}E=E.return}u=E}}function Io(e,i,s,l){e=null;for(var u=i,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var E=u.alternate;if(E===null)throw Error(a(387));if(E=E.memoizedProps,E!==null){var D=u.type;fi(u.pendingProps.value,E.value)||(e!==null?e.push(D):e=[D])}}else if(u===j.current){if(E=u.alternate,E===null)throw Error(a(387));E.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(il):e=[il])}u=u.return}e!==null&&Of(i,e,s,l),i.flags|=262144}function nc(e){for(e=e.firstContext;e!==null;){if(!fi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Hs(e){Is=e,ga=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function jn(e){return Ug(Is,e)}function ic(e,i){return Is===null&&Hs(e),Ug(e,i)}function Ug(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},ga===null){if(e===null)throw Error(a(308));ga=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else ga=ga.next=i;return s}var Za=!1;function Pf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function zf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ka(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Qa(e,i,s){var l=e.updateQueue;if(l===null)return null;if(l=l.shared,(on&2)!==0){var u=l.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),l.pending=i,i=Bl(e),hm(e,null,s),i}return zl(e,l,i,s),Bl(e)}function Ho(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194176)!==0)){var l=i.lanes;l&=e.pendingLanes,s|=l,i.lanes=s,ci(e,s)}}function Bf(e,i){var s=e.updateQueue,l=e.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var u=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var E={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?u=d=E:d=d.next=E,s=s.next}while(s!==null);d===null?u=d=i:d=d.next=i}else u=d=i;s={baseState:l.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:l.shared,callbacks:l.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var Ff=!1;function ko(){if(Ff){var e=Mr;if(e!==null)throw e}}function Go(e,i,s,l){Ff=!1;var u=e.updateQueue;Za=!1;var d=u.firstBaseUpdate,E=u.lastBaseUpdate,D=u.shared.pending;if(D!==null){u.shared.pending=null;var I=D,Z=I.next;I.next=null,E===null?d=Z:E.next=Z,E=I;var pt=e.alternate;pt!==null&&(pt=pt.updateQueue,D=pt.lastBaseUpdate,D!==E&&(D===null?pt.firstBaseUpdate=Z:D.next=Z,pt.lastBaseUpdate=I))}if(d!==null){var Mt=u.baseState;E=0,pt=Z=I=null,D=d;do{var ut=D.lane&-536870913,dt=ut!==D.lane;if(dt?(Ne&ut)===ut:(l&ut)===ut){ut!==0&&ut===Sr&&(Ff=!0),pt!==null&&(pt=pt.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});t:{var $t=e,de=D;ut=i;var fn=s;switch(de.tag){case 1:if($t=de.payload,typeof $t=="function"){Mt=$t.call(fn,Mt,ut);break t}Mt=$t;break t;case 3:$t.flags=$t.flags&-65537|128;case 0:if($t=de.payload,ut=typeof $t=="function"?$t.call(fn,Mt,ut):$t,ut==null)break t;Mt=A({},Mt,ut);break t;case 2:Za=!0}}ut=D.callback,ut!==null&&(e.flags|=64,dt&&(e.flags|=8192),dt=u.callbacks,dt===null?u.callbacks=[ut]:dt.push(ut))}else dt={lane:ut,tag:D.tag,payload:D.payload,callback:D.callback,next:null},pt===null?(Z=pt=dt,I=Mt):pt=pt.next=dt,E|=ut;if(D=D.next,D===null){if(D=u.shared.pending,D===null)break;dt=D,D=dt.next,dt.next=null,u.lastBaseUpdate=dt,u.shared.pending=null}}while(!0);pt===null&&(I=Mt),u.baseState=I,u.firstBaseUpdate=Z,u.lastBaseUpdate=pt,d===null&&(u.shared.lanes=0),ns|=E,e.lanes=E,e.memoizedState=Mt}}function Ng(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Lg(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)Ng(s[e],i)}function Vo(e,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var u=l.next;s=u;do{if((s.tag&e)===e){l=void 0;var d=s.create,E=s.inst;l=d(),E.destroy=l}s=s.next}while(s!==u)}}catch(D){Ye(i,i.return,D)}}function $a(e,i,s){try{var l=i.updateQueue,u=l!==null?l.lastEffect:null;if(u!==null){var d=u.next;l=d;do{if((l.tag&e)===e){var E=l.inst,D=E.destroy;if(D!==void 0){E.destroy=void 0,u=i;var I=s;try{D()}catch(Z){Ye(u,I,Z)}}}l=l.next}while(l!==d)}}catch(Z){Ye(i,i.return,Z)}}function Og(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Lg(i,s)}catch(l){Ye(e,e.return,l)}}}function Pg(e,i,s){s.props=Fs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(l){Ye(e,i,l)}}function ks(e,i){try{var s=e.ref;if(s!==null){var l=e.stateNode;switch(e.tag){case 26:case 27:case 5:var u=l;break;default:u=l}typeof s=="function"?e.refCleanup=s(u):s.current=u}}catch(d){Ye(e,i,d)}}function hi(e,i){var s=e.ref,l=e.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(u){Ye(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Ye(e,i,u)}else s.current=null}function zg(e){var i=e.type,s=e.memoizedProps,l=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break t;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(u){Ye(e,e.return,u)}}function Bg(e,i,s){try{var l=e.stateNode;Vy(l,e.type,s,i),l[mn]=i}catch(u){Ye(e,e.return,u)}}function Fg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27||e.tag===4}function If(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Fg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==27&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hf(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.nodeType===8?s.parentNode.insertBefore(e,i):s.insertBefore(e,i):(s.nodeType===8?(i=s.parentNode,i.insertBefore(e,s)):(i=s,i.appendChild(e)),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=_c));else if(l!==4&&l!==27&&(e=e.child,e!==null))for(Hf(e,i,s),e=e.sibling;e!==null;)Hf(e,i,s),e=e.sibling}function ac(e,i,s){var l=e.tag;if(l===5||l===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(l!==4&&l!==27&&(e=e.child,e!==null))for(ac(e,i,s),e=e.sibling;e!==null;)ac(e,i,s),e=e.sibling}var va=!1,cn=!1,kf=!1,Ig=typeof WeakSet=="function"?WeakSet:Set,Cn=null,Hg=!1;function xy(e,i){if(e=e.containerInfo,mh=Ec,e=im(e),Gu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var u=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break t}var E=0,D=-1,I=-1,Z=0,pt=0,Mt=e,ut=null;e:for(;;){for(var dt;Mt!==s||u!==0&&Mt.nodeType!==3||(D=E+u),Mt!==d||l!==0&&Mt.nodeType!==3||(I=E+l),Mt.nodeType===3&&(E+=Mt.nodeValue.length),(dt=Mt.firstChild)!==null;)ut=Mt,Mt=dt;for(;;){if(Mt===e)break e;if(ut===s&&++Z===u&&(D=E),ut===d&&++pt===l&&(I=E),(dt=Mt.nextSibling)!==null)break;Mt=ut,ut=Mt.parentNode}Mt=dt}s=D===-1||I===-1?null:{start:D,end:I}}else s=null}s=s||{start:0,end:0}}else s=null;for(gh={focusedElem:e,selectionRange:s},Ec=!1,Cn=i;Cn!==null;)if(i=Cn,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,Cn=e;else for(;Cn!==null;){switch(i=Cn,d=i.alternate,e=i.flags,i.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,s=i,u=d.memoizedProps,d=d.memoizedState,l=s.stateNode;try{var $t=Fs(s.type,u,s.elementType===s.type);e=l.getSnapshotBeforeUpdate($t,d),l.__reactInternalSnapshotBeforeUpdate=e}catch(de){Ye(s,s.return,de)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)yh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":yh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,Cn=e;break}Cn=i.return}return $t=Hg,Hg=!1,$t}function kg(e,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:ya(e,s),l&4&&Vo(5,s);break;case 1:if(ya(e,s),l&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(D){Ye(s,s.return,D)}else{var u=Fs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(D){Ye(s,s.return,D)}}l&64&&Og(s),l&512&&ks(s,s.return);break;case 3:if(ya(e,s),l&64&&(l=s.updateQueue,l!==null)){if(e=null,s.child!==null)switch(s.child.tag){case 27:case 5:e=s.child.stateNode;break;case 1:e=s.child.stateNode}try{Lg(l,e)}catch(D){Ye(s,s.return,D)}}break;case 26:ya(e,s),l&512&&ks(s,s.return);break;case 27:case 5:ya(e,s),i===null&&l&4&&zg(s),l&512&&ks(s,s.return);break;case 12:ya(e,s);break;case 13:ya(e,s),l&4&&jg(e,s);break;case 22:if(u=s.memoizedState!==null||va,!u){i=i!==null&&i.memoizedState!==null||cn;var d=va,E=cn;va=u,(cn=i)&&!E?Ja(e,s,(s.subtreeFlags&8772)!==0):ya(e,s),va=d,cn=E}l&512&&(s.memoizedProps.mode==="manual"?ks(s,s.return):hi(s,s.return));break;default:ya(e,s)}}function Gg(e){var i=e.alternate;i!==null&&(e.alternate=null,Gg(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&zi(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Sn=null,di=!1;function xa(e,i,s){for(s=s.child;s!==null;)Vg(e,i,s),s=s.sibling}function Vg(e,i,s){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(Jt,s)}catch{}switch(s.tag){case 26:cn||hi(s,i),xa(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:cn||hi(s,i);var l=Sn,u=di;for(Sn=s.stateNode,xa(e,i,s),s=s.stateNode,i=s.attributes;i.length;)s.removeAttributeNode(i[0]);zi(s),Sn=l,di=u;break;case 5:cn||hi(s,i);case 6:u=Sn;var d=di;if(Sn=null,xa(e,i,s),Sn=u,di=d,Sn!==null)if(di)try{e=Sn,l=s.stateNode,e.nodeType===8?e.parentNode.removeChild(l):e.removeChild(l)}catch(E){Ye(s,i,E)}else try{Sn.removeChild(s.stateNode)}catch(E){Ye(s,i,E)}break;case 18:Sn!==null&&(di?(i=Sn,s=s.stateNode,i.nodeType===8?xh(i.parentNode,s):i.nodeType===1&&xh(i,s),ol(i)):xh(Sn,s.stateNode));break;case 4:l=Sn,u=di,Sn=s.stateNode.containerInfo,di=!0,xa(e,i,s),Sn=l,di=u;break;case 0:case 11:case 14:case 15:cn||$a(2,s,i),cn||$a(4,s,i),xa(e,i,s);break;case 1:cn||(hi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&Pg(s,i,l)),xa(e,i,s);break;case 21:xa(e,i,s);break;case 22:cn||hi(s,i),cn=(l=cn)||s.memoizedState!==null,xa(e,i,s),cn=l;break;default:xa(e,i,s)}}function jg(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ol(e)}catch(s){Ye(i,i.return,s)}}function yy(e){switch(e.tag){case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new Ig),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new Ig),i;default:throw Error(a(435,e.tag))}}function Gf(e,i){var s=yy(e);i.forEach(function(l){var u=Ly.bind(null,e,l);s.has(l)||(s.add(l),l.then(u,u))})}function Ti(e,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var u=s[l],d=e,E=i,D=E;t:for(;D!==null;){switch(D.tag){case 27:case 5:Sn=D.stateNode,di=!1;break t;case 3:Sn=D.stateNode.containerInfo,di=!0;break t;case 4:Sn=D.stateNode.containerInfo,di=!0;break t}D=D.return}if(Sn===null)throw Error(a(160));Vg(d,E,u),Sn=null,di=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(i.subtreeFlags&13878)for(i=i.child;i!==null;)Xg(i,e),i=i.sibling}var Hi=null;function Xg(e,i){var s=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ti(i,e),Ai(e),l&4&&($a(3,e,e.return),Vo(3,e),$a(5,e,e.return));break;case 1:Ti(i,e),Ai(e),l&512&&(cn||s===null||hi(s,s.return)),l&64&&va&&(e=e.updateQueue,e!==null&&(l=e.callbacks,l!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var u=Hi;if(Ti(i,e),Ai(e),l&512&&(cn||s===null||hi(s,s.return)),l&4){var d=s!==null?s.memoizedState:null;if(l=e.memoizedState,s===null)if(l===null)if(e.stateNode===null){t:{l=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(l){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Yn]||d[pn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(l),u.head.insertBefore(d,u.querySelector("head > title"))),On(d,l,s),d[pn]=e,X(d),l=d;break t;case"link":var E=z_("link","href",u).get(l+(s.href||""));if(E){for(var D=0;D<E.length;D++)if(d=E[D],d.getAttribute("href")===(s.href==null?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){E.splice(D,1);break e}}d=u.createElement(l),On(d,l,s),u.head.appendChild(d);break;case"meta":if(E=z_("meta","content",u).get(l+(s.content||""))){for(D=0;D<E.length;D++)if(d=E[D],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){E.splice(D,1);break e}}d=u.createElement(l),On(d,l,s),u.head.appendChild(d);break;default:throw Error(a(468,l))}d[pn]=e,X(d),l=d}e.stateNode=l}else B_(u,e.type,e.stateNode);else e.stateNode=P_(u,l,e.memoizedProps);else d!==l?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,l===null?B_(u,e.type,e.stateNode):P_(u,l,e.memoizedProps)):l===null&&e.stateNode!==null&&Bg(e,e.memoizedProps,s.memoizedProps)}break;case 27:if(l&4&&e.alternate===null){u=e.stateNode,d=e.memoizedProps;try{for(var I=u.firstChild;I;){var Z=I.nextSibling,pt=I.nodeName;I[Yn]||pt==="HEAD"||pt==="BODY"||pt==="SCRIPT"||pt==="STYLE"||pt==="LINK"&&I.rel.toLowerCase()==="stylesheet"||u.removeChild(I),I=Z}for(var Mt=e.type,ut=u.attributes;ut.length;)u.removeAttributeNode(ut[0]);On(u,Mt,d),u[pn]=e,u[mn]=d}catch($t){Ye(e,e.return,$t)}}case 5:if(Ti(i,e),Ai(e),l&512&&(cn||s===null||hi(s,s.return)),e.flags&32){u=e.stateNode;try{Vn(u,"")}catch($t){Ye(e,e.return,$t)}}l&4&&e.stateNode!=null&&(u=e.memoizedProps,Bg(e,u,s!==null?s.memoizedProps:u)),l&1024&&(kf=!0);break;case 6:if(Ti(i,e),Ai(e),l&4){if(e.stateNode===null)throw Error(a(162));l=e.memoizedProps,s=e.stateNode;try{s.nodeValue=l}catch($t){Ye(e,e.return,$t)}}break;case 3:if(Sc=null,u=Hi,Hi=xc(i.containerInfo),Ti(i,e),Hi=u,Ai(e),l&4&&s!==null&&s.memoizedState.isDehydrated)try{ol(i.containerInfo)}catch($t){Ye(e,e.return,$t)}kf&&(kf=!1,Wg(e));break;case 4:l=Hi,Hi=xc(e.stateNode.containerInfo),Ti(i,e),Ai(e),Hi=l;break;case 12:Ti(i,e),Ai(e);break;case 13:Ti(i,e),Ai(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Qf=gt()),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Gf(e,l)));break;case 22:if(l&512&&(cn||s===null||hi(s,s.return)),I=e.memoizedState!==null,Z=s!==null&&s.memoizedState!==null,pt=va,Mt=cn,va=pt||I,cn=Mt||Z,Ti(i,e),cn=Mt,va=pt,Ai(e),i=e.stateNode,i._current=e,i._visibility&=-3,i._visibility|=i._pendingVisibility&2,l&8192&&(i._visibility=I?i._visibility&-2:i._visibility|1,I&&(i=va||cn,s===null||Z||i||Ar(e)),e.memoizedProps===null||e.memoizedProps.mode!=="manual"))t:for(s=null,i=e;;){if(i.tag===5||i.tag===26||i.tag===27){if(s===null){Z=s=i;try{if(u=Z.stateNode,I)d=u.style,typeof d.setProperty=="function"?d.setProperty("display","none","important"):d.display="none";else{E=Z.stateNode,D=Z.memoizedProps.style;var dt=D!=null&&D.hasOwnProperty("display")?D.display:null;E.style.display=dt==null||typeof dt=="boolean"?"":(""+dt).trim()}}catch($t){Ye(Z,Z.return,$t)}}}else if(i.tag===6){if(s===null){Z=i;try{Z.stateNode.nodeValue=I?"":Z.memoizedProps}catch($t){Ye(Z,Z.return,$t)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=e.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,Gf(e,s))));break;case 19:Ti(i,e),Ai(e),l&4&&(l=e.updateQueue,l!==null&&(e.updateQueue=null,Gf(e,l)));break;case 21:break;default:Ti(i,e),Ai(e)}}function Ai(e){var i=e.flags;if(i&2){try{if(e.tag!==27){t:{for(var s=e.return;s!==null;){if(Fg(s)){var l=s;break t}s=s.return}throw Error(a(160))}switch(l.tag){case 27:var u=l.stateNode,d=If(e);ac(e,d,u);break;case 5:var E=l.stateNode;l.flags&32&&(Vn(E,""),l.flags&=-33);var D=If(e);ac(e,D,E);break;case 3:case 4:var I=l.stateNode.containerInfo,Z=If(e);Hf(e,Z,I);break;default:throw Error(a(161))}}}catch(pt){Ye(e,e.return,pt)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function Wg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;Wg(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function ya(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)kg(e,i.alternate,i),i=i.sibling}function Ar(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:$a(4,i,i.return),Ar(i);break;case 1:hi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&Pg(i,i.return,s),Ar(i);break;case 26:case 27:case 5:hi(i,i.return),Ar(i);break;case 22:hi(i,i.return),i.memoizedState===null&&Ar(i);break;default:Ar(i)}e=e.sibling}}function Ja(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,u=e,d=i,E=d.flags;switch(d.tag){case 0:case 11:case 15:Ja(u,d,s),Vo(4,d);break;case 1:if(Ja(u,d,s),l=d,u=l.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(Z){Ye(l,l.return,Z)}if(l=d,u=l.updateQueue,u!==null){var D=l.stateNode;try{var I=u.shared.hiddenCallbacks;if(I!==null)for(u.shared.hiddenCallbacks=null,u=0;u<I.length;u++)Ng(I[u],D)}catch(Z){Ye(l,l.return,Z)}}s&&E&64&&Og(d),ks(d,d.return);break;case 26:case 27:case 5:Ja(u,d,s),s&&l===null&&E&4&&zg(d),ks(d,d.return);break;case 12:Ja(u,d,s);break;case 13:Ja(u,d,s),s&&E&4&&jg(u,d);break;case 22:d.memoizedState===null&&Ja(u,d,s),ks(d,d.return);break;default:Ja(u,d,s)}i=i.sibling}}function Vf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&Lo(s))}function jf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&Lo(e))}function ts(e,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)qg(e,i,s,l),i=i.sibling}function qg(e,i,s,l){var u=i.flags;switch(i.tag){case 0:case 11:case 15:ts(e,i,s,l),u&2048&&Vo(9,i);break;case 3:ts(e,i,s,l),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&Lo(e)));break;case 12:if(u&2048){ts(e,i,s,l),e=i.stateNode;try{var d=i.memoizedProps,E=d.id,D=d.onPostCommit;typeof D=="function"&&D(E,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(I){Ye(i,i.return,I)}}else ts(e,i,s,l);break;case 23:break;case 22:d=i.stateNode,i.memoizedState!==null?d._visibility&4?ts(e,i,s,l):jo(e,i):d._visibility&4?ts(e,i,s,l):(d._visibility|=4,wr(e,i,s,l,(i.subtreeFlags&10256)!==0)),u&2048&&Vf(i.alternate,i);break;case 24:ts(e,i,s,l),u&2048&&jf(i.alternate,i);break;default:ts(e,i,s,l)}}function wr(e,i,s,l,u){for(u=u&&(i.subtreeFlags&10256)!==0,i=i.child;i!==null;){var d=e,E=i,D=s,I=l,Z=E.flags;switch(E.tag){case 0:case 11:case 15:wr(d,E,D,I,u),Vo(8,E);break;case 23:break;case 22:var pt=E.stateNode;E.memoizedState!==null?pt._visibility&4?wr(d,E,D,I,u):jo(d,E):(pt._visibility|=4,wr(d,E,D,I,u)),u&&Z&2048&&Vf(E.alternate,E);break;case 24:wr(d,E,D,I,u),u&&Z&2048&&jf(E.alternate,E);break;default:wr(d,E,D,I,u)}i=i.sibling}}function jo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,l=i,u=l.flags;switch(l.tag){case 22:jo(s,l),u&2048&&Vf(l.alternate,l);break;case 24:jo(s,l),u&2048&&jf(l.alternate,l);break;default:jo(s,l)}i=i.sibling}}var Xo=8192;function Rr(e){if(e.subtreeFlags&Xo)for(e=e.child;e!==null;)Yg(e),e=e.sibling}function Yg(e){switch(e.tag){case 26:Rr(e),e.flags&Xo&&e.memoizedState!==null&&lS(Hi,e.memoizedState,e.memoizedProps);break;case 5:Rr(e);break;case 3:case 4:var i=Hi;Hi=xc(e.stateNode.containerInfo),Rr(e),Hi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Xo,Xo=16777216,Rr(e),Xo=i):Rr(e));break;default:Rr(e)}}function Zg(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Wo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Cn=l,Qg(l,e)}Zg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Kg(e),e=e.sibling}function Kg(e){switch(e.tag){case 0:case 11:case 15:Wo(e),e.flags&2048&&$a(9,e,e.return);break;case 3:Wo(e);break;case 12:Wo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&4&&(e.return===null||e.return.tag!==13)?(i._visibility&=-5,sc(e)):Wo(e);break;default:Wo(e)}}function sc(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];Cn=l,Qg(l,e)}Zg(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:$a(8,i,i.return),sc(i);break;case 22:s=i.stateNode,s._visibility&4&&(s._visibility&=-5,sc(i));break;default:sc(i)}e=e.sibling}}function Qg(e,i){for(;Cn!==null;){var s=Cn;switch(s.tag){case 0:case 11:case 15:$a(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:Lo(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,Cn=l;else t:for(s=e;Cn!==null;){l=Cn;var u=l.sibling,d=l.return;if(Gg(l),l===s){Cn=null;break t}if(u!==null){u.return=d,Cn=u;break t}Cn=d}}}function Sy(e,i,s,l){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function wi(e,i,s,l){return new Sy(e,i,s,l)}function Xf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function es(e,i){var s=e.alternate;return s===null?(s=wi(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&31457280,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function $g(e,i){e.flags&=31457282;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function rc(e,i,s,l,u,d){var E=0;if(l=e,typeof e=="function")Xf(e)&&(E=1);else if(typeof e=="string")E=rS(e,s,ve.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case p:return Gs(s.children,u,d,i);case m:E=8,u|=24;break;case _:return e=wi(12,s,i,u|2),e.elementType=_,e.lanes=d,e;case T:return e=wi(13,s,i,u),e.elementType=T,e.lanes=d,e;case S:return e=wi(19,s,i,u),e.elementType=S,e.lanes=d,e;case O:return Jg(s,u,d,i);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case g:case M:E=10;break t;case x:E=9;break t;case b:E=11;break t;case y:E=14;break t;case F:E=16,l=null;break t}E=29,s=Error(a(130,e===null?"null":typeof e,"")),l=null}return i=wi(E,s,i,u),i.elementType=e,i.type=l,i.lanes=d,i}function Gs(e,i,s,l){return e=wi(7,e,l,i),e.lanes=s,e}function Jg(e,i,s,l){e=wi(22,e,l,i),e.elementType=O,e.lanes=s;var u={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var d=u._current;if(d===null)throw Error(a(456));if((u._pendingVisibility&2)===0){var E=Va(d,2);E!==null&&(u._pendingVisibility|=2,Kn(E,d,2))}},attach:function(){var d=u._current;if(d===null)throw Error(a(456));if((u._pendingVisibility&2)!==0){var E=Va(d,2);E!==null&&(u._pendingVisibility&=-3,Kn(E,d,2))}}};return e.stateNode=u,e}function Wf(e,i,s){return e=wi(6,e,null,i),e.lanes=s,e}function qf(e,i,s){return i=wi(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}function Sa(e){e.flags|=4}function t_(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!F_(i)){if(i=Ei.current,i!==null&&((Ne&4194176)===Ne?ta!==null:(Ne&62914560)!==Ne&&(Ne&536870912)===0||i!==ta))throw Do=Qu,_m;e.flags|=8192}}function oc(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?Ue():536870912,e.lanes|=i,Dr|=i)}function qo(e,i){if(!Oe)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:l.sibling=null}}function rn(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,l=0;if(i)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,l|=u.subtreeFlags&31457280,l|=u.flags&31457280,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,l|=u.subtreeFlags,l|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=l,e.childLanes=s,i}function My(e,i,s){var l=i.pendingProps;switch(Zu(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rn(i),null;case 1:return rn(i),null;case 3:return s=i.stateNode,l=null,e!==null&&(l=e.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),_a(En),fe(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Ao(i)?Sa(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Ii!==null&&(eh(Ii),Ii=null))),rn(i),null;case 26:return s=i.memoizedState,e===null?(Sa(i),s!==null?(rn(i),t_(i,s)):(rn(i),i.flags&=-16777217)):s?s!==e.memoizedState?(Sa(i),rn(i),t_(i,s)):(rn(i),i.flags&=-16777217):(e.memoizedProps!==l&&Sa(i),rn(i),i.flags&=-16777217),null;case 27:Yt(i),s=Re.current;var u=i.type;if(e!==null&&i.stateNode!=null)e.memoizedProps!==l&&Sa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return rn(i),null}e=ve.current,Ao(i)?mm(i):(e=D_(u,l,s),i.stateNode=e,Sa(i))}return rn(i),null;case 5:if(Yt(i),s=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==l&&Sa(i);else{if(!l){if(i.stateNode===null)throw Error(a(166));return rn(i),null}if(e=ve.current,Ao(i))mm(i);else{switch(u=vc(Re.current),e){case 1:e=u.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:e=u.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":e=u.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":e=u.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":e=u.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof l.is=="string"?u.createElement("select",{is:l.is}):u.createElement("select"),l.multiple?e.multiple=!0:l.size&&(e.size=l.size);break;default:e=typeof l.is=="string"?u.createElement(s,{is:l.is}):u.createElement(s)}}e[pn]=i,e[mn]=l;t:for(u=i.child;u!==null;){if(u.tag===5||u.tag===6)e.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===i)break t;for(;u.sibling===null;){if(u.return===null||u.return===i)break t;u=u.return}u.sibling.return=u.return,u=u.sibling}i.stateNode=e;t:switch(On(e,s,l),s){case"button":case"input":case"select":case"textarea":e=!!l.autoFocus;break t;case"img":e=!0;break t;default:e=!1}e&&Sa(i)}}return rn(i),i.flags&=-16777217,null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==l&&Sa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(a(166));if(e=Re.current,Ao(i)){if(e=i.stateNode,s=i.memoizedProps,l=null,u=Zn,u!==null)switch(u.tag){case 27:case 5:l=u.memoizedProps}e[pn]=i,e=!!(e.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||E_(e.nodeValue,s)),e||Ns(i)}else e=vc(e).createTextNode(l),e[pn]=i,i.stateNode=e}return rn(i),null;case 13:if(l=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Ao(i),l!==null&&l.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[pn]=i}else wo(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;rn(i),u=!1}else Ii!==null&&(eh(Ii),Ii=null),u=!0;if(!u)return i.flags&256?(da(i),i):(da(i),null)}if(da(i),(i.flags&128)!==0)return i.lanes=s,i;if(s=l!==null,e=e!==null&&e.memoizedState!==null,s){l=i.child,u=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(u=l.alternate.memoizedState.cachePool.pool);var d=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(d=l.memoizedState.cachePool.pool),d!==u&&(l.flags|=2048)}return s!==e&&s&&(i.child.flags|=8192),oc(i,i.updateQueue),rn(i),null;case 4:return fe(),e===null&&hh(i.stateNode.containerInfo),rn(i),null;case 10:return _a(i.type),rn(i),null;case 19:if(jt(bn),u=i.memoizedState,u===null)return rn(i),null;if(l=(i.flags&128)!==0,d=u.rendering,d===null)if(l)qo(u,!1);else{if(un!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(d=jl(e),d!==null){for(i.flags|=128,qo(u,!1),e=d.updateQueue,i.updateQueue=e,oc(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)$g(s,e),s=s.sibling;return Ht(bn,bn.current&1|2),i.child}e=e.sibling}u.tail!==null&&gt()>lc&&(i.flags|=128,l=!0,qo(u,!1),i.lanes=4194304)}else{if(!l)if(e=jl(d),e!==null){if(i.flags|=128,l=!0,e=e.updateQueue,i.updateQueue=e,oc(i,e),qo(u,!0),u.tail===null&&u.tailMode==="hidden"&&!d.alternate&&!Oe)return rn(i),null}else 2*gt()-u.renderingStartTime>lc&&s!==536870912&&(i.flags|=128,l=!0,qo(u,!1),i.lanes=4194304);u.isBackwards?(d.sibling=i.child,i.child=d):(e=u.last,e!==null?e.sibling=d:i.child=d,u.last=d)}return u.tail!==null?(i=u.tail,u.rendering=i,u.tail=i.sibling,u.renderingStartTime=gt(),i.sibling=null,e=bn.current,Ht(bn,l?e&1|2:e&1),i):(rn(i),null);case 22:case 23:return da(i),Ju(),l=i.memoizedState!==null,e!==null?e.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(rn(i),i.subtreeFlags&6&&(i.flags|=8192)):rn(i),s=i.updateQueue,s!==null&&oc(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),e!==null&&jt(Os),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),_a(En),rn(i),null;case 25:return null}throw Error(a(156,i.tag))}function by(e,i){switch(Zu(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return _a(En),fe(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Yt(i),null;case 13:if(da(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));wo()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return jt(bn),null;case 4:return fe(),null;case 10:return _a(i.type),null;case 22:case 23:return da(i),Ju(),e!==null&&jt(Os),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return _a(En),null;case 25:return null;default:return null}}function e_(e,i){switch(Zu(i),i.tag){case 3:_a(En),fe();break;case 26:case 27:case 5:Yt(i);break;case 4:fe();break;case 13:da(i);break;case 19:jt(bn);break;case 10:_a(i.type);break;case 22:case 23:da(i),Ju(),e!==null&&jt(Os);break;case 24:_a(En)}}var Ey={getCacheForType:function(e){var i=jn(En),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s}},Ty=typeof WeakMap=="function"?WeakMap:Map,on=0,$e=null,we=null,Ne=0,Je=0,pi=null,Ma=!1,Cr=!1,Yf=!1,ba=0,un=0,ns=0,Vs=0,Zf=0,Ri=0,Dr=0,Yo=null,na=null,Kf=!1,Qf=0,lc=1/0,cc=null,is=null,uc=!1,js=null,Zo=0,$f=0,Jf=null,Ko=0,th=null;function mi(){if((on&2)!==0&&Ne!==0)return Ne&-Ne;if(w.T!==null){var e=Sr;return e!==0?e:lh()}return ua()}function n_(){Ri===0&&(Ri=(Ne&536870912)===0||Oe?ln():536870912);var e=Ei.current;return e!==null&&(e.flags|=32),Ri}function Kn(e,i,s){(e===$e&&Je===2||e.cancelPendingCommit!==null)&&(Ur(e,0),Ea(e,Ne,Ri,!1)),an(e,s),((on&2)===0||e!==$e)&&(e===$e&&((on&2)===0&&(Vs|=s),un===4&&Ea(e,Ne,Ri,!1)),ia(e))}function i_(e,i,s){if((on&6)!==0)throw Error(a(327));var l=!s&&(i&60)===0&&(i&e.expiredLanes)===0||re(e,i),u=l?Ry(e,i):ah(e,i,!0),d=l;do{if(u===0){Cr&&!l&&Ea(e,i,0,!1);break}else if(u===6)Ea(e,i,0,!Ma);else{if(s=e.current.alternate,d&&!Ay(s)){u=ah(e,i,!1),d=!1;continue}if(u===2){if(d=i,e.errorRecoveryDisabledLanes&d)var E=0;else E=e.pendingLanes&-536870913,E=E!==0?E:E&536870912?536870912:0;if(E!==0){i=E;t:{var D=e;u=Yo;var I=D.current.memoizedState.isDehydrated;if(I&&(Ur(D,E).flags|=256),E=ah(D,E,!1),E!==2){if(Yf&&!I){D.errorRecoveryDisabledLanes|=d,Vs|=d,u=4;break t}d=na,na=u,d!==null&&eh(d)}u=E}if(d=!1,u!==2)continue}}if(u===1){Ur(e,0),Ea(e,i,0,!0);break}t:{switch(l=e,u){case 0:case 1:throw Error(a(345));case 4:if((i&4194176)===i){Ea(l,i,Ri,!Ma);break t}break;case 2:na=null;break;case 3:case 5:break;default:throw Error(a(329))}if(l.finishedWork=s,l.finishedLanes=i,(i&62914560)===i&&(d=Qf+300-gt(),10<d)){if(Ea(l,i,Ri,!Ma),Pt(l,0)!==0)break t;l.timeoutHandle=w_(a_.bind(null,l,s,na,cc,Kf,i,Ri,Vs,Dr,Ma,2,-0,0),d);break t}a_(l,s,na,cc,Kf,i,Ri,Vs,Dr,Ma,0,-0,0)}}break}while(!0);ia(e)}function eh(e){na===null?na=e:na.push.apply(na,e)}function a_(e,i,s,l,u,d,E,D,I,Z,pt,Mt,ut){var dt=i.subtreeFlags;if((dt&8192||(dt&16785408)===16785408)&&(nl={stylesheets:null,count:0,unsuspend:oS},Yg(i),i=cS(),i!==null)){e.cancelPendingCommit=i(f_.bind(null,e,s,l,u,E,D,I,1,Mt,ut)),Ea(e,d,E,!Z);return}f_(e,s,l,u,E,D,I,pt,Mt,ut)}function Ay(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var u=s[l],d=u.getSnapshot;u=u.value;try{if(!fi(d(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ea(e,i,s,l){i&=~Zf,i&=~Vs,e.suspendedLanes|=i,e.pingedLanes&=~i,l&&(e.warmLanes|=i),l=e.expirationTimes;for(var u=i;0<u;){var d=31-te(u),E=1<<d;l[d]=-1,u&=~E}s!==0&&Ki(e,s,i)}function fc(){return(on&6)===0?(Qo(0),!1):!0}function nh(){if(we!==null){if(Je===0)var e=we.return;else e=we,ga=Is=null,lf(e),xr=null,Uo=0,e=we;for(;e!==null;)e_(e.alternate,e),e=e.return;we=null}}function Ur(e,i){e.finishedWork=null,e.finishedLanes=0;var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,Xy(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),nh(),$e=e,we=s=es(e.current,null),Ne=i,Je=0,pi=null,Ma=!1,Cr=re(e,i),Yf=!1,Dr=Ri=Zf=Vs=ns=un=0,na=Yo=null,Kf=!1,(i&8)!==0&&(i|=i&32);var l=e.entangledLanes;if(l!==0)for(e=e.entanglements,l&=i;0<l;){var u=31-te(l),d=1<<u;i|=e[u],l&=~d}return ba=i,Pl(),s}function s_(e,i){Me=null,w.H=ea,i===Co?(i=ym(),Je=3):i===_m?(i=ym(),Je=4):Je=i===vg?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,pi=i,we===null&&(un=1,ec(e,Si(i,e.current)))}function r_(){var e=w.H;return w.H=ea,e===null?ea:e}function o_(){var e=w.A;return w.A=Ey,e}function ih(){un=4,Ma||(Ne&4194176)!==Ne&&Ei.current!==null||(Cr=!0),(ns&134217727)===0&&(Vs&134217727)===0||$e===null||Ea($e,Ne,Ri,!1)}function ah(e,i,s){var l=on;on|=2;var u=r_(),d=o_();($e!==e||Ne!==i)&&(cc=null,Ur(e,i)),i=!1;var E=un;t:do try{if(Je!==0&&we!==null){var D=we,I=pi;switch(Je){case 8:nh(),E=6;break t;case 3:case 2:case 6:Ei.current===null&&(i=!0);var Z=Je;if(Je=0,pi=null,Nr(e,D,I,Z),s&&Cr){E=0;break t}break;default:Z=Je,Je=0,pi=null,Nr(e,D,I,Z)}}wy(),E=un;break}catch(pt){s_(e,pt)}while(!0);return i&&e.shellSuspendCounter++,ga=Is=null,on=l,w.H=u,w.A=d,we===null&&($e=null,Ne=0,Pl()),E}function wy(){for(;we!==null;)l_(we)}function Ry(e,i){var s=on;on|=2;var l=r_(),u=o_();$e!==e||Ne!==i?(cc=null,lc=gt()+500,Ur(e,i)):Cr=re(e,i);t:do try{if(Je!==0&&we!==null){i=we;var d=pi;e:switch(Je){case 1:Je=0,pi=null,Nr(e,i,d,1);break;case 2:if(vm(d)){Je=0,pi=null,c_(i);break}i=function(){Je===2&&$e===e&&(Je=7),ia(e)},d.then(i,i);break t;case 3:Je=7;break t;case 4:Je=5;break t;case 7:vm(d)?(Je=0,pi=null,c_(i)):(Je=0,pi=null,Nr(e,i,d,7));break;case 5:var E=null;switch(we.tag){case 26:E=we.memoizedState;case 5:case 27:var D=we;if(!E||F_(E)){Je=0,pi=null;var I=D.sibling;if(I!==null)we=I;else{var Z=D.return;Z!==null?(we=Z,hc(Z)):we=null}break e}}Je=0,pi=null,Nr(e,i,d,5);break;case 6:Je=0,pi=null,Nr(e,i,d,6);break;case 8:nh(),un=6;break t;default:throw Error(a(462))}}Cy();break}catch(pt){s_(e,pt)}while(!0);return ga=Is=null,w.H=l,w.A=u,on=s,we!==null?0:($e=null,Ne=0,Pl(),un)}function Cy(){for(;we!==null&&!R();)l_(we)}function l_(e){var i=Dg(e.alternate,e,ba);e.memoizedProps=e.pendingProps,i===null?hc(e):we=i}function c_(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=Eg(s,i,i.pendingProps,i.type,void 0,Ne);break;case 11:i=Eg(s,i,i.pendingProps,i.type.render,i.ref,Ne);break;case 5:lf(i);default:e_(s,i),i=we=$g(i,ba),i=Dg(s,i,ba)}e.memoizedProps=e.pendingProps,i===null?hc(e):we=i}function Nr(e,i,s,l){ga=Is=null,lf(i),xr=null,Uo=0;var u=i.return;try{if(_y(e,u,i,s,Ne)){un=1,ec(e,Si(s,e.current)),we=null;return}}catch(d){if(u!==null)throw we=u,d;un=1,ec(e,Si(s,e.current)),we=null;return}i.flags&32768?(Oe||l===1?e=!0:Cr||(Ne&536870912)!==0?e=!1:(Ma=e=!0,(l===2||l===3||l===6)&&(l=Ei.current,l!==null&&l.tag===13&&(l.flags|=16384))),u_(i,e)):hc(i)}function hc(e){var i=e;do{if((i.flags&32768)!==0){u_(i,Ma);return}e=i.return;var s=My(i.alternate,i,ba);if(s!==null){we=s;return}if(i=i.sibling,i!==null){we=i;return}we=i=e}while(i!==null);un===0&&(un=5)}function u_(e,i){do{var s=by(e.alternate,e);if(s!==null){s.flags&=32767,we=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){we=e;return}we=e=s}while(e!==null);un=6,we=null}function f_(e,i,s,l,u,d,E,D,I,Z){var pt=w.T,Mt=J.p;try{J.p=2,w.T=null,Dy(e,i,s,l,Mt,u,d,E,D,I,Z)}finally{w.T=pt,J.p=Mt}}function Dy(e,i,s,l,u,d,E,D){do Lr();while(js!==null);if((on&6)!==0)throw Error(a(327));var I=e.finishedWork;if(l=e.finishedLanes,I===null)return null;if(e.finishedWork=null,e.finishedLanes=0,I===e.current)throw Error(a(177));e.callbackNode=null,e.callbackPriority=0,e.cancelPendingCommit=null;var Z=I.lanes|I.childLanes;if(Z|=Wu,xi(e,l,Z,d,E,D),e===$e&&(we=$e=null,Ne=0),(I.subtreeFlags&10256)===0&&(I.flags&10256)===0||uc||(uc=!0,$f=Z,Jf=s,Oy(Ct,function(){return Lr(),null})),s=(I.flags&15990)!==0,(I.subtreeFlags&15990)!==0||s?(s=w.T,w.T=null,d=J.p,J.p=2,E=on,on|=4,xy(e,I),Xg(I,e),ty(gh,e.containerInfo),Ec=!!mh,gh=mh=null,e.current=I,kg(e,I.alternate,I),at(),on=E,J.p=d,w.T=s):e.current=I,uc?(uc=!1,js=e,Zo=l):h_(e,Z),Z=e.pendingLanes,Z===0&&(is=null),Ot(I.stateNode),ia(e),i!==null)for(u=e.onRecoverableError,I=0;I<i.length;I++)Z=i[I],u(Z.value,{componentStack:Z.stack});return(Zo&3)!==0&&Lr(),Z=e.pendingLanes,(l&4194218)!==0&&(Z&42)!==0?e===th?Ko++:(Ko=0,th=e):Ko=0,Qo(0),null}function h_(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,Lo(i)))}function Lr(){if(js!==null){var e=js,i=$f;$f=0;var s=Hn(Zo),l=w.T,u=J.p;try{if(J.p=32>s?32:s,w.T=null,js===null)var d=!1;else{s=Jf,Jf=null;var E=js,D=Zo;if(js=null,Zo=0,(on&6)!==0)throw Error(a(331));var I=on;if(on|=4,Kg(E.current),qg(E,E.current,D,s),on=I,Qo(0,!1),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(Jt,E)}catch{}d=!0}return d}finally{J.p=u,w.T=l,h_(e,i)}}return!1}function d_(e,i,s){i=Si(s,i),i=Mf(e.stateNode,i,2),e=Qa(e,i,2),e!==null&&(an(e,2),ia(e))}function Ye(e,i,s){if(e.tag===3)d_(e,e,s);else for(;i!==null;){if(i.tag===3){d_(i,e,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(is===null||!is.has(l))){e=Si(s,e),s=gg(2),l=Qa(i,s,2),l!==null&&(_g(s,l,i,e),an(l,2),ia(l));break}}i=i.return}}function sh(e,i,s){var l=e.pingCache;if(l===null){l=e.pingCache=new Ty;var u=new Set;l.set(i,u)}else u=l.get(i),u===void 0&&(u=new Set,l.set(i,u));u.has(s)||(Yf=!0,u.add(s),e=Uy.bind(null,e,i,s),i.then(e,e))}function Uy(e,i,s){var l=e.pingCache;l!==null&&l.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,$e===e&&(Ne&s)===s&&(un===4||un===3&&(Ne&62914560)===Ne&&300>gt()-Qf?(on&2)===0&&Ur(e,0):Zf|=s,Dr===Ne&&(Dr=0)),ia(e)}function p_(e,i){i===0&&(i=Ue()),e=Va(e,i),e!==null&&(an(e,i),ia(e))}function Ny(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),p_(e,s)}function Ly(e,i){var s=0;switch(e.tag){case 13:var l=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:l=e.stateNode;break;case 22:l=e.stateNode._retryCache;break;default:throw Error(a(314))}l!==null&&l.delete(i),p_(e,s)}function Oy(e,i){return Wt(e,i)}var dc=null,Or=null,rh=!1,pc=!1,oh=!1,Xs=0;function ia(e){e!==Or&&e.next===null&&(Or===null?dc=Or=e:Or=Or.next=e),pc=!0,rh||(rh=!0,zy(Py))}function Qo(e,i){if(!oh&&pc){oh=!0;do for(var s=!1,l=dc;l!==null;){if(e!==0){var u=l.pendingLanes;if(u===0)var d=0;else{var E=l.suspendedLanes,D=l.pingedLanes;d=(1<<31-te(42|e)+1)-1,d&=u&~(E&~D),d=d&201326677?d&201326677|1:d?d|2:0}d!==0&&(s=!0,__(l,d))}else d=Ne,d=Pt(l,l===$e?d:0),(d&3)===0||re(l,d)||(s=!0,__(l,d));l=l.next}while(s);oh=!1}}function Py(){pc=rh=!1;var e=0;Xs!==0&&(jy()&&(e=Xs),Xs=0);for(var i=gt(),s=null,l=dc;l!==null;){var u=l.next,d=m_(l,i);d===0?(l.next=null,s===null?dc=u:s.next=u,u===null&&(Or=s)):(s=l,(e!==0||(d&3)!==0)&&(pc=!0)),l=u}Qo(e)}function m_(e,i){for(var s=e.suspendedLanes,l=e.pingedLanes,u=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var E=31-te(d),D=1<<E,I=u[E];I===-1?((D&s)===0||(D&l)!==0)&&(u[E]=Ke(D,i)):I<=i&&(e.expiredLanes|=D),d&=~D}if(i=$e,s=Ne,s=Pt(e,e===i?s:0),l=e.callbackNode,s===0||e===i&&Je===2||e.cancelPendingCommit!==null)return l!==null&&l!==null&&B(l),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||re(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(l!==null&&B(l),Hn(s)){case 2:case 8:s=Zt;break;case 32:s=Ct;break;case 268435456:s=xe;break;default:s=Ct}return l=g_.bind(null,e),s=Wt(s,l),e.callbackPriority=i,e.callbackNode=s,i}return l!==null&&l!==null&&B(l),e.callbackPriority=2,e.callbackNode=null,2}function g_(e,i){var s=e.callbackNode;if(Lr()&&e.callbackNode!==s)return null;var l=Ne;return l=Pt(e,e===$e?l:0),l===0?null:(i_(e,l,i),m_(e,gt()),e.callbackNode!=null&&e.callbackNode===s?g_.bind(null,e):null)}function __(e,i){if(Lr())return null;i_(e,i,!0)}function zy(e){Wy(function(){(on&6)!==0?Wt(vt,e):e()})}function lh(){return Xs===0&&(Xs=ln()),Xs}function v_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:As(""+e)}function x_(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function By(e,i,s,l,u){if(i==="submit"&&s&&s.stateNode===u){var d=v_((u[mn]||null).action),E=l.submitter;E&&(i=(i=E[mn]||null)?v_(i.formAction):E.getAttribute("formAction"),i!==null&&(d=i,E=null));var D=new Nl("action","action",null,l,u);e.push({event:D,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Xs!==0){var I=E?x_(u,E):new FormData(u);_f(s,{pending:!0,data:I,method:u.method,action:d},null,I)}}else typeof d=="function"&&(D.preventDefault(),I=E?x_(u,E):new FormData(u),_f(s,{pending:!0,data:I,method:u.method,action:d},d,I))},currentTarget:u}]})}}for(var ch=0;ch<fm.length;ch++){var uh=fm[ch],Fy=uh.toLowerCase(),Iy=uh[0].toUpperCase()+uh.slice(1);Fi(Fy,"on"+Iy)}Fi(rm,"onAnimationEnd"),Fi(om,"onAnimationIteration"),Fi(lm,"onAnimationStart"),Fi("dblclick","onDoubleClick"),Fi("focusin","onFocus"),Fi("focusout","onBlur"),Fi(ny,"onTransitionRun"),Fi(iy,"onTransitionStart"),Fi(ay,"onTransitionCancel"),Fi(cm,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),Ft("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ft("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ft("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ft("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ft("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ft("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $o="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($o));function y_(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var l=e[s],u=l.event;l=l.listeners;t:{var d=void 0;if(i)for(var E=l.length-1;0<=E;E--){var D=l[E],I=D.instance,Z=D.currentTarget;if(D=D.listener,I!==d&&u.isPropagationStopped())break t;d=D,u.currentTarget=Z;try{d(u)}catch(pt){tc(pt)}u.currentTarget=null,d=I}else for(E=0;E<l.length;E++){if(D=l[E],I=D.instance,Z=D.currentTarget,D=D.listener,I!==d&&u.isPropagationStopped())break t;d=D,u.currentTarget=Z;try{d(u)}catch(pt){tc(pt)}u.currentTarget=null,d=I}}}}function De(e,i){var s=i[Fa];s===void 0&&(s=i[Fa]=new Set);var l=e+"__bubble";s.has(l)||(S_(i,e,2,!1),s.add(l))}function fh(e,i,s){var l=0;i&&(l|=4),S_(s,e,l,i)}var mc="_reactListening"+Math.random().toString(36).slice(2);function hh(e){if(!e[mc]){e[mc]=!0,Et.forEach(function(s){s!=="selectionchange"&&(Hy.has(s)||fh(s,!1,e),fh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[mc]||(i[mc]=!0,fh("selectionchange",!1,i))}}function S_(e,i,s,l){switch(j_(i)){case 2:var u=hS;break;case 8:u=dS;break;default:u=Th}s=u.bind(null,i,s,e),u=void 0,!Lu||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),l?u!==void 0?e.addEventListener(i,s,{capture:!0,passive:u}):e.addEventListener(i,s,!0):u!==void 0?e.addEventListener(i,s,{passive:u}):e.addEventListener(i,s,!1)}function dh(e,i,s,l,u){var d=l;if((i&1)===0&&(i&2)===0&&l!==null)t:for(;;){if(l===null)return;var E=l.tag;if(E===3||E===4){var D=l.stateNode.containerInfo;if(D===u||D.nodeType===8&&D.parentNode===u)break;if(E===4)for(E=l.return;E!==null;){var I=E.tag;if((I===3||I===4)&&(I=E.stateNode.containerInfo,I===u||I.nodeType===8&&I.parentNode===u))return;E=E.return}for(;D!==null;){if(E=C(D),E===null)return;if(I=E.tag,I===5||I===6||I===26||I===27){l=d=E;continue t}D=D.parentNode}}l=l.return}zp(function(){var Z=d,pt=$i(s),Mt=[];t:{var ut=um.get(e);if(ut!==void 0){var dt=Nl,$t=e;switch(e){case"keypress":if(Dl(s)===0)break t;case"keydown":case"keyup":dt=Lx;break;case"focusin":$t="focus",dt=Bu;break;case"focusout":$t="blur",dt=Bu;break;case"beforeblur":case"afterblur":dt=Bu;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":dt=Ip;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":dt=Sx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":dt=zx;break;case rm:case om:case lm:dt=Ex;break;case cm:dt=Fx;break;case"scroll":case"scrollend":dt=xx;break;case"wheel":dt=Hx;break;case"copy":case"cut":case"paste":dt=Ax;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":dt=kp;break;case"toggle":case"beforetoggle":dt=Gx}var de=(i&4)!==0,fn=!de&&(e==="scroll"||e==="scrollend"),et=de?ut!==null?ut+"Capture":null:ut;de=[];for(var q=Z,st;q!==null;){var yt=q;if(st=yt.stateNode,yt=yt.tag,yt!==5&&yt!==26&&yt!==27||st===null||et===null||(yt=_o(q,et),yt!=null&&de.push(Jo(q,yt,st))),fn)break;q=q.return}0<de.length&&(ut=new dt(ut,$t,null,s,pt),Mt.push({event:ut,listeners:de}))}}if((i&7)===0){t:{if(ut=e==="mouseover"||e==="pointerover",dt=e==="mouseout"||e==="pointerout",ut&&s!==Bi&&($t=s.relatedTarget||s.fromElement)&&(C($t)||$t[Pi]))break t;if((dt||ut)&&(ut=pt.window===pt?pt:(ut=pt.ownerDocument)?ut.defaultView||ut.parentWindow:window,dt?($t=s.relatedTarget||s.toElement,dt=Z,$t=$t?C($t):null,$t!==null&&(fn=W($t),de=$t.tag,$t!==fn||de!==5&&de!==27&&de!==6)&&($t=null)):(dt=null,$t=Z),dt!==$t)){if(de=Ip,yt="onMouseLeave",et="onMouseEnter",q="mouse",(e==="pointerout"||e==="pointerover")&&(de=kp,yt="onPointerLeave",et="onPointerEnter",q="pointer"),fn=dt==null?ut:ct(dt),st=$t==null?ut:ct($t),ut=new de(yt,q+"leave",dt,s,pt),ut.target=fn,ut.relatedTarget=st,yt=null,C(pt)===Z&&(de=new de(et,q+"enter",$t,s,pt),de.target=st,de.relatedTarget=fn,yt=de),fn=yt,dt&&$t)e:{for(de=dt,et=$t,q=0,st=de;st;st=Pr(st))q++;for(st=0,yt=et;yt;yt=Pr(yt))st++;for(;0<q-st;)de=Pr(de),q--;for(;0<st-q;)et=Pr(et),st--;for(;q--;){if(de===et||et!==null&&de===et.alternate)break e;de=Pr(de),et=Pr(et)}de=null}else de=null;dt!==null&&M_(Mt,ut,dt,de,!1),$t!==null&&fn!==null&&M_(Mt,fn,$t,de,!0)}}t:{if(ut=Z?ct(Z):window,dt=ut.nodeName&&ut.nodeName.toLowerCase(),dt==="select"||dt==="input"&&ut.type==="file")var Xt=Zp;else if(qp(ut))if(Kp)Xt=$x;else{Xt=Kx;var Ee=Zx}else dt=ut.nodeName,!dt||dt.toLowerCase()!=="input"||ut.type!=="checkbox"&&ut.type!=="radio"?Z&&gn(Z.elementType)&&(Xt=Zp):Xt=Qx;if(Xt&&(Xt=Xt(e,Z))){Yp(Mt,Xt,s,pt);break t}Ee&&Ee(e,ut,Z),e==="focusout"&&Z&&ut.type==="number"&&Z.memoizedProps.value!=null&&Ve(ut,"number",ut.value)}switch(Ee=Z?ct(Z):window,e){case"focusin":(qp(Ee)||Ee.contentEditable==="true")&&(dr=Ee,Vu=Z,To=null);break;case"focusout":To=Vu=dr=null;break;case"mousedown":ju=!0;break;case"contextmenu":case"mouseup":case"dragend":ju=!1,am(Mt,s,pt);break;case"selectionchange":if(ey)break;case"keydown":case"keyup":am(Mt,s,pt)}var ae;if(Iu)t:{switch(e){case"compositionstart":var oe="onCompositionStart";break t;case"compositionend":oe="onCompositionEnd";break t;case"compositionupdate":oe="onCompositionUpdate";break t}oe=void 0}else hr?Xp(e,s)&&(oe="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(oe="onCompositionStart");oe&&(Gp&&s.locale!=="ko"&&(hr||oe!=="onCompositionStart"?oe==="onCompositionEnd"&&hr&&(ae=Bp()):(Ga=pt,Ou="value"in Ga?Ga.value:Ga.textContent,hr=!0)),Ee=gc(Z,oe),0<Ee.length&&(oe=new Hp(oe,e,null,s,pt),Mt.push({event:oe,listeners:Ee}),ae?oe.data=ae:(ae=Wp(s),ae!==null&&(oe.data=ae)))),(ae=jx?Xx(e,s):Wx(e,s))&&(oe=gc(Z,"onBeforeInput"),0<oe.length&&(Ee=new Hp("onBeforeInput","beforeinput",null,s,pt),Mt.push({event:Ee,listeners:oe}),Ee.data=ae)),By(Mt,e,Z,s,pt)}y_(Mt,i)})}function Jo(e,i,s){return{instance:e,listener:i,currentTarget:s}}function gc(e,i){for(var s=i+"Capture",l=[];e!==null;){var u=e,d=u.stateNode;u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=_o(e,s),u!=null&&l.unshift(Jo(e,u,d)),u=_o(e,i),u!=null&&l.push(Jo(e,u,d))),e=e.return}return l}function Pr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function M_(e,i,s,l,u){for(var d=i._reactName,E=[];s!==null&&s!==l;){var D=s,I=D.alternate,Z=D.stateNode;if(D=D.tag,I!==null&&I===l)break;D!==5&&D!==26&&D!==27||Z===null||(I=Z,u?(Z=_o(s,d),Z!=null&&E.unshift(Jo(s,Z,I))):u||(Z=_o(s,d),Z!=null&&E.push(Jo(s,Z,I)))),s=s.return}E.length!==0&&e.push({event:i,listeners:E})}var ky=/\r\n?/g,Gy=/\u0000|\uFFFD/g;function b_(e){return(typeof e=="string"?e:""+e).replace(ky,`
`).replace(Gy,"")}function E_(e,i){return i=b_(i),b_(e)===i}function _c(){}function Xe(e,i,s,l,u,d){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Vn(e,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Vn(e,""+l);break;case"className":He(e,"class",l);break;case"tabIndex":He(e,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":He(e,s,l);break;case"style":Ha(e,l,d);break;case"data":if(i!=="object"){He(e,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=As(""+l),e.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(i!=="input"&&Xe(e,i,"name",u.name,u,null),Xe(e,i,"formEncType",u.formEncType,u,null),Xe(e,i,"formMethod",u.formMethod,u,null),Xe(e,i,"formTarget",u.formTarget,u,null)):(Xe(e,i,"encType",u.encType,u,null),Xe(e,i,"method",u.method,u,null),Xe(e,i,"target",u.target,u,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){e.removeAttribute(s);break}l=As(""+l),e.setAttribute(s,l);break;case"onClick":l!=null&&(e.onclick=_c);break;case"onScroll":l!=null&&De("scroll",e);break;case"onScrollEnd":l!=null&&De("scrollend",e);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":e.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){e.removeAttribute("xlink:href");break}s=As(""+l),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""+l):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":l===!0?e.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?e.setAttribute(s,l):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?e.setAttribute(s,l):e.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?e.removeAttribute(s):e.setAttribute(s,l);break;case"popover":De("beforetoggle",e),De("toggle",e),Ge(e,"popover",l);break;case"xlinkActuate":ue(e,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":ue(e,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":ue(e,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":ue(e,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":ue(e,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":ue(e,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":ue(e,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":ue(e,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":ue(e,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":Ge(e,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=ka.get(s)||s,Ge(e,s,l))}}function ph(e,i,s,l,u,d){switch(s){case"style":Ha(e,l,d);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(a(61));if(s=l.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof l=="string"?Vn(e,l):(typeof l=="number"||typeof l=="bigint")&&Vn(e,""+l);break;case"onScroll":l!=null&&De("scroll",e);break;case"onScrollEnd":l!=null&&De("scrollend",e);break;case"onClick":l!=null&&(e.onclick=_c);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!zt.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),d=e[mn]||null,d=d!=null?d[s]:null,typeof d=="function"&&e.removeEventListener(i,d,u),typeof l=="function")){typeof d!="function"&&d!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,l,u);break t}s in e?e[s]=l:l===!0?e.setAttribute(s,""):Ge(e,s,l)}}}function On(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":De("error",e),De("load",e);var l=!1,u=!1,d;for(d in s)if(s.hasOwnProperty(d)){var E=s[d];if(E!=null)switch(d){case"src":l=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Xe(e,i,d,E,s,null)}}u&&Xe(e,i,"srcSet",s.srcSet,s,null),l&&Xe(e,i,"src",s.src,s,null);return;case"input":De("invalid",e);var D=d=E=u=null,I=null,Z=null;for(l in s)if(s.hasOwnProperty(l)){var pt=s[l];if(pt!=null)switch(l){case"name":u=pt;break;case"type":E=pt;break;case"checked":I=pt;break;case"defaultChecked":Z=pt;break;case"value":d=pt;break;case"defaultValue":D=pt;break;case"children":case"dangerouslySetInnerHTML":if(pt!=null)throw Error(a(137,i));break;default:Xe(e,i,l,pt,s,null)}}en(e,d,D,I,Z,E,u,!1),_t(e);return;case"select":De("invalid",e),l=E=d=null;for(u in s)if(s.hasOwnProperty(u)&&(D=s[u],D!=null))switch(u){case"value":d=D;break;case"defaultValue":E=D;break;case"multiple":l=D;default:Xe(e,i,u,D,s,null)}i=d,s=E,e.multiple=!!l,i!=null?Fe(e,!!l,i,!1):s!=null&&Fe(e,!!l,s,!0);return;case"textarea":De("invalid",e),d=u=l=null;for(E in s)if(s.hasOwnProperty(E)&&(D=s[E],D!=null))switch(E){case"value":l=D;break;case"defaultValue":u=D;break;case"children":d=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(a(91));break;default:Xe(e,i,E,D,s,null)}Qe(e,l,u,d),_t(e);return;case"option":for(I in s)if(s.hasOwnProperty(I)&&(l=s[I],l!=null))switch(I){case"selected":e.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Xe(e,i,I,l,s,null)}return;case"dialog":De("cancel",e),De("close",e);break;case"iframe":case"object":De("load",e);break;case"video":case"audio":for(l=0;l<$o.length;l++)De($o[l],e);break;case"image":De("error",e),De("load",e);break;case"details":De("toggle",e);break;case"embed":case"source":case"link":De("error",e),De("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Z in s)if(s.hasOwnProperty(Z)&&(l=s[Z],l!=null))switch(Z){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:Xe(e,i,Z,l,s,null)}return;default:if(gn(i)){for(pt in s)s.hasOwnProperty(pt)&&(l=s[pt],l!==void 0&&ph(e,i,pt,l,s,void 0));return}}for(D in s)s.hasOwnProperty(D)&&(l=s[D],l!=null&&Xe(e,i,D,l,s,null))}function Vy(e,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,E=null,D=null,I=null,Z=null,pt=null;for(dt in s){var Mt=s[dt];if(s.hasOwnProperty(dt)&&Mt!=null)switch(dt){case"checked":break;case"value":break;case"defaultValue":I=Mt;default:l.hasOwnProperty(dt)||Xe(e,i,dt,null,l,Mt)}}for(var ut in l){var dt=l[ut];if(Mt=s[ut],l.hasOwnProperty(ut)&&(dt!=null||Mt!=null))switch(ut){case"type":d=dt;break;case"name":u=dt;break;case"checked":Z=dt;break;case"defaultChecked":pt=dt;break;case"value":E=dt;break;case"defaultValue":D=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(a(137,i));break;default:dt!==Mt&&Xe(e,i,ut,dt,l,Mt)}}Le(e,E,D,I,Z,pt,d,u);return;case"select":dt=E=D=ut=null;for(d in s)if(I=s[d],s.hasOwnProperty(d)&&I!=null)switch(d){case"value":break;case"multiple":dt=I;default:l.hasOwnProperty(d)||Xe(e,i,d,null,l,I)}for(u in l)if(d=l[u],I=s[u],l.hasOwnProperty(u)&&(d!=null||I!=null))switch(u){case"value":ut=d;break;case"defaultValue":D=d;break;case"multiple":E=d;default:d!==I&&Xe(e,i,u,d,l,I)}i=D,s=E,l=dt,ut!=null?Fe(e,!!s,ut,!1):!!l!=!!s&&(i!=null?Fe(e,!!s,i,!0):Fe(e,!!s,s?[]:"",!1));return;case"textarea":dt=ut=null;for(D in s)if(u=s[D],s.hasOwnProperty(D)&&u!=null&&!l.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:Xe(e,i,D,null,l,u)}for(E in l)if(u=l[E],d=s[E],l.hasOwnProperty(E)&&(u!=null||d!=null))switch(E){case"value":ut=u;break;case"defaultValue":dt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==d&&Xe(e,i,E,u,l,d)}Qi(e,ut,dt);return;case"option":for(var $t in s)if(ut=s[$t],s.hasOwnProperty($t)&&ut!=null&&!l.hasOwnProperty($t))switch($t){case"selected":e.selected=!1;break;default:Xe(e,i,$t,null,l,ut)}for(I in l)if(ut=l[I],dt=s[I],l.hasOwnProperty(I)&&ut!==dt&&(ut!=null||dt!=null))switch(I){case"selected":e.selected=ut&&typeof ut!="function"&&typeof ut!="symbol";break;default:Xe(e,i,I,ut,l,dt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var de in s)ut=s[de],s.hasOwnProperty(de)&&ut!=null&&!l.hasOwnProperty(de)&&Xe(e,i,de,null,l,ut);for(Z in l)if(ut=l[Z],dt=s[Z],l.hasOwnProperty(Z)&&ut!==dt&&(ut!=null||dt!=null))switch(Z){case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(a(137,i));break;default:Xe(e,i,Z,ut,l,dt)}return;default:if(gn(i)){for(var fn in s)ut=s[fn],s.hasOwnProperty(fn)&&ut!==void 0&&!l.hasOwnProperty(fn)&&ph(e,i,fn,void 0,l,ut);for(pt in l)ut=l[pt],dt=s[pt],!l.hasOwnProperty(pt)||ut===dt||ut===void 0&&dt===void 0||ph(e,i,pt,ut,l,dt);return}}for(var et in s)ut=s[et],s.hasOwnProperty(et)&&ut!=null&&!l.hasOwnProperty(et)&&Xe(e,i,et,null,l,ut);for(Mt in l)ut=l[Mt],dt=s[Mt],!l.hasOwnProperty(Mt)||ut===dt||ut==null&&dt==null||Xe(e,i,Mt,ut,l,dt)}var mh=null,gh=null;function vc(e){return e.nodeType===9?e:e.ownerDocument}function T_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function A_(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function _h(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var vh=null;function jy(){var e=window.event;return e&&e.type==="popstate"?e===vh?!1:(vh=e,!0):(vh=null,!1)}var w_=typeof setTimeout=="function"?setTimeout:void 0,Xy=typeof clearTimeout=="function"?clearTimeout:void 0,R_=typeof Promise=="function"?Promise:void 0,Wy=typeof queueMicrotask=="function"?queueMicrotask:typeof R_<"u"?function(e){return R_.resolve(null).then(e).catch(qy)}:w_;function qy(e){setTimeout(function(){throw e})}function xh(e,i){var s=i,l=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"){if(l===0){e.removeChild(u),ol(i);return}l--}else s!=="$"&&s!=="$?"&&s!=="$!"||l++;s=u}while(s);ol(i)}function yh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":yh(s),zi(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function Yy(e,i,s,l){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(l){if(!e[Yn])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==u.rel||e.getAttribute("href")!==(u.href==null?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=ki(e.nextSibling),e===null)break}return null}function Zy(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=ki(e.nextSibling),e===null))return null;return e}function ki(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="F!"||i==="F")break;if(i==="/$")return null}}return e}function C_(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"){if(i===0)return e;i--}else s==="/$"&&i++}e=e.previousSibling}return null}function D_(e,i,s){switch(i=vc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}var Ci=new Map,U_=new Set;function xc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.ownerDocument}var Ta=J.d;J.d={f:Ky,r:Qy,D:$y,C:Jy,L:tS,m:eS,X:iS,S:nS,M:aS};function Ky(){var e=Ta.f(),i=fc();return e||i}function Qy(e){var i=Y(e);i!==null&&i.tag===5&&i.type==="form"?ag(i):Ta.r(e)}var zr=typeof document>"u"?null:document;function N_(e,i,s){var l=zr;if(l&&typeof i=="string"&&i){var u=ie(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),U_.has(u)||(U_.add(u),e={rel:e,crossOrigin:s,href:i},l.querySelector(u)===null&&(i=l.createElement("link"),On(i,"link",e),X(i),l.head.appendChild(i)))}}function $y(e){Ta.D(e),N_("dns-prefetch",e,null)}function Jy(e,i){Ta.C(e,i),N_("preconnect",e,i)}function tS(e,i,s){Ta.L(e,i,s);var l=zr;if(l&&e&&i){var u='link[rel="preload"][as="'+ie(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+ie(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+ie(s.imageSizes)+'"]')):u+='[href="'+ie(e)+'"]';var d=u;switch(i){case"style":d=Br(e);break;case"script":d=Fr(e)}Ci.has(d)||(e=A({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ci.set(d,e),l.querySelector(u)!==null||i==="style"&&l.querySelector(tl(d))||i==="script"&&l.querySelector(el(d))||(i=l.createElement("link"),On(i,"link",e),X(i),l.head.appendChild(i)))}}function eS(e,i){Ta.m(e,i);var s=zr;if(s&&e){var l=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+ie(l)+'"][href="'+ie(e)+'"]',d=u;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Fr(e)}if(!Ci.has(d)&&(e=A({rel:"modulepreload",href:e},i),Ci.set(d,e),s.querySelector(u)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(el(d)))return}l=s.createElement("link"),On(l,"link",e),X(l),s.head.appendChild(l)}}}function nS(e,i,s){Ta.S(e,i,s);var l=zr;if(l&&e){var u=rt(l).hoistableStyles,d=Br(e);i=i||"default";var E=u.get(d);if(!E){var D={loading:0,preload:null};if(E=l.querySelector(tl(d)))D.loading=5;else{e=A({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ci.get(d))&&Sh(e,s);var I=E=l.createElement("link");X(I),On(I,"link",e),I._p=new Promise(function(Z,pt){I.onload=Z,I.onerror=pt}),I.addEventListener("load",function(){D.loading|=1}),I.addEventListener("error",function(){D.loading|=2}),D.loading|=4,yc(E,i,l)}E={type:"stylesheet",instance:E,count:1,state:D},u.set(d,E)}}}function iS(e,i){Ta.X(e,i);var s=zr;if(s&&e){var l=rt(s).hoistableScripts,u=Fr(e),d=l.get(u);d||(d=s.querySelector(el(u)),d||(e=A({src:e,async:!0},i),(i=Ci.get(u))&&Mh(e,i),d=s.createElement("script"),X(d),On(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(u,d))}}function aS(e,i){Ta.M(e,i);var s=zr;if(s&&e){var l=rt(s).hoistableScripts,u=Fr(e),d=l.get(u);d||(d=s.querySelector(el(u)),d||(e=A({src:e,async:!0,type:"module"},i),(i=Ci.get(u))&&Mh(e,i),d=s.createElement("script"),X(d),On(d,"link",e),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(u,d))}}function L_(e,i,s,l){var u=(u=Re.current)?xc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Br(s.href),s=rt(u).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Br(s.href);var d=rt(u).hoistableStyles,E=d.get(e);if(E||(u=u.ownerDocument||u,E={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,E),(d=u.querySelector(tl(e)))&&!d._p&&(E.instance=d,E.state.loading=5),Ci.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ci.set(e,s),d||sS(u,e,s,E.state))),i&&l===null)throw Error(a(528,""));return E}if(i&&l!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Fr(s),s=rt(u).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Br(e){return'href="'+ie(e)+'"'}function tl(e){return'link[rel="stylesheet"]['+e+"]"}function O_(e){return A({},e,{"data-precedence":e.precedence,precedence:null})}function sS(e,i,s,l){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=e.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),On(i,"link",s),X(i),e.head.appendChild(i))}function Fr(e){return'[src="'+ie(e)+'"]'}function el(e){return"script[async]"+e}function P_(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=e.querySelector('style[data-href~="'+ie(s.href)+'"]');if(l)return i.instance=l,X(l),l;var u=A({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(e.ownerDocument||e).createElement("style"),X(l),On(l,"style",u),yc(l,s.precedence,e),i.instance=l;case"stylesheet":u=Br(s.href);var d=e.querySelector(tl(u));if(d)return i.state.loading|=4,i.instance=d,X(d),d;l=O_(s),(u=Ci.get(u))&&Sh(l,u),d=(e.ownerDocument||e).createElement("link"),X(d);var E=d;return E._p=new Promise(function(D,I){E.onload=D,E.onerror=I}),On(d,"link",l),i.state.loading|=4,yc(d,s.precedence,e),i.instance=d;case"script":return d=Fr(s.src),(u=e.querySelector(el(d)))?(i.instance=u,X(u),u):(l=s,(u=Ci.get(d))&&(l=A({},s),Mh(l,u)),e=e.ownerDocument||e,u=e.createElement("script"),X(u),On(u,"link",l),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,yc(l,s.precedence,e));return i.instance}function yc(e,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=l.length?l[l.length-1]:null,d=u,E=0;E<l.length;E++){var D=l[E];if(D.dataset.precedence===i)d=D;else if(d!==u)break}d?d.parentNode.insertBefore(e,d.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function Sh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Mh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var Sc=null;function z_(e,i,s){if(Sc===null){var l=new Map,u=Sc=new Map;u.set(s,l)}else u=Sc,l=u.get(s),l||(l=new Map,u.set(s,l));if(l.has(e))return l;for(l.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var d=s[u];if(!(d[Yn]||d[pn]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var E=d.getAttribute(i)||"";E=e+E;var D=l.get(E);D?D.push(d):l.set(E,[d])}}return l}function B_(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function rS(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function F_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var nl=null;function oS(){}function lS(e,i,s){if(nl===null)throw Error(a(475));var l=nl;if(i.type==="stylesheet"&&(typeof s.media!="string"||matchMedia(s.media).matches!==!1)&&(i.state.loading&4)===0){if(i.instance===null){var u=Br(s.href),d=e.querySelector(tl(u));if(d){e=d._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(l.count++,l=Mc.bind(l),e.then(l,l)),i.state.loading|=4,i.instance=d,X(d);return}d=e.ownerDocument||e,s=O_(s),(u=Ci.get(u))&&Sh(s,u),d=d.createElement("link"),X(d);var E=d;E._p=new Promise(function(D,I){E.onload=D,E.onerror=I}),On(d,"link",s),i.instance=d}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(i,e),(e=i.state.preload)&&(i.state.loading&3)===0&&(l.count++,i=Mc.bind(l),e.addEventListener("load",i),e.addEventListener("error",i))}}function cS(){if(nl===null)throw Error(a(475));var e=nl;return e.stylesheets&&e.count===0&&bh(e,e.stylesheets),0<e.count?function(i){var s=setTimeout(function(){if(e.stylesheets&&bh(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4);return e.unsuspend=i,function(){e.unsuspend=null,clearTimeout(s)}}:null}function Mc(){if(this.count--,this.count===0){if(this.stylesheets)bh(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bc=null;function bh(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bc=new Map,i.forEach(uS,e),bc=null,Mc.call(e))}function uS(e,i){if(!(i.state.loading&4)){var s=bc.get(e);if(s)var l=s.get(null);else{s=new Map,bc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var E=u[d];(E.nodeName==="LINK"||E.getAttribute("media")!=="not all")&&(s.set(E.dataset.precedence,E),l=E)}l&&s.set(null,l)}u=i.instance,E=u.getAttribute("data-precedence"),d=s.get(E)||l,d===l&&s.set(null,u),s.set(E,u),this.count++,l=Mc.bind(this),u.addEventListener("load",l),u.addEventListener("error",l),d?d.parentNode.insertBefore(u,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var il={$$typeof:M,Provider:null,Consumer:null,_currentValue:mt,_currentValue2:mt,_threadCount:0};function fS(e,i,s,l,u,d,E,D){this.tag=1,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=vn(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vn(0),this.hiddenUpdates=vn(null),this.identifierPrefix=l,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=E,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.incompleteTransitions=new Map}function I_(e,i,s,l,u,d,E,D,I,Z,pt,Mt){return e=new fS(e,i,s,E,D,I,Z,Mt),i=1,d===!0&&(i|=24),d=wi(3,null,null,i),e.current=d,d.stateNode=e,i=tf(),i.refCount++,e.pooledCache=i,i.refCount++,d.memoizedState={element:l,isDehydrated:s,cache:i},Pf(d),e}function H_(e){return e?(e=gr,e):gr}function k_(e,i,s,l,u,d){u=H_(u),l.context===null?l.context=u:l.pendingContext=u,l=Ka(i),l.payload={element:s},d=d===void 0?null:d,d!==null&&(l.callback=d),s=Qa(e,l,i),s!==null&&(Kn(s,e,i),Ho(s,e,i))}function G_(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function Eh(e,i){G_(e,i),(e=e.alternate)&&G_(e,i)}function V_(e){if(e.tag===13){var i=Va(e,67108864);i!==null&&Kn(i,e,67108864),Eh(e,67108864)}}var Ec=!0;function hS(e,i,s,l){var u=w.T;w.T=null;var d=J.p;try{J.p=2,Th(e,i,s,l)}finally{J.p=d,w.T=u}}function dS(e,i,s,l){var u=w.T;w.T=null;var d=J.p;try{J.p=8,Th(e,i,s,l)}finally{J.p=d,w.T=u}}function Th(e,i,s,l){if(Ec){var u=Ah(l);if(u===null)dh(e,i,l,Tc,s),X_(e,l);else if(mS(u,e,i,s,l))l.stopPropagation();else if(X_(e,l),i&4&&-1<pS.indexOf(e)){for(;u!==null;){var d=Y(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var E=Nt(d.pendingLanes);if(E!==0){var D=d;for(D.pendingLanes|=2,D.entangledLanes|=2;E;){var I=1<<31-te(E);D.entanglements[1]|=I,E&=~I}ia(d),(on&6)===0&&(lc=gt()+500,Qo(0))}}break;case 13:D=Va(d,2),D!==null&&Kn(D,d,2),fc(),Eh(d,2)}if(d=Ah(l),d===null&&dh(e,i,l,Tc,s),d===u)break;u=d}u!==null&&l.stopPropagation()}else dh(e,i,l,null,s)}}function Ah(e){return e=$i(e),wh(e)}var Tc=null;function wh(e){if(Tc=null,e=C(e),e!==null){var i=W(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=tt(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return Tc=e,null}function j_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(St()){case vt:return 2;case Zt:return 8;case Ct:case Gt:return 32;case xe:return 268435456;default:return 32}default:return 32}}var Rh=!1,as=null,ss=null,rs=null,al=new Map,sl=new Map,os=[],pS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function X_(e,i){switch(e){case"focusin":case"focusout":as=null;break;case"dragenter":case"dragleave":ss=null;break;case"mouseover":case"mouseout":rs=null;break;case"pointerover":case"pointerout":al.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":sl.delete(i.pointerId)}}function rl(e,i,s,l,u,d){return e===null||e.nativeEvent!==d?(e={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:d,targetContainers:[u]},i!==null&&(i=Y(i),i!==null&&V_(i)),e):(e.eventSystemFlags|=l,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function mS(e,i,s,l,u){switch(i){case"focusin":return as=rl(as,e,i,s,l,u),!0;case"dragenter":return ss=rl(ss,e,i,s,l,u),!0;case"mouseover":return rs=rl(rs,e,i,s,l,u),!0;case"pointerover":var d=u.pointerId;return al.set(d,rl(al.get(d)||null,e,i,s,l,u)),!0;case"gotpointercapture":return d=u.pointerId,sl.set(d,rl(sl.get(d)||null,e,i,s,l,u)),!0}return!1}function W_(e){var i=C(e.target);if(i!==null){var s=W(i);if(s!==null){if(i=s.tag,i===13){if(i=tt(s),i!==null){e.blockedOn=i,Ts(e.priority,function(){if(s.tag===13){var l=mi(),u=Va(s,l);u!==null&&Kn(u,s,l),Eh(s,l)}});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ac(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=Ah(e.nativeEvent);if(s===null){s=e.nativeEvent;var l=new s.constructor(s.type,s);Bi=l,s.target.dispatchEvent(l),Bi=null}else return i=Y(s),i!==null&&V_(i),e.blockedOn=s,!1;i.shift()}return!0}function q_(e,i,s){Ac(e)&&s.delete(i)}function gS(){Rh=!1,as!==null&&Ac(as)&&(as=null),ss!==null&&Ac(ss)&&(ss=null),rs!==null&&Ac(rs)&&(rs=null),al.forEach(q_),sl.forEach(q_)}function wc(e,i){e.blockedOn===i&&(e.blockedOn=null,Rh||(Rh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,gS)))}var Rc=null;function Y_(e){Rc!==e&&(Rc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Rc===e&&(Rc=null);for(var i=0;i<e.length;i+=3){var s=e[i],l=e[i+1],u=e[i+2];if(typeof l!="function"){if(wh(l||s)===null)continue;break}var d=Y(s);d!==null&&(e.splice(i,3),i-=3,_f(d,{pending:!0,data:u,method:s.method,action:l},l,u))}}))}function ol(e){function i(I){return wc(I,e)}as!==null&&wc(as,e),ss!==null&&wc(ss,e),rs!==null&&wc(rs,e),al.forEach(i),sl.forEach(i);for(var s=0;s<os.length;s++){var l=os[s];l.blockedOn===e&&(l.blockedOn=null)}for(;0<os.length&&(s=os[0],s.blockedOn===null);)W_(s),s.blockedOn===null&&os.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var u=s[l],d=s[l+1],E=u[mn]||null;if(typeof d=="function")E||Y_(s);else if(E){var D=null;if(d&&d.hasAttribute("formAction")){if(u=d,E=d[mn]||null)D=E.formAction;else if(wh(u)!==null)continue}else D=E.action;typeof D=="function"?s[l+1]=D:(s.splice(l,3),l-=3),Y_(s)}}}function Ch(e){this._internalRoot=e}Cc.prototype.render=Ch.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,l=mi();k_(s,l,e,i,null,null)},Cc.prototype.unmount=Ch.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;e.tag===0&&Lr(),k_(e.current,2,null,e,null,null),fc(),i[Pi]=null}};function Cc(e){this._internalRoot=e}Cc.prototype.unstable_scheduleHydration=function(e){if(e){var i=ua();e={blockedOn:null,target:e,priority:i};for(var s=0;s<os.length&&i!==0&&i<os[s].priority;s++);os.splice(s,0,e),s===0&&W_(e)}};var Z_=t.version;if(Z_!=="19.0.0")throw Error(a(527,Z_,"19.0.0"));J.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=it(i),e=e!==null?Tt(e):null,e=e===null?null:e.stateNode,e};var _S={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:w,findFiberByHostInstance:C,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dc.isDisabled&&Dc.supportsFiber)try{Jt=Dc.inject(_S),qt=Dc}catch{}}return cl.createRoot=function(e,i){if(!o(e))throw Error(a(299));var s=!1,l="",u=hg,d=dg,E=pg,D=null;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(E=i.onRecoverableError),i.unstable_transitionCallbacks!==void 0&&(D=i.unstable_transitionCallbacks)),i=I_(e,1,!1,null,null,s,l,u,d,E,D,null),e[Pi]=i.current,hh(e.nodeType===8?e.parentNode:e),new Ch(i)},cl.hydrateRoot=function(e,i,s){if(!o(e))throw Error(a(299));var l=!1,u="",d=hg,E=dg,D=pg,I=null,Z=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(E=s.onCaughtError),s.onRecoverableError!==void 0&&(D=s.onRecoverableError),s.unstable_transitionCallbacks!==void 0&&(I=s.unstable_transitionCallbacks),s.formState!==void 0&&(Z=s.formState)),i=I_(e,1,!0,i,s??null,l,u,d,E,D,I,Z),i.context=H_(null),s=i.current,l=mi(),u=Ka(l),u.callback=null,Qa(s,u,l),i.current.lanes=l,an(i,l),ia(i),e[Pi]=i.current,hh(e),new Cc(i)},cl.version="19.0.0",cl}var sv;function CS(){if(sv)return Nh.exports;sv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Nh.exports=RS(),Nh.exports}var DS=CS();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xp="171",io={ROTATE:0,DOLLY:1,PAN:2},to={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},US=0,rv=1,NS=2,U0=1,LS=2,Ua=3,bs=0,oi=1,ra=2,Ss=0,ao=1,ov=2,lv=3,cv=4,OS=5,Js=100,PS=101,zS=102,BS=103,FS=104,IS=200,HS=201,kS=202,GS=203,bd=204,Ed=205,VS=206,jS=207,XS=208,WS=209,qS=210,YS=211,ZS=212,KS=213,QS=214,Td=0,Ad=1,wd=2,oo=3,Rd=4,Cd=5,Dd=6,Ud=7,N0=0,$S=1,JS=2,Ms=0,tM=1,eM=2,nM=3,iM=4,aM=5,sM=6,rM=7,L0=300,lo=301,co=302,Nd=303,Ld=304,Cu=306,Od=1e3,er=1001,Pd=1002,Yi=1003,oM=1004,Uc=1005,la=1006,zh=1007,nr=1008,za=1009,O0=1010,P0=1011,yl=1012,yp=1013,ar=1014,Na=1015,El=1016,Sp=1017,Mp=1018,uo=1020,z0=35902,B0=1021,F0=1022,qi=1023,I0=1024,H0=1025,so=1026,fo=1027,k0=1028,bp=1029,G0=1030,Ep=1031,Tp=1033,du=33776,pu=33777,mu=33778,gu=33779,zd=35840,Bd=35841,Fd=35842,Id=35843,Hd=36196,kd=37492,Gd=37496,Vd=37808,jd=37809,Xd=37810,Wd=37811,qd=37812,Yd=37813,Zd=37814,Kd=37815,Qd=37816,$d=37817,Jd=37818,tp=37819,ep=37820,np=37821,_u=36492,ip=36494,ap=36495,V0=36283,sp=36284,rp=36285,op=36286,lM=3200,cM=3201,uM=0,fM=1,vs="",ai="srgb",ho="srgb-linear",Mu="linear",We="srgb",Ir=7680,uv=519,hM=512,dM=513,pM=514,j0=515,mM=516,gM=517,_M=518,vM=519,lp=35044,fv="300 es",La=2e3,bu=2001;class or{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const a=this._listeners;return a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const o=this._listeners[t];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const a=this._listeners[t.type];if(a!==void 0){t.target=this;const o=a.slice(0);for(let c=0,h=o.length;c<h;c++)o[c].call(this,t);t.target=null}}}const Wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hv=1234567;const _l=Math.PI/180,Sl=180/Math.PI;function Oa(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Wn[r&255]+Wn[r>>8&255]+Wn[r>>16&255]+Wn[r>>24&255]+"-"+Wn[t&255]+Wn[t>>8&255]+"-"+Wn[t>>16&15|64]+Wn[t>>24&255]+"-"+Wn[n&63|128]+Wn[n>>8&255]+"-"+Wn[n>>16&255]+Wn[n>>24&255]+Wn[a&255]+Wn[a>>8&255]+Wn[a>>16&255]+Wn[a>>24&255]).toLowerCase()}function be(r,t,n){return Math.max(t,Math.min(n,r))}function Ap(r,t){return(r%t+t)%t}function xM(r,t,n,a,o){return a+(r-t)*(o-a)/(n-t)}function yM(r,t,n){return r!==t?(n-r)/(t-r):0}function vl(r,t,n){return(1-n)*r+n*t}function SM(r,t,n,a){return vl(r,t,1-Math.exp(-n*a))}function MM(r,t=1){return t-Math.abs(Ap(r,t*2)-t)}function bM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))}function EM(r,t,n){return r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*r*(r*(r*6-15)+10))}function TM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function AM(r,t){return r+Math.random()*(t-r)}function wM(r){return r*(.5-Math.random())}function RM(r){r!==void 0&&(hv=r);let t=hv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function CM(r){return r*_l}function DM(r){return r*Sl}function UM(r){return(r&r-1)===0&&r!==0}function NM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function LM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function OM(r,t,n,a,o){const c=Math.cos,h=Math.sin,f=c(n/2),p=h(n/2),m=c((t+a)/2),_=h((t+a)/2),g=c((t-a)/2),x=h((t-a)/2),M=c((a-t)/2),b=h((a-t)/2);switch(o){case"XYX":r.set(f*_,p*g,p*x,f*m);break;case"YZY":r.set(p*x,f*_,p*g,f*m);break;case"ZXZ":r.set(p*g,p*x,f*_,f*m);break;case"XZX":r.set(f*_,p*b,p*M,f*m);break;case"YXY":r.set(p*M,f*_,p*b,f*m);break;case"ZYZ":r.set(p*b,p*M,f*_,f*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Xi(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ke(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const wp={DEG2RAD:_l,RAD2DEG:Sl,generateUUID:Oa,clamp:be,euclideanModulo:Ap,mapLinear:xM,inverseLerp:yM,lerp:vl,damp:SM,pingpong:MM,smoothstep:bM,smootherstep:EM,randInt:TM,randFloat:AM,randFloatSpread:wM,seededRandom:RM,degToRad:CM,radToDeg:DM,isPowerOfTwo:UM,ceilPowerOfTwo:NM,floorPowerOfTwo:LM,setQuaternionFromProperEuler:OM,normalize:ke,denormalize:Xi};class pe{constructor(t=0,n=0){pe.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,o=t.elements;return this.x=o[0]*n+o[3]*a+o[6],this.y=o[1]*n+o[4]*a+o[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=be(this.x,t.x,n.x),this.y=be(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=be(this.x,t,n),this.y=be(this.y,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(be(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(be(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),o=Math.sin(n),c=this.x-t.x,h=this.y-t.y;return this.x=c*a-h*o+t.x,this.y=c*o+h*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class _e{constructor(t,n,a,o,c,h,f,p,m){_e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,h,f,p,m)}set(t,n,a,o,c,h,f,p,m){const _=this.elements;return _[0]=t,_[1]=o,_[2]=f,_[3]=n,_[4]=c,_[5]=p,_[6]=a,_[7]=h,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,h=a[0],f=a[3],p=a[6],m=a[1],_=a[4],g=a[7],x=a[2],M=a[5],b=a[8],T=o[0],S=o[3],y=o[6],F=o[1],O=o[4],U=o[7],H=o[2],L=o[5],z=o[8];return c[0]=h*T+f*F+p*H,c[3]=h*S+f*O+p*L,c[6]=h*y+f*U+p*z,c[1]=m*T+_*F+g*H,c[4]=m*S+_*O+g*L,c[7]=m*y+_*U+g*z,c[2]=x*T+M*F+b*H,c[5]=x*S+M*O+b*L,c[8]=x*y+M*U+b*z,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],h=t[4],f=t[5],p=t[6],m=t[7],_=t[8];return n*h*_-n*f*m-a*c*_+a*f*p+o*c*m-o*h*p}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],h=t[4],f=t[5],p=t[6],m=t[7],_=t[8],g=_*h-f*m,x=f*p-_*c,M=m*c-h*p,b=n*g+a*x+o*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/b;return t[0]=g*T,t[1]=(o*m-_*a)*T,t[2]=(f*a-o*h)*T,t[3]=x*T,t[4]=(_*n-o*p)*T,t[5]=(o*c-f*n)*T,t[6]=M*T,t[7]=(a*p-m*n)*T,t[8]=(h*n-a*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,o,c,h,f){const p=Math.cos(c),m=Math.sin(c);return this.set(a*p,a*m,-a*(p*h+m*f)+h+t,-o*m,o*p,-o*(-m*h+p*f)+f+n,0,0,1),this}scale(t,n){return this.premultiply(Bh.makeScale(t,n)),this}rotate(t){return this.premultiply(Bh.makeRotation(-t)),this}translate(t,n){return this.premultiply(Bh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<9;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bh=new _e;function X0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ml(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function PM(){const r=Ml("canvas");return r.style.display="block",r}const dv={};function Jr(r){r in dv||(dv[r]=!0,console.warn(r))}function zM(r,t,n){return new Promise(function(a,o){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:o();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}function BM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function FM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const pv=new _e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mv=new _e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function IM(){const r={enabled:!0,workingColorSpace:ho,spaces:{},convert:function(o,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===We&&(o.r=Pa(o.r),o.g=Pa(o.g),o.b=Pa(o.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===We&&(o.r=ro(o.r),o.g=ro(o.g),o.b=ro(o.b))),o},fromWorkingColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},toWorkingColorSpace:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===vs?Mu:this.spaces[o].transfer},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,h){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],a=[.3127,.329];return r.define({[ho]:{primaries:t,whitePoint:a,transfer:Mu,toXYZ:pv,fromXYZ:mv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ai},outputColorSpaceConfig:{drawingBufferColorSpace:ai}},[ai]:{primaries:t,whitePoint:a,transfer:We,toXYZ:pv,fromXYZ:mv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ai}}}),r}const ze=IM();function Pa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ro(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Hr;class HM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Hr===void 0&&(Hr=Ml("canvas")),Hr.width=t.width,Hr.height=t.height;const a=Hr.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),n=Hr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Ml("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const o=a.getImageData(0,0,t.width,t.height),c=o.data;for(let h=0;h<c.length;h++)c[h]=Pa(c[h]/255)*255;return a.putImageData(o,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Pa(n[a]/255)*255):n[a]=Pa(n[a]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let kM=0;class W0{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kM++}),this.uuid=Oa(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let h=0,f=o.length;h<f;h++)o[h].isDataTexture?c.push(Fh(o[h].image)):c.push(Fh(o[h]))}else c=Fh(o);a.url=c}return n||(t.images[this.uuid]=a),a}}function Fh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?HM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let GM=0;class Jn extends or{constructor(t=Jn.DEFAULT_IMAGE,n=Jn.DEFAULT_MAPPING,a=er,o=er,c=la,h=nr,f=qi,p=za,m=Jn.DEFAULT_ANISOTROPY,_=vs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:GM++}),this.uuid=Oa(),this.name="",this.source=new W0(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=o,this.magFilter=c,this.minFilter=h,this.anisotropy=m,this.format=f,this.internalFormat=null,this.type=p,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==L0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Od:t.x=t.x-Math.floor(t.x);break;case er:t.x=t.x<0?0:1;break;case Pd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Od:t.y=t.y-Math.floor(t.y);break;case er:t.y=t.y<0?0:1;break;case Pd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Jn.DEFAULT_IMAGE=null;Jn.DEFAULT_MAPPING=L0;Jn.DEFAULT_ANISOTROPY=1;class tn{constructor(t=0,n=0,a=0,o=1){tn.prototype.isVector4=!0,this.x=t,this.y=n,this.z=a,this.w=o}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,o){return this.x=t,this.y=n,this.z=a,this.w=o,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=this.w,h=t.elements;return this.x=h[0]*n+h[4]*a+h[8]*o+h[12]*c,this.y=h[1]*n+h[5]*a+h[9]*o+h[13]*c,this.z=h[2]*n+h[6]*a+h[10]*o+h[14]*c,this.w=h[3]*n+h[7]*a+h[11]*o+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,o,c;const p=t.elements,m=p[0],_=p[4],g=p[8],x=p[1],M=p[5],b=p[9],T=p[2],S=p[6],y=p[10];if(Math.abs(_-x)<.01&&Math.abs(g-T)<.01&&Math.abs(b-S)<.01){if(Math.abs(_+x)<.1&&Math.abs(g+T)<.1&&Math.abs(b+S)<.1&&Math.abs(m+M+y-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const O=(m+1)/2,U=(M+1)/2,H=(y+1)/2,L=(_+x)/4,z=(g+T)/4,P=(b+S)/4;return O>U&&O>H?O<.01?(a=0,o=.707106781,c=.707106781):(a=Math.sqrt(O),o=L/a,c=z/a):U>H?U<.01?(a=.707106781,o=0,c=.707106781):(o=Math.sqrt(U),a=L/o,c=P/o):H<.01?(a=.707106781,o=.707106781,c=0):(c=Math.sqrt(H),a=z/c,o=P/c),this.set(a,o,c,n),this}let F=Math.sqrt((S-b)*(S-b)+(g-T)*(g-T)+(x-_)*(x-_));return Math.abs(F)<.001&&(F=1),this.x=(S-b)/F,this.y=(g-T)/F,this.z=(x-_)/F,this.w=Math.acos((m+M+y-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=be(this.x,t.x,n.x),this.y=be(this.y,t.y,n.y),this.z=be(this.z,t.z,n.z),this.w=be(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=be(this.x,t,n),this.y=be(this.y,t,n),this.z=be(this.z,t,n),this.w=be(this.w,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(be(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class VM extends or{constructor(t=1,n=1,a={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new tn(0,0,t,n),this.scissorTest=!1,this.viewport=new tn(0,0,t,n);const o={width:t,height:n,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:la,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},a);const c=new Jn(o,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);c.flipY=!1,c.generateMipmaps=a.generateMipmaps,c.internalFormat=a.internalFormat,this.textures=[];const h=a.count;for(let f=0;f<h;f++)this.textures[f]=c.clone(),this.textures[f].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=t,this.textures[o].image.height=n,this.textures[o].image.depth=a;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let a=0,o=t.textures.length;a<o;a++)this.textures[a]=t.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new W0(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sr extends VM{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class q0 extends Jn{constructor(t=null,n=1,a=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Yi,this.minFilter=Yi,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class jM extends Jn{constructor(t=null,n=1,a=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:o},this.magFilter=Yi,this.minFilter=Yi,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ca{constructor(t=0,n=0,a=0,o=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=o}static slerpFlat(t,n,a,o,c,h,f){let p=a[o+0],m=a[o+1],_=a[o+2],g=a[o+3];const x=c[h+0],M=c[h+1],b=c[h+2],T=c[h+3];if(f===0){t[n+0]=p,t[n+1]=m,t[n+2]=_,t[n+3]=g;return}if(f===1){t[n+0]=x,t[n+1]=M,t[n+2]=b,t[n+3]=T;return}if(g!==T||p!==x||m!==M||_!==b){let S=1-f;const y=p*x+m*M+_*b+g*T,F=y>=0?1:-1,O=1-y*y;if(O>Number.EPSILON){const H=Math.sqrt(O),L=Math.atan2(H,y*F);S=Math.sin(S*L)/H,f=Math.sin(f*L)/H}const U=f*F;if(p=p*S+x*U,m=m*S+M*U,_=_*S+b*U,g=g*S+T*U,S===1-f){const H=1/Math.sqrt(p*p+m*m+_*_+g*g);p*=H,m*=H,_*=H,g*=H}}t[n]=p,t[n+1]=m,t[n+2]=_,t[n+3]=g}static multiplyQuaternionsFlat(t,n,a,o,c,h){const f=a[o],p=a[o+1],m=a[o+2],_=a[o+3],g=c[h],x=c[h+1],M=c[h+2],b=c[h+3];return t[n]=f*b+_*g+p*M-m*x,t[n+1]=p*b+_*x+m*g-f*M,t[n+2]=m*b+_*M+f*x-p*g,t[n+3]=_*b-f*g-p*x-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,o){return this._x=t,this._y=n,this._z=a,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,o=t._y,c=t._z,h=t._order,f=Math.cos,p=Math.sin,m=f(a/2),_=f(o/2),g=f(c/2),x=p(a/2),M=p(o/2),b=p(c/2);switch(h){case"XYZ":this._x=x*_*g+m*M*b,this._y=m*M*g-x*_*b,this._z=m*_*b+x*M*g,this._w=m*_*g-x*M*b;break;case"YXZ":this._x=x*_*g+m*M*b,this._y=m*M*g-x*_*b,this._z=m*_*b-x*M*g,this._w=m*_*g+x*M*b;break;case"ZXY":this._x=x*_*g-m*M*b,this._y=m*M*g+x*_*b,this._z=m*_*b+x*M*g,this._w=m*_*g-x*M*b;break;case"ZYX":this._x=x*_*g-m*M*b,this._y=m*M*g+x*_*b,this._z=m*_*b-x*M*g,this._w=m*_*g+x*M*b;break;case"YZX":this._x=x*_*g+m*M*b,this._y=m*M*g+x*_*b,this._z=m*_*b-x*M*g,this._w=m*_*g-x*M*b;break;case"XZY":this._x=x*_*g-m*M*b,this._y=m*M*g-x*_*b,this._z=m*_*b+x*M*g,this._w=m*_*g+x*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,o=Math.sin(a);return this._x=t.x*o,this._y=t.y*o,this._z=t.z*o,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],o=n[4],c=n[8],h=n[1],f=n[5],p=n[9],m=n[2],_=n[6],g=n[10],x=a+f+g;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(_-p)*M,this._y=(c-m)*M,this._z=(h-o)*M}else if(a>f&&a>g){const M=2*Math.sqrt(1+a-f-g);this._w=(_-p)/M,this._x=.25*M,this._y=(o+h)/M,this._z=(c+m)/M}else if(f>g){const M=2*Math.sqrt(1+f-a-g);this._w=(c-m)/M,this._x=(o+h)/M,this._y=.25*M,this._z=(p+_)/M}else{const M=2*Math.sqrt(1+g-a-f);this._w=(h-o)/M,this._x=(c+m)/M,this._y=(p+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<Number.EPSILON?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const o=Math.min(1,n/a);return this.slerp(t,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,o=t._y,c=t._z,h=t._w,f=n._x,p=n._y,m=n._z,_=n._w;return this._x=a*_+h*f+o*m-c*p,this._y=o*_+h*p+c*f-a*m,this._z=c*_+h*m+a*p-o*f,this._w=h*_-a*f-o*p-c*m,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const a=this._x,o=this._y,c=this._z,h=this._w;let f=h*t._w+a*t._x+o*t._y+c*t._z;if(f<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,f=-f):this.copy(t),f>=1)return this._w=h,this._x=a,this._y=o,this._z=c,this;const p=1-f*f;if(p<=Number.EPSILON){const M=1-n;return this._w=M*h+n*this._w,this._x=M*a+n*this._x,this._y=M*o+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const m=Math.sqrt(p),_=Math.atan2(m,f),g=Math.sin((1-n)*_)/m,x=Math.sin(n*_)/m;return this._w=h*g+this._w*x,this._x=a*g+this._x*x,this._y=o*g+this._y*x,this._z=c*g+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),o=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(o*Math.sin(t),o*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,n=0,a=0){Q.prototype.isVector3=!0,this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(gv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(gv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*o,this.y=c[1]*n+c[4]*a+c[7]*o,this.z=c[2]*n+c[5]*a+c[8]*o,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,o=this.z,c=t.elements,h=1/(c[3]*n+c[7]*a+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*o+c[12])*h,this.y=(c[1]*n+c[5]*a+c[9]*o+c[13])*h,this.z=(c[2]*n+c[6]*a+c[10]*o+c[14])*h,this}applyQuaternion(t){const n=this.x,a=this.y,o=this.z,c=t.x,h=t.y,f=t.z,p=t.w,m=2*(h*o-f*a),_=2*(f*n-c*o),g=2*(c*a-h*n);return this.x=n+p*m+h*g-f*_,this.y=a+p*_+f*m-c*g,this.z=o+p*g+c*_-h*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,o=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*o,this.y=c[1]*n+c[5]*a+c[9]*o,this.z=c[2]*n+c[6]*a+c[10]*o,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=be(this.x,t.x,n.x),this.y=be(this.y,t.y,n.y),this.z=be(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=be(this.x,t,n),this.y=be(this.y,t,n),this.z=be(this.z,t,n),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(be(a,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,o=t.y,c=t.z,h=n.x,f=n.y,p=n.z;return this.x=o*p-c*f,this.y=c*h-a*p,this.z=a*f-o*h,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Ih.copy(this).projectOnVector(t),this.sub(Ih)}reflect(t){return this.sub(Ih.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(be(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,o=this.z-t.z;return n*n+a*a+o*o}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const o=Math.sin(n)*t;return this.x=o*Math.sin(a),this.y=Math.cos(n)*t,this.z=o*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),o=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=o,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ih=new Q,gv=new ca;class Es{constructor(t=new Q(1/0,1/0,1/0),n=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Gi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Gi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Gi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,f=c.count;h<f;h++)t.isMesh===!0?t.getVertexPosition(h,Gi):Gi.fromBufferAttribute(c,h),Gi.applyMatrix4(t.matrixWorld),this.expandByPoint(Gi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Nc.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Nc.copy(a.boundingBox)),Nc.applyMatrix4(t.matrixWorld),this.union(Nc)}const o=t.children;for(let c=0,h=o.length;c<h;c++)this.expandByObject(o[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gi),Gi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ul),Lc.subVectors(this.max,ul),kr.subVectors(t.a,ul),Gr.subVectors(t.b,ul),Vr.subVectors(t.c,ul),cs.subVectors(Gr,kr),us.subVectors(Vr,Gr),Ws.subVectors(kr,Vr);let n=[0,-cs.z,cs.y,0,-us.z,us.y,0,-Ws.z,Ws.y,cs.z,0,-cs.x,us.z,0,-us.x,Ws.z,0,-Ws.x,-cs.y,cs.x,0,-us.y,us.x,0,-Ws.y,Ws.x,0];return!Hh(n,kr,Gr,Vr,Lc)||(n=[1,0,0,0,1,0,0,0,1],!Hh(n,kr,Gr,Vr,Lc))?!1:(Oc.crossVectors(cs,us),n=[Oc.x,Oc.y,Oc.z],Hh(n,kr,Gr,Vr,Lc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Aa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Aa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Aa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Aa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Aa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Aa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Aa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Aa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Aa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Aa=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Gi=new Q,Nc=new Es,kr=new Q,Gr=new Q,Vr=new Q,cs=new Q,us=new Q,Ws=new Q,ul=new Q,Lc=new Q,Oc=new Q,qs=new Q;function Hh(r,t,n,a,o){for(let c=0,h=r.length-3;c<=h;c+=3){qs.fromArray(r,c);const f=o.x*Math.abs(qs.x)+o.y*Math.abs(qs.y)+o.z*Math.abs(qs.z),p=t.dot(qs),m=n.dot(qs),_=a.dot(qs);if(Math.max(-Math.max(p,m,_),Math.min(p,m,_))>f)return!1}return!0}const XM=new Es,fl=new Q,kh=new Q;class lr{constructor(t=new Q,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):XM.setFromPoints(t).getCenter(a);let o=0;for(let c=0,h=t.length;c<h;c++)o=Math.max(o,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(o),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fl.subVectors(t,this.center);const n=fl.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),o=(a-this.radius)*.5;this.center.addScaledVector(fl,o/a),this.radius+=o}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fl.copy(t.center).add(kh)),this.expandByPoint(fl.copy(t.center).sub(kh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wa=new Q,Gh=new Q,Pc=new Q,fs=new Q,Vh=new Q,zc=new Q,jh=new Q;class Tl{constructor(t=new Q,n=new Q(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wa)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=wa.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(wa.copy(this.origin).addScaledVector(this.direction,n),wa.distanceToSquared(t))}distanceSqToSegment(t,n,a,o){Gh.copy(t).add(n).multiplyScalar(.5),Pc.copy(n).sub(t).normalize(),fs.copy(this.origin).sub(Gh);const c=t.distanceTo(n)*.5,h=-this.direction.dot(Pc),f=fs.dot(this.direction),p=-fs.dot(Pc),m=fs.lengthSq(),_=Math.abs(1-h*h);let g,x,M,b;if(_>0)if(g=h*p-f,x=h*f-p,b=c*_,g>=0)if(x>=-b)if(x<=b){const T=1/_;g*=T,x*=T,M=g*(g+h*x+2*f)+x*(h*g+x+2*p)+m}else x=c,g=Math.max(0,-(h*x+f)),M=-g*g+x*(x+2*p)+m;else x=-c,g=Math.max(0,-(h*x+f)),M=-g*g+x*(x+2*p)+m;else x<=-b?(g=Math.max(0,-(-h*c+f)),x=g>0?-c:Math.min(Math.max(-c,-p),c),M=-g*g+x*(x+2*p)+m):x<=b?(g=0,x=Math.min(Math.max(-c,-p),c),M=x*(x+2*p)+m):(g=Math.max(0,-(h*c+f)),x=g>0?c:Math.min(Math.max(-c,-p),c),M=-g*g+x*(x+2*p)+m);else x=h>0?-c:c,g=Math.max(0,-(h*x+f)),M=-g*g+x*(x+2*p)+m;return a&&a.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(Gh).addScaledVector(Pc,x),M}intersectSphere(t,n){wa.subVectors(t.center,this.origin);const a=wa.dot(this.direction),o=wa.dot(wa)-a*a,c=t.radius*t.radius;if(o>c)return null;const h=Math.sqrt(c-o),f=a-h,p=a+h;return p<0?null:f<0?this.at(p,n):this.at(f,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,o,c,h,f,p;const m=1/this.direction.x,_=1/this.direction.y,g=1/this.direction.z,x=this.origin;return m>=0?(a=(t.min.x-x.x)*m,o=(t.max.x-x.x)*m):(a=(t.max.x-x.x)*m,o=(t.min.x-x.x)*m),_>=0?(c=(t.min.y-x.y)*_,h=(t.max.y-x.y)*_):(c=(t.max.y-x.y)*_,h=(t.min.y-x.y)*_),a>h||c>o||((c>a||isNaN(a))&&(a=c),(h<o||isNaN(o))&&(o=h),g>=0?(f=(t.min.z-x.z)*g,p=(t.max.z-x.z)*g):(f=(t.max.z-x.z)*g,p=(t.min.z-x.z)*g),a>p||f>o)||((f>a||a!==a)&&(a=f),(p<o||o!==o)&&(o=p),o<0)?null:this.at(a>=0?a:o,n)}intersectsBox(t){return this.intersectBox(t,wa)!==null}intersectTriangle(t,n,a,o,c){Vh.subVectors(n,t),zc.subVectors(a,t),jh.crossVectors(Vh,zc);let h=this.direction.dot(jh),f;if(h>0){if(o)return null;f=1}else if(h<0)f=-1,h=-h;else return null;fs.subVectors(this.origin,t);const p=f*this.direction.dot(zc.crossVectors(fs,zc));if(p<0)return null;const m=f*this.direction.dot(Vh.cross(fs));if(m<0||p+m>h)return null;const _=-f*fs.dot(jh);return _<0?null:this.at(_/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(t,n,a,o,c,h,f,p,m,_,g,x,M,b,T,S){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,o,c,h,f,p,m,_,g,x,M,b,T,S)}set(t,n,a,o,c,h,f,p,m,_,g,x,M,b,T,S){const y=this.elements;return y[0]=t,y[4]=n,y[8]=a,y[12]=o,y[1]=c,y[5]=h,y[9]=f,y[13]=p,y[2]=m,y[6]=_,y[10]=g,y[14]=x,y[3]=M,y[7]=b,y[11]=T,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,a=t.elements,o=1/jr.setFromMatrixColumn(t,0).length(),c=1/jr.setFromMatrixColumn(t,1).length(),h=1/jr.setFromMatrixColumn(t,2).length();return n[0]=a[0]*o,n[1]=a[1]*o,n[2]=a[2]*o,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*h,n[9]=a[9]*h,n[10]=a[10]*h,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,o=t.y,c=t.z,h=Math.cos(a),f=Math.sin(a),p=Math.cos(o),m=Math.sin(o),_=Math.cos(c),g=Math.sin(c);if(t.order==="XYZ"){const x=h*_,M=h*g,b=f*_,T=f*g;n[0]=p*_,n[4]=-p*g,n[8]=m,n[1]=M+b*m,n[5]=x-T*m,n[9]=-f*p,n[2]=T-x*m,n[6]=b+M*m,n[10]=h*p}else if(t.order==="YXZ"){const x=p*_,M=p*g,b=m*_,T=m*g;n[0]=x+T*f,n[4]=b*f-M,n[8]=h*m,n[1]=h*g,n[5]=h*_,n[9]=-f,n[2]=M*f-b,n[6]=T+x*f,n[10]=h*p}else if(t.order==="ZXY"){const x=p*_,M=p*g,b=m*_,T=m*g;n[0]=x-T*f,n[4]=-h*g,n[8]=b+M*f,n[1]=M+b*f,n[5]=h*_,n[9]=T-x*f,n[2]=-h*m,n[6]=f,n[10]=h*p}else if(t.order==="ZYX"){const x=h*_,M=h*g,b=f*_,T=f*g;n[0]=p*_,n[4]=b*m-M,n[8]=x*m+T,n[1]=p*g,n[5]=T*m+x,n[9]=M*m-b,n[2]=-m,n[6]=f*p,n[10]=h*p}else if(t.order==="YZX"){const x=h*p,M=h*m,b=f*p,T=f*m;n[0]=p*_,n[4]=T-x*g,n[8]=b*g+M,n[1]=g,n[5]=h*_,n[9]=-f*_,n[2]=-m*_,n[6]=M*g+b,n[10]=x-T*g}else if(t.order==="XZY"){const x=h*p,M=h*m,b=f*p,T=f*m;n[0]=p*_,n[4]=-g,n[8]=m*_,n[1]=x*g+T,n[5]=h*_,n[9]=M*g-b,n[2]=b*g-M,n[6]=f*_,n[10]=T*g+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(WM,t,qM)}lookAt(t,n,a){const o=this.elements;return gi.subVectors(t,n),gi.lengthSq()===0&&(gi.z=1),gi.normalize(),hs.crossVectors(a,gi),hs.lengthSq()===0&&(Math.abs(a.z)===1?gi.x+=1e-4:gi.z+=1e-4,gi.normalize(),hs.crossVectors(a,gi)),hs.normalize(),Bc.crossVectors(gi,hs),o[0]=hs.x,o[4]=Bc.x,o[8]=gi.x,o[1]=hs.y,o[5]=Bc.y,o[9]=gi.y,o[2]=hs.z,o[6]=Bc.z,o[10]=gi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,o=n.elements,c=this.elements,h=a[0],f=a[4],p=a[8],m=a[12],_=a[1],g=a[5],x=a[9],M=a[13],b=a[2],T=a[6],S=a[10],y=a[14],F=a[3],O=a[7],U=a[11],H=a[15],L=o[0],z=o[4],P=o[8],w=o[12],A=o[1],k=o[5],lt=o[9],$=o[13],ot=o[2],ft=o[6],G=o[10],nt=o[14],W=o[3],tt=o[7],N=o[11],it=o[15];return c[0]=h*L+f*A+p*ot+m*W,c[4]=h*z+f*k+p*ft+m*tt,c[8]=h*P+f*lt+p*G+m*N,c[12]=h*w+f*$+p*nt+m*it,c[1]=_*L+g*A+x*ot+M*W,c[5]=_*z+g*k+x*ft+M*tt,c[9]=_*P+g*lt+x*G+M*N,c[13]=_*w+g*$+x*nt+M*it,c[2]=b*L+T*A+S*ot+y*W,c[6]=b*z+T*k+S*ft+y*tt,c[10]=b*P+T*lt+S*G+y*N,c[14]=b*w+T*$+S*nt+y*it,c[3]=F*L+O*A+U*ot+H*W,c[7]=F*z+O*k+U*ft+H*tt,c[11]=F*P+O*lt+U*G+H*N,c[15]=F*w+O*$+U*nt+H*it,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],o=t[8],c=t[12],h=t[1],f=t[5],p=t[9],m=t[13],_=t[2],g=t[6],x=t[10],M=t[14],b=t[3],T=t[7],S=t[11],y=t[15];return b*(+c*p*g-o*m*g-c*f*x+a*m*x+o*f*M-a*p*M)+T*(+n*p*M-n*m*x+c*h*x-o*h*M+o*m*_-c*p*_)+S*(+n*m*g-n*f*M-c*h*g+a*h*M+c*f*_-a*m*_)+y*(-o*f*_-n*p*g+n*f*x+o*h*g-a*h*x+a*p*_)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const o=this.elements;return t.isVector3?(o[12]=t.x,o[13]=t.y,o[14]=t.z):(o[12]=t,o[13]=n,o[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],o=t[2],c=t[3],h=t[4],f=t[5],p=t[6],m=t[7],_=t[8],g=t[9],x=t[10],M=t[11],b=t[12],T=t[13],S=t[14],y=t[15],F=g*S*m-T*x*m+T*p*M-f*S*M-g*p*y+f*x*y,O=b*x*m-_*S*m-b*p*M+h*S*M+_*p*y-h*x*y,U=_*T*m-b*g*m+b*f*M-h*T*M-_*f*y+h*g*y,H=b*g*p-_*T*p-b*f*x+h*T*x+_*f*S-h*g*S,L=n*F+a*O+o*U+c*H;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/L;return t[0]=F*z,t[1]=(T*x*c-g*S*c-T*o*M+a*S*M+g*o*y-a*x*y)*z,t[2]=(f*S*c-T*p*c+T*o*m-a*S*m-f*o*y+a*p*y)*z,t[3]=(g*p*c-f*x*c-g*o*m+a*x*m+f*o*M-a*p*M)*z,t[4]=O*z,t[5]=(_*S*c-b*x*c+b*o*M-n*S*M-_*o*y+n*x*y)*z,t[6]=(b*p*c-h*S*c-b*o*m+n*S*m+h*o*y-n*p*y)*z,t[7]=(h*x*c-_*p*c+_*o*m-n*x*m-h*o*M+n*p*M)*z,t[8]=U*z,t[9]=(b*g*c-_*T*c-b*a*M+n*T*M+_*a*y-n*g*y)*z,t[10]=(h*T*c-b*f*c+b*a*m-n*T*m-h*a*y+n*f*y)*z,t[11]=(_*f*c-h*g*c-_*a*m+n*g*m+h*a*M-n*f*M)*z,t[12]=H*z,t[13]=(_*T*o-b*g*o+b*a*x-n*T*x-_*a*S+n*g*S)*z,t[14]=(b*f*o-h*T*o-b*a*p+n*T*p+h*a*S-n*f*S)*z,t[15]=(h*g*o-_*f*o+_*a*p-n*g*p-h*a*x+n*f*x)*z,this}scale(t){const n=this.elements,a=t.x,o=t.y,c=t.z;return n[0]*=a,n[4]*=o,n[8]*=c,n[1]*=a,n[5]*=o,n[9]*=c,n[2]*=a,n[6]*=o,n[10]*=c,n[3]*=a,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],o=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,o))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),o=Math.sin(n),c=1-a,h=t.x,f=t.y,p=t.z,m=c*h,_=c*f;return this.set(m*h+a,m*f-o*p,m*p+o*f,0,m*f+o*p,_*f+a,_*p-o*h,0,m*p-o*f,_*p+o*h,c*p*p+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,o,c,h){return this.set(1,a,c,0,t,1,h,0,n,o,1,0,0,0,0,1),this}compose(t,n,a){const o=this.elements,c=n._x,h=n._y,f=n._z,p=n._w,m=c+c,_=h+h,g=f+f,x=c*m,M=c*_,b=c*g,T=h*_,S=h*g,y=f*g,F=p*m,O=p*_,U=p*g,H=a.x,L=a.y,z=a.z;return o[0]=(1-(T+y))*H,o[1]=(M+U)*H,o[2]=(b-O)*H,o[3]=0,o[4]=(M-U)*L,o[5]=(1-(x+y))*L,o[6]=(S+F)*L,o[7]=0,o[8]=(b+O)*z,o[9]=(S-F)*z,o[10]=(1-(x+T))*z,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,this}decompose(t,n,a){const o=this.elements;let c=jr.set(o[0],o[1],o[2]).length();const h=jr.set(o[4],o[5],o[6]).length(),f=jr.set(o[8],o[9],o[10]).length();this.determinant()<0&&(c=-c),t.x=o[12],t.y=o[13],t.z=o[14],Vi.copy(this);const m=1/c,_=1/h,g=1/f;return Vi.elements[0]*=m,Vi.elements[1]*=m,Vi.elements[2]*=m,Vi.elements[4]*=_,Vi.elements[5]*=_,Vi.elements[6]*=_,Vi.elements[8]*=g,Vi.elements[9]*=g,Vi.elements[10]*=g,n.setFromRotationMatrix(Vi),a.x=c,a.y=h,a.z=f,this}makePerspective(t,n,a,o,c,h,f=La){const p=this.elements,m=2*c/(n-t),_=2*c/(a-o),g=(n+t)/(n-t),x=(a+o)/(a-o);let M,b;if(f===La)M=-(h+c)/(h-c),b=-2*h*c/(h-c);else if(f===bu)M=-h/(h-c),b=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return p[0]=m,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=b,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,o,c,h,f=La){const p=this.elements,m=1/(n-t),_=1/(a-o),g=1/(h-c),x=(n+t)*m,M=(a+o)*_;let b,T;if(f===La)b=(h+c)*g,T=-2*g;else if(f===bu)b=c*g,T=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*_,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=T,p[14]=-b,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let o=0;o<16;o++)if(n[o]!==a[o])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const jr=new Q,Vi=new Ze,WM=new Q(0,0,0),qM=new Q(1,1,1),hs=new Q,Bc=new Q,gi=new Q,_v=new Ze,vv=new ca;class Ba{constructor(t=0,n=0,a=0,o=Ba.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=o}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,o=this._order){return this._x=t,this._y=n,this._z=a,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const o=t.elements,c=o[0],h=o[4],f=o[8],p=o[1],m=o[5],_=o[9],g=o[2],x=o[6],M=o[10];switch(n){case"XYZ":this._y=Math.asin(be(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-be(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(f,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(be(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,M),this._z=Math.atan2(-h,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-be(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-h,m));break;case"YZX":this._z=Math.asin(be(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(f,M));break;case"XZY":this._z=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(f,c)):(this._x=Math.atan2(-_,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return _v.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_v,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return vv.setFromEuler(this),this.setFromQuaternion(vv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ba.DEFAULT_ORDER="XYZ";class Rp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let YM=0;const xv=new Q,Xr=new ca,Ra=new Ze,Fc=new Q,hl=new Q,ZM=new Q,KM=new ca,yv=new Q(1,0,0),Sv=new Q(0,1,0),Mv=new Q(0,0,1),bv={type:"added"},QM={type:"removed"},Wr={type:"childadded",child:null},Xh={type:"childremoved",child:null};class ti extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:YM++}),this.uuid=Oa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ti.DEFAULT_UP.clone();const t=new Q,n=new Ba,a=new ca,o=new Q(1,1,1);function c(){a.setFromEuler(n,!1)}function h(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new Ze},normalMatrix:{value:new _e}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=ti.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Xr.setFromAxisAngle(t,n),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(t,n){return Xr.setFromAxisAngle(t,n),this.quaternion.premultiply(Xr),this}rotateX(t){return this.rotateOnAxis(yv,t)}rotateY(t){return this.rotateOnAxis(Sv,t)}rotateZ(t){return this.rotateOnAxis(Mv,t)}translateOnAxis(t,n){return xv.copy(t).applyQuaternion(this.quaternion),this.position.add(xv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(yv,t)}translateY(t){return this.translateOnAxis(Sv,t)}translateZ(t){return this.translateOnAxis(Mv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ra.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Fc.copy(t):Fc.set(t,n,a);const o=this.parent;this.updateWorldMatrix(!0,!1),hl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ra.lookAt(hl,Fc,this.up):Ra.lookAt(Fc,hl,this.up),this.quaternion.setFromRotationMatrix(Ra),o&&(Ra.extractRotation(o.matrixWorld),Xr.setFromRotationMatrix(Ra),this.quaternion.premultiply(Xr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bv),Wr.child=t,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(QM),Xh.child=t,this.dispatchEvent(Xh),Xh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ra.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ra.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ra),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bv),Wr.child=t,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,o=this.children.length;a<o;a++){const h=this.children[a].getObjectByProperty(t,n);if(h!==void 0)return h}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const o=this.children;for(let c=0,h=o.length;c<h;c++)o[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,t,ZM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,KM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const o=this.children;for(let c=0,h=o.length;c<h;c++)o[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.visibility=this._visibility,o.active=this._active,o.bounds=this._bounds.map(f=>({boxInitialized:f.boxInitialized,boxMin:f.box.min.toArray(),boxMax:f.box.max.toArray(),sphereInitialized:f.sphereInitialized,sphereRadius:f.sphere.radius,sphereCenter:f.sphere.center.toArray()})),o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.geometryCount=this._geometryCount,o.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(o.boundingSphere={center:o.boundingSphere.center.toArray(),radius:o.boundingSphere.radius}),this.boundingBox!==null&&(o.boundingBox={min:o.boundingBox.min.toArray(),max:o.boundingBox.max.toArray()}));function c(f,p){return f[p.uuid]===void 0&&(f[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(t.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const p=f.shapes;if(Array.isArray(p))for(let m=0,_=p.length;m<_;m++){const g=p[m];c(t.shapes,g)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let p=0,m=this.material.length;p<m;p++)f.push(c(t.materials,this.material[p]));o.material=f}else o.material=c(t.materials,this.material);if(this.children.length>0){o.children=[];for(let f=0;f<this.children.length;f++)o.children.push(this.children[f].toJSON(t).object)}if(this.animations.length>0){o.animations=[];for(let f=0;f<this.animations.length;f++){const p=this.animations[f];o.animations.push(c(t.animations,p))}}if(n){const f=h(t.geometries),p=h(t.materials),m=h(t.textures),_=h(t.images),g=h(t.shapes),x=h(t.skeletons),M=h(t.animations),b=h(t.nodes);f.length>0&&(a.geometries=f),p.length>0&&(a.materials=p),m.length>0&&(a.textures=m),_.length>0&&(a.images=_),g.length>0&&(a.shapes=g),x.length>0&&(a.skeletons=x),M.length>0&&(a.animations=M),b.length>0&&(a.nodes=b)}return a.object=o,a;function h(f){const p=[];for(const m in f){const _=f[m];delete _.metadata,p.push(_)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const o=t.children[a];this.add(o.clone())}return this}}ti.DEFAULT_UP=new Q(0,1,0);ti.DEFAULT_MATRIX_AUTO_UPDATE=!0;ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ji=new Q,Ca=new Q,Wh=new Q,Da=new Q,qr=new Q,Yr=new Q,Ev=new Q,qh=new Q,Yh=new Q,Zh=new Q,Kh=new tn,Qh=new tn,$h=new tn;class Wi{constructor(t=new Q,n=new Q,a=new Q){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,o){o.subVectors(a,n),ji.subVectors(t,n),o.cross(ji);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(t,n,a,o,c){ji.subVectors(o,n),Ca.subVectors(a,n),Wh.subVectors(t,n);const h=ji.dot(ji),f=ji.dot(Ca),p=ji.dot(Wh),m=Ca.dot(Ca),_=Ca.dot(Wh),g=h*m-f*f;if(g===0)return c.set(0,0,0),null;const x=1/g,M=(m*p-f*_)*x,b=(h*_-f*p)*x;return c.set(1-M-b,b,M)}static containsPoint(t,n,a,o){return this.getBarycoord(t,n,a,o,Da)===null?!1:Da.x>=0&&Da.y>=0&&Da.x+Da.y<=1}static getInterpolation(t,n,a,o,c,h,f,p){return this.getBarycoord(t,n,a,o,Da)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,Da.x),p.addScaledVector(h,Da.y),p.addScaledVector(f,Da.z),p)}static getInterpolatedAttribute(t,n,a,o,c,h){return Kh.setScalar(0),Qh.setScalar(0),$h.setScalar(0),Kh.fromBufferAttribute(t,n),Qh.fromBufferAttribute(t,a),$h.fromBufferAttribute(t,o),h.setScalar(0),h.addScaledVector(Kh,c.x),h.addScaledVector(Qh,c.y),h.addScaledVector($h,c.z),h}static isFrontFacing(t,n,a,o){return ji.subVectors(a,n),Ca.subVectors(t,n),ji.cross(Ca).dot(o)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,o){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[o]),this}setFromAttributeAndIndices(t,n,a,o){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,o),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ji.subVectors(this.c,this.b),Ca.subVectors(this.a,this.b),ji.cross(Ca).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Wi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,o,c){return Wi.getInterpolation(t,this.a,this.b,this.c,n,a,o,c)}containsPoint(t){return Wi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,o=this.b,c=this.c;let h,f;qr.subVectors(o,a),Yr.subVectors(c,a),qh.subVectors(t,a);const p=qr.dot(qh),m=Yr.dot(qh);if(p<=0&&m<=0)return n.copy(a);Yh.subVectors(t,o);const _=qr.dot(Yh),g=Yr.dot(Yh);if(_>=0&&g<=_)return n.copy(o);const x=p*g-_*m;if(x<=0&&p>=0&&_<=0)return h=p/(p-_),n.copy(a).addScaledVector(qr,h);Zh.subVectors(t,c);const M=qr.dot(Zh),b=Yr.dot(Zh);if(b>=0&&M<=b)return n.copy(c);const T=M*m-p*b;if(T<=0&&m>=0&&b<=0)return f=m/(m-b),n.copy(a).addScaledVector(Yr,f);const S=_*b-M*g;if(S<=0&&g-_>=0&&M-b>=0)return Ev.subVectors(c,o),f=(g-_)/(g-_+(M-b)),n.copy(o).addScaledVector(Ev,f);const y=1/(S+T+x);return h=T*y,f=x*y,n.copy(a).addScaledVector(qr,h).addScaledVector(Yr,f)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Y0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ds={h:0,s:0,l:0},Ic={h:0,s:0,l:0};function Jh(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class Be{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const o=t;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ze.toWorkingColorSpace(this,n),this}setRGB(t,n,a,o=ze.workingColorSpace){return this.r=t,this.g=n,this.b=a,ze.toWorkingColorSpace(this,o),this}setHSL(t,n,a,o=ze.workingColorSpace){if(t=Ap(t,1),n=be(n,0,1),a=be(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,h=2*a-c;this.r=Jh(h,c,t+1/3),this.g=Jh(h,c,t),this.b=Jh(h,c,t-1/3)}return ze.toWorkingColorSpace(this,o),this}setStyle(t,n=ai){function a(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=o[1],f=o[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=o[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(h===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ai){const a=Y0[t.toLowerCase()];return a!==void 0?this.setHex(a,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pa(t.r),this.g=Pa(t.g),this.b=Pa(t.b),this}copyLinearToSRGB(t){return this.r=ro(t.r),this.g=ro(t.g),this.b=ro(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ai){return ze.fromWorkingColorSpace(qn.copy(this),t),Math.round(be(qn.r*255,0,255))*65536+Math.round(be(qn.g*255,0,255))*256+Math.round(be(qn.b*255,0,255))}getHexString(t=ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ze.workingColorSpace){ze.fromWorkingColorSpace(qn.copy(this),n);const a=qn.r,o=qn.g,c=qn.b,h=Math.max(a,o,c),f=Math.min(a,o,c);let p,m;const _=(f+h)/2;if(f===h)p=0,m=0;else{const g=h-f;switch(m=_<=.5?g/(h+f):g/(2-h-f),h){case a:p=(o-c)/g+(o<c?6:0);break;case o:p=(c-a)/g+2;break;case c:p=(a-o)/g+4;break}p/=6}return t.h=p,t.s=m,t.l=_,t}getRGB(t,n=ze.workingColorSpace){return ze.fromWorkingColorSpace(qn.copy(this),n),t.r=qn.r,t.g=qn.g,t.b=qn.b,t}getStyle(t=ai){ze.fromWorkingColorSpace(qn.copy(this),t);const n=qn.r,a=qn.g,o=qn.b;return t!==ai?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(o*255)})`}offsetHSL(t,n,a){return this.getHSL(ds),this.setHSL(ds.h+t,ds.s+n,ds.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(ds),t.getHSL(Ic);const a=vl(ds.h,Ic.h,n),o=vl(ds.s,Ic.s,n),c=vl(ds.l,Ic.l,n);return this.setHSL(a,o,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,o=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*o,this.g=c[1]*n+c[4]*a+c[7]*o,this.b=c[2]*n+c[5]*a+c[8]*o,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qn=new Be;Be.NAMES=Y0;let $M=0;class mo extends or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=Oa(),this.name="",this.type="Material",this.blending=ao,this.side=bs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bd,this.blendDst=Ed,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ir,this.stencilZFail=Ir,this.stencilZPass=Ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(a):o&&o.isVector3&&a&&a.isVector3?o.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==ao&&(a.blending=this.blending),this.side!==bs&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==bd&&(a.blendSrc=this.blendSrc),this.blendDst!==Ed&&(a.blendDst=this.blendDst),this.blendEquation!==Js&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==oo&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uv&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ir&&(a.stencilFail=this.stencilFail),this.stencilZFail!==Ir&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==Ir&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function o(c){const h=[];for(const f in c){const p=c[f];delete p.metadata,h.push(p)}return h}if(n){const c=o(t.textures),h=o(t.images);c.length>0&&(a.textures=c),h.length>0&&(a.images=h)}return a}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const o=n.length;a=new Array(o);for(let c=0;c!==o;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Cp extends mo{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ba,this.combine=N0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Mn=new Q,Hc=new pe;class vi{constructor(t,n,a=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=lp,this.updateRanges=[],this.gpuType=Na,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[t+o]=n.array[a+o];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Hc.fromBufferAttribute(this,n),Hc.applyMatrix3(t),this.setXY(n,Hc.x,Hc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.applyMatrix3(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.applyMatrix4(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.applyNormalMatrix(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)Mn.fromBufferAttribute(this,n),Mn.transformDirection(t),this.setXYZ(n,Mn.x,Mn.y,Mn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=Xi(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=ke(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Xi(n,this.array)),n}setX(t,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Xi(n,this.array)),n}setY(t,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Xi(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Xi(n,this.array)),n}setW(t,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=ke(n,this.array),a=ke(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,o){return t*=this.itemSize,this.normalized&&(n=ke(n,this.array),a=ke(a,this.array),o=ke(o,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t*=this.itemSize,this.normalized&&(n=ke(n,this.array),a=ke(a,this.array),o=ke(o,this.array),c=ke(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=o,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==lp&&(t.usage=this.usage),t}}class Z0 extends vi{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class K0 extends vi{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class Li extends vi{constructor(t,n,a){super(new Float32Array(t),n,a)}}let JM=0;const Di=new Ze,td=new ti,Zr=new Q,_i=new Es,dl=new Es,Un=new Q;class Oi extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:JM++}),this.uuid=Oa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(X0(t)?K0:Z0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new _e().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Di.makeRotationFromQuaternion(t),this.applyMatrix4(Di),this}rotateX(t){return Di.makeRotationX(t),this.applyMatrix4(Di),this}rotateY(t){return Di.makeRotationY(t),this.applyMatrix4(Di),this}rotateZ(t){return Di.makeRotationZ(t),this.applyMatrix4(Di),this}translate(t,n,a){return Di.makeTranslation(t,n,a),this.applyMatrix4(Di),this}scale(t,n,a){return Di.makeScale(t,n,a),this.applyMatrix4(Di),this}lookAt(t){return td.lookAt(t),td.updateMatrix(),this.applyMatrix4(td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let o=0,c=t.length;o<c;o++){const h=t[o];a.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Li(a,3))}else{const a=Math.min(t.length,n.count);for(let o=0;o<a;o++){const c=t[o];n.setXYZ(o,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Es);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,o=n.length;a<o;a++){const c=n[a];_i.setFromBufferAttribute(c),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,_i.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,_i.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(_i.min),this.boundingBox.expandByPoint(_i.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const a=this.boundingSphere.center;if(_i.setFromBufferAttribute(t),n)for(let c=0,h=n.length;c<h;c++){const f=n[c];dl.setFromBufferAttribute(f),this.morphTargetsRelative?(Un.addVectors(_i.min,dl.min),_i.expandByPoint(Un),Un.addVectors(_i.max,dl.max),_i.expandByPoint(Un)):(_i.expandByPoint(dl.min),_i.expandByPoint(dl.max))}_i.getCenter(a);let o=0;for(let c=0,h=t.count;c<h;c++)Un.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(Un));if(n)for(let c=0,h=n.length;c<h;c++){const f=n[c],p=this.morphTargetsRelative;for(let m=0,_=f.count;m<_;m++)Un.fromBufferAttribute(f,m),p&&(Zr.fromBufferAttribute(t,m),Un.add(Zr)),o=Math.max(o,a.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,o=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vi(new Float32Array(4*a.count),4));const h=this.getAttribute("tangent"),f=[],p=[];for(let P=0;P<a.count;P++)f[P]=new Q,p[P]=new Q;const m=new Q,_=new Q,g=new Q,x=new pe,M=new pe,b=new pe,T=new Q,S=new Q;function y(P,w,A){m.fromBufferAttribute(a,P),_.fromBufferAttribute(a,w),g.fromBufferAttribute(a,A),x.fromBufferAttribute(c,P),M.fromBufferAttribute(c,w),b.fromBufferAttribute(c,A),_.sub(m),g.sub(m),M.sub(x),b.sub(x);const k=1/(M.x*b.y-b.x*M.y);isFinite(k)&&(T.copy(_).multiplyScalar(b.y).addScaledVector(g,-M.y).multiplyScalar(k),S.copy(g).multiplyScalar(M.x).addScaledVector(_,-b.x).multiplyScalar(k),f[P].add(T),f[w].add(T),f[A].add(T),p[P].add(S),p[w].add(S),p[A].add(S))}let F=this.groups;F.length===0&&(F=[{start:0,count:t.count}]);for(let P=0,w=F.length;P<w;++P){const A=F[P],k=A.start,lt=A.count;for(let $=k,ot=k+lt;$<ot;$+=3)y(t.getX($+0),t.getX($+1),t.getX($+2))}const O=new Q,U=new Q,H=new Q,L=new Q;function z(P){H.fromBufferAttribute(o,P),L.copy(H);const w=f[P];O.copy(w),O.sub(H.multiplyScalar(H.dot(w))).normalize(),U.crossVectors(L,w);const k=U.dot(p[P])<0?-1:1;h.setXYZW(P,O.x,O.y,O.z,k)}for(let P=0,w=F.length;P<w;++P){const A=F[P],k=A.start,lt=A.count;for(let $=k,ot=k+lt;$<ot;$+=3)z(t.getX($+0)),z(t.getX($+1)),z(t.getX($+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new vi(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let x=0,M=a.count;x<M;x++)a.setXYZ(x,0,0,0);const o=new Q,c=new Q,h=new Q,f=new Q,p=new Q,m=new Q,_=new Q,g=new Q;if(t)for(let x=0,M=t.count;x<M;x+=3){const b=t.getX(x+0),T=t.getX(x+1),S=t.getX(x+2);o.fromBufferAttribute(n,b),c.fromBufferAttribute(n,T),h.fromBufferAttribute(n,S),_.subVectors(h,c),g.subVectors(o,c),_.cross(g),f.fromBufferAttribute(a,b),p.fromBufferAttribute(a,T),m.fromBufferAttribute(a,S),f.add(_),p.add(_),m.add(_),a.setXYZ(b,f.x,f.y,f.z),a.setXYZ(T,p.x,p.y,p.z),a.setXYZ(S,m.x,m.y,m.z)}else for(let x=0,M=n.count;x<M;x+=3)o.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),h.fromBufferAttribute(n,x+2),_.subVectors(h,c),g.subVectors(o,c),_.cross(g),a.setXYZ(x+0,_.x,_.y,_.z),a.setXYZ(x+1,_.x,_.y,_.z),a.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Un.fromBufferAttribute(t,n),Un.normalize(),t.setXYZ(n,Un.x,Un.y,Un.z)}toNonIndexed(){function t(f,p){const m=f.array,_=f.itemSize,g=f.normalized,x=new m.constructor(p.length*_);let M=0,b=0;for(let T=0,S=p.length;T<S;T++){f.isInterleavedBufferAttribute?M=p[T]*f.data.stride+f.offset:M=p[T]*_;for(let y=0;y<_;y++)x[b++]=m[M++]}return new vi(x,_,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Oi,a=this.index.array,o=this.attributes;for(const f in o){const p=o[f],m=t(p,a);n.setAttribute(f,m)}const c=this.morphAttributes;for(const f in c){const p=[],m=c[f];for(let _=0,g=m.length;_<g;_++){const x=m[_],M=t(x,a);p.push(M)}n.morphAttributes[f]=p}n.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let f=0,p=h.length;f<p;f++){const m=h[f];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const p in a){const m=a[p];t.data.attributes[p]=m.toJSON(t.data)}const o={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],_=[];for(let g=0,x=m.length;g<x;g++){const M=m[g];_.push(M.toJSON(t.data))}_.length>0&&(o[p]=_,c=!0)}c&&(t.data.morphAttributes=o,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const f=this.boundingSphere;return f!==null&&(t.data.boundingSphere={center:f.center.toArray(),radius:f.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone(n));const o=t.attributes;for(const m in o){const _=o[m];this.setAttribute(m,_.clone(n))}const c=t.morphAttributes;for(const m in c){const _=[],g=c[m];for(let x=0,M=g.length;x<M;x++)_.push(g[x].clone(n));this.morphAttributes[m]=_}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let m=0,_=h.length;m<_;m++){const g=h[m];this.addGroup(g.start,g.count,g.materialIndex)}const f=t.boundingBox;f!==null&&(this.boundingBox=f.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tv=new Ze,Ys=new Tl,kc=new lr,Av=new Q,Gc=new Q,Vc=new Q,jc=new Q,ed=new Q,Xc=new Q,wv=new Q,Wc=new Q;class ri extends ti{constructor(t=new Oi,n=new Cp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=o.length;c<h;c++){const f=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=c}}}}getVertexPosition(t,n){const a=this.geometry,o=a.attributes.position,c=a.morphAttributes.position,h=a.morphTargetsRelative;n.fromBufferAttribute(o,t);const f=this.morphTargetInfluences;if(c&&f){Xc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const _=f[p],g=c[p];_!==0&&(ed.fromBufferAttribute(g,t),h?Xc.addScaledVector(ed,_):Xc.addScaledVector(ed.sub(n),_))}n.add(Xc)}return n}raycast(t,n){const a=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),kc.copy(a.boundingSphere),kc.applyMatrix4(c),Ys.copy(t.ray).recast(t.near),!(kc.containsPoint(Ys.origin)===!1&&(Ys.intersectSphere(kc,Av)===null||Ys.origin.distanceToSquared(Av)>(t.far-t.near)**2))&&(Tv.copy(c).invert(),Ys.copy(t.ray).applyMatrix4(Tv),!(a.boundingBox!==null&&Ys.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ys)))}_computeIntersections(t,n,a){let o;const c=this.geometry,h=this.material,f=c.index,p=c.attributes.position,m=c.attributes.uv,_=c.attributes.uv1,g=c.attributes.normal,x=c.groups,M=c.drawRange;if(f!==null)if(Array.isArray(h))for(let b=0,T=x.length;b<T;b++){const S=x[b],y=h[S.materialIndex],F=Math.max(S.start,M.start),O=Math.min(f.count,Math.min(S.start+S.count,M.start+M.count));for(let U=F,H=O;U<H;U+=3){const L=f.getX(U),z=f.getX(U+1),P=f.getX(U+2);o=qc(this,y,t,a,m,_,g,L,z,P),o&&(o.faceIndex=Math.floor(U/3),o.face.materialIndex=S.materialIndex,n.push(o))}}else{const b=Math.max(0,M.start),T=Math.min(f.count,M.start+M.count);for(let S=b,y=T;S<y;S+=3){const F=f.getX(S),O=f.getX(S+1),U=f.getX(S+2);o=qc(this,h,t,a,m,_,g,F,O,U),o&&(o.faceIndex=Math.floor(S/3),n.push(o))}}else if(p!==void 0)if(Array.isArray(h))for(let b=0,T=x.length;b<T;b++){const S=x[b],y=h[S.materialIndex],F=Math.max(S.start,M.start),O=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let U=F,H=O;U<H;U+=3){const L=U,z=U+1,P=U+2;o=qc(this,y,t,a,m,_,g,L,z,P),o&&(o.faceIndex=Math.floor(U/3),o.face.materialIndex=S.materialIndex,n.push(o))}}else{const b=Math.max(0,M.start),T=Math.min(p.count,M.start+M.count);for(let S=b,y=T;S<y;S+=3){const F=S,O=S+1,U=S+2;o=qc(this,h,t,a,m,_,g,F,O,U),o&&(o.faceIndex=Math.floor(S/3),n.push(o))}}}}function tb(r,t,n,a,o,c,h,f){let p;if(t.side===oi?p=a.intersectTriangle(h,c,o,!0,f):p=a.intersectTriangle(o,c,h,t.side===bs,f),p===null)return null;Wc.copy(f),Wc.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(Wc);return m<n.near||m>n.far?null:{distance:m,point:Wc.clone(),object:r}}function qc(r,t,n,a,o,c,h,f,p,m){r.getVertexPosition(f,Gc),r.getVertexPosition(p,Vc),r.getVertexPosition(m,jc);const _=tb(r,t,n,a,Gc,Vc,jc,wv);if(_){const g=new Q;Wi.getBarycoord(wv,Gc,Vc,jc,g),o&&(_.uv=Wi.getInterpolatedAttribute(o,f,p,m,g,new pe)),c&&(_.uv1=Wi.getInterpolatedAttribute(c,f,p,m,g,new pe)),h&&(_.normal=Wi.getInterpolatedAttribute(h,f,p,m,g,new Q),_.normal.dot(a.direction)>0&&_.normal.multiplyScalar(-1));const x={a:f,b:p,c:m,normal:new Q,materialIndex:0};Wi.getNormal(Gc,Vc,jc,x.normal),_.face=x,_.barycoord=g}return _}class Al extends Oi{constructor(t=1,n=1,a=1,o=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:o,heightSegments:c,depthSegments:h};const f=this;o=Math.floor(o),c=Math.floor(c),h=Math.floor(h);const p=[],m=[],_=[],g=[];let x=0,M=0;b("z","y","x",-1,-1,a,n,t,h,c,0),b("z","y","x",1,-1,a,n,-t,h,c,1),b("x","z","y",1,1,t,a,n,o,h,2),b("x","z","y",1,-1,t,a,-n,o,h,3),b("x","y","z",1,-1,t,n,a,o,c,4),b("x","y","z",-1,-1,t,n,-a,o,c,5),this.setIndex(p),this.setAttribute("position",new Li(m,3)),this.setAttribute("normal",new Li(_,3)),this.setAttribute("uv",new Li(g,2));function b(T,S,y,F,O,U,H,L,z,P,w){const A=U/z,k=H/P,lt=U/2,$=H/2,ot=L/2,ft=z+1,G=P+1;let nt=0,W=0;const tt=new Q;for(let N=0;N<G;N++){const it=N*k-$;for(let Tt=0;Tt<ft;Tt++){const Dt=Tt*A-lt;tt[T]=Dt*F,tt[S]=it*O,tt[y]=ot,m.push(tt.x,tt.y,tt.z),tt[T]=0,tt[S]=0,tt[y]=L>0?1:-1,_.push(tt.x,tt.y,tt.z),g.push(Tt/z),g.push(1-N/P),nt+=1}}for(let N=0;N<P;N++)for(let it=0;it<z;it++){const Tt=x+it+ft*N,Dt=x+it+ft*(N+1),J=x+(it+1)+ft*(N+1),mt=x+(it+1)+ft*N;p.push(Tt,Dt,mt),p.push(Dt,J,mt),W+=6}f.addGroup(M,W,w),M+=W,x+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Al(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function po(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const o=r[n][a];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=o.clone():Array.isArray(o)?t[n][a]=o.slice():t[n][a]=o}}return t}function $n(r){const t={};for(let n=0;n<r.length;n++){const a=po(r[n]);for(const o in a)t[o]=a[o]}return t}function eb(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function Q0(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ze.workingColorSpace}const Dp={clone:po,merge:$n};var nb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ib=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zi extends mo{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nb,this.fragmentShader=ib,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=po(t.uniforms),this.uniformsGroups=eb(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const h=this.uniforms[o].value;h&&h.isTexture?n.uniforms[o]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?n.uniforms[o]={type:"c",value:h.getHex()}:h&&h.isVector2?n.uniforms[o]={type:"v2",value:h.toArray()}:h&&h.isVector3?n.uniforms[o]={type:"v3",value:h.toArray()}:h&&h.isVector4?n.uniforms[o]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?n.uniforms[o]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?n.uniforms[o]={type:"m4",value:h.toArray()}:n.uniforms[o]={value:h}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const o in this.extensions)this.extensions[o]===!0&&(a[o]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}}class $0 extends ti{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=La}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ps=new Q,Rv=new pe,Cv=new pe;class Ui extends $0{constructor(t=50,n=1,a=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Sl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_l*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sl*2*Math.atan(Math.tan(_l*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ps.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ps.x,ps.y).multiplyScalar(-t/ps.z),ps.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ps.x,ps.y).multiplyScalar(-t/ps.z)}getViewSize(t,n){return this.getViewBounds(t,Rv,Cv),n.subVectors(Cv,Rv)}setViewOffset(t,n,a,o,c,h){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(_l*.5*this.fov)/this.zoom,a=2*n,o=this.aspect*a,c=-.5*o;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,m=h.fullHeight;c+=h.offsetX*o/p,n-=h.offsetY*a/m,o*=h.width/p,a*=h.height/m}const f=this.filmOffset;f!==0&&(c+=t*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-a,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Kr=-90,Qr=1;class ab extends ti{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new Ui(Kr,Qr,t,n);o.layers=this.layers,this.add(o);const c=new Ui(Kr,Qr,t,n);c.layers=this.layers,this.add(c);const h=new Ui(Kr,Qr,t,n);h.layers=this.layers,this.add(h);const f=new Ui(Kr,Qr,t,n);f.layers=this.layers,this.add(f);const p=new Ui(Kr,Qr,t,n);p.layers=this.layers,this.add(p);const m=new Ui(Kr,Qr,t,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,o,c,h,f,p]=n;for(const m of n)this.remove(m);if(t===La)a.up.set(0,1,0),a.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===bu)a.up.set(0,-1,0),a.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of n)this.add(m),m.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:o}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,f,p,m,_]=this.children,g=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const T=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,t.setRenderTarget(a,0,o),t.render(n,c),t.setRenderTarget(a,1,o),t.render(n,h),t.setRenderTarget(a,2,o),t.render(n,f),t.setRenderTarget(a,3,o),t.render(n,p),t.setRenderTarget(a,4,o),t.render(n,m),a.texture.generateMipmaps=T,t.setRenderTarget(a,5,o),t.render(n,_),t.setRenderTarget(g,x,M),t.xr.enabled=b,a.texture.needsPMREMUpdate=!0}}class J0 extends Jn{constructor(t,n,a,o,c,h,f,p,m,_){t=t!==void 0?t:[],n=n!==void 0?n:lo,super(t,n,a,o,c,h,f,p,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class sb extends sr{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},o=[a,a,a,a,a,a];this.texture=new J0(o,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:la}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new Al(5,5,5),c=new Zi({name:"CubemapFromEquirect",uniforms:po(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:oi,blending:Ss});c.uniforms.tEquirect.value=n;const h=new ri(o,c),f=n.minFilter;return n.minFilter===nr&&(n.minFilter=la),new ab(1,10,this).update(t,h),n.minFilter=f,h.geometry.dispose(),h.material.dispose(),this}clear(t,n,a,o){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(n,a,o);t.setRenderTarget(c)}}class rb extends ti{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ba,this.environmentIntensity=1,this.environmentRotation=new Ba,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class ob{constructor(t,n){this.isInterleavedBuffer=!0,this.array=t,this.stride=n,this.count=t!==void 0?t.length/n:0,this.usage=lp,this.updateRanges=[],this.version=0,this.uuid=Oa()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,n,a){t*=this.stride,a*=n.stride;for(let o=0,c=this.stride;o<c;o++)this.array[t+o]=n.array[a+o];return this}set(t,n=0){return this.array.set(t,n),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oa()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),a=new this.constructor(n,this.stride);return a.setUsage(this.usage),a}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Oa()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qn=new Q;class xs{constructor(t,n,a,o=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=n,this.offset=a,this.normalized=o}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let n=0,a=this.data.count;n<a;n++)Qn.fromBufferAttribute(this,n),Qn.applyMatrix4(t),this.setXYZ(n,Qn.x,Qn.y,Qn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)Qn.fromBufferAttribute(this,n),Qn.applyNormalMatrix(t),this.setXYZ(n,Qn.x,Qn.y,Qn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)Qn.fromBufferAttribute(this,n),Qn.transformDirection(t),this.setXYZ(n,Qn.x,Qn.y,Qn.z);return this}getComponent(t,n){let a=this.array[t*this.data.stride+this.offset+n];return this.normalized&&(a=Xi(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=ke(a,this.array)),this.data.array[t*this.data.stride+this.offset+n]=a,this}setX(t,n){return this.normalized&&(n=ke(n,this.array)),this.data.array[t*this.data.stride+this.offset]=n,this}setY(t,n){return this.normalized&&(n=ke(n,this.array)),this.data.array[t*this.data.stride+this.offset+1]=n,this}setZ(t,n){return this.normalized&&(n=ke(n,this.array)),this.data.array[t*this.data.stride+this.offset+2]=n,this}setW(t,n){return this.normalized&&(n=ke(n,this.array)),this.data.array[t*this.data.stride+this.offset+3]=n,this}getX(t){let n=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(n=Xi(n,this.array)),n}getY(t){let n=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(n=Xi(n,this.array)),n}getZ(t){let n=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(n=Xi(n,this.array)),n}getW(t){let n=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(n=Xi(n,this.array)),n}setXY(t,n,a){return t=t*this.data.stride+this.offset,this.normalized&&(n=ke(n,this.array),a=ke(a,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=a,this}setXYZ(t,n,a,o){return t=t*this.data.stride+this.offset,this.normalized&&(n=ke(n,this.array),a=ke(a,this.array),o=ke(o,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=a,this.data.array[t+2]=o,this}setXYZW(t,n,a,o,c){return t=t*this.data.stride+this.offset,this.normalized&&(n=ke(n,this.array),a=ke(a,this.array),o=ke(o,this.array),c=ke(c,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=a,this.data.array[t+2]=o,this.data.array[t+3]=c,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let a=0;a<this.count;a++){const o=a*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)n.push(this.data.array[o+c])}return new vi(new this.array.constructor(n),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new xs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let a=0;a<this.count;a++){const o=a*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)n.push(this.data.array[o+c])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class nd extends vi{constructor(t,n,a,o=1){super(t,n,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=o}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const id=new Q,lb=new Q,cb=new _e;class _s{constructor(t=new Q(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,o){return this.normal.set(t,n,a),this.constant=o,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const o=id.subVectors(a,n).cross(lb.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const a=t.delta(id),o=this.normal.dot(a);if(o===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/o;return c<0||c>1?null:n.copy(t.start).addScaledVector(a,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||cb.getNormalMatrix(t),o=this.coplanarPoint(id).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-o.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zs=new lr,Yc=new Q;class tx{constructor(t=new _s,n=new _s,a=new _s,o=new _s,c=new _s,h=new _s){this.planes=[t,n,a,o,c,h]}set(t,n,a,o,c,h){const f=this.planes;return f[0].copy(t),f[1].copy(n),f[2].copy(a),f[3].copy(o),f[4].copy(c),f[5].copy(h),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=La){const a=this.planes,o=t.elements,c=o[0],h=o[1],f=o[2],p=o[3],m=o[4],_=o[5],g=o[6],x=o[7],M=o[8],b=o[9],T=o[10],S=o[11],y=o[12],F=o[13],O=o[14],U=o[15];if(a[0].setComponents(p-c,x-m,S-M,U-y).normalize(),a[1].setComponents(p+c,x+m,S+M,U+y).normalize(),a[2].setComponents(p+h,x+_,S+b,U+F).normalize(),a[3].setComponents(p-h,x-_,S-b,U-F).normalize(),a[4].setComponents(p-f,x-g,S-T,U-O).normalize(),n===La)a[5].setComponents(p+f,x+g,S+T,U+O).normalize();else if(n===bu)a[5].setComponents(f,g,T,O).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Zs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zs)}intersectsSprite(t){return Zs.center.set(0,0,0),Zs.radius=.7071067811865476,Zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zs)}intersectsSphere(t){const n=this.planes,a=t.center,o=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<o)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const o=n[a];if(Yc.x=o.normal.x>0?t.max.x:t.min.x,Yc.y=o.normal.y>0?t.max.y:t.min.y,Yc.z=o.normal.z>0?t.max.z:t.min.z,o.distanceToPoint(Yc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ub extends mo{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Eu=new Q,Tu=new Q,Dv=new Ze,pl=new Tl,Zc=new lr,ad=new Q,Uv=new Q;class fb extends ti{constructor(t=new Oi,n=new ub){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[0];for(let o=1,c=n.count;o<c;o++)Eu.fromBufferAttribute(n,o-1),Tu.fromBufferAttribute(n,o),a[o]=a[o-1],a[o]+=Eu.distanceTo(Tu);t.setAttribute("lineDistance",new Li(a,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const a=this.geometry,o=this.matrixWorld,c=t.params.Line.threshold,h=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Zc.copy(a.boundingSphere),Zc.applyMatrix4(o),Zc.radius+=c,t.ray.intersectsSphere(Zc)===!1)return;Dv.copy(o).invert(),pl.copy(t.ray).applyMatrix4(Dv);const f=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=f*f,m=this.isLineSegments?2:1,_=a.index,x=a.attributes.position;if(_!==null){const M=Math.max(0,h.start),b=Math.min(_.count,h.start+h.count);for(let T=M,S=b-1;T<S;T+=m){const y=_.getX(T),F=_.getX(T+1),O=Kc(this,t,pl,p,y,F);O&&n.push(O)}if(this.isLineLoop){const T=_.getX(b-1),S=_.getX(M),y=Kc(this,t,pl,p,T,S);y&&n.push(y)}}else{const M=Math.max(0,h.start),b=Math.min(x.count,h.start+h.count);for(let T=M,S=b-1;T<S;T+=m){const y=Kc(this,t,pl,p,T,T+1);y&&n.push(y)}if(this.isLineLoop){const T=Kc(this,t,pl,p,b-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=o.length;c<h;c++){const f=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=c}}}}}function Kc(r,t,n,a,o,c){const h=r.geometry.attributes.position;if(Eu.fromBufferAttribute(h,o),Tu.fromBufferAttribute(h,c),n.distanceSqToSegment(Eu,Tu,ad,Uv)>a)return;ad.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(ad);if(!(p<t.near||p>t.far))return{distance:p,point:Uv.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}class hb extends mo{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Nv=new Ze,cp=new Tl,Qc=new lr,$c=new Q;class db extends ti{constructor(t=new Oi,n=new hb){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const a=this.geometry,o=this.matrixWorld,c=t.params.Points.threshold,h=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Qc.copy(a.boundingSphere),Qc.applyMatrix4(o),Qc.radius+=c,t.ray.intersectsSphere(Qc)===!1)return;Nv.copy(o).invert(),cp.copy(t.ray).applyMatrix4(Nv);const f=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=f*f,m=a.index,g=a.attributes.position;if(m!==null){const x=Math.max(0,h.start),M=Math.min(m.count,h.start+h.count);for(let b=x,T=M;b<T;b++){const S=m.getX(b);$c.fromBufferAttribute(g,S),Lv($c,S,p,o,t,n,this)}}else{const x=Math.max(0,h.start),M=Math.min(g.count,h.start+h.count);for(let b=x,T=M;b<T;b++)$c.fromBufferAttribute(g,b),Lv($c,b,p,o,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const o=n[a[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=o.length;c<h;c++){const f=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=c}}}}}function Lv(r,t,n,a,o,c,h){const f=cp.distanceSqToPoint(r);if(f<n){const p=new Q;cp.closestPointToPoint(r,p),p.applyMatrix4(a);const m=o.ray.origin.distanceTo(p);if(m<o.near||m>o.far)return;c.push({distance:m,distanceToRay:Math.sqrt(f),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:h})}}let eo=class extends ti{constructor(){super(),this.isGroup=!0,this.type="Group"}};class ex extends Jn{constructor(t,n,a,o,c,h,f,p,m,_=so){if(_!==so&&_!==fo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&_===so&&(a=ar),a===void 0&&_===fo&&(a=uo),super(null,o,c,h,f,p,_,a,m),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=f!==void 0?f:Yi,this.minFilter=p!==void 0?p:Yi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class wl extends Oi{constructor(t=1,n=1,a=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:o};const c=t/2,h=n/2,f=Math.floor(a),p=Math.floor(o),m=f+1,_=p+1,g=t/f,x=n/p,M=[],b=[],T=[],S=[];for(let y=0;y<_;y++){const F=y*x-h;for(let O=0;O<m;O++){const U=O*g-c;b.push(U,-F,0),T.push(0,0,1),S.push(O/f),S.push(1-y/p)}}for(let y=0;y<p;y++)for(let F=0;F<f;F++){const O=F+m*y,U=F+m*(y+1),H=F+1+m*(y+1),L=F+1+m*y;M.push(O,U,L),M.push(U,H,L)}this.setIndex(M),this.setAttribute("position",new Li(b,3)),this.setAttribute("normal",new Li(T,3)),this.setAttribute("uv",new Li(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.width,t.height,t.widthSegments,t.heightSegments)}}class pb extends Oi{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const n=[],a=new Set,o=new Q,c=new Q;if(t.index!==null){const h=t.attributes.position,f=t.index;let p=t.groups;p.length===0&&(p=[{start:0,count:f.count,materialIndex:0}]);for(let m=0,_=p.length;m<_;++m){const g=p[m],x=g.start,M=g.count;for(let b=x,T=x+M;b<T;b+=3)for(let S=0;S<3;S++){const y=f.getX(b+S),F=f.getX(b+(S+1)%3);o.fromBufferAttribute(h,y),c.fromBufferAttribute(h,F),Ov(o,c,a)===!0&&(n.push(o.x,o.y,o.z),n.push(c.x,c.y,c.z))}}}else{const h=t.attributes.position;for(let f=0,p=h.count/3;f<p;f++)for(let m=0;m<3;m++){const _=3*f+m,g=3*f+(m+1)%3;o.fromBufferAttribute(h,_),c.fromBufferAttribute(h,g),Ov(o,c,a)===!0&&(n.push(o.x,o.y,o.z),n.push(c.x,c.y,c.z))}}this.setAttribute("position",new Li(n,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Ov(r,t,n){const a=`${r.x},${r.y},${r.z}-${t.x},${t.y},${t.z}`,o=`${t.x},${t.y},${t.z}-${r.x},${r.y},${r.z}`;return n.has(a)===!0||n.has(o)===!0?!1:(n.add(a),n.add(o),!0)}class mb extends mo{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gb extends mo{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Pv={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class _b{constructor(t,n,a){const o=this;let c=!1,h=0,f=0,p;const m=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=a,this.itemStart=function(_){f++,c===!1&&o.onStart!==void 0&&o.onStart(_,h,f),c=!0},this.itemEnd=function(_){h++,o.onProgress!==void 0&&o.onProgress(_,h,f),h===f&&(c=!1,o.onLoad!==void 0&&o.onLoad())},this.itemError=function(_){o.onError!==void 0&&o.onError(_)},this.resolveURL=function(_){return p?p(_):_},this.setURLModifier=function(_){return p=_,this},this.addHandler=function(_,g){return m.push(_,g),this},this.removeHandler=function(_){const g=m.indexOf(_);return g!==-1&&m.splice(g,2),this},this.getHandler=function(_){for(let g=0,x=m.length;g<x;g+=2){const M=m[g],b=m[g+1];if(M.global&&(M.lastIndex=0),M.test(_))return b}return null}}}const vb=new _b;class Up{constructor(t){this.manager=t!==void 0?t:vb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){const a=this;return new Promise(function(o,c){a.load(t,o,n,c)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Up.DEFAULT_MATERIAL_NAME="__DEFAULT";class xb extends Up{constructor(t){super(t)}load(t,n,a,o){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const c=this,h=Pv.get(t);if(h!==void 0)return c.manager.itemStart(t),setTimeout(function(){n&&n(h),c.manager.itemEnd(t)},0),h;const f=Ml("img");function p(){_(),Pv.add(t,this),n&&n(this),c.manager.itemEnd(t)}function m(g){_(),o&&o(g),c.manager.itemError(t),c.manager.itemEnd(t)}function _(){f.removeEventListener("load",p,!1),f.removeEventListener("error",m,!1)}return f.addEventListener("load",p,!1),f.addEventListener("error",m,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(f.crossOrigin=this.crossOrigin),c.manager.itemStart(t),f.src=t,f}}class yb extends Up{constructor(t){super(t)}load(t,n,a,o){const c=new Jn,h=new xb(this.manager);return h.setCrossOrigin(this.crossOrigin),h.setPath(this.path),h.load(t,function(f){c.image=f,c.needsUpdate=!0,n!==void 0&&n(c)},a,o),c}}class Sb extends $0{constructor(t=-1,n=1,a=1,o=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=o,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,o,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=o,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=a-t,h=a+t,f=o+n,p=o-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,h=c+m*this.view.width,f-=_*this.view.offsetY,p=f-_*this.view.height}this.projectionMatrix.makeOrthographic(c,h,f,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class nx extends Oi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Mb extends Ui{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class up extends ob{constructor(t,n,a=1){super(t,n),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=a}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const n=super.clone(t);return n.meshPerAttribute=this.meshPerAttribute,n}toJSON(t){const n=super.toJSON(t);return n.isInstancedInterleavedBuffer=!0,n.meshPerAttribute=this.meshPerAttribute,n}}const zv=new Ze;class bb{constructor(t,n,a=0,o=1/0){this.ray=new Tl(t,n),this.near=a,this.far=o,this.camera=null,this.layers=new Rp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return zv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zv),this}intersectObject(t,n=!0,a=[]){return fp(t,this,a,n),a.sort(Bv),a}intersectObjects(t,n=!0,a=[]){for(let o=0,c=t.length;o<c;o++)fp(t[o],this,a,n);return a.sort(Bv),a}}function Bv(r,t){return r.distance-t.distance}function fp(r,t,n,a){let o=!0;if(r.layers.test(t.layers)&&r.raycast(t,n)===!1&&(o=!1),o===!0&&a===!0){const c=r.children;for(let h=0,f=c.length;h<f;h++)fp(c[h],t,n,!0)}}class Fv{constructor(t=1,n=0,a=0){return this.radius=t,this.phi=n,this.theta=a,this}set(t,n,a){return this.radius=t,this.phi=n,this.theta=a,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=be(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,n,a){return this.radius=Math.sqrt(t*t+n*n+a*a),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,a),this.phi=Math.acos(be(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Iv=new Q,Jc=new Q;class Eb{constructor(t=new Q,n=new Q){this.start=t,this.end=n}set(t,n){return this.start.copy(t),this.end.copy(n),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,n){return this.delta(n).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,n){Iv.subVectors(t,this.start),Jc.subVectors(this.end,this.start);const a=Jc.dot(Jc);let c=Jc.dot(Iv)/a;return n&&(c=be(c,0,1)),c}closestPointToPoint(t,n,a){const o=this.closestPointToPointParameter(t,n);return this.delta(a).multiplyScalar(o).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class Tb extends or{constructor(t,n=null){super(),this.object=t,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Hv(r,t,n,a){const o=Ab(a);switch(n){case B0:return r*t;case I0:return r*t;case H0:return r*t*2;case k0:return r*t/o.components*o.byteLength;case bp:return r*t/o.components*o.byteLength;case G0:return r*t*2/o.components*o.byteLength;case Ep:return r*t*2/o.components*o.byteLength;case F0:return r*t*3/o.components*o.byteLength;case qi:return r*t*4/o.components*o.byteLength;case Tp:return r*t*4/o.components*o.byteLength;case du:case pu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case mu:case gu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Bd:case Id:return Math.max(r,16)*Math.max(t,8)/4;case zd:case Fd:return Math.max(r,8)*Math.max(t,8)/2;case Hd:case kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Gd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case jd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Wd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case qd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Yd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Zd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Kd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Qd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Jd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case tp:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ep:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case np:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case _u:case ip:case ap:return Math.ceil(r/4)*Math.ceil(t/4)*16;case V0:case sp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case rp:case op:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Ab(r){switch(r){case za:case O0:return{byteLength:1,components:1};case yl:case P0:case El:return{byteLength:2,components:1};case Sp:case Mp:return{byteLength:2,components:4};case ar:case yp:case Na:return{byteLength:4,components:1};case z0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xp);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ix(){let r=null,t=!1,n=null,a=null;function o(c,h){n(c,h),a=r.requestAnimationFrame(o)}return{start:function(){t!==!0&&n!==null&&(a=r.requestAnimationFrame(o),t=!0)},stop:function(){r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function wb(r){const t=new WeakMap;function n(f,p){const m=f.array,_=f.usage,g=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,_),f.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)f.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:f.version,size:g}}function a(f,p,m){const _=p.array,g=p.updateRanges;if(r.bindBuffer(m,f),g.length===0)r.bufferSubData(m,0,_);else{g.sort((M,b)=>M.start-b.start);let x=0;for(let M=1;M<g.length;M++){const b=g[x],T=g[M];T.start<=b.start+b.count+1?b.count=Math.max(b.count,T.start+T.count-b.start):(++x,g[x]=T)}g.length=x+1;for(let M=0,b=g.length;M<b;M++){const T=g[M];r.bufferSubData(m,T.start*_.BYTES_PER_ELEMENT,_,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function o(f){return f.isInterleavedBufferAttribute&&(f=f.data),t.get(f)}function c(f){f.isInterleavedBufferAttribute&&(f=f.data);const p=t.get(f);p&&(r.deleteBuffer(p.buffer),t.delete(f))}function h(f,p){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const _=t.get(f);(!_||_.version<f.version)&&t.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const m=t.get(f);if(m===void 0)t.set(f,n(f,p));else if(m.version<f.version){if(m.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(m.buffer,f,p),m.version=f.version}}return{get:o,remove:c,update:h}}var Rb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Db=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ub=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ob=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Bb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ib=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Qb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$b=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,tE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,aE="gl_FragColor = linearToOutputTexel( gl_FragColor );",sE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,oE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_E=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,SE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ME=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,EE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,TE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,AE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,RE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,CE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,DE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,UE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,OE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,PE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,BE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,IE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,HE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,GE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,XE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,WE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,KE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,QE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$E=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,JE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,t1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,e1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,n1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,i1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,o1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,l1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,c1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,u1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,f1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,h1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,d1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,p1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,m1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,g1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,x1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,y1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,S1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,M1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,b1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,A1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const w1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,R1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,O1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,P1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,z1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,B1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,k1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,G1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,W1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Y1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Z1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,nT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ye={alphahash_fragment:Rb,alphahash_pars_fragment:Cb,alphamap_fragment:Db,alphamap_pars_fragment:Ub,alphatest_fragment:Nb,alphatest_pars_fragment:Lb,aomap_fragment:Ob,aomap_pars_fragment:Pb,batching_pars_vertex:zb,batching_vertex:Bb,begin_vertex:Fb,beginnormal_vertex:Ib,bsdfs:Hb,iridescence_fragment:kb,bumpmap_pars_fragment:Gb,clipping_planes_fragment:Vb,clipping_planes_pars_fragment:jb,clipping_planes_pars_vertex:Xb,clipping_planes_vertex:Wb,color_fragment:qb,color_pars_fragment:Yb,color_pars_vertex:Zb,color_vertex:Kb,common:Qb,cube_uv_reflection_fragment:$b,defaultnormal_vertex:Jb,displacementmap_pars_vertex:tE,displacementmap_vertex:eE,emissivemap_fragment:nE,emissivemap_pars_fragment:iE,colorspace_fragment:aE,colorspace_pars_fragment:sE,envmap_fragment:rE,envmap_common_pars_fragment:oE,envmap_pars_fragment:lE,envmap_pars_vertex:cE,envmap_physical_pars_fragment:yE,envmap_vertex:uE,fog_vertex:fE,fog_pars_vertex:hE,fog_fragment:dE,fog_pars_fragment:pE,gradientmap_pars_fragment:mE,lightmap_pars_fragment:gE,lights_lambert_fragment:_E,lights_lambert_pars_fragment:vE,lights_pars_begin:xE,lights_toon_fragment:SE,lights_toon_pars_fragment:ME,lights_phong_fragment:bE,lights_phong_pars_fragment:EE,lights_physical_fragment:TE,lights_physical_pars_fragment:AE,lights_fragment_begin:wE,lights_fragment_maps:RE,lights_fragment_end:CE,logdepthbuf_fragment:DE,logdepthbuf_pars_fragment:UE,logdepthbuf_pars_vertex:NE,logdepthbuf_vertex:LE,map_fragment:OE,map_pars_fragment:PE,map_particle_fragment:zE,map_particle_pars_fragment:BE,metalnessmap_fragment:FE,metalnessmap_pars_fragment:IE,morphinstance_vertex:HE,morphcolor_vertex:kE,morphnormal_vertex:GE,morphtarget_pars_vertex:VE,morphtarget_vertex:jE,normal_fragment_begin:XE,normal_fragment_maps:WE,normal_pars_fragment:qE,normal_pars_vertex:YE,normal_vertex:ZE,normalmap_pars_fragment:KE,clearcoat_normal_fragment_begin:QE,clearcoat_normal_fragment_maps:$E,clearcoat_pars_fragment:JE,iridescence_pars_fragment:t1,opaque_fragment:e1,packing:n1,premultiplied_alpha_fragment:i1,project_vertex:a1,dithering_fragment:s1,dithering_pars_fragment:r1,roughnessmap_fragment:o1,roughnessmap_pars_fragment:l1,shadowmap_pars_fragment:c1,shadowmap_pars_vertex:u1,shadowmap_vertex:f1,shadowmask_pars_fragment:h1,skinbase_vertex:d1,skinning_pars_vertex:p1,skinning_vertex:m1,skinnormal_vertex:g1,specularmap_fragment:_1,specularmap_pars_fragment:v1,tonemapping_fragment:x1,tonemapping_pars_fragment:y1,transmission_fragment:S1,transmission_pars_fragment:M1,uv_pars_fragment:b1,uv_pars_vertex:E1,uv_vertex:T1,worldpos_vertex:A1,background_vert:w1,background_frag:R1,backgroundCube_vert:C1,backgroundCube_frag:D1,cube_vert:U1,cube_frag:N1,depth_vert:L1,depth_frag:O1,distanceRGBA_vert:P1,distanceRGBA_frag:z1,equirect_vert:B1,equirect_frag:F1,linedashed_vert:I1,linedashed_frag:H1,meshbasic_vert:k1,meshbasic_frag:G1,meshlambert_vert:V1,meshlambert_frag:j1,meshmatcap_vert:X1,meshmatcap_frag:W1,meshnormal_vert:q1,meshnormal_frag:Y1,meshphong_vert:Z1,meshphong_frag:K1,meshphysical_vert:Q1,meshphysical_frag:$1,meshtoon_vert:J1,meshtoon_frag:tT,points_vert:eT,points_frag:nT,shadow_vert:iT,shadow_frag:aT,sprite_vert:sT,sprite_frag:rT},Lt={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _e},alphaMap:{value:null},alphaMapTransform:{value:new _e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _e}},envmap:{envMap:{value:null},envMapRotation:{value:new _e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _e},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _e},alphaTest:{value:0},uvTransform:{value:new _e}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _e},alphaMap:{value:null},alphaMapTransform:{value:new _e},alphaTest:{value:0}}},si={basic:{uniforms:$n([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ye.meshbasic_vert,fragmentShader:ye.meshbasic_frag},lambert:{uniforms:$n([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)}}]),vertexShader:ye.meshlambert_vert,fragmentShader:ye.meshlambert_frag},phong:{uniforms:$n([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:ye.meshphong_vert,fragmentShader:ye.meshphong_frag},standard:{uniforms:$n([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag},toon:{uniforms:$n([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new Be(0)}}]),vertexShader:ye.meshtoon_vert,fragmentShader:ye.meshtoon_frag},matcap:{uniforms:$n([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ye.meshmatcap_vert,fragmentShader:ye.meshmatcap_frag},points:{uniforms:$n([Lt.points,Lt.fog]),vertexShader:ye.points_vert,fragmentShader:ye.points_frag},dashed:{uniforms:$n([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ye.linedashed_vert,fragmentShader:ye.linedashed_frag},depth:{uniforms:$n([Lt.common,Lt.displacementmap]),vertexShader:ye.depth_vert,fragmentShader:ye.depth_frag},normal:{uniforms:$n([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ye.meshnormal_vert,fragmentShader:ye.meshnormal_frag},sprite:{uniforms:$n([Lt.sprite,Lt.fog]),vertexShader:ye.sprite_vert,fragmentShader:ye.sprite_frag},background:{uniforms:{uvTransform:{value:new _e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ye.background_vert,fragmentShader:ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _e}},vertexShader:ye.backgroundCube_vert,fragmentShader:ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ye.cube_vert,fragmentShader:ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ye.equirect_vert,fragmentShader:ye.equirect_frag},distanceRGBA:{uniforms:$n([Lt.common,Lt.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ye.distanceRGBA_vert,fragmentShader:ye.distanceRGBA_frag},shadow:{uniforms:$n([Lt.lights,Lt.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:ye.shadow_vert,fragmentShader:ye.shadow_frag}};si.physical={uniforms:$n([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _e},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _e},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _e},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _e},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _e},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _e}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag};const tu={r:0,b:0,g:0},Ks=new Ba,oT=new Ze;function lT(r,t,n,a,o,c,h){const f=new Be(0);let p=c===!0?0:1,m,_,g=null,x=0,M=null;function b(O){let U=O.isScene===!0?O.background:null;return U&&U.isTexture&&(U=(O.backgroundBlurriness>0?n:t).get(U)),U}function T(O){let U=!1;const H=b(O);H===null?y(f,p):H&&H.isColor&&(y(H,1),U=!0);const L=r.xr.getEnvironmentBlendMode();L==="additive"?a.buffers.color.setClear(0,0,0,1,h):L==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,h),(r.autoClear||U)&&(a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(O,U){const H=b(U);H&&(H.isCubeTexture||H.mapping===Cu)?(_===void 0&&(_=new ri(new Al(1,1,1),new Zi({name:"BackgroundCubeMaterial",uniforms:po(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(L,z,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(_)),Ks.copy(U.backgroundRotation),Ks.x*=-1,Ks.y*=-1,Ks.z*=-1,H.isCubeTexture&&H.isRenderTargetTexture===!1&&(Ks.y*=-1,Ks.z*=-1),_.material.uniforms.envMap.value=H,_.material.uniforms.flipEnvMap.value=H.isCubeTexture&&H.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(oT.makeRotationFromEuler(Ks)),_.material.toneMapped=ze.getTransfer(H.colorSpace)!==We,(g!==H||x!==H.version||M!==r.toneMapping)&&(_.material.needsUpdate=!0,g=H,x=H.version,M=r.toneMapping),_.layers.enableAll(),O.unshift(_,_.geometry,_.material,0,0,null)):H&&H.isTexture&&(m===void 0&&(m=new ri(new wl(2,2),new Zi({name:"BackgroundMaterial",uniforms:po(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:bs,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(m)),m.material.uniforms.t2D.value=H,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=ze.getTransfer(H.colorSpace)!==We,H.matrixAutoUpdate===!0&&H.updateMatrix(),m.material.uniforms.uvTransform.value.copy(H.matrix),(g!==H||x!==H.version||M!==r.toneMapping)&&(m.material.needsUpdate=!0,g=H,x=H.version,M=r.toneMapping),m.layers.enableAll(),O.unshift(m,m.geometry,m.material,0,0,null))}function y(O,U){O.getRGB(tu,Q0(r)),a.buffers.color.setClear(tu.r,tu.g,tu.b,U,h)}function F(){_!==void 0&&(_.geometry.dispose(),_.material.dispose()),m!==void 0&&(m.geometry.dispose(),m.material.dispose())}return{getClearColor:function(){return f},setClearColor:function(O,U=1){f.set(O),p=U,y(f,p)},getClearAlpha:function(){return p},setClearAlpha:function(O){p=O,y(f,p)},render:T,addToRenderList:S,dispose:F}}function cT(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},o=x(null);let c=o,h=!1;function f(A,k,lt,$,ot){let ft=!1;const G=g($,lt,k);c!==G&&(c=G,m(c.object)),ft=M(A,$,lt,ot),ft&&b(A,$,lt,ot),ot!==null&&t.update(ot,r.ELEMENT_ARRAY_BUFFER),(ft||h)&&(h=!1,U(A,k,lt,$),ot!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ot).buffer))}function p(){return r.createVertexArray()}function m(A){return r.bindVertexArray(A)}function _(A){return r.deleteVertexArray(A)}function g(A,k,lt){const $=lt.wireframe===!0;let ot=a[A.id];ot===void 0&&(ot={},a[A.id]=ot);let ft=ot[k.id];ft===void 0&&(ft={},ot[k.id]=ft);let G=ft[$];return G===void 0&&(G=x(p()),ft[$]=G),G}function x(A){const k=[],lt=[],$=[];for(let ot=0;ot<n;ot++)k[ot]=0,lt[ot]=0,$[ot]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:lt,attributeDivisors:$,object:A,attributes:{},index:null}}function M(A,k,lt,$){const ot=c.attributes,ft=k.attributes;let G=0;const nt=lt.getAttributes();for(const W in nt)if(nt[W].location>=0){const N=ot[W];let it=ft[W];if(it===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(it=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(it=A.instanceColor)),N===void 0||N.attribute!==it||it&&N.data!==it.data)return!0;G++}return c.attributesNum!==G||c.index!==$}function b(A,k,lt,$){const ot={},ft=k.attributes;let G=0;const nt=lt.getAttributes();for(const W in nt)if(nt[W].location>=0){let N=ft[W];N===void 0&&(W==="instanceMatrix"&&A.instanceMatrix&&(N=A.instanceMatrix),W==="instanceColor"&&A.instanceColor&&(N=A.instanceColor));const it={};it.attribute=N,N&&N.data&&(it.data=N.data),ot[W]=it,G++}c.attributes=ot,c.attributesNum=G,c.index=$}function T(){const A=c.newAttributes;for(let k=0,lt=A.length;k<lt;k++)A[k]=0}function S(A){y(A,0)}function y(A,k){const lt=c.newAttributes,$=c.enabledAttributes,ot=c.attributeDivisors;lt[A]=1,$[A]===0&&(r.enableVertexAttribArray(A),$[A]=1),ot[A]!==k&&(r.vertexAttribDivisor(A,k),ot[A]=k)}function F(){const A=c.newAttributes,k=c.enabledAttributes;for(let lt=0,$=k.length;lt<$;lt++)k[lt]!==A[lt]&&(r.disableVertexAttribArray(lt),k[lt]=0)}function O(A,k,lt,$,ot,ft,G){G===!0?r.vertexAttribIPointer(A,k,lt,ot,ft):r.vertexAttribPointer(A,k,lt,$,ot,ft)}function U(A,k,lt,$){T();const ot=$.attributes,ft=lt.getAttributes(),G=k.defaultAttributeValues;for(const nt in ft){const W=ft[nt];if(W.location>=0){let tt=ot[nt];if(tt===void 0&&(nt==="instanceMatrix"&&A.instanceMatrix&&(tt=A.instanceMatrix),nt==="instanceColor"&&A.instanceColor&&(tt=A.instanceColor)),tt!==void 0){const N=tt.normalized,it=tt.itemSize,Tt=t.get(tt);if(Tt===void 0)continue;const Dt=Tt.buffer,J=Tt.type,mt=Tt.bytesPerElement,bt=J===r.INT||J===r.UNSIGNED_INT||tt.gpuType===yp;if(tt.isInterleavedBufferAttribute){const Rt=tt.data,Ut=Rt.stride,jt=tt.offset;if(Rt.isInstancedInterleavedBuffer){for(let Ht=0;Ht<W.locationSize;Ht++)y(W.location+Ht,Rt.meshPerAttribute);A.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Rt.meshPerAttribute*Rt.count)}else for(let Ht=0;Ht<W.locationSize;Ht++)S(W.location+Ht);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let Ht=0;Ht<W.locationSize;Ht++)O(W.location+Ht,it/W.locationSize,J,N,Ut*mt,(jt+it/W.locationSize*Ht)*mt,bt)}else{if(tt.isInstancedBufferAttribute){for(let Rt=0;Rt<W.locationSize;Rt++)y(W.location+Rt,tt.meshPerAttribute);A.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Rt=0;Rt<W.locationSize;Rt++)S(W.location+Rt);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let Rt=0;Rt<W.locationSize;Rt++)O(W.location+Rt,it/W.locationSize,J,N,it*mt,it/W.locationSize*Rt*mt,bt)}}else if(G!==void 0){const N=G[nt];if(N!==void 0)switch(N.length){case 2:r.vertexAttrib2fv(W.location,N);break;case 3:r.vertexAttrib3fv(W.location,N);break;case 4:r.vertexAttrib4fv(W.location,N);break;default:r.vertexAttrib1fv(W.location,N)}}}}F()}function H(){P();for(const A in a){const k=a[A];for(const lt in k){const $=k[lt];for(const ot in $)_($[ot].object),delete $[ot];delete k[lt]}delete a[A]}}function L(A){if(a[A.id]===void 0)return;const k=a[A.id];for(const lt in k){const $=k[lt];for(const ot in $)_($[ot].object),delete $[ot];delete k[lt]}delete a[A.id]}function z(A){for(const k in a){const lt=a[k];if(lt[A.id]===void 0)continue;const $=lt[A.id];for(const ot in $)_($[ot].object),delete $[ot];delete lt[A.id]}}function P(){w(),h=!0,c!==o&&(c=o,m(c.object))}function w(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:f,reset:P,resetDefaultState:w,dispose:H,releaseStatesOfGeometry:L,releaseStatesOfProgram:z,initAttributes:T,enableAttribute:S,disableUnusedAttributes:F}}function uT(r,t,n){let a;function o(m){a=m}function c(m,_){r.drawArrays(a,m,_),n.update(_,a,1)}function h(m,_,g){g!==0&&(r.drawArraysInstanced(a,m,_,g),n.update(_,a,g))}function f(m,_,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,_,0,g);let M=0;for(let b=0;b<g;b++)M+=_[b];n.update(M,a,1)}function p(m,_,g,x){if(g===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<m.length;b++)h(m[b],_[b],x[b]);else{M.multiDrawArraysInstancedWEBGL(a,m,0,_,0,x,0,g);let b=0;for(let T=0;T<g;T++)b+=_[T]*x[T];n.update(b,a,1)}}this.setMode=o,this.render=c,this.renderInstances=h,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function fT(r,t,n,a){let o;function c(){if(o!==void 0)return o;if(t.has("EXT_texture_filter_anisotropic")===!0){const z=t.get("EXT_texture_filter_anisotropic");o=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function h(z){return!(z!==qi&&a.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(z){const P=z===El&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(z!==za&&a.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Na&&!P)}function p(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const _=p(m);_!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const g=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),F=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),U=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),H=b>0,L=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:f,precision:m,logarithmicDepthBuffer:g,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:b,maxTextureSize:T,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:F,maxVaryings:O,maxFragmentUniforms:U,vertexTextures:H,maxSamples:L}}function hT(r){const t=this;let n=null,a=0,o=!1,c=!1;const h=new _s,f=new _e,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const M=g.length!==0||x||a!==0||o;return o=x,a=g.length,M},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,x){n=_(g,x,0)},this.setState=function(g,x,M){const b=g.clippingPlanes,T=g.clipIntersection,S=g.clipShadows,y=r.get(g);if(!o||b===null||b.length===0||c&&!S)c?_(null):m();else{const F=c?0:a,O=F*4;let U=y.clippingState||null;p.value=U,U=_(b,x,O,M);for(let H=0;H!==O;++H)U[H]=n[H];y.clippingState=U,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=F}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function _(g,x,M,b){const T=g!==null?g.length:0;let S=null;if(T!==0){if(S=p.value,b!==!0||S===null){const y=M+T*4,F=x.matrixWorldInverse;f.getNormalMatrix(F),(S===null||S.length<y)&&(S=new Float32Array(y));for(let O=0,U=M;O!==T;++O,U+=4)h.copy(g[O]).applyMatrix4(F,f),h.normal.toArray(S,U),S[U+3]=h.constant}p.value=S,p.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function dT(r){let t=new WeakMap;function n(h,f){return f===Nd?h.mapping=lo:f===Ld&&(h.mapping=co),h}function a(h){if(h&&h.isTexture){const f=h.mapping;if(f===Nd||f===Ld)if(t.has(h)){const p=t.get(h).texture;return n(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const m=new sb(p.height);return m.fromEquirectangularTexture(r,h),t.set(h,m),h.addEventListener("dispose",o),n(m.texture,h.mapping)}else return null}}return h}function o(h){const f=h.target;f.removeEventListener("dispose",o);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function c(){t=new WeakMap}return{get:a,dispose:c}}const no=4,kv=[.125,.215,.35,.446,.526,.582],tr=20,sd=new Sb,Gv=new Be;let rd=null,od=0,ld=0,cd=!1;const $s=(1+Math.sqrt(5))/2,$r=1/$s,Vv=[new Q(-$s,$r,0),new Q($s,$r,0),new Q(-$r,0,$s),new Q($r,0,$s),new Q(0,$s,-$r),new Q(0,$s,$r),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class jv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,a=.1,o=100){rd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ld=this._renderer.getActiveMipmapLevel(),cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,a,o,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(rd,od,ld),this._renderer.xr.enabled=cd,t.scissorTest=!1,eu(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===lo||t.mapping===co?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rd=this._renderer.getRenderTarget(),od=this._renderer.getActiveCubeFace(),ld=this._renderer.getActiveMipmapLevel(),cd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:la,minFilter:la,generateMipmaps:!1,type:El,format:qi,colorSpace:ho,depthBuffer:!1},o=Xv(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xv(t,n,a);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pT(c)),this._blurMaterial=mT(c,t,n)}return o}_compileMaterial(t){const n=new ri(this._lodPlanes[0],t);this._renderer.compile(n,sd)}_sceneToCubeUV(t,n,a,o){const f=new Ui(90,1,n,a),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,x=_.toneMapping;_.getClearColor(Gv),_.toneMapping=Ms,_.autoClear=!1;const M=new Cp({name:"PMREM.Background",side:oi,depthWrite:!1,depthTest:!1}),b=new ri(new Al,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy(Gv),T=!0);for(let y=0;y<6;y++){const F=y%3;F===0?(f.up.set(0,p[y],0),f.lookAt(m[y],0,0)):F===1?(f.up.set(0,0,p[y]),f.lookAt(0,m[y],0)):(f.up.set(0,p[y],0),f.lookAt(0,0,m[y]));const O=this._cubeSize;eu(o,F*O,y>2?O:0,O,O),_.setRenderTarget(o),T&&_.render(b,f),_.render(t,f)}b.geometry.dispose(),b.material.dispose(),_.toneMapping=x,_.autoClear=g,t.background=S}_textureToCubeUV(t,n){const a=this._renderer,o=t.mapping===lo||t.mapping===co;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=qv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wv());const c=o?this._cubemapMaterial:this._equirectMaterial,h=new ri(this._lodPlanes[0],c),f=c.uniforms;f.envMap.value=t;const p=this._cubeSize;eu(n,0,0,3*p,2*p),a.setRenderTarget(n),a.render(h,sd)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const o=this._lodPlanes.length;for(let c=1;c<o;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),f=Vv[(o-c-1)%Vv.length];this._blur(t,c-1,c,h,f)}n.autoClear=a}_blur(t,n,a,o,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,n,a,o,"latitudinal",c),this._halfBlur(h,t,a,a,o,"longitudinal",c)}_halfBlur(t,n,a,o,c,h,f){const p=this._renderer,m=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,g=new ri(this._lodPlanes[o],m),x=m.uniforms,M=this._sizeLods[a]-1,b=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*tr-1),T=c/b,S=isFinite(c)?1+Math.floor(_*T):tr;S>tr&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${tr}`);const y=[];let F=0;for(let z=0;z<tr;++z){const P=z/T,w=Math.exp(-P*P/2);y.push(w),z===0?F+=w:z<S&&(F+=2*w)}for(let z=0;z<y.length;z++)y[z]=y[z]/F;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=y,x.latitudinal.value=h==="latitudinal",f&&(x.poleAxis.value=f);const{_lodMax:O}=this;x.dTheta.value=b,x.mipInt.value=O-a;const U=this._sizeLods[o],H=3*U*(o>O-no?o-O+no:0),L=4*(this._cubeSize-U);eu(n,H,L,3*U,2*U),p.setRenderTarget(n),p.render(g,sd)}}function pT(r){const t=[],n=[],a=[];let o=r;const c=r-no+1+kv.length;for(let h=0;h<c;h++){const f=Math.pow(2,o);n.push(f);let p=1/f;h>r-no?p=kv[h-r+no-1]:h===0&&(p=0),a.push(p);const m=1/(f-2),_=-m,g=1+m,x=[_,_,g,_,g,g,_,_,g,g,_,g],M=6,b=6,T=3,S=2,y=1,F=new Float32Array(T*b*M),O=new Float32Array(S*b*M),U=new Float32Array(y*b*M);for(let L=0;L<M;L++){const z=L%3*2/3-1,P=L>2?0:-1,w=[z,P,0,z+2/3,P,0,z+2/3,P+1,0,z,P,0,z+2/3,P+1,0,z,P+1,0];F.set(w,T*b*L),O.set(x,S*b*L);const A=[L,L,L,L,L,L];U.set(A,y*b*L)}const H=new Oi;H.setAttribute("position",new vi(F,T)),H.setAttribute("uv",new vi(O,S)),H.setAttribute("faceIndex",new vi(U,y)),t.push(H),o>no&&o--}return{lodPlanes:t,sizeLods:n,sigmas:a}}function Xv(r,t,n){const a=new sr(r,t,n);return a.texture.mapping=Cu,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function eu(r,t,n,a,o){r.viewport.set(t,n,a,o),r.scissor.set(t,n,a,o)}function mT(r,t,n){const a=new Float32Array(tr),o=new Q(0,1,0);return new Zi({name:"SphericalGaussianBlur",defines:{n:tr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Np(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Wv(){return new Zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Np(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function qv(){return new Zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Np(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Np(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function gT(r){let t=new WeakMap,n=null;function a(f){if(f&&f.isTexture){const p=f.mapping,m=p===Nd||p===Ld,_=p===lo||p===co;if(m||_){let g=t.get(f);const x=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==x)return n===null&&(n=new jv(r)),g=m?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const M=f.image;return m&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new jv(r)),g=m?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",c),g.texture):null}}}return f}function o(f){let p=0;const m=6;for(let _=0;_<m;_++)f[_]!==void 0&&p++;return p===m}function c(f){const p=f.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function h(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:h}}function _T(r){const t={};function n(a){if(t[a]!==void 0)return t[a];let o;switch(a){case"WEBGL_depth_texture":o=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":o=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":o=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":o=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:o=r.getExtension(a)}return t[a]=o,o}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const o=n(a);return o===null&&Jr("THREE.WebGLRenderer: "+a+" extension not supported."),o}}}function vT(r,t,n,a){const o={},c=new WeakMap;function h(g){const x=g.target;x.index!==null&&t.remove(x.index);for(const b in x.attributes)t.remove(x.attributes[b]);x.removeEventListener("dispose",h),delete o[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),a.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function f(g,x){return o[x.id]===!0||(x.addEventListener("dispose",h),o[x.id]=!0,n.memory.geometries++),x}function p(g){const x=g.attributes;for(const M in x)t.update(x[M],r.ARRAY_BUFFER)}function m(g){const x=[],M=g.index,b=g.attributes.position;let T=0;if(M!==null){const F=M.array;T=M.version;for(let O=0,U=F.length;O<U;O+=3){const H=F[O+0],L=F[O+1],z=F[O+2];x.push(H,L,L,z,z,H)}}else if(b!==void 0){const F=b.array;T=b.version;for(let O=0,U=F.length/3-1;O<U;O+=3){const H=O+0,L=O+1,z=O+2;x.push(H,L,L,z,z,H)}}else return;const S=new(X0(x)?K0:Z0)(x,1);S.version=T;const y=c.get(g);y&&t.remove(y),c.set(g,S)}function _(g){const x=c.get(g);if(x){const M=g.index;M!==null&&x.version<M.version&&m(g)}else m(g);return c.get(g)}return{get:f,update:p,getWireframeAttribute:_}}function xT(r,t,n){let a;function o(x){a=x}let c,h;function f(x){c=x.type,h=x.bytesPerElement}function p(x,M){r.drawElements(a,M,c,x*h),n.update(M,a,1)}function m(x,M,b){b!==0&&(r.drawElementsInstanced(a,M,c,x*h,b),n.update(M,a,b))}function _(x,M,b){if(b===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,M,0,c,x,0,b);let S=0;for(let y=0;y<b;y++)S+=M[y];n.update(S,a,1)}function g(x,M,b,T){if(b===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let y=0;y<x.length;y++)m(x[y]/h,M[y],T[y]);else{S.multiDrawElementsInstancedWEBGL(a,M,0,c,x,0,T,0,b);let y=0;for(let F=0;F<b;F++)y+=M[F]*T[F];n.update(y,a,1)}}this.setMode=o,this.setIndex=f,this.render=p,this.renderInstances=m,this.renderMultiDraw=_,this.renderMultiDrawInstances=g}function yT(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,h,f){switch(n.calls++,h){case r.TRIANGLES:n.triangles+=f*(c/3);break;case r.LINES:n.lines+=f*(c/2);break;case r.LINE_STRIP:n.lines+=f*(c-1);break;case r.LINE_LOOP:n.lines+=f*c;break;case r.POINTS:n.points+=f*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:o,update:a}}function ST(r,t,n){const a=new WeakMap,o=new tn;function c(h,f,p){const m=h.morphTargetInfluences,_=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,g=_!==void 0?_.length:0;let x=a.get(f);if(x===void 0||x.count!==g){let A=function(){P.dispose(),a.delete(f),f.removeEventListener("dispose",A)};var M=A;x!==void 0&&x.texture.dispose();const b=f.morphAttributes.position!==void 0,T=f.morphAttributes.normal!==void 0,S=f.morphAttributes.color!==void 0,y=f.morphAttributes.position||[],F=f.morphAttributes.normal||[],O=f.morphAttributes.color||[];let U=0;b===!0&&(U=1),T===!0&&(U=2),S===!0&&(U=3);let H=f.attributes.position.count*U,L=1;H>t.maxTextureSize&&(L=Math.ceil(H/t.maxTextureSize),H=t.maxTextureSize);const z=new Float32Array(H*L*4*g),P=new q0(z,H,L,g);P.type=Na,P.needsUpdate=!0;const w=U*4;for(let k=0;k<g;k++){const lt=y[k],$=F[k],ot=O[k],ft=H*L*4*k;for(let G=0;G<lt.count;G++){const nt=G*w;b===!0&&(o.fromBufferAttribute(lt,G),z[ft+nt+0]=o.x,z[ft+nt+1]=o.y,z[ft+nt+2]=o.z,z[ft+nt+3]=0),T===!0&&(o.fromBufferAttribute($,G),z[ft+nt+4]=o.x,z[ft+nt+5]=o.y,z[ft+nt+6]=o.z,z[ft+nt+7]=0),S===!0&&(o.fromBufferAttribute(ot,G),z[ft+nt+8]=o.x,z[ft+nt+9]=o.y,z[ft+nt+10]=o.z,z[ft+nt+11]=ot.itemSize===4?o.w:1)}}x={count:g,texture:P,size:new pe(H,L)},a.set(f,x),f.addEventListener("dispose",A)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",h.morphTexture,n);else{let b=0;for(let S=0;S<m.length;S++)b+=m[S];const T=f.morphTargetsRelative?1:1-b;p.getUniforms().setValue(r,"morphTargetBaseInfluence",T),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function MT(r,t,n,a){let o=new WeakMap;function c(p){const m=a.render.frame,_=p.geometry,g=t.get(p,_);if(o.get(g)!==m&&(t.update(g),o.set(g,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",f)===!1&&p.addEventListener("dispose",f),o.get(p)!==m&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),o.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;o.get(x)!==m&&(x.update(),o.set(x,m))}return g}function h(){o=new WeakMap}function f(p){const m=p.target;m.removeEventListener("dispose",f),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:c,dispose:h}}const ax=new Jn,Yv=new ex(1,1),sx=new q0,rx=new jM,ox=new J0,Zv=[],Kv=[],Qv=new Float32Array(16),$v=new Float32Array(9),Jv=new Float32Array(4);function go(r,t,n){const a=r[0];if(a<=0||a>0)return r;const o=t*n;let c=Zv[o];if(c===void 0&&(c=new Float32Array(o),Zv[o]=c),t!==0){a.toArray(c,0);for(let h=1,f=0;h!==t;++h)f+=n,r[h].toArray(c,f)}return c}function An(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function wn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function Du(r,t){let n=Kv[t];n===void 0&&(n=new Int32Array(t),Kv[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function bT(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function ET(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;r.uniform2fv(this.addr,t),wn(n,t)}}function TT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(An(n,t))return;r.uniform3fv(this.addr,t),wn(n,t)}}function AT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;r.uniform4fv(this.addr,t),wn(n,t)}}function wT(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),wn(n,t)}else{if(An(n,a))return;Jv.set(a),r.uniformMatrix2fv(this.addr,!1,Jv),wn(n,a)}}function RT(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),wn(n,t)}else{if(An(n,a))return;$v.set(a),r.uniformMatrix3fv(this.addr,!1,$v),wn(n,a)}}function CT(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(An(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),wn(n,t)}else{if(An(n,a))return;Qv.set(a),r.uniformMatrix4fv(this.addr,!1,Qv),wn(n,a)}}function DT(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function UT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;r.uniform2iv(this.addr,t),wn(n,t)}}function NT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;r.uniform3iv(this.addr,t),wn(n,t)}}function LT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;r.uniform4iv(this.addr,t),wn(n,t)}}function OT(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function PT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;r.uniform2uiv(this.addr,t),wn(n,t)}}function zT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;r.uniform3uiv(this.addr,t),wn(n,t)}}function BT(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;r.uniform4uiv(this.addr,t),wn(n,t)}}function FT(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o);let c;this.type===r.SAMPLER_2D_SHADOW?(Yv.compareFunction=j0,c=Yv):c=ax,n.setTexture2D(t||c,o)}function IT(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture3D(t||rx,o)}function HT(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTextureCube(t||ox,o)}function kT(r,t,n){const a=this.cache,o=n.allocateTextureUnit();a[0]!==o&&(r.uniform1i(this.addr,o),a[0]=o),n.setTexture2DArray(t||sx,o)}function GT(r){switch(r){case 5126:return bT;case 35664:return ET;case 35665:return TT;case 35666:return AT;case 35674:return wT;case 35675:return RT;case 35676:return CT;case 5124:case 35670:return DT;case 35667:case 35671:return UT;case 35668:case 35672:return NT;case 35669:case 35673:return LT;case 5125:return OT;case 36294:return PT;case 36295:return zT;case 36296:return BT;case 35678:case 36198:case 36298:case 36306:case 35682:return FT;case 35679:case 36299:case 36307:return IT;case 35680:case 36300:case 36308:case 36293:return HT;case 36289:case 36303:case 36311:case 36292:return kT}}function VT(r,t){r.uniform1fv(this.addr,t)}function jT(r,t){const n=go(t,this.size,2);r.uniform2fv(this.addr,n)}function XT(r,t){const n=go(t,this.size,3);r.uniform3fv(this.addr,n)}function WT(r,t){const n=go(t,this.size,4);r.uniform4fv(this.addr,n)}function qT(r,t){const n=go(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function YT(r,t){const n=go(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function ZT(r,t){const n=go(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function KT(r,t){r.uniform1iv(this.addr,t)}function QT(r,t){r.uniform2iv(this.addr,t)}function $T(r,t){r.uniform3iv(this.addr,t)}function JT(r,t){r.uniform4iv(this.addr,t)}function tA(r,t){r.uniform1uiv(this.addr,t)}function eA(r,t){r.uniform2uiv(this.addr,t)}function nA(r,t){r.uniform3uiv(this.addr,t)}function iA(r,t){r.uniform4uiv(this.addr,t)}function aA(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let h=0;h!==o;++h)n.setTexture2D(t[h]||ax,c[h])}function sA(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let h=0;h!==o;++h)n.setTexture3D(t[h]||rx,c[h])}function rA(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let h=0;h!==o;++h)n.setTextureCube(t[h]||ox,c[h])}function oA(r,t,n){const a=this.cache,o=t.length,c=Du(n,o);An(a,c)||(r.uniform1iv(this.addr,c),wn(a,c));for(let h=0;h!==o;++h)n.setTexture2DArray(t[h]||sx,c[h])}function lA(r){switch(r){case 5126:return VT;case 35664:return jT;case 35665:return XT;case 35666:return WT;case 35674:return qT;case 35675:return YT;case 35676:return ZT;case 5124:case 35670:return KT;case 35667:case 35671:return QT;case 35668:case 35672:return $T;case 35669:case 35673:return JT;case 5125:return tA;case 36294:return eA;case 36295:return nA;case 36296:return iA;case 35678:case 36198:case 36298:case 36306:case 35682:return aA;case 35679:case 36299:case 36307:return sA;case 35680:case 36300:case 36308:case 36293:return rA;case 36289:case 36303:case 36311:case 36292:return oA}}class cA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=GT(n.type)}}class uA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=lA(n.type)}}class fA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const o=this.seq;for(let c=0,h=o.length;c!==h;++c){const f=o[c];f.setValue(t,n[f.id],a)}}}const ud=/(\w+)(\])?(\[|\.)?/g;function t0(r,t){r.seq.push(t),r.map[t.id]=t}function hA(r,t,n){const a=r.name,o=a.length;for(ud.lastIndex=0;;){const c=ud.exec(a),h=ud.lastIndex;let f=c[1];const p=c[2]==="]",m=c[3];if(p&&(f=f|0),m===void 0||m==="["&&h+2===o){t0(n,m===void 0?new cA(f,r,t):new uA(f,r,t));break}else{let g=n.map[f];g===void 0&&(g=new fA(f),t0(n,g)),n=g}}}class vu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let o=0;o<a;++o){const c=t.getActiveUniform(n,o),h=t.getUniformLocation(n,c.name);hA(c,h,this)}}setValue(t,n,a,o){const c=this.map[n];c!==void 0&&c.setValue(t,a,o)}setOptional(t,n,a){const o=n[a];o!==void 0&&this.setValue(t,a,o)}static upload(t,n,a,o){for(let c=0,h=n.length;c!==h;++c){const f=n[c],p=a[f.id];p.needsUpdate!==!1&&f.setValue(t,p.value,o)}}static seqWithValue(t,n){const a=[];for(let o=0,c=t.length;o!==c;++o){const h=t[o];h.id in n&&a.push(h)}return a}}function e0(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const dA=37297;let pA=0;function mA(r,t){const n=r.split(`
`),a=[],o=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let h=o;h<c;h++){const f=h+1;a.push(`${f===t?">":" "} ${f}: ${n[h]}`)}return a.join(`
`)}const n0=new _e;function gA(r){ze._getMatrix(n0,ze.workingColorSpace,r);const t=`mat3( ${n0.elements.map(n=>n.toFixed(4))} )`;switch(ze.getTransfer(r)){case Mu:return[t,"LinearTransferOETF"];case We:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function i0(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),o=r.getShaderInfoLog(t).trim();if(a&&o==="")return"";const c=/ERROR: 0:(\d+)/.exec(o);if(c){const h=parseInt(c[1]);return n.toUpperCase()+`

`+o+`

`+mA(r.getShaderSource(t),h)}else return o}function _A(r,t){const n=gA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function vA(r,t){let n;switch(t){case tM:n="Linear";break;case eM:n="Reinhard";break;case nM:n="Cineon";break;case iM:n="ACESFilmic";break;case sM:n="AgX";break;case rM:n="Neutral";break;case aM:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const nu=new Q;function xA(){ze.getLuminanceCoefficients(nu);const r=nu.x.toFixed(4),t=nu.y.toFixed(4),n=nu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function SA(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function MA(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let o=0;o<a;o++){const c=r.getActiveAttrib(t,o),h=c.name;let f=1;c.type===r.FLOAT_MAT2&&(f=2),c.type===r.FLOAT_MAT3&&(f=3),c.type===r.FLOAT_MAT4&&(f=4),n[h]={type:c.type,location:r.getAttribLocation(t,h),locationSize:f}}return n}function gl(r){return r!==""}function a0(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function s0(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bA=/^[ \t]*#include +<([\w\d./]+)>/gm;function hp(r){return r.replace(bA,TA)}const EA=new Map;function TA(r,t){let n=ye[t];if(n===void 0){const a=EA.get(t);if(a!==void 0)n=ye[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("Can not resolve #include <"+t+">")}return hp(n)}const AA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function r0(r){return r.replace(AA,wA)}function wA(r,t,n,a){let o="";for(let c=parseInt(t);c<parseInt(n);c++)o+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function o0(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function RA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===U0?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===LS?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ua&&(t="SHADOWMAP_TYPE_VSM"),t}function CA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case lo:case co:t="ENVMAP_TYPE_CUBE";break;case Cu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function DA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case co:t="ENVMAP_MODE_REFRACTION";break}return t}function UA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case N0:t="ENVMAP_BLENDING_MULTIPLY";break;case $S:t="ENVMAP_BLENDING_MIX";break;case JS:t="ENVMAP_BLENDING_ADD";break}return t}function NA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function LA(r,t,n,a){const o=r.getContext(),c=n.defines;let h=n.vertexShader,f=n.fragmentShader;const p=RA(n),m=CA(n),_=DA(n),g=UA(n),x=NA(n),M=yA(n),b=SA(c),T=o.createProgram();let S,y,F=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(gl).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b].filter(gl).join(`
`),y.length>0&&(y+=`
`)):(S=[o0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),y=[o0(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,b,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+_:"",n.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ms?"#define TONE_MAPPING":"",n.toneMapping!==Ms?ye.tonemapping_pars_fragment:"",n.toneMapping!==Ms?vA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ye.colorspace_pars_fragment,_A("linearToOutputTexel",n.outputColorSpace),xA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gl).join(`
`)),h=hp(h),h=a0(h,n),h=s0(h,n),f=hp(f),f=a0(f,n),f=s0(f,n),h=r0(h),f=r0(f),n.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",n.glslVersion===fv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===fv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const O=F+S+h,U=F+y+f,H=e0(o,o.VERTEX_SHADER,O),L=e0(o,o.FRAGMENT_SHADER,U);o.attachShader(T,H),o.attachShader(T,L),n.index0AttributeName!==void 0?o.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&o.bindAttribLocation(T,0,"position"),o.linkProgram(T);function z(k){if(r.debug.checkShaderErrors){const lt=o.getProgramInfoLog(T).trim(),$=o.getShaderInfoLog(H).trim(),ot=o.getShaderInfoLog(L).trim();let ft=!0,G=!0;if(o.getProgramParameter(T,o.LINK_STATUS)===!1)if(ft=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(o,T,H,L);else{const nt=i0(o,H,"vertex"),W=i0(o,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(T,o.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+lt+`
`+nt+`
`+W)}else lt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",lt):($===""||ot==="")&&(G=!1);G&&(k.diagnostics={runnable:ft,programLog:lt,vertexShader:{log:$,prefix:S},fragmentShader:{log:ot,prefix:y}})}o.deleteShader(H),o.deleteShader(L),P=new vu(o,T),w=MA(o,T)}let P;this.getUniforms=function(){return P===void 0&&z(this),P};let w;this.getAttributes=function(){return w===void 0&&z(this),w};let A=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=o.getProgramParameter(T,dA)),A},this.destroy=function(){a.releaseStatesOfProgram(this),o.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=H,this.fragmentShader=L,this}let OA=0;class PA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,a=t.fragmentShader,o=this._getShaderStage(n),c=this._getShaderStage(a),h=this._getShaderCacheForMaterial(t);return h.has(o)===!1&&(h.add(o),o.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new zA(t),n.set(t,a)),a}}class zA{constructor(t){this.id=OA++,this.code=t,this.usedTimes=0}}function BA(r,t,n,a,o,c,h){const f=new Rp,p=new PA,m=new Set,_=[],g=o.logarithmicDepthBuffer,x=o.vertexTextures;let M=o.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(w){return m.add(w),w===0?"uv":`uv${w}`}function S(w,A,k,lt,$){const ot=lt.fog,ft=$.geometry,G=w.isMeshStandardMaterial?lt.environment:null,nt=(w.isMeshStandardMaterial?n:t).get(w.envMap||G),W=nt&&nt.mapping===Cu?nt.image.height:null,tt=b[w.type];w.precision!==null&&(M=o.getMaxPrecision(w.precision),M!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const N=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,it=N!==void 0?N.length:0;let Tt=0;ft.morphAttributes.position!==void 0&&(Tt=1),ft.morphAttributes.normal!==void 0&&(Tt=2),ft.morphAttributes.color!==void 0&&(Tt=3);let Dt,J,mt,bt;if(tt){const Ue=si[tt];Dt=Ue.vertexShader,J=Ue.fragmentShader}else Dt=w.vertexShader,J=w.fragmentShader,p.update(w),mt=p.getVertexShaderID(w),bt=p.getFragmentShaderID(w);const Rt=r.getRenderTarget(),Ut=r.state.buffers.depth.getReversed(),jt=$.isInstancedMesh===!0,Ht=$.isBatchedMesh===!0,ve=!!w.map,ne=!!w.matcap,Re=!!nt,j=!!w.aoMap,dn=!!w.lightMap,fe=!!w.bumpMap,he=!!w.normalMap,Yt=!!w.displacementMap,Te=!!w.emissiveMap,Wt=!!w.metalnessMap,B=!!w.roughnessMap,R=w.anisotropy>0,at=w.clearcoat>0,gt=w.dispersion>0,St=w.iridescence>0,vt=w.sheen>0,Zt=w.transmission>0,Ct=R&&!!w.anisotropyMap,Gt=at&&!!w.clearcoatMap,xe=at&&!!w.clearcoatNormalMap,wt=at&&!!w.clearcoatRoughnessMap,kt=St&&!!w.iridescenceMap,Jt=St&&!!w.iridescenceThicknessMap,qt=vt&&!!w.sheenColorMap,Ot=vt&&!!w.sheenRoughnessMap,se=!!w.specularMap,te=!!w.specularColorMap,Ie=!!w.specularIntensityMap,K=Zt&&!!w.transmissionMap,Bt=Zt&&!!w.thicknessMap,ht=!!w.gradientMap,xt=!!w.alphaMap,Nt=w.alphaTest>0,Pt=!!w.alphaHash,re=!!w.extensions;let Ke=Ms;w.toneMapped&&(Rt===null||Rt.isXRRenderTarget===!0)&&(Ke=r.toneMapping);const ln={shaderID:tt,shaderType:w.type,shaderName:w.name,vertexShader:Dt,fragmentShader:J,defines:w.defines,customVertexShaderID:mt,customFragmentShaderID:bt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:Ht,batchingColor:Ht&&$._colorsTexture!==null,instancing:jt,instancingColor:jt&&$.instanceColor!==null,instancingMorph:jt&&$.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:Rt===null?r.outputColorSpace:Rt.isXRRenderTarget===!0?Rt.texture.colorSpace:ho,alphaToCoverage:!!w.alphaToCoverage,map:ve,matcap:ne,envMap:Re,envMapMode:Re&&nt.mapping,envMapCubeUVHeight:W,aoMap:j,lightMap:dn,bumpMap:fe,normalMap:he,displacementMap:x&&Yt,emissiveMap:Te,normalMapObjectSpace:he&&w.normalMapType===fM,normalMapTangentSpace:he&&w.normalMapType===uM,metalnessMap:Wt,roughnessMap:B,anisotropy:R,anisotropyMap:Ct,clearcoat:at,clearcoatMap:Gt,clearcoatNormalMap:xe,clearcoatRoughnessMap:wt,dispersion:gt,iridescence:St,iridescenceMap:kt,iridescenceThicknessMap:Jt,sheen:vt,sheenColorMap:qt,sheenRoughnessMap:Ot,specularMap:se,specularColorMap:te,specularIntensityMap:Ie,transmission:Zt,transmissionMap:K,thicknessMap:Bt,gradientMap:ht,opaque:w.transparent===!1&&w.blending===ao&&w.alphaToCoverage===!1,alphaMap:xt,alphaTest:Nt,alphaHash:Pt,combine:w.combine,mapUv:ve&&T(w.map.channel),aoMapUv:j&&T(w.aoMap.channel),lightMapUv:dn&&T(w.lightMap.channel),bumpMapUv:fe&&T(w.bumpMap.channel),normalMapUv:he&&T(w.normalMap.channel),displacementMapUv:Yt&&T(w.displacementMap.channel),emissiveMapUv:Te&&T(w.emissiveMap.channel),metalnessMapUv:Wt&&T(w.metalnessMap.channel),roughnessMapUv:B&&T(w.roughnessMap.channel),anisotropyMapUv:Ct&&T(w.anisotropyMap.channel),clearcoatMapUv:Gt&&T(w.clearcoatMap.channel),clearcoatNormalMapUv:xe&&T(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&T(w.clearcoatRoughnessMap.channel),iridescenceMapUv:kt&&T(w.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&T(w.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&T(w.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&T(w.sheenRoughnessMap.channel),specularMapUv:se&&T(w.specularMap.channel),specularColorMapUv:te&&T(w.specularColorMap.channel),specularIntensityMapUv:Ie&&T(w.specularIntensityMap.channel),transmissionMapUv:K&&T(w.transmissionMap.channel),thicknessMapUv:Bt&&T(w.thicknessMap.channel),alphaMapUv:xt&&T(w.alphaMap.channel),vertexTangents:!!ft.attributes.tangent&&(he||R),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!ft.attributes.uv&&(ve||xt),fog:!!ot,useFog:w.fog===!0,fogExp2:!!ot&&ot.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:Ut,skinning:$.isSkinnedMesh===!0,morphTargets:ft.morphAttributes.position!==void 0,morphNormals:ft.morphAttributes.normal!==void 0,morphColors:ft.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:Tt,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ke,decodeVideoTexture:ve&&w.map.isVideoTexture===!0&&ze.getTransfer(w.map.colorSpace)===We,decodeVideoTextureEmissive:Te&&w.emissiveMap.isVideoTexture===!0&&ze.getTransfer(w.emissiveMap.colorSpace)===We,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===ra,flipSided:w.side===oi,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:re&&w.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&w.extensions.multiDraw===!0||Ht)&&a.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ln.vertexUv1s=m.has(1),ln.vertexUv2s=m.has(2),ln.vertexUv3s=m.has(3),m.clear(),ln}function y(w){const A=[];if(w.shaderID?A.push(w.shaderID):(A.push(w.customVertexShaderID),A.push(w.customFragmentShaderID)),w.defines!==void 0)for(const k in w.defines)A.push(k),A.push(w.defines[k]);return w.isRawShaderMaterial===!1&&(F(A,w),O(A,w),A.push(r.outputColorSpace)),A.push(w.customProgramCacheKey),A.join()}function F(w,A){w.push(A.precision),w.push(A.outputColorSpace),w.push(A.envMapMode),w.push(A.envMapCubeUVHeight),w.push(A.mapUv),w.push(A.alphaMapUv),w.push(A.lightMapUv),w.push(A.aoMapUv),w.push(A.bumpMapUv),w.push(A.normalMapUv),w.push(A.displacementMapUv),w.push(A.emissiveMapUv),w.push(A.metalnessMapUv),w.push(A.roughnessMapUv),w.push(A.anisotropyMapUv),w.push(A.clearcoatMapUv),w.push(A.clearcoatNormalMapUv),w.push(A.clearcoatRoughnessMapUv),w.push(A.iridescenceMapUv),w.push(A.iridescenceThicknessMapUv),w.push(A.sheenColorMapUv),w.push(A.sheenRoughnessMapUv),w.push(A.specularMapUv),w.push(A.specularColorMapUv),w.push(A.specularIntensityMapUv),w.push(A.transmissionMapUv),w.push(A.thicknessMapUv),w.push(A.combine),w.push(A.fogExp2),w.push(A.sizeAttenuation),w.push(A.morphTargetsCount),w.push(A.morphAttributeCount),w.push(A.numDirLights),w.push(A.numPointLights),w.push(A.numSpotLights),w.push(A.numSpotLightMaps),w.push(A.numHemiLights),w.push(A.numRectAreaLights),w.push(A.numDirLightShadows),w.push(A.numPointLightShadows),w.push(A.numSpotLightShadows),w.push(A.numSpotLightShadowsWithMaps),w.push(A.numLightProbes),w.push(A.shadowMapType),w.push(A.toneMapping),w.push(A.numClippingPlanes),w.push(A.numClipIntersection),w.push(A.depthPacking)}function O(w,A){f.disableAll(),A.supportsVertexTextures&&f.enable(0),A.instancing&&f.enable(1),A.instancingColor&&f.enable(2),A.instancingMorph&&f.enable(3),A.matcap&&f.enable(4),A.envMap&&f.enable(5),A.normalMapObjectSpace&&f.enable(6),A.normalMapTangentSpace&&f.enable(7),A.clearcoat&&f.enable(8),A.iridescence&&f.enable(9),A.alphaTest&&f.enable(10),A.vertexColors&&f.enable(11),A.vertexAlphas&&f.enable(12),A.vertexUv1s&&f.enable(13),A.vertexUv2s&&f.enable(14),A.vertexUv3s&&f.enable(15),A.vertexTangents&&f.enable(16),A.anisotropy&&f.enable(17),A.alphaHash&&f.enable(18),A.batching&&f.enable(19),A.dispersion&&f.enable(20),A.batchingColor&&f.enable(21),w.push(f.mask),f.disableAll(),A.fog&&f.enable(0),A.useFog&&f.enable(1),A.flatShading&&f.enable(2),A.logarithmicDepthBuffer&&f.enable(3),A.reverseDepthBuffer&&f.enable(4),A.skinning&&f.enable(5),A.morphTargets&&f.enable(6),A.morphNormals&&f.enable(7),A.morphColors&&f.enable(8),A.premultipliedAlpha&&f.enable(9),A.shadowMapEnabled&&f.enable(10),A.doubleSided&&f.enable(11),A.flipSided&&f.enable(12),A.useDepthPacking&&f.enable(13),A.dithering&&f.enable(14),A.transmission&&f.enable(15),A.sheen&&f.enable(16),A.opaque&&f.enable(17),A.pointsUvs&&f.enable(18),A.decodeVideoTexture&&f.enable(19),A.decodeVideoTextureEmissive&&f.enable(20),A.alphaToCoverage&&f.enable(21),w.push(f.mask)}function U(w){const A=b[w.type];let k;if(A){const lt=si[A];k=Dp.clone(lt.uniforms)}else k=w.uniforms;return k}function H(w,A){let k;for(let lt=0,$=_.length;lt<$;lt++){const ot=_[lt];if(ot.cacheKey===A){k=ot,++k.usedTimes;break}}return k===void 0&&(k=new LA(r,A,w,c),_.push(k)),k}function L(w){if(--w.usedTimes===0){const A=_.indexOf(w);_[A]=_[_.length-1],_.pop(),w.destroy()}}function z(w){p.remove(w)}function P(){p.dispose()}return{getParameters:S,getProgramCacheKey:y,getUniforms:U,acquireProgram:H,releaseProgram:L,releaseShaderCache:z,programs:_,dispose:P}}function FA(){let r=new WeakMap;function t(h){return r.has(h)}function n(h){let f=r.get(h);return f===void 0&&(f={},r.set(h,f)),f}function a(h){r.delete(h)}function o(h,f,p){r.get(h)[f]=p}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:o,dispose:c}}function IA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function l0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function c0(){const r=[];let t=0;const n=[],a=[],o=[];function c(){t=0,n.length=0,a.length=0,o.length=0}function h(g,x,M,b,T,S){let y=r[t];return y===void 0?(y={id:g.id,object:g,geometry:x,material:M,groupOrder:b,renderOrder:g.renderOrder,z:T,group:S},r[t]=y):(y.id=g.id,y.object=g,y.geometry=x,y.material=M,y.groupOrder=b,y.renderOrder=g.renderOrder,y.z=T,y.group=S),t++,y}function f(g,x,M,b,T,S){const y=h(g,x,M,b,T,S);M.transmission>0?a.push(y):M.transparent===!0?o.push(y):n.push(y)}function p(g,x,M,b,T,S){const y=h(g,x,M,b,T,S);M.transmission>0?a.unshift(y):M.transparent===!0?o.unshift(y):n.unshift(y)}function m(g,x){n.length>1&&n.sort(g||IA),a.length>1&&a.sort(x||l0),o.length>1&&o.sort(x||l0)}function _(){for(let g=t,x=r.length;g<x;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:a,transparent:o,init:c,push:f,unshift:p,finish:_,sort:m}}function HA(){let r=new WeakMap;function t(a,o){const c=r.get(a);let h;return c===void 0?(h=new c0,r.set(a,[h])):o>=c.length?(h=new c0,c.push(h)):h=c[o],h}function n(){r=new WeakMap}return{get:t,dispose:n}}function kA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new Q,color:new Be};break;case"SpotLight":n={position:new Q,direction:new Q,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Q,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Q,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return r[t.id]=n,n}}}function GA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let VA=0;function jA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function XA(r){const t=new kA,n=GA(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)a.probe.push(new Q);const o=new Q,c=new Ze,h=new Ze;function f(m){let _=0,g=0,x=0;for(let w=0;w<9;w++)a.probe[w].set(0,0,0);let M=0,b=0,T=0,S=0,y=0,F=0,O=0,U=0,H=0,L=0,z=0;m.sort(jA);for(let w=0,A=m.length;w<A;w++){const k=m[w],lt=k.color,$=k.intensity,ot=k.distance,ft=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)_+=lt.r*$,g+=lt.g*$,x+=lt.b*$;else if(k.isLightProbe){for(let G=0;G<9;G++)a.probe[G].addScaledVector(k.sh.coefficients[G],$);z++}else if(k.isDirectionalLight){const G=t.get(k);if(G.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const nt=k.shadow,W=n.get(k);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,a.directionalShadow[M]=W,a.directionalShadowMap[M]=ft,a.directionalShadowMatrix[M]=k.shadow.matrix,F++}a.directional[M]=G,M++}else if(k.isSpotLight){const G=t.get(k);G.position.setFromMatrixPosition(k.matrixWorld),G.color.copy(lt).multiplyScalar($),G.distance=ot,G.coneCos=Math.cos(k.angle),G.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),G.decay=k.decay,a.spot[T]=G;const nt=k.shadow;if(k.map&&(a.spotLightMap[H]=k.map,H++,nt.updateMatrices(k),k.castShadow&&L++),a.spotLightMatrix[T]=nt.matrix,k.castShadow){const W=n.get(k);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,a.spotShadow[T]=W,a.spotShadowMap[T]=ft,U++}T++}else if(k.isRectAreaLight){const G=t.get(k);G.color.copy(lt).multiplyScalar($),G.halfWidth.set(k.width*.5,0,0),G.halfHeight.set(0,k.height*.5,0),a.rectArea[S]=G,S++}else if(k.isPointLight){const G=t.get(k);if(G.color.copy(k.color).multiplyScalar(k.intensity),G.distance=k.distance,G.decay=k.decay,k.castShadow){const nt=k.shadow,W=n.get(k);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,W.shadowCameraNear=nt.camera.near,W.shadowCameraFar=nt.camera.far,a.pointShadow[b]=W,a.pointShadowMap[b]=ft,a.pointShadowMatrix[b]=k.shadow.matrix,O++}a.point[b]=G,b++}else if(k.isHemisphereLight){const G=t.get(k);G.skyColor.copy(k.color).multiplyScalar($),G.groundColor.copy(k.groundColor).multiplyScalar($),a.hemi[y]=G,y++}}S>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Lt.LTC_FLOAT_1,a.rectAreaLTC2=Lt.LTC_FLOAT_2):(a.rectAreaLTC1=Lt.LTC_HALF_1,a.rectAreaLTC2=Lt.LTC_HALF_2)),a.ambient[0]=_,a.ambient[1]=g,a.ambient[2]=x;const P=a.hash;(P.directionalLength!==M||P.pointLength!==b||P.spotLength!==T||P.rectAreaLength!==S||P.hemiLength!==y||P.numDirectionalShadows!==F||P.numPointShadows!==O||P.numSpotShadows!==U||P.numSpotMaps!==H||P.numLightProbes!==z)&&(a.directional.length=M,a.spot.length=T,a.rectArea.length=S,a.point.length=b,a.hemi.length=y,a.directionalShadow.length=F,a.directionalShadowMap.length=F,a.pointShadow.length=O,a.pointShadowMap.length=O,a.spotShadow.length=U,a.spotShadowMap.length=U,a.directionalShadowMatrix.length=F,a.pointShadowMatrix.length=O,a.spotLightMatrix.length=U+H-L,a.spotLightMap.length=H,a.numSpotLightShadowsWithMaps=L,a.numLightProbes=z,P.directionalLength=M,P.pointLength=b,P.spotLength=T,P.rectAreaLength=S,P.hemiLength=y,P.numDirectionalShadows=F,P.numPointShadows=O,P.numSpotShadows=U,P.numSpotMaps=H,P.numLightProbes=z,a.version=VA++)}function p(m,_){let g=0,x=0,M=0,b=0,T=0;const S=_.matrixWorldInverse;for(let y=0,F=m.length;y<F;y++){const O=m[y];if(O.isDirectionalLight){const U=a.directional[g];U.direction.setFromMatrixPosition(O.matrixWorld),o.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(o),U.direction.transformDirection(S),g++}else if(O.isSpotLight){const U=a.spot[M];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),U.direction.setFromMatrixPosition(O.matrixWorld),o.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(o),U.direction.transformDirection(S),M++}else if(O.isRectAreaLight){const U=a.rectArea[b];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),h.identity(),c.copy(O.matrixWorld),c.premultiply(S),h.extractRotation(c),U.halfWidth.set(O.width*.5,0,0),U.halfHeight.set(0,O.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),b++}else if(O.isPointLight){const U=a.point[x];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(S),x++}else if(O.isHemisphereLight){const U=a.hemi[T];U.direction.setFromMatrixPosition(O.matrixWorld),U.direction.transformDirection(S),T++}}}return{setup:f,setupView:p,state:a}}function u0(r){const t=new XA(r),n=[],a=[];function o(_){m.camera=_,n.length=0,a.length=0}function c(_){n.push(_)}function h(_){a.push(_)}function f(){t.setup(n)}function p(_){t.setupView(n,_)}const m={lightsArray:n,shadowsArray:a,camera:null,lights:t,transmissionRenderTarget:{}};return{init:o,state:m,setupLights:f,setupLightsView:p,pushLight:c,pushShadow:h}}function WA(r){let t=new WeakMap;function n(o,c=0){const h=t.get(o);let f;return h===void 0?(f=new u0(r),t.set(o,[f])):c>=h.length?(f=new u0(r),h.push(f)):f=h[c],f}function a(){t=new WeakMap}return{get:n,dispose:a}}const qA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,YA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ZA(r,t,n){let a=new tx;const o=new pe,c=new pe,h=new tn,f=new mb({depthPacking:cM}),p=new gb,m={},_=n.maxTextureSize,g={[bs]:oi,[oi]:bs,[ra]:ra},x=new Zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:qA,fragmentShader:YA}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const b=new Oi;b.setAttribute("position",new vi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new ri(b,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=U0;let y=this.type;this.render=function(L,z,P){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||L.length===0)return;const w=r.getRenderTarget(),A=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),lt=r.state;lt.setBlending(Ss),lt.buffers.color.setClear(1,1,1,1),lt.buffers.depth.setTest(!0),lt.setScissorTest(!1);const $=y!==Ua&&this.type===Ua,ot=y===Ua&&this.type!==Ua;for(let ft=0,G=L.length;ft<G;ft++){const nt=L[ft],W=nt.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;o.copy(W.mapSize);const tt=W.getFrameExtents();if(o.multiply(tt),c.copy(W.mapSize),(o.x>_||o.y>_)&&(o.x>_&&(c.x=Math.floor(_/tt.x),o.x=c.x*tt.x,W.mapSize.x=c.x),o.y>_&&(c.y=Math.floor(_/tt.y),o.y=c.y*tt.y,W.mapSize.y=c.y)),W.map===null||$===!0||ot===!0){const it=this.type!==Ua?{minFilter:Yi,magFilter:Yi}:{};W.map!==null&&W.map.dispose(),W.map=new sr(o.x,o.y,it),W.map.texture.name=nt.name+".shadowMap",W.camera.updateProjectionMatrix()}r.setRenderTarget(W.map),r.clear();const N=W.getViewportCount();for(let it=0;it<N;it++){const Tt=W.getViewport(it);h.set(c.x*Tt.x,c.y*Tt.y,c.x*Tt.z,c.y*Tt.w),lt.viewport(h),W.updateMatrices(nt,it),a=W.getFrustum(),U(z,P,W.camera,nt,this.type)}W.isPointLightShadow!==!0&&this.type===Ua&&F(W,P),W.needsUpdate=!1}y=this.type,S.needsUpdate=!1,r.setRenderTarget(w,A,k)};function F(L,z){const P=t.update(T);x.defines.VSM_SAMPLES!==L.blurSamples&&(x.defines.VSM_SAMPLES=L.blurSamples,M.defines.VSM_SAMPLES=L.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new sr(o.x,o.y)),x.uniforms.shadow_pass.value=L.map.texture,x.uniforms.resolution.value=L.mapSize,x.uniforms.radius.value=L.radius,r.setRenderTarget(L.mapPass),r.clear(),r.renderBufferDirect(z,null,P,x,T,null),M.uniforms.shadow_pass.value=L.mapPass.texture,M.uniforms.resolution.value=L.mapSize,M.uniforms.radius.value=L.radius,r.setRenderTarget(L.map),r.clear(),r.renderBufferDirect(z,null,P,M,T,null)}function O(L,z,P,w){let A=null;const k=P.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(k!==void 0)A=k;else if(A=P.isPointLight===!0?p:f,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0){const lt=A.uuid,$=z.uuid;let ot=m[lt];ot===void 0&&(ot={},m[lt]=ot);let ft=ot[$];ft===void 0&&(ft=A.clone(),ot[$]=ft,z.addEventListener("dispose",H)),A=ft}if(A.visible=z.visible,A.wireframe=z.wireframe,w===Ua?A.side=z.shadowSide!==null?z.shadowSide:z.side:A.side=z.shadowSide!==null?z.shadowSide:g[z.side],A.alphaMap=z.alphaMap,A.alphaTest=z.alphaTest,A.map=z.map,A.clipShadows=z.clipShadows,A.clippingPlanes=z.clippingPlanes,A.clipIntersection=z.clipIntersection,A.displacementMap=z.displacementMap,A.displacementScale=z.displacementScale,A.displacementBias=z.displacementBias,A.wireframeLinewidth=z.wireframeLinewidth,A.linewidth=z.linewidth,P.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const lt=r.properties.get(A);lt.light=P}return A}function U(L,z,P,w,A){if(L.visible===!1)return;if(L.layers.test(z.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&A===Ua)&&(!L.frustumCulled||a.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,L.matrixWorld);const $=t.update(L),ot=L.material;if(Array.isArray(ot)){const ft=$.groups;for(let G=0,nt=ft.length;G<nt;G++){const W=ft[G],tt=ot[W.materialIndex];if(tt&&tt.visible){const N=O(L,tt,w,A);L.onBeforeShadow(r,L,z,P,$,N,W),r.renderBufferDirect(P,null,$,N,L,W),L.onAfterShadow(r,L,z,P,$,N,W)}}}else if(ot.visible){const ft=O(L,ot,w,A);L.onBeforeShadow(r,L,z,P,$,ft,null),r.renderBufferDirect(P,null,$,ft,L,null),L.onAfterShadow(r,L,z,P,$,ft,null)}}const lt=L.children;for(let $=0,ot=lt.length;$<ot;$++)U(lt[$],z,P,w,A)}function H(L){L.target.removeEventListener("dispose",H);for(const P in m){const w=m[P],A=L.target.uuid;A in w&&(w[A].dispose(),delete w[A])}}}const KA={[Td]:Ad,[wd]:Dd,[Rd]:Ud,[oo]:Cd,[Ad]:Td,[Dd]:wd,[Ud]:Rd,[Cd]:oo};function QA(r,t){function n(){let K=!1;const Bt=new tn;let ht=null;const xt=new tn(0,0,0,0);return{setMask:function(Nt){ht!==Nt&&!K&&(r.colorMask(Nt,Nt,Nt,Nt),ht=Nt)},setLocked:function(Nt){K=Nt},setClear:function(Nt,Pt,re,Ke,ln){ln===!0&&(Nt*=Ke,Pt*=Ke,re*=Ke),Bt.set(Nt,Pt,re,Ke),xt.equals(Bt)===!1&&(r.clearColor(Nt,Pt,re,Ke),xt.copy(Bt))},reset:function(){K=!1,ht=null,xt.set(-1,0,0,0)}}}function a(){let K=!1,Bt=!1,ht=null,xt=null,Nt=null;return{setReversed:function(Pt){if(Bt!==Pt){const re=t.get("EXT_clip_control");Bt?re.clipControlEXT(re.LOWER_LEFT_EXT,re.ZERO_TO_ONE_EXT):re.clipControlEXT(re.LOWER_LEFT_EXT,re.NEGATIVE_ONE_TO_ONE_EXT);const Ke=Nt;Nt=null,this.setClear(Ke)}Bt=Pt},getReversed:function(){return Bt},setTest:function(Pt){Pt?Rt(r.DEPTH_TEST):Ut(r.DEPTH_TEST)},setMask:function(Pt){ht!==Pt&&!K&&(r.depthMask(Pt),ht=Pt)},setFunc:function(Pt){if(Bt&&(Pt=KA[Pt]),xt!==Pt){switch(Pt){case Td:r.depthFunc(r.NEVER);break;case Ad:r.depthFunc(r.ALWAYS);break;case wd:r.depthFunc(r.LESS);break;case oo:r.depthFunc(r.LEQUAL);break;case Rd:r.depthFunc(r.EQUAL);break;case Cd:r.depthFunc(r.GEQUAL);break;case Dd:r.depthFunc(r.GREATER);break;case Ud:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}xt=Pt}},setLocked:function(Pt){K=Pt},setClear:function(Pt){Nt!==Pt&&(Bt&&(Pt=1-Pt),r.clearDepth(Pt),Nt=Pt)},reset:function(){K=!1,ht=null,xt=null,Nt=null,Bt=!1}}}function o(){let K=!1,Bt=null,ht=null,xt=null,Nt=null,Pt=null,re=null,Ke=null,ln=null;return{setTest:function(Ue){K||(Ue?Rt(r.STENCIL_TEST):Ut(r.STENCIL_TEST))},setMask:function(Ue){Bt!==Ue&&!K&&(r.stencilMask(Ue),Bt=Ue)},setFunc:function(Ue,vn,an){(ht!==Ue||xt!==vn||Nt!==an)&&(r.stencilFunc(Ue,vn,an),ht=Ue,xt=vn,Nt=an)},setOp:function(Ue,vn,an){(Pt!==Ue||re!==vn||Ke!==an)&&(r.stencilOp(Ue,vn,an),Pt=Ue,re=vn,Ke=an)},setLocked:function(Ue){K=Ue},setClear:function(Ue){ln!==Ue&&(r.clearStencil(Ue),ln=Ue)},reset:function(){K=!1,Bt=null,ht=null,xt=null,Nt=null,Pt=null,re=null,Ke=null,ln=null}}}const c=new n,h=new a,f=new o,p=new WeakMap,m=new WeakMap;let _={},g={},x=new WeakMap,M=[],b=null,T=!1,S=null,y=null,F=null,O=null,U=null,H=null,L=null,z=new Be(0,0,0),P=0,w=!1,A=null,k=null,lt=null,$=null,ot=null;const ft=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,nt=0;const W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=nt>=1):W.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=nt>=2);let tt=null,N={};const it=r.getParameter(r.SCISSOR_BOX),Tt=r.getParameter(r.VIEWPORT),Dt=new tn().fromArray(it),J=new tn().fromArray(Tt);function mt(K,Bt,ht,xt){const Nt=new Uint8Array(4),Pt=r.createTexture();r.bindTexture(K,Pt),r.texParameteri(K,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(K,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let re=0;re<ht;re++)K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?r.texImage3D(Bt,0,r.RGBA,1,1,xt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(Bt+re,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return Pt}const bt={};bt[r.TEXTURE_2D]=mt(r.TEXTURE_2D,r.TEXTURE_2D,1),bt[r.TEXTURE_CUBE_MAP]=mt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),bt[r.TEXTURE_2D_ARRAY]=mt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),bt[r.TEXTURE_3D]=mt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),f.setClear(0),Rt(r.DEPTH_TEST),h.setFunc(oo),fe(!1),he(rv),Rt(r.CULL_FACE),j(Ss);function Rt(K){_[K]!==!0&&(r.enable(K),_[K]=!0)}function Ut(K){_[K]!==!1&&(r.disable(K),_[K]=!1)}function jt(K,Bt){return g[K]!==Bt?(r.bindFramebuffer(K,Bt),g[K]=Bt,K===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Bt),K===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Bt),!0):!1}function Ht(K,Bt){let ht=M,xt=!1;if(K){ht=x.get(Bt),ht===void 0&&(ht=[],x.set(Bt,ht));const Nt=K.textures;if(ht.length!==Nt.length||ht[0]!==r.COLOR_ATTACHMENT0){for(let Pt=0,re=Nt.length;Pt<re;Pt++)ht[Pt]=r.COLOR_ATTACHMENT0+Pt;ht.length=Nt.length,xt=!0}}else ht[0]!==r.BACK&&(ht[0]=r.BACK,xt=!0);xt&&r.drawBuffers(ht)}function ve(K){return b!==K?(r.useProgram(K),b=K,!0):!1}const ne={[Js]:r.FUNC_ADD,[PS]:r.FUNC_SUBTRACT,[zS]:r.FUNC_REVERSE_SUBTRACT};ne[BS]=r.MIN,ne[FS]=r.MAX;const Re={[IS]:r.ZERO,[HS]:r.ONE,[kS]:r.SRC_COLOR,[bd]:r.SRC_ALPHA,[qS]:r.SRC_ALPHA_SATURATE,[XS]:r.DST_COLOR,[VS]:r.DST_ALPHA,[GS]:r.ONE_MINUS_SRC_COLOR,[Ed]:r.ONE_MINUS_SRC_ALPHA,[WS]:r.ONE_MINUS_DST_COLOR,[jS]:r.ONE_MINUS_DST_ALPHA,[YS]:r.CONSTANT_COLOR,[ZS]:r.ONE_MINUS_CONSTANT_COLOR,[KS]:r.CONSTANT_ALPHA,[QS]:r.ONE_MINUS_CONSTANT_ALPHA};function j(K,Bt,ht,xt,Nt,Pt,re,Ke,ln,Ue){if(K===Ss){T===!0&&(Ut(r.BLEND),T=!1);return}if(T===!1&&(Rt(r.BLEND),T=!0),K!==OS){if(K!==S||Ue!==w){if((y!==Js||U!==Js)&&(r.blendEquation(r.FUNC_ADD),y=Js,U=Js),Ue)switch(K){case ao:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ov:r.blendFunc(r.ONE,r.ONE);break;case lv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case cv:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",K);break}else switch(K){case ao:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ov:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case lv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case cv:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",K);break}F=null,O=null,H=null,L=null,z.set(0,0,0),P=0,S=K,w=Ue}return}Nt=Nt||Bt,Pt=Pt||ht,re=re||xt,(Bt!==y||Nt!==U)&&(r.blendEquationSeparate(ne[Bt],ne[Nt]),y=Bt,U=Nt),(ht!==F||xt!==O||Pt!==H||re!==L)&&(r.blendFuncSeparate(Re[ht],Re[xt],Re[Pt],Re[re]),F=ht,O=xt,H=Pt,L=re),(Ke.equals(z)===!1||ln!==P)&&(r.blendColor(Ke.r,Ke.g,Ke.b,ln),z.copy(Ke),P=ln),S=K,w=!1}function dn(K,Bt){K.side===ra?Ut(r.CULL_FACE):Rt(r.CULL_FACE);let ht=K.side===oi;Bt&&(ht=!ht),fe(ht),K.blending===ao&&K.transparent===!1?j(Ss):j(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),h.setFunc(K.depthFunc),h.setTest(K.depthTest),h.setMask(K.depthWrite),c.setMask(K.colorWrite);const xt=K.stencilWrite;f.setTest(xt),xt&&(f.setMask(K.stencilWriteMask),f.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),f.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),Te(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?Rt(r.SAMPLE_ALPHA_TO_COVERAGE):Ut(r.SAMPLE_ALPHA_TO_COVERAGE)}function fe(K){A!==K&&(K?r.frontFace(r.CW):r.frontFace(r.CCW),A=K)}function he(K){K!==US?(Rt(r.CULL_FACE),K!==k&&(K===rv?r.cullFace(r.BACK):K===NS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ut(r.CULL_FACE),k=K}function Yt(K){K!==lt&&(G&&r.lineWidth(K),lt=K)}function Te(K,Bt,ht){K?(Rt(r.POLYGON_OFFSET_FILL),($!==Bt||ot!==ht)&&(r.polygonOffset(Bt,ht),$=Bt,ot=ht)):Ut(r.POLYGON_OFFSET_FILL)}function Wt(K){K?Rt(r.SCISSOR_TEST):Ut(r.SCISSOR_TEST)}function B(K){K===void 0&&(K=r.TEXTURE0+ft-1),tt!==K&&(r.activeTexture(K),tt=K)}function R(K,Bt,ht){ht===void 0&&(tt===null?ht=r.TEXTURE0+ft-1:ht=tt);let xt=N[ht];xt===void 0&&(xt={type:void 0,texture:void 0},N[ht]=xt),(xt.type!==K||xt.texture!==Bt)&&(tt!==ht&&(r.activeTexture(ht),tt=ht),r.bindTexture(K,Bt||bt[K]),xt.type=K,xt.texture=Bt)}function at(){const K=N[tt];K!==void 0&&K.type!==void 0&&(r.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function gt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function St(){try{r.compressedTexImage3D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function vt(){try{r.texSubImage2D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Zt(){try{r.texSubImage3D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Ct(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Gt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function xe(){try{r.texStorage2D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function wt(){try{r.texStorage3D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function kt(){try{r.texImage2D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Jt(){try{r.texImage3D.apply(r,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function qt(K){Dt.equals(K)===!1&&(r.scissor(K.x,K.y,K.z,K.w),Dt.copy(K))}function Ot(K){J.equals(K)===!1&&(r.viewport(K.x,K.y,K.z,K.w),J.copy(K))}function se(K,Bt){let ht=m.get(Bt);ht===void 0&&(ht=new WeakMap,m.set(Bt,ht));let xt=ht.get(K);xt===void 0&&(xt=r.getUniformBlockIndex(Bt,K.name),ht.set(K,xt))}function te(K,Bt){const xt=m.get(Bt).get(K);p.get(Bt)!==xt&&(r.uniformBlockBinding(Bt,xt,K.__bindingPointIndex),p.set(Bt,xt))}function Ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),h.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},tt=null,N={},g={},x=new WeakMap,M=[],b=null,T=!1,S=null,y=null,F=null,O=null,U=null,H=null,L=null,z=new Be(0,0,0),P=0,w=!1,A=null,k=null,lt=null,$=null,ot=null,Dt.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),c.reset(),h.reset(),f.reset()}return{buffers:{color:c,depth:h,stencil:f},enable:Rt,disable:Ut,bindFramebuffer:jt,drawBuffers:Ht,useProgram:ve,setBlending:j,setMaterial:dn,setFlipSided:fe,setCullFace:he,setLineWidth:Yt,setPolygonOffset:Te,setScissorTest:Wt,activeTexture:B,bindTexture:R,unbindTexture:at,compressedTexImage2D:gt,compressedTexImage3D:St,texImage2D:kt,texImage3D:Jt,updateUBOMapping:se,uniformBlockBinding:te,texStorage2D:xe,texStorage3D:wt,texSubImage2D:vt,texSubImage3D:Zt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:Gt,scissor:qt,viewport:Ot,reset:Ie}}function $A(r,t,n,a,o,c,h){const f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new pe,_=new WeakMap;let g;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(B,R){return M?new OffscreenCanvas(B,R):Ml("canvas")}function T(B,R,at){let gt=1;const St=Wt(B);if((St.width>at||St.height>at)&&(gt=at/Math.max(St.width,St.height)),gt<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const vt=Math.floor(gt*St.width),Zt=Math.floor(gt*St.height);g===void 0&&(g=b(vt,Zt));const Ct=R?b(vt,Zt):g;return Ct.width=vt,Ct.height=Zt,Ct.getContext("2d").drawImage(B,0,0,vt,Zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+St.width+"x"+St.height+") to ("+vt+"x"+Zt+")."),Ct}else return"data"in B&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+St.width+"x"+St.height+")."),B;return B}function S(B){return B.generateMipmaps}function y(B){r.generateMipmap(B)}function F(B){return B.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?r.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function O(B,R,at,gt,St=!1){if(B!==null){if(r[B]!==void 0)return r[B];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let vt=R;if(R===r.RED&&(at===r.FLOAT&&(vt=r.R32F),at===r.HALF_FLOAT&&(vt=r.R16F),at===r.UNSIGNED_BYTE&&(vt=r.R8)),R===r.RED_INTEGER&&(at===r.UNSIGNED_BYTE&&(vt=r.R8UI),at===r.UNSIGNED_SHORT&&(vt=r.R16UI),at===r.UNSIGNED_INT&&(vt=r.R32UI),at===r.BYTE&&(vt=r.R8I),at===r.SHORT&&(vt=r.R16I),at===r.INT&&(vt=r.R32I)),R===r.RG&&(at===r.FLOAT&&(vt=r.RG32F),at===r.HALF_FLOAT&&(vt=r.RG16F),at===r.UNSIGNED_BYTE&&(vt=r.RG8)),R===r.RG_INTEGER&&(at===r.UNSIGNED_BYTE&&(vt=r.RG8UI),at===r.UNSIGNED_SHORT&&(vt=r.RG16UI),at===r.UNSIGNED_INT&&(vt=r.RG32UI),at===r.BYTE&&(vt=r.RG8I),at===r.SHORT&&(vt=r.RG16I),at===r.INT&&(vt=r.RG32I)),R===r.RGB_INTEGER&&(at===r.UNSIGNED_BYTE&&(vt=r.RGB8UI),at===r.UNSIGNED_SHORT&&(vt=r.RGB16UI),at===r.UNSIGNED_INT&&(vt=r.RGB32UI),at===r.BYTE&&(vt=r.RGB8I),at===r.SHORT&&(vt=r.RGB16I),at===r.INT&&(vt=r.RGB32I)),R===r.RGBA_INTEGER&&(at===r.UNSIGNED_BYTE&&(vt=r.RGBA8UI),at===r.UNSIGNED_SHORT&&(vt=r.RGBA16UI),at===r.UNSIGNED_INT&&(vt=r.RGBA32UI),at===r.BYTE&&(vt=r.RGBA8I),at===r.SHORT&&(vt=r.RGBA16I),at===r.INT&&(vt=r.RGBA32I)),R===r.RGB&&at===r.UNSIGNED_INT_5_9_9_9_REV&&(vt=r.RGB9_E5),R===r.RGBA){const Zt=St?Mu:ze.getTransfer(gt);at===r.FLOAT&&(vt=r.RGBA32F),at===r.HALF_FLOAT&&(vt=r.RGBA16F),at===r.UNSIGNED_BYTE&&(vt=Zt===We?r.SRGB8_ALPHA8:r.RGBA8),at===r.UNSIGNED_SHORT_4_4_4_4&&(vt=r.RGBA4),at===r.UNSIGNED_SHORT_5_5_5_1&&(vt=r.RGB5_A1)}return(vt===r.R16F||vt===r.R32F||vt===r.RG16F||vt===r.RG32F||vt===r.RGBA16F||vt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),vt}function U(B,R){let at;return B?R===null||R===ar||R===uo?at=r.DEPTH24_STENCIL8:R===Na?at=r.DEPTH32F_STENCIL8:R===yl&&(at=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===ar||R===uo?at=r.DEPTH_COMPONENT24:R===Na?at=r.DEPTH_COMPONENT32F:R===yl&&(at=r.DEPTH_COMPONENT16),at}function H(B,R){return S(B)===!0||B.isFramebufferTexture&&B.minFilter!==Yi&&B.minFilter!==la?Math.log2(Math.max(R.width,R.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?R.mipmaps.length:1}function L(B){const R=B.target;R.removeEventListener("dispose",L),P(R),R.isVideoTexture&&_.delete(R)}function z(B){const R=B.target;R.removeEventListener("dispose",z),A(R)}function P(B){const R=a.get(B);if(R.__webglInit===void 0)return;const at=B.source,gt=x.get(at);if(gt){const St=gt[R.__cacheKey];St.usedTimes--,St.usedTimes===0&&w(B),Object.keys(gt).length===0&&x.delete(at)}a.remove(B)}function w(B){const R=a.get(B);r.deleteTexture(R.__webglTexture);const at=B.source,gt=x.get(at);delete gt[R.__cacheKey],h.memory.textures--}function A(B){const R=a.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),a.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let gt=0;gt<6;gt++){if(Array.isArray(R.__webglFramebuffer[gt]))for(let St=0;St<R.__webglFramebuffer[gt].length;St++)r.deleteFramebuffer(R.__webglFramebuffer[gt][St]);else r.deleteFramebuffer(R.__webglFramebuffer[gt]);R.__webglDepthbuffer&&r.deleteRenderbuffer(R.__webglDepthbuffer[gt])}else{if(Array.isArray(R.__webglFramebuffer))for(let gt=0;gt<R.__webglFramebuffer.length;gt++)r.deleteFramebuffer(R.__webglFramebuffer[gt]);else r.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&r.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&r.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let gt=0;gt<R.__webglColorRenderbuffer.length;gt++)R.__webglColorRenderbuffer[gt]&&r.deleteRenderbuffer(R.__webglColorRenderbuffer[gt]);R.__webglDepthRenderbuffer&&r.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const at=B.textures;for(let gt=0,St=at.length;gt<St;gt++){const vt=a.get(at[gt]);vt.__webglTexture&&(r.deleteTexture(vt.__webglTexture),h.memory.textures--),a.remove(at[gt])}a.remove(B)}let k=0;function lt(){k=0}function $(){const B=k;return B>=o.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+o.maxTextures),k+=1,B}function ot(B){const R=[];return R.push(B.wrapS),R.push(B.wrapT),R.push(B.wrapR||0),R.push(B.magFilter),R.push(B.minFilter),R.push(B.anisotropy),R.push(B.internalFormat),R.push(B.format),R.push(B.type),R.push(B.generateMipmaps),R.push(B.premultiplyAlpha),R.push(B.flipY),R.push(B.unpackAlignment),R.push(B.colorSpace),R.join()}function ft(B,R){const at=a.get(B);if(B.isVideoTexture&&Yt(B),B.isRenderTargetTexture===!1&&B.version>0&&at.__version!==B.version){const gt=B.image;if(gt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(at,B,R);return}}n.bindTexture(r.TEXTURE_2D,at.__webglTexture,r.TEXTURE0+R)}function G(B,R){const at=a.get(B);if(B.version>0&&at.__version!==B.version){J(at,B,R);return}n.bindTexture(r.TEXTURE_2D_ARRAY,at.__webglTexture,r.TEXTURE0+R)}function nt(B,R){const at=a.get(B);if(B.version>0&&at.__version!==B.version){J(at,B,R);return}n.bindTexture(r.TEXTURE_3D,at.__webglTexture,r.TEXTURE0+R)}function W(B,R){const at=a.get(B);if(B.version>0&&at.__version!==B.version){mt(at,B,R);return}n.bindTexture(r.TEXTURE_CUBE_MAP,at.__webglTexture,r.TEXTURE0+R)}const tt={[Od]:r.REPEAT,[er]:r.CLAMP_TO_EDGE,[Pd]:r.MIRRORED_REPEAT},N={[Yi]:r.NEAREST,[oM]:r.NEAREST_MIPMAP_NEAREST,[Uc]:r.NEAREST_MIPMAP_LINEAR,[la]:r.LINEAR,[zh]:r.LINEAR_MIPMAP_NEAREST,[nr]:r.LINEAR_MIPMAP_LINEAR},it={[hM]:r.NEVER,[vM]:r.ALWAYS,[dM]:r.LESS,[j0]:r.LEQUAL,[pM]:r.EQUAL,[_M]:r.GEQUAL,[mM]:r.GREATER,[gM]:r.NOTEQUAL};function Tt(B,R){if(R.type===Na&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===la||R.magFilter===zh||R.magFilter===Uc||R.magFilter===nr||R.minFilter===la||R.minFilter===zh||R.minFilter===Uc||R.minFilter===nr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(B,r.TEXTURE_WRAP_S,tt[R.wrapS]),r.texParameteri(B,r.TEXTURE_WRAP_T,tt[R.wrapT]),(B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY)&&r.texParameteri(B,r.TEXTURE_WRAP_R,tt[R.wrapR]),r.texParameteri(B,r.TEXTURE_MAG_FILTER,N[R.magFilter]),r.texParameteri(B,r.TEXTURE_MIN_FILTER,N[R.minFilter]),R.compareFunction&&(r.texParameteri(B,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(B,r.TEXTURE_COMPARE_FUNC,it[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Yi||R.minFilter!==Uc&&R.minFilter!==nr||R.type===Na&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||a.get(R).__currentAnisotropy){const at=t.get("EXT_texture_filter_anisotropic");r.texParameterf(B,at.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,o.getMaxAnisotropy())),a.get(R).__currentAnisotropy=R.anisotropy}}}function Dt(B,R){let at=!1;B.__webglInit===void 0&&(B.__webglInit=!0,R.addEventListener("dispose",L));const gt=R.source;let St=x.get(gt);St===void 0&&(St={},x.set(gt,St));const vt=ot(R);if(vt!==B.__cacheKey){St[vt]===void 0&&(St[vt]={texture:r.createTexture(),usedTimes:0},h.memory.textures++,at=!0),St[vt].usedTimes++;const Zt=St[B.__cacheKey];Zt!==void 0&&(St[B.__cacheKey].usedTimes--,Zt.usedTimes===0&&w(R)),B.__cacheKey=vt,B.__webglTexture=St[vt].texture}return at}function J(B,R,at){let gt=r.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(gt=r.TEXTURE_2D_ARRAY),R.isData3DTexture&&(gt=r.TEXTURE_3D);const St=Dt(B,R),vt=R.source;n.bindTexture(gt,B.__webglTexture,r.TEXTURE0+at);const Zt=a.get(vt);if(vt.version!==Zt.__version||St===!0){n.activeTexture(r.TEXTURE0+at);const Ct=ze.getPrimaries(ze.workingColorSpace),Gt=R.colorSpace===vs?null:ze.getPrimaries(R.colorSpace),xe=R.colorSpace===vs||Ct===Gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let wt=T(R.image,!1,o.maxTextureSize);wt=Te(R,wt);const kt=c.convert(R.format,R.colorSpace),Jt=c.convert(R.type);let qt=O(R.internalFormat,kt,Jt,R.colorSpace,R.isVideoTexture);Tt(gt,R);let Ot;const se=R.mipmaps,te=R.isVideoTexture!==!0,Ie=Zt.__version===void 0||St===!0,K=vt.dataReady,Bt=H(R,wt);if(R.isDepthTexture)qt=U(R.format===fo,R.type),Ie&&(te?n.texStorage2D(r.TEXTURE_2D,1,qt,wt.width,wt.height):n.texImage2D(r.TEXTURE_2D,0,qt,wt.width,wt.height,0,kt,Jt,null));else if(R.isDataTexture)if(se.length>0){te&&Ie&&n.texStorage2D(r.TEXTURE_2D,Bt,qt,se[0].width,se[0].height);for(let ht=0,xt=se.length;ht<xt;ht++)Ot=se[ht],te?K&&n.texSubImage2D(r.TEXTURE_2D,ht,0,0,Ot.width,Ot.height,kt,Jt,Ot.data):n.texImage2D(r.TEXTURE_2D,ht,qt,Ot.width,Ot.height,0,kt,Jt,Ot.data);R.generateMipmaps=!1}else te?(Ie&&n.texStorage2D(r.TEXTURE_2D,Bt,qt,wt.width,wt.height),K&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,wt.width,wt.height,kt,Jt,wt.data)):n.texImage2D(r.TEXTURE_2D,0,qt,wt.width,wt.height,0,kt,Jt,wt.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){te&&Ie&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Bt,qt,se[0].width,se[0].height,wt.depth);for(let ht=0,xt=se.length;ht<xt;ht++)if(Ot=se[ht],R.format!==qi)if(kt!==null)if(te){if(K)if(R.layerUpdates.size>0){const Nt=Hv(Ot.width,Ot.height,R.format,R.type);for(const Pt of R.layerUpdates){const re=Ot.data.subarray(Pt*Nt/Ot.data.BYTES_PER_ELEMENT,(Pt+1)*Nt/Ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ht,0,0,Pt,Ot.width,Ot.height,1,kt,re)}R.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ht,0,0,0,Ot.width,Ot.height,wt.depth,kt,Ot.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ht,qt,Ot.width,Ot.height,wt.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?K&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ht,0,0,0,Ot.width,Ot.height,wt.depth,kt,Jt,Ot.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ht,qt,Ot.width,Ot.height,wt.depth,0,kt,Jt,Ot.data)}else{te&&Ie&&n.texStorage2D(r.TEXTURE_2D,Bt,qt,se[0].width,se[0].height);for(let ht=0,xt=se.length;ht<xt;ht++)Ot=se[ht],R.format!==qi?kt!==null?te?K&&n.compressedTexSubImage2D(r.TEXTURE_2D,ht,0,0,Ot.width,Ot.height,kt,Ot.data):n.compressedTexImage2D(r.TEXTURE_2D,ht,qt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?K&&n.texSubImage2D(r.TEXTURE_2D,ht,0,0,Ot.width,Ot.height,kt,Jt,Ot.data):n.texImage2D(r.TEXTURE_2D,ht,qt,Ot.width,Ot.height,0,kt,Jt,Ot.data)}else if(R.isDataArrayTexture)if(te){if(Ie&&n.texStorage3D(r.TEXTURE_2D_ARRAY,Bt,qt,wt.width,wt.height,wt.depth),K)if(R.layerUpdates.size>0){const ht=Hv(wt.width,wt.height,R.format,R.type);for(const xt of R.layerUpdates){const Nt=wt.data.subarray(xt*ht/wt.data.BYTES_PER_ELEMENT,(xt+1)*ht/wt.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,xt,wt.width,wt.height,1,kt,Jt,Nt)}R.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,wt.width,wt.height,wt.depth,kt,Jt,wt.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,qt,wt.width,wt.height,wt.depth,0,kt,Jt,wt.data);else if(R.isData3DTexture)te?(Ie&&n.texStorage3D(r.TEXTURE_3D,Bt,qt,wt.width,wt.height,wt.depth),K&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,wt.width,wt.height,wt.depth,kt,Jt,wt.data)):n.texImage3D(r.TEXTURE_3D,0,qt,wt.width,wt.height,wt.depth,0,kt,Jt,wt.data);else if(R.isFramebufferTexture){if(Ie)if(te)n.texStorage2D(r.TEXTURE_2D,Bt,qt,wt.width,wt.height);else{let ht=wt.width,xt=wt.height;for(let Nt=0;Nt<Bt;Nt++)n.texImage2D(r.TEXTURE_2D,Nt,qt,ht,xt,0,kt,Jt,null),ht>>=1,xt>>=1}}else if(se.length>0){if(te&&Ie){const ht=Wt(se[0]);n.texStorage2D(r.TEXTURE_2D,Bt,qt,ht.width,ht.height)}for(let ht=0,xt=se.length;ht<xt;ht++)Ot=se[ht],te?K&&n.texSubImage2D(r.TEXTURE_2D,ht,0,0,kt,Jt,Ot):n.texImage2D(r.TEXTURE_2D,ht,qt,kt,Jt,Ot);R.generateMipmaps=!1}else if(te){if(Ie){const ht=Wt(wt);n.texStorage2D(r.TEXTURE_2D,Bt,qt,ht.width,ht.height)}K&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,kt,Jt,wt)}else n.texImage2D(r.TEXTURE_2D,0,qt,kt,Jt,wt);S(R)&&y(gt),Zt.__version=vt.version,R.onUpdate&&R.onUpdate(R)}B.__version=R.version}function mt(B,R,at){if(R.image.length!==6)return;const gt=Dt(B,R),St=R.source;n.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+at);const vt=a.get(St);if(St.version!==vt.__version||gt===!0){n.activeTexture(r.TEXTURE0+at);const Zt=ze.getPrimaries(ze.workingColorSpace),Ct=R.colorSpace===vs?null:ze.getPrimaries(R.colorSpace),Gt=R.colorSpace===vs||Zt===Ct?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);const xe=R.isCompressedTexture||R.image[0].isCompressedTexture,wt=R.image[0]&&R.image[0].isDataTexture,kt=[];for(let xt=0;xt<6;xt++)!xe&&!wt?kt[xt]=T(R.image[xt],!0,o.maxCubemapSize):kt[xt]=wt?R.image[xt].image:R.image[xt],kt[xt]=Te(R,kt[xt]);const Jt=kt[0],qt=c.convert(R.format,R.colorSpace),Ot=c.convert(R.type),se=O(R.internalFormat,qt,Ot,R.colorSpace),te=R.isVideoTexture!==!0,Ie=vt.__version===void 0||gt===!0,K=St.dataReady;let Bt=H(R,Jt);Tt(r.TEXTURE_CUBE_MAP,R);let ht;if(xe){te&&Ie&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Bt,se,Jt.width,Jt.height);for(let xt=0;xt<6;xt++){ht=kt[xt].mipmaps;for(let Nt=0;Nt<ht.length;Nt++){const Pt=ht[Nt];R.format!==qi?qt!==null?te?K&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt,0,0,Pt.width,Pt.height,qt,Pt.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt,se,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?K&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt,0,0,Pt.width,Pt.height,qt,Ot,Pt.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt,se,Pt.width,Pt.height,0,qt,Ot,Pt.data)}}}else{if(ht=R.mipmaps,te&&Ie){ht.length>0&&Bt++;const xt=Wt(kt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,Bt,se,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(wt){te?K&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,kt[xt].width,kt[xt].height,qt,Ot,kt[xt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,se,kt[xt].width,kt[xt].height,0,qt,Ot,kt[xt].data);for(let Nt=0;Nt<ht.length;Nt++){const re=ht[Nt].image[xt].image;te?K&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt+1,0,0,re.width,re.height,qt,Ot,re.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt+1,se,re.width,re.height,0,qt,Ot,re.data)}}else{te?K&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,qt,Ot,kt[xt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,se,qt,Ot,kt[xt]);for(let Nt=0;Nt<ht.length;Nt++){const Pt=ht[Nt];te?K&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt+1,0,0,qt,Ot,Pt.image[xt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt+1,se,qt,Ot,Pt.image[xt])}}}S(R)&&y(r.TEXTURE_CUBE_MAP),vt.__version=St.version,R.onUpdate&&R.onUpdate(R)}B.__version=R.version}function bt(B,R,at,gt,St,vt){const Zt=c.convert(at.format,at.colorSpace),Ct=c.convert(at.type),Gt=O(at.internalFormat,Zt,Ct,at.colorSpace),xe=a.get(R),wt=a.get(at);if(wt.__renderTarget=R,!xe.__hasExternalTextures){const kt=Math.max(1,R.width>>vt),Jt=Math.max(1,R.height>>vt);St===r.TEXTURE_3D||St===r.TEXTURE_2D_ARRAY?n.texImage3D(St,vt,Gt,kt,Jt,R.depth,0,Zt,Ct,null):n.texImage2D(St,vt,Gt,kt,Jt,0,Zt,Ct,null)}n.bindFramebuffer(r.FRAMEBUFFER,B),he(R)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,gt,St,wt.__webglTexture,0,fe(R)):(St===r.TEXTURE_2D||St>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&St<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,gt,St,wt.__webglTexture,vt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function Rt(B,R,at){if(r.bindRenderbuffer(r.RENDERBUFFER,B),R.depthBuffer){const gt=R.depthTexture,St=gt&&gt.isDepthTexture?gt.type:null,vt=U(R.stencilBuffer,St),Zt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ct=fe(R);he(R)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ct,vt,R.width,R.height):at?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct,vt,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,vt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Zt,r.RENDERBUFFER,B)}else{const gt=R.textures;for(let St=0;St<gt.length;St++){const vt=gt[St],Zt=c.convert(vt.format,vt.colorSpace),Ct=c.convert(vt.type),Gt=O(vt.internalFormat,Zt,Ct,vt.colorSpace),xe=fe(R);at&&he(R)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,Gt,R.width,R.height):he(R)?f.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,Gt,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,Gt,R.width,R.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ut(B,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,B),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const gt=a.get(R.depthTexture);gt.__renderTarget=R,(!gt.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),ft(R.depthTexture,0);const St=gt.__webglTexture,vt=fe(R);if(R.depthTexture.format===so)he(R)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,St,0,vt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,St,0);else if(R.depthTexture.format===fo)he(R)?f.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,St,0,vt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,St,0);else throw new Error("Unknown depthTexture format")}function jt(B){const R=a.get(B),at=B.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==B.depthTexture){const gt=B.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),gt){const St=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,gt.removeEventListener("dispose",St)};gt.addEventListener("dispose",St),R.__depthDisposeCallback=St}R.__boundDepthTexture=gt}if(B.depthTexture&&!R.__autoAllocateDepthBuffer){if(at)throw new Error("target.depthTexture not supported in Cube render targets");Ut(R.__webglFramebuffer,B)}else if(at){R.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)if(n.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer[gt]),R.__webglDepthbuffer[gt]===void 0)R.__webglDepthbuffer[gt]=r.createRenderbuffer(),Rt(R.__webglDepthbuffer[gt],B,!1);else{const St=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,vt=R.__webglDepthbuffer[gt];r.bindRenderbuffer(r.RENDERBUFFER,vt),r.framebufferRenderbuffer(r.FRAMEBUFFER,St,r.RENDERBUFFER,vt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=r.createRenderbuffer(),Rt(R.__webglDepthbuffer,B,!1);else{const gt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,St=R.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,St),r.framebufferRenderbuffer(r.FRAMEBUFFER,gt,r.RENDERBUFFER,St)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ht(B,R,at){const gt=a.get(B);R!==void 0&&bt(gt.__webglFramebuffer,B,B.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),at!==void 0&&jt(B)}function ve(B){const R=B.texture,at=a.get(B),gt=a.get(R);B.addEventListener("dispose",z);const St=B.textures,vt=B.isWebGLCubeRenderTarget===!0,Zt=St.length>1;if(Zt||(gt.__webglTexture===void 0&&(gt.__webglTexture=r.createTexture()),gt.__version=R.version,h.memory.textures++),vt){at.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(R.mipmaps&&R.mipmaps.length>0){at.__webglFramebuffer[Ct]=[];for(let Gt=0;Gt<R.mipmaps.length;Gt++)at.__webglFramebuffer[Ct][Gt]=r.createFramebuffer()}else at.__webglFramebuffer[Ct]=r.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){at.__webglFramebuffer=[];for(let Ct=0;Ct<R.mipmaps.length;Ct++)at.__webglFramebuffer[Ct]=r.createFramebuffer()}else at.__webglFramebuffer=r.createFramebuffer();if(Zt)for(let Ct=0,Gt=St.length;Ct<Gt;Ct++){const xe=a.get(St[Ct]);xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture(),h.memory.textures++)}if(B.samples>0&&he(B)===!1){at.__webglMultisampledFramebuffer=r.createFramebuffer(),at.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,at.__webglMultisampledFramebuffer);for(let Ct=0;Ct<St.length;Ct++){const Gt=St[Ct];at.__webglColorRenderbuffer[Ct]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,at.__webglColorRenderbuffer[Ct]);const xe=c.convert(Gt.format,Gt.colorSpace),wt=c.convert(Gt.type),kt=O(Gt.internalFormat,xe,wt,Gt.colorSpace,B.isXRRenderTarget===!0),Jt=fe(B);r.renderbufferStorageMultisample(r.RENDERBUFFER,Jt,kt,B.width,B.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ct,r.RENDERBUFFER,at.__webglColorRenderbuffer[Ct])}r.bindRenderbuffer(r.RENDERBUFFER,null),B.depthBuffer&&(at.__webglDepthRenderbuffer=r.createRenderbuffer(),Rt(at.__webglDepthRenderbuffer,B,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(vt){n.bindTexture(r.TEXTURE_CUBE_MAP,gt.__webglTexture),Tt(r.TEXTURE_CUBE_MAP,R);for(let Ct=0;Ct<6;Ct++)if(R.mipmaps&&R.mipmaps.length>0)for(let Gt=0;Gt<R.mipmaps.length;Gt++)bt(at.__webglFramebuffer[Ct][Gt],B,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,Gt);else bt(at.__webglFramebuffer[Ct],B,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);S(R)&&y(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Zt){for(let Ct=0,Gt=St.length;Ct<Gt;Ct++){const xe=St[Ct],wt=a.get(xe);n.bindTexture(r.TEXTURE_2D,wt.__webglTexture),Tt(r.TEXTURE_2D,xe),bt(at.__webglFramebuffer,B,xe,r.COLOR_ATTACHMENT0+Ct,r.TEXTURE_2D,0),S(xe)&&y(r.TEXTURE_2D)}n.unbindTexture()}else{let Ct=r.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(Ct=B.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Ct,gt.__webglTexture),Tt(Ct,R),R.mipmaps&&R.mipmaps.length>0)for(let Gt=0;Gt<R.mipmaps.length;Gt++)bt(at.__webglFramebuffer[Gt],B,R,r.COLOR_ATTACHMENT0,Ct,Gt);else bt(at.__webglFramebuffer,B,R,r.COLOR_ATTACHMENT0,Ct,0);S(R)&&y(Ct),n.unbindTexture()}B.depthBuffer&&jt(B)}function ne(B){const R=B.textures;for(let at=0,gt=R.length;at<gt;at++){const St=R[at];if(S(St)){const vt=F(B),Zt=a.get(St).__webglTexture;n.bindTexture(vt,Zt),y(vt),n.unbindTexture()}}}const Re=[],j=[];function dn(B){if(B.samples>0){if(he(B)===!1){const R=B.textures,at=B.width,gt=B.height;let St=r.COLOR_BUFFER_BIT;const vt=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Zt=a.get(B),Ct=R.length>1;if(Ct)for(let Gt=0;Gt<R.length;Gt++)n.bindFramebuffer(r.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Gt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,Zt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Gt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Zt.__webglFramebuffer);for(let Gt=0;Gt<R.length;Gt++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(St|=r.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(St|=r.STENCIL_BUFFER_BIT)),Ct){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Zt.__webglColorRenderbuffer[Gt]);const xe=a.get(R[Gt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,xe,0)}r.blitFramebuffer(0,0,at,gt,0,0,at,gt,St,r.NEAREST),p===!0&&(Re.length=0,j.length=0,Re.push(r.COLOR_ATTACHMENT0+Gt),B.depthBuffer&&B.resolveDepthBuffer===!1&&(Re.push(vt),j.push(vt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,j)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Re))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Ct)for(let Gt=0;Gt<R.length;Gt++){n.bindFramebuffer(r.FRAMEBUFFER,Zt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Gt,r.RENDERBUFFER,Zt.__webglColorRenderbuffer[Gt]);const xe=a.get(R[Gt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,Zt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Gt,r.TEXTURE_2D,xe,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,Zt.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.resolveDepthBuffer===!1&&p){const R=B.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[R])}}}function fe(B){return Math.min(o.maxSamples,B.samples)}function he(B){const R=a.get(B);return B.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Yt(B){const R=h.render.frame;_.get(B)!==R&&(_.set(B,R),B.update())}function Te(B,R){const at=B.colorSpace,gt=B.format,St=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||at!==ho&&at!==vs&&(ze.getTransfer(at)===We?(gt!==qi||St!==za)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",at)),R}function Wt(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(m.width=B.naturalWidth||B.width,m.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(m.width=B.displayWidth,m.height=B.displayHeight):(m.width=B.width,m.height=B.height),m}this.allocateTextureUnit=$,this.resetTextureUnits=lt,this.setTexture2D=ft,this.setTexture2DArray=G,this.setTexture3D=nt,this.setTextureCube=W,this.rebindTextures=Ht,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=dn,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=he}function JA(r,t){function n(a,o=vs){let c;const h=ze.getTransfer(o);if(a===za)return r.UNSIGNED_BYTE;if(a===Sp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===Mp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===z0)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===O0)return r.BYTE;if(a===P0)return r.SHORT;if(a===yl)return r.UNSIGNED_SHORT;if(a===yp)return r.INT;if(a===ar)return r.UNSIGNED_INT;if(a===Na)return r.FLOAT;if(a===El)return r.HALF_FLOAT;if(a===B0)return r.ALPHA;if(a===F0)return r.RGB;if(a===qi)return r.RGBA;if(a===I0)return r.LUMINANCE;if(a===H0)return r.LUMINANCE_ALPHA;if(a===so)return r.DEPTH_COMPONENT;if(a===fo)return r.DEPTH_STENCIL;if(a===k0)return r.RED;if(a===bp)return r.RED_INTEGER;if(a===G0)return r.RG;if(a===Ep)return r.RG_INTEGER;if(a===Tp)return r.RGBA_INTEGER;if(a===du||a===pu||a===mu||a===gu)if(h===We)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===du)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===pu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===mu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===gu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===du)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===pu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===mu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===gu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===zd||a===Bd||a===Fd||a===Id)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===zd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Bd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Fd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Id)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Hd||a===kd||a===Gd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Hd||a===kd)return h===We?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===Gd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Vd||a===jd||a===Xd||a===Wd||a===qd||a===Yd||a===Zd||a===Kd||a===Qd||a===$d||a===Jd||a===tp||a===ep||a===np)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Vd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===jd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Xd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===Wd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===qd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Yd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Zd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Kd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Qd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===$d)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===Jd)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===tp)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===ep)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===np)return h===We?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===_u||a===ip||a===ap)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===_u)return h===We?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===ip)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===ap)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===V0||a===sp||a===rp||a===op)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===_u)return c.COMPRESSED_RED_RGTC1_EXT;if(a===sp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===rp)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===op)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===uo?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}const tw={type:"move"};class fd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new eo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new eo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new eo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let o=null,c=null,h=null;const f=this._targetRay,p=this._grip,m=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(m&&t.hand){h=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,a),y=this._getHandJoint(m,T);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const _=m.joints["index-finger-tip"],g=m.joints["thumb-tip"],x=_.position.distanceTo(g.position),M=.02,b=.005;m.inputState.pinching&&x>M+b?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&x<=M-b&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));f!==null&&(o=n.getPose(t.targetRaySpace,a),o===null&&c!==null&&(o=c),o!==null&&(f.matrix.fromArray(o.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,o.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(o.linearVelocity)):f.hasLinearVelocity=!1,o.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(o.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(tw)))}return f!==null&&(f.visible=o!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=h!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new eo;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const ew=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class iw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,a){if(this.texture===null){const o=new Jn,c=t.properties.get(o);c.__webglTexture=n.texture,(n.depthNear!=a.depthNear||n.depthFar!=a.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=o}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new Zi({vertexShader:ew,fragmentShader:nw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ri(new wl(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aw extends or{constructor(t,n){super();const a=this;let o=null,c=1,h=null,f="local-floor",p=1,m=null,_=null,g=null,x=null,M=null,b=null;const T=new iw,S=n.getContextAttributes();let y=null,F=null;const O=[],U=[],H=new pe;let L=null;const z=new Ui;z.viewport=new tn;const P=new Ui;P.viewport=new tn;const w=[z,P],A=new Mb;let k=null,lt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let mt=O[J];return mt===void 0&&(mt=new fd,O[J]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(J){let mt=O[J];return mt===void 0&&(mt=new fd,O[J]=mt),mt.getGripSpace()},this.getHand=function(J){let mt=O[J];return mt===void 0&&(mt=new fd,O[J]=mt),mt.getHandSpace()};function $(J){const mt=U.indexOf(J.inputSource);if(mt===-1)return;const bt=O[mt];bt!==void 0&&(bt.update(J.inputSource,J.frame,m||h),bt.dispatchEvent({type:J.type,data:J.inputSource}))}function ot(){o.removeEventListener("select",$),o.removeEventListener("selectstart",$),o.removeEventListener("selectend",$),o.removeEventListener("squeeze",$),o.removeEventListener("squeezestart",$),o.removeEventListener("squeezeend",$),o.removeEventListener("end",ot),o.removeEventListener("inputsourceschange",ft);for(let J=0;J<O.length;J++){const mt=U[J];mt!==null&&(U[J]=null,O[J].disconnect(mt))}k=null,lt=null,T.reset(),t.setRenderTarget(y),M=null,x=null,g=null,o=null,F=null,Dt.stop(),a.isPresenting=!1,t.setPixelRatio(L),t.setSize(H.width,H.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){c=J,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){f=J,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||h},this.setReferenceSpace=function(J){m=J},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return g},this.getFrame=function(){return b},this.getSession=function(){return o},this.setSession=async function(J){if(o=J,o!==null){if(y=t.getRenderTarget(),o.addEventListener("select",$),o.addEventListener("selectstart",$),o.addEventListener("selectend",$),o.addEventListener("squeeze",$),o.addEventListener("squeezestart",$),o.addEventListener("squeezeend",$),o.addEventListener("end",ot),o.addEventListener("inputsourceschange",ft),S.xrCompatible!==!0&&await n.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(H),o.renderState.layers===void 0){const mt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(o,n,mt),o.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),F=new sr(M.framebufferWidth,M.framebufferHeight,{format:qi,type:za,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let mt=null,bt=null,Rt=null;S.depth&&(Rt=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,mt=S.stencil?fo:so,bt=S.stencil?uo:ar);const Ut={colorFormat:n.RGBA8,depthFormat:Rt,scaleFactor:c};g=new XRWebGLBinding(o,n),x=g.createProjectionLayer(Ut),o.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),F=new sr(x.textureWidth,x.textureHeight,{format:qi,type:za,depthTexture:new ex(x.textureWidth,x.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}F.isXRRenderTarget=!0,this.setFoveation(p),m=null,h=await o.requestReferenceSpace(f),Dt.setContext(o),Dt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function ft(J){for(let mt=0;mt<J.removed.length;mt++){const bt=J.removed[mt],Rt=U.indexOf(bt);Rt>=0&&(U[Rt]=null,O[Rt].disconnect(bt))}for(let mt=0;mt<J.added.length;mt++){const bt=J.added[mt];let Rt=U.indexOf(bt);if(Rt===-1){for(let jt=0;jt<O.length;jt++)if(jt>=U.length){U.push(bt),Rt=jt;break}else if(U[jt]===null){U[jt]=bt,Rt=jt;break}if(Rt===-1)break}const Ut=O[Rt];Ut&&Ut.connect(bt)}}const G=new Q,nt=new Q;function W(J,mt,bt){G.setFromMatrixPosition(mt.matrixWorld),nt.setFromMatrixPosition(bt.matrixWorld);const Rt=G.distanceTo(nt),Ut=mt.projectionMatrix.elements,jt=bt.projectionMatrix.elements,Ht=Ut[14]/(Ut[10]-1),ve=Ut[14]/(Ut[10]+1),ne=(Ut[9]+1)/Ut[5],Re=(Ut[9]-1)/Ut[5],j=(Ut[8]-1)/Ut[0],dn=(jt[8]+1)/jt[0],fe=Ht*j,he=Ht*dn,Yt=Rt/(-j+dn),Te=Yt*-j;if(mt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Te),J.translateZ(Yt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ut[10]===-1)J.projectionMatrix.copy(mt.projectionMatrix),J.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const Wt=Ht+Yt,B=ve+Yt,R=fe-Te,at=he+(Rt-Te),gt=ne*ve/B*Wt,St=Re*ve/B*Wt;J.projectionMatrix.makePerspective(R,at,gt,St,Wt,B),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function tt(J,mt){mt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(mt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(o===null)return;let mt=J.near,bt=J.far;T.texture!==null&&(T.depthNear>0&&(mt=T.depthNear),T.depthFar>0&&(bt=T.depthFar)),A.near=P.near=z.near=mt,A.far=P.far=z.far=bt,(k!==A.near||lt!==A.far)&&(o.updateRenderState({depthNear:A.near,depthFar:A.far}),k=A.near,lt=A.far),z.layers.mask=J.layers.mask|2,P.layers.mask=J.layers.mask|4,A.layers.mask=z.layers.mask|P.layers.mask;const Rt=J.parent,Ut=A.cameras;tt(A,Rt);for(let jt=0;jt<Ut.length;jt++)tt(Ut[jt],Rt);Ut.length===2?W(A,z,P):A.projectionMatrix.copy(z.projectionMatrix),N(J,A,Rt)};function N(J,mt,bt){bt===null?J.matrix.copy(mt.matrixWorld):(J.matrix.copy(bt.matrixWorld),J.matrix.invert(),J.matrix.multiply(mt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(mt.projectionMatrix),J.projectionMatrixInverse.copy(mt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Sl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(J){p=J,x!==null&&(x.fixedFoveation=J),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=J)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(A)};let it=null;function Tt(J,mt){if(_=mt.getViewerPose(m||h),b=mt,_!==null){const bt=_.views;M!==null&&(t.setRenderTargetFramebuffer(F,M.framebuffer),t.setRenderTarget(F));let Rt=!1;bt.length!==A.cameras.length&&(A.cameras.length=0,Rt=!0);for(let jt=0;jt<bt.length;jt++){const Ht=bt[jt];let ve=null;if(M!==null)ve=M.getViewport(Ht);else{const Re=g.getViewSubImage(x,Ht);ve=Re.viewport,jt===0&&(t.setRenderTargetTextures(F,Re.colorTexture,x.ignoreDepthValues?void 0:Re.depthStencilTexture),t.setRenderTarget(F))}let ne=w[jt];ne===void 0&&(ne=new Ui,ne.layers.enable(jt),ne.viewport=new tn,w[jt]=ne),ne.matrix.fromArray(Ht.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(Ht.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(ve.x,ve.y,ve.width,ve.height),jt===0&&(A.matrix.copy(ne.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Rt===!0&&A.cameras.push(ne)}const Ut=o.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const jt=g.getDepthInformation(bt[0]);jt&&jt.isValid&&jt.texture&&T.init(t,jt,o.renderState)}}for(let bt=0;bt<O.length;bt++){const Rt=U[bt],Ut=O[bt];Rt!==null&&Ut!==void 0&&Ut.update(Rt,mt,m||h)}it&&it(J,mt),mt.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:mt}),b=null}const Dt=new ix;Dt.setAnimationLoop(Tt),this.setAnimationLoop=function(J){it=J},this.dispose=function(){}}}const Qs=new Ba,sw=new Ze;function rw(r,t){function n(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function a(S,y){y.color.getRGB(S.fogColor.value,Q0(r)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function o(S,y,F,O,U){y.isMeshBasicMaterial||y.isMeshLambertMaterial?c(S,y):y.isMeshToonMaterial?(c(S,y),g(S,y)):y.isMeshPhongMaterial?(c(S,y),_(S,y)):y.isMeshStandardMaterial?(c(S,y),x(S,y),y.isMeshPhysicalMaterial&&M(S,y,U)):y.isMeshMatcapMaterial?(c(S,y),b(S,y)):y.isMeshDepthMaterial?c(S,y):y.isMeshDistanceMaterial?(c(S,y),T(S,y)):y.isMeshNormalMaterial?c(S,y):y.isLineBasicMaterial?(h(S,y),y.isLineDashedMaterial&&f(S,y)):y.isPointsMaterial?p(S,y,F,O):y.isSpriteMaterial?m(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,n(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,n(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,n(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===oi&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,n(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===oi&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,n(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,n(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,n(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const F=t.get(y),O=F.envMap,U=F.envMapRotation;O&&(S.envMap.value=O,Qs.copy(U),Qs.x*=-1,Qs.y*=-1,Qs.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Qs.y*=-1,Qs.z*=-1),S.envMapRotation.value.setFromMatrix4(sw.makeRotationFromEuler(Qs)),S.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,n(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,n(y.aoMap,S.aoMapTransform))}function h(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,n(y.map,S.mapTransform))}function f(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function p(S,y,F,O){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*F,S.scale.value=O*.5,y.map&&(S.map.value=y.map,n(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,n(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function m(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,n(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,n(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function _(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function g(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function x(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,n(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,n(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function M(S,y,F){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,n(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,n(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,n(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,n(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,n(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===oi&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,n(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,n(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=F.texture,S.transmissionSamplerSize.value.set(F.width,F.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,n(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,n(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,n(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,n(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,n(y.specularIntensityMap,S.specularIntensityMapTransform))}function b(S,y){y.matcap&&(S.matcap.value=y.matcap)}function T(S,y){const F=t.get(y).light;S.referencePosition.value.setFromMatrixPosition(F.matrixWorld),S.nearDistance.value=F.shadow.camera.near,S.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:o}}function ow(r,t,n,a){let o={},c={},h=[];const f=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(F,O){const U=O.program;a.uniformBlockBinding(F,U)}function m(F,O){let U=o[F.id];U===void 0&&(b(F),U=_(F),o[F.id]=U,F.addEventListener("dispose",S));const H=O.program;a.updateUBOMapping(F,H);const L=t.render.frame;c[F.id]!==L&&(x(F),c[F.id]=L)}function _(F){const O=g();F.__bindingPointIndex=O;const U=r.createBuffer(),H=F.__size,L=F.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,H,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,U),U}function g(){for(let F=0;F<f;F++)if(h.indexOf(F)===-1)return h.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(F){const O=o[F.id],U=F.uniforms,H=F.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let L=0,z=U.length;L<z;L++){const P=Array.isArray(U[L])?U[L]:[U[L]];for(let w=0,A=P.length;w<A;w++){const k=P[w];if(M(k,L,w,H)===!0){const lt=k.__offset,$=Array.isArray(k.value)?k.value:[k.value];let ot=0;for(let ft=0;ft<$.length;ft++){const G=$[ft],nt=T(G);typeof G=="number"||typeof G=="boolean"?(k.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,lt+ot,k.__data)):G.isMatrix3?(k.__data[0]=G.elements[0],k.__data[1]=G.elements[1],k.__data[2]=G.elements[2],k.__data[3]=0,k.__data[4]=G.elements[3],k.__data[5]=G.elements[4],k.__data[6]=G.elements[5],k.__data[7]=0,k.__data[8]=G.elements[6],k.__data[9]=G.elements[7],k.__data[10]=G.elements[8],k.__data[11]=0):(G.toArray(k.__data,ot),ot+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,lt,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(F,O,U,H){const L=F.value,z=O+"_"+U;if(H[z]===void 0)return typeof L=="number"||typeof L=="boolean"?H[z]=L:H[z]=L.clone(),!0;{const P=H[z];if(typeof L=="number"||typeof L=="boolean"){if(P!==L)return H[z]=L,!0}else if(P.equals(L)===!1)return P.copy(L),!0}return!1}function b(F){const O=F.uniforms;let U=0;const H=16;for(let z=0,P=O.length;z<P;z++){const w=Array.isArray(O[z])?O[z]:[O[z]];for(let A=0,k=w.length;A<k;A++){const lt=w[A],$=Array.isArray(lt.value)?lt.value:[lt.value];for(let ot=0,ft=$.length;ot<ft;ot++){const G=$[ot],nt=T(G),W=U%H,tt=W%nt.boundary,N=W+tt;U+=tt,N!==0&&H-N<nt.storage&&(U+=H-N),lt.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),lt.__offset=U,U+=nt.storage}}}const L=U%H;return L>0&&(U+=H-L),F.__size=U,F.__cache={},this}function T(F){const O={boundary:0,storage:0};return typeof F=="number"||typeof F=="boolean"?(O.boundary=4,O.storage=4):F.isVector2?(O.boundary=8,O.storage=8):F.isVector3||F.isColor?(O.boundary=16,O.storage=12):F.isVector4?(O.boundary=16,O.storage=16):F.isMatrix3?(O.boundary=48,O.storage=48):F.isMatrix4?(O.boundary=64,O.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),O}function S(F){const O=F.target;O.removeEventListener("dispose",S);const U=h.indexOf(O.__bindingPointIndex);h.splice(U,1),r.deleteBuffer(o[O.id]),delete o[O.id],delete c[O.id]}function y(){for(const F in o)r.deleteBuffer(o[F]);h=[],o={},c={}}return{bind:p,update:m,dispose:y}}class lw{constructor(t={}){const{canvas:n=PM(),context:a=null,depth:o=!0,stencil:c=!1,alpha:h=!1,antialias:f=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=a.getContextAttributes().alpha}else M=h;const b=new Uint32Array(4),T=new Int32Array(4);let S=null,y=null;const F=[],O=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ai,this.toneMapping=Ms,this.toneMappingExposure=1;const U=this;let H=!1,L=0,z=0,P=null,w=-1,A=null;const k=new tn,lt=new tn;let $=null;const ot=new Be(0);let ft=0,G=n.width,nt=n.height,W=1,tt=null,N=null;const it=new tn(0,0,G,nt),Tt=new tn(0,0,G,nt);let Dt=!1;const J=new tx;let mt=!1,bt=!1;const Rt=new Ze,Ut=new Ze,jt=new Q,Ht=new tn,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ne=!1;function Re(){return P===null?W:1}let j=a;function dn(C,Y){return n.getContext(C,Y)}try{const C={alpha:!0,depth:o,stencil:c,antialias:f,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:g};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${xp}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Nt,!1),n.addEventListener("webglcontextcreationerror",Pt,!1),j===null){const Y="webgl2";if(j=dn(Y,C),j===null)throw dn(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let fe,he,Yt,Te,Wt,B,R,at,gt,St,vt,Zt,Ct,Gt,xe,wt,kt,Jt,qt,Ot,se,te,Ie,K;function Bt(){fe=new _T(j),fe.init(),te=new JA(j,fe),he=new fT(j,fe,t,te),Yt=new QA(j,fe),he.reverseDepthBuffer&&x&&Yt.buffers.depth.setReversed(!0),Te=new yT(j),Wt=new FA,B=new $A(j,fe,Yt,Wt,he,te,Te),R=new dT(U),at=new gT(U),gt=new wb(j),Ie=new cT(j,gt),St=new vT(j,gt,Te,Ie),vt=new MT(j,St,gt,Te),qt=new ST(j,he,B),wt=new hT(Wt),Zt=new BA(U,R,at,fe,he,Ie,wt),Ct=new rw(U,Wt),Gt=new HA,xe=new WA(fe),Jt=new lT(U,R,at,Yt,vt,M,p),kt=new ZA(U,vt,he),K=new ow(j,Te,he,Yt),Ot=new uT(j,fe,Te),se=new xT(j,fe,Te),Te.programs=Zt.programs,U.capabilities=he,U.extensions=fe,U.properties=Wt,U.renderLists=Gt,U.shadowMap=kt,U.state=Yt,U.info=Te}Bt();const ht=new aw(U,j);this.xr=ht,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const C=fe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=fe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(C){C!==void 0&&(W=C,this.setSize(G,nt,!1))},this.getSize=function(C){return C.set(G,nt)},this.setSize=function(C,Y,ct=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=C,nt=Y,n.width=Math.floor(C*W),n.height=Math.floor(Y*W),ct===!0&&(n.style.width=C+"px",n.style.height=Y+"px"),this.setViewport(0,0,C,Y)},this.getDrawingBufferSize=function(C){return C.set(G*W,nt*W).floor()},this.setDrawingBufferSize=function(C,Y,ct){G=C,nt=Y,W=ct,n.width=Math.floor(C*ct),n.height=Math.floor(Y*ct),this.setViewport(0,0,C,Y)},this.getCurrentViewport=function(C){return C.copy(k)},this.getViewport=function(C){return C.copy(it)},this.setViewport=function(C,Y,ct,rt){C.isVector4?it.set(C.x,C.y,C.z,C.w):it.set(C,Y,ct,rt),Yt.viewport(k.copy(it).multiplyScalar(W).round())},this.getScissor=function(C){return C.copy(Tt)},this.setScissor=function(C,Y,ct,rt){C.isVector4?Tt.set(C.x,C.y,C.z,C.w):Tt.set(C,Y,ct,rt),Yt.scissor(lt.copy(Tt).multiplyScalar(W).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(C){Yt.setScissorTest(Dt=C)},this.setOpaqueSort=function(C){tt=C},this.setTransparentSort=function(C){N=C},this.getClearColor=function(C){return C.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor.apply(Jt,arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha.apply(Jt,arguments)},this.clear=function(C=!0,Y=!0,ct=!0){let rt=0;if(C){let X=!1;if(P!==null){const Et=P.texture.format;X=Et===Tp||Et===Ep||Et===bp}if(X){const Et=P.texture.type,zt=Et===za||Et===ar||Et===yl||Et===uo||Et===Sp||Et===Mp,Ft=Jt.getClearColor(),It=Jt.getClearAlpha(),Qt=Ft.r,le=Ft.g,ee=Ft.b;zt?(b[0]=Qt,b[1]=le,b[2]=ee,b[3]=It,j.clearBufferuiv(j.COLOR,0,b)):(T[0]=Qt,T[1]=le,T[2]=ee,T[3]=It,j.clearBufferiv(j.COLOR,0,T))}else rt|=j.COLOR_BUFFER_BIT}Y&&(rt|=j.DEPTH_BUFFER_BIT),ct&&(rt|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Nt,!1),n.removeEventListener("webglcontextcreationerror",Pt,!1),Jt.dispose(),Gt.dispose(),xe.dispose(),Wt.dispose(),R.dispose(),at.dispose(),vt.dispose(),Ie.dispose(),K.dispose(),Zt.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",xi),ht.removeEventListener("sessionend",Ki),ci.stop()};function xt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function Nt(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const C=Te.autoReset,Y=kt.enabled,ct=kt.autoUpdate,rt=kt.needsUpdate,X=kt.type;Bt(),Te.autoReset=C,kt.enabled=Y,kt.autoUpdate=ct,kt.needsUpdate=rt,kt.type=X}function Pt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function re(C){const Y=C.target;Y.removeEventListener("dispose",re),Ke(Y)}function Ke(C){ln(C),Wt.remove(C)}function ln(C){const Y=Wt.get(C).programs;Y!==void 0&&(Y.forEach(function(ct){Zt.releaseProgram(ct)}),C.isShaderMaterial&&Zt.releaseShaderCache(C))}this.renderBufferDirect=function(C,Y,ct,rt,X,Et){Y===null&&(Y=ve);const zt=X.isMesh&&X.matrixWorld.determinant()<0,Ft=ui(C,Y,ct,rt,X);Yt.setMaterial(rt,zt);let It=ct.index,Qt=1;if(rt.wireframe===!0){if(It=St.getWireframeAttribute(ct),It===void 0)return;Qt=2}const le=ct.drawRange,ee=ct.attributes.position;let Se=le.start*Qt,Ce=(le.start+le.count)*Qt;Et!==null&&(Se=Math.max(Se,Et.start*Qt),Ce=Math.min(Ce,(Et.start+Et.count)*Qt)),It!==null?(Se=Math.max(Se,0),Ce=Math.min(Ce,It.count)):ee!=null&&(Se=Math.max(Se,0),Ce=Math.min(Ce,ee.count));const Ge=Ce-Se;if(Ge<0||Ge===1/0)return;Ie.setup(X,rt,Ft,ct,It);let He,ue=Ot;if(It!==null&&(He=gt.get(It),ue=se,ue.setIndex(He)),X.isMesh)rt.wireframe===!0?(Yt.setLineWidth(rt.wireframeLinewidth*Re()),ue.setMode(j.LINES)):ue.setMode(j.TRIANGLES);else if(X.isLine){let Vt=rt.linewidth;Vt===void 0&&(Vt=1),Yt.setLineWidth(Vt*Re()),X.isLineSegments?ue.setMode(j.LINES):X.isLineLoop?ue.setMode(j.LINE_LOOP):ue.setMode(j.LINE_STRIP)}else X.isPoints?ue.setMode(j.POINTS):X.isSprite&&ue.setMode(j.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)ue.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))ue.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Vt=X._multiDrawStarts,sn=X._multiDrawCounts,V=X._multiDrawCount,_t=It?gt.get(It).bytesPerElement:1,Kt=Wt.get(rt).currentProgram.getUniforms();for(let me=0;me<V;me++)Kt.setValue(j,"_gl_DrawID",me),ue.render(Vt[me]/_t,sn[me])}else if(X.isInstancedMesh)ue.renderInstances(Se,Ge,X.count);else if(ct.isInstancedBufferGeometry){const Vt=ct._maxInstanceCount!==void 0?ct._maxInstanceCount:1/0,sn=Math.min(ct.instanceCount,Vt);ue.renderInstances(Se,Ge,sn)}else ue.render(Se,Ge)};function Ue(C,Y,ct){C.transparent===!0&&C.side===ra&&C.forceSinglePass===!1?(C.side=oi,C.needsUpdate=!0,mn(C,Y,ct),C.side=bs,C.needsUpdate=!0,mn(C,Y,ct),C.side=ra):mn(C,Y,ct)}this.compile=function(C,Y,ct=null){ct===null&&(ct=C),y=xe.get(ct),y.init(Y),O.push(y),ct.traverseVisible(function(X){X.isLight&&X.layers.test(Y.layers)&&(y.pushLight(X),X.castShadow&&y.pushShadow(X))}),C!==ct&&C.traverseVisible(function(X){X.isLight&&X.layers.test(Y.layers)&&(y.pushLight(X),X.castShadow&&y.pushShadow(X))}),y.setupLights();const rt=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const Et=X.material;if(Et)if(Array.isArray(Et))for(let zt=0;zt<Et.length;zt++){const Ft=Et[zt];Ue(Ft,ct,X),rt.add(Ft)}else Ue(Et,ct,X),rt.add(Et)}),O.pop(),y=null,rt},this.compileAsync=function(C,Y,ct=null){const rt=this.compile(C,Y,ct);return new Promise(X=>{function Et(){if(rt.forEach(function(zt){Wt.get(zt).currentProgram.isReady()&&rt.delete(zt)}),rt.size===0){X(C);return}setTimeout(Et,10)}fe.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let vn=null;function an(C){vn&&vn(C)}function xi(){ci.stop()}function Ki(){ci.start()}const ci=new ix;ci.setAnimationLoop(an),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(C){vn=C,ht.setAnimationLoop(C),C===null?ci.stop():ci.start()},ht.addEventListener("sessionstart",xi),ht.addEventListener("sessionend",Ki),this.render=function(C,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(Y),Y=ht.getCamera()),C.isScene===!0&&C.onBeforeRender(U,C,Y,P),y=xe.get(C,O.length),y.init(Y),O.push(y),Ut.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),J.setFromProjectionMatrix(Ut),bt=this.localClippingEnabled,mt=wt.init(this.clippingPlanes,bt),S=Gt.get(C,F.length),S.init(),F.push(S),ht.enabled===!0&&ht.isPresenting===!0){const Et=U.xr.getDepthSensingMesh();Et!==null&&Hn(Et,Y,-1/0,U.sortObjects)}Hn(C,Y,0,U.sortObjects),S.finish(),U.sortObjects===!0&&S.sort(tt,N),ne=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,ne&&Jt.addToRenderList(S,C),this.info.render.frame++,mt===!0&&wt.beginShadows();const ct=y.state.shadowsArray;kt.render(ct,C,Y),mt===!0&&wt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,X=S.transmissive;if(y.setupLights(),Y.isArrayCamera){const Et=Y.cameras;if(X.length>0)for(let zt=0,Ft=Et.length;zt<Ft;zt++){const It=Et[zt];Ts(rt,X,C,It)}ne&&Jt.render(C);for(let zt=0,Ft=Et.length;zt<Ft;zt++){const It=Et[zt];ua(S,C,It,It.viewport)}}else X.length>0&&Ts(rt,X,C,Y),ne&&Jt.render(C),ua(S,C,Y);P!==null&&(B.updateMultisampleRenderTarget(P),B.updateRenderTargetMipmap(P)),C.isScene===!0&&C.onAfterRender(U,C,Y),Ie.resetDefaultState(),w=-1,A=null,O.pop(),O.length>0?(y=O[O.length-1],mt===!0&&wt.setGlobalState(U.clippingPlanes,y.state.camera)):y=null,F.pop(),F.length>0?S=F[F.length-1]:S=null};function Hn(C,Y,ct,rt){if(C.visible===!1)return;if(C.layers.test(Y.layers)){if(C.isGroup)ct=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(Y);else if(C.isLight)y.pushLight(C),C.castShadow&&y.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||J.intersectsSprite(C)){rt&&Ht.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ut);const zt=vt.update(C),Ft=C.material;Ft.visible&&S.push(C,zt,Ft,ct,Ht.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||J.intersectsObject(C))){const zt=vt.update(C),Ft=C.material;if(rt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ht.copy(C.boundingSphere.center)):(zt.boundingSphere===null&&zt.computeBoundingSphere(),Ht.copy(zt.boundingSphere.center)),Ht.applyMatrix4(C.matrixWorld).applyMatrix4(Ut)),Array.isArray(Ft)){const It=zt.groups;for(let Qt=0,le=It.length;Qt<le;Qt++){const ee=It[Qt],Se=Ft[ee.materialIndex];Se&&Se.visible&&S.push(C,zt,Se,ct,Ht.z,ee)}}else Ft.visible&&S.push(C,zt,Ft,ct,Ht.z,null)}}const Et=C.children;for(let zt=0,Ft=Et.length;zt<Ft;zt++)Hn(Et[zt],Y,ct,rt)}function ua(C,Y,ct,rt){const X=C.opaque,Et=C.transmissive,zt=C.transparent;y.setupLightsView(ct),mt===!0&&wt.setGlobalState(U.clippingPlanes,ct),rt&&Yt.viewport(k.copy(rt)),X.length>0&&kn(X,Y,ct),Et.length>0&&kn(Et,Y,ct),zt.length>0&&kn(zt,Y,ct),Yt.buffers.depth.setTest(!0),Yt.buffers.depth.setMask(!0),Yt.buffers.color.setMask(!0),Yt.setPolygonOffset(!1)}function Ts(C,Y,ct,rt){if((ct.isScene===!0?ct.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[rt.id]===void 0&&(y.state.transmissionRenderTarget[rt.id]=new sr(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?El:za,minFilter:nr,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace}));const Et=y.state.transmissionRenderTarget[rt.id],zt=rt.viewport||k;Et.setSize(zt.z,zt.w);const Ft=U.getRenderTarget();U.setRenderTarget(Et),U.getClearColor(ot),ft=U.getClearAlpha(),ft<1&&U.setClearColor(16777215,.5),U.clear(),ne&&Jt.render(ct);const It=U.toneMapping;U.toneMapping=Ms;const Qt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),y.setupLightsView(rt),mt===!0&&wt.setGlobalState(U.clippingPlanes,rt),kn(C,ct,rt),B.updateMultisampleRenderTarget(Et),B.updateRenderTargetMipmap(Et),fe.has("WEBGL_multisampled_render_to_texture")===!1){let le=!1;for(let ee=0,Se=Y.length;ee<Se;ee++){const Ce=Y[ee],Ge=Ce.object,He=Ce.geometry,ue=Ce.material,Vt=Ce.group;if(ue.side===ra&&Ge.layers.test(rt.layers)){const sn=ue.side;ue.side=oi,ue.needsUpdate=!0,pn(Ge,ct,rt,He,ue,Vt),ue.side=sn,ue.needsUpdate=!0,le=!0}}le===!0&&(B.updateMultisampleRenderTarget(Et),B.updateRenderTargetMipmap(Et))}U.setRenderTarget(Ft),U.setClearColor(ot,ft),Qt!==void 0&&(rt.viewport=Qt),U.toneMapping=It}function kn(C,Y,ct){const rt=Y.isScene===!0?Y.overrideMaterial:null;for(let X=0,Et=C.length;X<Et;X++){const zt=C[X],Ft=zt.object,It=zt.geometry,Qt=rt===null?zt.material:rt,le=zt.group;Ft.layers.test(ct.layers)&&pn(Ft,Y,ct,It,Qt,le)}}function pn(C,Y,ct,rt,X,Et){C.onBeforeRender(U,Y,ct,rt,X,Et),C.modelViewMatrix.multiplyMatrices(ct.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(U,Y,ct,rt,C,Et),X.transparent===!0&&X.side===ra&&X.forceSinglePass===!1?(X.side=oi,X.needsUpdate=!0,U.renderBufferDirect(ct,Y,rt,X,C,Et),X.side=bs,X.needsUpdate=!0,U.renderBufferDirect(ct,Y,rt,X,C,Et),X.side=ra):U.renderBufferDirect(ct,Y,rt,X,C,Et),C.onAfterRender(U,Y,ct,rt,X,Et)}function mn(C,Y,ct){Y.isScene!==!0&&(Y=ve);const rt=Wt.get(C),X=y.state.lights,Et=y.state.shadowsArray,zt=X.state.version,Ft=Zt.getParameters(C,X.state,Et,Y,ct),It=Zt.getProgramCacheKey(Ft);let Qt=rt.programs;rt.environment=C.isMeshStandardMaterial?Y.environment:null,rt.fog=Y.fog,rt.envMap=(C.isMeshStandardMaterial?at:R).get(C.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&C.envMap===null?Y.environmentRotation:C.envMapRotation,Qt===void 0&&(C.addEventListener("dispose",re),Qt=new Map,rt.programs=Qt);let le=Qt.get(It);if(le!==void 0){if(rt.currentProgram===le&&rt.lightsStateVersion===zt)return Fa(C,Ft),le}else Ft.uniforms=Zt.getUniforms(C),C.onBeforeCompile(Ft,U),le=Zt.acquireProgram(Ft,It),Qt.set(It,le),rt.uniforms=Ft.uniforms;const ee=rt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(ee.clippingPlanes=wt.uniform),Fa(C,Ft),rt.needsLights=Ia(C),rt.lightsStateVersion=zt,rt.needsLights&&(ee.ambientLightColor.value=X.state.ambient,ee.lightProbe.value=X.state.probe,ee.directionalLights.value=X.state.directional,ee.directionalLightShadows.value=X.state.directionalShadow,ee.spotLights.value=X.state.spot,ee.spotLightShadows.value=X.state.spotShadow,ee.rectAreaLights.value=X.state.rectArea,ee.ltc_1.value=X.state.rectAreaLTC1,ee.ltc_2.value=X.state.rectAreaLTC2,ee.pointLights.value=X.state.point,ee.pointLightShadows.value=X.state.pointShadow,ee.hemisphereLights.value=X.state.hemi,ee.directionalShadowMap.value=X.state.directionalShadowMap,ee.directionalShadowMatrix.value=X.state.directionalShadowMatrix,ee.spotShadowMap.value=X.state.spotShadowMap,ee.spotLightMatrix.value=X.state.spotLightMatrix,ee.spotLightMap.value=X.state.spotLightMap,ee.pointShadowMap.value=X.state.pointShadowMap,ee.pointShadowMatrix.value=X.state.pointShadowMatrix),rt.currentProgram=le,rt.uniformsList=null,le}function Pi(C){if(C.uniformsList===null){const Y=C.currentProgram.getUniforms();C.uniformsList=vu.seqWithValue(Y.seq,C.uniforms)}return C.uniformsList}function Fa(C,Y){const ct=Wt.get(C);ct.outputColorSpace=Y.outputColorSpace,ct.batching=Y.batching,ct.batchingColor=Y.batchingColor,ct.instancing=Y.instancing,ct.instancingColor=Y.instancingColor,ct.instancingMorph=Y.instancingMorph,ct.skinning=Y.skinning,ct.morphTargets=Y.morphTargets,ct.morphNormals=Y.morphNormals,ct.morphColors=Y.morphColors,ct.morphTargetsCount=Y.morphTargetsCount,ct.numClippingPlanes=Y.numClippingPlanes,ct.numIntersection=Y.numClipIntersection,ct.vertexAlphas=Y.vertexAlphas,ct.vertexTangents=Y.vertexTangents,ct.toneMapping=Y.toneMapping}function ui(C,Y,ct,rt,X){Y.isScene!==!0&&(Y=ve),B.resetTextureUnits();const Et=Y.fog,zt=rt.isMeshStandardMaterial?Y.environment:null,Ft=P===null?U.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ho,It=(rt.isMeshStandardMaterial?at:R).get(rt.envMap||zt),Qt=rt.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,le=!!ct.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),ee=!!ct.morphAttributes.position,Se=!!ct.morphAttributes.normal,Ce=!!ct.morphAttributes.color;let Ge=Ms;rt.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Ge=U.toneMapping);const He=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,ue=He!==void 0?He.length:0,Vt=Wt.get(rt),sn=y.state.lights;if(mt===!0&&(bt===!0||C!==A)){const Ve=C===A&&rt.id===w;wt.setState(rt,C,Ve)}let V=!1;rt.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==sn.state.version||Vt.outputColorSpace!==Ft||X.isBatchedMesh&&Vt.batching===!1||!X.isBatchedMesh&&Vt.batching===!0||X.isBatchedMesh&&Vt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Vt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Vt.instancing===!1||!X.isInstancedMesh&&Vt.instancing===!0||X.isSkinnedMesh&&Vt.skinning===!1||!X.isSkinnedMesh&&Vt.skinning===!0||X.isInstancedMesh&&Vt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Vt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Vt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Vt.instancingMorph===!1&&X.morphTexture!==null||Vt.envMap!==It||rt.fog===!0&&Vt.fog!==Et||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==wt.numPlanes||Vt.numIntersection!==wt.numIntersection)||Vt.vertexAlphas!==Qt||Vt.vertexTangents!==le||Vt.morphTargets!==ee||Vt.morphNormals!==Se||Vt.morphColors!==Ce||Vt.toneMapping!==Ge||Vt.morphTargetsCount!==ue)&&(V=!0):(V=!0,Vt.__version=rt.version);let _t=Vt.currentProgram;V===!0&&(_t=mn(rt,Y,X));let Kt=!1,me=!1,Ae=!1;const ie=_t.getUniforms(),Le=Vt.uniforms;if(Yt.useProgram(_t.program)&&(Kt=!0,me=!0,Ae=!0),rt.id!==w&&(w=rt.id,me=!0),Kt||A!==C){Yt.buffers.depth.getReversed()?(Rt.copy(C.projectionMatrix),BM(Rt),FM(Rt),ie.setValue(j,"projectionMatrix",Rt)):ie.setValue(j,"projectionMatrix",C.projectionMatrix),ie.setValue(j,"viewMatrix",C.matrixWorldInverse);const Fe=ie.map.cameraPosition;Fe!==void 0&&Fe.setValue(j,jt.setFromMatrixPosition(C.matrixWorld)),he.logarithmicDepthBuffer&&ie.setValue(j,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&ie.setValue(j,"isOrthographic",C.isOrthographicCamera===!0),A!==C&&(A=C,me=!0,Ae=!0)}if(X.isSkinnedMesh){ie.setOptional(j,X,"bindMatrix"),ie.setOptional(j,X,"bindMatrixInverse");const Ve=X.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),ie.setValue(j,"boneTexture",Ve.boneTexture,B))}X.isBatchedMesh&&(ie.setOptional(j,X,"batchingTexture"),ie.setValue(j,"batchingTexture",X._matricesTexture,B),ie.setOptional(j,X,"batchingIdTexture"),ie.setValue(j,"batchingIdTexture",X._indirectTexture,B),ie.setOptional(j,X,"batchingColorTexture"),X._colorsTexture!==null&&ie.setValue(j,"batchingColorTexture",X._colorsTexture,B));const en=ct.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&qt.update(X,ct,_t),(me||Vt.receiveShadow!==X.receiveShadow)&&(Vt.receiveShadow=X.receiveShadow,ie.setValue(j,"receiveShadow",X.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(Le.envMap.value=It,Le.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&Y.environment!==null&&(Le.envMapIntensity.value=Y.environmentIntensity),me&&(ie.setValue(j,"toneMappingExposure",U.toneMappingExposure),Vt.needsLights&&Gn(Le,Ae),Et&&rt.fog===!0&&Ct.refreshFogUniforms(Le,Et),Ct.refreshMaterialUniforms(Le,rt,W,nt,y.state.transmissionRenderTarget[C.id]),vu.upload(j,Pi(Vt),Le,B)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(vu.upload(j,Pi(Vt),Le,B),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&ie.setValue(j,"center",X.center),ie.setValue(j,"modelViewMatrix",X.modelViewMatrix),ie.setValue(j,"normalMatrix",X.normalMatrix),ie.setValue(j,"modelMatrix",X.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Ve=rt.uniformsGroups;for(let Fe=0,Qi=Ve.length;Fe<Qi;Fe++){const Qe=Ve[Fe];K.update(Qe,_t),K.bind(Qe,_t)}}return _t}function Gn(C,Y){C.ambientLightColor.needsUpdate=Y,C.lightProbe.needsUpdate=Y,C.directionalLights.needsUpdate=Y,C.directionalLightShadows.needsUpdate=Y,C.pointLights.needsUpdate=Y,C.pointLightShadows.needsUpdate=Y,C.spotLights.needsUpdate=Y,C.spotLightShadows.needsUpdate=Y,C.rectAreaLights.needsUpdate=Y,C.hemisphereLights.needsUpdate=Y}function Ia(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(C,Y,ct){Wt.get(C.texture).__webglTexture=Y,Wt.get(C.depthTexture).__webglTexture=ct;const rt=Wt.get(C);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=ct===void 0,rt.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,Y){const ct=Wt.get(C);ct.__webglFramebuffer=Y,ct.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(C,Y=0,ct=0){P=C,L=Y,z=ct;let rt=!0,X=null,Et=!1,zt=!1;if(C){const It=Wt.get(C);if(It.__useDefaultFramebuffer!==void 0)Yt.bindFramebuffer(j.FRAMEBUFFER,null),rt=!1;else if(It.__webglFramebuffer===void 0)B.setupRenderTarget(C);else if(It.__hasExternalTextures)B.rebindTextures(C,Wt.get(C.texture).__webglTexture,Wt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ee=C.depthTexture;if(It.__boundDepthTexture!==ee){if(ee!==null&&Wt.has(ee)&&(C.width!==ee.image.width||C.height!==ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(C)}}const Qt=C.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(zt=!0);const le=Wt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(le[Y])?X=le[Y][ct]:X=le[Y],Et=!0):C.samples>0&&B.useMultisampledRTT(C)===!1?X=Wt.get(C).__webglMultisampledFramebuffer:Array.isArray(le)?X=le[ct]:X=le,k.copy(C.viewport),lt.copy(C.scissor),$=C.scissorTest}else k.copy(it).multiplyScalar(W).floor(),lt.copy(Tt).multiplyScalar(W).floor(),$=Dt;if(Yt.bindFramebuffer(j.FRAMEBUFFER,X)&&rt&&Yt.drawBuffers(C,X),Yt.viewport(k),Yt.scissor(lt),Yt.setScissorTest($),Et){const It=Wt.get(C.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+Y,It.__webglTexture,ct)}else if(zt){const It=Wt.get(C.texture),Qt=Y||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,It.__webglTexture,ct||0,Qt)}w=-1},this.readRenderTargetPixels=function(C,Y,ct,rt,X,Et,zt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=Wt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&zt!==void 0&&(Ft=Ft[zt]),Ft){Yt.bindFramebuffer(j.FRAMEBUFFER,Ft);try{const It=C.texture,Qt=It.format,le=It.type;if(!he.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!he.textureTypeReadable(le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=C.width-rt&&ct>=0&&ct<=C.height-X&&j.readPixels(Y,ct,rt,X,te.convert(Qt),te.convert(le),Et)}finally{const It=P!==null?Wt.get(P).__webglFramebuffer:null;Yt.bindFramebuffer(j.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(C,Y,ct,rt,X,Et,zt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=Wt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&zt!==void 0&&(Ft=Ft[zt]),Ft){const It=C.texture,Qt=It.format,le=It.type;if(!he.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!he.textureTypeReadable(le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Y>=0&&Y<=C.width-rt&&ct>=0&&ct<=C.height-X){Yt.bindFramebuffer(j.FRAMEBUFFER,Ft);const ee=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,ee),j.bufferData(j.PIXEL_PACK_BUFFER,Et.byteLength,j.STREAM_READ),j.readPixels(Y,ct,rt,X,te.convert(Qt),te.convert(le),0);const Se=P!==null?Wt.get(P).__webglFramebuffer:null;Yt.bindFramebuffer(j.FRAMEBUFFER,Se);const Ce=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await zM(j,Ce,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,ee),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,Et),j.deleteBuffer(ee),j.deleteSync(Ce),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,Y=null,ct=0){C.isTexture!==!0&&(Jr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Y=arguments[0]||null,C=arguments[1]);const rt=Math.pow(2,-ct),X=Math.floor(C.image.width*rt),Et=Math.floor(C.image.height*rt),zt=Y!==null?Y.x:0,Ft=Y!==null?Y.y:0;B.setTexture2D(C,0),j.copyTexSubImage2D(j.TEXTURE_2D,ct,0,0,zt,Ft,X,Et),Yt.unbindTexture()};const Yn=j.createFramebuffer(),zi=j.createFramebuffer();this.copyTextureToTexture=function(C,Y,ct=null,rt=null,X=0,Et=null){C.isTexture!==!0&&(Jr("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,C=arguments[1],Y=arguments[2],Et=arguments[3]||0,ct=null),Et===null&&(X!==0?(Jr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Et=X,X=0):Et=0);let zt,Ft,It,Qt,le,ee,Se,Ce,Ge;const He=C.isCompressedTexture?C.mipmaps[Et]:C.image;if(ct!==null)zt=ct.max.x-ct.min.x,Ft=ct.max.y-ct.min.y,It=ct.isBox3?ct.max.z-ct.min.z:1,Qt=ct.min.x,le=ct.min.y,ee=ct.isBox3?ct.min.z:0;else{const en=Math.pow(2,-X);zt=Math.floor(He.width*en),Ft=Math.floor(He.height*en),C.isDataArrayTexture?It=He.depth:C.isData3DTexture?It=Math.floor(He.depth*en):It=1,Qt=0,le=0,ee=0}rt!==null?(Se=rt.x,Ce=rt.y,Ge=rt.z):(Se=0,Ce=0,Ge=0);const ue=te.convert(Y.format),Vt=te.convert(Y.type);let sn;Y.isData3DTexture?(B.setTexture3D(Y,0),sn=j.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(B.setTexture2DArray(Y,0),sn=j.TEXTURE_2D_ARRAY):(B.setTexture2D(Y,0),sn=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,Y.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,Y.unpackAlignment);const V=j.getParameter(j.UNPACK_ROW_LENGTH),_t=j.getParameter(j.UNPACK_IMAGE_HEIGHT),Kt=j.getParameter(j.UNPACK_SKIP_PIXELS),me=j.getParameter(j.UNPACK_SKIP_ROWS),Ae=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,He.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,He.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Qt),j.pixelStorei(j.UNPACK_SKIP_ROWS,le),j.pixelStorei(j.UNPACK_SKIP_IMAGES,ee);const ie=C.isDataArrayTexture||C.isData3DTexture,Le=Y.isDataArrayTexture||Y.isData3DTexture;if(C.isDepthTexture){const en=Wt.get(C),Ve=Wt.get(Y),Fe=Wt.get(en.__renderTarget),Qi=Wt.get(Ve.__renderTarget);Yt.bindFramebuffer(j.READ_FRAMEBUFFER,Fe.__webglFramebuffer),Yt.bindFramebuffer(j.DRAW_FRAMEBUFFER,Qi.__webglFramebuffer);for(let Qe=0;Qe<It;Qe++)ie&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Wt.get(C).__webglTexture,X,ee+Qe),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Wt.get(Y).__webglTexture,Et,Ge+Qe)),j.blitFramebuffer(Qt,le,zt,Ft,Se,Ce,zt,Ft,j.DEPTH_BUFFER_BIT,j.NEAREST);Yt.bindFramebuffer(j.READ_FRAMEBUFFER,null),Yt.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(X!==0||C.isRenderTargetTexture||Wt.has(C)){const en=Wt.get(C),Ve=Wt.get(Y);Yt.bindFramebuffer(j.READ_FRAMEBUFFER,Yn),Yt.bindFramebuffer(j.DRAW_FRAMEBUFFER,zi);for(let Fe=0;Fe<It;Fe++)ie?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,en.__webglTexture,X,ee+Fe):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,en.__webglTexture,X),Le?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ve.__webglTexture,Et,Ge+Fe):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Ve.__webglTexture,Et),X!==0?j.blitFramebuffer(Qt,le,zt,Ft,Se,Ce,zt,Ft,j.COLOR_BUFFER_BIT,j.NEAREST):Le?j.copyTexSubImage3D(sn,Et,Se,Ce,Ge+Fe,Qt,le,zt,Ft):j.copyTexSubImage2D(sn,Et,Se,Ce,Qt,le,zt,Ft);Yt.bindFramebuffer(j.READ_FRAMEBUFFER,null),Yt.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Le?C.isDataTexture||C.isData3DTexture?j.texSubImage3D(sn,Et,Se,Ce,Ge,zt,Ft,It,ue,Vt,He.data):Y.isCompressedArrayTexture?j.compressedTexSubImage3D(sn,Et,Se,Ce,Ge,zt,Ft,It,ue,He.data):j.texSubImage3D(sn,Et,Se,Ce,Ge,zt,Ft,It,ue,Vt,He):C.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,Et,Se,Ce,zt,Ft,ue,Vt,He.data):C.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,Et,Se,Ce,He.width,He.height,ue,He.data):j.texSubImage2D(j.TEXTURE_2D,Et,Se,Ce,zt,Ft,ue,Vt,He);j.pixelStorei(j.UNPACK_ROW_LENGTH,V),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,_t),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Kt),j.pixelStorei(j.UNPACK_SKIP_ROWS,me),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Ae),Et===0&&Y.generateMipmaps&&j.generateMipmap(sn),Yt.unbindTexture()},this.copyTextureToTexture3D=function(C,Y,ct=null,rt=null,X=0){return C.isTexture!==!0&&(Jr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ct=arguments[0]||null,rt=arguments[1]||null,C=arguments[2],Y=arguments[3],X=arguments[4]||0),Jr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,Y,ct,rt,X)},this.initRenderTarget=function(C){Wt.get(C).__webglFramebuffer===void 0&&B.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?B.setTextureCube(C,0):C.isData3DTexture?B.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?B.setTexture2DArray(C,0):B.setTexture2D(C,0),Yt.unbindTexture()},this.resetState=function(){L=0,z=0,P=null,Yt.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return La}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=ze._getDrawingBufferColorSpace(t),n.unpackColorSpace=ze._getUnpackColorSpace()}}const f0={type:"change"},Lp={type:"start"},lx={type:"end"},iu=new Tl,h0=new _s,cw=Math.cos(70*wp.DEG2RAD),Tn=new Q,ii=2*Math.PI,qe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},hd=1e-6;class uw extends Tb{constructor(t,n=null){super(t,n),this.state=qe.NONE,this.enabled=!0,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:io.ROTATE,MIDDLE:io.DOLLY,RIGHT:io.PAN},this.touches={ONE:to.ROTATE,TWO:to.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new ca,this._lastTargetPosition=new Q,this._quat=new ca().setFromUnitVectors(t.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fv,this._sphericalDelta=new Fv,this._scale=1,this._panOffset=new Q,this._rotateStart=new pe,this._rotateEnd=new pe,this._rotateDelta=new pe,this._panStart=new pe,this._panEnd=new pe,this._panDelta=new pe,this._dollyStart=new pe,this._dollyEnd=new pe,this._dollyDelta=new pe,this._dollyDirection=new Q,this._mouse=new pe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=hw.bind(this),this._onPointerDown=fw.bind(this),this._onPointerUp=dw.bind(this),this._onContextMenu=yw.bind(this),this._onMouseWheel=gw.bind(this),this._onKeyDown=_w.bind(this),this._onTouchStart=vw.bind(this),this._onTouchMove=xw.bind(this),this._onMouseDown=pw.bind(this),this._onMouseMove=mw.bind(this),this._interceptControlDown=Sw.bind(this),this._interceptControlUp=Mw.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(f0),this.update(),this.state=qe.NONE}update(t=null){const n=this.object.position;Tn.copy(n).sub(this.target),Tn.applyQuaternion(this._quat),this._spherical.setFromVector3(Tn),this.autoRotate&&this.state===qe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,o=this.maxAzimuthAngle;isFinite(a)&&isFinite(o)&&(a<-Math.PI?a+=ii:a>Math.PI&&(a-=ii),o<-Math.PI?o+=ii:o>Math.PI&&(o-=ii),a<=o?this._spherical.theta=Math.max(a,Math.min(o,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+o)/2?Math.max(a,this._spherical.theta):Math.min(o,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(Tn.setFromSpherical(this._spherical),Tn.applyQuaternion(this._quatInverse),n.copy(this.target).add(Tn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const f=Tn.length();h=this._clampDistance(f*this._scale);const p=f-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),c=!!p}else if(this.object.isOrthographicCamera){const f=new Q(this._mouse.x,this._mouse.y,0);f.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=p!==this.object.zoom;const m=new Q(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(f),this.object.updateMatrixWorld(),h=Tn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(iu.origin.copy(this.object.position),iu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(iu.direction))<cw?this.object.lookAt(this.target):(h0.setFromNormalAndCoplanarPoint(this.object.up,this.target),iu.intersectPlane(h0,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>hd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>hd||this._lastTargetPosition.distanceToSquared(this.target)>hd?(this.dispatchEvent(f0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ii/60*this.autoRotateSpeed*t:ii/60/60*this.autoRotateSpeed}_getZoomScale(t){const n=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,n){Tn.setFromMatrixColumn(n,0),Tn.multiplyScalar(-t),this._panOffset.add(Tn)}_panUp(t,n){this.screenSpacePanning===!0?Tn.setFromMatrixColumn(n,1):(Tn.setFromMatrixColumn(n,0),Tn.crossVectors(this.object.up,Tn)),Tn.multiplyScalar(t),this._panOffset.add(Tn)}_pan(t,n){const a=this.domElement;if(this.object.isPerspectiveCamera){const o=this.object.position;Tn.copy(o).sub(this.target);let c=Tn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/a.clientHeight,this.object.matrix),this._panUp(2*n*c/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),o=t-a.left,c=n-a.top,h=a.width,f=a.height;this._mouse.x=o/h*2-1,this._mouse.y=-(c/f)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ii*this._rotateDelta.x/n.clientHeight),this._rotateUp(ii*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let n=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ii*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ii*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ii*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ii*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._rotateStart.set(a,o)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._panStart.set(a,o)}}_handleTouchStartDolly(t){const n=this._getSecondPointerPosition(t),a=t.pageX-n.x,o=t.pageY-n.y,c=Math.sqrt(a*a+o*o);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),o=.5*(t.pageX+a.x),c=.5*(t.pageY+a.y);this._rotateEnd.set(o,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ii*this._rotateDelta.x/n.clientHeight),this._rotateUp(ii*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),a=.5*(t.pageX+n.x),o=.5*(t.pageY+n.y);this._panEnd.set(a,o)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const n=this._getSecondPointerPosition(t),a=t.pageX-n.x,o=t.pageY-n.y,c=Math.sqrt(a*a+o*o);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+n.x)*.5,f=(t.pageY+n.y)*.5;this._updateZoomParameters(h,f)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(t){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==t.pointerId)return!0;return!1}_trackPointer(t){let n=this._pointerPositions[t.pointerId];n===void 0&&(n=new pe,this._pointerPositions[t.pointerId]=n),n.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const n=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(t){const n=t.deltaMode,a={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(n){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function fw(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function hw(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function dw(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lx),this.state=qe.NONE;break;case 1:const t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function pw(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case io.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=qe.DOLLY;break;case io.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=qe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=qe.ROTATE}break;case io.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=qe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=qe.PAN}break;default:this.state=qe.NONE}this.state!==qe.NONE&&this.dispatchEvent(Lp)}function mw(r){switch(this.state){case qe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case qe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function gw(r){this.enabled===!1||this.enableZoom===!1||this.state!==qe.NONE||(r.preventDefault(),this.dispatchEvent(Lp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(lx))}function _w(r){this.enabled!==!1&&this._handleKeyDown(r)}function vw(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case to.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=qe.TOUCH_ROTATE;break;case to.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=qe.TOUCH_PAN;break;default:this.state=qe.NONE}break;case 2:switch(this.touches.TWO){case to.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=qe.TOUCH_DOLLY_PAN;break;case to.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=qe.TOUCH_DOLLY_ROTATE;break;default:this.state=qe.NONE}break;default:this.state=qe.NONE}this.state!==qe.NONE&&this.dispatchEvent(Lp)}function xw(r){switch(this._trackPointer(r),this.state){case qe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case qe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case qe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case qe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=qe.NONE}}function yw(r){this.enabled!==!1&&r.preventDefault()}function Sw(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Mw(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}Lt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new pe(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};si.line={uniforms:Dp.merge([Lt.common,Lt.fog,Lt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class cx extends Zi{constructor(t){super({type:"LineMaterial",uniforms:Dp.clone(si.line.uniforms),vertexShader:si.line.vertexShader,fragmentShader:si.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const d0=new Es,au=new Q;class xu extends nx{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],a=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(a),this.setAttribute("position",new Li(t,3)),this.setAttribute("uv",new Li(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,a=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),a.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const a=new up(n,6,1);return this.setAttribute("instanceStart",new xs(a,3,0)),this.setAttribute("instanceEnd",new xs(a,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const a=new up(n,6,1);return this.setAttribute("instanceColorStart",new xs(a,3,0)),this.setAttribute("instanceColorEnd",new xs(a,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new pb(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Es);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),d0.setFromBufferAttribute(n),this.boundingBox.union(d0))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lr),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const a=this.boundingSphere.center;this.boundingBox.getCenter(a);let o=0;for(let c=0,h=t.count;c<h;c++)au.fromBufferAttribute(t,c),o=Math.max(o,a.distanceToSquared(au)),au.fromBufferAttribute(n,c),o=Math.max(o,a.distanceToSquared(au));this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}const dd=new tn,p0=new Q,m0=new Q,Pn=new tn,zn=new tn,aa=new tn,pd=new Q,md=new Ze,In=new Eb,g0=new Q,su=new Es,ru=new lr,sa=new tn;let oa,ir;function _0(r,t,n){return sa.set(0,0,-t,1).applyMatrix4(r.projectionMatrix),sa.multiplyScalar(1/sa.w),sa.x=ir/n.width,sa.y=ir/n.height,sa.applyMatrix4(r.projectionMatrixInverse),sa.multiplyScalar(1/sa.w),Math.abs(Math.max(sa.x,sa.y))}function bw(r,t){const n=r.matrixWorld,a=r.geometry,o=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,o.count);for(let f=0,p=h;f<p;f++){In.start.fromBufferAttribute(o,f),In.end.fromBufferAttribute(c,f),In.applyMatrix4(n);const m=new Q,_=new Q;oa.distanceSqToSegment(In.start,In.end,_,m),_.distanceTo(m)<ir*.5&&t.push({point:_,pointOnLine:m,distance:oa.origin.distanceTo(_),object:r,face:null,faceIndex:f,uv:null,uv1:null})}}function Ew(r,t,n){const a=t.projectionMatrix,c=r.material.resolution,h=r.matrixWorld,f=r.geometry,p=f.attributes.instanceStart,m=f.attributes.instanceEnd,_=Math.min(f.instanceCount,p.count),g=-t.near;oa.at(1,aa),aa.w=1,aa.applyMatrix4(t.matrixWorldInverse),aa.applyMatrix4(a),aa.multiplyScalar(1/aa.w),aa.x*=c.x/2,aa.y*=c.y/2,aa.z=0,pd.copy(aa),md.multiplyMatrices(t.matrixWorldInverse,h);for(let x=0,M=_;x<M;x++){if(Pn.fromBufferAttribute(p,x),zn.fromBufferAttribute(m,x),Pn.w=1,zn.w=1,Pn.applyMatrix4(md),zn.applyMatrix4(md),Pn.z>g&&zn.z>g)continue;if(Pn.z>g){const O=Pn.z-zn.z,U=(Pn.z-g)/O;Pn.lerp(zn,U)}else if(zn.z>g){const O=zn.z-Pn.z,U=(zn.z-g)/O;zn.lerp(Pn,U)}Pn.applyMatrix4(a),zn.applyMatrix4(a),Pn.multiplyScalar(1/Pn.w),zn.multiplyScalar(1/zn.w),Pn.x*=c.x/2,Pn.y*=c.y/2,zn.x*=c.x/2,zn.y*=c.y/2,In.start.copy(Pn),In.start.z=0,In.end.copy(zn),In.end.z=0;const T=In.closestPointToPointParameter(pd,!0);In.at(T,g0);const S=wp.lerp(Pn.z,zn.z,T),y=S>=-1&&S<=1,F=pd.distanceTo(g0)<ir*.5;if(y&&F){In.start.fromBufferAttribute(p,x),In.end.fromBufferAttribute(m,x),In.start.applyMatrix4(h),In.end.applyMatrix4(h);const O=new Q,U=new Q;oa.distanceSqToSegment(In.start,In.end,U,O),n.push({point:U,pointOnLine:O,distance:oa.origin.distanceTo(U),object:r,face:null,faceIndex:x,uv:null,uv1:null})}}}class ou extends ri{constructor(t=new xu,n=new cx({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,a=t.attributes.instanceEnd,o=new Float32Array(2*n.count);for(let h=0,f=0,p=n.count;h<p;h++,f+=2)p0.fromBufferAttribute(n,h),m0.fromBufferAttribute(a,h),o[f]=f===0?0:o[f-1],o[f+1]=o[f]+p0.distanceTo(m0);const c=new up(o,2,1);return t.setAttribute("instanceDistanceStart",new xs(c,1,0)),t.setAttribute("instanceDistanceEnd",new xs(c,1,1)),this}raycast(t,n){const a=this.material.worldUnits,o=t.camera;o===null&&!a&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const c=t.params.Line2!==void 0&&t.params.Line2.threshold||0;oa=t.ray;const h=this.matrixWorld,f=this.geometry,p=this.material;ir=p.linewidth+c,f.boundingSphere===null&&f.computeBoundingSphere(),ru.copy(f.boundingSphere).applyMatrix4(h);let m;if(a)m=ir*.5;else{const g=Math.max(o.near,ru.distanceToPoint(oa.origin));m=_0(o,g,p.resolution)}if(ru.radius+=m,oa.intersectsSphere(ru)===!1)return;f.boundingBox===null&&f.computeBoundingBox(),su.copy(f.boundingBox).applyMatrix4(h);let _;if(a)_=ir*.5;else{const g=Math.max(o.near,su.distanceToPoint(oa.origin));_=_0(o,g,p.resolution)}su.expandByScalar(_),oa.intersectsBox(su)!==!1&&(a?bw(this,n):Ew(this,o,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(dd),this.material.uniforms.resolution.value.set(dd.z,dd.w))}}const Tw=Float32Array.from({length:256},(r,t)=>{const n=t/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}),ml=r=>Tw[Math.round(r)],lu=[[255,77,109],[255,210,63],[59,206,172],[94,96,206]],Aw=115;function Au(r){const t=n=>Math.round(255*Math.min(1,Math.max(0,n.reduce((a,o,c)=>a+o*r**c,0))));return[t([.13572138,4.6153926,-42.66032258,132.13108234,-152.94239396,59.28637943]),t([.09140261,2.19418839,4.84296658,-14.18503333,4.27729857,2.82956604]),t([.1066733,12.64194608,-60.58204836,110.36276771,-89.90310912,27.34824973])]}function ux(r){const t=n=>Math.round(255*Math.min(1,Math.max(0,n.reduce((a,o,c)=>a+o*r**c,0))));return[t([.2777273272,.1050930431,-.3308618287,-4.634230499,6.228269936,4.776384998,-5.435455856]),t([.005407344545,1.40461353,.2148475595,-5.799100973,14.17993337,-13.74514538,4.645852612]),t([.3340998053,1.384590163,.09509516303,-19.33244096,56.6905526,-65.35303263,26.31243525])]}function v0(r,t,n,a,o){const c=t*Math.min(n,1-n);for(const[h,f]of[0,8,4].entries()){const p=(f+r*12)%12;a[o+h]=Math.round((n-c*Math.max(-1,Math.min(p-3,9-p,1)))*255)}}function dp(r,t,n,a,o){if(t=Math.min(1,Math.max(0,t)),n=Math.min(1,Math.max(0,n)),r==="wheel"){const c=t-.5,h=n-.5;v0((Math.atan2(h,c)/(2*Math.PI)+1)%1,.85,.85-.3*Math.min(1,Math.hypot(c,h)*2),a,o)}else if(r==="bands"){const c=h=>{const f=h*3,p=f-Math.floor(f);return Math.floor(f)%2?1-p:p};v0((c(t)+c(n))/2,.78,.62,a,o)}else if(r==="xy")for(let c=0;c<3;c++){const h=lu[0][c]*(1-t)+lu[1][c]*t,f=lu[2][c]*(1-t)+lu[3][c]*t;a[o+c]=Math.round(h*(1-n)+f*n)}else a.set(Au(r==="x"?t:n),o)}function ww(r,t,n,a){const o=new Uint8Array(t.length*3),{trailBoxes:c,trailOutside:h}=r;return t.forEach(([f,p],m)=>{const _=m*3,g=c.filter(M=>M.sourceFrame===void 0||M.sourceFrame===(a==null?void 0:a[m])),x=g.find(({rect:M})=>f>=M[0]&&f<=M[2]&&p>=M[1]&&p<=M[3]);if(x){const[M,b,T,S]=x.rect;dp(x.mode,(f-M)/Math.max(1e-6,T-M),(p-b)/Math.max(1e-6,S-b),o,_)}else!g.length||h==="gradient"?dp(r.trailGradient,f,p,o,_):h==="rgb"&&n?o.set(n[m],_):o.fill(Aw,_,_+3)}),o}function Rw(r,t=96,n=64){const a=document.createElement("canvas");a.width=t,a.height=n;const o=a.getContext("2d"),c=o.createImageData(t,n),h=new Uint8Array(3);for(let f=0;f<n;f++)for(let p=0;p<t;p++)dp(r,(p+.5)/t,(f+.5)/n,h,0),c.data.set([h[0],h[1],h[2],255],(f*t+p)*4);return o.putImageData(c,0,0),a.toDataURL()}const pp={trajectoryMode:"across",inputCamera:0,confidenceKeep:1,visibility:.5,occluded:"show",motion:{enabled:!1,threshold:.25,collapse:!0,tint:!0},trailDensity:.2,allClouds:!1,frameTransition:"smooth",cameras:!0,frustumSize:.12,frustumWidth:2,planeOpacity:.85,pointColor:"rgb",pointSize:5,trails:!0,trailLength:20,trailWidth:1.5,trailOpacity:.9,trailFade:!0,trailColor:"position",trailGradient:"x",trailBoxes:[],trailOutside:"grey",background:"gradient",backgroundColor:"#181b21",hiddenLayers:[]},gd={KeyW:[0,0,-1],KeyS:[0,0,1],KeyA:[-1,0,0],KeyD:[1,0,0],KeyE:[0,1,0],KeyQ:[0,-1,0]},Cw=[.35,.6,1],Dw=[1,.55,.2],Uw=650,_d=50,Nw=.35,Lw=.03,Ow=.004,vd=r=>new Be().setHSL((218+r*137.507764)%360/360,.72,.62),Pw=`
  varying vec2 vUv;
  void main() {
    vUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,zw=`
  uniform vec2 uSize;
  varying vec2 vUv;
  void main() {
    vec2 point = vUv * uSize, center = uSize * vec2(0.55, 0.47);
    float t = length(point - center) / max(length(max(center, uSize - center)), 1e-3);
    vec3 inner = vec3(32.0, 35.0, 50.0) / 255.0, middle = vec3(16.0, 17.0, 25.0) / 255.0, outer = vec3(9.0, 9.0, 15.0) / 255.0;
    vec3 color = t < 0.57 ? mix(inner, middle, t / 0.57) : mix(middle, outer, clamp((t - 0.57) / 0.43, 0.0, 1.0));
    float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    gl_FragColor = vec4(color + (noise - 0.5) / 255.0, 1.0);
  }
`,Bw=`
  uniform float uRadius;
  uniform float uViewportHeight;
  attribute vec3 instancePosition;
  attribute vec3 instanceColor;
  varying vec3 vColor;
  varying vec2 vOffset;
  varying float vRadius;
  void main() {
    vec4 center = modelViewMatrix * vec4(instancePosition, 1.0);
    float pixel = max(-center.z, 1e-4) / max(0.5 * uViewportHeight * projectionMatrix[1][1], 1e-4);
    vRadius = uRadius * pixel;
    vOffset = position.xy * (vRadius + 0.5 * pixel);
    center.xy += vOffset;
    gl_Position = projectionMatrix * center;
    vColor = instanceColor;
  }
`,Fw=`
  uniform float uOpacity;
  varying vec3 vColor;
  varying vec2 vOffset;
  varying float vRadius;
  void main() {
    float distance = length(vOffset), feather = 0.5 * fwidth(distance);
    float coverage = 1.0 - smoothstep(vRadius - feather, vRadius + feather, distance);
    if (coverage <= 0.001) discard;
    gl_FragColor = vec4(vColor, coverage * uOpacity);
    #include <colorspace_fragment>
  }
`,Iw=new Float32Array([-1,-1,0,1,-1,0,1,1,0,-1,-1,0,1,1,0,-1,1,0]);function Hw(r,t){if(t>=.9999)return!0;let n=Math.imul(r,2654435761)>>>0;return n=(n^n>>>15)>>>0,n=Math.imul(n,2246822519)>>>0,n=(n^n>>>13)>>>0,(n&16777215)/16777216<t}function x0(r){r.vertexShader=r.vertexShader.replace("attribute vec3 instanceColorEnd;",`attribute vec3 instanceColorEnd;
attribute float instanceProgressStart;
attribute float instanceProgressEnd;
varying float vTrailProgress;`).replace("void main() {",`void main() {
vTrailProgress = (position.y < 0.5) ? instanceProgressStart : instanceProgressEnd;`),r.fragmentShader=r.fragmentShader.replace("varying float vLineDistance;",`varying float vLineDistance;
varying float vTrailProgress;`).replace("vec4 diffuseColor = vec4( diffuse, alpha );",`alpha *= clamp(vTrailProgress / 0.3, 0.0, 1.0);
vec4 diffuseColor = vec4( diffuse, alpha );`)}function kw(r,t){r.colorWrite=!1,r.uniforms.trailDepthBias={value:t},r.vertexShader=r.vertexShader.replace("uniform float linewidth;",`uniform float linewidth;
uniform float trailDepthBias;`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
start.xyz += normalize(start.xyz) * trailDepthBias;
end.xyz += normalize(end.xyz) * trailDepthBias;`),r.fragmentShader=r.fragmentShader.replace("vec4 diffuseColor = vec4( diffuse, alpha );",`if (alpha < 0.5) discard;
vec4 diffuseColor = vec4( diffuse, alpha );`)}function Gw(r){var h;const t=((h=r.positions[0])==null?void 0:h.length)??0,n=r.positions.length,a=new Float32Array(t),o=new Float32Array(t*3),c=new Float64Array(n);for(let f=0;f<t;f++){const p=r.valid?r.positions.filter((_,g)=>r.valid[g][f]):r.positions;if(!p.length)continue;const m=[0,1,2].map(_=>p.reduce((g,x)=>g+x[f][_],0)/p.length);for(const _ of p)a[f]=Math.max(a[f],Math.hypot(_[f][0]-m[0],_[f][1]-m[1],_[f][2]-m[2]));for(let _=0;_<3;_++){p.forEach((x,M)=>c[M]=x[f][_]);const g=c.subarray(0,p.length).sort();o[f*3+_]=(g[p.length-1>>1]+g[p.length>>1])/2}}return{radius:a,median:o}}function y0(r){const t=Float64Array.from(r.flatMap(a=>Array.from(a))).sort(),n=new Map;return t.forEach((a,o)=>{n.has(a)||n.set(a,o+1)}),r.map(a=>Uint32Array.from(a,o=>{const c=n.get(o);return n.set(o,c+1),c}))}const S0=[110,110,110];class Vw{constructor(t){ce(this,"renderer");ce(this,"camera",new Ui(_d,1,.001,1e4));ce(this,"scene",new rb);ce(this,"root",new eo);ce(this,"orbit");ce(this,"textures",new Map);ce(this,"backdrop");ce(this,"data",null);ce(this,"timeRange",[0,0]);ce(this,"prepared",new WeakMap);ce(this,"settings",pp);ce(this,"defaults",pp);ce(this,"pointRanks",new Map);ce(this,"trackRanks",new Map);ce(this,"pointCount",0);ce(this,"trackCount",0);ce(this,"pointDrop",0);ce(this,"trackDrop",0);ce(this,"statistics",new Map);ce(this,"palettes",new Map);ce(this,"center",new Q);ce(this,"radius",1);ce(this,"time",0);ce(this,"generation",0);ce(this,"lines",[]);ce(this,"points",[]);ce(this,"frusta",[]);ce(this,"projection",new Q(1,0,0));ce(this,"transition",null);ce(this,"following",null);ce(this,"keys",new Set);ce(this,"pointer",null);ce(this,"rolling",null);ce(this,"raycaster",new bb);ce(this,"onMotionCounts",()=>{});ce(this,"onSeek",()=>{});ce(this,"contextMenu",t=>t.preventDefault());ce(this,"pointerDown",t=>{this.pointer=[t.clientX,t.clientY],t.button===1&&(this.rolling=t.clientX,t.preventDefault())});ce(this,"pointerUp",t=>{t.button===1&&(this.rolling=null)});ce(this,"pointerMove",t=>{if(this.rolling!==null){const n=this.orbit.target.clone().sub(this.camera.position).normalize();this.camera.up.applyAxisAngle(n,(t.clientX-this.rolling)*Ow).normalize(),this.rolling=t.clientX}this.pointer&&t.buttons&&Math.hypot(t.clientX-this.pointer[0],t.clientY-this.pointer[1])>2&&(this.pointer=null,this.release())});ce(this,"keyDown",t=>{const n=t.target;t.metaKey||t.ctrlKey||n&&["INPUT","TEXTAREA","SELECT"].includes(n.tagName)||(t.code in gd||t.code.startsWith("Shift"))&&this.keys.add(t.code)});ce(this,"keyUp",t=>{this.keys.delete(t.code)});ce(this,"blur",()=>this.keys.clear());ce(this,"release",()=>{!this.transition&&!this.following||(this.transition=null,this.following=null,this.projection.set(1,0,0),this.updateProjection())});ce(this,"doubleClick",t=>{const n=this.renderer.domElement.getBoundingClientRect();this.raycaster.params.Line2={threshold:6},this.raycaster.setFromCamera(new pe((t.clientX-n.left)/n.width*2-1,1-(t.clientY-n.top)/n.height*2),this.camera);const a=this.raycaster.intersectObjects(this.frusta.map(c=>c.object),!0)[0],o=a&&this.frusta.find(c=>c.object===a.object.parent);o&&(t.preventDefault(),this.onSeek(o.entry.time),this.lookThrough(o.entry))});this.renderer=new lw({canvas:t,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=ai,this.backdrop=new ri(new wl(2,2),new Zi({uniforms:{uSize:{value:new pe(1,1)}},vertexShader:Pw,fragmentShader:zw,depthTest:!1,depthWrite:!1})),this.backdrop.frustumCulled=!1,this.backdrop.renderOrder=-1,this.scene.add(this.backdrop),this.root.scale.set(1,-1,-1),this.scene.add(this.root),this.camera.position.set(2,1,3),this.orbit=new uw(this.camera,t),this.orbit.enableDamping=!0,this.orbit.mouseButtons.MIDDLE=-1;const n=this.orbit,a=this.orbit.update.bind(this.orbit),o=new Q(0,1,0);this.orbit.update=c=>(n._quat.setFromUnitVectors(this.camera.up,o),n._quatInverse.copy(n._quat).invert(),a(c)),t.addEventListener("contextmenu",this.contextMenu),t.addEventListener("dblclick",this.doubleClick),t.addEventListener("pointerdown",this.pointerDown,{capture:!0}),t.addEventListener("pointermove",this.pointerMove,{capture:!0}),t.addEventListener("pointerup",this.pointerUp),t.addEventListener("wheel",this.release,{capture:!0,passive:!0}),window.addEventListener("keydown",this.keyDown),window.addEventListener("keyup",this.keyUp),window.addEventListener("blur",this.blur)}updateProjection(){this.camera.updateProjectionMatrix();const t=this.camera.projectionMatrix.elements;t[0]*=this.projection.x,t[8]=this.projection.y/this.camera.aspect,t[9]=this.projection.z,this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert()}resize(t,n){this.renderer.setSize(t,n,!1),this.camera.aspect=t/n,this.updateProjection();const a=this.renderer.getDrawingBufferSize(new pe);this.lines.forEach(o=>o.resolution.copy(a)),this.points.forEach(o=>this.sizePoints(o)),this.backdrop.material.uniforms.uSize.value.copy(a)}sizePoints(t){t.uniforms.uRadius.value=t.userData.diameter/2*this.renderer.getPixelRatio(),t.uniforms.uViewportHeight.value=this.renderer.getDrawingBufferSize(new pe).y}async setScene(t){const n=++this.generation,a=new yb,o=new Map;if(await Promise.all(t.images.map(async _=>{const g=await a.loadAsync(_.url);g.colorSpace=ai,o.set(_.url,g)})),n!==this.generation){o.forEach(_=>_.dispose());return}this.textures.forEach(_=>_.dispose()),this.textures=o,this.data=t;const c=this.prepared.get(t);if(c)this.timeRange=c.timeRange,this.pointRanks=c.pointRanks,this.pointCount=c.pointCount,this.statistics=c.statistics,this.center.copy(c.center),this.radius=c.radius;else{const _=[...t.images.map(x=>x.time),...t.points.map(x=>x.time),...t.cameras.map(x=>x.time),...t.tracks.flatMap(x=>x.times)];this.timeRange=_.length?[Math.min(..._),Math.max(..._)]:[0,0];const g=t.points.flatMap(x=>x.confidence?[x.confidence]:[]);this.pointRanks=new Map(y0(g).map((x,M)=>[g[M],x])),this.pointCount=g.reduce((x,M)=>x+M.length,0),this.statistics=new Map(t.tracks.map(x=>[x,Gw(x)])),this.measure(t),this.prepared.set(t,{timeRange:this.timeRange,pointRanks:this.pointRanks,pointCount:this.pointCount,statistics:this.statistics,center:this.center.clone(),radius:this.radius,trackRanks:new Map})}this.palettes.clear();const{confidence:h,imagePlanes:f,...p}=t.presentation.settings??{},m={...this.defaults,...p};if(f===!1&&(m.planeOpacity=0),p.confidenceKeep===void 0&&h!==void 0&&this.pointCount){const _=t.points.flatMap(g=>g.confidence??[]);m.confidenceKeep=_.reduce((g,x)=>g+ +(x>=h),0)/_.length}return this.time=this.range()[0],this.trackRanks=new Map,this.fit(!1),t.presentation.view&&this.setCamera(t.presentation.view),this.setSettings(m),m}measure(t){const n=[],a=Math.max(1,Math.floor((t.points.reduce((p,m)=>p+m.positions.length,0)+t.tracks.reduce((p,m)=>{var _;return p+m.positions.length*(((_=m.positions[0])==null?void 0:_.length)??0)},0))/1e5));let o=0;const c=p=>{o++%a===0&&n.push(p)};if(t.points.forEach(p=>p.positions.forEach(c)),t.tracks.forEach(p=>p.positions.forEach((m,_)=>m.forEach((g,x)=>{(!p.valid||p.valid[_][x])&&c(g)}))),t.cameras.forEach(p=>n.push([p.pose[0][3],p.pose[1][3],p.pose[2][3]])),!n.length){this.center.set(0,0,0),this.radius=1;return}const[h,f]=[0,1].map(p=>[0,1,2].map(m=>{const _=n.map(g=>g[m]).sort((g,x)=>g-x);return _[Math.round((p?.99:.01)*(_.length-1))]}));this.center.set((h[0]+f[0])/2,-(h[1]+f[1])/2,-(h[2]+f[2])/2),this.radius=Math.max(.01,Math.hypot(f[0]-h[0],f[1]-h[1],f[2]-h[2])/2)}setDefaults(t){return this.defaults=t,!this.data}rankTracks(){var c;const t=this.data&&this.prepared.get(this.data),n=t==null?void 0:t.trackRanks.get(this.settings.trajectoryMode);if(n){this.trackRanks=n.ranks,this.trackCount=n.count;return}const a=(((c=this.data)==null?void 0:c.tracks)??[]).filter(h=>h.confidence&&(!h.mode||h.mode===this.settings.trajectoryMode)),o=a.map(h=>Float64Array.from(h.confidence[0],(f,p)=>h.confidence.reduce((m,_)=>m+_[p],0)/h.confidence.length));this.trackRanks=new Map(y0(o).map((h,f)=>[a[f],h])),this.trackCount=o.reduce((h,f)=>h+f.length,0),t==null||t.trackRanks.set(this.settings.trajectoryMode,{ranks:this.trackRanks,count:this.trackCount})}setSettings(t){if(t===this.settings)return;["trailGradient","trailBoxes","trailOutside"].some(o=>t[o]!==this.settings[o])&&this.palettes.clear();const a=t.trajectoryMode!==this.settings.trajectoryMode;this.settings=t,(a||!this.trackRanks.size)&&this.rankTracks(),this.pointDrop=Math.round((1-t.confidenceKeep)*this.pointCount),this.trackDrop=Math.round((1-t.confidenceKeep)*this.trackCount),this.backdrop.visible=t.background==="gradient",this.scene.background=t.background==="gradient"?null:new Be(t.backgroundColor),this.rebuild()}range(){return[...this.timeRange]}setTime(t){t!==this.time&&(this.time=t,this.rebuild(),this.following&&!this.transition&&this.follow(this.following))}color(t,n){const a=t==="rgb"?n.rgb:t==="normals"?n.normal:t==="cloud_normals"?n.cloud:void 0,o=!a||t!=="rgb"&&!a[0]&&!a[1]&&!a[2];if(t==="rgb"||t==="normals"||t==="cloud_normals")return(o?S0:a).map(ml);if(t==="confidence"||t==="visibility"){const p=t==="confidence"?n.rank:n.visibility;return(p===void 0?S0:ux(p)).map(ml)}const[c,h]=this.range(),f=t==="time"?(n.time-c)/Math.max(1e-6,h-c):1-Math.min(1,Math.max(0,(n.p[2]+this.center.z+this.radius)/(2*this.radius)));return Au(f).map(ml)}kept(t,n,a){return t===void 0?void 0:Math.min(1,Math.max(0,(t-n-1)/Math.max(1,a-n-1)))}clear(){this.root.traverse(t=>{(t instanceof db||t instanceof fb||t instanceof ri)&&(t.geometry.dispose(),(Array.isArray(t.material)?t.material:[t.material]).forEach(a=>a.dispose()))}),this.root.clear(),this.lines=[],this.points=[],this.frusta=[]}lineMaterial(t){const n=new cx(t);return n.resolution.copy(this.renderer.getDrawingBufferSize(new pe)),this.lines.push(n),n}addPoints(t,n,a,o=1,c=!1){if(!t.length)return;const h=new nx;h.setAttribute("position",new vi(Iw,3)),h.setAttribute("instancePosition",new nd(new Float32Array(t),3)),h.setAttribute("instanceColor",new nd(new Float32Array(n),3)),h.instanceCount=t.length/3;const f=o<1,p=new Zi({uniforms:{uRadius:{value:1},uViewportHeight:{value:1},uOpacity:{value:o}},vertexShader:Bw,fragmentShader:Fw,alphaToCoverage:!f&&!c,transparent:f||c,depthWrite:!f});p.userData.diameter=a,this.sizePoints(p),this.points.push(p);const m=new ri(h,p);m.frustumCulled=!1,c&&(m.renderOrder=2),this.root.add(m)}palette(t){return this.palettes.has(t)||this.palettes.set(t,ww(this.settings,t.source_uv??t.positions[0].map(()=>[.5,.5]),t.colors,t.source_frames??t.positions[0].map(()=>t.source_frame??0))),this.palettes.get(t)}shown(t){const n=t.match(/\/(\d+)$/);return!n||!this.settings.hiddenLayers.includes(Number(n[1]))}rebuild(){if(this.clear(),!this.data)return;const t=this.settings,n=new Map;for(const g of this.data.points)g.time<=this.time&&n.set(g.name,Math.max(n.get(g.name)??-1/0,g.time));const a=[],o=[];for(const g of this.data.points)this.shown(g.name)&&(!t.allClouds&&g.time!==n.get(g.name)||g.positions.forEach((x,M)=>{var b,T,S;g.confidence&&this.pointRanks.get(g.confidence)[M]<=this.pointDrop||(a.push(...x),o.push(...this.color(t.pointColor,{rgb:(b=g.colors)==null?void 0:b[M],p:x,time:g.time,normal:(T=g.normals)==null?void 0:T[M],cloud:(S=g.cloud_normals)==null?void 0:S[M],rank:this.kept(g.confidence&&this.pointRanks.get(g.confidence)[M],this.pointDrop,this.pointCount),visibility:g.visibility&&g.visibility[M]/255})))}));this.addPoints(a,o,t.pointSize);const c={positions:[],colors:[],start:[],end:[]},h={positions:[],colors:[]},f={positions:[],colors:[]},p={positions:[],colors:[]},m=t.motion.threshold/100*2*this.radius,_={still:0,moving:0};for(const g of this.data.tracks){if(!g.times.length||!this.shown(g.name)||g.mode&&g.mode!==t.trajectoryMode)continue;const{radius:x,median:M}=this.statistics.get(g);let b=0;for(;b+1<g.times.length&&g.times[b+1]<=this.time;)b++;const T=Math.min(b+1,g.times.length-1),S=t.frameTransition==="direct"||T===b||this.time<g.times[0]?0:(this.time-g.times[b])/(g.times[T]-g.times[b]),y=this.trackRanks.get(g),F=(z,P)=>!y||y[P]>this.trackDrop,O=(z,P)=>{var w;return 1/(1+Math.exp(-(((w=g.visibility_logits)==null?void 0:w[z][P])??100)))>=t.visibility},U=(z,P)=>{var w;return(((w=g.valid)==null?void 0:w[z][P])??!0)&&F(z,P)&&(t.occluded!=="hide"||O(z,P))},H=t.trailColor==="position"?this.palette(g):null,L=(z,P,w,A)=>{var k,lt,$;return{rgb:(k=g.colors)==null?void 0:k[P],p:w,time:A,normal:(lt=g.normals)==null?void 0:lt[z][P],cloud:($=g.cloud_normals)==null?void 0:$[z][P],rank:this.kept(y==null?void 0:y[P],this.trackDrop,this.trackCount),visibility:g.visibility_logits&&1/(1+Math.exp(-g.visibility_logits[z][P]))}};g.positions[b].forEach((z,P)=>{const w=t.motion.enabled&&x[P]<=m;_[w?"still":"moving"]++;let A;if(w&&t.motion.collapse){if(!g.positions.some((ft,G)=>U(G,P)))return;A=[M[P*3],M[P*3+1],M[P*3+2]]}else{if(!U(b,P)||S>0&&!U(T,P))return;A=z.map((ft,G)=>ft+(g.positions[T][P][G]-ft)*S)}let k=b;for(;k>Math.max(0,b-t.trailLength)&&U(k-1,P);)k--;const lt=!w&&t.trails&&t.trailLength>0&&Hw(P,t.trailDensity)&&(k<b||S>0),$=t.occluded==="dim"&&!(O(b,P)&&(S===0||O(T,P)))?p:lt?f:h;if($.positions.push(...A),$.colors.push(...t.motion.enabled&&t.motion.tint?w?Cw:Dw:this.color(t.pointColor,L(b,P,A,this.time))),!lt)return;const ot=(ft,G,nt)=>{var N;const W=H?Array.from(H.subarray(P*3,P*3+3),ml):t.trailColor==="confidence"?Au(Math.min(1,Math.log1p(Math.max(0,(((N=g.confidence)==null?void 0:N[nt][P])??1)-1))/4)).map(ml):this.color(t.trailColor,L(Math.min(nt+1,g.times.length-1),P,G,g.times[Math.min(nt+1,g.times.length-1)]));c.positions.push(...ft,...G),c.colors.push(...W,...W);const tt=b+S-k;c.start.push((nt-k)/Math.max(1e-6,tt)),c.end.push(Math.min(1,(nt+1-k)/Math.max(1e-6,tt)))};for(let ft=k;ft<b;ft++)ot(g.positions[ft][P],g.positions[ft+1][P],ft);S>0&&ot(g.positions[b][P],A,b)})}if(this.onMotionCounts(_),this.addPoints(h.positions,h.colors,t.pointSize),this.addPoints(f.positions,f.colors,t.pointSize,1,!0),this.addPoints(p.positions,p.colors,t.pointSize,Nw,!0),c.positions.length){const g=new xu().setPositions(c.positions).setColors(c.colors);for(const[T,S]of[["instanceProgressStart",c.start],["instanceProgressEnd",c.end]])g.setAttribute(T,new nd(t.trailFade?new Float32Array(S):new Float32Array(S.length).fill(1),1));const x=this.lineMaterial({vertexColors:!0,linewidth:t.trailWidth,transparent:!0,opacity:t.trailOpacity,depthWrite:!1});x0(x);const M=new ou(g,x);M.renderOrder=1;const b=this.lineMaterial({linewidth:t.trailWidth});x0(b),kw(b,Lw*2*this.radius),this.root.add(M,new ou(g,b))}t.cameras&&this.addCameras()}addCameras(){if(!this.data)return;const t=this.settings,n=this.data.cameras.filter(c=>this.shown(c.name)),a=new Map;for(const c of n)c.time<=this.time&&a.set(c.name,Math.max(a.get(c.name)??-1/0,c.time));const o=new Map;for(const c of n)o.set(c.name,[...o.get(c.name)??[],c.time]);if(o.forEach(c=>c.sort((h,f)=>h-f)),t.cameras){const c=new Map;for(const h of n)c.set(h.name,[...c.get(h.name)??[],h]);for(const h of c.values()){if(h.length<2)continue;const f=h.sort((p,m)=>p.time-m.time).flatMap((p,m,_)=>m?[..._[m-1].pose.slice(0,3).map(g=>g[3]),...p.pose.slice(0,3).map(g=>g[3])]:[]);this.root.add(new ou(new xu().setPositions(f),this.lineMaterial({color:vd(0),linewidth:Math.max(1,t.frustumWidth*.75),transparent:!0,opacity:.55})))}}for(const c of n){const h=c.intrinsics,f=this.radius*t.frustumSize,p=[[-.5,-.5],[c.width-.5,-.5],[c.width-.5,c.height-.5],[-.5,c.height-.5]].map(([g,x])=>[(g-h[0][2])/h[0][0]*f,(x-h[1][2])/h[1][1]*f,f]),m=new eo;m.applyMatrix4(new Ze().fromArray(c.pose.flat()).transpose());const _=a.get(c.name)===c.time;if(t.cameras){const g=o.get(c.name),x=g.indexOf(c.time),M=x-g.indexOf(a.get(c.name)??g[0]),b=this.lineMaterial({color:vd(_?0:x+1),linewidth:t.frustumWidth,transparent:!0,opacity:_?.9:Math.max(.16,.42*Math.exp(-Math.abs(M)/14))}),T=p.flatMap((S,y)=>[0,0,0,...S,...S,...p[(y+1)%4]]);m.add(new ou(new xu().setPositions(T),b))}if(_&&t.planeOpacity>0){const g=this.data.images.filter(x=>x.name===c.image&&x.time<=this.time).sort((x,M)=>M.time-x.time)[0];if(g){const x=new Oi().setFromPoints(p.map(M=>new Q(...M)));x.setIndex([0,1,2,0,2,3]),x.setAttribute("uv",new Li([0,1,1,1,1,0,0,0],2)),m.add(new ri(x,new Cp({map:this.textures.get(g.url),side:ra,transparent:!0,opacity:t.planeOpacity,depthWrite:!1})))}}m.children.length&&(this.root.add(m),this.frusta.push({object:m,entry:c}))}}through(t){this.root.updateMatrixWorld();const n=new Ze().fromArray(t.pose.flat()).transpose().premultiply(this.root.matrixWorld),a=new Q,o=new ca;n.decompose(a,o,new Q),o.multiply(new ca().setFromAxisAngle(new Q(1,0,0),Math.PI));const c=t.intrinsics,h=t.width/t.height,f=c[0][0]/t.width,p=c[1][1]/t.height,m=(c[0][2]+.5)/t.width,_=(c[1][2]+.5)/t.height,g=new Q(0,0,-1).applyQuaternion(o);return{position:a,quaternion:o,up:new Q(0,1,0).applyQuaternion(o),target:a.clone().addScaledVector(g,this.radius*.65),fov:2*Math.atan(.5/p)*180/Math.PI,projection:new Q(f*h/p,(1-2*m)*h,2*_-1)}}camerasAt(t){var n;return(n=this.data)==null?void 0:n.cameras.filter(a=>a.name===t&&a.time<=this.time).sort((a,o)=>o.time-a.time)[0]}follow(t){const n=this.camerasAt(t);if(!n)return;const a=this.through(n);this.camera.position.copy(a.position),this.camera.quaternion.copy(a.quaternion),this.camera.up.copy(a.up),this.camera.fov=a.fov,this.projection.copy(a.projection),this.updateProjection(),this.orbit.target.copy(a.target)}lookThrough(t){const n=this.through(t);this.following=null,this.transition={started:performance.now(),follow:t.name,position:this.camera.position.clone(),endPosition:n.position,target:this.orbit.target.clone(),endTarget:n.target,up:this.camera.up.clone(),endUp:n.up,quaternion:this.camera.quaternion.clone(),endQuaternion:n.quaternion,fov:this.camera.fov,endFov:n.fov,projection:this.projection.clone(),endProjection:n.projection}}fit(t=!0){const n=new Q(0,.3*this.radius,.8*this.radius);this.camera.near=this.radius/1e3,this.camera.far=this.radius*100;const a=new ca().setFromRotationMatrix(new Ze().lookAt(n,this.center,new Q(0,1,0)));if(this.following=null,t){this.transition={started:performance.now(),follow:null,position:this.camera.position.clone(),endPosition:n,target:this.orbit.target.clone(),endTarget:this.center.clone(),up:this.camera.up.clone(),endUp:new Q(0,1,0),quaternion:this.camera.quaternion.clone(),endQuaternion:a,fov:this.camera.fov,endFov:_d,projection:this.projection.clone(),endProjection:new Q(1,0,0)};return}this.transition=null,this.camera.position.copy(n),this.camera.quaternion.copy(a),this.camera.up.set(0,1,0),this.camera.fov=_d,this.projection.set(1,0,0),this.updateProjection(),this.orbit.target.copy(this.center),this.orbit.update()}view(){return{position:this.camera.position.toArray(),quaternion:this.camera.quaternion.toArray(),target:this.orbit.target.toArray(),up:this.camera.up.toArray(),fov:this.camera.fov,near:this.camera.near,far:this.camera.far,zoom:this.camera.zoom,projection:this.projection.toArray()}}setCamera(t){this.transition=null,this.following=null,this.camera.position.fromArray(t.position),this.camera.quaternion.fromArray(t.quaternion),this.camera.up.fromArray(t.up),this.orbit.target.fromArray(t.target),this.camera.fov=t.fov,this.camera.near=t.near,this.camera.far=t.far,this.camera.zoom=t.zoom,this.projection.fromArray(t.projection??[1,0,0]),this.updateProjection()}render(t=0){this.keys.size&&this.move(t);const n=this.transition;if(n){const a=Math.min(1,(performance.now()-n.started)/Uw),o=1-(1-a)**3;this.camera.position.lerpVectors(n.position,n.endPosition,o),this.orbit.target.lerpVectors(n.target,n.endTarget,o),this.camera.up.lerpVectors(n.up,n.endUp,o).normalize(),this.camera.quaternion.slerpQuaternions(n.quaternion,n.endQuaternion,o),this.camera.fov=wp.lerp(n.fov,n.endFov,o),this.projection.lerpVectors(n.projection,n.endProjection,o),this.updateProjection(),a===1&&(this.transition=null,this.following=n.follow,n.follow&&this.follow(n.follow))}else this.following||this.orbit.update();this.renderer.render(this.scene,this.camera)}move(t){const n=new Q;for(const c of this.keys)gd[c]&&n.add(new Q(...gd[c]));if(!n.lengthSq())return;this.release();const a=this.radius*.8*(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?4:1),o=n.normalize().applyQuaternion(this.camera.quaternion).multiplyScalar(a*t);this.camera.position.add(o),this.orbit.target.add(o)}dispose(){this.generation++,this.clear(),this.textures.forEach(n=>n.dispose()),this.backdrop.geometry.dispose(),this.backdrop.material.dispose();const t=this.renderer.domElement;t.removeEventListener("contextmenu",this.contextMenu),t.removeEventListener("dblclick",this.doubleClick),t.removeEventListener("pointerdown",this.pointerDown,{capture:!0}),t.removeEventListener("pointermove",this.pointerMove,{capture:!0}),t.removeEventListener("pointerup",this.pointerUp),t.removeEventListener("wheel",this.release,{capture:!0}),window.removeEventListener("keydown",this.keyDown),window.removeEventListener("keyup",this.keyUp),window.removeEventListener("blur",this.blur),this.orbit.dispose(),this.renderer.dispose()}}async function Fn(r,t){const n=await fetch(r,t);if(!n.ok){const a=await n.text();let o=a||n.statusText;try{const c=JSON.parse(a).detail;o=Array.isArray(c)?c.map(h=>h.msg).join("; "):c??o}catch{}throw new Error(`${n.status} ${o}`)}return n}const jw=()=>v.jsx("svg",{viewBox:"0 0 16 16","aria-hidden":"true",children:v.jsx("path",{d:"M1.5 4.2c0-.7.6-1.2 1.2-1.2h3.4l1.4 1.5h5.8c.7 0 1.2.5 1.2 1.2v6.6c0 .7-.5 1.2-1.2 1.2H2.7c-.6 0-1.2-.5-1.2-1.2z",fill:"currentColor"})}),Xw=()=>v.jsxs("svg",{viewBox:"0 0 16 16","aria-hidden":"true",children:[v.jsx("rect",{x:"1.5",y:"3",width:"13",height:"10",rx:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.3"}),v.jsx("path",{d:"m6.5 5.8 3.6 2.2-3.6 2.2z",fill:"currentColor"})]}),M0=()=>v.jsxs("svg",{viewBox:"0 0 16 16","aria-hidden":"true",children:[v.jsx("rect",{x:"1.5",y:"3",width:"13",height:"10",rx:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.3"}),v.jsx("path",{d:"m3.5 11 3-3.5 2.2 2.4 1.5-1.4 2.3 2.5z",fill:"currentColor"}),v.jsx("circle",{cx:"10.8",cy:"6",r:"1.1",fill:"currentColor"})]}),Ww=()=>v.jsx("svg",{viewBox:"0 0 16 16","aria-hidden":"true",children:v.jsx("path",{d:"M3 1.5h6l4 4v9H3zM9 1.5v4h4",fill:"none",stroke:"currentColor",strokeWidth:"1.3"})}),fx=r=>/\.(jpe?g|png|webp|bmp|tiff?)$/i.test(r),cu=r=>/\.(mp4|mov|m4v|avi|mkv|webm)$/i.test(r);function hx(r){const{host:t,start:n,current:a,onPick:o,onPickMany:c,onError:h}=r,f=r.kind==="scene",[p,m]=At.useState(Array.isArray(n)?n[0]:n),[_,g]=At.useState(""),[x,M]=At.useState(null),[b,T]=At.useState(!0),[S,y]=At.useState([]),F=x?f?x.scenes:[...x.videos,...x.image_files]:[],O=P=>y(w=>f?[P]:w.includes(P)?w.filter(A=>A!==P):[...w,P]),U=async(P,w)=>(await Fn(`/api/browse${P?`?${new URLSearchParams({path:P})}`:""}`,{signal:w})).json(),H=P=>{M(P),g(P.path),y([...P.videos,...P.image_files].filter(w=>w.path===a).map(w=>w.path))};At.useEffect(()=>{const P=new AbortController;return T(!0),U(p,P.signal).then(H).catch(w=>{P.signal.aborted||h(String(w))}).finally(()=>{P.signal.aborted||T(!1)}),()=>P.abort()},[p]);const L=P=>f&&/\.(json|npz)$/i.test(P)?o(P):U(P).then(w=>{w.file?o(w.file):(m(w.path),H(w))}).catch(w=>h(String(w))),z=()=>{if(r.kind==="scene"){r.onPick(S[0]);return}if(!x)return;const P=x.image_files.filter(A=>S.includes(A.path)).map(A=>A.path),w=[...x.folders,...x.videos].filter(A=>S.includes(A.path)).map(A=>A.path);if(P.length&&w.push(P.length===1?P[0]:P),!r.onPickMany&&w.length>1){h("Choose one input, or use Multi-view streams to add several cameras.");return}r.onPickMany?r.onPickMany(w):r.onPick(w[0])};return v.jsxs("div",{className:"browser",children:[v.jsxs("p",{className:"hint",children:["Open files on ",t||"the server"," directly, without uploading."]}),v.jsxs("form",{className:"path-bar",onSubmit:P=>{P.preventDefault(),_.trim()&&L(_.trim())},children:[v.jsx("button",{type:"button",className:"icon-button","aria-label":"Parent folder",disabled:!(x!=null&&x.parent),onClick:()=>m(x.parent),children:"‹"}),v.jsx("input",{id:f?"scene-path-input":"path-input",disabled:b,"aria-label":"Path on the server",value:_,spellCheck:!1,placeholder:"Folder or file path",onChange:P=>g(P.target.value),onFocus:P=>P.target.select()}),v.jsx("button",{type:"submit",disabled:b,className:"icon-button","aria-label":"Open path",children:"↵"})]}),v.jsxs("ul",{className:"browser-list",id:f?"scene-browser":"clip-browser",children:[!x&&v.jsx("li",{className:"browser-empty",children:b?"Loading…":"Enter a folder or file path"}),!f&&!!(x!=null&&x.images)&&v.jsx("li",{children:v.jsxs("button",{className:"browser-row use-folder",onClick:()=>o(x.path),children:[v.jsx(M0,{}),v.jsxs("span",{children:["Use all ",x.images," images in this folder"]})]})}),x==null?void 0:x.folders.map(P=>v.jsxs("li",{className:"browser-select-row",children:[c&&(P.images??0)>0&&v.jsx("input",{type:"checkbox","aria-label":`Select ${P.name}`,checked:S.includes(P.path),onChange:()=>O(P.path)}),v.jsxs("button",{className:"browser-row",disabled:P.images===null,onClick:()=>m(P.path),children:[v.jsx(jw,{}),v.jsx("span",{children:P.name}),v.jsx("i",{children:P.images===null?"Unavailable":"›"})]})]},P.path)),F.map(P=>v.jsxs("li",{className:"browser-select-row",children:[v.jsx("input",{type:f?"radio":"checkbox",name:f?"saved-scene":void 0,"aria-label":`Select ${P.name}`,checked:S.includes(P.path),onChange:()=>O(P.path)}),v.jsxs("button",{className:"browser-row","aria-current":P.path===a||void 0,onClick:()=>O(P.path),children:[f?v.jsx(Ww,{}):fx(P.name)?v.jsx(M0,{}):v.jsx(Xw,{}),v.jsx("span",{children:P.name})]})]},P.path)),x&&!x.folders.length&&!F.length&&v.jsx("li",{className:"browser-empty",children:f?"No folders or saved scenes here":"No folders, videos or images here"})]}),v.jsxs("div",{className:"row",children:[!f&&v.jsx("button",{disabled:!x,onClick:()=>y(x?[...c?x.folders.filter(P=>P.images):[],...F].map(P=>P.path):[]),children:"Select all"}),v.jsx("button",{className:"primary",disabled:!S.length,onClick:z,children:f?"Open selected":`Add selected (${S.length})`})]})]})}const uu=1e3,yu=r=>new URLSearchParams((Array.isArray(r)?r:[r]).map(t=>["path",t])),gs=r=>JSON.stringify(r),bl=(r,t,n)=>`/api/frame?${yu(r)}&${new URLSearchParams({index:String(t),size:String(Math.max(320,n))})}`,b0=(r,t)=>r.localeCompare(t,void 0,{numeric:!0});function dx({host:r,start:t,current:n,onPick:a,onPickMany:o,onError:c}){const[h,f]=At.useState("device"),[p,m]=At.useState(!1),[_,g]=At.useState([]),x=_.filter(S=>S.selected),M=S=>{if(!o&&S.length>1){c("Choose one input, or use Multi-view streams to add several cameras.");return}o?o(S):a(S[0])},b=(S,y)=>{const F=S.filter(H=>fx(H.name)||cu(H.name));if(!F.length){c("No supported images or videos selected.");return}if(!y&&F.length!==S.length){c("Select only supported images or videos.");return}const O=new Map;for(const H of F){const L=y?H.webkitRelativePath.split("/").slice(0,-1).join("/"):"",z=cu(H.name)?`${L}/${H.name}`:`${L}/`;O.has(z)||O.set(z,{name:cu(H.name)?H.name:L.split("/").at(-1)||(F.length===1?H.name:"Selected images"),files:[],selected:!0}),O.get(z).files.push(H)}const U=[...O.entries()].sort(([H],[L])=>b0(H,L)).map(([,H])=>({...H,files:H.files.sort((L,z)=>b0(L.name,z.name))}));g(U),U.length===1&&U[0].files.length<=uu&&T(U)},T=async(S=x)=>{if(!o&&S.length>1){c("Choose one input, or use Multi-view streams to add several cameras.");return}m(!0);try{const y=[];for(const F of S){const O=new FormData;F.files.slice(0,uu).forEach(H=>O.append("files",H)),O.append("name",F.name);const U=await Fn("/api/upload",{method:"POST",body:O});y.push((await U.json()).path)}M(y),g([])}catch(y){c(String(y))}finally{m(!1)}};return v.jsxs("div",{className:"browser",children:[v.jsxs("div",{className:"source-tabs",role:"tablist","aria-label":"Input location",children:[v.jsx("button",{role:"tab","aria-selected":h==="device",disabled:p,onClick:()=>f("device"),children:"From device"}),v.jsx("button",{role:"tab","aria-selected":h==="server",disabled:p,onClick:()=>f("server"),children:"From server"})]}),h==="device"?v.jsxs(v.Fragment,{children:[v.jsxs("p",{className:"hint",children:["Copy files from this device to ",r||"the server","."]}),v.jsxs("details",{className:"upload-menu",children:[v.jsx("summary",{className:"button",children:"Upload…"}),v.jsxs("div",{children:[v.jsxs("label",{className:"button ghost",children:["Files…",v.jsx("input",{id:"media-input",type:"file",multiple:!0,accept:".jpg,.jpeg,.png,.webp,.bmp,.tif,.tiff,.mp4,.mov,.m4v,.avi,.mkv,.webm",hidden:!0,disabled:p,onChange:S=>{var F;const y=Array.from(S.target.files??[]);S.target.value="",(F=S.currentTarget.closest("details"))==null||F.removeAttribute("open"),y.length&&b(y,!1)}})]}),v.jsxs("label",{className:"button ghost",children:["Folder…",v.jsx("input",{id:"folder-input",type:"file",multiple:!0,hidden:!0,disabled:p,ref:S=>{S==null||S.setAttribute("webkitdirectory","")},onChange:S=>{var F;const y=Array.from(S.target.files??[]);S.target.value="",(F=S.currentTarget.closest("details"))==null||F.removeAttribute("open"),y.length&&b(y,!0)}})]})]})]}),!!_.length&&v.jsxs(v.Fragment,{children:[v.jsx("ul",{className:"upload-selection",children:_.map((S,y)=>v.jsx("li",{children:v.jsxs("label",{children:[v.jsx("input",{type:"checkbox",checked:S.selected,disabled:p,onChange:()=>g(_.map((F,O)=>O===y?{...F,selected:!F.selected}:F))}),v.jsxs("span",{children:[S.name,v.jsx("small",{children:cu(S.files[0].name)?"Video":S.files.length>uu?`Using the first ${uu.toLocaleString()} of ${S.files.length.toLocaleString()} images`:`${S.files.length} image${S.files.length===1?"":"s"}`})]})]})},y))}),_.length>1&&v.jsx("p",{className:"hint",children:"Each selection is a separate camera input."}),v.jsxs("div",{className:"row",children:[v.jsx("button",{className:"primary",disabled:p||!x.length||!o&&x.length>1,onClick:()=>void T(),children:p?"Uploading…":`Upload ${x.length>1?`${x.length} inputs`:"selected"}`}),v.jsx("button",{disabled:p,onClick:()=>g([]),children:"Clear"})]}),!o&&x.length>1&&v.jsx("p",{className:"hint",children:"Select one input here, or add multiple inputs in Multi-view streams."})]})]}):v.jsx(hx,{host:r,start:t,current:n,onPick:a,onPickMany:o,onError:c})]})}function px({clip:r,host:t,onChange:n,onRemove:a,onRename:o}){const c=r.times&&r.frames>1?(r.frames-1)/(r.times[r.frames-1]-r.times[0]):null;return v.jsxs("div",{className:"clip-card",children:[v.jsx("img",{src:bl(r.path,0,160),alt:""}),v.jsxs("div",{children:[o?v.jsx("input",{type:"text","aria-label":"Camera name",value:r.name,onChange:h=>o(h.target.value)}):v.jsx("strong",{title:Array.isArray(r.path)?r.path.join(`
`):r.path,children:r.name}),v.jsxs("span",{children:[r.kind==="video"?"Video":r.frames===1?"Image":"Images"," · ",r.frames," frame",r.frames===1?"":"s",c?` · ${Math.round(c)} fps`:""]}),v.jsx("span",{children:r.origin==="device"?"Uploaded from device":`Server · ${t}`}),v.jsxs("div",{className:"row clip-actions",children:[v.jsx("button",{id:o?void 0:"change-clip",onClick:n,children:"Replace"}),v.jsx("button",{"aria-label":`Remove ${r.name}`,onClick:a,children:"Remove"})]})]})]})}function qw({streams:r,host:t,root:n,onChange:a,onAdd:o,onError:c}){const[h,f]=At.useState(!1),[p,m]=At.useState(),_=async g=>{await o(g,p),f(!1),m(void 0)};return v.jsxs(v.Fragment,{children:[v.jsx("p",{className:"hint",children:"One video or image sequence per camera."}),v.jsx("ol",{className:"stream-list",children:r.map((g,x)=>v.jsx("li",{children:v.jsx(px,{clip:g,host:t,onChange:()=>{m(x),f(!0)},onRemove:()=>{f(!1),m(void 0),a(r.filter((M,b)=>b!==x))},onRename:M=>a(r.map((b,T)=>T===x?{...b,name:M}:b))})},gs(g.path)))}),h||!r.length?v.jsxs(v.Fragment,{children:[v.jsx(dx,{host:t,start:p===void 0?n:r[p].path,onPick:g=>void _([g]),onPickMany:p===void 0?g=>void _(g):void 0,onError:c}),!!r.length&&v.jsx("button",{onClick:()=>{f(!1),m(void 0)},children:"Done"})]}):v.jsx("button",{className:"wide",onClick:()=>{m(void 0),f(!0)},children:"Add cameras…"})]})}function Yw({host:r,root:t,onOpen:n,onClose:a}){const o=At.useRef(null),[c,h]=At.useState("device"),[f,p]=At.useState(!1),[m,_]=At.useState("");At.useEffect(()=>{var x;(x=o.current)==null||x.showModal()},[]);const g=async x=>{_(""),p(!0);try{await n(x),a()}catch(M){_(String(M))}finally{p(!1)}};return v.jsxs("dialog",{ref:o,className:"scene-dialog","aria-labelledby":"open-scene-title",onCancel:x=>{f?x.preventDefault():a()},children:[v.jsxs("div",{className:"group-title",children:[v.jsx("h2",{id:"open-scene-title",children:"Open saved results"}),v.jsx("button",{className:"icon-button","aria-label":"Close Open dialog",disabled:f,onClick:a,children:"×"})]}),v.jsx("p",{className:"hint",children:"Open predictions (.npz) or a saved view (.json) in a new tab."}),v.jsxs("fieldset",{disabled:f,children:[v.jsxs("div",{className:"source-tabs",role:"tablist","aria-label":"Saved file location",children:[v.jsx("button",{role:"tab","aria-selected":c==="device",onClick:()=>{h("device"),_("")},children:"From device"}),v.jsx("button",{role:"tab","aria-selected":c==="server",onClick:()=>{h("server"),_("")},children:"From server"})]}),c==="device"?v.jsxs(v.Fragment,{children:[v.jsx("p",{className:"hint",children:"Upload a saved file from this device."}),v.jsxs("label",{className:"button",children:["Choose file…",v.jsx("input",{id:"load-scene",type:"file",accept:".json,.npz",hidden:!0,onChange:x=>{var M;(M=x.target.files)!=null&&M[0]&&g(x.target.files[0]),x.target.value=""}})]})]}):v.jsx(hx,{kind:"scene",host:r,start:t,onPick:x=>void g(x),onError:_})]}),f&&v.jsx("p",{role:"status",children:"Opening…"}),m&&v.jsx("p",{role:"alert",className:"open-error",children:m})]})}const E0=10,ys=({start:r,stop:t,step:n,indices:a})=>a??Array.from({length:Math.max(0,Math.ceil((t-r)/n))},(o,c)=>r+c*n);function mp(r,t,n=0){return t=Math.min(r-n,t),{start:n,stop:r,step:1,indices:Array.from({length:t},(a,o)=>n+Math.round(o*(r-n-1)/Math.max(1,t-1)))}}function xd(r,t){if(t.start===0&&t.stride===1)return mp(r,t.max_frames);const n=Math.min(t.start,r-1);return{start:n,stop:Math.min(r,n+(t.max_frames-1)*t.stride+1),step:t.stride}}function yd({label:r,value:t,min:n,max:a,onChange:o}){return v.jsxs("label",{className:"number-field",children:[v.jsx("span",{children:r}),v.jsx("input",{type:"number","aria-label":r,value:t,placeholder:t===""?"Auto":void 0,title:t===""?"Enter a fixed step to replace the frame-count preset":void 0,min:n,max:a,onChange:c=>{const h=Math.round(Number(c.target.value));Number.isFinite(h)&&o(Math.min(a,Math.max(n,h)))}})]})}function Zw({clip:r,range:t,onChange:n}){const a=At.useRef(null),[o,c]=At.useState(null),h=r.frames-1,f=T=>`${h?100*T/h:0}%`,p=ys(t),m=t.stop-1,_=T=>{const S=a.current.getBoundingClientRect();return Math.round(Math.min(1,Math.max(0,(T-S.left)/S.width))*h)},g=(T,S)=>n(t.indices?mp(S,t.indices.length,T):{...t,start:T,stop:S}),x=(T,S)=>T==="start"?g(Math.min(S,m),t.stop):g(t.start,Math.max(S,t.start)+1),M=T=>r.times?`${r.times[T].toFixed(2)} s`:`#${T}`,b=(T,S)=>y=>{(y.key==="ArrowLeft"||y.key==="ArrowRight")&&x(T,Math.min(h,Math.max(0,S+(y.key==="ArrowLeft"?-1:1))))};return v.jsxs("div",{className:"frame-range",children:[v.jsxs("div",{ref:a,className:"trim",id:"frame-trim",onPointerDown:T=>{const S=_(T.clientX),y=Math.abs(S-t.start)<=Math.abs(S-m)?"start":"end";T.currentTarget.setPointerCapture(T.pointerId),c(y),x(y,S)},onPointerMove:T=>{o&&x(o,_(T.clientX))},onPointerUp:()=>c(null),onPointerCancel:()=>c(null),children:[v.jsx("div",{className:"filmstrip",children:Array.from({length:Math.min(E0,r.frames)},(T,S)=>v.jsx("img",{draggable:!1,alt:"",src:bl(r.path,Math.round(S*h/Math.max(1,Math.min(E0,r.frames)-1)),160)},S))}),v.jsx("div",{className:"trim-shade",style:{left:0,width:f(t.start)}}),v.jsx("div",{className:"trim-shade",style:{left:f(m),right:0}}),v.jsxs("div",{className:"trim-window",style:{left:f(t.start),width:`calc(${f(m)} - ${f(t.start)})`},children:[v.jsx("span",{className:"trim-handle start",role:"slider","aria-label":"First frame","aria-valuemin":0,"aria-valuemax":h,"aria-valuenow":t.start,tabIndex:0,onKeyDown:b("start",t.start)}),v.jsx("span",{className:"trim-handle end",role:"slider","aria-label":"Last frame","aria-valuemin":0,"aria-valuemax":h,"aria-valuenow":m,tabIndex:0,onKeyDown:b("end",m)})]}),p.map(T=>v.jsx("span",{className:"trim-tick",style:{left:f(T)}},T))]}),v.jsxs("div",{className:"trim-times",children:[v.jsx("span",{children:M(t.start)}),v.jsx("span",{children:M(m)})]}),v.jsxs("div",{className:"slice-fields",children:[v.jsx(yd,{label:"Start",value:t.start,min:0,max:m,onChange:T=>g(T,t.stop)}),v.jsx(yd,{label:"Stop",value:t.stop,min:t.start+1,max:r.frames,onChange:T=>g(t.start,T)}),v.jsx(yd,{label:"Step",value:t.indices?"":t.step,min:1,max:Math.max(1,r.frames),onChange:T=>n({start:t.start,stop:t.stop,step:T})})]}),v.jsxs("div",{className:"row",children:[v.jsxs("span",{className:"hint grow",id:"frame-summary",children:[v.jsx("strong",{children:p.length})," frame",p.length===1?"":"s"," · ",t.indices?"evenly spaced":v.jsxs("code",{children:["[",t.start,":",t.stop,":",t.step,"]"]})]}),v.jsxs("span",{className:"chips","aria-label":"Choose frame count",children:[[2,4,8,16,24].filter(T=>T<r.frames).map(T=>{var S;return v.jsx("button",{className:"chip","aria-pressed":t.start===0&&t.stop===r.frames&&((S=t.indices)==null?void 0:S.length)===T,onClick:()=>n(mp(r.frames,T)),children:T},T)}),v.jsx("button",{className:"chip","aria-pressed":!t.indices&&t.start===0&&t.stop===r.frames&&t.step===1,onClick:()=>n({start:0,stop:r.frames,step:1}),children:"All"})]})]})]})}function hn({title:r,hint:t,info:n,children:a,aside:o}){return v.jsxs("section",{className:"group",children:[v.jsxs("div",{className:"group-title",children:[v.jsxs("h2",{children:[r,n&&v.jsx(rr,{text:n})]}),o]}),t&&v.jsx("p",{className:"hint",children:t}),a]})}function li({label:r,value:t,options:n,onChange:a}){return v.jsx("div",{className:"segmented",role:"radiogroup","aria-label":r,children:n.map(o=>v.jsx("button",{role:"radio","aria-checked":o.value===t,onClick:()=>a(o.value),children:o.label},o.value))})}function Kw({label:r,value:t,options:n,onChange:a}){return v.jsx("div",{className:"choices",role:"radiogroup","aria-label":r,children:n.map(o=>v.jsx("button",{className:"chip",role:"radio","aria-checked":o.value===t,title:o.title,onClick:()=>a(o.value),children:o.label},o.value))})}function Ni({label:r,name:t,value:n,min:a,max:o,step:c=1,display:h,recommended:f,onChange:p}){const m=_=>`${100*(_-a)/Math.max(1e-9,o-a)}%`;return v.jsxs("div",{className:"slider",children:[v.jsxs("span",{className:"slider-label",children:[v.jsx("span",{children:r}),v.jsxs("span",{className:"slider-value",children:[f!==void 0&&v.jsxs("button",{className:"recommend","aria-label":"Reset to the recommended value",title:"Reset to the recommended value",disabled:Math.abs(n-f)<c/2,onClick:()=>p(f),children:[v.jsx("svg",{viewBox:"0 0 16 16","aria-hidden":"true",children:v.jsx("path",{d:"M3 8a5 5 0 1 0 1.6-3.7M3 3v3h3",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})}),"Recommended"]}),v.jsx("output",{children:h??n})]})]}),v.jsxs("span",{className:"slider-track",children:[v.jsx("input",{"aria-label":t??(typeof r=="string"?r:void 0),type:"range",min:a,max:o,step:c,value:n,style:{"--fill":m(n)},onChange:_=>p(Number(_.target.value))}),f!==void 0&&v.jsx("i",{className:"recommended-mark",style:{left:m(f)},title:"Recommended"})]})]})}function xl({id:r,label:t,checked:n,onChange:a}){return v.jsxs("label",{className:"switch",children:[v.jsx("span",{children:t}),v.jsx("input",{id:r,type:"checkbox",role:"switch",checked:n,onChange:o=>a(o.target.checked)})]})}const mx=(r,t=420)=>({aspectRatio:r,width:`min(100%, ${t*r}px)`,marginInline:"auto"});function rr({text:r}){return v.jsx("span",{className:"info",tabIndex:0,role:"note","aria-label":r,"data-tip":r,children:"i"})}const Sd=[{value:"x",label:"Across"},{value:"xy",label:"Corners"},{value:"y",label:"Down"},{value:"wheel",label:"Wheel"},{value:"bands",label:"Bands"}];function Qw({image:r,aspect:t,sourceFrame:n,settings:a,onChange:o}){const c=At.useRef(null),[h,f]=At.useState(null),p=a.trailBoxes.filter(b=>b.sourceFrame===void 0||b.sourceFrame===n),m=At.useMemo(()=>Object.fromEntries(Sd.map(({value:b})=>[b,Rw(b)])),[]),_=b=>{const T=c.current.getBoundingClientRect();return[Math.min(1,Math.max(0,(b.clientX-T.left)/T.width)),Math.min(1,Math.max(0,(b.clientY-T.top)/T.height))]},g=([b,T,S,y])=>[Math.min(b,S),Math.min(T,y),Math.max(b,S),Math.max(T,y)],x=b=>({left:`${b[0]*100}%`,top:`${b[1]*100}%`,width:`${(b[2]-b[0])*100}%`,height:`${(b[3]-b[1])*100}%`}),M=b=>o({trailBoxes:[...a.trailBoxes.filter(T=>T.sourceFrame!==void 0&&T.sourceFrame!==n),...b]});return v.jsxs("div",{className:"trail-boxes",children:[v.jsx(li,{label:p.length?"Gradient of new boxes":"Gradient",value:a.trailGradient,options:Sd,onChange:b=>o({trailGradient:b})}),v.jsxs("div",{ref:c,className:"box-frame",style:mx(t),id:"trail-boxes",onPointerDown:b=>{b.currentTarget.setPointerCapture(b.pointerId);const[T,S]=_(b);f([T,S,T,S])},onPointerMove:b=>{h&&f([h[0],h[1],..._(b)])},onPointerUp:()=>{if(!h)return;const b=g(h);f(null),b[2]-b[0]>.01&&b[3]-b[1]>.01&&M([...p,{rect:b,mode:a.trailGradient,sourceFrame:n}])},children:[r&&v.jsx("img",{src:r,alt:"Frame the tracks start on",draggable:!1}),(!p.length||a.trailOutside==="gradient")&&v.jsx("img",{className:"box-gradient",src:m[a.trailGradient],alt:""}),p.length>0&&a.trailOutside==="grey"&&v.jsx("div",{className:"box-grey"}),p.map((b,T)=>v.jsxs("div",{className:"box",style:x(b.rect),children:[v.jsx("img",{src:m[b.mode],alt:""}),v.jsx("span",{children:T+1})]},T)),h&&v.jsx("div",{className:"box-drag",style:x(g(h))})]}),p.length>0&&v.jsxs(v.Fragment,{children:[p.map((b,T)=>v.jsxs("div",{className:"box-row",children:[v.jsx("span",{children:T+1}),v.jsx("select",{"aria-label":`Box ${T+1} gradient`,value:b.mode,onChange:S=>M(p.map((y,F)=>F===T?{...y,mode:S.target.value}:y)),children:Sd.map(S=>v.jsx("option",{value:S.value,children:S.label},S.value))}),v.jsx("button",{className:"icon-button","aria-label":`Remove box ${T+1}`,onClick:()=>M(p.filter((S,y)=>y!==T)),children:"×"})]},T)),v.jsxs("div",{className:"field",children:[v.jsx("span",{className:"field-label",children:"Outside the boxes"}),v.jsx(li,{label:"Outside the boxes",value:a.trailOutside,options:[{value:"grey",label:"Grey"},{value:"rgb",label:"RGB"},{value:"gradient",label:"Gradient"}],onChange:b=>o({trailOutside:b})})]})]})]})}const $w=[{value:"rgb",label:"RGB"},{value:"confidence",label:"Confidence",title:"Viridis by confidence rank among the points the filter keeps"},{value:"visibility",label:"Visibility",title:"Viridis by predicted visibility probability: purple hidden, yellow visible"},{value:"normals",label:"Predicted normals",title:"Predicted normals in the reference camera: facing it reads blue"},{value:"cloud_normals",label:"PCD normals",title:"Normals estimated from neighbouring points in image space"}],Jw=[{value:"position",label:"UV position"},{value:"rgb",label:"RGB"},{value:"time",label:"Time"},{value:"confidence",label:"Conf."}],tR=[{value:"show",label:"Show"},{value:"dim",label:"Dim"},{value:"hide",label:"Hide"}],wu=(r,t=0)=>`${(r*100).toFixed(t)}%`;function Op({title:r,children:t}){return v.jsx(hn,{title:r,children:v.jsx("p",{className:"hint",children:t})})}const eR="A track is static when every valid position stays within this distance of its mean. Collapse displays it at its median, without changing predictions.";function nR({settings:r,counts:t,hasPoints:n,hasTracks:a,hasMultiviewTracks:o,onChange:c}){if(!n&&!a)return v.jsx(Op,{title:"Points",children:"No points yet. Run tracking or 3D reconstruction from the Input tab."});const h=f=>c({motion:{...r.motion,...f}});return v.jsxs(v.Fragment,{children:[o&&v.jsxs(hn,{title:"3D trajectories",children:[v.jsx(li,{label:"3D trajectory",value:r.trajectoryMode,options:[{value:"across",label:"Camera median"},{value:"source",label:"Source camera"}],onChange:f=>c({trajectoryMode:f})}),v.jsx("p",{className:"hint",children:r.trajectoryMode==="across"?"Combines visible predictions across cameras using their median at each timestep.":"Uses each track’s predictions from the camera where it was seeded."})]}),v.jsx(hn,{title:"Point color",children:v.jsx(Kw,{label:"Point color",value:r.pointColor,options:$w,onChange:f=>c({pointColor:f})})}),a&&v.jsx(hn,{title:"Static and moving",aside:v.jsx("input",{type:"checkbox",role:"switch","aria-label":"Separate static tracks",className:"switch-input",checked:r.motion.enabled,onChange:f=>h({enabled:f.target.checked})}),info:eR,children:r.motion.enabled&&v.jsxs(v.Fragment,{children:[v.jsx(Ni,{label:"Static below",value:r.motion.threshold,min:0,max:20,step:.05,display:`${r.motion.threshold.toFixed(2)}% of scene`,onChange:f=>h({threshold:f})}),v.jsxs("p",{className:"hint",children:[t.still.toLocaleString()," static, ",t.moving.toLocaleString()," moving."]}),v.jsx(xl,{label:"Static tracks at their median",checked:r.motion.collapse,onChange:f=>h({collapse:f})}),v.jsx(xl,{label:"Color static blue, moving orange",checked:r.motion.tint,onChange:f=>h({tint:f})})]})}),a&&v.jsxs(hn,{title:"Occluded points",info:"Track points the model predicts are hidden behind something, at the visibility below.",children:[v.jsx(li,{label:"Occluded points",value:r.occluded,options:tR,onChange:f=>c({occluded:f})}),v.jsx(Ni,{label:"Visible at",value:r.visibility,min:0,max:1,step:.01,display:`≥ ${r.visibility.toFixed(2)}`,onChange:f=>c({visibility:f})})]}),v.jsxs(hn,{title:"Points",children:[v.jsx(Ni,{label:"Size",value:r.pointSize,min:1,max:24,step:.5,display:`${r.pointSize} px`,onChange:f=>c({pointSize:f})}),n&&v.jsx(v.Fragment,{children:v.jsx(xl,{label:v.jsxs("span",{children:["Accumulate all frames",v.jsx(rr,{text:"Show every frame's points at once instead of only the current frame's."})]}),checked:r.allClouds,onChange:f=>c({allClouds:f})})})]})]})}function iR({settings:r,data:t,hasTracks:n,onChange:a}){var b,T;const[o,c]=At.useState(0);if(!n)return v.jsx(Op,{title:"Trails",children:"No tracks yet. Run 3D tracking or all-pixel tracking from the Input tab."});const h=[...new Set((t==null?void 0:t.tracks.flatMap(S=>S.source_frames??[S.source_frame??0]))??[])].sort((S,y)=>S-y),f=h.includes(o)?o:h[0]??0,p=t==null?void 0:t.images.filter(S=>S.name.split("/")[0]==="rgb")[f],m=(T=(b=t==null?void 0:t.metadata)==null?void 0:b.frame_info)==null?void 0:T[f],_=m==null?void 0:m.resized_size,g=(m==null?void 0:m.padding)??[0,0,0,0],x=t==null?void 0:t.cameras[0],M=_?(_[1]+g[0]+g[2])/(_[0]+g[1]+g[3]):x?x.width/x.height:16/9;return v.jsxs(v.Fragment,{children:[v.jsxs(hn,{title:"Trail color",info:"UV position colors each trail by where it starts in the start frame; drag boxes on the frame to give regions their own gradient.",children:[v.jsx(li,{label:"Trail color",value:r.trailColor,options:Jw,onChange:S=>a({trailColor:S})}),r.trailColor==="position"&&v.jsxs(v.Fragment,{children:[h.length>1&&v.jsxs("label",{className:"field-label",children:["Seed frame ",v.jsx("select",{"aria-label":"Trail color source frame",value:f,onChange:S=>c(Number(S.target.value)),children:h.map(S=>{var y,F,O,U,H,L;return v.jsxs("option",{value:S,children:[((O=(F=(y=t==null?void 0:t.metadata)==null?void 0:y.frame_info)==null?void 0:F[S])==null?void 0:O.view_name)??"Frame"," · ",((L=(H=(U=t==null?void 0:t.metadata)==null?void 0:U.frame_info)==null?void 0:H[S])==null?void 0:L.index)??S]},S)})})]}),v.jsx(Qw,{image:p==null?void 0:p.url,aspect:M,sourceFrame:f,settings:r,onChange:a},f)]})]}),v.jsx(hn,{title:"Trails",aside:v.jsx("input",{type:"checkbox",role:"switch","aria-label":"Show trails",className:"switch-input",checked:r.trails,onChange:S=>a({trails:S.target.checked})}),children:r.trails&&v.jsxs(v.Fragment,{children:[v.jsx(Ni,{label:"Length",value:r.trailLength,min:0,max:48,display:r.trailLength?`${r.trailLength} frames`:"Off",onChange:S=>a({trailLength:S})}),v.jsx(Ni,{label:v.jsxs(v.Fragment,{children:["Density",v.jsx(rr,{text:"Draw trails for this share of the moving tracks; every track keeps its point."})]}),name:"Density",value:r.trailDensity,min:.01,max:1,step:.01,display:`${wu(r.trailDensity)} of tracks`,onChange:S=>a({trailDensity:S})}),v.jsx(Ni,{label:"Width",value:r.trailWidth,min:.5,max:8,step:.5,display:`${r.trailWidth} px`,onChange:S=>a({trailWidth:S})}),v.jsx(Ni,{label:"Opacity",value:r.trailOpacity,min:.1,max:1,step:.05,display:wu(r.trailOpacity),onChange:S=>a({trailOpacity:S})}),v.jsx(xl,{label:"Fade older segments",checked:r.trailFade,onChange:S=>a({trailFade:S})})]})})]})}function aR({settings:r,hasCameras:t,onChange:n}){return t?v.jsx(v.Fragment,{children:v.jsx(hn,{title:"Frusta",aside:v.jsx("input",{type:"checkbox",role:"switch","aria-label":"Show frusta",className:"switch-input",checked:r.cameras,onChange:a=>n({cameras:a.target.checked})}),info:"Double-click a camera to look through it; drag, scroll or move to leave.",children:r.cameras&&v.jsxs(v.Fragment,{children:[v.jsx(Ni,{label:"Size",value:r.frustumSize,min:.02,max:.5,step:.01,display:`${wu(r.frustumSize)} of scene`,onChange:a=>n({frustumSize:a})}),v.jsx(Ni,{label:"Line width",value:r.frustumWidth,min:.5,max:6,step:.5,display:`${r.frustumWidth} px`,onChange:a=>n({frustumWidth:a})}),v.jsx(Ni,{label:v.jsxs(v.Fragment,{children:["Image planes ",v.jsx(rr,{text:"The current frame's image inside its camera. Set opacity to 0 to hide it."})]}),name:"Image plane opacity",value:r.planeOpacity,min:0,max:1,step:.05,display:wu(r.planeOpacity),onChange:a=>n({planeOpacity:a})})]})})}):v.jsx(Op,{title:"Cameras",children:"No cameras yet. Run Camera poses from the Input tab."})}function sR({settings:r,onFit:t,onChange:n}){return v.jsxs(v.Fragment,{children:[v.jsxs(hn,{title:"Frame transition",children:[v.jsx(li,{label:"Frame transition",value:r.frameTransition,options:[{value:"smooth",label:"Smooth"},{value:"direct",label:"Direct"}],onChange:a=>n({frameTransition:a})}),v.jsx("p",{className:"hint",children:"Smooth blends between frames. Direct shows each frame's predictions without interpolation."})]}),v.jsx(hn,{title:"Background",children:v.jsxs("div",{className:"row",children:[v.jsx(li,{label:"Background",value:r.background,options:[{value:"gradient",label:"Gradient"},{value:"solid",label:"Solid"}],onChange:a=>n({background:a})}),r.background==="solid"&&v.jsx("input",{className:"color-input","aria-label":"Background color",type:"color",value:r.backgroundColor,onChange:a=>n({backgroundColor:a.target.value})})]})}),v.jsx(hn,{title:"Navigation",aside:v.jsx("button",{title:"Look at the scene from just behind the reference camera",onClick:t,children:"Reset view"}),children:v.jsxs("dl",{className:"keys",children:[v.jsx("dt",{children:"Drag"}),v.jsx("dd",{children:"Orbit"}),v.jsx("dt",{children:"Wheel-drag"}),v.jsx("dd",{children:"Tilt the horizon"}),v.jsx("dt",{children:"Right-drag"}),v.jsx("dd",{children:"Pan"}),v.jsx("dt",{children:"Scroll"}),v.jsx("dd",{children:"Zoom"}),v.jsx("dt",{children:"W A S D"}),v.jsx("dd",{children:"Move; Q and E down and up, Shift for faster"}),v.jsx("dt",{children:"← →"}),v.jsx("dd",{children:"Previous and next frame"}),v.jsx("dt",{children:"Double-click"}),v.jsx("dd",{children:"Look through a camera and jump to its frame"})]})})]})}const Bn=({label:r,children:t})=>v.jsxs(v.Fragment,{children:[v.jsx("dt",{children:r}),v.jsx("dd",{children:t})]});function rR({text:r}){const[t,n]=At.useState(!1),a=()=>{var o;return void((o=navigator.clipboard)==null?void 0:o.writeText(r).then(()=>{n(!0),setTimeout(()=>n(!1),1200)}))};return v.jsxs("span",{className:"copy-line",children:[v.jsx("code",{tabIndex:0,children:r}),v.jsx("button",{className:"icon-button","aria-label":"Copy",title:t?"Copied":"Copy",onClick:a,children:t?"✓":v.jsxs("svg",{viewBox:"0 0 16 16",width:"13",height:"13","aria-hidden":"true",children:[v.jsx("rect",{x:"5.5",y:"5.5",width:"8",height:"8",rx:"1.5",fill:"none",stroke:"currentColor",strokeWidth:"1.3"}),v.jsx("path",{d:"M3.5 10.5h-1v-8h8v1",fill:"none",stroke:"currentColor",strokeWidth:"1.3"})]})})]})}function oR({data:r,info:t,mode:n,stageName:a}){var g,x,M,b,T,S,y,F;const o=((g=r==null?void 0:r.metadata)==null?void 0:g.frame_info)??[],c=o[0],h=O=>O?`${O[1]} × ${O[0]}`:"—",f=(x=c==null?void 0:c.padding)!=null&&x.some(Boolean)?` (padded ${c.padding.join(", ")} px)`:"",p=o.map(O=>O.timestamp).filter(O=>O!==null),m={points:(r==null?void 0:r.points.reduce((O,U)=>O+U.positions.length,0))??0,tracks:(r==null?void 0:r.tracks.filter(O=>!O.mode||O.mode===n).reduce((O,U)=>{var H;return O+(((H=U.positions[0])==null?void 0:H.length)??0)},0))??0,cameras:new Set(r==null?void 0:r.cameras.map(O=>`${O.image}@${O.time}`)).size},_=t.steps.reduce((O,U)=>O+U.seconds,0);return v.jsxs(v.Fragment,{children:[v.jsx(hn,{title:"Source",children:v.jsxs("dl",{className:"facts",children:[v.jsx(Bn,{label:"Path",children:v.jsx(rR,{text:t.source??(o.length?c.name:"—")})}),t.host&&v.jsx(Bn,{label:"Host",children:t.host}),t.clip&&v.jsxs(Bn,{label:"Clip",children:[t.clip.width," × ",t.clip.height," · ",t.clip.frames," frames"]}),v.jsx(Bn,{label:"Frames used",children:o.length?`${o.length} (${t.selection})`:t.selection||"—"}),p.length>1&&v.jsxs(Bn,{label:"Time span",children:[p[0].toFixed(2)," – ",p[p.length-1].toFixed(2)," s"]})]})}),v.jsx(hn,{title:"Model input",children:v.jsxs("dl",{className:"facts",children:[v.jsx(Bn,{label:"Original",children:h(c==null?void 0:c.original_size)}),v.jsxs(Bn,{label:"Resolution",children:[h(c==null?void 0:c.resized_size),f]}),((b=(M=r==null?void 0:r.metadata)==null?void 0:M.model)==null?void 0:b.checkpoint)&&v.jsx(Bn,{label:"Checkpoint",children:r.metadata.model.checkpoint}),((S=(T=r==null?void 0:r.metadata)==null?void 0:T.model)==null?void 0:S.revision)&&v.jsx(Bn,{label:"Revision",children:r.metadata.model.revision}),t.device&&v.jsx(Bn,{label:"Device",children:t.device})]})}),v.jsx(hn,{title:"Scene",children:v.jsxs("dl",{className:"facts",children:[v.jsx(Bn,{label:"Points",children:m.points.toLocaleString()}),v.jsx(Bn,{label:"Tracks",children:m.tracks.toLocaleString()}),v.jsx(Bn,{label:"Camera poses",children:m.cameras.toLocaleString()}),(F=(y=r==null?void 0:r.metadata)==null?void 0:y.layers)==null?void 0:F.map((O,U)=>v.jsxs(Bn,{label:`Layer ${U+1}`,children:[O.label," · ",O.detail,O.sky_skipped?` · ${O.sky_skipped.toLocaleString()} sky skipped`:""]},U))]})}),t.steps.length>0&&v.jsx(hn,{title:"Last run",children:v.jsxs("dl",{className:"facts",children:[t.steps.map((O,U)=>v.jsxs(Bn,{label:a(O.stage),children:[O.seconds.toFixed(1)," s"]},U)),v.jsxs(Bn,{label:"Total",children:[_.toFixed(1)," s"]}),t.peakBytes!==null&&v.jsxs(Bn,{label:"Peak GPU memory",children:[(t.peakBytes/2**30).toFixed(1)," GB"]})]})})]})}const lR=["Points","Trails","Cameras","Viewer","Info"];function cR({settings:r,data:t,counts:n,info:a,stageName:o,onFit:c,onChange:h}){const[f,p]=At.useState("Points"),m=!!(t!=null&&t.points.some(x=>x.positions.length)),_=!!(t!=null&&t.tracks.some(x=>{var M;return(M=x.positions[0])==null?void 0:M.length})),g=!!(t!=null&&t.cameras.length);return v.jsxs(v.Fragment,{children:[v.jsx("nav",{className:"subtabs",role:"tablist","aria-label":"Display",children:lR.map(x=>v.jsx("button",{role:"tab","aria-selected":f===x,onClick:()=>p(x),children:x},x))}),f==="Points"&&v.jsx(nR,{settings:r,counts:n,hasPoints:m,hasTracks:_,hasMultiviewTracks:!!(t!=null&&t.tracks.some(x=>x.mode)),onChange:h}),f==="Trails"&&v.jsx(iR,{settings:r,data:t,hasTracks:_,onChange:h}),f==="Cameras"&&v.jsx(aR,{settings:r,hasCameras:g,onChange:h}),f==="Viewer"&&v.jsx(sR,{settings:r,onFit:c,onChange:h}),f==="Info"&&v.jsx(oR,{data:t,info:a,mode:r.trajectoryMode,stageName:o})]})}function uR({src:r,width:t,height:n,region:a,grid:o,points:c,spacing:h,onSpacing:f,showQueries:p,onShowQueries:m,onClose:_}){const g=At.useRef(null),x=At.useRef(null),M=At.useRef({width:1,height:1}),b=At.useRef(null),[T,S]=At.useState(null),[y,F]=At.useState({zoom:4,x:.5,y:.5}),[O,U]=At.useState(!1);At.useEffect(()=>{var L;(L=g.current)==null||L.showModal()},[]),At.useEffect(()=>{const L=new Image;return L.onload=()=>S(L),L.src=r,()=>{L.onload=null}},[r]),At.useEffect(()=>{if(!T)return;const L=x.current,z=L.getContext("2d"),P=()=>{const A=L.getBoundingClientRect(),k=Math.min(window.devicePixelRatio,2);L.width=Math.round(A.width*k),L.height=Math.round(A.height*k),z.setTransform(k,0,0,k,0,0);const lt=y.zoom?T.naturalWidth*y.zoom:Math.min(A.width,A.height*t/n),$=lt*n/t;M.current={width:lt,height:$};const ot=A.width/2-y.x*lt,ft=A.height/2-y.y*$;z.imageSmoothingEnabled=lt<T.naturalWidth*2,z.drawImage(T,ot,ft,lt,$);const G=Math.min(o[0].length>1?(o[0][1]-o[0][0])*lt:1/0,o[1].length>1?(o[1][1]-o[1][0])*$:1/0);U(G<3);const nt=getComputedStyle(L).getPropertyValue("--accent").trim();if(p&&o[0].length&&o[1].length)if(G<3)z.fillStyle=nt,z.globalAlpha=.2,z.fillRect(ot+a[0]*lt,ft+a[1]*$,(a[2]-a[0])*lt,(a[3]-a[1])*$),z.globalAlpha=1;else{const W=o[0].map(N=>ot+N*lt).filter(N=>N>=-2&&N<=A.width+2),tt=o[1].map(N=>ft+N*$).filter(N=>N>=-2&&N<=A.height+2);z.beginPath();for(const N of tt)for(const it of W)z.moveTo(it+.9,N),z.arc(it,N,.9,0,Math.PI*2);z.strokeStyle="#000",z.lineWidth=1,z.stroke(),z.fillStyle="#fff",z.fill()}if(z.strokeStyle="#fff",z.lineWidth=1,z.strokeRect(ot+a[0]*lt,ft+a[1]*$,(a[2]-a[0])*lt,(a[3]-a[1])*$),p)for(const[W,tt]of c)z.beginPath(),z.arc(ot+W*lt,ft+tt*$,4,0,Math.PI*2),z.fillStyle=nt,z.fill(),z.stroke()};P();const w=new ResizeObserver(P);return w.observe(L),()=>w.disconnect()},[T,t,n,a,o,c,y,p]);const H=L=>F(z=>({...z,zoom:Math.min(16,Math.max(.25,(z.zoom||M.current.width/T.naturalWidth)*L))}));return v.jsxs("dialog",{ref:g,className:"scene-dialog query-inspector","aria-labelledby":"query-inspector-title",onCancel:_,children:[v.jsxs("div",{className:"group-title",children:[v.jsx("h2",{id:"query-inspector-title",children:"Inspect queries"}),v.jsx("button",{onClick:_,children:"Done"})]}),v.jsx("canvas",{ref:x,"aria-label":"Query preview: drag or use arrow keys to pan",tabIndex:0,onPointerDown:L=>{L.currentTarget.focus(),L.currentTarget.setPointerCapture(L.pointerId),b.current={x:L.clientX,y:L.clientY,center:[y.x,y.y]}},onPointerMove:L=>{if(!b.current)return;const{x:z,y:P,center:w}=b.current;F(A=>({...A,x:Math.min(1,Math.max(0,w[0]-(L.clientX-z)/M.current.width)),y:Math.min(1,Math.max(0,w[1]-(L.clientY-P)/M.current.height))}))},onPointerUp:()=>{b.current=null},onPointerCancel:()=>{b.current=null},onKeyDown:L=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(L.key)&&(L.preventDefault(),L.stopPropagation(),F(z=>({...z,x:Math.min(1,Math.max(0,z.x+(L.key==="ArrowRight"?40:L.key==="ArrowLeft"?-40:0)/M.current.width)),y:Math.min(1,Math.max(0,z.y+(L.key==="ArrowDown"?40:L.key==="ArrowUp"?-40:0)/M.current.height))})))}}),v.jsxs("div",{className:"row inspector-tools",children:[v.jsxs("span",{className:"hint",children:[p?O?"Coverage preview":"Individual queries":"Image only"," · drag to pan"]}),v.jsxs("div",{className:"row inspector-zoom",children:[v.jsx("button",{"aria-label":"Zoom out",disabled:!T||y.zoom===.25,onClick:()=>H(.5),children:"−"}),v.jsx("button",{"aria-label":"Fit image",onClick:()=>F({zoom:0,x:.5,y:.5}),children:y.zoom?`${Math.round(y.zoom*100)}%`:"Fit"}),v.jsx("button",{"aria-label":"Zoom in",disabled:!T||y.zoom===16,onClick:()=>H(2),children:"+"})]})]}),v.jsxs("div",{className:"row",children:[v.jsx("span",{children:"Grid spacing"}),v.jsx("span",{className:"spacer"}),v.jsxs("span",{className:"inspector-count","aria-live":"polite",children:[(o[0].length*o[1].length).toLocaleString()," grid · ",c.length," picked"]})]}),v.jsxs("div",{className:"row inspector-spacing",children:[v.jsx(li,{label:"Inspector grid spacing",value:h,options:[0,1,2,4,8,16].map(L=>({value:L,label:L?`${L} px`:"Grid off"})),onChange:f}),v.jsxs("label",{className:"inspector-custom",children:[v.jsx("input",{"aria-label":"Inspector grid spacing in pixels",type:"number",min:0,max:64,value:h,onChange:L=>{L.target.value&&f(Math.min(64,Math.max(0,Math.round(Number(L.target.value)))))}})," px"]})]}),v.jsxs("label",{className:"inspector-overlay",children:[v.jsx("input",{type:"checkbox",checked:p,onChange:L=>m(L.target.checked)})," Show queries"]})]})}const gx=[0,0,1,1],_x=r=>r.every((t,n)=>t===gx[n]),T0=r=>Math.min(1,Math.max(0,r));function fR({src:r,width:t,height:n,region:a,grid:o,points:c=[],spacing:h,onSpacing:f,onRegion:p,onPoints:m}){const _=At.useRef(null),g=At.useRef(null),[x,M]=At.useState(!1),[b,T]=At.useState(!0),[S,y]=At.useState(!1),[F,O]=At.useState("region"),[U,H]=At.useState(null),L=U?[Math.min(U[0],U[2]),Math.min(U[1],U[3]),Math.max(U[0],U[2]),Math.max(U[1],U[3])]:a;At.useEffect(()=>{const P=g.current,w=P.getContext("2d"),A=()=>{const{width:lt,height:$}=P.getBoundingClientRect();if(!lt||!$)return;const ot=Math.min(window.devicePixelRatio,2);P.width=Math.round(lt*ot),P.height=Math.round($*ot),w.setTransform(ot,0,0,ot,0,0);const ft=Math.min(o[0].length>1?(o[0][1]-o[0][0])*lt:1/0,o[1].length>1?(o[1][1]-o[1][0])*$:1/0);if(y(ft<3),ft<3&&o[0].length&&o[1].length){w.fillStyle=getComputedStyle(P).getPropertyValue("--accent").trim(),w.globalAlpha=.3,w.fillRect(a[0]*lt,a[1]*$,(a[2]-a[0])*lt,(a[3]-a[1])*$);return}const G=1,nt=document.createElement("canvas");nt.width=P.width,nt.height=Math.ceil(ot);const W=nt.getContext("2d");W.fillStyle="#fff";for(const tt of o[0])W.fillRect(tt*nt.width-G*ot/2,0,G*ot,nt.height);for(const tt of o[1])w.drawImage(nt,0,tt*$-G/2,lt,G)};A();const k=new ResizeObserver(A);return k.observe(P),()=>k.disconnect()},[o,t,n,a]);const z=P=>{const w=_.current.getBoundingClientRect();return[T0((P.clientX-w.left)/w.width),T0((P.clientY-w.top)/w.height)]};return v.jsxs("div",{className:"region-picker",children:[v.jsxs("div",{className:"row query-preview-tools",children:[v.jsx("span",{className:"hint",children:b?S?"Coverage preview":"Query dots":"Image only"}),v.jsx("span",{className:"spacer"}),v.jsx("button",{onClick:()=>M(!0),children:"Inspect ↗"})]}),v.jsxs("div",{ref:_,className:`first-frame tool-${m?F:"region"}`,style:mx(t/n,240),id:"first-frame",onPointerDown:P=>{const[w,A]=z(P);if(m&&F==="points"){m([...c,[w,A]]);return}P.currentTarget.setPointerCapture(P.pointerId),H([w,A,w,A])},onPointerMove:P=>{U&&H([U[0],U[1],...z(P)])},onPointerUp:()=>{U&&(H(null),L[2]-L[0]>.02&&L[3]-L[1]>.02&&p(L))},children:[v.jsx("img",{src:r,alt:"Start frame",draggable:!1}),v.jsx("div",{className:"region",style:{left:`${L[0]*100}%`,top:`${L[1]*100}%`,width:`${(L[2]-L[0])*100}%`,height:`${(L[3]-L[1])*100}%`}}),v.jsx("canvas",{ref:g,className:"query-grid","aria-hidden":"true",style:{visibility:U||!b?"hidden":void 0}}),v.jsx("svg",{style:{visibility:b?void 0:"hidden"},viewBox:`0 0 ${t} ${n}`,preserveAspectRatio:"none","aria-hidden":"true",children:c.map(([P,w],A)=>v.jsx("circle",{className:"pick",r:Math.max(t,n)/110,cx:P*t,cy:w*n},A))})]}),v.jsxs("div",{className:"row",children:[m&&v.jsx(li,{label:"Selection tool",value:F,options:[{value:"region",label:"Region"},{value:"points",label:"Points"}],onChange:O}),v.jsx("span",{className:"spacer"}),v.jsx("button",{id:"full-frame",disabled:_x(a),onClick:()=>p(gx),children:"Full frame"}),m&&v.jsxs("button",{id:"clear-points",disabled:!c.length,onClick:()=>m([]),children:["Clear ",c.length||""]})]}),v.jsxs("label",{className:"inspector-overlay",children:[v.jsx("input",{type:"checkbox",checked:b,onChange:P=>T(P.target.checked)})," Show queries"]}),x&&v.jsx(uR,{src:r,width:t,height:n,region:a,grid:o,points:c,spacing:h,onSpacing:f,showQueries:b,onShowQueries:T,onClose:()=>M(!1)})]})}const Uu=[{value:"track",label:"3D tracking",description:"Follow a grid or picked points",detail:"Follow a region grid or clicked points of one frame through the clip",action:"Track"},{value:"all_pixels",label:"All-pixel tracking",description:"Track every pixel once",detail:"Track every pixel of the clip once, seeding later frames only where nothing was tracked",action:"Track all pixels"},{value:"reconstruct",label:"3D reconstruction",description:"A point cloud per frame",detail:"A point cloud of every frame",action:"Reconstruct"},{value:"depth",label:"Video depth",description:"A depth map per frame",detail:"A depth map of every frame, each in its own camera, with normals and visibility",action:"Estimate depth"},{value:"pose",label:"Camera poses",description:"Cameras only",detail:"Cameras only, fit to each frame's points in its own and the first frame's camera",action:"Estimate poses"}],vx=["track","reconstruct","pose"],A0=[1e4,5e4,1e5],hR=[0,1,2,4,8,16],fu={model:5,contextPerFrame:.022,decodeContextPerFrame:.022,perThousandQueries:.093},dR=(r,t)=>fu.model+r*(fu.contextPerFrame+fu.decodeContextPerFrame)+t/1e3*fu.perThousandQueries;function pR(r,t){const n=t??1;return{source_frame:r.sourceFrame*n,decode_chunk_size:r.chunk,skip_sky:r.skipSky,tasks:Uu.filter(a=>r.tasks.includes(a.value)).map(({value:a})=>({task:a,stride:{reconstruct:r.reconstructionStride,depth:r.depthStride,track:r.trackStride,all_pixels:r.allPixelsStride,pose:void 0}[a],region:a==="track"?r.region:[0,0,1,1],points:a==="track"?r.points:[],...a==="track"&&t!==void 0?{seeds:(r.seedViews??Array.from({length:n},(o,c)=>c)).map(o=>{var c,h,f,p;return{source_frame:r.sourceFrame*n+o,region:((h=(c=r.viewSeeds)==null?void 0:c[o])==null?void 0:h.region)??[0,0,1,1],points:((p=(f=r.viewSeeds)==null?void 0:f[o])==null?void 0:p.points)??[]}})}:{}}))}}function mR({value:r,onChange:t}){const[n,a]=At.useState(String(r));At.useEffect(()=>a(String(r)),[r]);const o=()=>{const c=Math.round(Number(n));n.trim()&&Number.isFinite(c)&&c>=1?t(c):a(String(r))};return v.jsxs("div",{className:"chunk-size",children:[v.jsx(li,{label:"Queries per pass",value:A0.includes(r)?r:-1,options:A0.map(c=>({value:c,label:`${c/1e3}k`})),onChange:t}),v.jsx("input",{type:"number",inputMode:"numeric",min:1,step:1e3,"aria-label":"Queries per pass, custom",value:n,onChange:c=>a(c.target.value),onBlur:o,onKeyDown:c=>{c.key==="Enter"&&o()}})]})}function gR({clip:r,streams:t,range:n,options:a,plans:o,maxSide:c,onChange:h}){var A,k,lt,$,ot,ft,G,nt,W;const[f,p]=At.useState(0),m=Math.min(f,Math.max(0,((t==null?void 0:t.length)??1)-1)),_=(t==null?void 0:t[m])??r,g=t!==void 0,x=a.seedViews??(t==null?void 0:t.map((tt,N)=>N))??[0],M=g?{...a,region:((k=(A=a.viewSeeds)==null?void 0:A[m])==null?void 0:k.region)??[0,0,1,1],points:(($=(lt=a.viewSeeds)==null?void 0:lt[m])==null?void 0:$.points)??[]}:a,b=tt=>{g&&tt.sourceFrame!==void 0?h({...a,sourceFrame:tt.sourceFrame,viewSeeds:Object.fromEntries(Object.entries(a.viewSeeds??{}).map(([N,it])=>[N,{...it,points:[]}]))}):g&&("region"in tt||"points"in tt)?h({...a,viewSeeds:{...a.viewSeeds,[m]:{region:tt.region??M.region,points:tt.points??M.points}}}):h({...a,...tt})},T=tt=>M.tasks.includes(tt),S=tt=>b({tasks:T(tt)?M.tasks.filter(N=>N!==tt):[...M.tasks,tt]}),y=ys(n),F=T("track")||T("all_pixels"),O=tt=>tt.map(N=>({value:N,label:`${N} px`})),U=tt=>{var N;return((N=o==null?void 0:o.tasks[tt])==null?void 0:N.per_frame.toLocaleString())??"…"},H=M.sourceFrame*((t==null?void 0:t.length)??1)+m,L=o==null?void 0:o.frame_info[H],[z,P]=(L==null?void 0:L.resized_size)??[_.height,_.width],w=((G=(ft=(ot=o==null?void 0:o.tasks.track)==null?void 0:ot.seed_grids)==null?void 0:ft[H])==null?void 0:G[M.trackStride])??[[],[]];return v.jsxs(v.Fragment,{children:[v.jsx(hn,{title:"Tasks",info:"Pick one or more; they run one after another on one encoding of the clip, each adding a layer.",children:v.jsx("div",{className:"task-list",role:"group","aria-label":"Tasks",children:Uu.filter(tt=>!t||vx.includes(tt.value)).map(tt=>v.jsxs("button",{role:"checkbox","aria-checked":T(tt.value),title:tt.detail,onClick:()=>S(tt.value),children:[v.jsx("span",{className:"task-check","aria-hidden":"true"}),v.jsxs("span",{children:[v.jsx("strong",{children:tt.label}),v.jsx("small",{children:tt.description})]})]},tt.value))})}),v.jsxs(hn,{title:"Queries",children:[!M.tasks.length&&v.jsx("p",{className:"hint",children:"Choose a task above."}),T("reconstruct")&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"field-label",children:"3D reconstruction"}),v.jsx(li,{label:"Sampling",value:M.reconstructionStride,options:O([1,2,4,8]),onChange:tt=>b({reconstructionStride:tt})}),v.jsxs("p",{className:"hint",children:[U("reconstruct")," points per frame."]})]}),T("pose")&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"field-label",children:"Camera poses"}),v.jsxs("p",{className:"hint",children:[U("pose")," pixels per frame, fit against the first frame's camera."]})]}),T("depth")&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"field-label",children:"Video depth"}),v.jsx(li,{label:"Resolution",value:M.depthStride,options:[{value:1,label:"Full"},{value:2,label:"Half"},{value:4,label:"Quarter"}],onChange:tt=>b({depthStride:tt})}),v.jsxs("p",{className:"hint",children:[Math.ceil(P/M.depthStride)," × ",Math.ceil(z/M.depthStride)," per frame."]})]}),F&&v.jsxs("div",{className:"field",children:[v.jsx("span",{className:"field-label",children:g?"Start timestep":"Start frame"}),v.jsx("div",{className:"frame-strip",role:"radiogroup","aria-label":"Start frame",children:y.map((tt,N)=>v.jsxs("button",{role:"radio","aria-checked":M.sourceFrame===N,title:`Frame ${tt}`,style:{flexBasis:`${Math.round(36*_.width/_.height)}px`},onClick:()=>b({sourceFrame:N,points:[]}),children:[v.jsx("img",{src:bl(_.path,tt,160),alt:"",draggable:!1}),v.jsx("span",{children:N+1})]},tt))})]}),T("track")&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"field-label",children:"3D tracking"}),g&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"field-label",children:"Seed cameras"}),v.jsx("div",{className:"chips",role:"group","aria-label":"Seed cameras",children:t==null?void 0:t.map((tt,N)=>v.jsx("button",{className:"chip","aria-pressed":x.includes(N),onClick:()=>b({seedViews:x.includes(N)?x.filter(it=>it!==N):[...x,N].sort((it,Tt)=>it-Tt)}),children:tt.name},N))}),v.jsxs("label",{className:"field-label",children:["Edit camera ",v.jsx("select",{"aria-label":"Seed preview camera",value:m,onChange:tt=>p(Number(tt.target.value)),children:t==null?void 0:t.map((tt,N)=>v.jsx("option",{value:N,children:tt.name},N))})]}),v.jsx("p",{className:"hint",children:"All cameras provide context. Only selected seed cameras start tracks; regions and clicked points belong to the camera shown below."}),x.length?!x.includes(m)&&v.jsx("p",{className:"hint",children:"This camera is not selected for seeding."}):v.jsx("p",{className:"hint",children:"Choose at least one seed camera."})]}),v.jsx(fR,{src:bl(_.path,y[M.sourceFrame],c),width:((nt=L==null?void 0:L.original_size)==null?void 0:nt[1])??_.width,height:((W=L==null?void 0:L.original_size)==null?void 0:W[0])??_.height,region:M.region,grid:w,points:M.points,spacing:M.trackStride,onSpacing:tt=>b({trackStride:tt}),onRegion:tt=>b({region:tt}),onPoints:tt=>b({points:tt})}),v.jsx(Ni,{label:"Grid spacing",value:M.trackStride,min:0,max:64,display:M.trackStride?`${M.trackStride} px`:"Off",onChange:tt=>b({trackStride:tt})}),v.jsx("div",{className:"chips",role:"group","aria-label":"Grid spacing presets",children:hR.map(tt=>v.jsx("button",{className:"chip","aria-pressed":M.trackStride===tt,onClick:()=>b({trackStride:tt}),children:tt?`${tt} px`:"Grid off"},tt))}),v.jsxs("p",{className:"hint",id:"picked-count",children:[[M.trackStride?o&&`every ${M.trackStride} px of the ${_x(M.region)?"frame":"region"} (${w[0].length} × ${w[1].length} = ${(w[0].length*w[1].length).toLocaleString()} grid points)`:"grid off",M.points.length?`${M.points.length} picked point${M.points.length===1?"":"s"}`:!M.trackStride&&"click points to track"].filter(Boolean).join(" · ").replace(/^./,tt=>tt.toUpperCase()),". Overlapping selections count once."]})]}),T("all_pixels")&&v.jsxs(v.Fragment,{children:[v.jsx("span",{className:"field-label",children:"All-pixel tracking"}),v.jsx(li,{label:"Spacing",value:M.allPixelsStride,options:O([1,2,4,8,16]),onChange:tt=>b({allPixelsStride:tt})}),v.jsxs("p",{className:"hint",children:["Up to ",U("all_pixels")," tracks from the start frame, then only new areas."]})]}),v.jsx("div",{className:"field",children:v.jsx(xl,{label:v.jsxs("span",{children:["Skip sky",v.jsx(rr,{text:"Queries starting on sky pixels are not decoded, and all-pixel tracking never seeds them. The sky is segmented once per clip; its mask shows under the input video."})]}),checked:M.skipSky,onChange:tt=>b({skipSky:tt})})}),v.jsxs("div",{className:"field chunk",children:[v.jsxs("span",{className:"field-label",children:["Queries per pass ",v.jsx(rr,{text:"How many queries the GPU decodes at once. More uses more memory; lower it if the GPU runs out of memory."})]}),v.jsx(mR,{value:M.chunk,onChange:tt=>b({chunk:tt})}),v.jsxs("p",{className:"hint",id:"memory-estimate",children:["Roughly ",dR(y.length*((t==null?void 0:t.length)??1),M.chunk).toFixed(1)," GB of GPU memory"]})]})]})]})}const gp=(r,t)=>r.filter(n=>n.time<=t+1e-6).sort((n,a)=>a.time-n.time)[0]??r[0],w0=r=>`linear-gradient(to right, ${Array.from({length:9},(t,n)=>`rgb(${r(n/8).join(",")})`).join(",")})`;function _R({data:r,layer:t,index:n,time:a,camera:o=0}){const c=m=>{var g;const _=m.split("/");return(((g=r.metadata)==null?void 0:g.num_views)??1)>1&&_.splice(1,0,`view-${o}`),gp(r.images.filter(x=>x.name===_.join("/")),a)},[h,f]=t.depth_range??[0,1],p=[{name:"rgb",caption:"Input",legend:null},{name:`depth/${n}`,caption:"Depth",legend:v.jsxs("div",{className:"map-legend",children:[v.jsx("span",{children:h.toPrecision(3)}),v.jsx("i",{style:{background:w0(m=>Au(1-m))}}),v.jsx("span",{children:f.toPrecision(3)}),v.jsx("small",{children:"relative · inverse-depth colors · 2nd–98th percentile"})]})},{name:`normals/${n}`,caption:"Predicted normals",legend:null},{name:`visibility/${n}`,caption:"Visibility",legend:v.jsxs("div",{className:"map-legend",children:[v.jsx("span",{children:"hidden"}),v.jsx("i",{style:{background:w0(ux)}}),v.jsx("span",{children:"visible"}),v.jsx("small",{children:"sigmoid of the visibility logit"})]})}].filter(m=>c(m.name));return v.jsx("div",{className:"depth-view",children:p.map(m=>{var _;return v.jsxs("figure",{children:[v.jsx("img",{src:(_=c(m.name))==null?void 0:_.url,alt:m.caption}),v.jsx("figcaption",{children:m.caption}),m.legend]},m.name)})})}function vR({data:r,time:t,camera:n=0}){var f,p,m,_;const a=(((f=r.metadata)==null?void 0:f.num_views)??1)>1?`/view-${n}`:"",o=r.images.filter(g=>g.name===`rgb${a}`).sort((g,x)=>g.time-x.time),c=gp(o,t),h=gp(r.images.filter(g=>g.name===`sky${a}`),t);return c?v.jsxs(v.Fragment,{children:[v.jsxs("figure",{className:"frame-panel",children:[v.jsx("img",{src:c.url,alt:"Input frame at the current time"}),v.jsxs("figcaption",{children:[v.jsxs("span",{children:["Frame ",o.indexOf(c)+1," / ",o.length]}),v.jsx("span",{children:((_=(m=(p=r.metadata)==null?void 0:p.frame_info)==null?void 0:m[0])==null?void 0:_.timestamp)==null?`t = ${c.time.toFixed(0)}`:`${c.time.toFixed(2)} s`})]})]}),h&&v.jsxs(v.Fragment,{children:[v.jsx("div",{className:"side-title",children:v.jsx("h2",{children:"Sky mask"})}),v.jsxs("figure",{className:"frame-panel",children:[v.jsx("img",{src:h.url,alt:"Sky mask at the current time"}),v.jsx("figcaption",{children:"Blue marks excluded sky pixels"})]})]})]}):null}function xR({clip:r,range:t,start:n}){return v.jsxs("div",{className:"clip-preview",children:[v.jsxs("div",{className:"clip-preview-title",children:[v.jsx("strong",{children:r.name}),v.jsxs("span",{children:[ys(t).length," of ",r.frames," frames selected"]})]}),v.jsx("div",{className:"clip-preview-grid",children:ys(t).map((a,o)=>v.jsxs("figure",{className:o===n?"start":void 0,children:[v.jsx("img",{src:bl(r.path,a,320),alt:"",loading:"lazy",style:{aspectRatio:r.width/r.height}}),v.jsxs("figcaption",{children:[v.jsx("span",{children:o+1}),r.times?`${r.times[a].toFixed(2)} s`:`#${a}`,o===n&&v.jsx("em",{children:"Start"})]})]},a))})]})}function yR({tabs:r,active:t,pending:n,disabled:a,onSwitch:o,onNew:c,onClose:h,onRename:f,onReorder:p}){const[m,_]=At.useState(null),[g,x]=At.useState(""),[M,b]=At.useState(null),[T,S]=At.useState(null),y=r.map(L=>L.id),F=T&&T.length===y.length&&T.every(L=>y.includes(L))&&T.join()!==y.join()?T.map(L=>r.find(z=>z.id===L)):r;At.useEffect(()=>{T&&T.join()===y.join()&&S(null)},[y.join()]);const O=typeof n=="number"?n:n==="new"?null:t,U=L=>{_(null);const z=g.trim();z&&z!==L.name&&f(L.id,z)},H=L=>{if(M===null||M===L)return;const z=F.map(P=>P.id).filter(P=>P!==M);z.splice(z.indexOf(L)+(F.findIndex(P=>P.id===M)<F.findIndex(P=>P.id===L)?1:0),0,M),S(z)};return v.jsxs("nav",{className:"scene-tabs",role:"tablist","aria-label":"Scenes",children:[F.map(L=>v.jsxs("div",{className:`scene-tab${M===L.id?" dragging":""}`,"aria-selected":L.id===O,draggable:!a&&m===null,onDragStart:z=>{b(L.id),z.dataTransfer.effectAllowed="move"},onDragOver:z=>{z.preventDefault(),H(L.id)},onDragEnd:()=>{T&&p(T),b(null)},children:[m===L.id?v.jsx("input",{className:"tab-name","aria-label":"Tab name",autoFocus:!0,value:g,onChange:z=>x(z.target.value),onFocus:z=>z.target.select(),onBlur:()=>U(L),onKeyDown:z=>{z.key==="Enter"&&U(L),z.key==="Escape"&&_(null)}}):v.jsx("button",{role:"tab","aria-selected":L.id===O,title:`${L.name} · double-click to rename, drag to move`,disabled:a&&L.id!==O,onClick:()=>o(L.id),onDoubleClick:()=>{x(L.name),_(L.id)},children:L.name}),v.jsx("button",{className:"icon-button","aria-label":`Close ${L.name}`,disabled:a,onClick:()=>h(L.id),children:"×"})]},L.id)),n==="new"&&v.jsx("div",{className:"scene-tab pending","aria-selected":"true",children:v.jsx("button",{role:"tab","aria-selected":"true",disabled:!0,children:"New scene…"})}),v.jsx("button",{className:"icon-button","aria-label":"New scene tab",title:"New scene tab",disabled:a,onClick:c,children:"+"})]})}const hu=r=>Array.isArray(r)&&Array.isArray(r[0]),SR=r=>Object.fromEntries(Object.entries(r).map(([t,n])=>[t.replace(/_(.)/g,(a,o)=>o.toUpperCase()),n])),R0=r=>({tasks:r.tasks,reconstructionStride:r.reconstruction_stride,depthStride:r.depth_stride,trackStride:r.track_stride,allPixelsStride:r.all_pixels_stride,sourceFrame:0,region:[0,0,1,1],points:[],chunk:r.decode_chunk_size,skipSky:r.skip_sky}),ms=(r,t)=>Fn(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});function C0(r,t){const n=URL.createObjectURL(r),a=document.createElement("a");a.href=n,a.download=t,a.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}const MR=["Input","Display"],bR=[.25,.5,1,2,4],Md={track:"tracks",all_pixels:"tracks",reconstruct:"reconstruction"},ER=({open:r})=>v.jsxs("svg",{viewBox:"0 0 16 16",width:"15",height:"15","aria-hidden":"true",children:[v.jsx("path",{d:"M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8 12.1 12.5 8 12.5 1.5 8 1.5 8z",fill:"none",stroke:"currentColor",strokeWidth:"1.3"}),r?v.jsx("circle",{cx:"8",cy:"8",r:"2",fill:"currentColor"}):v.jsx("path",{d:"M2.5 13.5l11-11",stroke:"currentColor",strokeWidth:"1.3"})]}),D0=({side:r})=>v.jsxs("svg",{viewBox:"0 0 16 16","aria-hidden":"true",width:"16",height:"16",children:[v.jsx("rect",{x:"1.5",y:"2.5",width:"13",height:"11",rx:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.3"}),v.jsx("rect",{x:r==="left"?2.5:9.5,y:"3.5",width:"4",height:"9",rx:"1",fill:"currentColor",opacity:".7"})]}),TR={starting:"Starting","loading model":"Loading the model","reading frames":"Reading and resizing frames","segmenting sky":"Segmenting the sky",encoding:"Encoding the clip",decoding:"Decoding queries","building scene":"Building the scene"},Ru=r=>{var a,o;const[t,n]=r.split(":");return(TR[t]??((a=t[0])==null?void 0:a.toUpperCase())+t.slice(1))+(n?` · ${((o=Uu.find(c=>c.value===n))==null?void 0:o.label)??n}`:"")};function AR({status:r,receiving:t}){const n=r.state==="running";return v.jsxs("ol",{className:"run-steps",children:[r.steps.map((a,o)=>v.jsxs("li",{className:"done",children:[v.jsx("span",{children:Ru(a.stage)}),v.jsxs("small",{children:[a.seconds.toFixed(1)," s"]})]},o)),n&&v.jsxs("li",{className:"active",children:[v.jsx("span",{children:Ru(r.stage)}),v.jsx("small",{children:r.stage.startsWith("decoding")?`${Math.round(r.progress*100)}%`:""}),r.detail&&v.jsx("em",{children:r.detail}),v.jsx("progress",{value:r.stage.startsWith("decoding")?r.progress:void 0,max:1})]}),!n&&t&&v.jsxs("li",{className:"active",children:[v.jsx("span",{children:"Loading the scene into the viewer"}),v.jsx("small",{}),v.jsx("progress",{max:1})]})]})}function Su(r){if(typeof r=="string")return 24+r.length*2;if(Array.isArray(r)){const t=r.length&&Array.isArray(r[0])?r.length*Su(r[0]):r.reduce((n,a)=>n+Su(a),0);return 32+r.length*8+t}return r&&typeof r=="object"?64+Object.entries(r).reduce((t,[n,a])=>t+32+n.length*2+Su(a),0):0}function wR({config:r}){var le,ee,Se,Ce,Ge,He,ue,Vt,sn;const t=At.useRef(null),n=At.useRef(null),a=At.useRef(null),[o,c]=At.useState(null),h={...pp,...SR(r.display)},[f,p]=At.useState(h),[m,_]=At.useState(null),[g,x]=At.useState({state:"idle",stage:"",detail:"",steps:[],progress:0,revision:"",scene_key:"",presentation:{},has_result:!1,clip:null,encoded:!1,peak_bytes:null,tabs:[],active:0}),[M,b]=At.useState(""),[T,S]=At.useState(!1),[y,F]=At.useState(!1),O=At.useRef(null);At.useEffect(()=>{var V;y&&((V=O.current)==null||V.showModal())},[y]);const[U,H]=At.useState("Input"),[L,z]=At.useState(null),[P,w]=At.useState("images"),[A,k]=At.useState([]),lt=Math.min(f.inputCamera,Math.max(0,(((le=o==null?void 0:o.metadata)==null?void 0:le.num_views)??1)-1)),$=P==="streams",ot=$?A[0]&&{...A[0],frames:Math.min(...A.map(V=>V.frames))}:L,[ft,G]=At.useState(!1),[nt,W]=At.useState({start:0,stop:1,step:1}),[tt,N]=At.useState(()=>R0(r)),it=$?{...tt,tasks:tt.tasks.filter(V=>vx.includes(V))}:tt,[Tt,Dt]=At.useState(null),[J,mt]=At.useState(""),[bt,Rt]=At.useState({still:0,moving:0}),[Ut,jt]=At.useState("3d"),[Ht,ve]=At.useState(0),ne=At.useMemo(()=>{if(!o)return[];const V=o.images.filter(_t=>_t.name.split("/")[0]==="rgb").map(_t=>_t.time);return[...new Set(V.length?V:[...o.images.map(_t=>_t.time),...o.points.map(_t=>_t.time),...o.cameras.map(_t=>_t.time),...o.tracks.flatMap(_t=>_t.times)])].sort((_t,Kt)=>_t-Kt)},[o]),[Re,j]=At.useState(!1),[dn,fe]=At.useState(!1),[he,Yt]=At.useState(!1),[Te,Wt]=At.useState(null),[B,R]=At.useState([]),[at,gt]=At.useState(()=>{try{return{left:localStorage.getItem("arrow.left")!=="off",right:localStorage.getItem("arrow.right")!=="off"}}catch{return{left:!0,right:!0}}}),St=V=>gt(_t=>{const Kt={..._t,[V]:!_t[V]};try{localStorage.setItem(`arrow.${V}`,Kt[V]?"on":"off")}catch{}return Kt}),[vt,Zt]=At.useState(1),Ct=At.useRef({playing:!1,time:0,speed:1,frameDuration:0});Ct.current={playing:Re,time:Ht,speed:vt,frameDuration:ne.length>1?ne[ne.length-1]-ne[ne.length-2]:0};const Gt=At.useRef(""),xe=At.useRef(null),wt=At.useRef(async()=>{}),kt=At.useRef(0),Jt=At.useRef(()=>{}),qt=At.useRef(f);qt.current=f;const Ot=async(V,_t)=>{b("");try{await V()}catch(Kt){b(String(Kt)),_t==null||_t()}},se=V=>{_(null),p(_t=>({..._t,...V}))},te=Object.fromEntries(Object.entries(h).filter(([V])=>!["inputCamera","confidenceKeep","hiddenLayers"].includes(V))),Ie=Object.entries(te).some(([V,_t])=>JSON.stringify(f[V])!==JSON.stringify(_t)),K=()=>{_(Object.fromEntries(Object.keys(te).map(V=>[V,f[V]]))),p(V=>({...V,...te}))};At.useEffect(()=>{if(!t.current||!n.current)return;const V=new Vw(t.current);a.current=V,V.onSeek=Qe=>{j(!1),Ct.current.time=Qe,ve(Qe)},V.onMotionCounts=Qe=>Rt(Vn=>Vn.still===Qe.still&&Vn.moving===Qe.moving?Vn:Qe);const _t=new ResizeObserver(()=>{n.current&&V.resize(n.current.clientWidth,n.current.clientHeight)});_t.observe(n.current);let Kt=0,me=performance.now(),Ae=0;const ie=Qe=>{const Vn=Math.min((Qe-me)/1e3,.1);if(me=Qe,Ct.current.playing){const[cr,nn]=V.range(),Ha=Vn*Ct.current.speed;let gn=Ct.current.time+Ha;Ct.current.time===nn?(Ae+=Ha,gn=Ae>=Ct.current.frameDuration?cr:nn):(Ae=0,gn=Math.min(gn,nn)),Ct.current.time=gn,ve(gn),V.setTime(gn)}else Ae=0;V.render(Vn),Kt=requestAnimationFrame(ie)};Kt=requestAnimationFrame(ie);const Le=new Map;let en=!1,Ve=!1;const Fe=async()=>{var Qe,Vn,cr;if(!en){en=!0;try{const nn=await(await Fn("/api/status")).json();if(Ve)return;x(nn);for(const gn of Le.keys())nn.tabs.some(ka=>ka.id===gn)||Le.delete(gn);xe.current!==null&&nn.active!==xe.current&&Jt.current(nn.clip),xe.current=nn.active;const Ha=`${nn.active}:${nn.scene_key}`;if(Ha!==Gt.current){_(null),Yt(!0);let gn=Le.get(nn.active);if((gn==null?void 0:gn.key)!==nn.scene_key){const Bi=await Fn("/api/scene"),$i=await Bi.json();if(Ve||Bi.headers.get("X-Scene-Key")!==nn.scene_key)return;gn={key:nn.scene_key,data:$i,bytes:Su($i)}}const ka=gn.data;ka.presentation=nn.presentation,Le.delete(nn.active),Le.set(nn.active,gn);let Rl=[...Le.values()].reduce((Bi,$i)=>Bi+$i.bytes,0)-gn.bytes;for(const[Bi,$i]of Le){if(Rl<=r.browser_memory_gb*2**30)break;Bi!==nn.active&&(Le.delete(Bi),Rl-=$i.bytes)}fe(!1),c(ka),j(!1),jt(((cr=(Vn=(Qe=ka.metadata)==null?void 0:Qe.layers)==null?void 0:Vn.at(-1))==null?void 0:cr.task)==="depth"?"depth":"3d");const As=await V.setScene(ka);if(!As)return;Gt.current=Ha,p(As),ve(V.range()[0]),fe(!0),Yt(!1),Wt(null)}}catch(nn){Ve||(b(String(nn)),Yt(!1))}finally{en=!1}}};wt.current=Fe,Fe();const Qi=setInterval(Fe,700);return()=>{Ve=!0,clearInterval(Qi),cancelAnimationFrame(Kt),_t.disconnect(),V.dispose(),a.current=null}},[]),At.useEffect(()=>{var V;(V=a.current)==null||V.setSettings(f)},[f]),At.useEffect(()=>R([]),[o]),At.useEffect(()=>{const V=_t=>{const Kt=_t.target;if(!ne.length||!["ArrowLeft","ArrowRight"].includes(_t.key)||_t.metaKey||_t.ctrlKey||_t.altKey||Kt&&Kt.id!=="time"&&(["INPUT","TEXTAREA","SELECT"].includes(Kt.tagName)||Kt.isContentEditable))return;_t.preventDefault();const me=Ct.current.time,Ae=_t.key==="ArrowRight"?ne.find(ie=>ie>me+1e-6)??ne[0]:[...ne].reverse().find(ie=>ie<me-1e-6)??ne[ne.length-1];j(!1),Ct.current.time=Ae,ve(Ae)};return window.addEventListener("keydown",V),()=>window.removeEventListener("keydown",V)},[ne]),At.useEffect(()=>{var V;(V=a.current)==null||V.setTime(Ht)},[Ht]),Jt.current=V=>{const _t=++kt.current;if(!V){z(null),k([]),w("images"),G(!0),Dt(null),H("Input"),W({start:0,stop:1,step:1}),N(R0(r)),Zt(1);return}const[Kt,me,Ae,ie,Le]=V;Ot(async()=>{const en=hu(Kt)?Kt:[["",Kt]],Ve=await Promise.all(en.map(async([Fe,Qi])=>{const Qe=await(await Fn(`/api/source?${yu(Qi)}`)).json();return{...Qe,name:Fe||Qe.name}}));_t===kt.current&&(hu(Kt)?(k(Ve),w("streams")):(z(Ve[0]),w("images")),G(!1),W({start:me,stop:Le?Le[Le.length-1]+1:Math.min(...Ve.map(Fe=>Fe.frames),me+Ae*(ie-1)+1),step:Ae,...Le?{indices:Le}:{}}),N(Fe=>({...Fe,sourceFrame:0,region:[0,0,1,1],points:[],seedViews:void 0,viewSeeds:void 0})))})};const Bt=V=>{V!==g.active&&(Wt(V),Ot(async()=>{await vn(),await ms(`/api/tabs/${V}/activate`,{}),await wt.current()},()=>Wt(null)))},ht=()=>{Wt("new"),Ot(async()=>{await vn(),await ms("/api/tabs",{}),await wt.current()},()=>Wt(null))},xt=V=>Ot(async()=>{(V!==g.active||X)&&!window.confirm("Close this tab? Its results are discarded unless saved.")||await Fn(`/api/tabs/${V}`,{method:"DELETE"})}),Nt=V=>Ot(async()=>{var _t;await ms("/api/presentation",{settings:{...qt.current,hiddenLayers:[]},view:(_t=a.current)==null?void 0:_t.view()}),await V(),R([])}),Pt=(V,_t)=>Ot(async()=>{const Kt=++kt.current,me=await(await Fn(`/api/source?${yu(V)}`)).json();Kt===kt.current&&(z(me),G(!1),W(xd(me.frames,_t)),N(Ae=>({...Ae,sourceFrame:0,region:[0,0,1,1],points:[],seedViews:void 0,viewSeeds:void 0})))}),re=V=>{k(V),Dt(null),!(V.length===A.length&&V.every((_t,Kt)=>gs(_t.path)===gs(A[Kt].path)))&&(V.length&&W(xd(Math.min(...V.map(_t=>_t.frames)),r.loader)),N(_t=>({..._t,sourceFrame:0,seedViews:void 0,viewSeeds:void 0})))},Ke=async(V,_t)=>{try{const Kt=await Promise.all(V.map(async Ae=>(await Fn(`/api/source?${yu(Ae)}`)).json())),me=_t===void 0?[...A]:A.filter((Ae,ie)=>ie!==_t);for(const Ae of Kt){if(me.some(en=>gs(en.path)===gs(Ae.path)))continue;let ie=Ae.name,Le=2;for(;me.some(en=>en.name===ie);)ie=`${Ae.name} (${Le++})`;_t===void 0?me.push({...Ae,name:ie}):me.splice(_t,0,{...Ae,name:ie})}re(me)}catch(Kt){b(String(Kt))}},ln=V=>{w(V),Dt(null),G(!1);const _t=V==="streams"?A.length&&Math.min(...A.map(Kt=>Kt.frames)):L==null?void 0:L.frames;W(_t?xd(_t,r.loader):{start:0,stop:1,step:1}),N(Kt=>({...Kt,sourceFrame:0,region:[0,0,1,1],points:[],seedViews:void 0,viewSeeds:void 0}))};At.useEffect(()=>{var V;(V=a.current)!=null&&V.setDefaults(h)&&p(h),G(!0)},[]);const Ue=V=>{W(V),N(_t=>{const Kt=_t.sourceFrame<ys(V).length?_t.sourceFrame:0,me=ys(nt)[_t.sourceFrame]!==ys(V)[Kt];return{..._t,sourceFrame:Kt,points:me?[]:_t.points,viewSeeds:me?Object.fromEntries(Object.entries(_t.viewSeeds??{}).map(([Ae,ie])=>[Ae,{...ie,points:[]}])):_t.viewSeeds}})},vn=()=>{var V;return ms("/api/presentation",{settings:qt.current,view:(V=a.current)==null?void 0:V.view()})},an=ys(nt).length,xi=ot&&{...$?{streams:A.map(({name:V,path:_t})=>({name:V,path:_t}))}:{path:ot.path},start:nt.start,stride:nt.step,frames:an,frame_indices:nt.indices,...pR(it,$?A.length:void 0)},Ki=JSON.stringify(xi),ci=JSON.stringify(xi&&{...xi,tasks:xi.tasks.map(V=>V.task==="track"?{...V,stride:void 0}:V)}),Hn=Tt&&Tt.requestKey===Ki?Tt.result:null,ua=Tt&&Tt.previewKey===ci?Tt.result:null;At.useEffect(()=>{if(mt(""),!xi||!it.tasks.length){Dt(null);return}const V=new AbortController,_t=setTimeout(()=>void Fn("/api/plan",{method:"POST",headers:{"Content-Type":"application/json"},body:Ki,signal:V.signal}).then(Kt=>Kt.json()).then(Kt=>{V.signal.aborted||Dt({requestKey:Ki,previewKey:ci,result:Kt})}).catch(Kt=>{V.signal.aborted||mt(String(Kt))}),150);return()=>{clearTimeout(_t),V.abort()}},[Ki]);const Ts=ot&&[$?A.map(({name:V,path:_t})=>[V,_t]):ot.path,nt.start,nt.step,an,...nt.indices?[nt.indices]:[]],kn=!!Ts&&JSON.stringify(Ts)===JSON.stringify(g.clip),pn=kn?g.encoded?"Reuses the encoded clip and adds to this scene":"Encodes the clip again and adds to this scene":g.has_result?"Encodes the clip and replaces this tab's scene; open a new tab to keep it":"Encodes the clip first",mn=()=>Ot(async()=>{kn&&await vn(),await ms("/api/run",xi),x({...g,state:"running",stage:"starting",detail:"",steps:[]})}),Pi=async V=>{if(typeof V=="string")await ms("/api/open",{path:V});else{const _t=new FormData;_t.append("file",V),await Fn("/api/load",{method:"POST",body:_t})}await wt.current()},Fa=()=>Ot(async()=>{await vn(),C0(await(await Fn("/api/save-scene")).blob(),"view.arrow.json")}),ui=g.state==="running"||he,Gn=((ee=a.current)==null?void 0:ee.range())??[0,0],Ia=Math.max(0,ne.filter(V=>V<=Ht+1e-6).length-1),Yn=((Se=o==null?void 0:o.metadata)==null?void 0:Se.layers)??[],zi=Yn.map((V,_t)=>V.task==="depth"&&!f.hiddenLayers.includes(_t)).lastIndexOf(!0),C=zi>=0?Ut:"3d",Y=(o==null?void 0:o.points.reduce((V,_t)=>V+_t.positions.length,0))??0,ct=(o==null?void 0:o.tracks.filter(V=>!V.mode||V.mode===f.trajectoryMode).reduce((V,_t)=>{var Kt;return V+(((Kt=_t.positions[0])==null?void 0:Kt.length)??0)},0))??0,rt=new Set(o==null?void 0:o.cameras.map(V=>`${V.image}@${V.time}`)).size,X=Y+ct+rt>0||Yn.some(V=>V.task==="depth"),Et=Uu.filter(V=>it.tasks.includes(V.value)),zt=Et.length===1?Et[0].action:Et.length?`Run ${Et.length} tasks`:"Run",Ft=it.tasks.includes("track")||it.tasks.includes("all_pixels"),It=r.host,Qt=$?v.jsx(qw,{streams:A,host:It,root:r.root,onChange:re,onAdd:async(V,_t)=>{await Ke(V,_t),F(!1),G(!1)},onError:b}):v.jsx(dx,{host:It,start:(ot==null?void 0:ot.path)??null,current:(ot==null?void 0:ot.path)??r.example??void 0,onPick:V=>{F(!1),Pt(V,r.loader)},onError:b});return v.jsxs("div",{className:`app${at.left?"":" left-closed"}`,children:[v.jsxs("header",{children:[v.jsxs("div",{className:"brand-area",children:[v.jsxs("div",{className:"brand",children:[v.jsx("img",{src:"/arrow-icon.png",alt:""}),v.jsx("span",{children:"ARROW"})]}),v.jsx("button",{className:"icon-button panel-toggle","aria-pressed":at.left,"aria-label":at.left?"Hide the controls":"Show the controls",title:at.left?"Hide the controls":"Show the controls",onClick:()=>St("left"),children:v.jsx(D0,{side:"left"})})]}),v.jsx(yR,{tabs:g.tabs,active:g.active,pending:Te,disabled:ui||Te!==null,onSwitch:V=>void Bt(V),onNew:()=>void ht(),onClose:V=>void xt(V),onRename:(V,_t)=>void Ot(async()=>{await Fn(`/api/tabs/${V}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:_t})})}),onReorder:V=>void Ot(async()=>{await ms("/api/tabs/order",{ids:V})})}),v.jsxs("div",{className:"header-actions",children:[v.jsx("button",{className:"ghost",disabled:ui,onClick:()=>S(!0),children:"Open…"}),v.jsx("button",{disabled:!X,title:"Everything on screen: the drawn points, tracks, cameras and frames, the display settings and the camera angle. Reopens as it looks, without the predictions.",onClick:()=>void Fa(),children:"Save view"}),v.jsx("button",{disabled:!g.has_result,title:"The model's raw output for this tab: frames, queries and every prediction (.npz). Reopens as a scene with default display settings.",onClick:()=>void Ot(async()=>C0(await(await Fn("/api/result")).blob(),"arrow-result.npz")),children:"Save predictions"}),v.jsx("button",{className:"icon-button panel-toggle","aria-pressed":at.right,"aria-label":at.right?"Hide the input video":"Show the input video",title:at.right?"Hide the input video":"Show the input video",onClick:()=>St("right"),children:v.jsx(D0,{side:"right"})})]})]}),v.jsxs("div",{className:"workspace",children:[at.left&&v.jsxs("aside",{className:"sidebar",children:[v.jsx("nav",{className:"tabs",role:"tablist",children:MR.map(V=>v.jsx("button",{role:"tab","aria-selected":U===V,onClick:()=>H(V),children:V},V))}),v.jsxs("div",{className:"sidebar-body",hidden:U!=="Input",children:[v.jsxs("nav",{className:"subtabs input-tabs",role:"tablist","aria-label":"Input type",children:[v.jsx("button",{role:"tab","aria-selected":P==="images",onClick:()=>ln("images"),children:"Images & video"}),v.jsx("button",{role:"tab","aria-selected":P==="streams",onClick:()=>ln("streams"),children:"Multi-view streams"})]}),!y&&($?v.jsx(hn,{title:"Cameras",children:Qt}):v.jsx(hn,{title:"Clip",aside:ot&&ft?v.jsx("button",{className:"link",onClick:()=>G(!1),children:"Done"}):void 0,children:ot&&!ft?v.jsx(px,{clip:ot,host:It,onChange:()=>G(!0),onRemove:()=>{++kt.current,z(null),G(!0),Dt(null)}}):Qt})),ot&&($||!ft)&&v.jsxs(v.Fragment,{children:[v.jsxs(hn,{title:$?"Timesteps":"Frames",info:"Choose an exact frame count across the clip, or enter a fixed step. Drag the handles to trim the range.",children:[$&&v.jsxs("p",{className:"hint",children:[A.length," camera",A.length===1?"":"s"," × ",an," timesteps = ",A.length*an," frames. The same range applies to every camera."]}),v.jsx(Zw,{clip:ot,range:nt,onChange:Ue})]}),v.jsx(gR,{clip:ot,streams:$?A:void 0,range:nt,options:it,plans:ua,maxSide:r.loader.max_side,onChange:N})]}),Yn.length>0&&v.jsxs(hn,{title:"Results",info:"Each run adds a layer. Runs on this tab's clip and frames add here; another clip or frame selection replaces them, so open a new tab to keep a scene. Hide, merge (same kind) or remove layers.",children:[v.jsx("ul",{className:"layers",children:Yn.map((V,_t)=>{const Kt=f.hiddenLayers.includes(_t),me=Md[V.task];return v.jsxs("li",{className:Kt?"hidden-layer":void 0,children:[v.jsx("button",{className:"icon-button","aria-pressed":!Kt,"aria-label":`${Kt?"Show":"Hide"} ${V.label}`,title:Kt?"Show this layer":"Hide this layer",onClick:()=>se({hiddenLayers:Kt?f.hiddenLayers.filter(Ae=>Ae!==_t):[...f.hiddenLayers,_t]}),children:v.jsx(ER,{open:!Kt})}),v.jsxs("span",{children:[v.jsx("strong",{children:V.label}),v.jsxs("small",{children:[V.detail,V.sky_skipped?` · ${V.sky_skipped.toLocaleString()} sky skipped`:""]})]}),me&&Yn.filter(Ae=>Md[Ae.task]===me).length>1&&v.jsx("input",{type:"checkbox","aria-label":`Select ${V.label} to merge`,title:"Select to merge",checked:B.includes(_t),disabled:ui,onChange:Ae=>R(Ae.target.checked?[...B,_t]:B.filter(ie=>ie!==_t))}),v.jsx("button",{className:"icon-button","aria-label":`Remove ${V.label}`,disabled:ui,onClick:()=>void Nt(()=>Fn(`/api/layers/${_t}`,{method:"DELETE"})),children:"×"})]},_t)})}),B.length>1&&v.jsxs("button",{disabled:ui||new Set(B.map(V=>{var _t;return Md[(_t=Yn[V])==null?void 0:_t.task]})).size>1,title:"Join the selected layers into one: tracking with tracking, or reconstruction with reconstruction",onClick:()=>void Nt(()=>ms("/api/layers/merge",{indices:B})),children:["Merge ",B.length," layers"]})]})]}),v.jsx("div",{className:"sidebar-body",hidden:U!=="Display",children:v.jsx(cR,{settings:f,data:o,counts:bt,stageName:Ru,info:{source:g.clip?hu(g.clip[0])?`${g.clip[0].length} camera streams`:Array.isArray(g.clip[0])?`${g.clip[0].length} selected images`:g.clip[0]:null,clip:g.clip&&ot&&!hu(g.clip[0])&&gs(ot.path)===gs(g.clip[0])?ot:null,host:It,selection:g.clip?g.clip[4]?`selected frames ${g.clip[4][0]}–${g.clip[4][g.clip[4].length-1]}`:`from frame ${g.clip[1]}, every ${g.clip[2]}`:"",checkpoint:r.checkpoint,device:r.device,steps:g.steps,peakBytes:g.peak_bytes},onFit:()=>{var V;return(V=a.current)==null?void 0:V.fit()},onChange:se})}),v.jsxs("footer",{className:"display-reset",hidden:U!=="Display",children:[v.jsx("button",{disabled:!Ie||he||Te!==null,onClick:K,children:"Reset display to defaults"}),v.jsx("div",{role:"status",children:m&&v.jsxs("div",{className:"hint row",children:[v.jsx("span",{children:"Display settings reset."}),v.jsx("button",{className:"link",disabled:Te!==null,onClick:()=>se(m),children:"Undo"})]})})]}),v.jsxs("footer",{className:"run",hidden:U!=="Input",children:[J&&v.jsx("p",{className:"hint",role:"status",children:J}),ua&&ot&&!ui&&v.jsxs("div",{className:"readout",id:"readout",children:[v.jsxs("strong",{children:[it.tasks.includes("all_pixels")?"up to ":"",(Hn==null?void 0:Hn.queries.toLocaleString())??"…"]})," queries · ",$?`${A.length} camera{streams.length === 1 ? '' : 's'} × ${an} timesteps`:`${an} frame${an===1?"":"s"}`,ua.tracks?` · ${(Hn==null?void 0:Hn.tracks.toLocaleString())??"…"} tracks`:"",v.jsxs("span",{children:[pn,g.peak_bytes?` · last run peaked at ${(g.peak_bytes/2**30).toFixed(1)} GB GPU memory`:""]})]}),g.state==="running"?v.jsx("button",{className:"wide",onClick:()=>void Ot(async()=>{await Fn("/api/cancel",{method:"POST"})}),children:"Cancel"}):v.jsx("button",{id:"run-inference",className:"primary wide",disabled:!xi||!$&&ft||he||!(Hn!=null&&Hn.queries),onClick:()=>void mn(),children:zt}),(ui||g.state==="error")&&g.steps.length+Number(ui)>0&&v.jsx(AR,{status:g,receiving:he}),v.jsx("div",{id:"status",role:"status",children:g.state==="running"?`${Ru(g.stage)}…`:he?"Loading the scene into the viewer…":g.state==="error"?g.stage:g.state==="cancelled"?"Cancelled":dn&&X?`Scene ready${g.steps.length?` · ran in ${g.steps.reduce((V,_t)=>V+_t.seconds,0).toFixed(1)} s`:""}`:ot?"Ready to run":"Choose a clip"})]})]}),v.jsxs("main",{ref:n,className:"viewport",children:[v.jsx("canvas",{ref:t,tabIndex:0,id:"scene-canvas","aria-label":"3D scene: drag to orbit, right-drag to pan, scroll to zoom, WASD and Q/E to move, double-click a camera to look through it"}),C==="depth"&&zi>=0&&o&&v.jsx(_R,{data:o,layer:Yn[zi],index:zi,time:Ht,camera:lt}),!X&&(ot&&!ft?v.jsx("div",{className:"input-previews",children:($?A:[ot]).map(V=>v.jsx(xR,{clip:V,range:nt,start:Ft?it.sourceFrame:void 0},gs(V.path)))}):v.jsxs("div",{className:"no-scene",children:[v.jsx("h1",{children:"No scene loaded"}),v.jsxs("p",{children:["Choose a clip on ",It||"the server"," to run ARROW, or open a saved scene or prediction file."]}),v.jsxs("div",{className:"row",children:[v.jsx("button",{className:"primary",onClick:()=>{H("Input"),G(!0),b(""),F(!0),at.left||St("left")},children:"Choose clip"}),v.jsx("button",{disabled:ui,onClick:()=>S(!0),children:"Open file…"})]})]})),v.jsxs("div",{className:"viewport-bar",children:[zi>=0&&v.jsx(li,{label:"View",value:C,options:[{value:"3d",label:"3D"},{value:"depth",label:"Depth"}],onChange:jt}),v.jsx("span",{className:"spacer"}),v.jsxs("div",{className:"scene-summary",children:[X&&v.jsxs("div",{className:"scene-info",children:[Y>0&&v.jsxs("span",{children:[Y.toLocaleString()," points"]}),ct>0&&v.jsxs("span",{children:[ct.toLocaleString()," tracks"]}),rt>0&&v.jsxs("span",{children:[rt," camera poses"]}),v.jsx("span",{title:o==null?void 0:o.scale,children:"Relative scale"})]}),C==="3d"&&v.jsxs("div",{className:"scene-controls",children:[v.jsxs("span",{className:"frusta-control",tabIndex:rt?void 0:0,"aria-describedby":"frusta-tooltip",children:[v.jsxs("button",{className:"frusta-toggle","aria-label":"Show frusta","aria-describedby":"frusta-tooltip","aria-pressed":rt>0&&f.cameras,disabled:!rt,onClick:()=>se({cameras:!f.cameras}),children:[v.jsxs("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinejoin:"round","aria-hidden":"true",children:[v.jsx("path",{d:"M9 4h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-3Z"}),v.jsx("circle",{cx:"12",cy:"13",r:"4"})]}),"Frusta"]}),v.jsx("span",{id:"frusta-tooltip",className:"frusta-tooltip",role:"tooltip",children:rt?(f.cameras?"Hide":"Show")+" camera frusta and image planes. Adjust size and opacity in Display → Cameras.":"No camera predictions available. Run Camera poses."})]}),Y+ct>0&&v.jsx("div",{className:"scene-confidence",children:v.jsx(Ni,{label:v.jsxs(v.Fragment,{children:["Confidence ",v.jsx(rr,{text:"Keep the most confident tracks. Track confidence is the mean point confidence across all frames."})]}),name:"Confidence",value:f.confidenceKeep,min:0,max:1,step:.001,display:`keep ${(f.confidenceKeep*100).toFixed(1)}%`,recommended:(Ge=(Ce=o==null?void 0:o.metadata)==null?void 0:Ce.recommended)==null?void 0:Ge.confidenceKeep,onChange:V=>se({confidenceKeep:V})})})]})]})]}),X&&C==="3d"&&v.jsx("div",{className:"nav-hint","aria-hidden":"true",children:"Drag to orbit · right-drag to pan · wheel-drag to tilt · WASD/QE to move · ←/→ frames · double-click a camera to look through it"}),X&&v.jsxs("div",{className:"playback",children:[v.jsx("button",{id:"play",className:"play","aria-label":Re?"Pause":"Play",disabled:!dn||Gn[0]===Gn[1],onClick:()=>j(!Re),children:Re?v.jsxs("svg",{viewBox:"0 0 16 16",children:[v.jsx("rect",{x:"3.5",y:"2.5",width:"3",height:"11",rx:"1"}),v.jsx("rect",{x:"9.5",y:"2.5",width:"3",height:"11",rx:"1"})]}):v.jsx("svg",{viewBox:"0 0 16 16",children:v.jsx("path",{d:"M4.5 2.8v10.4c0 .6.6.9 1.1.6l8.2-5.2c.5-.3.5-.9 0-1.2L5.6 2.2c-.5-.3-1.1 0-1.1.6z"})})}),v.jsxs("div",{className:"timeline",title:"Tick marks show individual frames. Use ←/→ to step through them.",children:[v.jsx("input",{id:"time","aria-label":"Scene time",type:"range","aria-valuetext":`Frame ${Ia+1} of ${ne.length}, time ${Ht.toFixed(2)}`,disabled:!dn||Gn[0]===Gn[1],min:Gn[0],max:Gn[1],step:"any",value:Ht,style:{"--fill":`${100*(Ht-Gn[0])/Math.max(1e-9,Gn[1]-Gn[0])}%`},onChange:V=>{j(!1),ve(Number(V.target.value))}}),v.jsx("div",{className:"frame-ticks","aria-hidden":"true",children:ne.map((V,_t)=>v.jsx("i",{className:_t===Ia?"current":void 0,style:{left:`${100*(V-Gn[0])/Math.max(1e-9,Gn[1]-Gn[0])}%`}},V))})]}),v.jsx("output",{id:"time-value",children:Ht.toFixed(2)}),ne.length>0&&v.jsxs("output",{id:"frame-value",children:["Frame ",Ia+1,"/",ne.length]}),v.jsx("select",{className:"speed","aria-label":"Playback speed",title:"Playback speed",value:vt,onChange:V=>Zt(Number(V.target.value)),children:bR.map(V=>v.jsxs("option",{value:V,children:[V,"×"]},V))}),C==="3d"&&v.jsx("button",{title:"Look at the scene from just behind the reference camera",onClick:()=>{var V;return(V=a.current)==null?void 0:V.fit()},children:"Reset view"})]}),M&&v.jsxs("div",{role:"alert",className:"error",children:[v.jsx("span",{children:M}),v.jsx("button",{className:"icon-button","aria-label":"Dismiss",onClick:()=>b(""),children:"×"})]}),Te!==null&&v.jsxs("div",{className:"tab-loading",role:"status",children:[v.jsx("span",{className:"spinner","aria-hidden":"true"}),Te==="new"?"Opening a new tab…":`Loading ${((He=g.tabs.find(V=>V.id===Te))==null?void 0:He.name)??"the tab"}…`]})]}),at.right&&v.jsxs("aside",{className:"sidebar side-panel","aria-label":"Input video",children:[v.jsxs("div",{className:"side-title",children:[v.jsx("h2",{children:"Input images"}),v.jsx("button",{className:"icon-button","aria-label":"Hide the input video",onClick:()=>St("right"),children:"×"})]}),(((ue=o==null?void 0:o.metadata)==null?void 0:ue.num_views)??1)>1&&v.jsxs("label",{className:"camera-select",children:["Preview camera ",v.jsx("select",{"aria-label":"Preview camera",value:lt,onChange:V=>se({inputCamera:Number(V.target.value)}),children:(sn=(Vt=o==null?void 0:o.metadata)==null?void 0:Vt.view_names)==null?void 0:sn.map((V,_t)=>v.jsx("option",{value:_t,children:V},_t))})]}),o&&o.images.some(V=>V.name.split("/")[0]==="rgb")?v.jsx(vR,{data:o,time:Ht,camera:lt}):v.jsx("p",{className:"hint",children:"Appears once a scene is loaded."})]})]}),y&&v.jsxs("dialog",{ref:O,className:"scene-dialog","aria-labelledby":"choose-clip-title",onCancel:()=>F(!1),children:[v.jsxs("div",{className:"group-title",children:[v.jsx("h2",{id:"choose-clip-title",children:$?"Choose cameras":"Choose clip"}),v.jsx("button",{className:"icon-button","aria-label":"Close clip chooser",onClick:()=>F(!1),children:"×"})]}),Qt,M&&v.jsx("p",{role:"alert",className:"open-error",children:M})]}),T&&v.jsx(Yw,{host:It,root:r.results_root,onOpen:Pi,onClose:()=>S(!1)})]})}const _p=DS.createRoot(document.getElementById("root"));_p.render(v.jsx("main",{className:"no-scene",role:"status",children:"Loading viewer…"}));Fn("/api/config").then(r=>r.json()).then(r=>{_p.render(v.jsx(wR,{config:r}))}).catch(r=>{_p.render(v.jsxs("main",{className:"no-scene",role:"alert",children:[v.jsx("h1",{children:"Could not load viewer settings"}),v.jsx("p",{children:String(r)})]}))});
