<template>
    <view>
        <view class="weui-cells">
            <image class="q-img" :src="shopData.imgs.sqr" />
            <view class="q-shop">
                <view class="q-bottom">
                    <view class="q-title">
                        <text class="q-name">{{ shopData.shop }}</text>
                        <view class="q-chat" style="justify-content: flex-end;">
                            <view class="q-share">
                                <view class="q-rabot" @tap="helloJas">
                                    <text class="iconfont icon-message q-share-icon"></text>
                                    <text class="q-jas">智能客服</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="q-money">
                        <p class="q-price">
                            {{ price }}元
                            <span class="q-origin-pirce">{{ shopData.originPrice }}元</span>
                            <span class="q-remain">还剩{{ shopData.restNum }}份</span>
                        </p>
                        <p class="q-remain-time">
                            <view>距离结束</view>
                            <view class="q-time">{{ restTime }}</view>
                        </p>
                    </view>
                    <view class="q-area">
                        <text class="q-sell">已售出{{ shopData.sellNum }}件</text>
                        <text class="q-city">{{ shopData.area }}</text>
                    </view>
                    <view class="q-alt">
                        <view class="q-square"></view>
                        <view>尺寸</view>
                        <radio-group class="radio-group" @change="radioSChange">
                            <label class="radio" v-for="(item, index) in shopData.altSizes" :key="index">
                                <radio :value="''+item.price" color="purple" :checked="item.checked" />
                                {{ item.value }}
                            </label>
                        </radio-group>
                    </view>
                    <view class="q-alt">
                        <view class="q-square"></view>
                        <view>类型</view>
                        <radio-group class="radio-group" @change="radioTChange">
                            <label class="radio" v-for="(item, index) in shopData.altTypes" :key="index">
                                <radio :value="''+item.price" color="purple" :checked="item.checked" />
                                {{ item.value }}
                            </label>
                        </radio-group>
                    </view>
                    <view class="q-btn-div">
                        <view class="q-icons">
                            <view class="q-share-icons" @tap="goShops">
                                <text class="iconfont icon-shop "></text>
                                <p>店铺</p>
                            </view>
                            <view class="q-share-icons" @tap="goFav">
                                <text v-if="fav" class="iconfont icon-check-circle"></text>
                                <text v-else class="iconfont icon-star"></text>
                                <p v-if="fav">已收藏</p>

                                <p v-else>收藏</p>
                            </view>
                            <view class="q-share-icons">
                                <button class="share" open-type="share" @tap="goShare">
                                    <text class="iconfont icon-share "></text>
                                    <p>分享</p>
                                </button>
                            </view>
                        </view>
                        <view class="q-btns">
                            <button type="primary" size="mini" class="q-btn" @tap="putInCart">加购物车</button>
                            <button type="primary" size="mini" class="q-btn" @tap="onBuy">立即购买</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <Buy :buy-info="buyInfo" :show="showBuy" v-show="showBuy" @cancelEvent="_cancelEvent" @confirmEvent="_confirmEvent"></Buy>
    </view>
</template>

<script>
let db = require('../../../util/databaseGuide');
const app = getApp();
import Buy from './Buy';
export default {
    components: {
        Buy
    },
    props: {
        id: String
    },
    data() {
        return {
            restTime: '',
            shopData: {
                imgs: {}
            },
            fav: false, //fav[id-1] id从1开始
            favArr: [],
            choosedSize: {},
            choosedType: {},
            price: 0,
            buyInfo: [],
            showBuy: false
        };
    },
    mounted() {
        this.setShopData(this.id);
        this.buyInfo = [[this.shopData], this.choosedSize, this.choosedType, 0];
    },
    methods: {
        onBuy() {
            //购买窗口
            let choosedSize = this.choosedSize,
                choosedType = this.choosedType;
            this.showBuy = true;
        },
        putInCart() {
            let shopData = this.shopData,
                choosedSize = this.choosedSize,
                choosedType = this.choosedType;
            let price = (shopData.price * choosedType.price * choosedSize.price).toFixed(2);
            let cartShop = {
                id: shopData.id,
                name: shopData.shop,
                imgs: shopData.imgs.sqr,
                price: price,
                num: 1,
                types: choosedType.value,
                sizes: choosedSize.value
            };
            let whereInfo = {
                shops: shopData.shops
            };
            db.onQuery('cart', whereInfo, res => {
                if (res.length == 0) {
                    //无店铺记录,res为shops数组
                    let cartInfo = {
                        shops: shopData.shops,
                        area: shopData.area,
                        class: shopData.class,
                        shop: []
                    };
                    cartInfo.shop.push(cartShop);
                    db.onAdd('cart', cartInfo, res => {
                        wx.showToast({
                            title: '已加购物车',
                            icon: 'success',
                            duration: 2000
                        });
                    });
                } else {
                    //有记录,则更新
                    // console.log(res);
                    let updateData = {
                        shop: []
                    };
                    let hasSameShop = false;
                    let shopList = res[0].shop;
                    shopList.forEach((shop, index) => {
                        if (shop.name == shopData.shop && shop.types == choosedType.value && shop.sizes == choosedSize.value) {
                            //存在相同商品,且大小和类型一样
                            hasSameShop = true;
                            shopList[index].num++; //数量增加
                        }
                    });
                    if (!hasSameShop) {
                        //不存在相同商品,在该店铺增加商品
                        shopList.push(cartShop);
                    }
                    updateData.shop = shopList;
                    db.onEdit('cart', res[0]._id, updateData);
                    wx.showToast({
                        title: '已加入购物车',
                        icon: 'success',
                        duration: 2000
                    });
                }
            });
        },
        radioTChange(radioName) {
            //获取用户选择的type和size
            let radioPrice =Number(radioName.detail.value) 
            let price = (this.shopData.price * this.choosedSize.price * radioPrice).toFixed(2);
            let radioArr = {
                price: radioPrice
            };
            this.setData({
                price,
                choosedType: radioArr
            });
        },
        radioSChange(radioName) {
            //获取用户选择的type和size
            let radioPrice =Number(radioName.detail.value) 
            let radioArr = {
                price: radioPrice
            };
            let price = (this.shopData.price * radioPrice* this.choosedType.price).toFixed(2);
            this.setData({
                price,
                choosedSize: radioArr
            });
        },

        _cancelEvent() {
            this.showBuy = false;
        },
        //确认事件
        _confirmEvent() {
            this.showBuy = false;
        },
        helloJas() {
            wx.navigateTo({
                url: '../../jas/jas'
            });
        },
        setShopData(id) {
            //初始化页面
            let that = this;
            wx.showLoading({
                title: '玩命加载中'
            });
            let favArr = app.globalData.favArr,
                fav = favArr[id - 1];
            id = parseInt(id);
            let whereInfo = {
                id
            };
            db.onQuery('shop', whereInfo, res => {
                let shopData = res[0];
                let restTime = shopData.restTime;
                let price = (shopData.price * shopData.altSizes[0].price * shopData.altTypes[0].price).toFixed(2);
                that.leftTimer(restTime);
                that.setData({
                    shopData,
                    price,
                    favArr,
                    fav,
                    choosedSize: shopData.altSizes[0],
                    choosedType: shopData.altTypes[0]
                });
                wx.hideLoading();
            });
        },

        leftTimer(restTime = 2) {
            let countdownMinute = restTime * 60 * 60 * 1000; //换算成毫秒
            let startTimes = new Date().getTime(); //当前时间
            let endTimes = startTimes + countdownMinute; //结束时间
            let surplusTimes = endTimes / 1000 - startTimes / 1000;
            // console.log(surplusTimes,startTimes,endTimes);
            // 进入倒计时
            let countdowns = setInterval(() => {
                surplusTimes--;
                let hours = parseInt(surplusTimes / 60 / 60, 10); //计算剩余的小时
                let minutes = parseInt((surplusTimes / 60) % 60, 10); //计算剩余的分钟
                let seconds = parseInt(surplusTimes % 60, 10); //计算剩余的秒数
                hours = this.checkTime(hours);
                minutes = this.checkTime(minutes);
                seconds = this.checkTime(seconds);
                let restTime = hours + ':' + minutes + ':' + seconds;
                this.setData({
                    restTime
                });
                if (surplusTimes <= 0) {
                    // console.log('时间到！');
                    clearInterval(countdowns);
                }
            }, 1000);
        },

        checkTime(i) {
            //将0-9的数字前面加上0，例1变为01
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },
        goShare() {
            uni.share({
                provider: 'weixin',
                scene: 'WXSceneSession',
                type: 0,
                href: 'https://www.jianshu.com/p/fb0f81152174',
                title: '美妆小铺安卓移植版',
                summary: '美妆小铺安卓移植版,原版为微信小程序,该版本使用uniApp进行了安卓适配',
                imageUrl: '/static/1.png',
                success: function(res) {
                    console.log('success:' + JSON.stringify(res));
                },
                fail: function(err) {
                    console.log('fail:' + JSON.stringify(err));
                }
            });
        },
        goFav() {
            let id = this.shopData.id,
                favArr = this.favArr;
            let fav = !this.fav,
                title = '';
            fav ? (title = '已收藏') : (title = '取消收藏'),
                wx.showToast({
                    icon: 'none',
                    title
                });
            this.setData({
                fav
            });
            favArr[id - 1] = fav;
            wx.setStorage({
                key: 'myfav',
                data: favArr
            });
            app.globalData.favArr = favArr;
        },
        goShops() {
            let shops = this.shopData.shops;
            let area = this.shopData.area;
            wx.navigateTo({
                url: '../shops?shops=' + shops + '&area=' + area
            });
        }
    }
};
</script>

<style scoped="">
@import '../src/shop.css';
</style>
