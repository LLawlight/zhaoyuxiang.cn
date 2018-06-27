<template>
  <canvas :id="id" class="logo" ref="logo"></canvas>
</template>

<script>
export default {
  props: {
    id: {
      type: [Number, String],
      default() {
        return `logo-${Math.ceil(Math.random() * 15000)}`
      }
    },

    width: {
      type: [Number, String],
      default: 48
    },

    height: {
      type: [Number, String],
      default: 48
    },

    lineColor: {
      type: String,
      default: 'black'
    },

    lineWidth: {
      type: [Number, String],
      default: 1
    },

    backgroundColor: {
      type: String,
      default: 'transparent'
    }
  },

  mounted() {
    this.$nextTick(this.draw)

  },

  methods: {
    draw() {
      const canvas = document.getElementById(this.id)
      const scaleFactor = 6
      canvas.style.backgroundColor = this.backgroundColor
      canvas.style.width = this.width + 'px'
      canvas.style.height = this.height + 'px'
      canvas.width = this.width * scaleFactor
      canvas.height = this.height * scaleFactor
  
      const canvasHeight = canvas.height
      const canvasWidth = canvas.width
      const centerPointX = canvasWidth / 2
      const centerPointY = canvasHeight / 2
      const logoHeight =  canvasHeight * .8
      const logoPointOffset = logoHeight / 2 / Math.sqrt(2)

      const ctx = canvas.getContext('2d')

      ctx.lineWidth = this.lineWidth * scaleFactor
      ctx.strokeStyle = this.lineColor
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(centerPointX, centerPointY)
      ctx.lineTo(centerPointX + logoPointOffset, centerPointY - logoPointOffset)
      ctx.lineTo(centerPointX - logoPointOffset, centerPointY - logoPointOffset)
      ctx.lineTo(centerPointX + logoPointOffset, centerPointY + logoPointOffset)
      ctx.lineTo(centerPointX - logoPointOffset, centerPointY + logoPointOffset)
      ctx.lineTo(centerPointX, centerPointY)
      ctx.lineTo(centerPointX, centerPointY + logoPointOffset)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(centerPointX, centerPointY, logoHeight / 2, 0, Math.PI * 2, false)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(centerPointX, centerPointY, canvasHeight / 2 - ctx.lineWidth / 2, 0, Math.PI * 2, false)
      ctx.stroke()

      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
  }
}
</script>



