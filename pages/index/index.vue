<template>
    <view class="content">
        <Search-bar></Search-bar>
        <!-- 搜索框-->
        <Tap-option></Tap-option>
        <!-- 选项卡-->
        <Carsousel :img-urls="imgUrls"></Carsousel>
        <!-- 轮播图-->
        <Buy-cut  :cutId='cutId'></Buy-cut>
        <!-- 套餐 -->
        <Buy-group :groupId='groupId'></Buy-group>
        <!-- 团购 -->
        <Buy-hot :hotId='hotId' ></Buy-hot>
        <!-- 热销-->
    </view>
</template>

<script>
import SearchBar from './c/SearchBar.vue';
import TapOption from './c/TapOption.vue';
import Carsousel from './c/Carsousel.vue';
import BuyCut from './c/BuyCut.vue';
import BuyGroup from './c/BuyGroup.vue';
import BuyHot from './c/BuyHot.vue';
const app = getApp();
let db = require('../util/databaseGuide.js');
export default {
    components: {
        SearchBar,
        TapOption,
        Carsousel,
        BuyCut,BuyGroup,BuyHot
    },
    data() {
        return {
            cutId: '', //一个套餐
            groupId: [], //两个团购商品
            hotId: [], //四个热卖商品
            imgUrls: [], //四个轮播图
            shareUrl: '',
            hasFav: false
        };
    },
    onLoad: function(options) {
    	this.initFav()
        this.initData();
    },
   methods: {
        initFav() {
            //初始化本地收藏夹
            let whereInfo = {};
            db.onQuery('shop', whereInfo, res => {
                let that = this;
                let shopData = res;
                app.globalData.shopData = shopData; //shop表数据
                wx.getStorage({
                    key: 'myfav',
                    success(res) {
                        app.globalData.favArr = res.data;
                        console.log('已加载收藏夹:myfav');
                        that.setData({ hasFav: true });
                    },
                    fail(res) {
                        let favArr = [];
                        for (let i = 0; i < shopData.length; i++) {
                            favArr.push(false);
                        }
                        wx.setStorage({
                            //建立收藏夹缓存
                            key: 'myfav',
                            data: favArr
                        });
                        app.globalData.favArr = favArr;
                        console.log('新建收藏夹:myfav');
                        that.setData({ hasFav: true });
                    }
                });
            });
        },
        initData() {
            //在主页随机推荐商品
            let cutId = Math.floor(Math.random() * 10) + 1;
            let groupId = [],
                imgUrls = [];
            groupId.push(Math.floor(Math.random() * 5) + 1);
            groupId.push(Math.floor(Math.random() * 5) + 6);
            let hotIdSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let hotId = [];
            for (let i = 0; i < 4; i++) {
                //随机四幅图片
                let index = Math.floor(Math.random() * hotIdSet.length);
                hotId.push(hotIdSet[index]);
                imgUrls.unshift('http://ancient-mall.oss-cn-shenzhen.aliyuncs.com/goodses/car-' + hotIdSet[index] + '.jpg');
                hotIdSet.splice(index, 1);
            }
            this.setData({
                cutId,
                groupId,
                hotId,
                imgUrls
            });
            wx.hideLoading();
        }
    }, 
    onShow: function() {
        wx.showLoading({
            title: '玩命加载中'
        });
        this.initData();
    },
  // #ifdef MP
     onShareAppMessage: function(e) {
        return {
            title: '美妆小铺古风版',
            path: 'pages/index/index',
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
page {
    background: #f6f6f6;
}
.searchbar-result {
    margin-top: 0;
    font-size: 14px;
}
.searchbar-result:before {
    display: none;
}
.weui-cell {
    padding: 12px 15px 12px 35px;
}
</style>
