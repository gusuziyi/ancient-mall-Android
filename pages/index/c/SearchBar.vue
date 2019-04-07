<template>
    <view class="page">
        <view class="page__bd">
            <view class="weui-search-bar">
                <view class="weui-search-bar__form">
                    <view class="weui-search-bar__box">
                        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                        <input
                            type="text"
                            class="weui-search-bar__input"
                            placeholder="搜索"
                            :value="inputVal"
                            :focus="inputShowed"
                            @input="inputTyping"
                            @confirm="search"
                        />
                        <view class="weui-icon-clear" v-if="inputVal.length > 0" @tap="clearInput"><icon type="clear" size="14"></icon></view>
                    </view>
                    <label class="weui-search-bar__label" :hidden="inputShowed" @tap="showInput">
                        <icon class="weui-icon-search" type="search" size="14"></icon>
                        <view class="weui-search-bar__text">搜索</view>
                    </label>
                </view>
                <view class="weui-search-bar__cancel-btn q-cancel" :hidden="!inputShowed" @tap="hideInput">取消</view>
            </view>
            <!-- 自动完成模块 -->
            <scroll-view scroll-y="true" class="weui-cells searchbar-result">
                <block v-for="(item,idx) in bindSource" :key="idx">
                    <view id="item" @tap="itemtap(item)" class="weui-cell" hover-class="weui-cell_active">{{ item }}</view>
                </block>
            </scroll-view>
        </view>
    </view>
</template>

<script>
    let adapterSource=require('./autoComplete.js')
    export default {
    	props: {
    		isSelf: {
    			type: Boolean,
    			value: false,
    		}
    	},
    	data() {
           return {
    		inputShowed: false,
    		inputVal: "",//点击结果项之后替换文本值
    		adapterSource, //本地匹配源
    		bindSource: [] ,//绑定到页面的数据，根据用户输入动态变化
            }
    	},
    	methods: {
    		showInput: function () {
    			this.setData({
    				inputShowed: true
    			});
    		},
    		hideInput: function () {
    			this.setData({
    				inputVal: "",
    				inputShowed: false
    			});
    		},
    		clearInput: function () {
    			this.setData({
    				inputVal: ""
    			});
    		},
    		inputTyping: function (e) {
    			let prefix = e.detail.value //用户实时输入值
    			this.setData({
    				inputVal: prefix
    			})
    			let newSource = [] //匹配的结果
    			if (prefix != "") {
    				this.adapterSource.forEach(function (i) {
    					if (i.indexOf(prefix) != -1) {
    						newSource.push(i)
    					}
    				})
    			}
    			if (newSource.length != 0) {
    				this.setData({
    					bindSource: newSource
    				})
    			} else {
    				this.setData({
    					bindSource: []
    				})
    			}
    		},
    		itemtap: function (item) {
    			this.setData({
    				inputVal: item,
    				bindSource: []
    			})
    			this.search()
    		},
    		search(){
    			let searchStr=this.inputVal
    			if(this.isSelf){
    				wx.redirectTo({
    					url: '../search-list/search-list?searchStr='+searchStr
    				})
    			}else{
    				wx.navigateTo({
    					url: '../search-list/search-list?searchStr='+searchStr
    				})
    			}
    		}
    	}
    }
    
</script>

<style scoped>
.page {
    background-color: purple;
}
.searchbar-result {
    margin-top: 0;
    font-size: 28rpx;
}
.searchbar-result:before {
    display: none;
}
.weui-cell {
    padding: 12px 15px 12px 35px;
    margin: 0;
    margin-right: 30rpx;
}
.q-cancel {
    color: purple;
    font-size: 28rpx;
}
</style>
