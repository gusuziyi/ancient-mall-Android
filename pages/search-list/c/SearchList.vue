<template>
    <view class="weui-cells">
        <view class="weui-cell q-title">
            <view class="q-square"></view>
            <view class="weui-cell__bd">
                筛选
                <view class="q-filter-set">
                    <view :class="['q-filter',activePriceUp]" @tap="sortPriceUp">价格升序</view>
                    <view :class="['q-filter',activePriceDown]" @tap="sortPriceDown">价格降序</view>
                    <view :class="['q-filter',activeSell]" @tap="sortSell">累计销量</view>
                </view>
            </view>
        </view>
        <block v-for="(shop,index) in searchResult" :key="index">
            <view class="weui-cell q-shop">
                <image class="q-img" :src="shop.imgs.sqr" @tap="showShop(shop.id)" data-id="shop.id" />
                <view class="weui-cell-bd q-info">
                    <view @tap="showShop(shop.id)" data-id="shop.id">
                        <p class="q-name">{{ shop.shop }}</p>
                        <p>
                            <span class="q-price">{{ shop.price }}元</span>
                            <span class="q-origin-pirce">{{ shop.sellNum }}人付款</span>
                            <span class="q-origin-pirce">{{ shop.area }}</span>
                        </p>
                    </view>
                    <view class="weui-cell q-bottom">
                        <span>{{ shop.shops }}</span>
                        <span @tap="goShops(shop.shops,shop.area)" data-shops="shop.shops" data-area="shop.area">进入店铺></span>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
export default {
    computed: {
    	searchResult() {
    		return this.searchArr.length?this.searchArr:this.searchResults
    	}
    },
    props: {
        searchResults: Array
    },
    data() {
        return {
            activePriceUp: '',
            activePriceDown: '',
            activeSell: '',
            searchArr:[]
        };
    },
    methods: {
        showShop(id) {
            wx.navigateTo({
                url: '/pages/shops/shop/shop?id=' + id
            });
        },
        goShops(shops,area) {
            wx.navigateTo({
                url: '/pages/shops/shops?shops=' + shops + '&area=' + area
            });
        },
        sortPriceUp() {
            //价格升序
            let activePriceUp = this.activePriceUp,
                searchResult = this.searchResult;
            if (activePriceUp) {
                activePriceUp = '';
                searchResult.sort((a, b) => {
                    return a.id - b.id;
                });
            } else {
                activePriceUp = 'q-active';
                searchResult.sort((a, b) => {
                    return a.price - b.price;
                });
            }
            this.setData({
                activePriceUp,
               searchArr: searchResult,
                activePriceDown: '',
                activeSell: ''
            });
        },
        sortPriceDown() {
            //价格降序
            let activePriceDown = this.activePriceDown,
                searchResult = this.searchResult;
            if (activePriceDown) {
                activePriceDown = '';
                searchResult.sort((a, b) => {
                    return a.id - b.id;
                });
            } else {
                activePriceDown = 'q-active';
                searchResult.sort((a, b) => {
                    return b.price - a.price;
                });
            }
            this.setData({
                activePriceDown,
                searchArr: searchResult,
                activePriceUp: '',
                activeSell: ''
            });
        },
        sortSell() {
            //销量降序
            let activeSell = this.activeSell,
                searchResult = this.searchResult;
            if (activeSell) {
                activeSell = '';
                searchResult.sort((a, b) => {
                    return a.id - b.id;
                });
            } else {
                activeSell = 'q-active';
                searchResult.sort((a, b) => {
                    return b.sellNum - a.sellNum;
                });
            }
            this.setData({
                activeSell,
                searchArr: searchResult,
                activePriceDown: '',
                activePriceUp: ''
            });
        }
    }
};
</script>

<style scoped="">
.weui-cells {
    background-color: #f6f6f6;
    padding: auto 20rpx;
    margin-top: 0;
}
.q-title {
    font-size: 28rpx;
    padding: 10px;
    padding-top: 20rpx;
    margin-bottom: -10rpx;
}
.q-title .q-square {
    height: 40rpx;
    width: 15rpx;
    background-color: purple;
    margin-right: 10rpx;
}
.q-title .weui-cell__bd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.q-title .weui-cell__bd .q-filter-set {
    width: 500rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.q-title .weui-cell__bd .q-filter-set .q-filter {
    color: #999;
}
.q-title .weui-cell__bd .q-filter-set .q-active {
    color: #ff4500;
}
.q-shop {
    font-size: 30rpx;
    border-radius: 10rpx;
    margin: 15rpx;
    background-color: #fff;
    height: 200rpx;
}
.q-shop:before {
    border-top: none;
}
.q-shop .q-img {
    width: 200rpx;
    height: 200rpx;
}
.q-shop .q-info {
    width: 450rpx;
    color: rgba(80, 0, 80, 0.9);
    margin-left: 30rpx;
}
.q-shop .q-info .q-name {
    font-size: 34rpx;
    color: purple;
    margin-bottom: 10rpx;
    margin-top: 10rpx;
}
.q-shop .q-info p {
    display: block;
    margin-bottom: 15rpx;
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
    font-size: 24rpx;
    color: #666;
    margin-left: 15rpx;
}
.q-shop .q-info .q-bottom {
    padding-left: 0;
    padding-top: 10rpx;
    margin-top: 30rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    font-size: 28rpx;
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
    font-size: 26rpx;
}
</style>
