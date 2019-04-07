<template>
    <view class="weui-cells q-cart">
        <view class="q-title weui-cell">
            <p v-if="shopsArr.length">购物车</p>
            <p v-if="shopsArr.length">共选择了{{ shopNum }}件商品</p>
        </view>
        <view class="q-body">
            <view class="q-shops">
                <block v-for="(shops, findex) in shopsArr" :key="findex">
                    <view class="q-shop">
                        <view class="weui-cell q-shop-title">
                            <radio @tap="checkShops(findex)" class="q-radio" :value="shops.shops" :checked="shopChecked[findex].value" data-findex="findex" color="purple" />
                            <view class="weui-cell__bd q-shopname">{{ shops.shops }}</view>
                            <view class="weui-cell-ft">
                                <navigator
                                    :url="'../shops/shops?shops=' + shops.shops + '&area=' + shops.area"
                                    class="weui-cell weui-cell_access q-nav"
                                    hover-class="weui-cell_active"
                                >
                                    <view class="q-more">进入店铺</view>
                                    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
                                </navigator>
                            </view>
                        </view>
                        <block v-for="(shop, index) in shops.shop" :key="index">
                            <view class="weui-cell q-shop-goods">
                                <radio
                                    class="q-radio"
                                    :value="shop.name"
                                    data-index="index"
                                    data-findex="findex"
                                    @tap="checkShop(index, findex)"
                                    data-id="shops._id"
                                    color="purple"
                                    :checked="shopChecked[findex].shopList[index]"
                                />
                                <img class="q-img" :src="shop.imgs" data-id="shop.id" @tap="showShop(shop.id)" />
                                <view class="weui-cell-bd q-info">
                                    <view data-id="shop.id" @tap="showShop(shop.id)">
                                        <p class="q-name">{{ shop.name }}</p>
                                        <p class="q-type">{{ shop.sizes }} {{ shop.types }}</p>
                                    </view>
                                    <view class="q-pricenum">
                                        <p class="q-price">{{ shop.price  * shop.num | formatNum }}元</p>
                                        <view class="q-bottom">
                                            <label
                                                class="q-btn-num"
                                                @tap="changeNum(index, shops.shops, shops._id, 'down')"
                                                data-index="index"
                                                data-choose="'down'"
                                                data-shops="shops.shops"
                                                data-id="shops._id"
                                            >
                                                -
                                            </label>
                                            <input
                                                class="q-num"
                                                type="number"
                                                v-model="shop.num"
                                                @input="changeNum(index, shops.shops, shops._id, 'input', shop.num)"
                                                data-index="index"
                                                data-choose="'input'"
                                                data-shops="shops.shops"
                                                data-id="shops._id"
                                            />
                                            <label
                                                class="q-btn-num"
                                                @tap="changeNum(index, shops.shops, shops._id, 'up')"
                                                data-index="index"
                                                data-choose="up"
                                                data-shops="shops.shops"
                                                data-id="shops._id"
                                            >
                                                +
                                            </label>
                                        </view>
                                    </view>

                                    <button
                                        size="mini"
                                        class="q-btn-del"
                                        data-index="index"
                                        data-shops="shops.shops"
                                        data-id="shops._id"
                                        @tap="onDel(index, shops.shops, shops._id)"
                                    >
                                        删除
                                    </button>
                                    <button size="mini" class="q-btn-buy" @tap="onBuy(index, findex)" data-index="index" data-findex="findex">购买</button>
                                </view>
                            </view>
                        </block>
                    </view>
                </block>
            </view>
            <Buy :buy-info="buyInfo" :show="showBuy" v-show="showBuy" @cancelEvent="_cancelEvent" @confirmEvent="_confirmEvent"></Buy>
            <view class="q-all" v-if="shopsArr.length">
                <view class="q-left" @tap="onallCheck">
                    <radio class="q-radio" value="" color="purple" :checked="allCheck" />
                    <text class="q-text" v-if="!allCheck">全选</text>
                    <text class="q-text" v-else>反选</text>
                </view>
                <view class="q-right">
                    <view class="q-text">
                        共计:
                        <text class="q-total">{{ tatolPrice | formatNum }}元</text>
                    </view>
                    <button size="mini" class="q-btn-account" @tap="onBuyAll">结算</button>
                </view>
            </view>
            <view v-else class="q-empty">{{ empty }}</view>
        </view>
    </view>
</template>

<script>
import Buy from '../../shops/shop/c/Buy.vue';
let db = require('../../util/databaseGuide');
export default {
    components: {
        Buy,
    },
    props: {
        pshopsArr: Array,
        pshopChecked: Array,
        likeArr: Array
    },
    filters: {
        formatNum: function(value) {
            return value.toFixed(2);
        }
    },
    watch: {
        pshopsArr: {
            handler(val) {
                this.shopsArr = val;
            },
            immediate: true,
            deep: true
        },
        pshopChecked: {
            handler(val) {
                this.shopChecked = val;
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            allCheck: false,
            shopNum: 0,
            tatolPrice: 0,
            empty: '购物车竟然空无一物 ~~o(>_<)o~~',
            shopChecked: [],
            shopsArr: [],
            buyInfo: [],
            showBuy: false
        };
    },
    methods: {
        _cancelEvent() {
            this.showBuy = false;
        },
        //确认事件
        _confirmEvent() {
            this.showBuy = false;
        },
        onBuy(index, findex) {
            //单商品购买
            let shopsArr = this.shopsArr,
                thisShop = shopsArr[findex].shop[index],
                shopNum = thisShop.num,
                shopData = {
                    shopname: shopsArr[findex].shops,
                    name: thisShop.name,
                    num: thisShop.num,
                    size: thisShop.sizes,
                    type: thisShop.types,
                    totalPrice: (thisShop.price * thisShop.num).toFixed(2)
                };
            this.buyInfo = [[shopData], {}, {}, shopNum];
            this.showBuy = true;
        },
        onBuyAll(e) {
            //多商品购买
            let shopsArr = this.shopsArr,
                shopChecked = this.shopChecked,
                shopNum = this.shopNum;
            if (!shopNum) {
                //未选择商品
                wx.showToast({
                    icon: 'none',
                    title: '请选择商品'
                });
                return;
            } else {
                let shopsname = '',
                    shopname = '';
                for (let i = 0; i < shopChecked.length; i++) {
                    //定位第一个商品
                    for (let j = 0; j < shopChecked[i].shopList.length; j++) {
                        if (shopChecked[i].shopList[j] == true) {
                            shopsname = shopChecked[i].shops + '等';
                            shopname = shopsArr[i].shop[j].name + '等';
                        }
                    }
                }
                let shopData = {
                    shopname: shopsname,
                    name: shopname,
                    num: shopNum,
                    size: '混合',
                    type: '多类型',
                    totalPrice: this.tatolPrice.toFixed(2)
                };
                this.buyInfo = [[shopData], {}, {}, shopNum];
                this.showBuy = true;
            }
        },
        onDel(index, shops, _id) {
            //删除商品
            let shopsArr = this.shopsArr;
            let shopChecked = this.shopChecked
            for (let i = 0; i < shopsArr.length; i++) {
                if (shopsArr[i].shops == shops) {
                    shopsArr[i].shop.splice(index, 1); //删除商品
                    shopChecked[i].shopList.splice(index, 1)
                    if (shopsArr[i].shop.length == 0) {
                        shopsArr.splice(i, 1); //删除店铺
                        shopChecked.splice(i, 1)
                        db.onRemove('cart', _id);
                    } else {
                        db.onEdit('cart', _id, {
                            shop: shopsArr[i].shop
                        });
                    }
                }
            }
            this.setData({
                shopsArr: shopsArr
            });
            this.ifAllCheck();
            this.checkNum_Price();
            wx.showToast({
                title: '删除成功'
            });
        },
        changeNum(index, shops, _id, choose, tnum = 0) {
            //改变商品数量
            let shopsArr = this.shopsArr;
            for (let i = 0; i < shopsArr.length; i++) {
                if (shopsArr[i].shops == shops) {
                    let num = shopsArr[i].shop[index].num;
                    if (choose == 'down') {
                        num <= 1 ? (num = 1) : (num = num - 1);
                    } else if (choose == 'up') {
                        num++;
                    } else if (choose == 'input') {
                        console.log(tnum);
                        num = tnum;
                    }
                    shopsArr[i].shop[index].num = num;
                    db.onEdit('cart', _id, {
                        shop: shopsArr[i].shop
                    });
                }
            }

            this.shopsArr = shopsArr;
            this.checkNum_Price();
        },
        ifAllCheck() {
            //检查是否店铺全选
            let allCheck = true;
            let shopChecked = this.shopChecked;
            for (let j = 0; j < shopChecked.length; j++) {
                //是否店铺全选
                if (shopChecked[j].value == false) {
                    allCheck = false;
                    this.setData({
                        allCheck
                    });
                    return;
                }
            }
            this.setData({
                allCheck
            });
        },
        checkNum_Price() {
            //显示商品总数和总价
            let shopNum = 0,
                tatolPrice = 0,
                shopChecked = this.shopChecked,
                shopsArr = this.shopsArr;
            for (let i = 0; i < shopChecked.length; i++) {
                //定位所有已选择商品
                for (let j = 0; j < shopChecked[i].shopList.length; j++) {
                    if (shopChecked[i].shopList[j] == true) {
                        shopNum += shopsArr[i].shop[j].num;
                        let priceTemp = shopsArr[i].shop[j].num * shopsArr[i].shop[j].price;
                        tatolPrice += priceTemp;
                    }
                }
            }
            this.setData({
                shopNum,
                tatolPrice
            });
        },
        checkShops(findex) {
            //选择店铺
            let shopChecked = this.shopChecked;
            shopChecked[findex].value = !shopChecked[findex].value;
            for (let i = 0; i < shopChecked[findex].shopList.length; i++) {
                if (shopChecked[findex].value) {
                    //全选
                    shopChecked[findex].shopList[i] = true;
                } else {
                    //反选
                    shopChecked[findex].shopList[i] = false;
                }
            }
            this.setData({
                shopChecked: shopChecked
            });
            this.ifAllCheck();
            this.checkNum_Price();
            // console.log(shopChecked);
        },
        checkShop(index, findex) {
            //选择商品
            let shopChecked = this.shopChecked;
            shopChecked[findex].shopList[index] = !shopChecked[findex].shopList[index]; //radio 显示状态
            let allCheckInShop = true;
            for (let i = 0; i < shopChecked[findex].shopList.length; i++) {
                if (!shopChecked[findex].shopList[i]) {
                    //全选
                    allCheckInShop = false;
                }
            }
            shopChecked[findex].value = allCheckInShop;
            this.setData({
                shopChecked: shopChecked
            });
            this.ifAllCheck();
            this.checkNum_Price();
        },
        onallCheck(e) {
            let allCheck = this.allCheck;
            let shopChecked = this.shopChecked;
            allCheck = !allCheck;
            for (let i = 0; i < shopChecked.length; i++) {
                if (allCheck) {
                    //店铺全选
                    shopChecked[i].value = true;
                } else {
                    shopChecked[i].value = false;
                }
                for (let j = 0; j < shopChecked[i].shopList.length; j++) {
                    if (allCheck) {
                        //商品全选
                        shopChecked[i].shopList[j] = true;
                    } else {
                        shopChecked[i].shopList[j] = false;
                    }
                }
            }
            this.setData({
                shopChecked: shopChecked,
                allCheck
            });
            this.checkNum_Price();
        },

        showShop(id) {
            wx.navigateTo({
                url: '/pages/shops/shop/shop?id=' + id
            });
        }
    }
};
</script>

<style scoped>
@import '../src/cart.css';
</style>
