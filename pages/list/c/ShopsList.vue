<template>
    <view class="weui-cells q-shops">
        <block v-for="(shop, index) in shopData" :key="index">
            <view class="q-shop">
                <image class="q-img" :src="shop.imgs.hot" @tap="goShop(shop.id)" data-id="shop.id" />
                <view class="q-info">
                    <view @tap="goShop(shop.id)" data-id="shop.id">
                        <p class="q-name">{{ shop.shop }}</p>
                        <p class="q-price">{{ shop.price }}元</p>
                    </view>
                    <view class="q-bottom">
                        <p class="q-sell">已售{{ shop.sellNum }}件</p>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
const app = getApp();
export default {
    props: {
        shopData: Array
    },
    methods: {
        goShop(id) {
            wx.navigateTo({
                url: '../shops/shop/shop?id=' + id
            });
        }
    }
};
</script>

<style scoped>
@import '../src/shops-list.css';
</style>
