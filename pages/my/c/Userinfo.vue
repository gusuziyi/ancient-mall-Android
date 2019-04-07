<template>
    <view class="container">
        <!-- 用户信息 -->
        <view class="userinfo">
            <!-- #ifdef MP-WEIXIN -->
            <button open-type="getUserInfo" bindgetuserinfo="onGetUserInfo" class="userinfo-avatar" :style="{ backgroundImage: url(avatarUrl) }"></button>
            <!-- #endif -->
            <!-- #ifdef APP-PLUS||H5 -->
            <view class="userinfo-avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }" @tap="login"></view>
            <!-- #endif -->

            <view class="userinfo-nickname">
                <text v-if="logged">{{ userInfo.nickName }}</text>
                <text v-else>点击头像微信登录</text>
            </view>
            <navigator url="video/video" class="q-myfav" :hidden="!logged">
                <text class="iconfont icon-video q-star" @tap="showFav"></text>
                <text class="q-fav">视频直播</text>
            </navigator>
        </view>
    </view>
</template>

<script>
const app = getApp();
let db = require('../../util/databaseGuide');
export default {
    data() {
        return {
            avatarUrl: '../../../static/user-unlogin.png',
            userInfo: {},
            logged: false
        };
    },
    mounted() {
        let that=this
        //读本地缓存，如果存在用户信息，则直接登录
        uni.getStorage({
            key: 'userInfo',
            success: function(res) {
               that.logged=true
               let userInfo=res.data
               that.userInfo=  userInfo
               that.avatarUrl=userInfo.avatarUrl
               that.getUserWeibos(userInfo.openId);
            },
            fail(){
               //用于展示的微博，用户登录后会用自己的微博将其覆盖
               that.getUserWeibos('oCCgN5OsJd1h4yLW2MTtPIzHRwV0');
            }
        });
        
    },
    methods: {
        // #ifdef MP-WEIXIN
        onGetUserInfo: function(e) {
            if (!wx.cloud) {
                wx.showModal({
                    title: '初始化失败',
                    content: '基础库错误,无法使用云能力',
                    showCancel: false,
                    confirmColor: '#ff0000',
                    success: function(res) {
                        if (res.confirm) {
                            console.log('请使用 2.2.3 或以上的基础库以使用云能力');
                        }
                    }
                });
                return;
            }
            let that = this;
            if (!this.data.logged && e.detail.userInfo) {
                console.log('[取得用户信息]:', e.detail);
                this.setData({
                    logged: true,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                    userInfo: e.detail.userInfo
                });
            } else {
                this.setData({
                    logged: false,
                    avatarUrl: 'user-unlogin.png',
                    userInfo: {}
                });
                wx.showToast({
                    icon: 'success',
                    title: '退出登录'
                });
                // app.globalData.openId =null
                return;
            }
            //GetOpenid
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    console.log('[云函数] [login] user openId: ', res.result.openId);
                    app.globalData.openId = res.result.openId;
                    that.getUserWeibos('oCCgN5OsJd1h4yLW2MTtPIzHRwV0'); //此处显示展示微博
                    if (res.result.openId != 'oCCgN5OsJd1h4yLW2MTtPIzHRwV0') {
                        that.getUserWeibos(res.result.openId); //登录成功,获取用户状态
                    }
                },
                fail: err => {
                    console.error('[云函数] [login] 调用失败', err);
                }
            });
        },
        // #endif
        // #ifdef APP-PLUS ||H5
        login() {
            let that = this;
            //如果已登录，则执行注销操作
            if(that.logged==true){
                 that.setData({
                    logged: false,
                    avatarUrl: '../../../static/user-unlogin.png',
                    userInfo: {}
                });
                that.getUserWeibos('oCCgN5OsJd1h4yLW2MTtPIzHRwV0');
            }else{
                 uni.login({
                        provider: 'weixin',
                        success: function(loginRes) {
                            //若只需openId，可再次获取，无需执行下面获取用户信息的步骤
                            // let { openId, unionid } = loginRes.authResult;
                            uni.getUserInfo({
                                provider: 'weixin',
                                success: function(infoRes) {
                                    // 对象在安卓环境下无法打印，必须现将其JSON化
                                    // console.log(JSON.stringify(infoRes.userInfo));
                                    that.setData({
                                        logged: true,
                                        avatarUrl: infoRes.userInfo.avatarUrl,
                                        userInfo: infoRes.userInfo
                                    });
                                    uni.setStorage({
                                        key: 'userInfo',
                                        data: infoRes.userInfo
                                    });
                                    let openId=infoRes.userInfo.openId
                                    app.globalData.openId = openId;
                                    if (openId != 'oCCgN5OsJd1h4yLW2MTtPIzHRwV0') {
                                        that.getUserWeibos(openId); //登录成功,获取用户微博状态
                                    }
                                }
                            });
                        }
                    });
                
            }
            },
        // #endif
        getUserWeibos(openId) {
            let whereInfo = { openId };
            db.onQuery('weibo', whereInfo, res => {
                let weibos = res;
                weibos.sort((a, b) => {
                    return b.userMsgId - a.userMsgId;
                });
//                 let allWeibos = app.globalData.weibos;
//                 if (allWeibos) {
//                     app.globalData.weibos = weibos.concat(allWeibos);
//                 } else {
//                 }
                    app.globalData.weibos = weibos;
                if (weibos) {
                    //test
                    app.globalData.openId = openId;
                    //test
                    this.$emit('getweibos');
                }
            });
        }
    }
};
</script>

<style scoped>
@import '../src/userinfo.css';
</style>
