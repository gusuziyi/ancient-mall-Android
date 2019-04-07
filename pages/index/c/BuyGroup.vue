<template>
    <view class="weui-cells">
    	<view class="weui-cell q-title">
    		<view class="q-square"></view>
    		<view class="weui-cell__bd">拼团</view>
    		<view class="weui-cell-ft">
    			<view @tap='goGroup' class="weui-cell weui-cell_access q-nav" hover-class="weui-cell_active">
    				<view class="q-more">查看更多</view>
    				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
    			</view>
    		</view>
    	</view>
    	<block v-for='(item,index) in shopData ' :key='index'>
    		<Buy-group-inner :shop-data='item'></Buy-group-inner>
    	</block>
    </view>
</template>

<script>
    import BuyGroupInner from './subComponent/BuyGroupInner'
    let db = require('../../util/databaseGuide')
    export default {
        components:{
            BuyGroupInner
        },
        computed: {
        	shopData() {
        		return this.shopDatas.length?this.shopDatas:this.pshopData
        	}
        },
      props: {
    		inShops:Boolean,
    		pshopData:Array,
    		shopsData:Array,
            groupId:Array
      },
      data(){
          return {
              shopDatas:[]
          }
      },
      mounted(){
          this.initGroup(this.groupId)
      },
      methods: {
    		initGroup(groupId){
    			this.selectDB(groupId)
    		},
    		selectDB(id) { 
                let whereInfo = [];
                id.forEach(i => whereInfo.push({ id: i }));
    			db.onQuery('shop', whereInfo, res => {
    				this.shopDatas = res
    			})
    		},
    		goGroup(){
    			let inShops=this.inShops
    			if(inShops){
    				let str=JSON.stringify(this.shopsData)
    				wx.navigateTo({
    					url:"../group/group?shopData="+str
    				})
    			}else{
    				wx.navigateTo({
    					url:"../group/group"
    				})
    			}
    		},
      }
    }
    
</script>

<style scoped>
    .weui-cells{background-color:#f6f6f6;padding:auto 20rpx}.q-title{font-size:28rpx;padding:10px;margin-bottom:-20rpx}.q-title .q-square{height:40rpx;width:15rpx;background-color:purple;margin-right:10rpx}.q-title .q-nav:before{border-top:none}.q-title .q-nav .q-more{color:#999}
</style>
