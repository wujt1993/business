<template>
    <div class="pc-main-info">
        <div class="first-div">
            <div class="RentPriceAll"><span>{{mainInfo.RentPriceAll}}</span>元/月</div>
            <div>
                <div style="margin-bottom: 9px"><span>面积单价：{{mainInfo.PriceAreaUnit}}</span>元/m²•月</div>
                <div><span>工位单价：{{mainInfo.PriceWorkingUnit}}</span>元/工位•月</div>
            </div>
        </div>
        <div class="second-div">
            <table>
                <tr class="number">
                    <td>{{mainInfo.RoomCount}}间</td>
                    <td>{{mainInfo.WorkPersonCount}}</td>
                    <td>{{mainInfo.PositionLevel}}</td>
                </tr>
                <tr>
                    <td>间数</td>
                    <td>办公人数</td>
                    <td>定位</td>
                </tr>
            </table>
        </div>
        <div class="third-div">
            <div>
                <img :src="'./static/img/icon-name.png'">{{mainInfo.BusinessName}}({{mainInfo.BusinessNameEn}})
            </div>
            <div>
                <img :src="'./static/img/icon-dw.png'">{{mainInfo.Address}}
            </div>
            <div>
                <img :src="'./static/img/icon-dt.png'">{{mainInfo.MetroInfo}}
            </div>
            <div>
                <img :src="'./static/img/icon-ds.png'">{{mainInfo.DicBuildName}}
            </div>
        </div>
        <div class="forth-div">
            <div class="forth-div-title">顾问咨询</div>
            <div class="forth-div-content"><img :src="'./static/img/icon-user.png'">{{subInfo.DeptName}}</div>
            <div class="forth-div-content"><img :src="'./static/img/icon-phone.png'">{{subInfo.CellPhone}}</div>
            <div class="forth-div-content"><img :src="'./static/img/icon-email.png'">{{subInfo.Email}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['info', 'userInfo'],
    data() {
        return {
            mainInfo: {},
            subInfo: {}
        }
    },
    mounted() {
        this.mainInfo = this.info[0]
        this.subInfo = this.userInfo[0]
    }
}
</script>
<style lang="scss">
    .pc-main-info{
        font-size: 13px;
        .first-div{
            color: #555;
            display: flex;
            padding-bottom: 24px;
            border-bottom: 1px solid #eee;
            .RentPriceAll{
                margin-right: 12px;
                color: #c31515;
                span{
                    font-size: 38px;
                    font-weight: bold;
                    margin-left: 6px;
                }
            }
        }
        .second-div{
            padding: 24px 0;
            table{
                width: 100%;
                color: #777;
                .number{
                    font-size: 20px;
                    padding-bottom: 6px;
                    color: #000;
                    font-weight: bold
                }
            }
            border-bottom: 1px solid #eee;
        }
        .third-div{
            padding: 24px 0;
            color: #777;
            border-bottom: 1px solid #eee;
            & > div{
                position: relative;
                padding-left: 24px;
                line-height: 16px;
                margin-bottom: 24px;
                img{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
        .forth-div{
            padding: 24px 0;
            border-bottom: 1px solid #eee;
            .forth-div-title{
                font-weight: bold;
                font-size: 20px;
                margin-bottom: 12px;
            }
            .forth-div-content{
                font-size: 15px;
                margin-bottom: 12px;
                position: relative;
                padding-left: 28px;
                line-height: 20px;
                img{
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
</style>