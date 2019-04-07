(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"244d":function(t,e,n){},"2f62":function(t,e,n){"use strict";n.r(e),n.d(e,"Store",function(){return h}),n.d(e,"install",function(){return x}),n.d(e,"mapState",function(){return C}),n.d(e,"mapMutations",function(){return S}),n.d(e,"mapGetters",function(){return P}),n.d(e,"mapActions",function(){return A}),n.d(e,"createNamespacedHelpers",function(){return G});
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var o=function(t){var e=Number(t.version.split(".")[0]);if(e>=2)t.mixin({beforeCreate:o});else{var n=t.prototype._init;t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[o].concat(t.init):o,n.call(this,t)}}function o(){var t=this.$options;t.store?this.$store="function"===typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}},i="undefined"!==typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function r(t){i&&(t._devtoolHook=i,i.emit("vuex:init",t),i.on("vuex:travel-to-state",function(e){t.replaceState(e)}),t.subscribe(function(t,e){i.emit("vuex:mutation",t,e)}))}function u(t,e){Object.keys(t).forEach(function(n){return e(t[n],n)})}function a(t){return null!==t&&"object"===typeof t}function c(t){return t&&"function"===typeof t.then}var s=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=("function"===typeof n?n():n)||{}},f={namespaced:{configurable:!0}};f.namespaced.get=function(){return!!this._rawModule.namespaced},s.prototype.addChild=function(t,e){this._children[t]=e},s.prototype.removeChild=function(t){delete this._children[t]},s.prototype.getChild=function(t){return this._children[t]},s.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},s.prototype.forEachChild=function(t){u(this._children,t)},s.prototype.forEachGetter=function(t){this._rawModule.getters&&u(this._rawModule.getters,t)},s.prototype.forEachAction=function(t){this._rawModule.actions&&u(this._rawModule.actions,t)},s.prototype.forEachMutation=function(t){this._rawModule.mutations&&u(this._rawModule.mutations,t)},Object.defineProperties(s.prototype,f);var l=function(t){this.register([],t,!1)};function p(t,e,n){if(e.update(n),n.modules)for(var o in n.modules){if(!e.getChild(o))return void 0;p(t.concat(o),e.getChild(o),n.modules[o])}}l.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},l.prototype.getNamespace=function(t){var e=this.root;return t.reduce(function(t,n){return e=e.getChild(n),t+(e.namespaced?n+"/":"")},"")},l.prototype.update=function(t){p([],this.root,t)},l.prototype.register=function(t,e,n){var o=this;void 0===n&&(n=!0);var i=new s(e,n);if(0===t.length)this.root=i;else{var r=this.get(t.slice(0,-1));r.addChild(t[t.length-1],i)}e.modules&&u(e.modules,function(e,i){o.register(t.concat(i),e,n)})},l.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1];e.getChild(n).runtime&&e.removeChild(n)};var d;var h=function(t){var e=this;void 0===t&&(t={}),!d&&"undefined"!==typeof window&&window.Vue&&x(window.Vue);var n=t.plugins;void 0===n&&(n=[]);var o=t.strict;void 0===o&&(o=!1);var i=t.state;void 0===i&&(i={}),"function"===typeof i&&(i=i()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new l(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new d;var u=this,a=this,c=a.dispatch,s=a.commit;this.dispatch=function(t,e){return c.call(u,t,e)},this.commit=function(t,e,n){return s.call(u,t,e,n)},this.strict=o,_(this,i,[],this._modules.root),y(this,i),n.forEach(function(t){return t(e)}),d.config.devtools&&r(this)},m={state:{configurable:!0}};function v(t,e){return e.indexOf(t)<0&&e.push(t),function(){var n=e.indexOf(t);n>-1&&e.splice(n,1)}}function g(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;_(t,n,[],t._modules.root,!0),y(t,n,e)}function y(t,e,n){var o=t._vm;t.getters={};var i=t._wrappedGetters,r={};u(i,function(e,n){r[n]=function(){return e(t)},Object.defineProperty(t.getters,n,{get:function(){return t._vm[n]},enumerable:!0})});var a=d.config.silent;d.config.silent=!0,t._vm=new d({data:{$$state:e},computed:r}),d.config.silent=a,t.strict&&j(t),o&&(n&&t._withCommit(function(){o._data.$$state=null}),d.nextTick(function(){return o.$destroy()}))}function _(t,e,n,o,i){var r=!n.length,u=t._modules.getNamespace(n);if(o.namespaced&&(t._modulesNamespaceMap[u]=o),!r&&!i){var a=E(e,n.slice(0,-1)),c=n[n.length-1];t._withCommit(function(){d.set(a,c,o.state)})}var s=o.context=b(t,u,n);o.forEachMutation(function(e,n){var o=u+n;O(t,o,e,s)}),o.forEachAction(function(e,n){var o=e.root?n:u+n,i=e.handler||e;$(t,o,i,s)}),o.forEachGetter(function(e,n){var o=u+n;M(t,o,e,s)}),o.forEachChild(function(o,r){_(t,e,n.concat(r),o,i)})}function b(t,e,n){var o=""===e,i={dispatch:o?t.dispatch:function(n,o,i){var r=k(n,o,i),u=r.payload,a=r.options,c=r.type;return a&&a.root||(c=e+c),t.dispatch(c,u)},commit:o?t.commit:function(n,o,i){var r=k(n,o,i),u=r.payload,a=r.options,c=r.type;a&&a.root||(c=e+c),t.commit(c,u,a)}};return Object.defineProperties(i,{getters:{get:o?function(){return t.getters}:function(){return w(t,e)}},state:{get:function(){return E(t.state,n)}}}),i}function w(t,e){var n={},o=e.length;return Object.keys(t.getters).forEach(function(i){if(i.slice(0,o)===e){var r=i.slice(o);Object.defineProperty(n,r,{get:function(){return t.getters[i]},enumerable:!0})}}),n}function O(t,e,n,o){var i=t._mutations[e]||(t._mutations[e]=[]);i.push(function(e){n.call(t,o.state,e)})}function $(t,e,n,o){var i=t._actions[e]||(t._actions[e]=[]);i.push(function(e,i){var r=n.call(t,{dispatch:o.dispatch,commit:o.commit,getters:o.getters,state:o.state,rootGetters:t.getters,rootState:t.state},e,i);return c(r)||(r=Promise.resolve(r)),t._devtoolHook?r.catch(function(e){throw t._devtoolHook.emit("vuex:error",e),e}):r})}function M(t,e,n,o){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(t){return n(o.state,o.getters,t.state,t.getters)})}function j(t){t._vm.$watch(function(){return this._data.$$state},function(){0},{deep:!0,sync:!0})}function E(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function k(t,e,n){return a(t)&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}function x(t){d&&t===d||(d=t,o(d))}m.state.get=function(){return this._vm._data.$$state},m.state.set=function(t){0},h.prototype.commit=function(t,e,n){var o=this,i=k(t,e,n),r=i.type,u=i.payload,a=(i.options,{type:r,payload:u}),c=this._mutations[r];c&&(this._withCommit(function(){c.forEach(function(t){t(u)})}),this._subscribers.forEach(function(t){return t(a,o.state)}))},h.prototype.dispatch=function(t,e){var n=this,o=k(t,e),i=o.type,r=o.payload,u={type:i,payload:r},a=this._actions[i];if(a)return this._actionSubscribers.forEach(function(t){return t(u,n.state)}),a.length>1?Promise.all(a.map(function(t){return t(r)})):a[0](r)},h.prototype.subscribe=function(t){return v(t,this._subscribers)},h.prototype.subscribeAction=function(t){return v(t,this._actionSubscribers)},h.prototype.watch=function(t,e,n){var o=this;return this._watcherVM.$watch(function(){return t(o.state,o.getters)},e,n)},h.prototype.replaceState=function(t){var e=this;this._withCommit(function(){e._vm._data.$$state=t})},h.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"===typeof t&&(t=[t]),this._modules.register(t,e),_(this,this.state,t,this._modules.get(t),n.preserveState),y(this,this.state)},h.prototype.unregisterModule=function(t){var e=this;"string"===typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var n=E(e.state,t.slice(0,-1));d.delete(n,t[t.length-1])}),g(this)},h.prototype.hotUpdate=function(t){this._modules.update(t),g(this,!0)},h.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(h.prototype,m);var C=H(function(t,e){var n={};return N(e).forEach(function(e){var o=e.key,i=e.val;n[o]=function(){var e=this.$store.state,n=this.$store.getters;if(t){var o=L(this.$store,"mapState",t);if(!o)return;e=o.context.state,n=o.context.getters}return"function"===typeof i?i.call(this,e,n):e[i]},n[o].vuex=!0}),n}),S=H(function(t,e){var n={};return N(e).forEach(function(e){var o=e.key,i=e.val;n[o]=function(){var e=[],n=arguments.length;while(n--)e[n]=arguments[n];var o=this.$store.commit;if(t){var r=L(this.$store,"mapMutations",t);if(!r)return;o=r.context.commit}return"function"===typeof i?i.apply(this,[o].concat(e)):o.apply(this.$store,[i].concat(e))}}),n}),P=H(function(t,e){var n={};return N(e).forEach(function(e){var o=e.key,i=e.val;i=t+i,n[o]=function(){if(!t||L(this.$store,"mapGetters",t))return this.$store.getters[i]},n[o].vuex=!0}),n}),A=H(function(t,e){var n={};return N(e).forEach(function(e){var o=e.key,i=e.val;n[o]=function(){var e=[],n=arguments.length;while(n--)e[n]=arguments[n];var o=this.$store.dispatch;if(t){var r=L(this.$store,"mapActions",t);if(!r)return;o=r.context.dispatch}return"function"===typeof i?i.apply(this,[o].concat(e)):o.apply(this.$store,[i].concat(e))}}),n}),G=function(t){return{mapState:C.bind(null,t),mapGetters:P.bind(null,t),mapMutations:S.bind(null,t),mapActions:A.bind(null,t)}};function N(t){return Array.isArray(t)?t.map(function(t){return{key:t,val:t}}):Object.keys(t).map(function(e){return{key:e,val:t[e]}})}function H(t){return function(e,n){return"string"!==typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n)}}function L(t,e,n){var o=t._modulesNamespaceMap[n];return o}var V={Store:h,install:x,version:"3.0.1",mapState:C,mapMutations:S,mapGetters:P,mapActions:A,createNamespacedHelpers:G};e["default"]=V},4441:function(t,e,n){"use strict";var o=n("244d"),i=n.n(o);i.a},"5a26":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("a34a")),i=u(n("f3d3")),r=u(n("2f62"));function u(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,o,i,r,u){try{var a=t[r](u),c=a.value}catch(s){return void n(s)}a.done?e(c):Promise.resolve(c).then(o,i)}function c(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var r=t.apply(e,n);function u(t){a(r,o,i,u,c,"next",t)}function c(t){a(r,o,i,u,c,"throw",t)}u(void 0)})}}i.default.use(r.default);var s=new r.default.Store({state:{hasLogin:!1,loginProvider:"",openid:null},mutations:{login:function(t,e){t.hasLogin=!0,t.loginProvider=e},logout:function(t){t.hasLogin=!1,t.openid=null},setOpenid:function(t,e){t.openid=e}},actions:{getUserOpenId:function(){var e=c(o.default.mark(function e(n){var i,r;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return i=n.commit,r=n.state,e.next=3,new Promise(function(e,n){r.openid?e(r.openid):t.login({success:function(t){i("login"),setTimeout(function(){var t="123456789";console.log("uni.request mock openid["+t+"]"),i("setOpenid",t),e(t)},1e3)},fail:function(t){console.log("uni.login 接口调用失败，将无法正常使用开放接口等服务",t),n(t)}})});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}()}}),f=s;e.default=f}).call(this,n("6e42")["default"])},"744c":function(t,e,n){"use strict";n.r(e);var o=n("d242"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=i.a},"9bcf":function(t,e,n){"use strict";n("0460");var o=u(n("f3d3")),i=u(n("e719")),r=u(n("5a26"));function u(t){return t&&t.__esModule?t:{default:t}}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){c(t,e,n[e])})}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}o.default.config.productionTip=!1,o.default.prototype.$store=r.default,o.default.prototype.setData=function(t){var e,n,o=this,i=[];Object.keys(t).forEach(function(r){i=r.split("."),e=t[r],n=o.$data,i.forEach(function(t,r){r+1==i.length?o.$set(n,t,e):n[t]||o.$set(n,t,{}),n=n[t]})})},i.default.mpType="app";var s=new o.default(a({},i.default));s.$mount()},d242:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=o},e719:function(t,e,n){"use strict";n.r(e);var o=n("744c");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("4441");var r,u,a=n("2877"),c=Object(a["a"])(o["default"],r,u,!1,null,null,null);e["default"]=c.exports}},[["9bcf","common/runtime","common/vendor"]]]);