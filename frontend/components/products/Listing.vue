<template lang="html">
  <div class="">
    <div class="bg-dark text-white">
      <p>
        Preis: {{listingData.DisplayPrice}}
        <br>
        Versand: {{listingData.DisplayShipping}}
      </p>
      <b-button :href="listingData.Deeplink">Deeplink</b-button>
      <b-img :src="listingData.Logos[0]" fluid alt="Responsive image" />
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: ['listingData']
}
</script>

<style lang="css">
</style>
