<template>
  <div id="appReg">
    <div class="registration">
      <form class="login">
        <h1>Регистрация</h1>
        <div>
          <table align="center">
            <tr>
              <td>
                <label>Введите свой Логин </label>
              </td>
              <td>
                <vs-input
                  required
                  v-model="login"
                  type="login"
                  placeholder="Логин"
                >
                </vs-input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Введите свой пароль </label>
              </td>
              <td>
                <vs-input
                  required
                  v-model="password"
                  type="password"
                  placeholder="Пароль"
                >
                </vs-input>
              </td>
            </tr>
            <tr>
              <td><label>Повторите свой пароль </label></td>
              <td>
                <vs-input
                  required
                  v-model="passwordConfirm"
                  type="password"
                  placeholder="Повторите пароль"
                >
                </vs-input>
              </td>
            </tr>
          </table>
          <br />
          <vs-button
            style="margin: 0 auto; width: 50%"
            gradient
            type="button"
            @click="register()"
          >
            Зарегистрироваться
          </vs-button>

          <p v-bind:confirm="confirm">{{ confirm }}</p>
          <p><router-link to="/">Авторизация</router-link></p>
          <router-view />
        </div>
      </form>
    </div>
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

        if (!p) {
          if (this.password === this.passwordConfirm) {
            const g = await axios
              .post("http://localhost:3000/register", {
                login: this.login,
                password: this.password,
              })
              .then(function (response) {
                const otvet = {
                  id: response.data.id2,
                  token: response.data.token,
                };
                return otvet;
              })
              .catch(function (error) {
                console.log(error);
              });
            localStorage.setItem(g.id, g.token);
            console.log(localStorage.length);
            function confirrm() {
              return this.$router.push("/");
            }
            this.confirm = "Регистрация прошла успешно";
            setTimeout(confirrm, 5000);
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
<style scoped>
#appReg {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.registration {
  border-radius: 10px;
  margin: 15% 38%;
  border: solid 1px black;
}
</style>