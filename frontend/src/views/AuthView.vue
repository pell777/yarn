<template>
  <div id="appAuth">
    <div class="auth">
      <form class="login">
        <h1>Вход</h1>
        <div>
          <table align="center">
            <tr class="tr">
              <td>
                <vs-input
                  required
                  v-model="login"
                  type="login"
                  placeholder="логин"
                >
                </vs-input>
              </td>
            </tr>
            <br />
            <tr>
              <td>
                <vs-input
                  trequired
                  v-model="password"
                  type="password"
                  placeholder="пароль"
                >
                </vs-input>
              </td>
            </tr>
          </table>
        </div>
        <vs-button
          style="text-align: center; margin: 0 auto; margin-top: 3%; width: 60%"
          Войти
          gradient
          type="button"
          @click="auth()"
        >
          Войти
        </vs-button>
        <p v-bind:confirm="confirm">{{ confirm }}</p>
        <p>
          Нет аккаунта?  <router-link to="/register"> Регистрация</router-link>
        </p>
        <router-view />
      </form>
    </div>
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
#appAuth {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f1f1e9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.auth {
  background-color: rgb(236, 236, 236);
  border-radius: 10px;
  box-shadow: 0 0 5px 3px;
  margin: 15% 41%;
  border: solid 2px rgb(36, 35, 35);
}

h1 {
  margin: 3%;
}
</style>