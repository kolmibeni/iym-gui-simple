<template>
<div>

<div class="subtitle">
  <span v-if="!isSubmit">Select Metrology and Process Data</span>
  <span v-if="isSubmit">KSA Computation in Progress</span>
</div>
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
          </label>
        </div>
      </div>
    </div>

    <!-- --Filter-- -->
    <div class="col-sm-12">
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
      isSubmit: false

    }
  },

  computed: {

  },

  methods: {
    ...mapMutations(['setNavTitle']),

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
      // const proxyurl = ''
      const proxyurl = 'https://cors-anywhere.herokuapp.com/'
      const url = 'http://' + this.$webServeUrl + '/ksa/api/ksaapi'

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
        }, 3000)
      })
        .catch(function () {
          console.log('FAILURE!!')
        })
    }

  },

  created () {
    this.setNavTitle('Intelligent Yield Management System (Using KSA)')
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
