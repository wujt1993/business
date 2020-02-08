<template>
    <div class="pc-content-list">
        <div class="has-data" v-if='res.length > 0'>
            <div style="border-bottom:none;font-size:22px">
                已为您找到<span style="color: #409EFF;margin:0 6px;">{{data.total[0].RowCount}}</span>栋写字楼
            </div>
            <div v-for="(item, index) in res" :key="index">
                <img :src="item.picPath || './static/img/404.jpg'" alt="" @error="imgerrorfun(index)">
                <div class="build-info">
                    <div class="BusinessName" @click="readInfo(item)">{{item.BusinessName}}</div>
                    <div class="address">{{item.DicBuildName}}　|　{{item.DistrictZoneName}}　|　{{item.MetroInfo}}</div>
                    <div>面积单价：{{item.PriceAreaUnit}} <span style="margin-left:6px;color:#777">元/m²•月</span></div>
                    <div>工位单价：{{item.PriceWorkingUnit}}<span style="margin-left:6px;color:#777">元/工位•月</span></div>
                </div>
            </div>
            <el-pagination
                style="text-align:center"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="data.total[0].RowCount">
            </el-pagination>
        </div>
        <div v-else style='text-align:center;font-size: 44px;color:#999;line-height:400px'>
            暂无资源
        </div>
    </div>
</template>
<script>

export default {
    props: ['data'],
    data() {
        return {
            res: []
        }
    },
    watch: {
        'data.list'() {
            this.res = JSON.parse(JSON.stringify(this.data.list))
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val)
        },
        readInfo(baseInfo) {
            sessionStorage.baseInfo = JSON.stringify(baseInfo)
            let params = "?BusinessBuildID=" + baseInfo.BusinessBuildID + "&DicID=" + baseInfo.DicID + "&BuildID=" + baseInfo.BuildID + "&BusinessID=" + baseInfo.BusinessID
            this.$router.push("/info" + params)
        },
        imgerrorfun(index, type) {
            this.res[index].picPath = './static/img/404.jpg'
        },
    },
}
</script>
<style lang="scss">
    .pc-content-list{
        
        width: 1280px;
        margin: 0 auto 108px;
        .has-data{
            & > div {
                padding: 24px 0 ;
                border-bottom: 1px solid #e5e5e5;
                img {
                    width: 200px;
                    height: 150;
                    float: left
                }
                .build-info{
                    margin-left: 260px;
                    & > div{
                        margin-bottom: 12px;
                    }
                    .BusinessName{
                        font-size: 20px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .address{
                        color: #777
                    }
                }
                overflow: auto;
            }
            & > div:last-child{
                border-bottom: none
            }
        }
        
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        min-width: 40px;
    }
    .el-pager li, .el-pagination button, .el-pagination span:not([class*=suffix]){
        height: 36px;
        line-height: 36px;
        font-size: 14px;
    }
</style>