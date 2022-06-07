<template>
  <div class="root">
    <label
      >Введите login
      <input
        type="login"
        v-model="login"
      />
    </label>
    <label
      >Введите пароль
      <input
        type="password"
        v-model="password"
      />
    </label>
    <br>
    <button
    @click="register()">Добавить</button>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Mycomponents",
  data() {
    return {
      login: "login",
      password: "123656",
    };
  },
  computed: {
    userName() {
      return `${this.email}  ${this.password}`.toUpperCase();
    },
  },
  methods: {
    register() {
      axios
        .post("http://localhost:3000/auth", {
          login: this.login,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
