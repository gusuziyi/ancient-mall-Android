<template>
    <view>
        <Search-bar></Search-bar>
        <view class="q-shops">
        	<block v-for='(shopData,index) in shopsData' :key="index" >
        		<Fashion class='q-item' :shop-data="shopData" :fav-arr="favArr"></Fashion>
        	</block>
        </view>
    </view>
</template>

<script>
    const app = getApp()
    import Fashion from '../index/c/subComponent/BuyHotInner.vue'
    import SearchBar from '../index/c/SearchBar.vue'
    export default {
        components:{
            Fashion,
            SearchBar
        },
        data(){
            return{
                favArr: [],
                shopsData: []
            }
        },
        onLoad: function(options) {
        	if (options.shopData) { //来自于店铺,只加载该店铺商品
        		let shopsData = JSON.parse(options.shopData)
        		this.setData({
        			shopsData
        		})
        	} else { //加载全部
        		wx.showLoading({
        			title: '玩命加载中',
        		})
        		let shopsData = app.globalData.shopData
        		let favArr = app.globalData.favArr
        		if (shopsData && favArr) {
        			this.setData({
        				shopsData,
        				favArr
        			})
        			wx.hideLoading()
        		} else {
        			let whereInfo = {}
        			db.onQuery('shop', whereInfo, res => {
        				let shopsData = res
        				this.setData({
        					shopsData
        				})
        				wx.hideLoading()
        				console.log(shopData);
        			})
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
        			console.log("转发成功:" + JSON.stringify(res));
        		},
        	}
        },
        // #endif
    }
</script>

<style scoped="">
    .q-shops{
    	display: flex;
    	justify-content: space-between;
    	flex-wrap: wrap;
    	margin: auto 20rpx;
    }
    page{
    	background-color: #EAEAEA;
    }
</style>
