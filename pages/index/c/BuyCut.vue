<template>
    <view class="weui-cells">
        <view class="weui-cell weui-cell_access q-title">
            <view class="q-square"></view>
            <view class="weui-cell__bd">套餐</view>
            <view class="weui-cell__ft">
                <view @tap="goGroup" class="weui-cell weui-cell_access q-nav" hover-class="weui-cell_active">
                    <view class="q-more">查看更多</view>
                    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
                </view>
            </view>
        </view>
        <block v-for="(item,index) in shopData" :key="index">
            <Buy-cut-inner :shop-data="item" ></Buy-cut-inner>
        </block>
    </view>
</template>

<script>
let db= require('../../util/databaseGuide')
import BuyCutInner  from './subComponent/BuyCutInner'
export default {
    components:{
        BuyCutInner
    },
    computed: {
    	shopData() {
    		return this.shopDatas.length?this.shopDatas:this.pshopData
    	}
    },
    props: {
        inShops: Boolean,
        pshopData: Array,
        shopsData: Array,
        cutId:Number
    },
    data() {
        return {
            shopDatas: []
        };
    },
    mounted(){
        this.initCut(this.cutId)
    },
    methods: {
        initCut(cutId) {
            //响应首页初始化
            this.selectDB(cutId);
        },
        selectDB(id) {
            let whereInfo = { id };
            db.onQuery('shop', whereInfo, res => {
                this.shopDatas = res;
            });
        },
        goGroup() {
            let inShops = this.inShops;
            if (inShops) {
                let str = JSON.stringify(this.shopsData);
                wx.navigateTo({
                    url: '../suit/suit?shopData=' + str
                });
            } else {
                wx.navigateTo({
                    url: '../suit/suit'
                });
            }
        }
    }
};
</script>

<style scoped>
.q-title {
    font-size: 28rpx;
    padding: 10px;
}
.q-title .q-square {
    height: 40rpx;
    width: 15rpx;
    background-color: purple;
    margin-right: 10rpx;
}
.q-title .q-nav:before {
    border-top: none;
}
.q-title .q-nav .q-more {
    color: #999;
}
</style>
