<template>
    <div class="pc-content">
        <Search v-model="condition.BusinessName" @submit="submit"></Search>
        <Condition v-model="condition"></Condition>
        <OrderBy v-model="condition"></OrderBy>
        <List :data="listData" @handleCurrentChange="handleCurrentChange"></List>
    </div>
</template>
<script>
import Search from "@/views/pc/components/Search"
import Condition from "@/views/pc/components/Condition"
import OrderBy from "@/views/pc/components/OrderBy"
import List from "@/views/pc/components/List"
import {pProBusiness_SearchResult} from "@/api/Index.js"
export default {
    data() {
        return{
            condition: {
                District: '',
                Zone: '',
                BusinessName: '',
                AreaPrice: '',
                WorkPrice: '',
                MetroID: '',
                StationID: '',
                UserID: '',
                PageIndex: 1,
                PageSize: 10,
                PageCount: 0,
                RowCount: 0,
                Order: '',
                by: ''
            },
            listData: {
                list: [],
                total: [{}]
            }
        }
    },
    methods: {
        submit(val) {
            this.condition.PageIndex = 1
            this.businessSearch()
        },
        async businessSearch() {
            this.$store.commit('SET_LOADING', true)
            let params = JSON.parse(JSON.stringify(this.condition))
            this.listData = await pProBusiness_SearchResult(params)
            this.$store.commit('SET_LOADING', false)

        },
        handleCurrentChange(val) {
            this.condition.PageIndex = val
            this.businessSearch()
        }
    },
    watch: {
        condition() {
            this.businessSearch()
        }
    },
    components: {
        Search,
        Condition,
        List,
        OrderBy
    }
}
</script>
<style lang="scss">
    
</style>