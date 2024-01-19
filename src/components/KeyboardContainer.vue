<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
    columns: {
        type: Number,
        default: 3
    },
    rows: {
        type: Number,
        default: 5
    }
})

const keyboardStyle = computed(() => {
    return {
        '--columns': props.columns,
        '--rows': props.rows
    }
})
</script>

<template>
    <div class="keyboard" :style="keyboardStyle">
        <slot></slot>
    </div>
</template>

<style scoped>
.keyboard {
    --key-size: calc(var(--unit) * 96px);
    --key-gap: calc(var(--unit) * 16px);

    display: grid;
    grid-template-columns: repeat(var(--columns), var(--key-size));
    grid-template-rows: repeat(var(--rows), var(--key-size));
    gap: var(--key-gap);
    justify-content: center;
    align-items: center;
}
</style>
