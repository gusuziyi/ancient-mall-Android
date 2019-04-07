<template>
    <Shop :id="id" @onShareAppMessage='onShareAppMessage'></Shop>
</template>

<script>
import Shop from './c/Shop';
export default {
    components: {
        Shop
    },
    data() {
        return {
            id: 0
        };
    },
    onLoad: function(options) {
        this.id = options.id;
    },
    // #ifdef MP|| APP-PLUS
    onShareAppMessage: function() {
        return {
            title: '美妆小铺古风版',
            path: 'pages/shops/shop/shop',
            success: function(res) {
                // 转发成功
                console.log('转发成功:' + JSON.stringify(res));
            }
        };
    }
    // #endif
};
</script>

<style scoped></style>
