<template>
    <div class="mobile-content">
        <Search v-model="condition.BusinessName" @submit="submit"></Search>
        <Condition v-model="condition"></Condition>
        <List :data="listData" @handleCurrentChange="handleCurrentChange"></List>
    </div>
</template>
<script>
import Search from "@/views/mobile/components/Search"
import Condition from "@/views/mobile/components/Condition"
import List from "@/views/mobile/components/List"
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
        List
    },
    mounted() {
        this.businessSearch()
    }
}
</script>
<style lang="scss">
    
</style>