<template>
    <div class="pc-content-search">
        <div>
            <input type="text" v-model="model" placeholder="请输入商务中心名称查找" v-on:keyup.enter="submit">
            <i class="el-icon-search" @click="submit"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: ['value'],
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
        submit() {
            this.$emit('submit', this.value)
        }
    }
}
</script>
<style lang="scss">
    .pc-content-search{
        background: #f5f5f6;
        & > div{
            width: 1280px;
            margin: 0 auto;
            padding: 30px 0;
            position: relative;
            input{
                vertical-align: top;
                box-sizing: border-box;
                width: 710px;
                height: 45px;
                line-height: 45px;
                padding: 0 22px;
                border: 0;
                box-shadow: 0 1px 2px -1px rgba(0,0,0,0.2);
                border-radius: 2px;
                font-size: 16px;
            }
            .el-icon-search{
                position: absolute;
                top: 41px;
                font-size: 22px;
                left: 678px;
                cursor: pointer;
            }
        }
    }
</style>