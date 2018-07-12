<template>
  <div>
    <div class="image-input" :style="style">
      <img :src="src" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,

    width: String,

    height: String,

    radius: String
  },

  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius
      }
    }
  }
}
</script>

<style lang="less">
.image-input {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>


