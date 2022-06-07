<template>
  <div>
    <img :src="imgUrl" width="300px" />
    <div class="product-class info">
      <h2>{{ title }}</h2>
      <p class="price">{{ price }}р.</p>
      <p class="count">Доступно для доставки {{ count }}шт.</p>
      <button type="button" @click="addToBasket" >Добавить в корзину</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    title:{
        type:String,     
        required:true,//ПОКАЗЫВАЕТ,что пропс обязателен 
        },
    price:Number,
    imgUrl:String, 
    count:Number,
    },
    methods:{
        addToBasket(){
            this.$emit('addToBasket')
        }
    }
};
</script>

<style scoped>
</style>