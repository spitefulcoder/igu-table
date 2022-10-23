<template>
    <button 
        :class="containerClass + ' form-button'"
        @click="onClick"
    >
        <slot></slot>
    </button>
</template>

<script>

export default {
    props: {
        isShowModal: {
            type: Boolean,
            default: false
        },
        containerClass: {
            type: String
        }
    },

    data() {
        return {
            currentStep: 1,
            stepsCount: 3
        };
    },

    methods: {
        onClick() {
            this.$emit("click")
        }
    }
};
</script>

<style lang="scss" scoped>
    .form-button {
        background: #889BDF;
        border-radius: 50px;
        color: #fff;
        padding: 8px 16px;
        border: none;
    }
</style>