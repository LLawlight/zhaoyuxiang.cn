<template>
  <div class="about">
    Shout Out To <a href="//hzfe.org" target="_blank">HZFE</a>.
  </div>
</template>

<script>
export default {
  layout: 'page',

  head () {
    return {
      title: '关于'
    }
  }
}
</script>

<style lang="less">
.about {
  text-align: center;

  a {
    color: #2066c2;
  }
}
</style>
