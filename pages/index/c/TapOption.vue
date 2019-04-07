<template>
    <view class="page">
        <view class="page-bd">
            <view class="weui-panel weui-panel_access">
                <view class="weui-panel__bd q-panel">
                    <block v-for="(item, index) in optionData.optionDataOne" :key="index">
                        <navigator :url="item.url" class="weui-media-box weui-media-box_appmsg q-nav" hover-class="weui-cell_active">
                            <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                                <image :class="['weui-media-box__thumb', 'q-img', item.style]" />
                                <view class="weui-media-box__title q-title">{{ item.name }}</view>
                            </view>
                        </navigator>
                    </block>
                </view>
                <view class="weui-panel__bd q-panel">
                    <block v-for="(item, index) in optionData.optionDataTwo" :key="index">
                        <view class="weui-media-box weui-media-box_appmsg q-nav" @tap="goNav(item.url, item.style)" hover-class="weui-cell_active">
                            <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                                <image :class="['weui-media-box__thumb', 'q-img', item.style]" />
                                <view class="weui-media-box__title q-title">{{ item.name }}</view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
let optionData = require('./optionData.js');
export default {
    data() {
        return {
            optionData
        };
    },
    methods: {
        goNav(url, name) {
            if (name == 'mei' || name == 'wu') {
                wx.switchTab({
                    url
                });
            } else {
                wx.navigateTo({ url });
            }
        }
    }
};
</script>

<style scoped>
@import '../src/option.css';
</style>
