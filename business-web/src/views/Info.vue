<template>
    <div class="content">
        <PCInfo v-if="isPC"/>
        <MobileInfo v-else/>
    </div>
</template>
<script>
import PCInfo from "@/views/pc/PCInfo"
import MobileInfo from "@/views/mobile/MobileInfo"
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
        PCInfo,
        MobileInfo
    }
}
</script>
<style lang="scss">
    
</style>