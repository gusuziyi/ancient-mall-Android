<template>
    <view class="page">
        <view class="q-header">
            <view class="q-title">一次微信小程序向安卓移植的实践</view>
            <view class="q-author">千茉紫依</view>
        </view>
        <view class="q-article">
            <view class="q-t">四月，开始学习uniApp，这是一个拥有vue外表和native内核的框架，能够使用vue开发App，我在学习的过程中也对以前写过的《美妆小铺小程序版》进行了移植。</view>
            <view class="q-t">
                截止到目前，由于个人无法申请到微信开放平台账号，所以分享到微信，微信账号登录二个功能模块尽管已经在安卓模拟机上已经全部跑通，但由于无法打包到App，看起来是不可用的。
            </view>
            <view class="q-t">而视频直播功能由于涉及到流传输，我认为以我目前的水平尚不足以完成，所以暂时搁浅。</view>
            <view class="q-title">关于这个App的一些链接</view>
            <view class="q-p"><navigator redirect @click="go('https://www.jianshu.com/p/fb0f81152174')">[链接] 微信小程序移植安卓App的一些经验</navigator></view>
            <view class="q-p"><navigator redirect @click="go('https://www.jianshu.com/p/b5132ee3a82a')">[链接] 小程序中的腾讯云如何迁移到阿里云</navigator></view>
              <view class="q-p"><navigator redirect @click="go('https://www.jianshu.com/p/2864231b80c3')">[链接] 小程序中的微信登录在安卓App中的写法</navigator></view>
            <view class="q-p"><navigator redirect @click="go('https://www.jianshu.com/p/902d29e84c1f')">[链接] 我的前端转行之路</navigator></view>
        </view>
    </view>
</template>

<script>
export default {
    methods: {
        go(url) {
            plus.runtime.openURL(url);
        }
    }
};
</script>

<style scoped="">
.page {
    color: #8b008b;
    padding: 30rpx;
    font-size: 28rpx;
}
.page .q-header .q-title {
    font-size: 34rpx;
    text-align: center;
}
.page .q-header .q-author {
    text-align: center;
    margin-bottom: 20rpx;
}
.page .q-header .q-desc {
    text-indent: 2em;
}
.q-t {
    text-indent: 2em;
    text-align: left;
    margin-top: 17rpx;
}
.page .q-article {
    margin-top: 20rpx;
    text-align: center;
}
.page .q-article .q-title {
    margin-bottom: -10rpx;
    margin-top: 25rpx;
}
.page .q-article .q-p {
    margin-top: 17rpx;
    text-align: center;
}
</style>
