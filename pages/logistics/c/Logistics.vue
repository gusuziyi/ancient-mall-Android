<template>
        <view class="modal">
            <view class="modal-content">
                <view class="modal-top">
                    <view class="header">物流信息</view>
                    <text class="btn" @tap="_confirmEvent">确定</text>
                </view>
                <view class="modal-body">
                    <map
                        id="map"
                        :longitude="longitude"
                        :latitude="latitude"
                        scale="4"
                        :markers="markers"
                        @markertap="markertap"
                        :polyline="polyline"
                        class="q-map"
                    ></map>
                    <view class="q-item">
                        <text>当前状态</text>
                        <text>运送中</text>
                    </view>
                    <view class="q-item">
                        <text>预计到达</text>
                        <text>3天内送达</text>
                    </view>
                </view>
            </view>
        </view>
</template>

<script>
const cityMap = require('../src/cityMap');
export default {
    props: {
    	shows: Boolean,
        pshopsArea:String
    },
    watch: {
    	shows :{
            handler(newValue){
               if(newValue){
                   this.showModal(this.pshopsArea)
               } 
            },
            immediate:true
    		
    	}
    },
    data() {
        return {
            markers: [
                {
                    iconPath: '/static/map/icons_18.png',
                    id: 0,
                    longitude: 0,
                    latitude: 0,
                }
            ],
            polyline: [
                {
                    points: [], //{latitude: ,longitude: }
                    color: '#800080',
                    width: 2,
                    dottedLine: true
                }
            ],
            longitude: 110, //用户位置,用于置中地图
            latitude: 30,
        };
    },
    methods: {
        //展示弹框
        showModal(shopsAreas) {
            wx.showLoading({
                title: '加载地图中'
            });
            let shopsCoord = this.getShopsCoord(shopsAreas); //获得卖家坐标
            let that = this;
            uni.getLocation({
                //将自己坐标更新到polyline中
                type: 'gcj02',
                success: function(res) {
                    let latitude = res.latitude;
                    let longitude = res.longitude;
                    console.log(latitude,longitude);
                    let polyline = that.polyline;
                    let markers = that.markers;
                    polyline[0].points = [];
                    polyline[0].points.push({
                        latitude: res.latitude,
                        longitude: res.longitude
                    });
                    polyline[0].points.push({
                        latitude: shopsCoord[1],
                        longitude: shopsCoord[0]
                    });
                    markers[0].longitude = shopsCoord[0];
                    markers[0].latitude = shopsCoord[1];
                    that.setData({
                        polyline,
                        markers,
                        longitude,
                        latitude
                    });
                    wx.hideLoading();
                },
                fail() {
                    wx.hideLoading();
                    wx.showToast({
                        title: '绘制失败,请重试',
                        icon: 'none'
                    });
                }
            });
        },
        _confirmEvent() {
            //触发成功回调
            // this.hideModal()
            this.$emit('onhide')
        },
        regionchange(e) {
            // console.log(e.type)
        },
        getShopsCoord(shopsAreas) {
            let shopsName =''
            let shopsCoord=[]
            for (let key in cityMap) {
            	if(shopsAreas.indexOf(key) > -1){
                    shopsName=key
                    shopsCoord=cityMap[key]
                }
            }
            return shopsCoord;
        },
        markertap(e) {
            let shopsArea = this.pshopsArea;
            console.log('地图起始点:', shopsArea);
            let address = '发货地 : ' + shopsArea;
            wx.showToast({
                title: address,
                icon: 'none',
                duration: 3000
            });
        }
    }
};
</script>

<style scoped>
.modal {
    z-index: 100;
    width: 750rpx;
    height: 1200rpx;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
}
.modal-content {
    width: 80%;
    margin-left: 10%;
    margin-top: 150rpx;
    height: 800rpx;
    background: #fff;
    position: relative;
    border-radius: 20rpx;
}
.modal-content .modal-top {
    padding: 20rpx;
    height: 50rpx;
    background: purple;
    color: #fff;
    border-radius: 20rpx 20rpx 0 0;
    font-size: 30rpx;
}
.modal-content .modal-body {
    text-align: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-align-content: center;
    align-content: center;
}
.modal-content .modal-body,
.modal-content .modal-body .q-item {
    padding: 20rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.modal-content .modal-body .q-item {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    border-bottom: 1px solid purple;
    width: 80%;
    color: purple;
    font-size: 30rpx;
    height: 40rpx;
    margin: auto;
}
.modal-content .modal-body .q-item .q-address {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 300rpx;
    overflow: hidden;
    text-align: right;
}
.modal-content .modal-body .q-item .q-banks {
    width: 300rpx;
    margin: -20rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
}
.modal-content .modal-body .q-item .q-banks .bank {
    width: 80rpx;
    height: 40rpx;
    display: inline-block;
}
.modal-content .modal-body .q-item .q-banks .bank .q-pic {
    height: 80rpx;
    width: 80rpx;
}
.modal-content .modal-footer {
    padding: 20rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 95%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}
.modal-content .modal-footer .btn {
    font-size: 30rpx;
    width: 100rpx;
    height: 50rpx;
    background-color: purple;
    color: #fff;
    line-height: 50rpx;
    text-align: center;
    margin-right: 20rpx;
    border-radius: 10rpx;
}
.modal-top {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.modal-top .btn {
    background-color: #fff;
    color: purple;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
}
.modal-body .q-map {
    width: 100%;
    height: 500rpx;
}
</style>
