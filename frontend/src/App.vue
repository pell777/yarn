<template>
  <div id="app">
    <my-component />
    <product-list/>
  </div>
</template>

<script>
import ProductList from './views/ProductList.vue'
import MyComponent from "./components/MyComponents.vue";
export default {
  name: "app",
  components: {
    MyComponent,
    ProductList,
  },
  data() {},
};
</script>

<style>
</style>
