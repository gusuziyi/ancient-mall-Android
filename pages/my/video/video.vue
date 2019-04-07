<template>
    <view class="camera-container">
        <camera :device-position="devicePosition" :flash="flash" @error="cameraError" @stop="cameraStop" class="camera-view"></camera>
        <view class="content-view">
            <view class="camera-property-view">
                <view class="devive-flash-view">
                    <text>闪光灯</text>
                    <radio-group class="device-position-radio" @change="flashRadioChange">
                        <label class="radio" v-for="(item,index) in flashs" :key="index">
                            <radio color="purple" :value="item.value" :checked="item.checked">{{ item.name }}</radio>
                        </label>
                    </radio-group>
                </view>
                <view class="devive-position-view">
                    <text>摄像头</text>
                    <radio-group class="device-position-radio" @change="deviceRadioChange">
                        <label class="radio" v-for="(item,index) in devicePositions" :key="index">
                            <radio color="purple" :value="item.value" :checked="item.checked">{{ item.name }}</radio>
                        </label>
                    </radio-group>
                </view>
                <view class="devive-module-view">
                    <text>模 式</text>
                    <radio-group class="device-position-radio" @change="moduleRadioChange">
                        <radio color="purple" value="pic" :checked="isTakePhoto">拍照</radio>
                        <radio color="purple" value="video" :checked="!isTakePhoto">录制</radio>
                    </radio-group>
                </view>
            </view>
            <view class="camera-action-view">
                <block v-if="isTakePhoto"><view class="main-button main-photo-button" hover-class="hover-photo-button" @tap="takePhoto">拍照</view></block>
                <block v-else>
                    <view v-if="recordState==0" class="main-button main-photo-button" hover-class="hover-photo-button" @tap="recordVideo">录制</view>
                    <view v-if="recordState==1" class="main-button main-record-video" @tap="stopRecord">录制中</view>
                    <view v-if="recordState==2" class="main-button main-photo-button" @tap="recordVideo">录制完成</view>
                </block>
            </view>
        </view>
        <view class="q-tip">
            本场录制
            <text class="q-intro">点击可回放</text>
        </view>
        <scroll-view class="preview-view" :scroll-x="true" :scroll-into-view="toView">
            <block v-for="(item,index) in dataList" :key="index" >
                <view class="q-thumb">
                    <image :id="image[index]" class="image-list" :src="item.thumbPath" @tap="imageClick(item.type,item.src)" data-type="item.type" data-src="item.src"></image>
                    <view v-if="item.type=='video'" class="weui-badge q-badge">视频</view>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 位置
            devicePosition: 'front',
            // 闪光灯
            flash: 'auto',
            // 位置数组
            devicePositions: [
                {
                    name: '后置',
                    value: 'back'
                },
                {
                    name: '前置',
                    value: 'front',
                    checked: 'true'
                }
            ],
            // 闪光灯数组
            flashs: [
                {
                    name: '自动',
                    value: 'auto',
                    checked: 'true'
                },
                {
                    name: '打开',
                    value: 'on'
                },
                {
                    name: '关闭',
                    value: 'off'
                }
            ],
            // 是否拍照
            isTakePhoto: true,
            // 录制状态
            recordState: 0,
            // 下边预览图数组
            dataList: [],
            // 滚动到的位置
            toView: ''
        };
    },
    methods: {
        takePhoto: function() {
            let that = this;
            // 获得相机 Context
            let ctx = wx.createCameraContext();
            // 执行拍照
            ctx.takePhoto({
                quality: 'high', // 高质量/正常/低质量
                success: function(res) {
                    // 成功回调
                    // console.log(res)
                    // 创建预览 item
                    let item = {
                        type: 'image',
                        thumbPath: res.tempImagePath,
                        src: res.tempImagePath
                    };
                    let dataList = that.dataList;
                    // 滚动到最后一张图
                    let toView = 'image' + (dataList.length - 1);
                    // 添加数据
                    dataList.push(item);
                    // 刷新页面数据
                    that.setData({
                        dataList: dataList,
                        toView: toView,
                        test: res.tempImagePath
                    });
                    console.log(dataList, 'image' + (dataList.length - 1));
                }
            });
        },
        deviceRadioChange: function(e) {
            // console.log(e)
            let that = this;
            // 获得摄像头位置
            let devicePosition = e.detail.value;
            // 刷新页面, 切换摄像头
            that.setData({
                devicePosition: devicePosition
            });
        },
        flashRadioChange: function(e) {
            // console.log(e)
            let that = this;
            let flash = e.detail.value;
            that.setData({
                flash: flash
            });
        },
        switchChange: function(e) {
            // console.log(e)
            let that = this;
            // 获得开关的值
            let change = e.detail.value;
            // 刷新页面
            that.setData({
                isTakePhoto: !change
            });
        },
        moduleRadioChange() {
            this.setData({
                isTakePhoto: !this.isTakePhoto
            });
        },
        recordVideo: function(e) {
            let that = this;
            // 获得相机 Context
            let ctx = wx.createCameraContext(this);
            // 刷新界面
            that.setData({
                recordState: 1
            });
            // 开始录制
            ctx.startRecord({
                success: function(res) {
                    console.log(res);
                },
                timeoutCallback: function(res) {
                    // 30s 超时回调
                    // console.log(res)
                    // 刷新界面
                    that.setData({
                        recordState: 2
                    });
                    // 创建预览 item
                    let item = {
                        type: 'video',
                        thumbPath: res.tempThumbPath,
                        src: res.tempVideoPath
                    };
                    let dataList = that.dataList;
                    dataList.push(item);
                    that.setData({
                        dataList: dataList
                    });
                    // 保存相册
                    // wx.saveVideoToPhotosAlbum({
                    //   filePath: res.tempVideoPath,
                    //   success: function(res) {},
                    //   fail: function(res) {},
                    //   complete: function(res) {},
                    // })
                }
            });
        },
        stopRecord: function(e) {
            let that = this;
            let ctx = wx.createCameraContext(this);
            that.setData({
                recordState: 2
            });
            ctx.stopRecord({
                success: function(res) {
                    // console.log(res)
                    let item = {
                        type: 'video',
                        thumbPath: res.tempThumbPath,
                        src: res.tempVideoPath
                    };
                    let dataList = that.dataList;
                    dataList.push(item);
                    that.setData({
                        dataList: dataList
                    });
                }
            });
        },
        reRecord() {},
        imageClick: function(resType,src) {
            // 获得资源类型
            // 获得资源的路径
            // 判断是否是图片还是视频
            if (resType == 'image') {
                // 预览图像
                wx.previewImage({
                    current: src,
                    urls: [src],
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {}
                });
            } else if (resType == 'video') {
                // 挑转视频页面加载视频
                wx.navigateTo({
                    url: './play/play?src=' + src,
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {}
                });
            }
        }
    }
};
</script>

<style scoped="">
.camera-container {
    position: fixed;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.camera-container .camera-view {
    width: 100%;
    height: 300px;
}
.camera-container .content-view {
    margin: 20rpx;
}
.camera-container .content-view,
.camera-container .content-view .camera-property-view {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-justify-content: space-around;
    justify-content: space-around;
}
.camera-container .content-view .camera-property-view {
    margin-top: 20rpx;
    width: 75%;
}
.camera-container .content-view .camera-property-view .devive-position-view,
.camera-container .content-view .camera-property-view .devive-position-view .device-position-radio {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-content: center;
    align-content: center;
}
.camera-container .content-view .camera-property-view .devive-position-view .device-position-radio {
    color: #000;
}
.camera-container .content-view .camera-property-view .devive-flash-view,
.camera-container .content-view .camera-property-view .devive-module-view {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
}
.camera-container .content-view .camera-action-view {
    width: 25%;
    text-align: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.camera-container .content-view .camera-action-view,
.camera-container .content-view .camera-action-view .main-button {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
}
.camera-container .content-view .camera-action-view .main-button {
    margin-top: 40rpx;
    width: 160rpx;
    height: 160rpx;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    border-radius: 50%;
}
.camera-container .content-view .camera-action-view .main-photo-button {
    background-color: purple;
    border: 1rpx solid #8b008b;
    color: #fff;
}
.camera-container .content-view .camera-action-view .main-record-video {
    background-color: purple;
    border: 3rpx solid #000;
    color: #fff;
}
.camera-container .q-tip {
    color: purple;
    margin-bottom: 10rpx;
    margin-top: 10rpx;
}
.camera-container .q-tip .q-intro {
    font-size: 26rpx;
    color: #666;
}
.camera-container .preview-view {
    width: 100%;
    height: 300rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    white-space: nowrap;
}
.camera-container .preview-view .q-thumb {
    display: inline-block;
    position: relative;
    width: 200rpx;
    height: 180rpx;
    margin-left: 20rpx;
    margin-top: 20rpx;
}
.camera-container .preview-view .q-thumb .image-list {
    width: 200rpx;
    height: 180rpx;
    display: inline-block;
    border-radius: 4rpx;
}
.camera-container .preview-view .q-thumb .q-badge {
    background-color: purple;
    color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5rpx 10rpx;
}
</style>
