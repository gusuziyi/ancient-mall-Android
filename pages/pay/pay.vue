<template>
    <view>
           <view class='q-btn' @tap="previewImage">
        	<text class='iconfont icon-wechat-fill q-icon'></text>
        	<text class='q-title'>点击生成付款二维码</text>
        </view>
        <button class='pay-botton' @tap='onscan'>扫描二维码</button>
        <textarea class='q-tip' cols="16" disabled="disabled">提示:①个人程序无法使用支付牌照,只能用如上二维码方式收款;②下图是我搜集的常见微信支付接口对比</textarea>
        <image class='q-diff' :src='diff' @tap="previewDiff"></image>
    </view>
</template>

<script>
    export default{
        data(){
            return {
                diff:'/static/pay/diff.png'
            }
        },
        methods: {
        	previewImage: function(e) {//显示付款码
        		wx.showToast({
        			title: '长按二维码可保存',
        			icon: 'none',
        			duration: 3000
        		})
        		setTimeout(() => {
        			wx.previewImage({
        				current: '/static/pay/wxpay.jpg', // 当前显示图片的http链接   
        				urls: ['/static/pay/wxpay.jpg'] // 需要预览的图片http链接列表   
        			})
        		}, 500)
        	},
        	previewDiff(){
        		wx.previewImage({
        			current: '/static/pay/diff.png',
        			urls: ['/static/pay/diff.png'] 
        		})
        	},
        	onscan() {//扫一扫
        		wx.scanCode({
        			success: (res) => {
        				console.log(res)
        			}
        		})
        	}
        },
    }
</script>

<style scoped="">
    @import './src/pay.css';
</style>
