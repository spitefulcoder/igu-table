<template>
    <input 
      :value="value"
      @input="onInput($event)"
      :class="containerClass + ' form-text-input'"
      :placeholder="placeholder"
    />
</template>

<script>

export default {

  props: {
    containerClass: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: String
  },

  data() {
      return {}
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
};
</script>

<style lang="scss" scoped>
  .form-text-input {
    width: 100%;
    padding: 14px 22px;
    border: 1px solid #889BDF;
    border-radius: 50px;
    font-weight: 400;
    font-size: 24px;
    line-height: 35px;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0);

    &::placeholder {
      color: #889BDF;
    }

    &:focus {
      outline: none;
    }
  }
</style>