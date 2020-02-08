<template>
    <div class="mobile-info">
        
        <ImgSlider v-if="imgList != null" :imgList="imgList"></ImgSlider>
        
        <MainInfo v-if="info != null && userInfo != null" :info="info" :userInfo="userInfo"></MainInfo>
        <MoreInfo v-if="info != null && buildInfo != null" :info="info" :buildInfo="buildInfo"></MoreInfo>
    </div>
</template>
<script>
import ImgSlider from "@/views/mobile/components/ImgSlider"
import MainInfo from "@/views/mobile/components/MainInfo"
import MoreInfo from "@/views/mobile/components/MoreInfo"
import {pProBusiness_GetByBusinessBuildID, pProDicPicPagePicList, pGetSurveyUserInfoByBusinessBuildID, pProDicMapGetBuild} from "@/api/info.js"
export default {
    data() {
        return {
            info: null,
            imgList: null,
            userInfo: null,
            BusinessName: '',
            BusinessNameEn: '',
            buildInfo: null,
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
        let baseInfo1 = sessionStorage.baseInfo ? JSON.parse(sessionStorage.baseInfo) : {}
        let baseInfo = this.$route.query
        let BusinessBuildID = baseInfo.BusinessBuildID
        let DicID = baseInfo.DicID
        let BuildID = baseInfo.BuildID
        let BusinessID = baseInfo.BusinessID
        this.BusinessName = baseInfo1.BusinessName
        this.BusinessNameEn = baseInfo1.BusinessNameEn
        this.pProBusiness_GetByBusinessBuildID(BusinessBuildID)
        this.pProDicPicPagePicList(DicID, BuildID, BusinessID)
        this.pGetSurveyUserInfoByBusinessBuildID(BusinessBuildID)
        this.pProDicMapGetBuild(DicID, BuildID)
    }
}
</script>
<style lang="scss">
</style>