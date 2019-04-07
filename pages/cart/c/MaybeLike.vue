<template>
    <view class="weui-cells">
        <view class="weui-cell q-title">
            <view class="q-square"></view>
            <view class="weui-cell__bd">猜你喜欢</view>
        </view>
        <view class="q-shops">
            <block v-for="(likeShop,index) in likeArr" :key="index" >
                <view class="q-shop">
                    <image class="q-img" :src="likeShop.shop.imgs.hot" @tap="showShop(likeShop.shop.id)" data-id="likeShop.shop.id" />
                    <view class="q-info">
                        <view @tap="showShop(likeShop.shop.id)" data-id="likeShop.shop.id">
                            <p class="q-name">{{ likeShop.shop.shop }}</p>
                            <p class="q-price">{{ likeShop.shop.price }}元</p>
                        </view>
                        <view class="q-bottom">
                            <p class="q-sell">{{ likeShop.title }}</p>
                            <icon v-if="favArr[likeShop.shop.id-1]" class="iconfont icon-check-circle q-submit" @tap="myFav(likeShop.shop.id-1)" data-index="likeShop.shop.id-1"></icon>
                            <icon v-else class="iconfont icon-heart q-submit"  @tap="myFav(likeShop.shop.id-1)"></icon>
                        </view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    props: {
        likeArrs: Array,
        /* {title: "近期全网热销商品",shop: shopData} */
        isInShop: Boolean,
        sellBestArr:Array
    },
    watch: {
    	sellBestArr(likeArr) {
    		this.initLike(likeArr) 
    	},
        likeArrs:{
            handler(val){
               this.likeArr=val
            },
            immediate: true,
            deep: true
        }
    },
    data() {
        return {
            favArr: [],
            likeArr:[]
        };
    },
    mounted(){
        this.initLike(this.likeArr) 
    },
    methods: {
        myFav(index) {
            let favArr = app.globalData.favArr;
            favArr[index] = !favArr[index];
            wx.setStorage({
                key: 'myfav',
                data: favArr
            });
            let title = '';
            favArr[index] ? (title = '已收藏') : (title = '已取消,将减少相关推荐'),
                wx.showToast({
                    title,
                    icon: 'none'
                });
            this.setData({ favArr });
            app.globalData.favArr = favArr;
            // console.log(favArr, index, favArr[index]);
        },
        initLike(likeArr) {
            let favArr = app.globalData.favArr;
            this.setData({
                likeArr,
                favArr
            });
        },
        showShop(id) {
             id=id.toString()
            console.log(id);
            wx.navigateTo({
                url: '/pages/shops/shop/shop?id=' + id
            });
        }
    }
};
</script>

<style scoped>
@import '../src/maybelike.css';
</style>
