<template>
  <div class="center examplex">
    <vs-navbar center-collapsed v-model="active">
      <template #left>
        <img
          style="margin-top: 4%"
          width="90px"
          src="..\src\assets\mirea.png"
          alt=""
        />
      </template>
      <vs-navbar-group>
        Кафедра
        <template #items>
          <vs-navbar-item :active="active == 'guide'" id="guide">
            О нас
          </vs-navbar-item>
          <vs-navbar-item :active="active == 'docs'" id="docs">
            Направления
          </vs-navbar-item>
          <vs-navbar-item :active="active == 'components'" id="components">
            Преподователи
          </vs-navbar-item>
        </template>
      </vs-navbar-group>

      <vs-navbar-item :active="active == 'License'" id="License">
        Мероприятия
      </vs-navbar-item>

      <vs-navbar-item :active="active == 'License'" id="License">
        Новости
      </vs-navbar-item>

      <template #right>
        <vs-button @click="exit()">Выйти</vs-button>
      </template>
    </vs-navbar>
    <div class="square"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: "guide",
  }),
  methods: {
    exit() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>