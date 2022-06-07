<template>
  <div class="root">
    <div >
      <div class="img" >
        <img
          v-show="isCatVisible"
          width="500px"
          src="..\public\vkPhoto.jpg"
          alt="my photo"
        />
      </div>
      <div class="img">
        <button @click="isCatVisible = !isCatVisible">
           Показать/спрятать {{ isCatVisible }}
        </button>
      </div>
    </div>
    <div>
      <hr />
    <label
      >Введите email
      <input
        type="email"
        :value="email"
        @input="emailInput($event.target.value)"
      />
    </label>
    <label
      >Введите пароль
      <input
        type="password"
        :value="password"
        @input="passwordInput($event.target.value)"
      />
    </label>
    {{ userName }}
    <p>Количество участников : {{ users.length }}</p>
    <ul>
      <li v-for="(user, index) of users" :key="index">
        {{ `${index + 1} ${getFullName(user)}` }}
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mycomponents",
  data() {
    return {
      isCatVisible: "true",
      email: "example@mail.ru",
      password: "123656",
      users: [
        {
          firstName: "Islam",
          secondName: "Darbishev",
        },
        {
          firstName: "Tasya",
          secondName: "Sidorkina",
        },
        {
          firstName: "Ismail",
          secondName: "Hanaliev",
        },
      ],
      pages: 3,
      currentPage: 1,
    };
  },
  computed: {
    userName() {
      return `${this.email}  ${this.password}`.toUpperCase();
    },
  },
  methods: {
    getFullName(user) {
      return user.firstName + " " + user.secondName;
    },
    emailInput(value) {
      this.email = value;
    },
    passwordInput(value) {
      this.password = value;
    },
  },
};
</script>
<style scoped>
button {
  margin: 20px;
}
.img{
  display: inline-block;
}
</style>