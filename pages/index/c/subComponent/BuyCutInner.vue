<template>
    <view class="q-shop">
        <image class="q-img" :src="shopData.imgs.cut" @tap="showShop(shopData.id)" />
        <view class="weui-cell weui-cell_access q-info">
            <view class="weui-cell-bd left-info">
                <p>
                    最低价:{{ shopData.price }}元
                    <span class="q-origin-pirce">{{ shopData.originPrice }}元</span>
                </p>
                <p>还剩{{ shopData.restNum }}份</p>
            </view>
            <view class="weui-cell-ft right-info">
                <p>距离结束</p>
                <p>{{ restTime }}</p>
            </view>
        </view>
        <view class="q-bottom">
            <view>{{ shopData.shop }}</view>
            <view class="q-btn-div">
                <button type="primary" size="mini" @tap='goShare(shopData.imgs.cut,shopData.shop)' class="q-btn">分享链接</button>
                <button type="primary" size="mini" class="q-btn" @tap="showShop(shopData.id)">立即购买</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        shopData: Object
    },

    data() {
        return {
            restTime: ''
        };
    },
    mounted() {
        let restTime = this.shopData.restTime;
        this.leftTimer(restTime);
    },
    methods: {
        goShare(url,name){
              uni.share({
                provider: 'weixin',
                scene: 'WXSceneSession',
                type: 0,
                href: 'https://www.jianshu.com/p/fb0f81152174',
                title: name,
                summary: '美妆小铺安卓移植版,原版为微信小程序,该版本使用uniApp进行了安卓适配',
                imageUrl: url,
                success: function(res) {
                    console.log('success:' + JSON.stringify(res));
                },
                fail: function(err) {
                    console.log('fail:' + JSON.stringify(err));
                }
            });
        },
        leftTimer(restTime = 2) {
            let countdownMinute = restTime * 60 * 60 * 1000; //换算成毫秒
            let startTimes = new Date().getTime(); //当前时间
            let endTimes = startTimes + countdownMinute; //结束时间
            let surplusTimes = endTimes / 1000 - startTimes / 1000;
            // console.log(surplusTimes,startTimes,endTimes);
            // 进入倒计时
            let countdowns = setInterval(() => {
                surplusTimes--;
                let hours = parseInt(surplusTimes / 60 / 60, 10); //计算剩余的小时
                let minutes = parseInt((surplusTimes / 60) % 60, 10); //计算剩余的分钟
                let seconds = parseInt(surplusTimes % 60, 10); //计算剩余的秒数
                hours = this.checkTime(hours);
                minutes = this.checkTime(minutes);
                seconds = this.checkTime(seconds);
                let restTime = hours + ':' + minutes + ':' + seconds;
                this.setData({
                    restTime
                });
                if (surplusTimes <= 0) {
                    // console.log('时间到！');
                    clearInterval(countdowns);
                }
            }, 1000);
        },
        checkTime(i) {
            //将0-9的数字前面加上0，例1变为01
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        },
        showShop(id) {
            wx.navigateTo({
                url: '../shops/shop/shop?id=' + id
            });
        }
    }
};
</script>

<style scoped>
.q-shop {
    position: relative;
    height: 480rpx;
    padding: 0 20rpx;
    overflow: hidden;
    width:  700rpx;
    padding-bottom: 10rpx;
    padding-top: 10rpx;
    margin: 20rpx auto;
    border-bottom: 1rpx solid purple;
}
.q-shop .q-img {
    width: 700rpx;
    height: 400rpx;
}
.q-shop .q-info {
    box-sizing: border-box;
    width: 700rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    position: absolute;
    bottom: 100rpx;
    font-size: 30rpx;
    background-color: rgba(80, 0, 80, 0.6);
    color: #fff;
    height: 150rpx;
}
.q-shop .q-info p {
    display: block;
}
.q-shop .q-info p .q-origin-pirce {
    text-decoration: line-through;
    font-size: 26rpx;
    margin-left: 15rpx;
}
.q-shop .q-bottom {
    height: 50rpx;
    margin: 0;
    font-size: 30rpx;
    color: rgba(80, 0, 80, 0.8);
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    padding: 0 10rpx;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.q-shop .q-bottom,
.q-shop .q-bottom .q-btn-div {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.q-shop .q-bottom .q-btn-div {
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
}
.q-shop .q-bottom .q-btn-div .q-btn {
    background-color: rgba(80, 0, 80, 0.8);
    font-size: 26rpx;
}
.q-shop .q-bottom button + button {
    margin-left: 10rpx;
}
</style>
