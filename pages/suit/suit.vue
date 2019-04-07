<template>
    <view>
        <Search-bar></Search-bar>
        <view id="items">
            <block v-for="(shopData, index) in shopsData" :key="index"><Cut-inner class="q-item" :shop-data="shopData" :rest-time="restTime"></Cut-inner></block>
        </view>
    </view>
</template>

<script>
const app = getApp();
let db = require('../util/databaseGuide');
import CutInner from '../index/c/subComponent/BuyCutInner.vue';
import SearchBar from '../index/c/SearchBar.vue';
export default {
     components:{
        CutInner,
        SearchBar
    },
    data() {
        return {
            shopsData: []
        };
    },
    onLoad: function(options) {
        if (options.shopData) {
            //来自于店铺,仅显示该店铺商品
            let shopsData = JSON.parse(options.shopData);
            this.setData({ shopsData });
        } else {
            //加载全部
            wx.showLoading({
                title: '玩命加载中'
            });
            let shopsData = app.globalData.shopData;
            if (shopsData) {
                this.setData({ shopsData });
                wx.hideLoading();
            } else {
                let whereInfo = {};
                db.onQuery('shop', whereInfo, res => {
                    let shopsData = res;
                    this.setData({
                        shopsData
                    });
                    wx.hideLoading();
                });
            }
        }
    },
    // #ifdef MP
    onShareAppMessage: function(e) {
        return {
            title: '美妆小铺古风版',
            path: 'pages/fashion/fashion',
            success: function(res) {
                // 转发成功
                console.log('转发成功:' + JSON.stringify(res));
            }
        };
    }
    // #endif
};
</script>

<style scoped="">
#items .q-item {
    border-bottom: 1px solid purple;
}
</style>
