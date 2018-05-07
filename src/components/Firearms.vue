<template>
  <div id="Firearms">

  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'Firearms',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'g_url',
    ]),
  },
  mounted () {

  },
  methods: {
    ...mapActions([
       
    ]),
  },
  components:{

  }
}
</script>

<style scoped>

</style>
