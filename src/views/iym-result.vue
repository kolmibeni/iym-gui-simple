<template>
<div>

<div class="subtitle">
  The Most Suspicious Factors Causing Yield Loss
</div>

<div class="row">

  <div class="col-sm">
    <h3 class="text-center">TPOGA</h3>
    <button
      v-for="(TPOGA, index) in ksaResult.OGAResult"
      :key="TPOGA"
      class="btn form-control resultCard"
      :class="barColors[index]"><b>{{TPOGA}}</b></button>
  </div>

  <div class="col-sm">
    <h3 class="text-center">ALASSO</h3>
    <button
      v-for="(ALASSO, index) in ksaResult.LassoResult"
      :key="ALASSO"
      class="btn form-control resultCard"
      :class="barColors[index]"><b>{{ALASSO}}</b></button>
  </div>
</div>

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      ksaResult: {},
      barColors: []
    }
  },

  computed: {
    ...mapMutations(['setNavTitle'])
  },

  created () {
    let vueThis = this
    // const proxyurl = ''
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'http://' + this.$webServeUrl + '/ksa/api/ksaapi'
    axios.get(proxyurl + url)
      .then((data) => {
        vueThis.ksaResult = JSON.parse(JSON.stringify(data)).data

        for (let i = 0; i < vueThis.ksaResult.OGAResult.length; i++) {
          if (vueThis.ksaResult.OGAResult[i] === vueThis.ksaResult.LassoResult[i]) {
            vueThis.barColors.push('match')
          } else {
            vueThis.barColors.push('mismatch')
          }
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.btn.resultCard {
  color: black;

  margin-bottom: 1vh;

  &.match {
    background: rgba(128, 179, 255, 0.5)
  }
  &.mismatch {
    background: #ffb366;
  }
}
</style>
