<template>
  <div class="product-list">
    <h1>Письменные столы</h1>
    <input type="text" class="search" v-model="searchText">
    {{searchText}}
    <ul class="list-defaultflex">
      <li v-for="(product, index) in products" :key="index">
        <product-card
          :title="product.title"
          :price="product.price"
          :img-url="product.imgUrl"
          :count="product.count"
          @addToBasket="addToBasket(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ProductCard from "./ProguctCard.vue";

export default {
  name: "ProductList",
  components: { ProductCard },
  data() {
    return {
        searchText:'',
      products: [
        {
          title: "Стол бомба",
          price: 199464299,
          imgUrl:
            "https://main-cdn.sbermegamarket.ru/hlr-system/1663694819/100024922066b0.jpg",
          count: 40,
        },
        {
          title: "Стол пушка",
          price: 157984599,
          imgUrl:
            "https://main-cdn.sbermegamarket.ru/hlr-system/1663694819/100024922066b0.jpg",
          count: 50,
        },
        {
          title: "Стол дерево",
          price: 1995749,
          imgUrl:
            "https://main-cdn.sbermegamarket.ru/hlr-system/1663694819/100024922066b0.jpg",
          count: 10,
        },
      ],
    };
  },
  methods: {
        addToBasket(index){
            console.log(index)
        }
    },
};
</script>

<style scoped>
ul li {
  font-size: 19px;
  display: inline-block;
  width: 30%;
  margin-left: 3%;
}
</style>