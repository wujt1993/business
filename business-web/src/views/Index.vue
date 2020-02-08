<template>
    <div class="content">
        <PC v-if="isPC" />
        <Mobile v-else/>
    </div>
</template>
<script>
import PC from "@/views/pc/PC"
import Mobile from "@/views/mobile/Mobile"
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
      ...mapGetters([
        'isPC'
      ]),
    },
    components:{
        PC,
        Mobile
    },
    mounted() {
        
    }
}
</script>
<style lang="scss">
    
</style>