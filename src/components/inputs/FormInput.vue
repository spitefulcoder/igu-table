<template>
    <label :class="containerClass + ' form-input'">
        <div class="form-input__label">
            {{label}}
        </div>
        <FormSelectInput 
            v-if="viewType === 'select'" 
            :options="options"
            :placeholder="placeholder"
        />
        <FormTextInput v-else/>
    </label>
</template>

<script>
import FormTextInput from './FormTextInput.vue';
import FormSelectInput from './FormSelectInput.vue';

export default {
    components: { FormTextInput, FormSelectInput },

    props: {
        label: {
            type: String,
        },
        viewType: {
            type: String
        },
        options: {
            type: Array
        },
        placeholder: {
            type: String
        },
        containerClass: {
            type: String
        }
    }
};
</script>

<style lang="scss" scoped>
  .form-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__label {
        margin-left: 22px;
        font-weight: 400;
        font-size: 24px;
        line-height: 35px;
        color: #FFFFFF;
        margin-bottom: 8px;
    }
  }
</style>