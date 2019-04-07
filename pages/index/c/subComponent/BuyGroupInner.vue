<template>
    <view class="weui-cell q-shop">
        <image class="q-img" :src="shopData.imgs.sqr" @tap="showShop(shopData.id)" />
        <view class="weui-cell-bd q-info">
            <view @tap="showShop(shopData.id)">
                <p class="q-name">{{ shopData.shop }}</p>
                <span class="q-two-group">2人团</span>
                <span>团购套餐立买可减</span>
                <p>
                    团购价:
                    <span class="q-price">{{ shopData.price }}元</span>
                    <span class="q-origin-pirce">({{ shopData.originPrice }})元</span>
                </p>
            </view>
            <view class="weui-cell q-bottom">
                <button type="primary" size="mini" class="q-btn" @tap="showShop(shopData.id)">马上拼团</button>
                <span class="q-sell">已团购{{ shopData.sellNum }}件</span>
            </view>
        </view>
    </view>
</template>

<script>
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
.q-shop {
    font-size: 30rpx;
    border-radius: 10rpx;
    margin: 15rpx;
    background-color: #fff;
    margin-bottom: 15rpx;
    height: 220rpx;
}
.q-shop:before {
    border-top: none;
}
.q-shop .q-img {
    width: 220rpx;
    height: 220rpx;
}
.q-shop .q-info {
    width: 450rpx;
    color: rgba(80, 0, 80, 0.9);
    margin-left: 40rpx;
    margin-top: 10rpx;
}
.q-shop .q-info .q-name {
    font-size: 34rpx;
    color: purple;
}
.q-shop .q-info p {
    display: block;
    font-size: 28rpx;
}
.q-shop .q-info .q-two-group {
    border-radius: 5rpx;
    background-color: purple;
    color: #fff;
    padding: 0 7rpx;
    font-size: 24rpx;
}
.q-shop .q-info .q-two-group + span {
    margin-left: 20rpx;
    margin-top: 10rpx;
    font-size: 24rpx;
}
.q-shop .q-info .q-price {
    color: #ff4500;
}
.q-shop .q-info .q-origin-pirce {
    text-decoration: line-through;
    font-size: 24rpx;
    color: #666;
    margin-left: 15rpx;
}
.q-shop .q-info .q-bottom {
    padding-left: 0;
    padding-top: 0rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    font-size: 22rpx;
    margin-top: 25rpx;
}
.q-shop .q-info .q-bottom .q-sell {
    color: #666;
}
.q-shop .q-info .q-bottom:before {
    border-top: none;
}
.q-shop .q-info .q-bottom .q-btn {
    margin-left: 0;
    background-color: rgba(80, 0, 80, 0.8);
    font-size: 24rpx;
    line-height: 2;
}
.q-shop .q-info .q-bottom .q-sell {
    font-size: 26rpx;
}
</style>
