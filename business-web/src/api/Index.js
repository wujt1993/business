import request from '../utils/request-util'


export const pProGetAllDistrict = params => request.get(`/findListByPro/pProGetAllDistrict`, {params}).then()
export const pProZoneListByDistrict = params => request.get(`/findListByPro/pProZoneListByDistrict`, {params}).then()


export const PV2ProGetAllMetroLine = params => request.get(`/findListByPro/PV2ProGetAllMetroLine`, {params}).then()
export const PV2ProGetStationByLine = params => request.get(`/findListByPro/PV2ProGetStationByLine`, {params}).then()

export const pProBusiness_SearchResult = params => request.get(`/findPageListByPro/pProBusiness_SearchOrderbyResult/pProBusiness_SearchPages`, {params}).then()
