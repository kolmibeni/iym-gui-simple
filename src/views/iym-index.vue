<template>
<div>

<div class="subtitle">
  <span v-if="!isSubmit">Select Metrology and Process Data</span>
  <span v-if="isSubmit">KSA Computation in Progress</span>
</div>
<!-- <form action="http://140.116.234.166:22005/ksa/api/ksaapi" method="post" Enctype="multipart/form-data"> -->
  <div class="row" v-if="!isSubmit">
  <!-- ----X----- -->
    <div class="col-sm-4">
      <div class="card shadowBox">
        <div class="card-header">
          Process Data (X)
        </div>
        <div class="card-body main">
          <label>
            <input type="file" name="file_x" id="file_x" ref="file_x" v-on:change="handleFileUpload_X()"/>
            <!-- <input type="file" name="input1" id=""> -->
          </label>
        </div>
      </div>
    </div>

    <!-- ----Y----- -->
    <div class="col-sm-4">
      <div class="card shadowBox">
        <div class="card-header">
          Metrology Data (Y)
        </div>
        <div class="card-body main">
          <label>
            <input type="file" name="file_y" id="file_y" ref="file_y" v-on:change="handleFileUpload_Y()"/>
            <!-- <input type="file" name="input2" id="">  -->
          </label>
        </div>
      </div>
    </div>

    <!-- ---ID----- -->
    <div class="col-sm-4">
      <div class="card shadowBox">
        <div class="card-header">
          ID
        </div>
        <div class="card-body main">
          <label>
            <input type="file" name="file_id" id="file_id" ref="file_id" v-on:change="handleFileUpload_ID()"/>
            <!-- <input type="file" name="input3" id=""> -->
          </label>
        </div>
      </div>
    </div>

    <!-- --Filter-- -->
    <div class="col-sm-12">
      <!-- <button style="margin-top: 1vh" type="submit" class="btn btn-success btn-block">Start KSA Computation</button> -->
      <button style="margin-top: 1vh" type="submit" class="btn btn-success btn-block"  @click="submitFile">Start KSA Computation</button>
    </div>

  </div>
<!-- </form> -->

<div style="overflow: hidden">
  <google-loader v-if="isSubmit" />
</div>

</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import googleLoader from '@/components/google-loader.vue'

export default {
  components: {
    googleLoader
  },

  data () {
    return {
      // File upload
      file_x: '',
      file_y: '',
      file_id: '',
      // UI control
      isSubmit: false,

      // for input
      xrIn: [],
      xpIn: [],

      // for output
      yOut: '',
      xName: '', // to store with type of x (xr or xp) is selected
      xrOut: [], // to store selected xr values
      xpOut: [], // to store selected xp values
      filterType: '', // to store which type of filter is selected
      starttime: '2015-08-05T00:38',
      endtime: '2016-05-29T21:10'
    }
  },

  computed: {
    output: function () {
      return {
        'y': {
          'name': 'first_yield',
          'item': 'type1_loss'
        },
        'filter_param': {
          'x_variable': this.xName,
          'time_type': 'starttime',
          'start_time': (this.xName === 'xr' ? '1482163200000' : '1438706280000'),
          'end_time': (this.xName === 'xr' ? '1482271980000' : '1464527400000'),
          'lotid': ['LOTID']
        },
        'result_count': 10,
        'ri_method': true,
        'target_up': 0,
        'target_low': 0,
        'x': [{ 'name': this.xName, 'item': (this.xName === 'xr' ? this.xrOut : this.xpOut) }]
      }
    }
  },

  methods: {
    ...mapMutations(['setNavTitle']),

    allX (xName) {
      let xIn = xName + 'In'
      let xOut = xName + 'Out'

      let xpLength = this[xIn].length
      if (this[xOut].length === xpLength) {
        this[xOut] = []
      } else {
        this[xOut] = []
        for (let i = 0; i < xpLength; i++) {
          this[xOut].push(i + 1)
        }
      }
    },

    handleFileUpload_X () {
      this.file_x = this.$refs.file_x.files[0]
      console.log('handleFileUpload_X')
    },
    handleFileUpload_Y () {
      this.file_y = this.$refs.file_y.files[0]
      console.log('handleFileUpload_Y')
    },
    handleFileUpload_ID () {
      this.file_id = this.$refs.file_id.files[0]
      console.log('handleFileUpload_ID')
    },

    submitFile () {
      let formData = new FormData()
      formData.append('file_x', this.file_x)
      formData.append('file_y', this.file_y)
      formData.append('file_id', this.file_id)

      this.isSubmit = true
      const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      const url = 'http://140.116.234.166:22005/ksa/api/ksaapi'

      let vueThis = this
      axios.post(proxyurl + url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function () {
        console.log('SUCCESS!!')
        setTimeout(function () {
          console.log('MASHOK PAK EKO')
          vueThis.$router.push({ name: 'ksaResult2019' })
        }, 5000)
      })
        .catch(function () {
          console.log('FAILURE!!')
        })
    },

    startKsa () {
      this.isSubmit = true

      let vueThis = this
      axios.post('http://localhost/ksa/api/ksaapi', { params: JSON.stringify(this.output) })
        .then((taskId) => {
          console.log(taskId)
          setTimeout(function () {
            vueThis.$router.push({ name: 'ksaResult', params: { taskId: taskId.task_id } })
          }, 120000)
        })
    }
  },

  created () {
    this.setNavTitle('Intelligent Yield Management System (Using KSA)')

    // initialize xr and xp input items
    this.xrIn = []
    this.xpIn = []

    for (let i = 1; i <= 440; i++) {
      this.xrIn.push(i)
    }

    for (let i = 1; i <= 268; i++) {
      this.xpIn.push(i)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body.main {
  height: 120px;
  overflow: auto;
}
.shadowBox {
  box-shadow: 2px 2px 10px gray;
}

label {
  display: block;

  padding: 4px 0;

  margin: 0;

  &:hover {
    background: #eee;
  }
}
</style>
