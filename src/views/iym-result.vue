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
    console.log('TOLE')
    // this.setNavTitle('Intelligent Yield Management System (Using KSA)')

    let vueThis = this
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'http://140.116.234.166:22005/ksa/api/ksaapi'

    // axios.get('/api/IYM/KsaResult/' + this.$router.params.taskId)
    axios.get(proxyurl + url)
      .then((data) => {
        // vueThis.ksaResult = JSON.parse(JSON.parse(data).output.replace(/,"Pvalue":\[.+\]/, ''))
        console.log(data)
        console.log('TOLE_2')
        vueThis.ksaResult = JSON.parse(JSON.stringify(data)).data
        console.log(vueThis.ksaResult)
        console.log(vueThis.ksaResult.OGAResult)

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
