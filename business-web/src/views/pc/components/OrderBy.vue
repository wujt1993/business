<template>
    <div class="pc-content-order-by">
        <div>
            <div v-for="(item, index) in orderData" :key="index" :class="{active: item.active}" @click="orderBy(index)">
                {{item.name}}
                <i :class="{'el-icon-bottom': item.by == 1, 'el-icon-top': item.by == 0}" v-show="item.active && index!=0"></i>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props: ['value'],
    data() {
        return {
            orderData: [
                {name: '默认排序', value: '', by: 0, active: true},
                {name: '面积单价', value: 'PriceAreaUnit', by: 0, active: false},
                {name: '工位单价', value: 'PriceWorkingUnit', by: 0, active: false},
                {name: '地铁距离', value: 'distance', by: 0, active: false}
            ]
        }
    },
    computed: {
        model: {
            set (val) {
                this.$emit('input', val)
            },
            get () {
                return this.value
            },
        },
    },
    methods: {
        orderBy(index) {
            for(let i = 0, len = this.orderData.length; i < len; i++) {
                if(i == index) continue
                this.orderData[i].by = 0
                this.orderData[i].active = false
            }
            if(this.orderData[index].active){
                this.orderData[index].by = (this.orderData[index].by == 1 ? 0 : 1)
            }else{
                this.orderData[index].active = true
            }
            this.model.Order = this.orderData[index].value
            this.model.by = this.orderData[index].by
            this.model = JSON.parse(JSON.stringify(this.model))
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
    .pc-content-order-by{
        width: 1280px;
        margin: 0 auto;
        
        & > div{
            display: flex;
            border-bottom: 2px solid #409EFF;
            & > div{
                width: 150px;
                text-align: center;
                line-height: 48px;
                cursor: pointer;
            }
            & > div.active{
                background: #409EFF;
                color: #fff;
            }
        }
    }
</style>