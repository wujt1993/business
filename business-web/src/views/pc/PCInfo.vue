<template>
    <div class="pc-info">
        <div class="pc-info-header">
            <div>
                <div class="active" @click="retunIndex">商务中心</div>
                <i class="el-icon-arrow-right"></i>
                <div>{{BusinessName}}</div>
            </div>
            
        </div>
        <div class="pc-info-content">
            <div class="pc-info-main">
                <ImgSlider v-if="imgList != null" :imgList="imgList"></ImgSlider>
                <MoreInfo v-if="info != null && buildInfo != null" :info="info" :buildInfo="buildInfo"></MoreInfo>
            </div>
            <div class="pc-info-side">
                <MainInfo v-if="info != null && userInfo != null" :info="info" :userInfo="userInfo"></MainInfo>
            </div>
        </div>
        
    </div>
</template>
<script>
import ImgSlider from "@/views/pc/components/ImgSlider"
import MainInfo from "@/views/pc/components/MainInfo"
import MoreInfo from "@/views/pc/components/MoreInfo"
import {pProBusiness_GetByBusinessBuildID, pProDicPicPagePicList, pGetSurveyUserInfoByBusinessBuildID, pProDicMapGetBuild} from "@/api/info.js"
export default {
    data() {
        return {
            info: null,
            imgList: null,
            userInfo: null,
            BusinessName: '',
            buildInfo: null
        }
    },
    components: {
        ImgSlider,
        MainInfo,
        MoreInfo
    },
    methods: {
        async pProBusiness_GetByBusinessBuildID(BusinessBuildID) {
            this.info = await pProBusiness_GetByBusinessBuildID({
                BusinessBuildID: BusinessBuildID
            })
        },
        async pProDicPicPagePicList(DicID, BuildID, BusinessID) {
            this.imgList = await pProDicPicPagePicList({
                DicID: DicID,
                BuildID: BuildID,
                BusinessID: BusinessID,
                PageType: 3
            })
        },
        async pGetSurveyUserInfoByBusinessBuildID(BusinessBuildID) {
            this.userInfo = await pGetSurveyUserInfoByBusinessBuildID({
                BusinessBuildID: BusinessBuildID
            })
        },
        retunIndex() {
            this.$router.push("/")
        },
        async pProDicMapGetBuild(DicID, BuildID) {
            this.buildInfo = await pProDicMapGetBuild({
                DicID: DicID,
                BuildID: BuildID
            })
        }
    },
    mounted() {
        // let baseInfo = JSON.parse(sessionStorage.baseInfo)
        let baseInfo1 = sessionStorage.baseInfo ? JSON.parse(sessionStorage.baseInfo) : {}
        let baseInfo = this.$route.query
        let BusinessBuildID = baseInfo.BusinessBuildID
        let DicID = baseInfo.DicID
        let BuildID = baseInfo.BuildID
        let BusinessID = baseInfo.BusinessID
        this.BusinessName = baseInfo1.BusinessName
        this.pProBusiness_GetByBusinessBuildID(BusinessBuildID)
        this.pProDicPicPagePicList(DicID, BuildID, BusinessID)
        this.pGetSurveyUserInfoByBusinessBuildID(BusinessBuildID)
        this.pProDicMapGetBuild(DicID, BuildID)
    }
}
</script>
<style lang="scss">
    .pc-info{
        .pc-info-header{
            background: #f5f5f6;
            & > div{
                height: 36px;
                line-height: 36px;
                width: 1280px;
                margin: 0 auto;
                font-size: 13px;
                display: flex;
                color: #777;
                .el-icon-arrow-right{
                    line-height: 36px;
                    font-size: 13px;
                    margin: 0 6px;
                }
            }
            .active{
                cursor: pointer;
            }
            
        }
        .pc-info-content{
            width: 1280px;
            margin: 24px auto;
            display: flex;
            .pc-info-main{
                width: 65%;
                box-sizing: border-box;
                padding-right: 48px;
            }
            .pc-info-side{
                width: 35%;
            }
        }
        
    }
</style>