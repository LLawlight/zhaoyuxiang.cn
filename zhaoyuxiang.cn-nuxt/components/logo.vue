<template>
  <canvas :id="id" class="logo" ref="logo"></canvas>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      step: 1,
      offsetArc: 0,
      timer: null
    }
  },

  props: {
    id: {
      type: [Number, String],
      default() {
        return `logo-${Math.ceil(Math.random() * 15000)}`
      }
    },

    size: {
      type: Number,
      default: 48
    },

    lineColor: {
      type: String,
      default: 'white'
    },

    lineWidth: {
      type: Number,
      default: 6
    },

    backgroundColor: {
      type: String,
      default: 'transparent'
    },

    time: {
      type: [Number, String],
      default: 6
    }
  },

  mounted() {
    this.$nextTick(this.draw)

  },

  methods: {
    draw() {
      const canvas = document.getElementById(this.id)
      const scaleFactor = window.devicePixelRatio
      canvas.style.backgroundColor = this.backgroundColor
      canvas.style.width = this.size + 'px'
      canvas.style.height = this.size + 'px'
      canvas.width = this.size * scaleFactor
      canvas.height = this.size * scaleFactor
      canvas.getContext('2d').scale(scaleFactor, scaleFactor)
  
      const canvasSize = this.size
      const centerPoint = canvasSize / 2
      const logoHeight =  canvasSize * .8
      const logoPointOffset = logoHeight / 2 / Math.sqrt(2)

      const ctx = canvas.getContext('2d')

      ctx.lineWidth = this.lineWidth
      ctx.strokeStyle = this.lineColor
      ctx.lineJoin = 'round'

      // 静态LOGO
      // ctx.beginPath()
      // ctx.moveTo(centerPoint, centerPoint)
      // ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset)
      // ctx.lineTo(centerPoint - logoPointOffset, centerPoint - logoPointOffset)
      // ctx.lineTo(centerPoint + logoPointOffset, centerPoint + logoPointOffset)
      // ctx.lineTo(centerPoint - logoPointOffset, centerPoint + logoPointOffset)
      // ctx.lineTo(centerPoint, centerPoint)
      // ctx.lineTo(centerPoint, centerPoint + logoPointOffset)
      // ctx.stroke()

      // ctx.beginPath()
      // ctx.arc(centerPoint, centerPoint, logoHeight / 2, 0, Math.PI * 2, false)
      // ctx.stroke()

      // ctx.beginPath()
      // ctx.arc(centerPoint, centerPoint, canvasSize / 2 - ctx.lineWidth / 2, 0, Math.PI * 2, false)
      // ctx.stroke()


      // 动态LOGO
      const pathLength = logoHeight * 2 + logoPointOffset * 5
      const time = Number(this.time)
      const speed = pathLength / time / 60
      const speedArc = 2 / time / 60
  
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      ctx.beginPath();
      ctx.moveTo(centerPoint, centerPoint);
      if (this.step == 1 || this.step == 3 || this.step == 5) {
        this.offset = this.offset + speed / Math.sqrt(2)
      }
      else {
        this.offset = this.offset + speed
      }
      if (this.step == 1) {
        if (this.offset >= logoPointOffset) {
          this.offset = logoPointOffset
        }
        ctx.lineTo(centerPoint + this.offset, centerPoint - this.offset);
        if (this.offset == logoPointOffset) {
          this.offset = 0
          this.step++
        }
      }
      else if (this.step == 2) {
        if (this.offset >= 2 * logoPointOffset) {
          this.offset = 2 * logoPointOffset
        }
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint + logoPointOffset - this.offset, centerPoint - logoPointOffset);
        if (this.offset == 2 * logoPointOffset) {
          this.offset = 0
          this.step++
        }
      }
      else if (this.step == 3) {
        if (this.offset >= 2 * logoPointOffset) {
          this.offset = 2 * logoPointOffset
        }
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset + this.offset, centerPoint - logoPointOffset + this.offset);
        if (this.offset == 2 * logoPointOffset) {
          this.offset = 0
          this.step++
        }
      }
      else if (this.step == 4) {
        if (this.offset >= 2 * logoPointOffset) {
          this.offset = 2 * logoPointOffset
        }
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint + logoPointOffset - this.offset, centerPoint + logoPointOffset);
        if (this.offset == 2 * logoPointOffset) {
          this.offset = 0
          this.step++
        }
      }
      else if (this.step == 5) {
        if (this.offset >= logoPointOffset) {
          this.offset = logoPointOffset
        }
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset + this.offset, centerPoint + logoPointOffset - this.offset);
        if (this.offset == logoPointOffset) {
          this.offset = 0
          this.step++
        }
      }
      else if (this.step == 6) {
        if (this.offset >= logoPointOffset) {
          this.offset = logoPointOffset
        }
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint, centerPoint);
        ctx.lineTo(centerPoint, centerPoint + this.offset);
        if (this.offset == logoPointOffset) {
          this.offset = 0
          this.step++
        }
      }
      else {
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint - logoPointOffset);
        ctx.lineTo(centerPoint + logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint - logoPointOffset, centerPoint + logoPointOffset);
        ctx.lineTo(centerPoint, centerPoint);
        ctx.lineTo(centerPoint, centerPoint + logoPointOffset);
      }
      ctx.stroke();

      this.offsetArc = this.offsetArc + speedArc
      if (this.offsetArc >= 2) {
        this.offsetArc = 2
      }
      ctx.beginPath();
      ctx.arc(centerPoint, centerPoint, logoHeight / 2, 0, Math.PI * this.offsetArc, false);
      ctx.stroke();

      ctx.beginPath();
      let bigOffetArc = Math.PI
      if (this.offsetArc <= 1) {
        bigOffetArc = Math.PI + Math.PI * this.offsetArc
      }
      else {
        bigOffetArc = (this.offsetArc - 1 - 0.0000001) * Math.PI
      }
      ctx.arc(centerPoint, centerPoint, canvasSize / 2 - ctx.lineWidth / 2, Math.PI, bigOffetArc, false);
      ctx.stroke();

      if (this.step >= 7 && this.offsetArc >= 2) {
        clearTimeout(this.timer)
      }
      else {
        this.timer = setTimeout(() => {
          this.draw()
        }, 1000 / 60);
      }
    }
  }
}
</script>



