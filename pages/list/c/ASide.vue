<template>
     <view class="weui-cells q-aside">
        <view class="weui-cell q-nav" >
            <view class="q-title">全部栏目</view>
        </view>
        <block v-for="(item, index) in options" :key="index">
            <view data-url="item.url" class="weui-cell q-nav"  @tap="goNav(item.style, item.url)">
                <view class="q-title">{{ item.name }}</view>
            </view>
        </block>
    </view>
</template>

<script>
    import options from './optionData.json'
    export default {
          data() {
            return {
                options
            };
        },
        methods: {
            goNav(name, url) {
                if (name == 'mei' || name == 'wu') {
                    wx.switchTab({
                        url
                    });
                } else {
                    wx.navigateTo({
                        url
                    });
                }
            }
        } 
    }
</script>

<style scoped>
    .q-aside {
        margin-top: 0;
        font-size: 28rpx;
        width: 180rpx;
    }
    .q-aside:before {
        border-top: none;
    }
    .q-aside:after {
        border-bottom: none;
    }
    .q-aside .q-nav {
        border-radius: 10rpx;
        color: purple;
        text-align: center;
        height: 40rpx;
    }
    .q-aside .q-nav:before {
        border-top: none;
    }
    .q-aside .q-nav+.q-nav{
       border-top: 1px dotted plum;
    }
</style>
