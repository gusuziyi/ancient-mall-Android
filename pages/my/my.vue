<template>
    <view>
        <Userinfo @getweibos="get"></Userinfo>
        <New-state @updateWeibos='get'></New-state>
        <State :weibos='weibos' @updateWeibos='get'></State>
    </view>
</template>

<script>
import Userinfo from './c/Userinfo';
import NewState from './c/NewState';
import State from './c/State';
const app = getApp();
export default {
    components: {
        Userinfo,
        NewState,
        State
    },
    data(){
        return {
            weibos:[]
        }
    },
    methods: {
        get() {
           this.weibos=app.globalData.weibos
        }
    }
};
</script>

<style></style>
