<template>
    <div class="mobile-content-search">
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
    .mobile-content-search{
        background: #f5f5f6;
        & > div{
            padding: 12px;
            position: relative;
            input{
                vertical-align: top;
                box-sizing: border-box;
                height: 36px;
                line-height: 36px;
                padding: 0 22px 0 12px;
                border: 0;
                box-shadow: 0 1px 2px -1px rgba(0,0,0,0.2);
                border-radius: 2px;
                font-size: 14px;
                width: 100%;
            }
            .el-icon-search{
                position: absolute;
                top: 12px;
                font-size: 16px;
                cursor: pointer;
                right: 0;
                height: 36px;
                width: 60px;
                text-align: center;
                line-height: 36px;
            }
        }
    }
</style>