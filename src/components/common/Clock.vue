<script>
/**
 * @desc 时钟组件
 */
 
export default {
  name: 'v-clock',
  props: {
    size: {
      type: Number,
      default: () => 300
    }
  },
  data: () => ({ time: new Date(), isRunning: false }),
  computed: {
    fontSize() {
      const size = this.size / 300 * 16
      return size > 12 ? `${size}px` : '12px'
    },
    scales() {
      const radius = this.size / 2 * 0.8
      const arr = []
      for (let i = 1; i <= 12; i++) {
        const radian = 30 * Math.PI / 180 * i - 0.5 * Math.PI
        const left = radius * Math.cos(radian) + this.size * 0.45
        const top = radius * Math.sin(radian) + this.size * 0.45
        arr.push({
          num: i,
          left: `${left.toFixed(2)}px`,
          top: `${top.toFixed(2)}px`
        })
      }
      return arr
    },
    hourHand() {
      const hourDeg = 30 * (this.time.getHours() % 12)
      const minuteDeg = 0.5 * this.time.getMinutes()
      return `translate(-50%, 0) rotate(${hourDeg + minuteDeg - 180}deg)`
    },
    minuteHand() {
      const minuteDeg = 6 * this.time.getMinutes()
      const secondDeg = 0.1 * this.time.getSeconds()
      return `translate(-50%, 0) rotate(${minuteDeg + secondDeg - 180}deg)`
    },
    secondHand() {
      return `translate(-50%, -10%) rotate(${6 * this.time.getSeconds() - 180}deg)`
    }
  },
 
  mounted() {
    this.isRunning = true
    const tick = () => {
      if (!this.isRunning) {
        return
      }
      this.time = new Date()
      const timer = setTimeout(() => {
        clearTimeout(timer)
        tick()
      }, 1000)
    }
    tick()
  },
  destroyed() {
    this.isRunning = false
  }
}
</script>
 
<template>
  <div
    :style="{width:`${size}px`,height:`${size}px`}"
    style="text-align:center"
  >
    <div :class="$style['black-dail']">
      <div :class="$style['white-dail']">
        <span
          v-for="v in scales"
          :key="`ds-${v.num}`"
          :class="$style['degree-scale']"
          :style="{left:v.left,top:v.top,fontSize}"
        >{{v.num}}</span>
        <b :class="$style['hour-hand']" :style="{transform:hourHand}"></b>
        <b :class="$style['minute-hand']" :style="{transform:minuteHand}"></b>
        <b :class="$style['second-hand']" :style="{transform:secondHand}"></b>
      </div>
    </div>
  </div>
</template>
 
<style lang="scss" module>
@import './styles.scss';
</style>