<template>
  <div class="form">
    <b-form-input
      class="input"
      v-for="(item, index) in items"
      :key="item.key"
      :placeholder="item.placeholder"
      :value="item.value"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-wrap: wrap;
}

.input {
  flex: 49%;
  margin-bottom: 10px;
  margin-right: 10px;
  width: 100%;
}
</style>
