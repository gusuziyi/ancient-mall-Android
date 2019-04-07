<template>
    <view class="weui-cells q-cart">
        <view class="q-title weui-cell">
            <p v-if="shopsArr.length">物流信息</p>
            <p v-if="shopsArr.length">当前追踪到{{ shopNum }}条信息</p>
        </view>
        <view class="q-body">
            <view class="q-shops">
                <block v-for="(shops, findex) in shopsArr" :key="findex">
                    <view class="q-shop">
                        <view class="weui-cell q-shop-title">
                            <view class="weui-cell__bd q-shopname">{{ shops.shops }}</view>
                            <view class="weui-cell-ft">
                                <view
                                    @tap="goShops(shops.shops, shops.area)"
                                    data-shops="shops.shops"
                                    data-area="shops.area"
                                    class="weui-cell weui-cell_access q-nav"
                                    hover-class="weui-cell_active"
                                >
                                    <view class="q-more">进入店铺</view>
                                    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
                                </view>
                            </view>
                        </view>
                        <block v-for="(shop, index) in shops.shop" :key="index">
                            <view class="weui-cell q-shop-goods" id="q-info">
                                <img class="q-img" :src="shop.imgs" data-id="shop.id" @tap="showShop(shop.id)" />
                                <view class="weui-cell-bd q-info">
                                    <view data-id="shop.id" @tap="showShop(shop.id)">
                                        <p class="q-name">{{ shop.name }}</p>
                                        <p class="q-type">{{ shop.sizes }} {{ shop.types }}</p>
                                    </view>
                                    <view class="q-pricenum">
                                        <view class="q-num">共计{{ shop.num }}件商品</view>
                                        <text class="q-price">{{ shop.price }}元</text>
                                    </view>

                                    <button size="mini" class="q-btn-query" @tap="queryLogitics(shops.area)" data-area="shops.area">查询物流</button>
                                    <button size="mini" class="q-btn-query" @tap="onPay">确认收货</button>
                                </view>
                            </view>
                        </block>
                    </view>
                </block>
            </view>
            <view v-if="!shopsArr.length" class="q-empty" id="q-empty">
                <p class="q-f">{{ empty }}</p>
                <p>{{ empty2 }}</p>
            </view>
           <Logistics  v-if="showLogistics" :shows="showLogistics" @onhide='onhide' :pshops-area="userCity"></Logistics>
        </view>
    </view>
</template>

<script>
const app = getApp();
let db = require('../util/databaseGuide');
import Logistics from './c/Logistics'
export default {
    components: {
        Logistics,
    },
    data() {
        return {
            shopsArr: [],
            shopsarea: [],
            favArr: [],
            shopNum: 0,
            showLogistics:false,
            empty: '请将商品加入购物车',
            empty2: '即可在地图上绘制物流轨迹',
            likeArr: [],
            sellBestArr: [],
            userCity:''
        };
    },
    onShow: function() {
        wx.showLoading({
            title: '玩命加载中'
        });
         let whereInfo ={}
         if (!app.globalData.openId) {
              whereInfo = {
                 _openid:'oCCgN5OsJd1h4yLW2MTtPIzHRwV0'
             };
             
         }else{
              whereInfo = {
                 _openid: app.globalData.openId
             };
         }
        let shopChecked = [];
        db.onQuery('cart', whereInfo, res => {
            let shopNum = 0;
            if (res.length) {
                //购物车不为空,计算shop种类
                res.forEach(i => {
                    shopNum += i.shop.length;
                });
            }
            this.setData({
                shopsArr: res,
                shopNum
            });
            wx.hideLoading();
        });
        let likeArr = app.globalData.likeArr;
        if (!likeArr) {
            //不存在智能推荐,即未查看过商品,推荐全网热销
            this.likeQuery();
        } else {
            this.setData({ likeArr });
        }
    },
    methods: {
        onhide(){
            this.showLogistics=false
        },
        likeQuery() {
            //查询全网热销
            let sellRandom = Math.floor(Math.random() * 200) + 50;
            //近期销量大于50-250的商品
            let whereInfo = {sellNum: sellRandom };
            // console.log(sellRandom,whereInfo)
            db.onQuery('shop', whereInfo, res => {
                let sellBestArr = [];
                res.forEach(i => {
                    sellBestArr.push({
                        title: '近期全网热销商品',
                        shop: i
                    });
                });
                if (sellBestArr.length > 4) sellBestArr = sellBestArr.slice(0, 4);
                console.log('[猜你喜欢][匹配三]:热销', sellRandom, sellBestArr);
                this.likeArr = sellBestArr;
            });
        },
        goShops(shops, area) {
            wx.navigateTo({
                url: '../shops/shops?shops=' + shops + '&area=' + area
            });
        },
        showShop(id) {
            wx.navigateTo({
                url: '../shops/shop/shop?id=' + id
            });
        },
        queryLogitics(shopsArea) {
            this.userCity=shopsArea
            this.showLogistics=true
        },
        onPay() {
            wx.navigateTo({
                url: '../pay/pay'
            });
        }
    }
};
</script>

<style scoped>
@import './src/logistics.css';
</style>
