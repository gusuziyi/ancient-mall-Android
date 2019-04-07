<template>
    <view class="q-weibos">
        <block v-for="(weibo, index) in weibos" :key="index">
            <view class="page q-weibo">
                <view class="page__hd">
                    <view class="page__content" id="textareaDiv">
                        <view v-if="editWeibo.userMsg != weibo.userMsg">{{ weibo.userMsg }}</view>
                        <textarea v-else v-model="weibo.userMsg" auto-height v-focus="weibo.userMsg == editWeibo.userMsg"></textarea>
                    </view>
                </view>
                <view class="page__bd">
                    <view class="weui-grids">
                        <block v-for="(item, sindex) in weibo.cloudImgUrls" :key="sindex">
                            <view
                                @tap="previewImage(weibo.cloudImgUrls, item.fileID)"
                                data-id="item.fileID"
                                data-urls="weibo.cloudImgUrls"
                                class="weui-grid"
                                hover-class="weui-grid_active"
                            >
                                <image class="weui-grid__icon q-img" :src="item.fileID" />
                            </view>
                        </block>
                    </view>
                </view>
                <view class="page__ft">
                    <text class="q-time">发表于:{{ weibo.weiboTime }}</text>
                    <button class="q-btn" size="mini" v-if="editWeibo.userMsg == weibo.userMsg" @tap="cancelWeibo(weibo, index)">取消</button>
                    <button class="q-btn" size="mini" @tap="oneditWeibo(weibo, index)" v-if="editWeibo.userMsg != weibo.userMsg">修改</button>
                    <button class="q-btn" size="mini" @tap="doneEdit(weibo, index)" v-else>完成</button>
                    <button
                        class="q-btn"
                        size="mini"
                        @tap="delWeibo(weibo._id, index, weibo.cloudImgUrls)"
                        data-id="weibo._id"
                        data-index="index"
                        data-cloudurl="weibo.cloudImgUrls"
                    >
                        删除
                    </button>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
import OSS from 'ali-oss';
const app = getApp();
let db = require('../../util/databaseGuide');
export default {
    data() {
        return {
            height: '',
            editWeibo: {},
            beforeEditWeibo: {}
        };
    },
    directives: {
        focus: {
            inserted(el, bind) {
                if (bind.value) el.focus();
            }
        }
    },
    props: {
        weibos: Array
    },
    methods: {
        oneditWeibo(weibo, index) {
            this.editWeibo = weibo;
            this.beforeEditWeibo =  JSON.parse(JSON.stringify(weibo));
        },
        cancelWeibo(weibo, index) {
            weibo.userMsg = this.beforeEditWeibo.userMsg;
            this.editWeibo = {};
            this.beforeEditWeibo={}
        },
        doneEdit(weibo, index) {
            let _id = weibo._id;
            let newWeibo = weibo.userMsg;
            db.onEdit('weibo', _id, newWeibo, res => {
                if (res) {
                    //修改成功
                    this.editWeibo = {};
                    this.beforeEditWeibo={}
                }
            });
        },
        previewImage: function(cloudImgUrls, id) {
            let urls = [];
            cloudImgUrls.forEach(i => {
                urls.push(i.fileID);
            });
            wx.previewImage({
                current: id, // 当前显示图片的http链接
                urls // 需要预览的图片http链接列表
            });
        },
        showWeibos() {
            let weibos = this.weibos;
            this.setData({
                weibos
            });
        },
        updateWeibo(newWeibo) {
            app.globalData.weibos.unshift(newWeibo);
            this.$emit('updateWeibos');
        },
        initOSS() {
            let OSS_INFO = require('./cfg.js');
            let client = new OSS({
                region: OSS_INFO.OSS_region,
                accessKeyId: OSS_INFO.OSS_accessKeyId,
                accessKeySecret: OSS_INFO.OSS_accessKeySecret,
                bucket: OSS_INFO.OSS_bucket
            });
            return client;
        },
        async delWeibo(_id, index, cloudImgUrls) {
            if (cloudImgUrls.length) {
                let delList = [];
                cloudImgUrls.forEach(i => {
                    let url = i.fileID;
                    url = url.substr(url.indexOf('com') + 4);
                    delList.push(url);
                });
//                     let client = await this.initOSS();
//                     let m = await client.deleteMulti(delList); // OSS delete
            }
            db.onRemove('weibo', _id);
            app.globalData.weibos.splice(index, 1); //dom删除
            let weibos = app.globalData.weibos;
            this.$emit('updateWeibos');
        },
        fitTextarea() {
            let query = wx.createSelectorQuery(); //创建查询对象
            query.select('#textareaDiv').boundingClientRect(); //获取view的边界及位置信息
            query.exec(function(res) {
                that.setData({
                    height: res[0].height + 'px'
                });
            });
        }
    }
};
</script>

<style scoped="">
.q-weibos {
    margin: 15rpx;
}
.q-weibos .q-weibo {
    margin-top: 30rpx;
    border-top: 1px solid #909;
}
.q-weibos .q-weibo .page__content {
    padding: 20rpx;
    max-height: 50rpx;
    font-size: 32rpx;
}
.q-weibos .q-weibo .page__content textarea {
    width: 700rpx;
}
.q-weibos .q-weibo .weui-grids {
    margin-top: 10rpx;
    border: none;
}
.q-weibos .q-weibo .weui-grids .weui-grid {
    border: none;
}
.q-weibos .q-weibo .weui-grids .weui-grid .q-img {
    margin-left: 10rpx;
    width: 200rpx;
    height: 200rpx;
}
.q-weibos .q-weibo .page__ft {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.q-weibos .q-weibo .page__ft .q-time {
    color: #999;
    font-size: 28rpx;
}
.q-weibos .q-weibo .page__ft .q-btn {
    margin: 0 0 0 10rpx;
    color: #fff;
    background-color: purple;
    height: 50rpx;
    width: 150rpx;
    font-size: 28rpx;
    line-height: 50rpx;
    min-height: 1em;
}
</style>
