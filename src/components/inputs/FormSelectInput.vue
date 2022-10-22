<template>
    <v-select 
        class="form-select-input" 
        :options="options"
        :placeholder="placeholder" 
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
    }
  }

};
</script>

<style lang="scss">
  .form-select-input {
    width: 100%;

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
    }

    .vs__search {
        color: #fff !important;
        font-weight: 400 !important;
        font-size: 24px !important;
        line-height: 35px !important;
        margin: 0 !important;
        border: none !important;
    }

    /* .vs__open-indicator {
        fill: #fff;
    } */
    
    /* .vs__dropdown-menu {
        background: red;
        border: none;
        color: #394066;
        text-transform: lowercase;
        font-variant: small-caps;
    } */
  }

  
</style>