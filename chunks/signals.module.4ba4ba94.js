import{l as O,d as z}from"./preact.module.12c2dc38.js";import{F as U,_ as E,h as B}from"./hooks.module.49753d1f.js";function $(){throw new Error("Cycle detected")}function b(){if(v>1)v--;else{for(var t,i=!1;d!==void 0;){var r=d;for(d=void 0,m++;r!==void 0;){var n=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&P(r))try{r.c()}catch(f){i||(t=f,i=!0)}r=n}}if(m=0,v--,i)throw t}}function L(t){if(v>0)return t();v++;try{return t()}finally{b()}}var s=void 0,d=void 0,v=0,m=0,y=0;function j(t){if(s!==void 0){var i=t.n;if(i===void 0||i.t!==s)return s.s=i={i:0,S:t,p:void 0,n:s.s,t:s,e:void 0,x:void 0,r:i},t.n=i,32&s.f&&t.S(i),i;if(i.i===-1)return i.i=0,i.p!==void 0&&(i.p.n=i.n,i.n!==void 0&&(i.n.p=i.p),i.p=void 0,i.n=s.s,s.s.p=i,s.s=i),i}}function u(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}u.prototype.h=function(){return!0};u.prototype.S=function(t){this.t!==t&&t.e===void 0&&(t.x=this.t,this.t!==void 0&&(this.t.e=t),this.t=t)};u.prototype.U=function(t){var i=t.e,r=t.x;i!==void 0&&(i.x=r,t.e=void 0),r!==void 0&&(r.e=i,t.x=void 0),t===this.t&&(this.t=r)};u.prototype.subscribe=function(t){var i=this;return g(function(){var r=i.value,n=32&this.f;this.f&=-33;try{t(r)}finally{this.f|=n}})};u.prototype.valueOf=function(){return this.value};u.prototype.toString=function(){return this.value+""};u.prototype.peek=function(){return this.v};Object.defineProperty(u.prototype,"value",{get:function(){var t=j(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){m>100&&$(),this.v=t,this.i++,y++,v++;try{for(var i=this.t;i!==void 0;i=i.x)i.t.N()}finally{b()}}}});function C(t){return new u(t)}function P(t){for(var i=t.s;i!==void 0;i=i.n)if(i.S.i!==i.i||!i.S.h()||i.S.i!==i.i)return!0;return!1}function A(t){for(var i=t.s;i!==void 0;i=i.n){var r=i.S.n;r!==void 0&&(i.r=r),i.S.n=i,i.i=-1}}function F(t){for(var i=t.s,r=void 0;i!==void 0;){var n=i.n;i.i===-1?(i.S.U(i),i.n=void 0):(r!==void 0&&(r.p=i),i.p=void 0,i.n=r,r=i),i.S.n=i.r,i.r!==void 0&&(i.r=void 0),i=n}t.s=r}function a(t){u.call(this,void 0),this.x=t,this.s=void 0,this.g=y-1,this.f=4}(a.prototype=new u).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===y))return!0;if(this.g=y,this.f|=1,this.i>0&&!P(this))return this.f&=-2,!0;var t=s;try{A(this),s=this;var i=this.x();(16&this.f||this.v!==i||this.i===0)&&(this.v=i,this.f&=-17,this.i++)}catch(r){this.v=r,this.f|=16,this.i++}return s=t,F(this),this.f&=-2,!0};a.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var i=this.s;i!==void 0;i=i.n)i.S.S(i)}u.prototype.S.call(this,t)};a.prototype.U=function(t){if(u.prototype.U.call(this,t),this.t===void 0){this.f&=-33;for(var i=this.s;i!==void 0;i=i.n)i.S.U(i)}};a.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};a.prototype.peek=function(){if(this.h()||$(),16&this.f)throw this.v;return this.v};Object.defineProperty(a.prototype,"value",{get:function(){1&this.f&&$();var t=j(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function G(t){return new a(t)}function V(t){var i=t.u;if(t.u=void 0,typeof i=="function"){v++;var r=s;s=void 0;try{i()}catch(n){throw t.f&=-2,t.f|=8,k(t),n}finally{s=r,b()}}}function k(t){for(var i=t.s;i!==void 0;i=i.n)i.S.U(i);t.x=void 0,t.s=void 0,V(t)}function D(t){if(s!==this)throw new Error("Out-of-order effect");F(this),s=t,this.f&=-2,8&this.f&&k(this),b()}function p(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}p.prototype.c=function(){var t=this.S();try{!(8&this.f)&&this.x!==void 0&&(this.u=this.x())}finally{t()}};p.prototype.S=function(){1&this.f&&$(),this.f|=1,this.f&=-9,V(this),A(this),v++;var t=s;return s=this,D.bind(this,t)};p.prototype.N=function(){2&this.f||(this.f|=2,this.o=d,d=this)};p.prototype.d=function(){this.f|=8,1&this.f||k(this)};function g(t){var i=new p(t);return i.c(),i.d.bind(i)}var w,x;function c(t,i){O[t]=i.bind(null,O[t]||function(){})}function S(t){x&&x(),x=t&&t.S()}function q(t){var i=this,r=t.data,n=I(r);n.value=r;var f=U(function(){for(var o=i.__v;o=o.__;)if(o.__c){o.__c.__$f|=4;break}return i.__$u.c=function(){i.base.data=f.peek()},G(function(){var e=n.value.value;return e===0?0:e===!0?"":e||""})},[]);return f.value}q.displayName="_st";Object.defineProperties(u.prototype,{constructor:{configurable:!0},type:{configurable:!0,value:q},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});c("__b",function(t,i){if(typeof i.type=="string"){var r,n=i.props;for(var f in n)if(f!=="children"){var o=n[f];o instanceof u&&(r||(i.__np=r={}),r[f]=o,n[f]=o.peek())}}t(i)});c("__r",function(t,i){S();var r,n=i.__c;n&&(n.__$f&=-2,(r=n.__$u)===void 0&&(n.__$u=r=function(f){var o;return g(function(){o=this}),o.c=function(){n.__$f|=1,n.setState({})},o}())),w=n,S(r),t(i)});c("__e",function(t,i,r,n){S(),w=void 0,t(i,r,n)});c("diffed",function(t,i){S(),w=void 0;var r;if(typeof i.type=="string"&&(r=i.__e)){var n=i.__np,f=i.props;if(n){var o=r.U;if(o)for(var e in o){var h=o[e];h!==void 0&&!(e in n)&&(h.d(),o[e]=void 0)}else r.U=o={};for(var l in n){var _=o[l],N=n[l];_===void 0?(_=H(r,l,N,f),o[l]=_):_.o(N,f)}}}t(i)});function H(t,i,r,n){var f=i in t&&t.ownerSVGElement===void 0,o=C(r);return{o:function(e,h){o.value=e,n=h},d:g(function(){var e=o.value.value;n[i]!==e&&(n[i]=e,f?t[i]=e:e?t.setAttribute(i,e):t.removeAttribute(i))})}}c("unmount",function(t,i){if(typeof i.type=="string"){var r=i.__e;if(r){var n=r.U;if(n){r.U=void 0;for(var f in n){var o=n[f];o&&o.d()}}}}else{var e=i.__c;if(e){var h=e.__$u;h&&(e.__$u=void 0,h.d())}}t(i)});c("__h",function(t,i,r,n){n<3&&(i.__$f|=2),t(i,r,n)});z.prototype.shouldComponentUpdate=function(t,i){var r=this.__$u;if(!(r&&r.s!==void 0||4&this.__$f)||3&this.__$f)return!0;for(var n in i)return!0;for(var f in t)if(f!=="__source"&&t[f]!==this.props[f])return!0;for(var o in this.props)if(!(o in t))return!0;return!1};function I(t){return U(function(){return C(t)},[])}function M(t){var i=E(t);return i.current=t,w.__$f|=4,U(function(){return G(function(){return i.current()})},[])}function Q(t){var i=E(t);i.current=t,B(function(){return g(function(){i.current()})},[])}export{u as Signal,L as batch,G as computed,g as effect,C as signal,M as useComputed,I as useSignal,Q as useSignalEffect};