import request from '../utils/request-util'


export const pProBusiness_GetByBusinessBuildID = params => request.get(`/findListByPro/pProBusiness_GetByBusinessBuildID`, {params}).then()
export const pProDicPicPagePicList = params => request.get(`/findListByPro/pProDicPicPagePicList`, {params}).then()
export const pGetSurveyUserInfoByBusinessBuildID = params => request.get(`/findListByPro/pGetSurveyUserInfoByBusinessBuildID`, {params}).then()
export const pProDicMapGetBuild = params => request.get(`/findListByPro/pProDicMapGetBuild`, {params}).then()

