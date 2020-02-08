<template>
    <div class="mobile-content-condition">
        <div class="condition-nav">
            <div v-for="(item, index) in navList" :key="index" @click="selectConditionType(index)">
                {{item.name}} <i :class="{'el-icon-arrow-down': !item.active, 'el-icon-arrow-up': item.active}"></i>
            </div>
            <i class="el-icon-sort" :class="{active: isOrderBy}" @click="orderBy"></i>
        </div>
        
        <div class="condition-desc" v-show="showDesc">
            <div class="condition-desc-content" v-show="isOrderBy">
                <OrderBy v-model="model" @submit="showDesc = false"></OrderBy>
            </div>
            <div class="condition-desc-content" v-show="!isOrderBy">
                <div class="content-main">
                    <div v-show="activeIndex==0" class="div-flex">
                        <div class="first-div">
                            <ul>
                                <li @click="selectType(true)" :class="{active: isDistrict}">区域</li>
                                <li @click="selectType(false)" :class="{active: !isDistrict}">地铁</li>
                            </ul>
                        </div>
                        <div class="second-div"  v-show="firstArea.length > 1">
                            <ul>
                                <li v-for="(item, index) in firstArea" :key="index" :class="{active: firstIndex == item.id}" @click="getSecondArea(item.id)">{{item.name}}</li>
                            </ul>
                        </div>
                        <div class="third-div"  v-show="secondArea.length > 1">
                            <ul>
                                <li v-for="(item, index) in secondArea" :key="index" :class="{active: secondIndex == item.id}" @click="selectSecond(item.id)">{{item.name}}</li>
                            </ul>
                        </div>
                    </div>
                    <div v-show="activeIndex==1">
                        <div v-for="(item, index) in AreaPrice" :key="index">
                        
                            <div class="common-btn" :class="{active: condition.AreaPrice == item.value}" @click="selectAreaPice(item.value)">{{item.label}}</div>
                        </div>
                    </div>
                    <div v-show="activeIndex==2">
                        <div v-for="(item, index) in WorkPrice" :key="index">
                            <div class="common-btn" :class="{active: condition.WorkPrice == item.value}" @click="selectWorkPrice(item.value)">{{item.label}}</div>
                        </div>
                    </div>
                </div>
                <div class="content-footer">
                    <div @click="cancel">取消</div>
                    <div class="active" @click="submit">确定</div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import {pProGetAllDistrict, PV2ProGetAllMetroLine, pProZoneListByDistrict, PV2ProGetStationByLine} from "@/api/Index.js"
import OrderBy from "@/views/mobile/components/OrderBy"
export default {
    props: ['value'],
    data() {
        return {
            isDistrict: true,
            showDesc: false,
            navList: [
                {name: '位置', active: false},
                {name: '面积单价', active: false},
                {name: '工位单价', active: false}
            ],
            activeIndex: 0,
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
            secondIndex: '',
            condition: {},
            isOrderBy: false
        }
    },
    watch: {
        showDesc() {
            for(let i = 0, len = this.navList.length; i< len; i++) {
                this.navList[i].active = false
            }
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
        orderBy() {
            this.isOrderBy = true
            this.showDesc = true
        },
        submit() {
            this.showDesc = false
            this.model = JSON.parse(JSON.stringify(this.condition))
            if(this.firstArea[this.firstIndex] && this.firstArea[this.firstIndex].name) {
                this.navList[0].name = this.firstArea[this.firstIndex].name
                this.navList[0].name = (this.secondArea[this.secondIndex] && this.secondArea[this.secondIndex].name) ? this.secondArea[this.secondIndex].name : this.firstArea[this.firstIndex].name
            }else{
                this.navList[0].name = "位置"
            }
            
            this.navList[1].name = this.condition.AreaPrice ? this.condition.AreaPrice : "面积单价"
            this.navList[2].name = this.condition.WorkPrice ? this.condition.WorkPrice : "工位单价"
        },
        selectAreaPice(val) {
            this.condition.AreaPrice = val
        },
        selectWorkPrice(val) {
            this.condition.WorkPrice = val
        },
        selectConditionType(index) {
            this.isOrderBy = false
            this.activeIndex = index
            for(let i = 0, len = this.navList.length; i< len; i++) {
                if(i == index) continue
                this.navList[i].active = false
            }
            this.navList[index].active = true
            if(!this.showDesc) {
                this.showDesc = true
                this.condition = JSON.parse(JSON.stringify(this.model))
            }
            
        },
        cancel(index) {
            this.showDesc = false
        },
        async selectSecond(id) {
            this.secondIndex = id
            this.isDistrict ? this.condition.MetroID = id : this.condition.StationID = id
        },
        async getSecondArea(id) {
            this.firstIndex = id
            this.secondIndex = ''
            let res = null
            let type = this.isDistrict ? "district" : "zone"
            this.isDistrict ? this.condition.District = id : this.condition.Zone = id
            if(id == "") {
                this.secondArea = []
            }else{
                res = await this.getArea(type, id)
                this.secondArea = res
            }
        },
        async selectType(flag) {
            this.isDistrict = flag
            let res = null
            this.secondArea = []
            this.condition.District = ''
            this.condition.Zone = ''
            this.condition.MetroID = ''
            this.condition.StationID = ''
            this.firstIndex = ''
            this.secondIndex = ''
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
    components: {
        OrderBy
    },
    mounted() {
        // this.condition = JSON.parse(JSON.stringify(this.model))
        this.selectType(true)
        
    }
}
</script>
<style lang="scss">
    .mobile-content-condition{
        background: #fbfbfb;
        height: 48px;
        
        border-bottom: 1px solid #ddd;
        .condition-nav{
            display: flex;
            line-height: 48px;
            font-size: 13px;
            & > div{
                flex: 1;
                text-align: center
            }
            & > i{
                width: 48px;
                text-align: center; 
                line-height: 48px;
            }
            & > i.active{
                color: #409EFF
            }
        }
        .condition-desc{
            position: fixed;
            width: 100%;
            height: calc(100% - 108px);
            top: 108px;
            background: rgba(0, 0, 0, .5);
            z-index: 9999;
            .common-btn {
                text-align: center;
                padding: 6px 12px;
                background: #eee;
                color: #555;
                display: inline-block;
                font-size: 13px;
            }
            .common-btn.active {
                background: #409EFF;
                color: #fff;
            }
            .condition-desc-content {
                background: #fff;
                .content-footer {
                    display: flex;
                    padding: 6px 12px;
                    border-top: 1px solid #ddd;
                    & > div{
                        flex: 1px;
                        text-align: center;
                        padding: 9px 0;
                        background: #eee;
                        color: #555;
                        margin-right: 6px;
                    }
                    & > div.active{
                        margin-right: 0;
                        margin-left: 6px;
                        background: #409EFF;
                        color: #fff;
                    }
                }
                .content-main{
                    & > div {
                        padding: 6px;
                        & > div{
                            width: 33%;
                            padding: 6px;
                            display: inline-block;
                            .common-btn{
                                width: 100%;
                            }
                        }
                    }
                    .div-flex{
                        padding: 0;
                        display: flex;
                        height: 400px;
                        & > div{
                            padding: 0;
                            height: 400px;
                            overflow: auto;
                            ul{
                                li{
                                    padding:12px;
                                    border-bottom: 1px solid #eee;
                                }
                                li.active{
                                    color:#409EFF
                                }
                            }
                        }

                        .first-div{
                            flex: 2;
                            background: #fff;

                        }
                        .second-div{
                            flex: 2;
                            background: #f5f5f5;

                        }
                        .third-div{
                            flex: 3;
                            background: #f5f5f5;
                            border-left: 1px solid #eee;
                        }
                    }
                }
            }
        }
    }
</style>