<template>
  <div id="app">
    <form class="login" @submit.prevent="submittLogin">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit">Login</button>
      <p>Нет аккаунта? <a href="/register">Создать аккаунт</a></p>
    </form>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      mode: "signIn",
      form: {
        login: "",
        password: "",
      },
      errors: [],
    };
  },
  computed: {
    isSignForm() {
      return this.mode === "signIn";
    },
  },
  methods: {
    submittLogin() {
      if (this.isSignForm) {
        this.signIn();
      } else {
        this.signUp();
      }
    },

    async signIn() {
      const res = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSOM.stringify({
          login: this.form.login,
          password: this.form.password,
        }),
      });
      console.log(res);
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
