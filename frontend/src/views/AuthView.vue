<template>
  <div id="app">
    <form class="login">
      <h1>Авторизация</h1>
      <label>Введите свой login </label>
      <input required v-model="login" type="login" placeholder="login" />
      <br />
      <br />
      <label>Введите свой Пароль </label>
      <input required v-model="password" type="password" placeholder="пароль" />
      <hr />
      <button @click="auth()" type="button">Войти</button>
      <p v-bind:confirm="confirm">{{ confirm }}</p>
      <p>Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
      <router-view />
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "app",
  data() {
    return {
      login: "",
      password: "",
      confirm: "",
    };
  },

  methods: {
    async auth() {
      this.confirm = " ";
      const p = await axios
        .get("http://localhost:3000/authorization", {
          params: {
            login: this.login,
            password: this.password,
          },
        })
        .then(function (response) {
          console.log(response.data);
          console.log(localStorage.length);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      if (p === "Логин") {
        this.confirm = "Пользователь не зарегестрирован";
      } else if (p === "Пароль") {
        this.confirm = "Неправильный пароль";
      } else {
        if (localStorage.getItem(p)) {
          this.$router.push("/Main");
        } else {
          this.confirm = "Нет Токена";
        }
      }
    },
  },
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