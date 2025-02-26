<script setup>
import Dialog from "./components/Dialog.vue"
import Loading from "./components/Loading.vue";

</script>

<template>
  <div id="app">
    <router-view />
    <Loading />
    <Dialog />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>

<style scoped>

</style>
