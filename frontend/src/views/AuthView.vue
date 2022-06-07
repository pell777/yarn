<template>
  <div id="app">
    <form class="login" @submit.prevent="submittLogin">
      <h1>Авторизация</h1>
      <label>Введите свой login </label>
      <input required v-model="login" type="login" placeholder="login" />
      <br />
      <br />
      <label>Введите свой Пароль </label>
      <input required v-model="password" type="password" placeholder="пароль" />
      <hr />
      <button onclick="submit">Войти</button>
      <p>Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
      <router-view />
    </form>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      login:"",
      password:""
    };
  },

  methods: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>