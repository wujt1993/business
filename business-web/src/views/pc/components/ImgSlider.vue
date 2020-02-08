<template>
    <div class="pc-img-slider" v-if="res != null">
        <div class="big-img">
            <img :src="res[activeIndex].picPath" alt="" v-if="activeIndex != 0" class="big-item" @error="imgerrorfun(activeIndex, 'picPath')">
            <video :src="res[activeIndex].picPath" controls="controls" v-else class="big-item" width='784'></video>
            <!-- <iframe height=445 width=784 :src="res[activeIndex].picPath" frameborder=0 allowfullscreen v-else class="big-item"></iframe> -->
            <!-- <iframe height=498 width=510 src='http://player.youku.com/embed/XODQxMjcyOTYw' frameborder=0></iframe> -->
        </div>
       
        <div class="small-img">
            <div class="silder-div">
                <div class="left-btn" @click="preImg()"><i class="el-icon-arrow-left"></i></div>
                <ul>
                    <li v-for="(item, index) in res" :key="index" :title="item.categoryName">
                        <div class="dialog-div" :class="{active: index == activeIndex}" @click="selectImg(index)"></div>
                        <img :src="item.picPathSmall" alt="" v-if="index != 0" class="small-item" @error="imgerrorfun(index, 'picPathSmall')">
                        <video :src="item.picPathSmall" controls="controls" v-else class="small-item"></video>
                    </li>
                </ul>
                <div class="right-btn" @click="nextImg()"><i class="el-icon-arrow-right"></i></div>
            </div>
        </div>
        <div class="tool-div">
            <div class="inline-div" :class="{active: isVideo}" @click="activeIndex = 0">
                视频
            </div>
            <div class="inline-div" :class="{active: !isVideo}" @click="activeIndex = 1">
                实景图
            </div>
            <span class="sub">{{activeIndex+1}} / {{res.length}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['imgList'],
    data() {
        return {
            res: null,
            activeIndex: 0,
            isVideo: true
        }
    },
    watch: {
        activeIndex() {
            this.isVideo = (this.activeIndex == 0)
        }
    },
    methods: {
        imgerrorfun(index, type) {
            this.res[index][type] = './static/img/404.jpg'
        },
        selectImg(index) {
            this.activeIndex = index
        },
        preImg() {
            let index = this.activeIndex
            this.activeIndex = ((index - 1) + this.res.length) % this.res.length
        },
        nextImg() {
            let index = this.activeIndex
            this.activeIndex = ((index + 1) + this.res.length) % this.res.length
        }
    },
    mounted() {
        this.res = JSON.parse(JSON.stringify(this.imgList))
        if(this.res.length == 0) {
            for(let i = 0; i < 6; i++) {
                this.res.push({
                    picPath: "./static/img/404.jpg",
                    picPathSmall: "./static/img/404.jpg",
                })
            }
            
        }
    }
}
</script>
<style lang="scss">
    .pc-img-slider{
        .tool-div{
            position: relative;
            margin: 12px 0;
            text-align: center;
            .sub{
                position: absolute;
                right: 0;
                font-size: 13px;
                color: #555;
            }
            .inline-div{
                display: inline-block;
                font-size: 13px;
                padding: 6px 12px;
                border: 1px solid #eee;
                cursor: pointer;
                border-radius: 3px;
            }
            .inline-div.active{
                color: #409EFF;
                border-color: #409EFF
            }
        }
        .big-img{
            .big-item{
                width: 100%;
                height: 445px;
            }
        }
        .small-img{
            margin: 8px 0;
            .silder-div{
                display: flex;
                .right-btn,
                .left-btn{
                    line-height: 82px;
                    width: 30px;
                    text-align: center;
                    font-size: 20px;
                    color: #cac9c9;
                    opacity: .8;
                    filter: alpha(opacity=80);
                    background-color: #000;
                    user-select: none;
                    cursor: pointer;
                }
                ul{
                    display: flex;
                    padding: 0 4px;
                    flex: 1;
                    li {
                        position: relative;
                        flex: 1;
                        padding: 0 4px;
                        height: 82px;
                        .dialog-div{
                            position: absolute;
                            height: 82px;
                            width: 100%;
                            z-index: 2;
                            cursor: pointer;
                            background: rgba(255, 255, 255, .5)
                        }
                        .dialog-div.active{
                            background: rgba(255, 255, 255, 0)
                        }
                        .small-item{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        
    }
</style>