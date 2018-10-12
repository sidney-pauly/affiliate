<template lang="html">
  <div v-if="product" class="text-center">

    <h1>{{product.Title}}</h1>

    <ImageViewer :Images="product.Listings.map(l => {return l.Images[0]})"/>

    </b-carousel>

    <p>{{product.Listings[0].Description}}</p>
    <br>
    <Listing v-for="listing in product.Listings" :listingData="listing"/>

  </div>
</template>

<script>
import Listing from '@/components/products/Listing.vue'
import ImageViewer from '@/components/ImageViewer.vue'

export default {
  props: ['product'],
  components: {
    Listing,
    ImageViewer
  },
}
</script>

<style lang="css">
</style>
