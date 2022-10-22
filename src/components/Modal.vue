<template>
    <div 
        class="modal-container"
        @click="close"
    >
        <div 
            class="custom-modal-content"
            @click.stop
        >
            <slot name="content"></slot>
        </div>
    </div>
</template>
    
<script>

export default {
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal-container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(5px);
        z-index: 10;
    }

    .custom-modal-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>