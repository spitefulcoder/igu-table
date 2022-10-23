<template>
  <div class="login-page">
    <h1 class="header">Авторизация</h1>
    <b-form-input></b-form-input>
    <b-button class="btn">ОК</b-button>
  </div>
</template>

<script>
export default {
  created() {
    document.body.style.backgroundColor = "#2A2E96";
    document.querySelector("#app").style.gridTemplateColumns = "none";
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  color: #fff;
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
