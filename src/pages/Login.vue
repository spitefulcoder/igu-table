<template>
  <div class="login-page">
    <h1 class="header">Авторизация</h1>

    <FormInput
      label="Код"
      id="login"
      class="input code-input"
      placeholder="Код"
      v-model="code"
    />
    <b-button @click="signIn" class="btn">ОК</b-button>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import FormInput from "../components/inputs/FormInput.vue";
import { firebaseConfig } from "../constants/firebase/firebase-config";
import { getDatabase, ref, get, child } from "firebase/database";
import isAuth from "../auth";
export default {
  components: {
    FormInput,
  },
  data: () => ({
    code: "",
    database: null,
    auth: null,
    db: null,
  }),
  created() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    document.body.style.backgroundColor = "#2A2E96";
    document.querySelector("#app").style.gridTemplateColumns = "none";

    this.db = ref(getDatabase());
  },

  methods: {
    signIn() {
      get(child(this.db, `token/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val() === this.code);
            if (snapshot.val() === this.code) {
              this.$root.isAuth = true;
              signInAnonymously(this.auth)
                .then(() => {
                  // Signed in..
                  this.$router.push("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ...
                });
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
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

.input {
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
