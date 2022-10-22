<template>
    <input 
      class="form-text-input"
      id="input1"
      name="input1"
    />
</template>

<script>

export default {

  data() {
      return {}
  },
};
</script>

<style lang="scss" scoped>
  .form-text-input {
    padding: 14px 22px;
    border: 1px solid #889BDF;
    border-radius: 50px;
    font-weight: 400;
    font-size: 24px;
    line-height: 35px;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0);

    &:focus {
      outline: none;
    }
  }
</style>