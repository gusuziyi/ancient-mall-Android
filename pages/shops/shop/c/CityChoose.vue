<template>
    <view class="container" v-if="condition">
        <view class="cityshow"><input :value="province+'-'+city+'-'+county" /></view>
        <picker-view indicator-style="height: 50px;" :value="value" @change="bindChange" class="citybody">
            <picker-view-column class="citypicker">
                <view v-for="(item,index) in provinces" :key="index">{{ item }}</view>
            </picker-view-column>
            <picker-view-column class="citypicker">
                <view v-for="(item,index) in citys" :key="index">{{ item }}</view>
            </picker-view-column>
            <picker-view-column class="citypicker">
                <view v-for="(item,index) in countys" :key="index">{{ item }}</view>
            </picker-view-column>
        </picker-view>
        <view class="footer">
            <text class="btn" @tap="cancelCity">取消</text>
            <text class="btn" @tap="confirmCity">确认</text>
        </view>
    </view>
</template>

<script>
let cityData = require('./citys.js');
export default {
    props:{
        showChooseCity:Boolean
    },
    watch: {
    	showChooseCity(newValue) {
    		if(newValue)
                this.open()
    	}
    },
    data() {
        return {
            provinces: [],
            province: '',
            citys: [],
            city: '',
            countys: [],
            county: '',
            value: [0, 0, 0],
            values: [0, 0, 0],
            condition: false
        };
    },
    methods: {
        bindChange: function(e) {
            //console.log(e);
            let val = e.detail.value;
            let t = this.values;

            if (val[0] != t[0]) {
                // console.log('province no ');
                const citys = [];
                const countys = [];

                for (let i = 0; i < cityData[val[0]].sub.length; i++) {
                    citys.push(cityData[val[0]].sub[i].name);
                }
                for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
                    countys.push(cityData[val[0]].sub[0].sub[i].name);
                }

                this.setData({
                    province: this.provinces[val[0]],
                    city: cityData[val[0]].sub[0].name,
                    citys: citys,
                    county: cityData[val[0]].sub[0].sub[0].name,
                    countys: countys,
                    values: val,
                    value: [val[0], 0, 0]
                });

                return;
            }
            if (val[1] != t[1]) {
                // console.log('city no');
                const countys = [];

                for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
                    countys.push(cityData[val[0]].sub[val[1]].sub[i].name);
                }

                this.setData({
                    city: this.citys[val[1]],
                    county: cityData[val[0]].sub[val[1]].sub[0].name,
                    countys: countys,
                    values: val,
                    value: [val[0], val[1], 0]
                });
                return;
            }
            if (val[2] != t[2]) {
                // console.log('county no');
                this.setData({
                    county: this.countys[val[2]],
                    values: val
                });
                return;
            }
        },
        open() {
            this.setData({
                condition: true
            });
            let that = this;

            const provinces = [];
            const citys = [];
            const countys = [];

            for (let i = 0; i < cityData.length; i++) {
                provinces.push(cityData[i].name);
            }
            for (let i = 0; i < cityData[0].sub.length; i++) {
                citys.push(cityData[0].sub[i].name);
            }
            for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
                countys.push(cityData[0].sub[0].sub[i].name);
            }

            that.setData({
                provinces: provinces,
                citys: citys,
                countys: countys,
                province: cityData[0].name,
                city: cityData[0].sub[0].name,
                county: cityData[0].sub[0].sub[0].name
            });
            console.log('城市选择组件-初始化完成');
        },
        cancelCity() {
            this.setData({
                condition: false
            });
        },
        confirmCity() {
            let address = this.province + this.city + this.county;
            this.$emit('check-city', address);
            this.setData({
                condition: false
            });
        }
    }
};
</script>

<style scoped="">
.container {
    z-index: 999;
    width: 750rpx;
    height: 275rpx;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
}
.container .cityshow {
    height: 100rpx;
    line-height: 100rpx;
    display: block;
    background-color: #fff;
    border-bottom: 1px solid rgba(80, 0, 80, 0.8);
    border-top: 1px solid rgba(80, 0, 80, 0.8);
}
.container .cityshow input {
    color: purple;
    text-align: center;
    padding: 20rpx 50rpx;
}
.container .citybody {
    display: block;
    line-height: 50px;
    padding-left: 20px;
    padding-right: 20px;
}
.container .citybody .citypicker {
    height: 40px;
    margin: auto 50rpx;
}
.container .footer {
    margin-top: 10px;
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
.container .footer .btn {
    font-size: 30rpx;
    width: 100rpx;
    height: 50rpx;
    background-color: rgba(80, 0, 80, 0.8);
    color: #fff;
    line-height: 50rpx;
    text-align: center;
    margin-right: 20rpx;
    border-radius: 10rpx;
}
</style>
