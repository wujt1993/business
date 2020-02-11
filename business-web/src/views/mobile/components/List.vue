<template>
    <div class="mobile-content-list">
        <div class="has-data" v-if='res.length > 0'>
            <div style="border-bottom:none;font-size:18px;padding: 12px 0 0">
                已为您找到<span style="color: #409EFF;margin:0 6px;">{{data.total[0].RowCount}}</span>栋写字楼
            </div>
            <div v-for="(item, index) in res" :key="index"  @click="readInfo(item)">
                <img :src="item.picPath || './static/img/404.jpg'" alt="" @error="imgerrorfun(index)">
                <img :src="'./static/img/icon-video.png'" alt="" class="icon-video" v-if="item.hasVideo == 1">
                <div class="build-info">
                    <div class="BusinessName">{{item.BusinessName}}</div>
                    <div class="address">{{item.DicBuildName}} | {{item.DistrictZoneName}}</div>
                    
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
        <div v-else style='text-align:center;font-size: 30px;color:#999;line-height:300px'>
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
    mounted() {
        
    }   
}
</script>
<style lang="scss">
    .mobile-content-list{
        padding: 0 12px;
        margin: 0 auto 36px;
        .has-data{
            & > div {
                padding: 24px 0 ;
                border-bottom: 1px solid #e5e5e5;
                position: relative;
                img {
                    width: 120px;
                    height: 90px;
                    float: left
                }
                .icon-video{
                    width: 32px;
                    height: 32px;
                    position: absolute;
                    top: 78px;
                    left: 82px;
                }
                .build-info{
                    margin-left: 130px;
                    font-size: 13px;
                    & > div{
                        margin-bottom: 6px;
                    }
                    .BusinessName{
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .address{
                        color: #777;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
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