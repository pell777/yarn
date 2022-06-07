<template>
  <div>
    <button @click="exit()" type="button">Выйти</button>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>
    
