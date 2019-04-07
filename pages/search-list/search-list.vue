<template>
    <view>
        <Search-bar :is-self="true"></Search-bar>
        <Search-list :search-results="searchResult"></Search-list>
    </view>
</template>

<script>
const db = require('../util/databaseGuide');
import SearchBar from '../index/c/SearchBar';
import SearchList from './c/SearchList'
export default {
    components: {
        SearchBar,
        SearchList
    },
    data() {
        return {
            searchResult: []
        };
    },
    onLoad: function(options) {
        let searchResult = [];
        let searchStr = options.searchStr;
        db.onSiQuery('shop', searchStr, res => {
            //模糊查询
            this.searchResult = res;
        });
    }
};
</script>

<style scoped="">
page {
    background-color: #f6f6f6;
}
</style>
