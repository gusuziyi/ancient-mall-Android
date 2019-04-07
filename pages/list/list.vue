<template>
    <view>
        <Search-bar></Search-bar>
        <view class="q-list">
            <A-side></A-side>
            <Shops-list :shop-data="shopData" ></Shops-list>
        </view>
    </view>
</template>

<script>
import SearchBar from '../index/c/SearchBar';
import ASide from './c/ASide.vue';
import ShopsList from './c/ShopsList';
const app = getApp();
export default {
    components: {
        SearchBar,
        ASide,
        ShopsList
    },
    data() {
        return {
            favArr: [],
            shopData: []
        };
    },

    onLoad: function(options) {
        wx.showLoading({
            title: '玩命加载中'
        });
        this.shopData=app.globalData.shopData
        wx.hideLoading();
    },
    onShow: function() {
        this.favArr=app.globalData.favArr
    },

    // #ifdef MP
    onShareAppMessage: function(e) {
        return {
            title: '美妆小铺古风版',
            path: 'pages/list/list',
            success: function(res) {
                // 转发成功
                console.log('转发成功:' + JSON.stringify(res));
            }
        };
    }
    // #endif
};
</script>

<style scoped>
.q-list {
    display: flex;
    justify-content: space-between;
    margin: 25rpx;
}
</style>
