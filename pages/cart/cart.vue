<template>
    <Cart :pshops-arr="shopsArr" class="cart" :pshop-checked="shopChecked" :like-arr="likeArr"></Cart>
</template>

<script>
import Cart from './c/Cart';
let db = require('../util/databaseGuide');
const app = getApp();
export default {
    components:{
       Cart
    },
    data() {
        return {
            shopsArr: [],
            shopChecked: [],
            favArr: [],
            likeArr: []
        };
    },
  onLoad: function(options) {
       if(!app.globalData.openId){
           uni.showToast({
               title:'请登录',
               icon:'none',
               duration: 2000
           })
           app.globalData.openId='oCCgN5OsJd1h4yLW2MTtPIzHRwV0'
       }else{
            this.setData({
               favArr: app.globalData.favArr
           });
       }
    },

    onShow: function() {
        wx.showLoading({
            title: '玩命加载中'
        });
        let whereInfo = {
            _openid: app.globalData.openId
        };
        let shopChecked = [];
        db.onQuery('cart', whereInfo, res => {
            for (let i = 0; i < res.length; i++) {
                shopChecked.push({
                    shops: res[i].shops,
                    value: false,
                    shopList: []
                });
                // console.log(res,shopChecked);
                for (let j = 0; j < res[i].shop.length; j++) {
                    shopChecked[i].shopList.push(false);
                }
            }
            this.setData({
                shopsArr: res,
                shopChecked
            });
            wx.hideLoading();
        });
        let likeArr = app.globalData.likeArr;
        if (!likeArr) {
            this.likeQuery();
        } else {
            this.setData({ likeArr });
        }
    },
    methods:{
         likeQuery() {
            let sellRandom = Math.floor(Math.random() * 200) + 150;
            let whereInfo = { sellNum: sellRandom };
            // console.log(sellRandom,whereInfo)
            db.onQuery('shop', whereInfo, res => {
                let sellBestArr = [];
                res.forEach(i => {
                    sellBestArr.push({
                        title: '近期全网热销商品',
                        shop: i
                    });
                });
                if (sellBestArr.length > 4) sellBestArr = sellBestArr.slice(0, 4);
                console.log('[猜你喜欢][匹配三]:热销', sellRandom, sellBestArr);
                this.likeArr=sellBestArr
            });
        }
    }

};
</script>

<style scoped="">
.cart {
    display: block;
}
</style>
