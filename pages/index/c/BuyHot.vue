<template>
    <view class="weui-cells">
        <view class="weui-cell q-title">
            <view class="q-square"></view>
            <view class="weui-cell__bd">正在热卖</view>
            <view class="weui-cell-ft">
                <view @tap="goGroup" class="weui-cell weui-cell_access q-nav" hover-class="weui-cell_active">
                    <view class="q-more">查看更多</view>
                    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
                </view>
            </view>
        </view>
        <view class="q-shops">
            <block v-for="(item,index) in shopData" :key="index">
                <Buy-hot-inner :shop-data="item" :fav-arr="favArr"></Buy-hot-inner>
            </block>
        </view>
    </view>
</template>

<script>
let db = require('../../util/databaseGuide.js');
import BuyHotInner from './subComponent/BuyHotInner';
const app = getApp();
export default {
    components: {
        BuyHotInner
    },
    computed: {
    	shopData() {
    		return this.shopDatas.length?this.shopDatas:this.pshopData
    	}
    },
    props: {
        pshopData:Array,
        // favArr: Array,
        inShops: Boolean,
        shopsData: Array,
        hotId: Array,
    },
    data() {
        return {
            favArr: Array,
            shopDatas: []
        };
    },
    mounted() {
         this.initHot(this.hotId);
    },
    methods: {
        initHot(hotId) {
            this.selectDB(hotId);
        },
        selectDB(id) {
            let whereInfo = [];
            id.forEach(i => whereInfo.push({ id: i }));
            db.onQuery('shop', whereInfo, res => {
                this.shopDatas = res;
                this.favArr = app.globalData.favArr;
            });
        },
        goGroup() {
            let inShops = this.inShops;
            if (inShops) {
                let str = JSON.stringify(this.shopsData);
                wx.navigateTo({
                    url: '../fashion/fashion?shopData=' + str
                });
            } else {
                wx.navigateTo({
                    url: '../fashion/fashion'
                });
            }
        }
    }
};
</script>

<style scoped>
@import '../src/buyhot.css';
</style>
