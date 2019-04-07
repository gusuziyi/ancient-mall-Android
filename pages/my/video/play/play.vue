<template>
    <view class="section tc">
        <video id="myVideo" :src="src" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
        <view class="btn-area">
            <input placeholder="发射一条可爱哒弹幕吧" @blur="bindInputBlur" :value="inputValue" />
            <button @tap="bindSendDanmu">发送弹幕</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            src: '',
            inputValue: '',
            danmuList: [
                {
                    text: 'QAQ 画质感人',
                    color: '#ff0000',
                    time: 1
                },
                {
                    text: '我来证明你开了弹幕',
                    color: '#ff00ff',
                    time: 3
                },
                {
                    text: '前方核能,非战斗人员退散',
                    color: '#0099ff',
                    time: 5
                },
                {
                    text: '前方高能',
                    color: '#0000ff',
                    time: 4
                }
            ]
        };
    },
    onLoad: function(options) {
        this.setData({
            src: options.src
        });
        this.videoContext = wx.createVideoContext('myVideo');
    },
    methods: {
        getRandomColor() {
            //用于弹幕颜色
            let rgb = [];
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16);
                color = color.length == 1 ? '0' + color : color;
                rgb.push(color);
            }
            return '#' + rgb.join('');
        },
        bindInputBlur: function(e) {
            this.inputValue = e.detail.value;
        },

        bindSendDanmu: function() {
            this.videoContext.sendDanmu({
                text: this.inputValue,
                color: getRandomColor()
            });
            this.setData({
                inputValue: ''
            });
        }
    }
};
</script>

<style scoped="">
.section {
    width: 750rpx;
}
.section video {
    width: 100%;
}
.btn-area {
    margin-top: 10rpx;
    padding: 20rpx;
}
.btn-area input {
    border: 1px solid purple;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 10rpx;
    padding-left: 20rpx;
}
.btn-area button {
    background-color: purple;
    color: #fff;
    margin-top: 20rpx;
}
</style>
