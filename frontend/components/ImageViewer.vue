<template lang="html">
  <div class="">
    <div class="row">
      <div class="col">
        <b-img :src="Images[CurrentImage]" fluid center />
      </div>

    </div>
    <div class="row text-center">
      <div class="col">
        <div class="btn-group" role="group">
          <button class="btn" v-for="(image, i) in Images" @click="CurrentImage = i">{{i+1}} </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: ['Images'],
  data () {
    return {
      CurrentImage: 0
    }
  }
}
</script>

<style lang="css">
</style>
