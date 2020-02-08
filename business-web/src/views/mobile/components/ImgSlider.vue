<template>
    <div class="mobile-img-slider" v-if="res != null">
        <div class="swiper-container" style="height: 200px;">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in res" :key="index">
                    <img :src="item.picPath" alt="" v-if="index != 0" class="item" @error="imgerrorfun(index, 'picPath')">
                    <video :src="item.picPath" controls="controls" v-else class="item"></video>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
    props: ['imgList'],
    data() {
        return {
            res: null,
            activeIndex: 0
        }
    },
    methods: {
        imgerrorfun(index, type) {
            this.res[index][type] = './static/img/404.jpg'
        },
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
        setTimeout(()=>{
            var mySwiper = new Swiper('.swiper-container', {
                loop:true,
                // pagination: ".swiper-pagination",
                // paginationType: "bullets",
                pagination: {//分页  
                    el: '.swiper-pagination',  
                    // clickable: true,//分页指示点可点击  
                    // renderBullet: function (index, className) {//分页点加索引  
                    //     return '<span class="' + className + '">' + (index + 1) + '</span>';  
                    // },  
                },  
            })
        }, 500)
        
    }
}
</script>
<style lang="scss">
    .mobile-img-slider{
        .item{
            width: 100%;
            height: 200px
        }
    }
</style>