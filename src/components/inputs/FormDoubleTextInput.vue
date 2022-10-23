<template>
    <label :class="containerClass + ' form-double-text-input'">
        <div class="form-double-text-input__label">
            {{label}}
        </div>
        <div class="form-double-text-input__inputs-container">
            <FormTextInput 
                container-class="form-double-text-input__text-input"
                :value="value1"
                :placeholder="placeholder1"
                @input="onInput($event, 'input1')"
            />
            <div class="form-double-text-input__divider">/</div>
            <FormTextInput 
                container-class="form-double-text-input__text-input"
                :value="value2"
                :placeholder="placeholder2"
                @input="onInput($event, 'input2')"
            />
        </div>
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
        },
        value1: String,
        placeholder1: String,
        value2: String,
        placeholder2: String
    },

    methods: {

        /**
         * 
         * @param {*} event 
         * @param {'input1' | 'input2'} inputNumber 
         */
        onInput(nextValue, inputNumber) {
            if (inputNumber === 'input1') {
                this.$emit('input1', nextValue)
            }
            else {
                this.$emit('input2', nextValue)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .form-double-text-input {
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

    &__inputs-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__text-input {
        width: 110px;
    }

    &__divider {
        font-weight: 700;
        font-size: 29px;
        line-height: 29px;
        color: #FFFFFF;
        margin-left: 6px;
        margin-right: 6px;
    }
  }
</style>