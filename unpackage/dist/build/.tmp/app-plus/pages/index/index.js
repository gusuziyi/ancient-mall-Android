(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"047b":function(t,a,e){"use strict";e.r(a);var i=e("0f69"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);a["default"]=n.a},"0f69":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=e("da11"),n={data:function(){return{optionData:i}},methods:{goNav:function(t,a){"mei"==a||"wu"==a?wx.switchTab({url:t}):wx.navigateTo({url:t})}}};a.default=n},"155e":function(t,a,e){"use strict";var i=e("cb92"),n=e.n(i);n.a},1886:function(t,a,e){},"2f9b":function(t,a,e){"use strict";var i=e("1886"),n=e.n(i);n.a},"49f1":function(t,a,e){"use strict";e.r(a);var i=e("dd06"),n=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(a,t,function(){return i[t]})}(o);a["default"]=n.a},"4dbc":function(t,a,e){"use strict";e.r(a);var i=e("9864"),n=e("047b");for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);e("155e");var u=e("2877"),s=Object(u["a"])(n["default"],i["a"],i["b"],!1,null,"48d2c3cf",null);a["default"]=s.exports},"79a2":function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"content"},[e("Search-bar",{attrs:{mpcomid:"6752350e-0"}}),e("Tap-option",{attrs:{mpcomid:"6752350e-1"}}),e("Carsousel",{attrs:{"img-urls":t.imgUrls,mpcomid:"6752350e-2"}}),e("Buy-cut",{attrs:{cutId:t.cutId,mpcomid:"6752350e-3"}}),e("Buy-group",{attrs:{groupId:t.groupId,mpcomid:"6752350e-4"}}),e("Buy-hot",{attrs:{hotId:t.hotId,mpcomid:"6752350e-5"}})],1)},n=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return n})},9302:function(t,a,e){"use strict";e("0460");var i=o(e("b0ce")),n=o(e("e9bd"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(n.default))},9864:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("view",{staticClass:"page"},[e("view",{staticClass:"page-bd"},[e("view",{staticClass:"weui-panel weui-panel_access"},[e("view",{staticClass:"weui-panel__bd q-panel"},t._l(t.optionData.optionDataOne,function(a,i){return e("block",{key:i},[e("navigator",{staticClass:"weui-media-box weui-media-box_appmsg q-nav",attrs:{url:a.url,"hover-class":"weui-cell_active"}},[e("view",{staticClass:"weui-media-box__bd weui-media-box__bd_in-appmsg"},[e("image",{class:["weui-media-box__thumb","q-img",a.style]}),e("view",{staticClass:"weui-media-box__title q-title"},[t._v(t._s(a.name))])])])],1)})),e("view",{staticClass:"weui-panel__bd q-panel"},t._l(t.optionData.optionDataTwo,function(a,i){return e("block",{key:i},[e("view",{staticClass:"weui-media-box weui-media-box_appmsg q-nav",attrs:{"hover-class":"weui-cell_active",eventid:"1770a268-0-"+i},on:{tap:function(e){t.goNav(a.url,a.style)}}},[e("view",{staticClass:"weui-media-box__bd weui-media-box__bd_in-appmsg"},[e("image",{class:["weui-media-box__thumb","q-img",a.style]}),e("view",{staticClass:"weui-media-box__title q-title"},[t._v(t._s(a.name))])])])])}))])])])},n=[];e.d(a,"a",function(){return i}),e.d(a,"b",function(){return n})},cb92:function(t,a,e){},da11:function(t,a,e){"use strict";t.exports={optionDataOne:[{name:"潮流推荐",style:"chao",url:"../fashion/fashion"},{name:"拼团秒杀",style:"miao",url:"../group/group"},{name:"美妆套餐",style:"tao",url:"../suit/suit"},{name:"视频直播",style:"bo",url:"../my/video/video"}],optionDataTwo:[{name:"智慧客服",style:"mo",url:"../jas/jas"},{name:"物流查询",style:"wu",url:"../logistics/logistics"},{name:"我的美妆",style:"mei",url:"../my/my"},{name:"帮助中心",style:"bang",url:"../help/help"}]}},dd06:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=l(e("bf3d")),n=l(e("4dbc")),o=l(e("764d")),u=l(e("4954")),s=l(e("51e1")),r=l(e("84b4"));function l(t){return t&&t.__esModule?t:{default:t}}var c=getApp(),d=e("16c0"),f={components:{SearchBar:i.default,TapOption:n.default,Carsousel:o.default,BuyCut:u.default,BuyGroup:s.default,BuyHot:r.default},data:function(){return{cutId:"",groupId:[],hotId:[],imgUrls:[],shareUrl:"",hasFav:!1}},onLoad:function(t){this.initFav(),this.initData()},methods:{initFav:function(){var t=this,a={};d.onQuery("shop",a,function(a){var e=t,i=a;c.globalData.shopData=i,wx.getStorage({key:"myfav",success:function(t){c.globalData.favArr=t.data,console.log("已加载收藏夹:myfav"),e.setData({hasFav:!0})},fail:function(t){for(var a=[],n=0;n<i.length;n++)a.push(!1);wx.setStorage({key:"myfav",data:a}),c.globalData.favArr=a,console.log("新建收藏夹:myfav"),e.setData({hasFav:!0})}})})},initData:function(){var t=Math.floor(10*Math.random())+1,a=[],e=[];a.push(Math.floor(5*Math.random())+1),a.push(Math.floor(5*Math.random())+6);for(var i=[1,2,3,4,5,6,7,8,9,10],n=[],o=0;o<4;o++){var u=Math.floor(Math.random()*i.length);n.push(i[u]),e.unshift("http://ancient-mall.oss-cn-shenzhen.aliyuncs.com/goodses/car-"+i[u]+".jpg"),i.splice(u,1)}this.setData({cutId:t,groupId:a,hotId:n,imgUrls:e}),wx.hideLoading()}},onShow:function(){wx.showLoading({title:"玩命加载中"}),this.initData()}};a.default=f},e9bd:function(t,a,e){"use strict";e.r(a);var i=e("79a2"),n=e("49f1");for(var o in n)"default"!==o&&function(t){e.d(a,t,function(){return n[t]})}(o);e("2f9b");var u=e("2877"),s=Object(u["a"])(n["default"],i["a"],i["b"],!1,null,"84ed7442",null);a["default"]=s.exports}},[["9302","common/runtime","common/vendor"]]]);