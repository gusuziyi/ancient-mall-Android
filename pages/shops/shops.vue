<template>
    <view>
        <view class="q-top">
            <view class="q-left">
                <view class="q-b">
                    <text class="iconfont icon-shop q-icon"></text>
                    <text class="q-name">{{ shopsName }}</text>
                </view>
                <view class="q-b">
                    <text class="iconfont icon-location q-icon"></text>
                    <text class="q-area">{{ area }}</text>
                </view>
            </view>
            <image class="q-pic q-right" src="/static/shop.png"></image>
        </view>

        <Carsousel  :img-urls="imgUrls"></Carsousel>
        <!-- 轮播图-->
        <Buy-cut :shops-data="shopsData" :pshop-data="cutData" :in-shops="true"></Buy-cut>
        <Buy-group :shops-data="shopsData" :pshop-data="groupData" :in-shops="true"></Buy-group>
        <!-- 团购 -->
        <Buy-hot :shops-data="shopsData" :pshop-data="hotData" :fav-arr="favArr" :in-shops="true"></Buy-hot>
        <!-- 热销-->
    </view>
</template>

<script>
    import Carsousel from '../index/c/Carsousel.vue';
    import BuyCut from '../index/c/BuyCut.vue';
    import BuyGroup from '../index/c/BuyGroup.vue';
    import BuyHot from '../index/c/BuyHot.vue';
    let db = require('../util/databaseGuide')
    const app = getApp()
    export default {
        components: {
            Carsousel,
            BuyCut,
            BuyGroup,
            BuyHot
        },
        data(){
            return {
                shopsName:'',
                area:"",
                shopsData:[],
                cutData:[],
                groupData:[],
                hotData:[],
                imgUrls:[], //轮播图
                favArr:[]
            }
        },
        onLoad: function (options) {
        		this.setData({
        			shopsName:options.shops,
        			area:options.area,
        			favArr:app.globalData.favArr
        		})
        		let whereInfo={shops:options.shops}
        		db.onQuery('shop',whereInfo,res=>{ //加载该店铺商品
              
        			let shopsData=res
        			let imgUrls=[]
        			shopsData.forEach((i)=>{
        				imgUrls.push(i.imgs.car)
        			})
        			shopsData.sort((a,b)=>{return b.id-a.id})
        			//界面上分别显示1,2,4个,其余放在显示更多中
        			let cutData=[],
        			groupData=[],
        			hotData=[]
        			shopsData.length>1?cutData=shopsData.slice(0,1):cutData=shopsData,
        			shopsData.length>2?groupData=shopsData.slice(0,2):groupData=shopsData,
        			shopsData.length>4?hotData=shopsData.slice(0,4):hotData=shopsData
        			groupData.sort((a,b)=>{return a.id-b.id})
        			hotData.sort((a,b)=>{return a.id-b.id})
        			this.setData({
        				shopsData,
        				imgUrls,
        				cutData,
        				groupData,
        				hotData
        			})
        			// console.log( whereInfo ,shopsData,imgUrls);
        		})
        },
        // #ifdef MP
         onShareAppMessage: function(e) {
        	return {
        		title: '美妆小铺古风版',
        		path: 'pages/shops/shops',
        		success: function(res) {
        			// 转发成功
        			console.log("转发成功:" + JSON.stringify(res));
        		},
        	}
        },
        // #endif
         
    }
</script>

<style scoped="">
    @import './src/shops.css';
</style>
