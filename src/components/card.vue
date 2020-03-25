<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  mounted() {
    // request.get('api/v1/application').then((d) => {
    //   console.log(d)
    // })
    this.$_post('/api/v1/application', {name: '111'}, {loading: true}).then((res) => {
      this.goods = res.data.data.goods
      this.seller = res.data.data.seller
    }).catch((e) => {
      console.log(e)
    })
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
