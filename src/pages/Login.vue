<template>
  <div class="login-page">
    <h1 class="header">Авторизация</h1>

    <FormInput label="Код" id="login" class="login-input" placeholder="Код" />
    <b-button @click="login" class="btn">ОК</b-button>
  </div>
</template>

<script>
import FormInput from "../components/inputs/FormInput.vue";
export default {
  components: {
    FormInput,
  },
  created() {
    document.body.style.backgroundColor = "#2A2E96";
    document.querySelector("#app").style.gridTemplateColumns = "none";
  },

  methods: {
    login() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
}

.login-page {
  width: 414px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-label {
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 35px;

  color: #ffffff;
}

.login-input {
  width: 414px;
  height: 64px;
  margin-bottom: 84px;
}

.header {
  color: #fff;
  margin-bottom: 42px;
}

.btn {
  background: #889bdf;
  border-radius: 50px;
  width: 170px;
  height: 53px;
  border: none;
  font-family: "Century Gothic";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-align: center;

  color: #ffffff;
  &:hover {
    background: #ffffff;
    border-radius: 50px;
    color: #2a2e96;
  }
  &:active {
    background: #ffffff !important;
    border-radius: 50px !important;
    color: #2a2e96 !important;
  }
}
</style>
>
