<template>
    <div class="pc-more-info">
        <div>
            <div class="div-title">基本信息</div>
            <div class="div-content">
                <div class="div-flex">
                    <div><span>硬件配套</span><div>{{mainInfo.DeviceSupportNames.replace(/,/g," | ")}}</div></div>
                    <div><span>服务内容</span><div>{{mainInfo.ServiceNames.replace(/,/g," | ")}}</div></div>
                </div>
                <div class="div-flex">
                    <div><span>区域/板块</span><div>{{mainInfo.DistrictZoneName}}</div></div>
                    <div><span>主力户型</span><div>{{mainInfo.MainRoomType}}</div></div>
                </div>
                <div class="div-flex">
                    <div><span>简介</span><div v-html="Intrudution"></div></div>
                </div>
            </div>
        </div>
        <div>
            <div class="div-title">所在栋苑信息</div>
            <div class="div-content">
                <div class="div-flex" style="color: #409EFF;font-size: 15px">
                    <div>{{mainInfo.DicName}}{{mainInfo.BuildName}}</div>
                </div>
                <div class="div-flex">
                    <div><span>外墙装修</span><div>{{mainInfo.WallOutside}}</div></div>
                    <div><span>总层数</span><div>{{mainInfo.FloorCount}}</div></div>
                </div>
                <div class="div-flex">
                    <div><span>层高</span><div>{{mainInfo.FloorHeight}}m ( 净层高{{mainInfo.FloorNetHeight}}m )</div></div>
                    <div><span>楼层净深</span><div>{{mainInfo.FloorInDepth}}m</div></div>
                </div>
                <div class="div-flex">
                    <div><span>架高地台</span><div>{{mainInfo.OFPlatformOverHeight}}cm</div></div>
                    <div><span>柱间距</span><div>{{mainInfo.PillarDistance}}cm</div></div>
                </div>
                <div class="div-flex">
                    <div><span>消防</span><div>{{mainInfo.Fire}}</div></div>
                    <div><span>景观</span><div>{{mainInfo.View}}</div></div>
                </div>
                <div class="div-flex" style="margin-bottom: 12px">
                    电梯 ( 品牌: {{mainInfo.LiftBrand}} )
                </div>
                <div class="div-flex">
                    <div><span>客梯</span><div>{{mainInfo.LiftPassengerCount}}台</div></div>
                    <div><span>客梯承重</span><div>{{mainInfo.LiftPassengerDesc}}</div></div>
                </div>
                <div class="div-flex">
                    <div><span>货梯</span><div>{{mainInfo.LiftGoodsCount}}台</div></div>
                    <div><span>货梯承重</span><div>{{mainInfo.LiftGoodsDesc}}</div></div>
                </div>
                <div class="div-flex" style="margin-bottom: 12px">
                    洗手间
                </div>
                <div class="div-flex">
                    <div><span>位置</span><div>{{mainInfo.OFTolietPosition}}</div></div>
                    <div><span>数目</span><div>{{mainInfo.OFTolietCount}}间</div></div>
                </div>
                <div class="div-flex" style="margin-bottom: 12px">
                    进驻
                </div>
                <div class="div-flex">
                    <div><span>知名企业</span><div>{{mainInfo.OFFamousCom}}</div></div>
                    <div><span>行业类别</span><div>{{mainInfo.OFFamousComIndustry}}</div></div>
                </div>
                <div id="map-core" style="width: 100%;height: 300px"></div>
            </div>
           
        </div>
    </div>
</template>
<script>
import BMap from 'BMap'
export default {
    props: ['info', "buildInfo"],
    data() {
        return {
            mainInfo: {
                DeviceSupportNames: '',
                ServiceNames: '',
            },
            Intrudution: '',
            map: null
        }
    },
    mounted() {
        this.mainInfo = this.info[0]
        this.Intrudution = this.mainInfo.Intrudution.replace(/\\r\\n/g,"<br><br>")
        this.map = new BMap.Map('map-core')
        this.map.centerAndZoom(new BMap.Point(this.buildInfo[0].lng - 0, this.buildInfo[0].lat - 0), 10)
    }
}
</script>
<style lang="scss">
    .pc-more-info{
        padding: 48px 0 108px;
        font-size: 13px;
        & > div{
            padding-bottom: 24px;
            border-bottom: 1px solid #eee;
            margin-bottom: 24px;
            .div-title{
                font-size: 24px;
                font-weight: bold;
                padding-bottom: 24px;
                margin-bottom: 24px;
                border-bottom: 1px solid #eee;
            }
            .div-content{
                
                .div-flex{
                    display: flex;
                    margin-bottom: 24px;
                    & > div{
                        flex: 1;
                        display: flex;
                        span {
                            color: #777;
                            width: 80px;
                            display: inline-block
                        }
                        div{
                            flex: 1
                        }
                    }
                }
            }
        }
    }
</style>