<template>
  <div id="app">
    <form class="login">
      <h1>Регистрация</h1>
      <label>Введите свой Логин </label>

      <input required v-model="login" type="login" placeholder="login" />
      <br />
      <br />
      <label>Введите свой пароль </label>
      <input v-model="password" type="password" placeholder="Пароль" />
      <br />
      <br />
      <label>Подтвердите свой пароль </label>
      <input
        required
        v-model="passwordConfirm"
        type="password"
        placeholder="Пароль"
      />
      <br />
      <br />
      <button @click="register()" type="button">Зарегистрироваться</button>
      <p v-bind:confirm="confirm">{{ confirm }}</p>
      <p><router-link to="/">Авторизация</router-link></p>
      <router-view />
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "RegView",
  data() {
    return {
      login: "",
      password: "",
      passwordConfirm: "",
      confirm: "",
      TOKEN: "1a2b-3c4d-5e6f-7g8h",
    };
  },
  methods: {
    async register() {
      this.confirm = "";
      try {
        const p = await axios
          .get("http://localhost:3000/OneUser", {
            params: { login: this.login, password: this.password },
          })
          .then(function (response) {
            return response.data.login;
          })
          .catch(function (error) {
            console.log(error);
          });

        if (p) {
          if (this.password === this.passwordConfirm) {
            await axios
              .post("http://localhost:3000/register", {
                login: this.login,
                password: this.password,
              })
              .catch(function (error) {
                console.log(error);
              });
            this.confirm = "Регистрация прошла успешно";
          } else {
            this.confirm = "Пароли не совпадают";
          }
        } else {
          this.confirm = "Пользователь уже зарегестрирован";
        }
      } catch (error) {
        console.error("Не все заполнено");
      }
    },
  },
};
</script>