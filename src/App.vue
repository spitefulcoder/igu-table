<template>
  <div id="app"><router-view /></div>
</template>

<style lang="scss"></style>

<script>
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onValue,
  remove,
} from "firebase/database";
import { firebaseConfig } from "./constants/firebase/firebase-config";
export default {
  created() {
    const app = initializeApp(firebaseConfig);

    const database = getDatabase(app);

    const tokenRef = ref(database, "token/");
    onValue(tokenRef, (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() !== localStorage.getItem("userKey")) {
          localStorage.removeItem("userKey");
          if (this.$route.path !== "/login") this.$router.push("/login");
        }
      }
    });
  },
};
</script>
