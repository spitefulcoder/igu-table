<template>
    <v-select 
        class="form-select-input" 
        :options="options"
        :placeholder="placeholder" 
        :value="value"
        @input="onInput"
        label="name"
    />
</template>

<script>

export default {

  props: {
    options: {
        type: Array
    },
    placeholder: {
        type: String
    },
    value: {
        type: Object
    }
  },

  methods: {
    onInput(event) {
        this.$emit('input', event)
    }
  }

};
</script>

<style lang="scss">
  .form-select-input {
    width: 100%;
    max-width: 100%;
    min-width: 100%;

    .vs__dropdown-toggle {
        padding: 14px 22px;
        border: 1px solid #889BDF;
        border-radius: 50px;
        font-weight: 400;
        font-size: 24px;
        line-height: 35px;
        color: #fff;
        background-color: rgba($color: #000000, $alpha: 0);
    }

    .vs__actions {
        svg {
            fill: #fff;
        }
    }

    .vs__clear {
        display: flex;
    }

    .vs__selected {
        color: #fff;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .vs__search {
        color: #fff !important;
        font-weight: 400 !important;
        font-size: 24px !important;
        line-height: 35px !important;
        margin: 0 !important;
        border: none !important;

        &::placeholder {
            color: #889BDF !important;
        }
    }

    .vs__dropdown-menu {
        background-color: #DFE6FF;
        border-bottom-left-radius: 32px;
        border-bottom-right-radius: 32px;
    }

    /* .vs__open-indicator {
        fill: #fff;
    } */
    
  }

  
</style>