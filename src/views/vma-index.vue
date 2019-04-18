<template>
<div>

<div class="subtitle">
  VMA Status Monitor
</div>

<div class="statusReportList" ref="reportList">
  <table class="table table-striped">
    <tbody>
      <tr class="reportRow" v-for="status in statusList" :key="status.timestamp">
        <td class="resultCard">{{status.timestamp.split('.')[0].replace(/T|Z/g, ' ')}}</td>
        <td class="resultCard"><b>{{status.message}}</b></td>
      </tr>
    </tbody>
  </table>
</div>
<button class="btn btn-info form-control resultCard" @click="statusList = []">Clear List</button>

</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      statusList: []
    }
  },

  actions: {
    ...mapMutations(['setNavTitle'])
  },

  sockets: {
    connect () {
      console.log('socket connected')
    },
    updateVMAStatus (val) {
      console.log(val)

      // update list contents
      this.statusList.push(val)

      // scroll the list to the bottom
      let reportList = this.$refs.reportList
      this.$nextTick(() => {
        reportList.scrollTop = reportList.scrollHeight
      })
    },
    disconnect () {
      console.log('socket disconnected')
    }
  },

  created () {
    this.setNavTitle('Virtual Metrology Administrator (VMA)')
  }
}
</script>

<style lang="scss" scoped>
.statusReportList {
  height: 550px;
  overflow: auto;

  padding: 1vh 1vw;

  border: gray solid 1px;
  margin-bottom: 1vh;
}

.reportRow {
  animation: highlight 1s forwards;
}

.resultCard {
  color: black;
  font-size: 1.25rem;
}

@keyframes highlight {
  from {
    background-color: #f0ad4e;
  }
  to {
    background-color: white;
  }
}
</style>
