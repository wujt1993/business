<template>
  <div id="app" class="app">
    <router-view/>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    created () {
    },
    computed: {
      ...mapGetters([
        'loading',
        'isPC'
      ]),
    },
    watch: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    destroyed () {
    },
    components: {
      Loading
    },
    mounted () {
      document.body.clientWidth > 1280 ? this.$store.commit('SET_ISPC', true) : this.$store.commit('SET_ISPC', false)
    },
  }
</script>
<style lang="scss">
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    // overflow: hidden
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none
  }
</style>
