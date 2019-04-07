<template>
    <view :hidden="!isShow">
        <view class="modal">
            <view class="modal-content">
                <view class="modal-top"><view class="header">确认订单</view></view>
                <view class="modal-body">
                    <view class="q-item">
                        <text>店铺名称</text>
                        <text>{{ shopData.shopname }}</text>
                    </view>
                    <view class="q-item">
                        <text>产品名称</text>
                        <text>{{ shopData.name }}</text>
                    </view>
                    <view class="q-item">
                        <text>产品类型</text>
                        <text>{{ shopData.size }} {{ shopData.type }}</text>
                    </view>
                    <view class="q-item">
                        <text>产品数量</text>
                        <text>{{ shopData.num }}</text>
                    </view>
                    <view class="q-item">
                        <text>商品总价</text>
                        <text>{{ shopData.totalPrice }}元</text>
                    </view>
                    <view class="q-item" @tap="chooseCity">
                        <text>收货地址</text>
                        <text class="q-address">{{ address }}</text>
                    </view>
                    <view class="q-item">
                        <text>支付方式</text>
                        <view class="q-banks">
                            <block v-for="(item,index) in bankData" :key="index">
                                <view :class="['bank',item.enname]"><img :src="item.src" class="q-pic" data-index="index" @tap="chooseBank(index)"></img></view>
                            </block>
                        </view>
                    </view>
                </view>
                <view class="modal-footer">
                    <text class="btn" @tap="_cancelEvent">取消</text>
                    <text class="btn" @tap="_confirmEvent">提交</text>
                </view>
            </view>
        </view>
        <City-choose @check-city="checkedCity" v-show="showChooseCity" :showChooseCity='showChooseCity'></City-choose>
    </view>
</template>

<script>
import CityChoose from './CityChoose';
const pageData = require('./pageData');
export default {
    props:{
       buyInfo:Array,
       show:Boolean
    },
    components: {
        CityChoose
    },
    watch: {
    	show(newValue) {
            if(newValue){
                let buyInfo=this.buyInfo
                this.showModal(...buyInfo)
            }
    	}
    },
    data() {
        return {
            isShow: false,
            columnsData: [],
            shopData: [],
            bankData: [],
            address: '点击选择地址',
            showChooseCity:false
        };
    },
    methods: {
        //隐藏弹框
        hideModal() {
            this.setData({
                isShow: false,
                columnsData: [],
                shopData: {},
                bankData: []
            });
        },
        //展示弹框
        showModal(shopsData, choosedSize = {}, choosedType = {}, shopsNum) {
            if (shopsNum == 0) {
                //非购物车,由shop页面跳转至
                let shopItem = shopsData[0];
                let shopData = {
                    shopname: shopItem.shops,
                    name: shopItem.shop,
                    num: 1,
                    size: choosedSize.value,
                    type: choosedType.value,
                    totalPrice: (shopItem.price * choosedSize.price * choosedType.price).toFixed(2),
                    address: this.address
                };
                this.setData({
                    isShow: true,
                    columnsData: pageData.columnsData,
                    shopData,
                    bankData: pageData.bankData
                });
            } else if (shopsNum > 0) {
                //由购物车里跳转至
                let shopData = {};
                if (shopsData.length == 1) {
                    //单个商品结算
                    let shopItem = shopsData[0];
                    shopData = {
                        shopname: shopItem.shopname,
                        name: shopItem.name,
                        num: shopsNum,
                        size: shopItem.size,
                        type: shopItem.type,
                        totalPrice: shopItem.totalPrice,
                        address: this.address
                    };
                } else {
                    //全部结算
                }
                this.setData({
                    isShow: true,
                    columnsData: pageData.columnsData,
                    shopData,
                    bankData: pageData.bankData
                });
            }
        },
        _cancelEvent() {
            this.hideModal();
            //触发取消回调
            this.$emit('cancelEvent');
        },
        _confirmEvent() {
            //触发成功回调
            let address = this.address;
            if (address == '点击选择地址') {
                wx.showToast({
                    icon: 'none',
                    title: '请选择收货地址'
                });
                return;
            }
            wx.navigateTo({
            	url:"/pages/pay/pay"
            })
            this.$emit('confirmEvent');
        },
        chooseCity() {
            this.showChooseCity=true
        },
        checkedCity(city) { 
            this.showChooseCity=false
            this.setData({
                address: city
            });
        },
        chooseBank(index) {
            let payMethod = '';
            index == 0 ? (payMethod = '微信') : index == 1 ? (payMethod = '支付宝') : (payMethod = '京东'),
                wx.showToast({
                    icon: 'none',
                    title: '已选择' + payMethod + '支付'
                });
        }
    }
};
</script>

<style scoped="">
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
</style>
