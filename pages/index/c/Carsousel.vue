<template>
    <swiper class="q-carsousel" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <block v-for="(item, index) in imgUrls" :key="index">
            <swiper-item><image :src="item" @tap="goNav(item)"  class="slide-image q-img" /></swiper-item>
        </block>
    </swiper>
</template>

<script>
export default{
    props: {
        imgUrls: Array
    },
    data() {
        return {
            imgLinks: '/pages/shops/shop/shop?id=',
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            circular: true
        };
    },
    methods: {
        goNav(url) {
            let idOffset = url.lastIndexOf('-');
            let shopid = url.substr(idOffset + 1);
            url = this.imgLinks + shopid.split('.')[0];
            wx.navigateTo({
                url
            });
        }
    }
}
</script>

<style scoped>
.q-carsousel {
    margin-top: 30rpx;
}
.q-carsousel,
.q-carsousel .q-img {
    width: 750rpx;
    height: 350rpx;
}
</style>
