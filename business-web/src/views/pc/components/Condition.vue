<template>
    <div class="pc-content-condition">
        <div>
            <ul class="condition-list">
                <li>
                    <div class="condition-name">位置</div>
                    <div class="condition-content">
                        <div class="condition-content-sub">
                            <div @click="selectType(true)" :class="{active: isDistrict}">区域<i :class="{'el-icon-arrow-down': isDistrict, 'el-icon-arrow-up': !isDistrict}"></i></div>
                            <div @click="selectType(false)"  :class="{active: !isDistrict}">地铁<i :class="{'el-icon-arrow-down': !isDistrict, 'el-icon-arrow-up': isDistrict}"></i></div>
                        </div>
                        <div class="first-area" v-show="firstArea.length > 1">
                            <div v-for="(item, index) in firstArea" :key="index" :class="{active: firstIndex == item.id}" @click="getSecondArea(item.id)">{{item.name}}</div>
                        </div>
                        <div class="second-area" v-show="secondArea.length > 1">
                            <div v-for="(item, index) in secondArea" :key="index" :class="{active: secondIndex == item.id}" @click="selectSecond(item.id)">{{item.name}}</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="condition-name">面积单价</div>
                    <div class="condition-content">
                        <el-radio v-model="model.AreaPrice" :label="item.value" v-for="(item, index) in AreaPrice" :key="index">{{item.label}}</el-radio>
                        <span class="unit-icon">元/m²•月</span>
                    </div>
                </li>
                <li>
                    <div class="condition-name">工位单价</div>
                    <div class="condition-content">
                        <el-radio v-model="model.WorkPrice" :label="item.value" v-for="(item, index) in WorkPrice" :key="index">{{item.label}}</el-radio>
                        <span class="unit-icon">元/工位•月</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {pProGetAllDistrict, PV2ProGetAllMetroLine, pProZoneListByDistrict, PV2ProGetStationByLine} from "@/api/Index.js"
import {sleep} from "@/utils/utils.js"
export default {
    props: ['value'],
    data() {
        return {
            isDistrict: true,
            AreaPrice:[
                {label: '全部', value: ""},
                {label: '150以下', value: "150以下"},
                {label: '151-200', value: "151-200"},
                {label: '201-300', value: "201-300"},
                {label: '301-400', value: "301-400"},
                {label: '401-500', value: "401-500"},
                {label: '501-600', value: "501-600"},
                {label: '601-700', value: "601-700"},
                {label: '701-800', value: "701-800"},
                {label: '801以上', value: "801以上"}
            ],
            WorkPrice: [
                {label: '全部', value: ""},
                {label: '1000以下', value: "1000以下"},
                {label: '1001-2000', value: "1001-2000"},
                {label: '2001-3000', value: "2001-3000"},
                {label: '3001-4000', value: "3001-4000"},
                {label: '4001-5000', value: "4001-5000"},
                {label: '5000以上', value: "5000以上"},
            ],
            firstArea: [],
            secondArea: [],
            firstIndex: '',
            secondIndex: ''
        }
    },
    watch: {
        'model.AreaPrice'() {
            this.model = JSON.parse(JSON.stringify(this.model))
        },
        'model.WorkPrice'() {
            this.model = JSON.parse(JSON.stringify(this.model))
        }
    },
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
        },
        async selectSecond(id) {
            this.secondIndex = id
            this.isDistrict ? this.model.MetroID = id : this.model.StationID = id
            this.model = JSON.parse(JSON.stringify(this.model))
        },
        async getSecondArea(id) {
            this.firstIndex = id
            this.secondIndex = ''
            let res = null
            let type = this.isDistrict ? "district" : "zone"
            this.isDistrict ? this.model.District = id : this.model.Zone = id
            if(id == "") {
                this.secondArea = []
            }else{
                res = await this.getArea(type, id)
                this.secondArea = res
            }
            this.model = JSON.parse(JSON.stringify(this.model))
        },
        async selectType(flag) {
            this.isDistrict = flag
            let res = null
            this.secondArea = []
            this.model.District = ''
            this.model.Zone = ''
            this.model.MetroID = ''
            this.model.StationID = ''
            this.firstIndex = ''
            this.secondIndex = ''
            this.model = JSON.parse(JSON.stringify(this.model))
            if(flag) {
                res = await this.getArea("district", "all")
            }else{
                res = await this.getArea("zone", "all")
            }
            this.firstArea = res
        },
        async getStationByLine(id) {
            let result = await PV2ProGetStationByLine({LineID: id})
            let res = [{name: '全部', id: ''}]
            for(let i = 0, len = result.length; i < len; i++) {
                res.push({
                    name: result[i].StationName,
                    id: result[i].StationID
                })
            }
            this.setArea("zone", id, res)
            
        },
        async getAllMetroLine() {
            let result = await PV2ProGetAllMetroLine()
            let res = [{name: '全部', id: ''}]
            for(let i = 0, len = result.length; i < len; i++) {
                res.push({
                    name: result[i].MetroName,
                    id: result[i].MetroID
                })
            }
            this.setArea("zone", 'all', res)
        },
        async zoneListByDistrict(id) {
            let result = await pProZoneListByDistrict({District: id})
            let res = [{name: '全部', id: ''}]
            for(let i = 0, len = result.length; i < len; i++) {
                res.push({
                    name: result[i].ZoneName,
                    id: result[i].ZoneID
                })
            }
            this.setArea("district", id, res)
        },
        async getAllDistrict() {
            let result = await pProGetAllDistrict()
            let res = [{name: '全部', id: ''}]
            for(let i = 0, len = result.length; i < len; i++) {
                res.push({
                    name: result[i].DistrictName,
                    id: result[i].DistrictID
                })
            }
            this.setArea("district", 'all', res)
        },
        setArea(type, id, data) {
            let area = sessionStorage.area ? JSON.parse(sessionStorage.area) : {
                district: {},
                zone: {}
            }
            area[type][id] = data
            sessionStorage.area = JSON.stringify(area)
        },
        async getArea(type, id) {
            let area = sessionStorage.area ? JSON.parse(sessionStorage.area) : {
                district: {},
                zone: {}
            }
            if(area[type][id]) return area[type][id]
            if(type=="district"){
                id == "all" ? await this.getAllDistrict() : await this.zoneListByDistrict(id)
            }else{
                id == "all" ? await this.getAllMetroLine() : await this.getStationByLine(id)
            }
            return JSON.parse(sessionStorage.area)[type][id]
        }
    },
    mounted() {
        this.selectType(true)
    }
}
</script>
<style lang="scss">
    .pc-content-condition{
        margin: 26px 0;
        font-size: 14px;
        & > div{
            width: 1280px;
            margin: 0 auto;
            padding: 14px;
            background-color: #fbfbfb;
            box-shadow: 0 1px 2px -1px rgba(0,0,0,0.2);
            .condition-list{
                & > li {
                    display: flex;
                    line-height: 27px;
                    .condition-name{
                        color: #000;
                        font-weight: bold;
                        width: 56px;
                        text-align: right;
                        white-space: nowrap;
                    }
                    .condition-content{
                        margin-left: 24px;
                        flex: 1;
                        .el-radio__label{
                            padding-left: 6px;

                        }
                        .el-radio{
                            margin-right: 16px;
                            width: 86px
                        }
                        .el-radio:first-child{
                            width: 60px
                        }
                        .unit-icon{
                            color:#777
                        }
                        .condition-content-sub{
                            display: flex;
                            & > div{
                                cursor:pointer;
                                padding-right: 16px;
                            }
                            & > div.active{
                                color: #409EFF
                            }
                        }
                        .first-area{
                            overflow: auto;
                            margin: 8px 0;
                            & > div{
                                float: left;
                                margin-right: 16px;
                                cursor: pointer
                            }
                            & > div.active{
                                color: #409EFF
                            }
                        }
                        .second-area{
                            margin-bottom: 16px;
                            overflow: auto;
                            & > div{
                                float: left;
                                margin-right: 16px;
                                cursor: pointer
                            }
                            & > div.active{
                                color: #409EFF
                            }
                        }
                    }
                }
            }
        }
    }
</style>