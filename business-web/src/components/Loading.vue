<template>
  <div class="loading" @click.stop>
    <div class="loading-content">
      加载中
      <div class="dotting"><span/><span/><span/></div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="scss" scoped>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: rgba(20, 20, 20, 0);

    $h: 48px;

    .loading-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translate(-50%, 0);
      height: $h;
      font-size: 24px;
      font-weight: 600;
      color: #00DFFF;
      line-height: 50px;


      @keyframes loading {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }

      &::before {
        content: '';
        display: block;
        width: 60px;
        height: 60px;
        background: url("../../static/img/loading.png") 100% 100% / 100% 100% no-repeat;
        animation: loading 1.5s linear infinite;
        margin-right: 10px;
      }

      $width: 72px;

      @keyframes loadingDotting {
        25% {
          width: $width/3 *1;
          right: -$width/3 *1;
        }
        50% {
          width: $width/3 *2;
          right: -$width/3 *2;
        }
        75% {
          width: $width/3 *3;
          right: -$width/3 *3;
        }
      }

      .dotting {
        position: absolute;
        right: 0;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0;

        span {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 24px 8px 0;
          border-radius: 50%;
          background: #00DFFF;
        }

        animation: loadingDotting 1.5s step-start infinite;
      }
    }
  }
</style>
