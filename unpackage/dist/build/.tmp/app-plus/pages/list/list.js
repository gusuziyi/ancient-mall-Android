(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/list"],{"0c44":function(t,e,a){},"0fb8":function(t,e,a){"use strict";a.r(e);var n=a("2852"),i=a("5054");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("e559");var u=a("2877"),r=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,"1635dab6",null);e["default"]=r.exports},1020:function(t,e,a){"use strict";a.r(e);var n=a("e6ec"),i=a("174d");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("276d");var u=a("2877"),r=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,"69214afd",null);e["default"]=r.exports},"15aa":function(t){t.exports=[{name:"潮流推荐",style:"chao",url:"../fashion/fashion"},{name:"拼团秒杀",style:"miao",url:"../group/group"},{name:"美妆套餐",style:"tao",url:"../suit/suit"},{name:"视频直播",style:"bo",url:"../my/video/video"},{name:"智慧客服",style:"mo",url:"../jas/jas"},{name:"物流查询",style:"wu",url:"../logistics/logistics"},{name:"我的美妆",style:"mei",url:"../my/my"},{name:"帮助中心",style:"bang",url:"../help/help"}]},"174d":function(t,e,a){"use strict";a.r(e);var n=a("5718"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},"1c51":function(t,e,a){},"276d":function(t,e,a){"use strict";var n=a("0c44"),i=a.n(n);i.a},2852:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"weui-cells q-shops"},t._l(t.shopData,function(e,n){return a("block",{key:n},[a("view",{staticClass:"q-shop"},[a("image",{staticClass:"q-img",attrs:{src:e.imgs.hot,"data-id":"shop.id",eventid:"8fed80b6-0-"+n},on:{tap:function(a){t.goShop(e.id)}}}),a("view",{staticClass:"q-info"},[a("view",{attrs:{"data-id":"shop.id",eventid:"8fed80b6-1-"+n},on:{tap:function(a){t.goShop(e.id)}}},[a("p",{staticClass:"q-name"},[t._v(t._s(e.shop))]),a("p",{staticClass:"q-price"},[t._v(t._s(e.price)+"元")])],1),a("view",{staticClass:"q-bottom"},[a("p",{staticClass:"q-sell"},[t._v("已售"+t._s(e.sellNum)+"件")])],1)])])])}))},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"2d79":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"weui-cells q-aside"},[t._m(0),t._l(t.options,function(e,n){return a("block",{key:n},[a("view",{staticClass:"weui-cell q-nav",attrs:{"data-url":"item.url",eventid:"6bf55b82-0-"+n},on:{tap:function(a){t.goNav(e.style,e.url)}}},[a("view",{staticClass:"q-title"},[t._v(t._s(e.name))])])])})],2)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"weui-cell q-nav"},[a("view",{staticClass:"q-title"},[t._v("全部栏目")])])}];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"30ed":function(t,e,a){"use strict";a.r(e);var n=a("2d79"),i=a("9bc7");for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);a("8a59");var u=a("2877"),r=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,"78e09284",null);e["default"]=r.exports},"4fc9":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("15aa"));function i(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{options:n.default}},methods:{goNav:function(t,e){"mei"==t||"wu"==t?wx.switchTab({url:e}):wx.navigateTo({url:e})}}};e.default=s},5054:function(t,e,a){"use strict";a.r(e);var n=a("662b"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},5718:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("bf3d")),i=u(a("30ed")),s=u(a("0fb8"));function u(t){return t&&t.__esModule?t:{default:t}}var r=getApp(),o={components:{SearchBar:n.default,ASide:i.default,ShopsList:s.default},data:function(){return{favArr:[],shopData:[]}},onLoad:function(t){wx.showLoading({title:"玩命加载中"}),this.shopData=r.globalData.shopData,wx.hideLoading()},onShow:function(){this.favArr=r.globalData.favArr}};e.default=o},"62b1":function(t,e,a){},"662b":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var n={props:{shopData:Array},methods:{goShop:function(t){wx.navigateTo({url:"../shops/shop/shop?id="+t})}}};e.default=n},"8a59":function(t,e,a){"use strict";var n=a("62b1"),i=a.n(n);i.a},"98f2":function(t,e,a){"use strict";a("0460");var n=s(a("b0ce")),i=s(a("1020"));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(i.default))},"9bc7":function(t,e,a){"use strict";a.r(e);var n=a("4fc9"),i=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},e559:function(t,e,a){"use strict";var n=a("1c51"),i=a.n(n);i.a},e6ec:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",[a("Search-bar",{attrs:{mpcomid:"6b7b2168-0"}}),a("view",{staticClass:"q-list"},[a("A-side",{attrs:{mpcomid:"6b7b2168-1"}}),a("Shops-list",{attrs:{"shop-data":t.shopData,mpcomid:"6b7b2168-2"}})],1)],1)},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})}},[["98f2","common/runtime","common/vendor"]]]);