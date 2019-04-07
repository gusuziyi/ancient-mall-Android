<template>
    <view class="q-shop">
        <image class="q-img" :src="shopData.imgs.hot" @tap="showShop(shopData.id)" />
        <view class="q-info">
            <view @tap="showShop(shopData.id)">
                <p class="q-name">{{ shopData.shop }}</p>
                <p class="q-price">{{ shopData.price }}元</p>
            </view>
            <view class="q-bottom">
                <p class="q-sell">已售{{ shopData.sellNum }}件</p>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    props: {
        shopData: Object
    },
    methods: {
        showShop(id) {
            wx.navigateTo({
                url: '../shops/shop/shop?id=' + id
            });
        }
    }
};
</script>

<style scoped>
@import '../../src/buyhotinner.css';
</style>
